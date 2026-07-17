---
source: https://www.backtrader.com/docu/cerebro/cheat-on-open/cheat-on-open/
fetched: 2026-07-17
title: "Broker - Cheat-On-Open"
---

# Cheat On Open

Release `1.9.44.116` adds support for `Cheat-On-Open`. This seems to be a demanded feature for people who go _all-in_, having made a calculation after the close of a bar, but expecting to be matched against the `open` price.

Such a use case fails when the _opening_ price gaps (up or down, depending on whether `buy` or `sell` is in effect) and the cash is not enough for an _all-in_ operation. This forces the broker to reject the operation.

And although people can try to look into the future with a positive `[1]` index approach, this requires preloading data which is not always available.

The pattern:

```
cerebro = bt.Cerebro(cheat_on_open=True)
```

This:

*   Activates an extra cycle in the system which calls the methods in the strategy `next_open`, `nextstart_open` and `prenext_open`
    
    The decision to have an additional family of methods has been made to make a clear separation between the regular methods which operate on the basis that the prices being examined are no longer available and the future is unknown and the operation in cheating mode.
    
    This also avoids having 2 calls to the regular `next` method.
    

The following holds true when inside a `xxx_open` method:

*   The indicators have not been recalculated and hold the values that were last seen during the previous cycle in the equivalent `xxx` regular methods
    
*   The broker has not yet evaluated the pending orders for the new cycle and new orders can be introduced which will be evaluated if possible.
    

Notice that:

*   `Cerebro` also has a `broker_coo` (default: `True`) parameter which tells cerebro that if `cheat-on-open` has been activated, it shall try to activate it also in the broker if possible.
    
    The simulation broker has a parameter named: `coo` and a method to set it named `set_coo`
    

## Trying cheat-on-open

The sample below has a strategy with 2 different behaviors:

*   If _cheat-on-open_ is _True_, it will only operate from `next_open`
    
*   If _cheat-on-open_ is _False_, it will only operate from `next`
    

In both cases the matching price must be the **same**

*   If not cheating, the order is issued at the end of the previous day and will be matched with the next incoming price which is the `open` price
    
*   If cheating, the order is issued on the same day it is executed. Because the order is issued before the broker has evaluated orders, it will also be matched with the next incoming price, the `open` price.
    
    This second scenario, allows calculation of exact stakes for _all-in_ strategies, because one can directly access the current `open` price.
    

In both cases

*   The current `open` and `close` prices will be printed from `next`.

Regular execution:

```
$ ./cheat-on-open.py --cerebro cheat_on_open=False

...
2005-04-07 next, open 3073.4 close 3090.72
2005-04-08 next, open 3092.07 close 3088.92
Strat Len 68 2005-04-08 Send Buy, fromopen False, close 3088.92
2005-04-11 Buy Executed at price 3088.47
2005-04-11 next, open 3088.47 close 3080.6
2005-04-12 next, open 3080.42 close 3065.18
...
```

[![image](../cheating-off.png)](https://www.backtrader.com/docu/cerebro/cheat-on-open/cheating-off.png)

The order:

*   Is issued on 2005-04-08 after the _close_
    
*   It is executed on 2005-04-11 with the `open` price of `3088.47`
    

Cheating execution:

```
$ ./cheat-on-open.py --cerebro cheat_on_open=True

...
2005-04-07 next, open 3073.4 close 3090.72
2005-04-08 next, open 3092.07 close 3088.92
2005-04-11 Send Buy, fromopen True, close 3080.6
2005-04-11 Buy Executed at price 3088.47
2005-04-11 next, open 3088.47 close 3080.6
2005-04-12 next, open 3080.42 close 3065.18
...
```

[![image](../cheating-on.png)](https://www.backtrader.com/docu/cerebro/cheat-on-open/cheating-on.png)

The order:

*   Is issued on 2005-04-11 before the _open_
    
*   It is executed on 2005-04-11 with the `open` price of `3088.47`
    

And the overall result as seen on the chart is also the same.

## Conclusion

Cheating on the open allows issuing orders before the open which can for example allow the exact calculation of stakes for _all-in_ scenarios.

## Sample usage

```
$ ./cheat-on-open.py --help
usage: cheat-on-open.py [-h] [--data0 DATA0] [--fromdate FROMDATE]
                        [--todate TODATE] [--cerebro kwargs] [--broker kwargs]
                        [--sizer kwargs] [--strat kwargs] [--plot [kwargs]]

Cheat-On-Open Sample

optional arguments:
  -h, --help           show this help message and exit
  --data0 DATA0        Data to read in (default:
                       ../../datas/2005-2006-day-001.txt)
  --fromdate FROMDATE  Date[time] in YYYY-MM-DD[THH:MM:SS] format (default: )
  --todate TODATE      Date[time] in YYYY-MM-DD[THH:MM:SS] format (default: )
  --cerebro kwargs     kwargs in key=value format (default: )
  --broker kwargs      kwargs in key=value format (default: )
  --sizer kwargs       kwargs in key=value format (default: )
  --strat kwargs       kwargs in key=value format (default: )
  --plot [kwargs]      kwargs in key=value format (default: )
```

## Sample source

```
from __future__ import (absolute_import, division, print_function,
                        unicode_literals)

import argparse
import datetime

import backtrader as bt


class St(bt.Strategy):
    params = dict(
        periods=[10, 30],
        matype=bt.ind.SMA,
    )

    def __init__(self):
        self.cheating = self.cerebro.p.cheat_on_open
        mas = [self.p.matype(period=x) for x in self.p.periods]
        self.signal = bt.ind.CrossOver(*mas)
        self.order = None

    def notify_order(self, order):
        if order.status != order.Completed:
            return

        self.order = None
        print('{} {} Executed at price {}'.format(
            bt.num2date(order.executed.dt).date(),
            'Buy' * order.isbuy() or 'Sell', order.executed.price)
        )

    def operate(self, fromopen):
        if self.order is not None:
            return
        if self.position:
            if self.signal < 0:
                self.order = self.close()
        elif self.signal > 0:
            print('{} Send Buy, fromopen {}, close {}'.format(
                self.data.datetime.date(),
                fromopen, self.data.close[0])
            )
            self.order = self.buy()

    def next(self):
        print('{} next, open {} close {}'.format(
            self.data.datetime.date(),
            self.data.open[0], self.data.close[0])
        )

        if self.cheating:
            return
        self.operate(fromopen=False)

    def next_open(self):
        if not self.cheating:
            return
        self.operate(fromopen=True)


def runstrat(args=None):
    args = parse_args(args)

    cerebro = bt.Cerebro()

    # Data feed kwargs
    kwargs = dict()

    # Parse from/to-date
    dtfmt, tmfmt = '%Y-%m-%d', 'T%H:%M:%S'
    for a, d in ((getattr(args, x), x) for x in ['fromdate', 'todate']):
        if a:
            strpfmt = dtfmt + tmfmt * ('T' in a)
            kwargs[d] = datetime.datetime.strptime(a, strpfmt)

    # Data feed
    data0 = bt.feeds.BacktraderCSVData(dataname=args.data0, **kwargs)
    cerebro.adddata(data0)

    # Broker
    cerebro.broker = bt.brokers.BackBroker(**eval('dict(' + args.broker + ')'))

    # Sizer
    cerebro.addsizer(bt.sizers.FixedSize, **eval('dict(' + args.sizer + ')'))

    # Strategy
    cerebro.addstrategy(St, **eval('dict(' + args.strat + ')'))

    # Execute
    cerebro.run(**eval('dict(' + args.cerebro + ')'))

    if args.plot:  # Plot if requested to
        cerebro.plot(**eval('dict(' + args.plot + ')'))


def parse_args(pargs=None):
    parser = argparse.ArgumentParser(
        formatter_class=argparse.ArgumentDefaultsHelpFormatter,
        description=(
            'Cheat-On-Open Sample'
        )
    )

    parser.add_argument('--data0', default='../../datas/2005-2006-day-001.txt',
                        required=False, help='Data to read in')

    # Defaults for dates
    parser.add_argument('--fromdate', required=False, default='',
                        help='Date[time] in YYYY-MM-DD[THH:MM:SS] format')

    parser.add_argument('--todate', required=False, default='',
                        help='Date[time] in YYYY-MM-DD[THH:MM:SS] format')

    parser.add_argument('--cerebro', required=False, default='',
                        metavar='kwargs', help='kwargs in key=value format')

    parser.add_argument('--broker', required=False, default='',
                        metavar='kwargs', help='kwargs in key=value format')

    parser.add_argument('--sizer', required=False, default='',
                        metavar='kwargs', help='kwargs in key=value format')

    parser.add_argument('--strat', required=False, default='',
                        metavar='kwargs', help='kwargs in key=value format')

    parser.add_argument('--plot', required=False, default='',
                        nargs='?', const='{}',
                        metavar='kwargs', help='kwargs in key=value format')

    return parser.parse_args(pargs)


if __name__ == '__main__':
    runstrat()
```
