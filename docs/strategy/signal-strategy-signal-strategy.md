---
source: https://www.backtrader.com/docu/signal_strategy/signal_strategy/
fetched: 2026-07-17
title: "Strategy - Signals"
---

# Strategy with Signals

Operating _backtrader_ is also possible without having to write a _Strategy_. Although this is the preferred way, due to the object hierarchy which makes up the machinery, using _Signals_ is also possible.

Quick summary:

*   Instead of writing a _Strategy_ class, instantiating _Indicators_, writing the _buy/sell_ logic …
    
*   The end user add _Signals_ (indicators anyhow) and the rest is done in the background
    

Quick example:

```
import backtrader as bt

data = bt.feeds.OneOfTheFeeds(dataname='mydataname')
cerebro.adddata(data)

cerebro.add_signal(bt.SIGNAL_LONGSHORT, MySignal)
cerebro.run()
```

Et voilá!.

Of course the _Signal_ itself is missing. Let’s define a very dumb _Signal_ which yields:

*   `Long` indication if the `close` price is above a _Simple Moving Average_
    
*   `Short` indication if the `close` price is below a _Simple Moving Average_
    

The definition:

```
class MySignal(bt.Indicator):
    lines = ('signal',)
    params = (('period', 30),)

    def __init__(self):
        self.lines.signal = self.data - bt.indicators.SMA(period=self.p.period)
```

And now it is really done. When `run` is executed _Cerebro_ will take care of instantiating a special _Strategy_ instance which knows what to do with the _Signals_.

## Initial _FAQ_

*   How is the volume of _buy_/_sell_ operations determined?
    
    A _cerebro_ instance adds automatically a `FixedSize` sizer to strategies. The end user can change the sizer to alter the policy with `cerebro.addsizer`
    
*   How are orders executed?
    
    The execution type is `Market` and the validity is _Good Until Canceled_
    

## _Signals_ technicalities

From a technical and theoretical point of view can be as described:

*   A callable that returns another _object_ when called (only once)
    
    This is in most cases the instantiation of a class, but must not be
    
*   Supports the `__getitem__` interface. The only requested _key_/_index_ will be `0`
    

From a practical point of view and looking at the example above a _Signal_ is:

*   A _lines_ object from the _backtrader_ ecosystem, mostly an _Indicator_
    
    This helps when using other _Indicators_ like when in the example the _Simple Moving Average_ is used.
    

## _Signals_ indications

The _signals_ delivers indications when queried with `signal[0]` and the meaning is:

*   `> 0` -> `long indication`
    
*   `< 0` -> `short indication`
    
*   `== 0` -> _No indication_
    

The example does simple arithmetic with `self.data - SMA` and:

*   Issues a `long indication` when the `data` is above the `SMA`
    
*   Issues a `short indication` when the `data` is below the `SMA`
    

> Note
>
> When no specific price field is indicated for the `data`, the `close` price is the reference price is.

## _Signals_ Types

The _constants_ indicated below as seen in the example above, are directly available from the main _backtrader_ module as in:

```
import backtrader as bt

bt.SIGNAL_LONG
```

There are 5 types of _Signals_, broken in 2 groups.

**Main Group**:

*   `LONGSHORT`: both `long` and `short` indications from this signal are taken
    
*   `LONG`:
    
    *   `long` indications are taken to go long
        
    *   `short` indications are taken to _close_ the long position. But:
        
    *   If a `LONGEXIT` (see below) signal is in the system it will be used to exit the long
        
    *   If a `SHORT` signal is available and no `LONGEXIT` is available , it will be used to close a `long` before opening a `short`
        
*   `SHORT`:
    
    *   `short` indications are taken to go short
        
    *   `long` indications are taken to _close_ the short position. But:
        
    *   If a `SHORTEXIT` (see below) signal is in the system it will be used to exit the short
        
    *   If a `LONG` signal is available and no `SHORTEXIT` is available , it will be used to close a `short` before opening a `long`
        

**Exit Group**:

This 2 signals are meant to override others and provide criteria for exitins a `long` / `short` position

*   `LONGEXIT`: `short` indications are taken to exit `long` positions
    
*   `SHORTEXIT`: `long` indications are taken to exit `short` positions
    

## Accumulation and Order Concurrency

The sample _Signal_ shown above will issue _long_ and _short_ indications on a constant basis, because it simply substracts the `SMA` value from the `close` price and this will always be either `> 0` and `< 0` ( `0` is mathematically possible, but unlikely to really happen)

This would lead to a continuous generation of _orders_ that would produce 2 situations:

*   `Accumulation`: even if already in the market, the _signals_ would produce new orders which would increase the possition in the market
    
*   `Concurrency`: new orders would be generated without waiting for the execution of other orders
    

To avoid this the default behavior is:

*   _To Not Accumulate_
    
*   _To Not allow Concurrency_
    

Should any of these two behaviors be wished, this can be controlled via `cerebro` with:

*   `cerebro.signal_accumulate(True)` (or `False` to re-disable it)
    
*   `cerebro.signal_concurrency(True)` (or `False` to re-disable it)
    

## The sample

The _backtrader_ sources contain a sample to test the functionality.

Main signal to be used.

```
class SMACloseSignal(bt.Indicator):
    lines = ('signal',)
    params = (('period', 30),)

    def __init__(self):
        self.lines.signal = self.data - bt.indicators.SMA(period=self.p.period)
```

And the _Exit Signal_ in case the option is specified.

```
class SMAExitSignal(bt.Indicator):
    lines = ('signal',)
    params = (('p1', 5), ('p2', 30),)

    def __init__(self):
        sma1 = bt.indicators.SMA(period=self.p.p1)
        sma2 = bt.indicators.SMA(period=self.p.p2)
        self.lines.signal = sma1 - sma2
```

### First run: long and short

```
$ ./signals-strategy.py --plot --signal longshort
```

The output

[![image](../signal-longshort.png)](https://www.backtrader.com/docu/signal_strategy/signal-longshort.png)

To notice:

*   The _Signal_ is plotted. This is normal given it is simply an indicator and the plotting rules for it apply
    
*   The strategy is really `long` and `short`. This can be seen because the _cash_ level never goes back to be the _value_ level
    
*   Side note: even for a dumb idea … (and without commission) the strategy hasn’t lost money …
    

### Second run: long only

```
$ ./signals-strategy.py --plot --signal longonly
```

The output

[![image](../signal-longonly.png)](https://www.backtrader.com/docu/signal_strategy/signal-longonly.png)

To notice:

*   Here the cash level goes back to be the _value_ level after each _sell_, which means the strategy is out of the market
    
*   Side note: Again no money has been lost …
    

### Third run: short only

```
$ ./signals-strategy.py --plot --signal shortonly
```

The output

[![image](../signal-shortonly.png)](https://www.backtrader.com/docu/signal_strategy/signal-shortonly.png)

To notice:

*   The 1st operation is a _sell_ as expected and takes place later than the 1st operation in the 2 examples above. Not until the `close` is below the `SMA` and the simple substraction yields a minus
    
*   Here the cash level goes back to be the _value_ level after each _buy_, which means the strategy is out of the market
    
*   Side note: Finally the system loses money
    

### Fourth run: long + longexit

```
$ ./signals-strategy.py --plot --signal longonly --exitsignal longexit
```

The output

[![image](../signal-long-longexit.png)](https://www.backtrader.com/docu/signal_strategy/signal-long-longexit.png)

To notice:

*   Many of the trades are the same, but some are interrupted earlier because the fast moving average in the _exit_ signal crosses the slow moving average to the downside
    
*   The system shows its _longonly_ property with the cash becoming the value at the end of each trade
    
*   Side note: Again money is made … even with some modified trades
    

### Usage

```
$ ./signals-strategy.py --help
usage: signals-strategy.py [-h] [--data DATA] [--fromdate FROMDATE]
                           [--todate TODATE] [--cash CASH]
                           [--smaperiod SMAPERIOD] [--exitperiod EXITPERIOD]
                           [--signal {longshort,longonly,shortonly}]
                           [--exitsignal {longexit,shortexit}]
                           [--plot [kwargs]]

Sample for Signal concepts

optional arguments:
  -h, --help            show this help message and exit
  --data DATA           Specific data to be read in (default:
                        ../../datas/2005-2006-day-001.txt)
  --fromdate FROMDATE   Starting date in YYYY-MM-DD format (default: None)
  --todate TODATE       Ending date in YYYY-MM-DD format (default: None)
  --cash CASH           Cash to start with (default: 50000)
  --smaperiod SMAPERIOD
                        Period for the moving average (default: 30)
  --exitperiod EXITPERIOD
                        Period for the exit control SMA (default: 5)
  --signal {longshort,longonly,shortonly}
                        Signal type to use for the main signal (default:
                        longshort)
  --exitsignal {longexit,shortexit}
                        Signal type to use for the exit signal (default: None)
  --plot [kwargs], -p [kwargs]
                        Plot the read data applying any kwargs passed For
                        example: --plot style="candle" (to plot candles)
                        (default: None)
```

### The code

```
from __future__ import (absolute_import, division, print_function,
                        unicode_literals)

import argparse
import collections
import datetime

import backtrader as bt

MAINSIGNALS = collections.OrderedDict(
    (('longshort', bt.SIGNAL_LONGSHORT),
     ('longonly', bt.SIGNAL_LONG),
     ('shortonly', bt.SIGNAL_SHORT),)
)


EXITSIGNALS = {
    'longexit': bt.SIGNAL_LONGEXIT,
    'shortexit': bt.SIGNAL_LONGEXIT,
}


class SMACloseSignal(bt.Indicator):
    lines = ('signal',)
    params = (('period', 30),)

    def __init__(self):
        self.lines.signal = self.data - bt.indicators.SMA(period=self.p.period)


class SMAExitSignal(bt.Indicator):
    lines = ('signal',)
    params = (('p1', 5), ('p2', 30),)

    def __init__(self):
        sma1 = bt.indicators.SMA(period=self.p.p1)
        sma2 = bt.indicators.SMA(period=self.p.p2)
        self.lines.signal = sma1 - sma2


def runstrat(args=None):
    args = parse_args(args)

    cerebro = bt.Cerebro()
    cerebro.broker.set_cash(args.cash)

    dkwargs = dict()
    if args.fromdate is not None:
        fromdate = datetime.datetime.strptime(args.fromdate, '%Y-%m-%d')
        dkwargs['fromdate'] = fromdate

    if args.todate is not None:
        todate = datetime.datetime.strptime(args.todate, '%Y-%m-%d')
        dkwargs['todate'] = todate

    # if dataset is None, args.data has been given
    data = bt.feeds.BacktraderCSVData(dataname=args.data, **dkwargs)
    cerebro.adddata(data)

    cerebro.add_signal(MAINSIGNALS[args.signal],
                       SMACloseSignal, period=args.smaperiod)

    if args.exitsignal is not None:
        cerebro.add_signal(EXITSIGNALS[args.exitsignal],
                           SMAExitSignal,
                           p1=args.exitperiod,
                           p2=args.smaperiod)

    cerebro.run()
    if args.plot:
        pkwargs = dict(style='bar')
        if args.plot is not True:  # evals to True but is not True
            npkwargs = eval('dict(' + args.plot + ')')  # args were passed
            pkwargs.update(npkwargs)

        cerebro.plot(**pkwargs)


def parse_args(pargs=None):

    parser = argparse.ArgumentParser(
        formatter_class=argparse.ArgumentDefaultsHelpFormatter,
        description='Sample for Signal concepts')

    parser.add_argument('--data', required=False,
                        default='../../datas/2005-2006-day-001.txt',
                        help='Specific data to be read in')

    parser.add_argument('--fromdate', required=False, default=None,
                        help='Starting date in YYYY-MM-DD format')

    parser.add_argument('--todate', required=False, default=None,
                        help='Ending date in YYYY-MM-DD format')

    parser.add_argument('--cash', required=False, action='store',
                        type=float, default=50000,
                        help=('Cash to start with'))

    parser.add_argument('--smaperiod', required=False, action='store',
                        type=int, default=30,
                        help=('Period for the moving average'))

    parser.add_argument('--exitperiod', required=False, action='store',
                        type=int, default=5,
                        help=('Period for the exit control SMA'))

    parser.add_argument('--signal', required=False, action='store',
                        default=MAINSIGNALS.keys()[0], choices=MAINSIGNALS,
                        help=('Signal type to use for the main signal'))

    parser.add_argument('--exitsignal', required=False, action='store',
                        default=None, choices=EXITSIGNALS,
                        help=('Signal type to use for the exit signal'))

    # Plot options
    parser.add_argument('--plot', '-p', nargs='?', required=False,
                        metavar='kwargs', const=True,
                        help=('Plot the read data applying any kwargs passed\n'
                              '\n'
                              'For example:\n'
                              '\n'
                              '  --plot style="candle" (to plot candles)\n'))

    if pargs is not None:
        return parser.parse_args(pargs)

    return parser.parse_args()


if __name__ == '__main__':
    runstrat()
```
