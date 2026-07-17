---
source: https://www.backtrader.com/docu/sizers/sizers/
fetched: 2026-07-17
title: "Sizers"
---

# Sizers

*   Smart Staking

A _Strategy_ offers methods to trade, namely: `buy`, `sell` and `close`. Let’s see the signature of `buy`:

```
def buy(self, data=None,
        size=None, price=None, plimit=None,
        exectype=None, valid=None, tradeid=0, **kwargs):
```

Notice that `size` has a default value of `None` if the caller does not specify it. This is where _Sizers_ play an important role:

*   `size=None` requests that the _Strategy_ asks its _Sizer_ for the actual stake

This obviously implies that _Strategies_ have a _Sizer_: Yes, indeed!. The background machinery adds a default sizer to a _Strategy_ if the user has not added one. The default _Sizer_ added to a _strategy_ is `SizerFix`. The initial lines of the definition:

```
class SizerFix(SizerBase):
    params = (('stake', 1),)
```

It is easy to guess that this _Sizer_ simply _buys/sells_ using a `stake` of `1` units (be it shares, contracts, …)

## Using _Sizers_

### From _Cerebro_

_Sizers_ can be added via _Cerebro_ with 2 different methods:

*   `addsizer(sizercls, *args, **kwargs)`
    
    Adds a _Sizer_ that will be applied to any strategy added to _cerebro_. This is, so to to say, the default _Sizer_. Example:
    
    ```
    cerebro = bt.Cerebro()
    cerebro.addsizer(bt.sizers.SizerFix, stake=20)  # default sizer for strategies
    ```
    
*   `addsizer_byidx(idx, sizercls, *args, **kwargs)`
    
    The _Sizer_ will only be added to the _Strategy_ referenced by `idx`
    
    This `idx` can be gotten as return value from `addstrategy`. As in:
    
    ```
    cerebro = bt.Cerebro()
    cerebro.addsizer(bt.sizers.SizerFix, stake=20)  # default sizer for strategies
    
    idx = cerebro.addstrategy(MyStrategy, myparam=myvalue)
    cerebro.addsizer_byidx(idx, bt.sizers.SizerFix, stake=5)
    
    cerebro.addstrategy(MyOtherStrategy)
    ```
    
    In this example:
    
    *   A default _Sizer_ has been added to the system. This one applies to all strategies which don’t have a specific _Sizer_ assigned
        
    *   For _MyStrategy_ and after collecting its insertion _idx_, a specific sizer (changing the `stake` param) is added
        
    *   A 2nd strategy, _MyOtherStrategy_, is added to the system. No specific _Sizer_ is added for it
        
    *   This means that:
        
        *   _MyStrategy_ will finally have an internal specific _Sizer_
            
        *   _MyOtherStrategy_ will get the default sizer
            

> Note
>
> _default_ doesn’t mean that that the strategies share a single _Sizer_ instance. Each _strategy_ receives a different instance of the _default_ sizer
>
> To share a single instance, the sizer to be shared should be a singleton class. How to define one is outside of the scope of _backtrader_

### From _Strategy_

The _Strategy_ class offers an API: `setsizer` and `getsizer` (and a _property_ `sizer`) to manage the _Sizer_. The signatures:

*   `def setsizer(self, sizer)`: it takes an already instantiated _Sizer_
    
*   `def getsizer(self)`: returns the current _Sizer_ instance
    
*   `sizer` it is the property which can be directly _get/set_
    

In this scenario the _Sizer_ can be for example:

*   Passed to the strategy as a parameter
    
*   Be set during `__init__` using the property `sizer` or `setsizer` as in:
    
    ```
    class MyStrategy(bt.Strategy):
        params = (('sizer', None),)
    
        def __init__(self):
            if self.p.sizer is not None:
                self.sizer = self.p.sizer
    ```
    
    This would for example allow to create a _Sizer_ at the same level as the _cerebro_ calls are happening and pass it as a parameter to all strategies that go in the system, which effectevily allows sharing a _Sizer_
    

## _Sizer_ Development

Doing it is easy:

1.  Subclass from `backtrader.Sizer`
    
    This gives you access to `self.strategy` and `self.broker` although it shouldn’t be needed in most cases. Things that can be accessed with the `broker`
    
    *   data’s position with `self.strategy.getposition(data)`
        
    *   complete portfolio value through `self.broker.getvalue()`
        
        Notice this could of course also be done with `self.strategy.broker.getvalue()`
        
    
    Some of the other things are already below as arguments
    
2.  Override the method `_getsizing(self, comminfo, cash, data, isbuy)`
    
    *   `comminfo`: The CommissionInfo instance that contains information about the commission for the data and allows calculation of position value, operation cost, commision for the operation
        
    *   `cash`: current available cash in the _broker_
        
    *   `data`: target of the operation
        
    *   `isbuy`: will be `True` for _buy_ operations and `False` for _sell_ operations
        
    
    This method returns the desired `size` for the _buy/sell_ operation
    
    The returned sign is not relevant, ie: if the operation is a _sell_ operation (`isbuy` will be `False`) the method may return `5` or `-5`. Only the absolute value will be used by the _sell_ operation.
    
    `Sizer` has already gone to the `broker` and requested the _commission information_ for the given _data_, the actual _cash_ level and provides a direct reference to the _data_ which is the target of the operation
    

Let’s go for the definition of the `FixedSize` sizer:

```
import backtrader as bt

class FixedSize(bt.Sizer):
    params = (('stake', 1),)

    def _getsizing(self, comminfo, cash, data, isbuy):
        return self.params.stake
```

This is pretty simple in that the _Sizer_ makes no calculations and the parameters are just there.

But the mechanism should allow the construction of complex _sizing_ (aka _positioning_) systems to manage the stakes when entering/exiting the market.

Another example: **A position rerverser**:

```
class FixedRerverser(bt.FixedSize):

    def _getsizing(self, comminfo, cash, data, isbuy):
        position = self.broker.getposition(data)
        size = self.p.stake * (1 + (position.size != 0))
        return size
```

This one builds on the existing `FixedSize` to inherit the `params` and overrides `_getsizing` to:

*   Get the `position` of the _data_ via the attribute `broker`
    
*   Use `position.size` to decide if to double the fixed stake
    
*   Return the calculated value
    

This would remove the burden from the _Strategy_ to decide if a position has to be reversed or opened, the _Sizer_ is in control and can at any time be replaced without affecting the logic.

## Practical _Sizer_ Applicability

Wihtout considering complex sizing algorithms, two different sizers can be used to _turn a strategy from Long-Only to Long-Short_. Simply by changing the _Sizer_ in the _cerebro_ execution, the strategy will change behavior. A very simple `close` crosses `SMA` algorithm:

```
class CloseSMA(bt.Strategy):
    params = (('period', 15),)

    def __init__(self):
        sma = bt.indicators.SMA(self.data, period=self.p.period)
        self.crossover = bt.indicators.CrossOver(self.data, sma)

    def next(self):
        if self.crossover > 0:
            self.buy()

        elif self.crossover < 0:
            self.sell()
```

Notice how the strategy doesn’t consider the current _position_ (by looking at `self.position`) to decide whether a _buy_ or _sell_ has to actually be done. Only the _signal_ from the `CrossOver` is considered. The _Sizers_ will be in charge of everything.

This sizer will take care of only returning a _non-zero_ size when selling if a position is already open:

```
class LongOnly(bt.Sizer):
    params = (('stake', 1),)

    def _getsizing(self, comminfo, cash, data, isbuy):
      if isbuy:
          return self.p.stake

      # Sell situation
      position = self.broker.getposition(data)
      if not position.size:
          return 0  # do not sell if nothing is open

      return self.p.stake
```

Putting it all together (and assuming _backtrader_ has already been imported and a _data_ has been added to the system):

```
...
cerebro.addstrategy(CloseSMA)
cerebro.addsizer(LongOnly)
...
cerebro.run()
...
```

The chart (from the sample included in the sources to test this).

[![image](../sizer-long-only.png)](https://www.backtrader.com/docu/sizers/sizer-long-only.png)

The _Long-Short_ version simply changes the _Sizer_ to be the `FixedReverser` shown above:

```
...
cerebro.addstrategy(CloseSMA)
cerebro.addsizer(FixedReverser)
...
cerebro.run()
...
```

The output chart.

[![image](../sizer-fixedreverser.png)](https://www.backtrader.com/docu/sizers/sizer-fixedreverser.png)

Notice the differences:

*   The number of _trades_ has duplicated
    
*   The cash level never goes back to be the _value_ because the strategy is _always_ in the market
    

Both approaches are anyhow negative, but this is only an example.

## _bt.Sizer_ Reference

#### class backtrader.Sizer()

This is the base class for _Sizers_. Any _sizer_ should subclass this and override the `_getsizing` method

Member Attribs:

*   `strategy`: will be set by the strategy in which the sizer is working
    
    Gives access to the entire api of the strategy, for example if the actual data position would be needed in `_getsizing`:
    
    ```
    position = self.strategy.getposition(data)
    ```
    
*   `broker`: will be set by the strategy in which the sizer is working
    
    Gives access to information some complex sizers may need like portfolio value, ..
    

#### \_getsizing(comminfo, cash, data, isbuy)

This method has to be overriden by subclasses of Sizer to provide the sizing functionality

Params:

```
* `comminfo`: The CommissionInfo instance that contains
  information about the commission for the data and allows
  calculation of position value, operation cost, commision for the
  operation

* `cash`: current available cash in the *broker*

* `data`: target of the operation

* `isbuy`: will be `True` for *buy* operations and `False`
  for *sell* operations
```

The method has to return the actual size (an int) to be executed. If `0` is returned nothing will be executed.

The absolute value of the returned value will be used
