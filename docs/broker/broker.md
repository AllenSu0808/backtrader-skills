---
source: https://www.backtrader.com/docu/broker/
fetched: 2026-07-17
title: "Broker"
---

# Broker

## Reference

### class backtrader.brokers.BackBroker()

Broker Simulator

The simulation supports different order types, checking a submitted order cash requirements against current cash, keeping track of cash and value for each iteration of `cerebro` and keeping the current position on different datas.

_cash_ is adjusted on each iteration for instruments like `futures` for

```
which a price change implies in real brokers the addition/substracion of
cash.
```

Supported order types:

*   `Market`: to be executed with the 1st tick of the next bar (namely the `open` price)
    
*   `Close`: meant for intraday in which the order is executed with the closing price of the last bar of the session
    
*   `Limit`: executes if the given limit price is seen during the session
    
*   `Stop`: executes a `Market` order if the given stop price is seen
    
*   `StopLimit`: sets a `Limit` order in motion if the given stop price is seen
    

Because the broker is instantiated by `Cerebro` and there should be (mostly) no reason to replace the broker, the params are not controlled by the user for the instance. To change this there are two options:

1.  Manually create an instance of this class with the desired params and use `cerebro.broker = instance` to set the instance as the broker for the `run` execution
    
2.  Use the `set_xxx` to set the value using `cerebro.broker.set_xxx` where `\`xxx\` stands for the name of the parameter to set
    

> Note
>
> `cerebro.broker` is a _property_ supported by the `getbroker` and `setbroker` methods of `Cerebro`

Params:

*   `cash` (default: `10000`): starting cash
    
*   `commission` (default: `CommInfoBase(percabs=True)`) base commission scheme which applies to all assets
    
*   `checksubmit` (default: `True`) check margin/cash before accepting an order into the system
    
*   `eosbar` (default: `False`): With intraday bars consider a bar with the same `time` as the end of session to be the end of the session. This is not usually the case, because some bars (final auction) are produced by many exchanges for many products for a couple of minutes after the end of the session
    
*   `eosbar` (default: `False`): With intraday bars consider a bar with the same `time` as the end of session to be the end of the session. This is not usually the case, because some bars (final auction) are produced by many exchanges for many products for a couple of minutes after the end of the session
    
*   `filler` (default: `None`)
    
    A callable with signature: `callable(order, price, ago)`
    
    *   `order`: obviously the order in execution. This provides access to the _data_ (and with it the _ohlc_ and _volume_ values), the _execution type_, remaining size (`order.executed.remsize`) and others.
        
        Please check the `Order` documentation and reference for things available inside an `Order` instance
        
    *   `price` the price at which the order is going to be executed in the `ago` bar
        
    *   `ago`: index meant to be used with `order.data` for the extraction of the _ohlc_ and _volume_ prices. In most cases this will be `0` but on a corner case for `Close` orders, this will be `-1`.
        
        In order to get the bar volume (for example) do: `volume = order.data.voluume[ago]`
        
    
    The callable must return the _executed size_ (a value >= 0)
    
    The callable may of course be an object with `__call__` matching the aforementioned signature
    
    With the default `None` orders will be completely executed in a single shot
    
*   `slip_perc` (default: `0.0`) Percentage in absolute termns (and positive) that should be used to slip prices up/down for buy/sell orders
    
    Note:
    
    *   `0.01` is `1%`
        
    *   `0.001` is `0.1%`
        
*   `slip_fixed` (default: `0.0`) Percentage in units (and positive) that should be used to slip prices up/down for buy/sell orders
    
    Note: if `slip_perc` is non zero, it takes precendence over this.
    
*   `slip_open` (default: `False`) whether to slip prices for order execution which would specifically used the _opening_ price of the next bar. An example would be `Market` order which is executed with the next available tick, i.e: the opening price of the bar.
    
    This also applies to some of the other executions, because the logic tries to detect if the _opening_ price would match the requested price/execution type when moving to a new bar.
    
*   `slip_match` (default: `True`)
    
    If `True` the broker will offer a match by capping slippage at `high/low` prices in case they would be exceeded.
    
    If `False` the broker will not match the order with the current prices and will try execution during the next iteration
    
*   `slip_limit` (default: `True`)
    
    `Limit` orders, given the exact match price requested, will be matched even if `slip_match` is `False`.
    
    This option controls that behavior.
    
    If `True`, then `Limit` orders will be matched by capping prices to the `limit` / `high/low` prices
    
    If `False` and slippage exceeds the cap, then there will be no match
    
*   `slip_out` (default: `False`)
    
    Provide _slippage_ even if the price falls outside the `high` - `low` range.
    
*   `coc` (default: `False`)
    
    _Cheat-On-Close_ Setting this to `True` with `set_coc` enables
    
    ```
    matching a `Market` order to the closing price of the bar in which
    the order was issued. This is actually *cheating*, because the bar
    is *closed* and any order should first be matched against the prices
    in the next bar
    ```
    
*   `coo` (default: `False`)
    
    _Cheat-On-Open_ Setting this to `True` with `set_coo` enables
    
    ```
    matching a `Market` order to the opening price, by for example
    using a timer with `cheat` set to `True`, because such a timer
    gets executed before the broker has evaluated
    ```
    
*   `int2pnl` (default: `True`)
    
    Assign generated interest (if any) to the profit and loss of operation that reduces a position (be it long or short). There may be cases in which this is undesired, because different strategies are competing and the interest would be assigned on a non-deterministic basis to any of them.
    
*   `shortcash` (default: `True`)
    
    If True then cash will be increased when a stocklike asset is shorted and the calculated value for the asset will be negative.
    
    If `False` then the cash will be deducted as operation cost and the calculated value will be positive to end up with the same amount
    
*   `fundstartval` (default: `100.0`)
    
    This parameter controls the start value for measuring the performance in a fund-like way, i.e.: cash can be added and deducted increasing the amount of shares. Performance is not measured using the net asset value of the porftoflio but using the value of the fund
    
*   `fundmode` (default: `False`)
    
    If this is set to `True` analyzers like `TimeReturn` can automatically calculate returns based on the fund value and not on the total net asset value
    

### set\_cash(cash)

Sets the cash parameter (alias: `setcash`)

### get\_cash()

Returns the current cash (alias: `getcash`)

### get\_value(datas=None, mkt=False, lever=False)

Returns the portfolio value of the given datas (if datas is `None`, then the total portfolio value will be returned (alias: `getvalue`)

### set\_eosbar(eosbar)

Sets the eosbar parameter (alias: `seteosbar`

### set\_checksubmit(checksubmit)

Sets the checksubmit parameter

### set\_filler(filler)

Sets a volume filler for volume filling execution

### set\_coc(coc)

Configure the Cheat-On-Close method to buy the close on order bar

### set\_coo(coo)

Configure the Cheat-On-Open method to buy the close on order bar

### set\_int2pnl(int2pnl)

Configure assignment of interest to profit and loss

### set\_fundstartval(fundstartval)

Set the starting value of the fund-like performance tracker

### set\_slippage\_perc(perc, slip\_open=True, slip\_limit=True, slip\_match=True, slip\_out=False)

Configure slippage to be percentage based

### set\_slippage\_fixed(fixed, slip\_open=True, slip\_limit=True, slip\_match=True, slip\_out=False)

Configure slippage to be fixed points based

### get\_orders\_open(safe=False)

Returns an iterable with the orders which are still open (either not executed or partially executed

The orders returned must not be touched.

If order manipulation is needed, set the parameter `safe` to True

### getcommissioninfo(data)

Retrieves the `CommissionInfo` scheme associated with the given `data`

### setcommission(commission=0.0, margin=None, mult=1.0, commtype=None, percabs=True, stocklike=False, interest=0.0, interest\_long=False, leverage=1.0, automargin=False, name=None)

This method sets a \`\` CommissionInfo\`\` object for assets managed in the broker with the parameters. Consult the reference for `CommInfoBase`

If name is `None`, this will be the default for assets for which no other `CommissionInfo` scheme can be found

### addcommissioninfo(comminfo, name=None)

Adds a `CommissionInfo` object that will be the default for all assets if `name` is `None`

### getposition(data)

Returns the current position status (a `Position` instance) for the given `data`

### get\_fundshares()

Returns the current number of shares in the fund-like mode

### get\_fundvalue()

Returns the Fund-like share value

### add\_cash(cash)

Add/Remove cash to the system (use a negative value to remove)
