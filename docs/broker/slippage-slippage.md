---
source: https://www.backtrader.com/docu/slippage/slippage/
fetched: 2026-07-17
title: "Broker - Slippage"
---

# Slippage

backtesting cannot guarantee real market conditions. No matter how good the market simulation is, under real market conditions slippage can happen. That means:

*   The requested price may not be matched.

The integrated backtesting broker supports slippage. The following parameters can be passed to the broker

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
    

## How it works

In order to decide when to apply _slippage_ the order execution type is taken into account:

*   `Close` - **No slippage** is applied
    
    This order is matched against the `close` price and this price is the last one of the day. Slippage cannot happen because the order can only happen with the last tick of the session and this is a unique price with no tolerance.
    
*   `Market` - _Slippage_ is applied
    
    Please check the `slip_open` exception. Because `Market` orders will be matched against the _opening_ price of the next bar.
    
*   `Limit` - _Slippage_ is applied following this logic
    
    *   If the matching price would be the _opening_ price, then _slippage_ is applied according to the parameter `slip_open`. If applied, the price will never be worse than the requested `limit` price
        
    *   If the matching price is not the `limit` price, _slippage_ is applied capping at `high/low`. In this case `slip_mlimit` applies to decide if a match will be happening in case the caps are exceeded
        
    *   If the matching price is the `limit` price, then no slippage is applied
        
*   `Stop` - once the order is _triggered_ the same logic as for `Market` orders apply
    
*   `StopLimit` - once the order is _triggered_ the same logic as for `Limit` orders apply
    

This approach tries to offer the most realistic possible approach within the limits of the simulation and available data

## Configuring slippage

A _broker_ is already instantiated by a _cerebro_ engine for each run with the default parameters. There are two ways to alter the behavior:

*   Use methods to configure _slippage_
    
    #### BackBroker.set\_slippage\_perc(perc, slip\_open=True, slip\_limit=True, slip\_match=True, slip\_out=False)
    
    Configure slippage to be percentage based
    
    #### BackBroker.set\_slippage\_fixed(fixed, slip\_open=True, slip\_limit=True, slip\_match=True, slip\_out=False)
    
    Configure slippage to be fixed points based
    
*   Replace the broker as in:
    
    ```
    import backtrader as bt
    
    cerebro = bt.Cerebro()
    cerebro.broker = bt.brokers.BackBroker(slip_perc=0.005)  # 0.5%
    ```
    

## Practical examples

The sources contain a sample which uses the order execution type `Market` and a _long/short_ approach using _signals_. This should allow to understand the logic.

A run with no slippage and an initial plot for reference later:

```
$ ./slippage.py --plot
01 2005-03-22 23:59:59 SELL Size: -1 / Price: 3040.55
02 2005-04-11 23:59:59 BUY  Size: +1 / Price: 3088.47
03 2005-04-11 23:59:59 BUY  Size: +1 / Price: 3088.47
04 2005-04-19 23:59:59 SELL Size: -1 / Price: 2948.38
05 2005-04-19 23:59:59 SELL Size: -1 / Price: 2948.38
06 2005-05-19 23:59:59 BUY  Size: +1 / Price: 3034.88
...
35 2006-12-19 23:59:59 BUY  Size: +1 / Price: 4121.01
```

[![image](../no-slippage.png)](https://www.backtrader.com/docu/slippage/no-slippage.png)

And the same run using _slippage_ with a `1.5%` configured:

```
$ ./slippage.py --slip_perc 0.015
01 2005-03-22 23:59:59 SELL Size: -1 / Price: 3040.55
02 2005-04-11 23:59:59 BUY  Size: +1 / Price: 3088.47
03 2005-04-11 23:59:59 BUY  Size: +1 / Price: 3088.47
04 2005-04-19 23:59:59 SELL Size: -1 / Price: 2948.38
05 2005-04-19 23:59:59 SELL Size: -1 / Price: 2948.38
06 2005-05-19 23:59:59 BUY  Size: +1 / Price: 3034.88
...
35 2006-12-19 23:59:59 BUY  Size: +1 / Price: 4121.01
```

There is **NO CHANGE**. This is the expected behavior for the scenario.

*   Execution Type: `Market`
    
*   And `slip_open` has not been set to `True`
    
    The `Market` orders are matched against the _opening_ price of the next bar and we are not allowing the `open` price to be moved.
    

A run setting `slip_open` to `True`:

```
$ ./slippage.py --slip_perc 0.015 --slip_open
01 2005-03-22 23:59:59 SELL Size: -1 / Price: 3021.66
02 2005-04-11 23:59:59 BUY  Size: +1 / Price: 3088.47
03 2005-04-11 23:59:59 BUY  Size: +1 / Price: 3088.47
04 2005-04-19 23:59:59 SELL Size: -1 / Price: 2948.38
05 2005-04-19 23:59:59 SELL Size: -1 / Price: 2948.38
06 2005-05-19 23:59:59 BUY  Size: +1 / Price: 3055.14
...
35 2006-12-19 23:59:59 BUY  Size: +1 / Price: 4121.01
```

And one can immediately see tht the prices **HAVE MOVED**. And the allocated prices are worst or equal like for operation 35. _This is not a copy and paste error_

*   The `open` and the `high` on 20016-12-19 were the same.
    
    The price cannot be pushed above the `high` because that would mean returning a non-existent price.
    

Of course, _backtrader_ allows to match outide the `high` - `low` range if wished with `slip_out`. A run with it activated:

```
$ ./slippage.py --slip_perc 0.015 --slip_open --slip_out
01 2005-03-22 23:59:59 SELL Size: -1 / Price: 2994.94
02 2005-04-11 23:59:59 BUY  Size: +1 / Price: 3134.80
03 2005-04-11 23:59:59 BUY  Size: +1 / Price: 3134.80
04 2005-04-19 23:59:59 SELL Size: -1 / Price: 2904.15
05 2005-04-19 23:59:59 SELL Size: -1 / Price: 2904.15
06 2005-05-19 23:59:59 BUY  Size: +1 / Price: 3080.40
...
35 2006-12-19 23:59:59 BUY  Size: +1 / Price: 4182.83
```

A matching expression for the matched prices would be: OMG! (Oh My God!). The prices are clearly outside of the range. Suffice to look at operation 35, which has been matched at `4182.83`. A quick inspection of the chart in this document shows that the asset never came close to that price.

`slip_match` has a default of `True` and that means that _backtrader_ offers a match, be it with capped or uncapped prices as seen above. Let’s disable it:

```
$ ./slippage.py --slip_perc 0.015 --slip_open --no-slip_match
01 2005-04-15 23:59:59 SELL Size: -1 / Price: 3028.10
02 2005-05-18 23:59:59 BUY  Size: +1 / Price: 3029.40
03 2005-06-01 23:59:59 BUY  Size: +1 / Price: 3124.03
04 2005-10-06 23:59:59 SELL Size: -1 / Price: 3365.57
05 2005-10-06 23:59:59 SELL Size: -1 / Price: 3365.57
06 2005-12-01 23:59:59 BUY  Size: +1 / Price: 3499.95
07 2005-12-01 23:59:59 BUY  Size: +1 / Price: 3499.95
08 2006-02-28 23:59:59 SELL Size: -1 / Price: 3782.71
09 2006-02-28 23:59:59 SELL Size: -1 / Price: 3782.71
10 2006-05-23 23:59:59 BUY  Size: +1 / Price: 3594.68
11 2006-05-23 23:59:59 BUY  Size: +1 / Price: 3594.68
12 2006-11-27 23:59:59 SELL Size: -1 / Price: 3984.37
13 2006-11-27 23:59:59 SELL Size: -1 / Price: 3984.37
```

Blistering barnacles! Down to 13 from 35. The rationale:

Deactivating `slip_match` disallows matching operations if _slippage_ would push the matching price above the `high` or below the `low` of the bar. It seems that with the `1.5%` of requested _slippage_, around 22 of the operations fail to be executed.

The examples should have shown how the different _slippage_ options work together.
