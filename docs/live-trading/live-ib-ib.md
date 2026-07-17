---
source: https://www.backtrader.com/docu/live/ib/ib/
fetched: 2026-07-17
title: "Live Trading - Interactive Brokers"
---

# Interactive Brokers

The integration with Interactive Brokers supports both:

*   _Live Data_ feeding
    
*   _Live Trading_
    

> Note
>
> In spite of all attempts to test the maximum number of error conditions and situations, the code could (like any other piece of software) contain bugs.

Test any strategy thoroughly with a **Paper Trading** account or the TWS **Demo** before going in production.

> Note
>
> Interaction with Interactive Brokers is done by using the `IbPy` module and this has to be installed prior to usage. There is no package in Pypi (at the time of writing) but it can be installed using `pip` with the following command:

```
pip install git+https://github.com/blampe/IbPy.git
```

If `git` is not available in your system (Windows installation?) the following should also work:

```
pip install https://github.com/blampe/IbPy/archive/master.zip
```

## Sample Code

The sources contain a full sample under:

*   samples/ibtest/ibtest.py

The sample cannot cover every possible use case but it tries to provide broad insight and should highlight that there is no real difference when it comes to use the backtesting module or the live data module

One thing could be pin-pointed:

*   The sample waits for a `data.LIVE` data status notification before any trading activity takes place.
    
    This would probably is something to consider in any live strategy
    

## Store Model vs Direct Model

Interaction with Interactive Brokers is supported through 2 models:

1.  Store Model (_Preferred_)
    
2.  Direct interaction with the data feed class and the broker class
    

The store model provides a clear separation pattern when it comes down to creating _brokers_ and _datas_. Two code snippets should serve better as an example.

First with the **Store** model:

```
import backtrader as bt

ibstore = bt.stores.IBStore(host='127.0.0.1', port=7496, clientId=35)
data = ibstore.getdata(dataname='EUR.USD-CASH-IDEALPRO')
```

Here the parameters:

*   `host`, `port` and `clientId` are passed to where they belong the `IBStore` which opens a connection using those parameters.

And then a **data** feed is created with `getdata` and a parameter common to all data feeds in _backtrader_

*   `dataname` whic requests the _EUR_/_USD_ Forex pair.

And now with direct usage:

```
import backtrader as bt

data = bt.feeds.IBData(dataname='EUR.USD-CASH-IDEALPRO',
                       host='127.0.0.1', port=7496, clientId=35)
```

Here:

*   Parameters intended for the store are passed to the data.
    
*   Those will be used to create a `IBStore` instance in the background
    

The drawback:

*   A lot less clarity, because it becomes unclear what belongs to the data and what belongs to the store.

## IBStore - the store

The store is the keystone of the live data feed/trade support, providing a layer of adaptation between the `IbPy` module and the needs of a data feed and a broker proxy.

A _Store_ is a concept which covers the following functions:

*   Being the central shop for an entity: in this case the entity is IB
    
    Which may or may not require parameters
    
*   Providing access to getting a _broker_ instance with the method:
    
    *   `IBStore.getbroker(*args, **kwargs)`
*   Providing access to getter _data_ feed instances
    
    *   `IBStore.getdata(*args, **kwargs)`
    
    In this case many of the `**kwargs` are common to data feeds like `dataname`, `fromdate`, `todate`, `sessionstart`, `sessionend`, `timeframe`, `compression`
    
    The data may provide other params. Check the reference below.
    

The `IBStore` provides:

*   Connectivity target (`host` and `port` parameters)
    
*   Identification (`clientId` parameter)
    
*   Re-connectivity control (`reconnect` and `timeout` parameters)
    
*   Time offset check (`timeoffset` parameters, see below)
    
*   Notification and debugging
    
    `notifyall` (default: `False`): in this case any `error` message (many are simply informative) sent by IB will be relayed to _Cerebro_/_Strategy_
    
    `_debug` (default: `False`): in this case each and every message received from TWS will be print out to standard outpu
    

## IBData feeds

### Data Options

Be it directly or over `getdata` the `IBData` feed supports the following data options:

*   Historical download requests
    
    These will be split over multiple requests if the duration exceeds the limits imposed by IB for a given _timeframe/compression_ combination
    
*   RealTime Data in 3 flavors
    
    *   `tickPrice` events (via IB `reqMktData`)
    
    Used for _CASH_ products (experimentation with at least TWS API 9.70 has shown no support for the other types)
    
    Receives a _tick_ price event by looking at the `BID` prices, which according to the non-official Internet literature seems to be the way to track the `CASH` market prices.
    
    Timestamps are generated locally in the system. An offset to the IB Server time can be used if wished by the end user (calculated from IB `reqCurrentTime`)
    
    *   `tickString` events (aka `RTVolume` (via IB `reqMktData`)
    
    Receives a _OHLC/Volume_ snapshot from IB approx. every 250ms (or greater if no trading has happened)
    
    *   `RealTimeBars` events (via IB `reqRealTimeBars`)
    
    Receives historical 5 seconds bars (duration fixed by IB) every 5 seconds
    
    If the chosen _timeframe/combination_ is below the level _Seconds/5_ this feature will be automatically disabled.
    
    !!! note
    
    ```
      `RealTimeBars` do not work with the TWS Demo
    ```
    
    The default behavior is to use: `tickString` in most cases unless the user specifically wants to use `RealTimeBars`
    
*   `Backfilling`
    
    Unless the user requests to just do a _historical_ download, the data feed will automatically backfill:
    
    *   **At the start**: with the maximum possible duration. Example: for a _Days/1_ (_timeframe/compression_) combination the maximum default duration at IB is _1 year_ and this is the amount of time that will be backfilled
        
    *   **After a data disconnection**: in this case the amount of data downloaded for the backfilling operation will be reduced to the minimum by looking at the latest data received before the disconnection.
        

> Note
>
> Take into account that the final _timeframe/compression_ combination taken into account may not be the one specified during _data feed creation_ but during _insertion_ in the system. See the following example:

```
data = ibstore.getdata(dataname='EUR.USD-CASH-IDEALPRO',
                       timeframe=bt.TimeFrame.Seconds, compression=5)

cerebro.resampledata(data, timeframe=bt.TimeFrame.Minutes, compression=2)
```

As should now be clear, the final _timeframe/compression_ combination taken into account is _Minutes/2_

### Data Contract Check

During the start phase, the _data_ feed will try to download the details of the specified contract (see the reference for how to specify it). If no such contract is found or multiple matches are found, the data will refuse to carry on and will notify it to the system. Some examples.

Simple but unambiguous contract specification:

```
data = ibstore.getdata(dataname='TWTR')  # Twitter
```

Only one instance will be found (2016-06) because for the default type, `STK`, exchange `SMART` and currency (the default is none) a single contract trading in `USD` will be found.

A similar approach will fail with `AAPL`:

```
data = ibstore.getdata(dataname='AAPL')  # Error -> multiple contracts
```

Because `SMART` finds contracts in several real exchanges and `AAPL` trades in different currencies in some of them. The following is ok:

```
data = ibstore.getdata(dataname='AAPL-STK-SMART-USD')  # 1 contract found
```

### Data Notifications

The data feed will report the current status via one or more of the following (check the _Cerebro_ and _Strategy_ reference)

*   `Cerebro.notify_data` (if overriden)n
    
*   A callback addded with `Cerebro.adddatacb`
    
*   `Strategy.notify_data` (if overriden)
    

An example inside the _strategy_:

```
class IBStrategy(bt.Strategy):

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

### Data TimeFrames and Compressions

Data feeds in the _backtrader_ ecosystem, support the `timeframe` and `compression` parameters during creation. These parameters are also accessible as attributes with `data._timeframe` and `data._compression`

The significance of _timeframe/compression_ combinations has a specific purpose whenpassing the data to a `cerebro` instance via `resampledata` or `replaydata`, to let the internal resampler/replayer objects to understand what the intended target is. `._timeframe` and `._compression` will be overwritten in the data when resampled/replayed.

But in live data feeds on the other hand this information can play an important role. See the following example:

```
data = ibstore.getdata(dataname='EUR.USD-CASH-IDEALPRO',
                       timeframe=bt.TimeFrame.Ticks,
                       compression=1,  # 1 is the default
                       rtbar=True,  # use RealTimeBars
                      )
cerebro.adddata(data)
```

The user is requesting **tick** data and this important because:

*   No backfilling will take place (the minimum unit supported by IB is _Seconds/1_)
    
*   Even if `RealTimeBars` are requested and supported by the `dataname`, they will not be used because the minimum resolution of a `RealTimeBar` is _Seconds/5_
    

In any case and unless working with a resolution of _Ticks/1_, the data has to be _resampled/replayed_. The case above with realtimebars and working:

```
data = ibstore.getdata(dataname='TWTR-STK-SMART', rtbar=True)
cerebro.resampledata(data, timeframe=bt.TimeFrame.Seconds, compression=20)
```

In this case and as explained above, the `._timeframe` and `._compression` attributes of the data will be overwritten during `resampledata`. This is what will happen:

*   _backfilling_ will happen requesting a resolution of _Seconds/20_
    
*   `RealTimeBars` will be used for real-time data because the resolution is equal/greater than _Seconds/5_ and the data supports is (is no _CASH_ product)
    
*   Events to the system from TWS will happen at most every 5 seconds. This is possibly not important because the system will only send a bar to the strategy every 20 seconds.
    

The same without `RealTimeBars`:

```
data = ibstore.getdata(dataname='TWTR-STK-SMART')
cerebro.resampledata(data, timeframe=bt.TimeFrame.Seconds, compression=20)
```

In this case:

*   _backfilling_ will happen requesting a resolution of _Seconds/20_
    
*   `tickString` will be used for real-time data because (is no _CASH_ product)
    
*   Events to the system from TWS will happen every at most every 250ms. This is possibly not important because the system will only send a bar to the strategy every 20 seconds.
    

Finally with a _CASH_ product and up to 20 seconds:

```
data = ibstore.getdata(dataname='EUR.USD-CASH-IDEALPRO')
cerebro.resampledata(data, timeframe=bt.TimeFrame.Seconds, compression=20)
```

In this case:

*   _backfilling_ will happen requesting a resolution of _Seconds/20_
    
*   `tickPrice` will be used for real-time data because this is a cash product
    
    Even if `rtbar=True` is added
    
*   Events to the system from TWS will happen at most every 250ms. This is possibly not important because the system will only send a bar to the strategy every 20 seconds.
    

### Time Management

The data feed will automatically determine the timezone from the `ContractDetails` object reported by _TWS_.

> Note
>
> This requires that `pytz` be installed. If not installed the user should supply with the `tz` parameter to the data source a `tzinfo` compatible instance for the desired output timezone

> Note
>
> If `pytz` is installed and the user feels the automatic timezone determination is not working, the `tz` parameter can contain a string with the name of the timezone. `backtrader` will try to instantiate a `pytz.timezone` with the given name

The reported `datetime` will be that of the timezone related to the product. Some examples:

*   _Product_: EuroStoxxx 50 in the Eurex (ticker: _ESTX50-YYYYMM-DTB_)
    
    The timezone will be `CET` (_Central European Time_) aka `Europe/Berlin`
    
*   _Product_: ES-Mini (ticker: _ES-YYYYMM-GLOBEX_)
    
    The timezone will be `EST5EDT` aka `EST` aka `US/Eastern`
    
*   _Product_: EUR.JPY forex pair (ticker _EUR.JPY-CASH-IDEALPRO_)
    
    The timezone will be `EST5EDT` aka `EST` aka `US/Eastern`
    
    Actually this is an Interactive Brokers setting, because Forex pairs trade almost 24 hours without interruption and as such there wouldn’t be a real timezone for them.
    

This behavior makes sure that trading remains consistent regardless of the actual location of the trader, given that the computer will most likely have the actual location timezone and not the timezone of the trading venue.

Please read the **Time Management** section of the manual.

> Note
>
> The TWS Demo is not accurate at reporting timezones for assets for which no data download permissions are available (The EuroStoxx 50 future is an example of those cases)

### Live Feeds and Resampling/Replaying

A design decision with regards to when to deliver bars for live feeds is:

*   _Deliver them as much in real-time as possible_

This may seem obvious and it is the case for a timeframe of `Ticks`, but if _Resampling/Replaying_ play a role, delays can take place. Use case:

*   Resampling is configured to _Seconds/5_ with:
    
    ```
    cerebro.resampledata(data, timeframe=bt.TimeFrame.Seconds, compression=5)
    ```
    
*   A tick with time `23:05:27.325000` is delivered
    
*   Trading in the market is slow and the next tick is delivered at `23:05:59.025000`
    

It may not seem obvious but _backtrader_ doesn’t know that trading is very slow and the next tick will come in around `32` seconds later. With no provisions in place a resampled bar with time `23:05:30.000000` would be delivered around `29 seconds` too late.

That’s why the live feed wakes up every `x` seconds (_float_ value) to go to the _Resampler/Replayer_ and let it know that no new data has come in. This is controlled with the parameter `qcheck` (default value: `0.5` seconds) when creating a live data feed.

That means that the resampler has a chance every `qcheck` seconds to deliver a bar if the local clock says, the resampling period is over. With this in place, the resampled bar for the scenario above (`23:05:30.000000`) would be delivered at most `qcheck` seconds after the reported time.

Because the default valus is `0.5` the latest time would be: `23:05:30.500000`. That is almost 29 seconds earlier as before.

The drawback:

*   _Some ticks may come in too late for the already delivered resampled/replayed bar_

If after delivering, TWS gets a late message from the server with a timestamp of `23:05:29.995\`000`, this is simply too late for the already reported time to the system of`23:05.30.000000\`

This happens mostly if:

*   `timeoffset` _is disabled (set to `False`) in `IBStore\` and the time difference between the \*IB_ reported time and the local clock is significant.

The best approach to avoid most of those late samples:

*   Increase the `qcheck` value, to allow for late messages to be taken into account:
    
    ```
    data = ibstore.getdata('TWTR', qcheck=2.0, ...)
    ```
    

This should add extra room, even if it delays the delivery of the _resampled/replayed_ bar

> Note
>
> Of course a delay of 2.0 seconds has a different significance for a resampling of _Seconds/5_ than for a resampling of _Minutes/10_

If for whatever reason the end-user wishes to disable `timeoffset` and not manage via `qcheck`, the late samples can still be taken:

*   Use `_latethrough` set to `True` as a parameter to `getdata` / `IBData`:
    
    ```
    data = ibstore.getdata('TWTR', _latethrough=True, ...)
    ```
    
*   Use `takelate` set to `True` when _resampling/replaying_:
    
    ```
    cerebro.resampledata(data, takelate=True)
    ```
    

## IBBroker - Trading Live

> Note
>
> Following a request a `tradeid` functionality was implemented in the _broker simulation_ available in _backtrader_. This allows to keep track of trades being executed in paralled on the same asset correctly allocating commissions to the appropriate `tradeid`

Such notion is not supported in this live broker because commissions are reported by the broker at times at which it would be impossible to separate them for the different `tradeid` values.

`tradeid` can still be specified but it makes no longer sense.

### Using the broker

To use the _IB Broker_, the standard broker simulation instance created by _cerebro_ has to be replaced.

Using the _Store_ model (preferred):

```
import backtrader as bt

cerebro = bt.Cerebro()
ibstore = bt.stores.IBStore(host='127.0.0.1', port=7496, clientId=35)
cerebro.broker = ibstore.getbroker()  # or cerebro.setbroker(...)
```

Using the direct approach:

```
import backtrader as bt

cerebro = bt.Cerebro()
cerebro.broker = bt.brokers.IBBroker(host='127.0.0.1', port=7496, clientId=35)
```

### Broker Parameters

Be it directly or over `getbroker` the `IBBroker` broker supports no parameters. This is because the broker is just a proxy to the a real _Broker_. And what the real broker gives, shall not be taken away.

### Some restrictions

#### Cash and Value reporting

Where the internal _backtrader_ broker simulation makes a calculation of `value` (net liquidation value) and `cash` before calling the strategy `next` method, the same cannot be guaranteed with a live broker.

*   If the values were requested, the execution of `next` could be delayed until the answers arrive
    
*   The broker may not yet have calculated the values
    

_backtrader_ tells TWS to provide the updated values as soon as they are changed (_backtrader_ subscribes to `accounUpdate` messages), but it doesn’t know when the messages will arrive.

The values reported by the `getcash` and `getvalue` methods of `IBBroker` are always the latest values received from IB.

> Note
>
> A further restriction is that the values are reported in the base currency of the account, even if values for more currencies are available. This is a design choise.

#### Position

_backtrader_ uses the `Position` (price and size) of an asset reported by TWS. Internal calculations could be used following _order execution_ and _order status_ messages, but if some of these messages were missed (sockets sometimes lose packets) the calculations would not follow.

Of course if upon connecting to TWS the asset on which trades will be executed already has an open position, the calculation of `Trades` made by the strategy will not work as usual because of the initial offset

### Trading with it

There is no change with regards to the standard usage. Just use the methods available in the strategy (see the `Strategy` reference for a full explanation)

*   `buy`
    
*   `sell`
    
*   `close`
    
*   `cancel`
    

### Order objects returned

*   Compatible with the backtrader `Order` objects (subclass in the same hierarchy)

### Order Execution Types

IB supports a myriad of execution types, some of them simulated by IB and some of them supported by the exchange itself. The decision as to which order execution types to initially support has a motivation:

*   Compatibility with the _broker simulation_ available in _backtrader_
    
    The reasoning being that what has been back-tested is what will go in production.
    

As such the order execution types are limited to the ones available in the _broker simulation_:

*   `Order.Market`
    
*   `Order.Close`
    
*   `Order.Limit`
    
*   `Order.Stop` (when the _Stop_ is triggered a _Market_ order follows)
    
*   `Order.StopLimit` (when the _Stop_ is triggered a _Limit_ order follows)
    

> Note
>
> Stop triggering is done following different strategies by IB. _backtrader_ does not modify the default setting which is `0`:

```
0 - the default value. The "double bid/ask" method will be used for
orders for OTC stocks and US options. All other orders will use the
"last" method.
```

If the user wishes to modify this, extra `**kwargs` can be supplied to `buy` and `sell` following the IB documentation. For example inside the `next` method of a strategy:

```
def next(self):
    # some logic before
    self.buy(data, m_triggerMethod=2)
```

This has changed the policy to `2` (_“last” method, where stop orders are triggered based on the last price._)

Please consult the IB API docs for any further clarification on stop triggering

### Order Validity

The same validity notion available during backtesting (with `valid` to `buy` and `sell`) is available and with the same meaning. As such, the `valid` parameter is translated as follows for _IB Orders_ for the following values:

*   `None -> GTC` (Good Til Cancelled)
    
    Because no validity has been specified it is understood that the order must be valid until cancelled
    
*   `datetime/date` translates to `GTD` (Good Til Date)
    
    Passing a datetime.datetime/datetime.date instance indicates the order must be valid until a given point in time.
    
*   `timedelta(x)` translates to `GTD` (here `timedelta(x) != timedelta()`)
    
    This is interpreted as a signal to have an order be valid from `now` + `timedelta(x)`
    
*   `float` translates to `GTD`
    
    If the value has been taken from the raw _float_ datetime storage used by _backtrader_ the order must valid until the datetime indicated by that _float_
    
*   `timedelta() or 0` translates to `DAY`
    
    A value has been (instead of `None`) but is _Null_ and is interpreted as an order valid for the current _day_ (session)
    

### Notifications

The standard `Order` status will be notified to a _strategy_ over the method `notify_order` (if overridden)

*   `Submitted` - the order has been sent to TWS
    
*   `Accepted` - the order has been placed
    
*   `Rejected` - order placement failed or was cancelled by the system during its lifetime
    
*   `Partial` - a partial execution has taken place
    
*   `Completed` - the order has been fully executed
    
*   `Canceled` (or `Cancelled`)
    
    This has several meanings under IB:
    
    *   Manual User Cancellation
        
    *   The Server/Exchange cancelled the order
        
    *   Order Validity expired
        
        An heuristic will be applied and if an `openOrder` message has been received from TWS with an `orderState` indicating `PendingCancel` or `Canceled`, then the order will be marked as `Expired`
        
*   `Expired` - See above for the explanation
    

## Reference

### IBStore

#### class backtrader.stores.IBStore()

Singleton class wrapping an ibpy ibConnection instance.

The parameters can also be specified in the classes which use this store, like `IBData` and `IBBroker`

Params:

*   `host` (default:`127.0.0.1`): where IB TWS or IB Gateway are actually running. And although this will usually be the localhost, it must not be
    
*   `port` (default: `7496`): port to connect to. The demo system uses `7497`
    
*   `clientId` (default: `None`): which clientId to use to connect to TWS.
    
    `None`: generates a random id between 1 and 65535 An `integer`: will be passed as the value to use.
    
*   `notifyall` (default: `False`)
    
    If `False` only `error` messages will be sent to the `notify_store` methods of `Cerebro` and `Strategy`.
    
    If `True`, each and every message received from TWS will be notified
    
*   `_debug` (default: `False`)
    
    Print all messages received from TWS to standard output
    
*   `reconnect` (default: `3`)
    
    Number of attempts to try to reconnect after the 1st connection attempt fails
    
    Set it to a `-1` value to keep on reconnecting forever
    
*   `timeout` (default: `3.0`)
    
    Time in seconds between reconnection attemps
    
*   `timeoffset` (default: `True`)
    
    If True, the time obtained from `reqCurrentTime` (IB Server time) will be used to calculate the offset to localtime and this offset will be used for the price notifications (tickPrice events, for example for CASH markets) to modify the locally calculated timestamp.
    
    The time offset will propagate to other parts of the `backtrader` ecosystem like the **resampling** to align resampling timestamps using the calculated offset.
    
*   `timerefresh` (default: `60.0`)
    
    Time in seconds: how often the time offset has to be refreshed
    
*   `indcash` (default: `True`)
    
    Manage IND codes as if they were cash for price retrieval
    

### IBBroker

#### class backtrader.brokers.IBBroker(\*\*kwargs)

Broker implementation for Interactive Brokers.

This class maps the orders/positions from Interactive Brokers to the internal API of `backtrader`.

### Notes

*   `tradeid` is not really supported, because the profit and loss are taken directly from IB. Because (as expected) calculates it in FIFO manner, the pnl is not accurate for the tradeid.
    
*   Position
    

If there is an open position for an asset at the beginning of operaitons or orders given by other means change a position, the trades calculated in the `Strategy` in cerebro will not reflect the reality.

To avoid this, this broker would have to do its own position management which would also allow tradeid with multiple ids (profit and loss would also be calculated locally), but could be considered to be defeating the purpose of working with a live broker

### IBData

#### class backtrader.feeds.IBData(\*\*kwargs)

Interactive Brokers Data Feed.

Supports the following contract specifications in parameter `dataname`:

*   TICKER # Stock type and SMART exchange
    
*   TICKER-STK # Stock and SMART exchange
    
*   TICKER-STK-EXCHANGE # Stock
    
*   TICKER-STK-EXCHANGE-CURRENCY # Stock
    
*   TICKER-CFD # CFD and SMART exchange
    
*   TICKER-CFD-EXCHANGE # CFD
    
*   TICKER-CDF-EXCHANGE-CURRENCY # Stock
    
*   TICKER-IND-EXCHANGE # Index
    
*   TICKER-IND-EXCHANGE-CURRENCY # Index
    
*   TICKER-YYYYMM-EXCHANGE # Future
    
*   TICKER-YYYYMM-EXCHANGE-CURRENCY # Future
    
*   TICKER-YYYYMM-EXCHANGE-CURRENCY-MULT # Future
    
*   TICKER-FUT-EXCHANGE-CURRENCY-YYYYMM-MULT # Future
    
*   TICKER-YYYYMM-EXCHANGE-CURRENCY-STRIKE-RIGHT # FOP
    
*   TICKER-YYYYMM-EXCHANGE-CURRENCY-STRIKE-RIGHT-MULT # FOP
    
*   TICKER-FOP-EXCHANGE-CURRENCY-YYYYMM-STRIKE-RIGHT # FOP
    
*   TICKER-FOP-EXCHANGE-CURRENCY-YYYYMM-STRIKE-RIGHT-MULT # FOP
    
*   CUR1.CUR2-CASH-IDEALPRO # Forex
    
*   TICKER-YYYYMMDD-EXCHANGE-CURRENCY-STRIKE-RIGHT # OPT
    
*   TICKER-YYYYMMDD-EXCHANGE-CURRENCY-STRIKE-RIGHT-MULT # OPT
    
*   TICKER-OPT-EXCHANGE-CURRENCY-YYYYMMDD-STRIKE-RIGHT # OPT
    
*   TICKER-OPT-EXCHANGE-CURRENCY-YYYYMMDD-STRIKE-RIGHT-MULT # OPT
    

Params:

*   `sectype` (default: `STK`)
    
    Default value to apply as _security type_ if not provided in the `dataname` specification
    
*   `exchange` (default: `SMART`)
    
    Default value to apply as _exchange_ if not provided in the `dataname` specification
    
*   `currency` (default: `''`)
    
    Default value to apply as _currency_ if not provided in the `dataname` specification
    
*   `historical` (default: `False`)
    
    If set to `True` the data feed will stop after doing the first download of data.
    
    The standard data feed parameters `fromdate` and `todate` will be used as reference.
    
    The data feed will make multiple requests if the requested duration is larger than the one allowed by IB given the timeframe/compression chosen for the data.
    
*   `what` (default: `None`)
    
    If `None` the default for different assets types will be used for historical data requests:
    
    *   ‘BID’ for CASH assets
        
    *   ‘TRADES’ for any other
        
    
    Check the IB API docs if another value is wished
    
*   `rtbar` (default: `False`)
    
    If `True` the `5 Seconds Realtime bars` provided by Interactive Brokers will be used as the smalles tick. According to the documentation they correspond to real-time values (once collated and curated by IB)
    
    If `False` then the `RTVolume` prices will be used, which are based on receiving ticks. In the case of `CASH` assets (like for example EUR.JPY) `RTVolume` will always be used and from it the `bid` price (industry de-facto standard with IB according to the literature scattered over the Internet)
    
    Even if set to `True`, if the data is resampled/kept to a timeframe/compression below Seconds/5, no real time bars will be used, because IB doesn’t serve them below that level
    
*   `qcheck` (default: `0.5`)
    
    Time in seconds to wake up if no data is received to give a chance to resample/replay packets properly and pass notifications up the chain
    
*   `backfill_start` (default: `True`)
    
    Perform backfilling at the start. The maximum possible historical data will be fetched in a single request.
    
*   `backfill` (default: `True`)
    
    Perform backfilling after a disconnection/reconnection cycle. The gap duration will be used to download the smallest possible amount of data
    
*   `backfill_from` (default: `None`)
    
    An additional data source can be passed to do an initial layer of backfilling. Once the data source is depleted and if requested, backfilling from IB will take place. This is ideally meant to backfill from already stored sources like a file on disk, but not limited to.
    
*   `latethrough` (default: `False`)
    
    If the data source is resampled/replayed, some ticks may come in too late for the already delivered resampled/replayed bar. If this is `True` those ticks will bet let through in any case.
    
    Check the Resampler documentation to see who to take those ticks into account.
    
    This can happen especially if `timeoffset` is set to `False` in the `IBStore` instance and the TWS server time is not in sync with that of the local computer
    
*   `tradename` (default: `None`) Useful for some specific cases like `CFD` in which prices are offered by one asset and trading happens in a different onel
    
    *   SPY-STK-SMART-USD -> SP500 ETF (will be specified as `dataname`)
        
    *   SPY-CFD-SMART-USD -> which is the corresponding CFD which offers not price tracking but in this case will be the trading asset (specified as `tradename`)
        

The default values in the params are the to allow things like `\`TICKER`, to which the parameter`sectype`(default:`STK`) and`exchange`(default:`SMART\`) are applied.

Some assets like `AAPL` need full specification including `currency` (default: ‘’) whereas others like `TWTR` can be simply passed as it is.

*   `AAPL-STK-SMART-USD` would be the full specification for dataname
    
    Or else: `IBData` as `IBData(dataname='AAPL', currency='USD')` which uses the default values (`STK` and `SMART`) and overrides the currency to be `USD`
