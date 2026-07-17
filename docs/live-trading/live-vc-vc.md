---
source: https://www.backtrader.com/docu/live/vc/vc/
fetched: 2026-07-17
title: "Live Trading - Visual Chart"
---

# Visual Chart

The integration with Visual Chart supports both:

*   _Live Data_ feeding
    
*   _Live Trading_
    

_Visual Chart_ is a complete trading solution:

*   Integrated Charting, data feed and brokering in a single platform
    
    For more information visit: [www.visualchart.com](http://www.visualchart.com)
    

## Requirements

*   _VisualChart 6_
    
*   _Windows_ - the one VisualChart is running on
    
*   `comtypes` fork: [https://github.com/mementum/comtypes](https://github.com/mementum/comtypes)
    
    Install it with: `pip install https://github.com/mementum/comtypes/archive/master.zip`
    
    The _Visual Chart_ API is based on _COM_.
    
    The current `comtypes` main branch doesn’t support unpacking of `VT_ARRAYS` of `VT_RECORD`. And this is used by _Visual Chart_
    
    [Pull Request #104](https://github.com/enthought/comtypes/pull/104) has been submitted but not yet integrated. As soon as it is integrated, the main branch can be used.
    
*   `pytz` (optional but really recommended)
    
    To make sure each and every data is returned in the market time.
    
    This is true for most markets but some are really an exception (`Global Indices` being a good example)
    
    Time Management inside _Visual Chart_ and its relation with the delivered times over _COM_ is complex and having `pytz` tends to simplify things.
    

## Sample Code

The sources contain a full sample under:

*   `samples/vctest/vctest.py`

The sample cannot cover every possible use case but it tries to provide broad insight and should highlight that there is no real difference when it comes to use the backtesting module or the live data module

One thing could be pin-pointed:

*   The sample waits for a `data.LIVE` data status notification before any trading activity takes place.
    
    This would probably is something to consider in any live strategy
    

## VCStore - the store

The store is the keystone of the live data feed/trade support, providing a layer of adaptation between the _COM_ API and the needs of a data feed and a broker proxy.

*   Providesaccess to getting a _broker_ instance with the method:
    
    *   `VCStore.getbroker(*args, **kwargs)`
*   Provides access to getter _data_ feed instances
    
    *   `VCStore.getedata(*args, **kwargs)`
    
    In this case many of the `**kwargs` are common to data feeds like `dataname`, `fromdate`, `todate`, `sessionstart`, `sessionend`, `timeframe`, `compression`
    
    The data may provide other params. Check the reference below.
    

The `VCStore` will try to:

*   Automatically locate _VisualChart_ in the system using the _Windows Registry_
    
    *   If found, the installation directory will be scanned for the _COM_ DLLs to create the _COM_ _typelibs_ and be able to instantiate the appropriate objects
        
    *   If not found, then an attempt will be made with known and hardcoded _CLSIDs_ to do the same.
        

> Note
>
> Even if the DLLs can be found by scanning the filesystem, _Visual Chart_ itself has to be running. backtrader won’t start _Visual Chart_

Other responsibilities of the `VCStore`:

*   Keeping general track of the connectivity status of _Visual Chart_ to the server

## VCData feeds

### General

The data feed offered by _Visual Chart_ has some interesting properties:

*   **Resampling** is done by the platform
    
    Not in all cases: _Seconds_ is not supported and has still to be done by _backtrader_
    
    As such and only when doing something with seconds would the end user need to do:
    
    ```
    vcstore = bt.stores.VCStore()
    vcstore.getdata(dataname='015ES', timeframe=bt.TimeFrame.Ticks)
    cerebro.resampledata(data, timeframe=bt.TimeFrame.Seconds, compression=5)
    ```
    
    In all other cases it is enough with:
    
    ```
    vcstore = bt.stores.VCStore()
    data = vcstore.getdata(dataname='015ES', timeframe=bt.TimeFrame.Minutes, compression=2)
    cerebro.addata(data)
    ```
    

The data will calculate a `timeoffset` internally by comparing the internal equipment clock and the `ticks` delivered by the platform in order to deliver the _automatically_ resampled bars as early as possible if no new ticks are coming in.

Instantiating the data:

*   Pass the symbol seen on the top-left side of _VisualChart_ without spaces. For example:
    
    *   _ES-Mini_ is displayed as `001 ES`. Instantiate it as:
    
    ```
    data = vcstore.getdata(dataname='001ES', ...)
    ```
    
    *   _EuroStoxx 50_ is displayed as `015 ES`. Instantiate it as:
    
    ```
    data = vcstore.getdata(dataname='015ES', ...)
    ```
    

> Note
>
> _backtrader_ will make an effort and clear out a whitespace located at the fourth position if the name is directly pasted from _Visual Chart_

### Time management

The time management follow the general rules of _backtrader_

*   Give the time in _Market_ time, to make sure the code is not dependent on DST transitions happening at different times and making local time not reliable for time comparisons.

This works for most markets in _Visual Chart_ but some specific management is done for some markets:

*   Datas in the exchange `096` which is named `International Indices`.
    
    These are theoretically reported to be in the timezone `Europe/London` but tests have revealed this seems to be partially true and some internal management is in place to cover for it.
    

The use of real _timezones_ for time management can be enabled by passing the parameter `usetimezones=True`. This tries to use `pytz` if available. It is not needed, as for most markets the internal time offsets provided by _Visual Chart_ allow for the seamless conversion to the market time.

In any case it would seem to be pointless to report the `096.DJI` in `Europe/London` time when it is actually located in `US/Eastern`. As such `backtrader` will report it in the later. In that case the use of `pytz` is more than recommended.

> Note
>
> The _Dow Jones Industrials_ index (not the global version) is located at `099I-DJI`

> Note
>
> All this time management is pending a real test during a DST transition in which local and remote markets happend to be out of sync with regards to DST.

List of `International Indices` for which the output _timezone_ is defined in `VCDATA`:

```
'096.FTSE': 'Europe/London',
'096.FTEU3': 'Europe/London',
'096.MIB30': 'Europe/Berlin',
'096.SSMI': 'Europe/Berlin',
'096.HSI': 'Asia/Hong_Kong',
'096.BVSP': 'America/Sao_Paulo',
'096.MERVAL': 'America/Argentina/Buenos_Aires',
'096.DJI': 'US/Eastern',
'096.IXIC': 'US/Eastern',
'096.NDX': 'US/Eastern',
```

#### Small time problem

Passing `fromdate` or `todate` with a given **time of day** rather than the default `00:00:00` seems to create a filter in the _COM_ API and bars for any days will only be delivered after the given time.

As such:

*   Please pass only **full dates** to `VCData` as in:
    
    ```
    data = vcstore.getdata(dataname='001ES', fromdate=datetime(2016, 5, 15))
    ```
    
    And not::
    
    ```
    data = vcstore.getdata(dataname=‘001ES’, fromdate=datetime(2016, 5, 15, 8, 30))
    ```
    

#### Backfilling time lengths

If no `fromdate` is specified by the end user, the platform will automatically try to backfill and the carry on with live data. The backfilling is timeframe dependent and is:

*   `Ticks`, `MicroSeconds`, `Seconds`: **1 Day**
    
    The same for the 3 timeframes given that _Seconds_ and _MicroSeconds_ are not directly supported by _Visual Chart_ and are done through resampling of _Ticks_
    
*   `Minutes`: **2 Days**
    
*   `Days`: **1 year**
    
*   `Weeks`: **2 years**
    
*   `Months`: **5 years**
    
*   `Months`: **20 years**
    

The defined backfilling periods are multiplied by the requested `compression`, that is: if the _timeframe_ is `Minutes` and the _compression_ is 5 the final _backfilling period_ will be: `2 days * 5 -> 10 days`

### Trading the data

_Visual Chart_ offers **continuous futures**. No manual management is needed and the future of your choice can be tracked without interruption. This is an advantage and presents a small challenge:

*   `ES-Mini` is `001ES`, but the actual trading asset (ex: Sep-2016) is `ESU16`.

To overcome this and allow a strategy to track the _continuous future_ and trade on the _real asset_ the following can be specified during data instantiation:

```
data = vcstore.getdata(dataname='001ES', tradename='ESU16')
```

Trades will happen on `ESU16`, but the data feed will be frm `001ES` (the data is the same 3 months long)

### Other parameters

*   `qcheck` (default: `0.5` seconds) controls the frequency to wake up to talk to the internal resampler/replayer to avoid late delivery of bars.
    
    The following logic will be applied to used this parameter:
    
    *   If internal _resampling/replaying_ is detected, the value will be used as it is.
        
    *   If no internal _resampling/replaying_ is detected, the data feed will not wake up, because there is nothing to report to.
        
    
    The data feed will still wake up to check the _Visual Chart_ built-in resampler, but this is automatically controlled.
    

### Data Notifications

The data feed will report the current status via one or more of the following (check the _Cerebro_ and _Strategy_ reference)

*   `Cerebro.notify_data` (if overriden)n
    
*   A callback addded with `Cerebro.adddatacb`
    
*   `Strategy.notify_data` (if overriden)
    

An example inside the _strategy_:

```
class VCStrategy(bt.Strategy):

    def notify_data(self, data, status, *args, **kwargs):

        if status == data.LIVE:  # the data has switched to live data
           # do something
           pass
```

The following notifications will be sent following changes in the system:

*   `CONNECTED`
    
    Sent on successful initial connection
    
*   `DISCONNECTED`
    
    In this case retrieving the data is no longer possible and the data will indicate the system nothing can be done. Possible conditions:
    
    *   Wrong contract specified
        
    *   Interruption during historical download
        
    *   Number of reconnection attempts to TWS exceeded
        
*   `CONNBROKEN`
    
    Connectivity has been lost to either TWS or to the data farms. The data feed will try (via the store) to reconnect and backfill, when needed, and resume operations
    
*   `NOTSUBSCRIBED`
    
    Contract and connection are ok, but the data cannot be retrieved due to lack of permissions.
    
    The data will indicate to the system that it cannot retrieve the data
    
*   `DELAYED`
    
    Signaled to indicate that a _historical_/_backfilling_ operation are in progress and the data being processed by the strategy is not real-time data
    
*   `LIVE`
    
    Signaled to indicate that the data to be processed from this point onwards by the _strategy_ is real-time data
    

Developers of _strategies_ should consider which actions to undertake in cases like when a disconnection takes place or when receiving **delayed** data.

## VCBroker - Trading Live

### Using the broker

To use the _VCBroker_, the standard broker simulation instance created by _cerebro_ has to be replaced.

Using the _Store_ model (preferred):

```
import backtrader as bt

cerebro = bt.Cerebro()
vcstore = bt.stores.VCStore()
cerebro.broker = vcstore.getbroker()  # or cerebro.setbroker(...)
```

### Broker Parameters

Be it directly or over `getbroker` the `VCBroker` broker supports no parameters. This is because the broker is just a proxy to the a real _Broker_. And what the real broker gives, shall not be taken away.

### Restrictions

#### Position

_Visual Chart_ reports **open positions**. This could be used most of the time to control the actual position, but a final event indicating a _Position_ has been closed is missing.

That makes it compulsory for _backtrader_ to keep full accounting of the _Position_ and separate from any previous existing position in your account

#### Commission

The _COM_ trading interface doesn’t report commissions. There is no chance for _backtrader_ to make and educated guess, unless:

*   The _broker_ is instantiated with a _Commission_ instance indicating which commissions do actually take place.

### Trading with it

#### Account

_Visual Chart_ supports several accounts at the same time in one broker. The chosen account can be controlled with the parameter:

*   `account` (default: `None`)
    
    VisualChart supports several accounts simultaneously on the broker. If the default `None` is in place the 1st account in the ComTrader `Accounts` collection will be used.
    
    If an account name is provided, the `Accounts` collection will be checked and used if present
    

#### Opperations

There is no change with regards to the standar usage. Just use the methods available in the strategy (see the `Strategy` reference for a full explanation)

*   `buy`
    
*   `sell`
    
*   `close`
    
*   `cancel`
    

### Order objects returned

*   Standard _backtrader_ `Order` objects

### Order Execution Types

_Visual Chart_ supports the minimum order execution types needed by _backtrader_ and as such, anyhing which is backtested can go live.

As such the order execution types are limited to the ones available in the _broker simulation_:

*   `Order.Market`
    
*   `Order.Close`
    
*   `Order.Limit`
    
*   `Order.Stop` (when the _Stop_ is triggered a _Market_ order follows)
    
*   `Order.StopLimit` (when the _Stop_ is triggered a _Limit_ order follows)
    

### Order Validity

The same validity notion available during backtesting (with `valid` to `buy` and `sell`) is available and with the same meaning. As such, the `valid` parameter is translated as follows for _Visual Chart Orders_ for the following values:

*   `None` translates to _Good Til Cancelled_
    
    Because no validity has been specified it is understood that the order must be valid until cancelled
    
*   `datetime/date` translates to _Good Til Date_
    
    > Note
    >
    > Beware: _Visual Chart_ does only support “full dates” and the _time_ part is discarded.
    
*   `timedelta(x)` translates to _Good Til Date_ (here `timedelta(x) != timedelta()`)
    
    > Note
    >
    > Beware: _Visual Chart_ does only support **full dates** and the _time_ part is discarded.
    
    This is interpreted as a signal to have an order be valid from `now` + `timedelta(x)`
    
*   `timedelta() or 0` translates to _Session_
    
    A value has been passed (instead of `None`) but is _Null_ and is interpreted as an order valid for the current _day_ (session)
    

### Notifications

The standard `Order` status will be notified to a _strategy_ over the method `notify_order` (if overridden)

*   `Submitted` - the order has been sent to TWS
    
*   `Accepted` - the order has been placed
    
*   `Rejected` - order placement failed or was cancelled by the system during its lifetime
    
*   `Partial` - a partial execution has taken place
    
*   `Completed` - the order has been fully executed
    
*   `Canceled` (or `Cancelled`)
    
*   `Expired` - Not reported as of yet. An heuristic would be needed to distinguish this status from `Cancelled`
    

## Reference

### VCStore

#### class backtrader.stores.VCStore()

Singleton class wrapping an ibpy ibConnection instance.

The parameters can also be specified in the classes which use this store, like `VCData` and `VCBroker`

### VCBroker

#### class backtrader.brokers.VCBroker(\*\*kwargs)

Broker implementation for VisualChart.

This class maps the orders/positions from VisualChart to the internal API of `backtrader`.

Params:

*   `account` (default: None)
    
    VisualChart supports several accounts simultaneously on the broker. If the default `None` is in place the 1st account in the ComTrader `Accounts` collection will be used.
    
    If an account name is provided, the `Accounts` collection will be checked and used if present
    
*   `commission` (default: None)
    
    An object will be autogenerated if no commission-scheme is passed as parameter
    
    See the notes below for further explanations
    

### Notes

*   Position

VisualChart reports “OpenPositions” updates through the ComTrader interface but only when the position has a “size”. An update to indicate a position has moved to ZERO is reported by the absence of such position. This forces to keep accounting of the positions by looking at the execution events, just like the simulation broker does

*   Commission

The ComTrader interface of VisualChart does not report commissions and as such the auto-generated CommissionInfo object cannot use non-existent commissions to properly account for them. In order to support commissions a `commission` parameter has to be passed with the appropriate commission schemes.

The documentation on Commission Schemes details how to do this

*   Expiration Timing

The ComTrader interface (or is it the comtypes module?) discards `time` information from `datetime` objects and expiration dates are always full dates.

*   Expiration Reporting

At the moment no heuristic is in place to determine when a cancelled order has been cancelled due to expiration. And therefore expired orders are reported as cancelled.

### VCData

#### class backtrader.feeds.VCData(\*\*kwargs)

VisualChart Data Feed.

Params:

*   `qcheck` (default: `0.5`) Default timeout for waking up to let a resampler/replayer that the current bar can be check for due delivery
    
    The value is only used if a resampling/replaying filter has been inserted in the data
    
*   `historical` (default: `False`) If no `todate` parameter is supplied (defined in the base class), this will force a historical only download if set to `True`
    
    If `todate` is supplied the same effect is achieved
    
*   `milliseconds` (default: `True`) The bars constructed by _Visual Chart_ have this aspect: HH:MM:59.999000
    
    If this parameter is `True` a millisecond will be added to this time to make it look like: HH::MM + 1:00.000000
    
*   `tradename` (default: `None`) Continous futures cannot be traded but are ideal for data tracking. If this parameter is supplied it will be the name of the current future which will be the trading asset. Example:
    
    *   001ES -> ES-Mini continuous supplied as `dataname`
        
    *   ESU16 -> ES-Mini 2016-09. If this is supplied in `tradename` it will be the trading asset.
        
*   `usetimezones` (default: `True`) For most markets the time offset information provided by _Visual Chart_ allows for datetime to be converted to market time (_backtrader_ choice for representation)
    
    Some markets are special (`096`) and need special internal coverage and timezone support to display in the user expected market time.
    
    If this parameter is set to `True` importing `pytz` will be attempted to use timezones (default)
    
    Disabling it will remove timezone usage (may help if the load is excesive)
