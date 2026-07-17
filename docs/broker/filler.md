---
source: https://www.backtrader.com/docu/filler/
fetched: 2026-07-17
title: "Broker - Volume Filling - Fillers"
---

# Fillers

The _backtrader_ broker simulation has a default strategy when it comes to using volume for order execution:

*   Ignore volume

This is based on 2 premises:

*   Trade in markets liquid enough to fully absorb _buy/sell_ orders in one go
    
*   Real volume matching requires a real wolrd
    
    A quick example is a `Fill or Kill` order. Even down to the _tick_ resolution and with enough volume for a _fill_, the _backtrader_ broker cannot know how many extra actors happen to be in the market to discriminate if such an order would be or would not be matched to stick to the `Fill` part or if the order should be `Kill`
    

But the _broker_ can accept _Volume Fillers_ which determine how much of the volume at a given point in time has to be used for _order matching_.

## The fillers signature

A _filler_ in the _backtrader_ ecosystem can be any _callable_ which matches the following signature:

```
callable(order, price, ago)
```

Where:

*   `order` is the order which is going to be executed
    
    This object gives access to the `data` object which is the target of the operation, creation sizes/prices, execution prices/sizes/remaining sizes and other details
    
*   `price` at which the order is going to be executed
    
*   `ago` is the index to the `data` in the _order_ in which to look for the volume and price elements
    
    In almost all cases this will be `0` (current point in time) but in a corner case to cover `Close` orders this may be `-1`
    
    To for example access the bar volume do:
    
    ```
    barvolume = order.data.volume[ago]
    ```
    

The callable can be a function or for example an instance of a class supporting the `__call__` method, like in:

```
class MyFiller(object):
    def __call__(self, order, price, ago):
        pass
```

## Adding a Filler to the broker

The most straightforward method is to use the `set_filler`:

```
import backtrader as bt

cerebro = Cerebro()
cerebro.broker.set_filler(bt.broker.fillers.FixedSize())
```

The second choice is to completely replace the `broker`, although this is probably only meant for subclasses of `BrokerBack` which have rewritten portions of the functionality:

```
import backtrader as bt

cerebro = Cerebro()
filler = bt.broker.fillers.FixedSize()
newbroker = bt.broker.BrokerBack(filler=filler)
cerebro.broker = newbroker
```

## The sample

The _backtrader_ sources contain a sample named `volumefilling` which allows to test some of the integrated `fillers` (initially all)

## Reference

#### class backtrader.fillers.FixedSize()

Returns the execution size for a given order using a _percentage_ of the volume in a bar.

This percentage is set with the parameter `perc`

Params:

*   `size` (default: `None`) maximum size to be executed. The actual volume of the bar at execution time is also a limit if smaller than the size
    
    If the value of this parameter evaluates to False, the entire volume of the bar will be used to match the order
    

#### class backtrader.fillers.FixedBarPerc()

Returns the execution size for a given order using a _percentage_ of the volume in a bar.

This percentage is set with the parameter `perc`

Params:

*   `perc` (default: `100.0`) (valied values: `0.0 - 100.0`)
    
    Percentage of the volume bar to use to execute an order
    

#### class backtrader.fillers.BarPointPerc()

Returns the execution size for a given order. The volume will be distributed uniformly in the range _high_\-_low_ using `minmov` to partition.

From the allocated volume for the given price, the `perc` percentage will be used

Params:

*   `minmov` (default: `0.01`)
    
    Minimum price movement. Used to partition the range _high_\-_low_ to proportionally distribute the volume amongst possible prices
    
*   `perc` (default: `100.0`) (valied values: `0.0 - 100.0`)
    
    Percentage of the volume allocated to the order execution price to use for matching
