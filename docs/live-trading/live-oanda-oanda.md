---
source: https://www.backtrader.com/docu/live/oanda/oanda/
fetched: 2026-07-17
title: "Live Trading - Oanda v1.0"
---

# Oanda

The integration with Oanda supports both:

*   _Live Data_ feeding
    
*   _Live Trading_
    

## Requirements

*   `oandapy`
    
    Install it with: `pip install git+https://github.com/oanda/oandapy.git`
    
*   `pytz` (optional and not really recommended)
    
    Given the worlwide and 24x7 nature of Forex, the choice is work in `UTC` time. You may still work with your desired output timezone if wished.
    

## Sample Code

The sources contain a full sample under:

*   `samples/oandatest/oandatest.py`

## Oanda - the store

The store is the keystone of the live data feed/trade support, providing a layer of adaptation between the _Oanda_ API and the needs of a data feed and a broker proxy.

*   Providesaccess to getting a _broker_ instance with the method:
    
    *   `OandaStore.getbroker(*args, **kwargs)`
*   Provides access to getter _data_ feed instances
    
    *   `OandaStore.getedata(\*args, **kwargs)`
    
    In this case many of the `**kwargs` are common to data feeds like `dataname`, `fromdate`, `todate`, `sessionstart`, `sessionend`, `timeframe`, `compression`
    
    The data may provide other params. Check the reference below.
    

### Mandatory parameters

In order to successfully connect to _Oanda_, the following parameters are mandatory:

*   `token` (default:`None`): API access token
    
*   `account` (default: `None`): account id
    

This are provided by _Oanda_

Whether to connect to the _practice_ server or to the real server, use:

*   `practice` (default: `False`): use the test environment

The account has to be periodically checked to get the _cash_ and _value_. The periodicity can be controlled with:

*   `account_tmout` (default: `10.0`): refresh period for account value/cash refresh

## Oanda feeds

Instantiating the data:

*   Pass the symbol according to the Oanda guidelines
    
    *   _EUR/USDD_ following the guidelines from Oanda has to be specified as as `EUR_USD`. Instantiate it as:
    
    ```
    data = oandastore.getdata(dataname='EUR_USD', ...)
    ```
    

### Time management

Unless a `tz` parameter (a _pytz-compatible_ object) is passed to the data feed, all time output is in `UTC` format as expressed above.

#### Backfilling

_backtrader_ makes no special request to _Oanda_. For small timeframes the backfilling returned by _Oanda_ on the _practice_ servers has been `500` bars long

## OandaBroker - Trading Live

### Using the broker

To use the _OandaBroker_, the standard broker simulation instance created by _cerebro_ has to be replaced.

Using the _Store_ model (preferred):

```
import backtrader as bt

cerebro = bt.Cerebro()
oandastore = bt.stores.OandaStore()
cerebro.broker = oandastore.getbroker()  # or cerebro.setbroker(...)
```

### Broker - Initial Positions

The broker supports a single parameter:

*   `use_positions` (default:`True`): When connecting to the broker provider use the existing positions to kickstart the broker.
    
    Set to `False` during instantiation to disregard any existing position
    

#### Opperations

There is no change with regards to the standar usage. Just use the methods available in the strategy (see the `Strategy` reference for a full explanation)

*   `buy`
    
*   `sell`
    
*   `close`
    
*   `cancel`
    

### Order Execution Types

_Oanda_ supports almost all of the order execution types needed by _backtrader_ with the exception of _Close_.

As such the order execution types are limited to:

*   `Order.Market`
    
*   `Order.Limit`
    
*   `Order.Stop`
    
*   `Order.StopLimit` (using _Stop_ and _upperBound_ / _lowerBound_ prices)
    
*   `Order.StopTrail`
    
*   _Bracket_ orders are supported by using the `takeprofit` and `stoploss` order members and creating internally simulated orders.
    

### Order Validity

The same validity notion available during backtesting (with `valid` to `buy` and `sell`) is available and with the same meaning. As such, the `valid` parameter is translated as follows for _Oanda Orders_ for the following values:

*   `None` translates to _Good Til Cancelled_
    
    Because no validity has been specified it is understood that the order must be valid until cancelled
    
*   `datetime/date` translates to _Good Til Date_
    
*   `timedelta(x)` translates to _Good Til Date_ (here `timedelta(x) != timedelta()`)
    
    This is interpreted as a signal to have an order be valid from `now` + `timedelta(x)`
    
*   `timedelta() or 0` translates to _Session_
    
    A value has been passed (instead of `None`) but is _Null_ and is interpreted as an order valid for the current _day_ (session)
    

### Notifications

The standard `Order` status will be notified to a _strategy_ over the method `notify_order` (if overridden)

*   `Submitted` - the order has been sent to TWS
    
*   `Accepted` - the order has been placed
    
*   `Rejected` - Use for real rejections and when no other status is known during order creation
    
*   `Partial` - a partial execution has taken place
    
*   `Completed` - the order has been fully executed
    
*   `Canceled` (or `Cancelled`)
    
*   `Expired` - when an order is cancelled due to expiry
    

## Reference

### OandaStore

#### class backtrader.stores.OandaStore()

Singleton class wrapping to control the connections to Oanda.

Params:

*   `token` (default:`None`): API access token
    
*   `account` (default: `None`): account id
    
*   `practice` (default: `False`): use the test environment
    
*   `account_tmout` (default: `10.0`): refresh period for account value/cash refresh
    

### OandaBroker

#### class backtrader.brokers.OandaBroker(\*\*kwargs)

Broker implementation for Oanda.

This class maps the orders/positions from Oanda to the internal API of `backtrader`.

Params:

*   `use_positions` (default:`True`): When connecting to the broker provider use the existing positions to kickstart the broker.
    
    Set to `False` during instantiation to disregard any existing position
    

### OandaData

#### class backtrader.feeds.OandaData(\*\*kwargs)

Oanda Data Feed.

Params:

*   `qcheck` (default: `0.5`)
    
    Time in seconds to wake up if no data is received to give a chance to resample/replay packets properly and pass notifications up the chain
    
*   `historical` (default: `False`)
    
    If set to `True` the data feed will stop after doing the first download of data.
    
    The standard data feed parameters `fromdate` and `todate` will be used as reference.
    
    The data feed will make multiple requests if the requested duration is larger than the one allowed by IB given the timeframe/compression chosen for the data.
    
*   `backfill_start` (default: `True`)
    
    Perform backfilling at the start. The maximum possible historical data will be fetched in a single request.
    
*   `backfill` (default: `True`)
    
    Perform backfilling after a disconnection/reconnection cycle. The gap duration will be used to download the smallest possible amount of data
    
*   `backfill_from` (default: `None`)
    
    An additional data source can be passed to do an initial layer of backfilling. Once the data source is depleted and if requested, backfilling from IB will take place. This is ideally meant to backfill from already stored sources like a file on disk, but not limited to.
    
*   `bidask` (default: `True`)
    
    If `True`, then the historical/backfilling requests will request bid/ask prices from the server
    
    If `False`, then _midpoint_ will be requested
    
*   `useask` (default: `False`)
    
    If `True` the _ask_ part of the _bidask_ prices will be used instead of the default use of _bid_
    
*   `includeFirst` (default: `True`)
    
    Influence the delivery of the 1st bar of a historical/backfilling request by setting the parameter directly to the Oanda API calls
    
*   `reconnect` (default: `True`)
    
    Reconnect when network connection is down
    
*   `reconnections` (default: `-1`)
    
    Number of times to attempt reconnections: `-1` means forever
    
*   `reconntimeout` (default: `5.0`)
    
    Time in seconds to wait in between reconnection attemps
    

This data feed supports only this mapping of `timeframe` and `compression`, which comply with the definitions in the OANDA API Developer’s Guid:

```
(TimeFrame.Seconds, 5): 'S5',
(TimeFrame.Seconds, 10): 'S10',
(TimeFrame.Seconds, 15): 'S15',
(TimeFrame.Seconds, 30): 'S30',
(TimeFrame.Minutes, 1): 'M1',
(TimeFrame.Minutes, 2): 'M3',
(TimeFrame.Minutes, 3): 'M3',
(TimeFrame.Minutes, 4): 'M4',
(TimeFrame.Minutes, 5): 'M5',
(TimeFrame.Minutes, 10): 'M10',
(TimeFrame.Minutes, 15): 'M15',
(TimeFrame.Minutes, 30): 'M30',
(TimeFrame.Minutes, 60): 'H1',
(TimeFrame.Minutes, 120): 'H2',
(TimeFrame.Minutes, 180): 'H3',
(TimeFrame.Minutes, 240): 'H4',
(TimeFrame.Minutes, 360): 'H6',
(TimeFrame.Minutes, 480): 'H8',
(TimeFrame.Days, 1): 'D',
(TimeFrame.Weeks, 1): 'W',
(TimeFrame.Months, 1): 'M',
```

Any other combination will be rejected
