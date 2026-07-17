---
source: https://www.backtrader.com/docu/order_target/order_target/
fetched: 2026-07-17
title: "Orders - Target Orders"
---

# Target Orders

Until version `1.8.10.96` smart staking was possible with _backtrader_ over the _Strategy_ methods: `buy` and `sell`. It was all about adding a `Sizer` to the equation which is responsible for the size of the stake.

What a _Sizer_ cannot do is decide if the operation has to be a _buy_ or a _sell_. And that means that a new concept is needed in which a small intelligence layer is added to make such decision.

Here is where the family of `order_target_xxx` methods in the _Strategy_ come into play. Inspired by the ones in `zipline`, the methods offer the chance to simply specify the final _target_, be the target:

*   `size` -> amount of shares, contracts in the portfolio of a specific asset
    
*   `value` -> value in monetary units of the asset in the portfolio
    
*   `percent` -> percentage (from current portfolio) value of the asset in the current portfolio
    

> Note
>
> The reference for the methods can be found in Strategy. The summary is that the methods use the same _signature_ as `buy` and `sell` except for the parameter `size` which is replaced by the parameter `target`

In this case it is all about specifying the final _target_ and the method decides if an operation will be a _buy_ or a _sell_. The same logic applies to the 3 methods. Let’s tart with `order_target_size`

*   If the _target_ is greater than the position a _buy_ is issued, with the difference `target - position_size`
    
    Examples:
    
    *   Pos: `0`, _target_: `7` -> _buy(size=7 - 0)_ -> _buy(size=7)_
        
    *   Pos: `3`, _target_: `7` -> _buy(size=7 - 3)_ -> _buy(size=4)_
        
    *   Pos: `-3`, _target_: `7` -> _buy(size=7 - -3)_ -> _buy(size=10)_
        
    *   Pos: `-3`, _target_: `-2` -> _buy(size=-2 - -3)_ -> _buy(size=1)_
        
*   If the _target_ is smaller than the position a _sell_ is issued with the difference `position_size - target`
    
    Examples:
    
    *   Pos: `0`, _target_: `-7` -> _sell(size=0 - -7)_ -> _sell(size=7)_
        
    *   Pos: `3`, _target_: `-7` -> _sell(size=3 - -7)_ -> _sell(size=10)_
        
    *   Pos: `-3`, _target_: `-7` -> _sell(size=-3 - -7)_ -> _sell(size=4)_
        
    *   Pos: `3`, _target_: `2` -> _sell(size=3 - 2)_ -> _sell(size=1)_
        

When targetting a value with `order_target_value`, the current _value_ of the asset in the portfolio and the _position size_ are both taken into account to decide what the final underlying operation will be. The reasoning:

*   If _position size_ is negative (_short_) and the _target value_ has to be greater than the current value, this means: _sell_ more

As such the logic works as follows:

*   If `target > value` and `size >=0` -> _buy_
    
*   If `target > value` and `size < 0` -> _sell_
    
*   If `target < value` and `size >= 0` -> _sell_
    
*   If `target < value` and `size < 0` -> _buy_
    

The logic for `order_target_percent` is the same as that of `order_target_value`. This method simply takes into account the current total value of the portfolio to determine the _target value_ for the asset.

## The Sample

_backtrader_ tries to have a sample for each new functionality and this is no exception. No bells and whistles, just something to test the results are as expected. This one is under the `order_target` directory in the samples.

The logic in the sample is rather dumb and only meaant for testing:

*   During _odd months_ (Jan, Mar, …), use the _day_ as target (in the case of `order_target_value` multiplying the day by `1000`)
    
    This mimics an increasing _target_
    
*   During _even months_ (Feb, Apr, …) use `31 - day` as the _target_
    
    This mimics an decreasing _target_
    

### order\_target\_size

Let’s see what happens in _Jan_ and _Feb_.

```
$ ./order_target.py --target-size -- plot
0001 - 2005-01-03 - Position Size:     00 - Value 1000000.00
0001 - 2005-01-03 - Order Target Size: 03
0002 - 2005-01-04 - Position Size:     03 - Value 999994.39
0002 - 2005-01-04 - Order Target Size: 04
0003 - 2005-01-05 - Position Size:     04 - Value 999992.48
0003 - 2005-01-05 - Order Target Size: 05
0004 - 2005-01-06 - Position Size:     05 - Value 999988.79
...
0020 - 2005-01-31 - Position Size:     28 - Value 999968.70
0020 - 2005-01-31 - Order Target Size: 31
0021 - 2005-02-01 - Position Size:     31 - Value 999954.68
0021 - 2005-02-01 - Order Target Size: 30
0022 - 2005-02-02 - Position Size:     30 - Value 999979.65
0022 - 2005-02-02 - Order Target Size: 29
0023 - 2005-02-03 - Position Size:     29 - Value 999966.33
0023 - 2005-02-03 - Order Target Size: 28
...
```

In _Jan_ the _target_ starts at `3` with the 1st trading day of the year and increases. And the _position_ size moves initially from `0` to `3` and then in increments of `1`.

Finishing _Jan_ the last _order\_target_ is for `31` and that _position size_ is reported when entering the 1st day of _Feb_, when the new _target side_ is requested to be `30` and goes changing along with the position in decrements of ´1\`.

[![image](../order_target_size.png)](https://www.backtrader.com/docu/order_target/order_target_size.png)

### order\_target\_value

A similar behavior is expected from _target values_

```
$ ./order_target.py --target-value --plot
0001 - 2005-01-03 - Position Size:     00 - Value 1000000.00
0001 - 2005-01-03 - data value 0.00
0001 - 2005-01-03 - Order Target Value: 3000.00
0002 - 2005-01-04 - Position Size:     78 - Value 999854.14
0002 - 2005-01-04 - data value 2853.24
0002 - 2005-01-04 - Order Target Value: 4000.00
0003 - 2005-01-05 - Position Size:     109 - Value 999801.68
0003 - 2005-01-05 - data value 3938.17
0003 - 2005-01-05 - Order Target Value: 5000.00
0004 - 2005-01-06 - Position Size:     138 - Value 999699.57
...
0020 - 2005-01-31 - Position Size:     808 - Value 999206.37
0020 - 2005-01-31 - data value 28449.68
0020 - 2005-01-31 - Order Target Value: 31000.00
0021 - 2005-02-01 - Position Size:     880 - Value 998807.33
0021 - 2005-02-01 - data value 30580.00
0021 - 2005-02-01 - Order Target Value: 30000.00
0022 - 2005-02-02 - Position Size:     864 - Value 999510.21
0022 - 2005-02-02 - data value 30706.56
0022 - 2005-02-02 - Order Target Value: 29000.00
0023 - 2005-02-03 - Position Size:     816 - Value 999130.05
0023 - 2005-02-03 - data value 28633.44
0023 - 2005-02-03 - Order Target Value: 28000.00
...
```

There is an extra line of information telling what the actual _data value_ (in the portfolio) is. This helps in finding out if the _target value_ has been reachec.

The initial target is `3000.0` and the reported initial value is `2853.24`. The question here is whether this is _close enough_. And the answer is _Yes_

*   The sample uses a `Market` order at the end of a daily bar and the last available price to calculate a _target size_ which meets the _target value_
    
*   The execution uses then the `open` price of the next day and this is unlikely to be the previous `close`
    

Doing it in any other way would mean one is _cheating_ him/herfself.

The next _target value_ and _final value_ are much closer: `4000` and `3938.17`.

When changing into _Feb_ the _target value_ starts decreasing from `31000` to `30000` and `29000`. So does the _data value_ with from `30580.00` to `30706.56` and then to `28633.44`. Wait:

*   `30580` -> `30706.56` is a positive change
    
    Indeed. In this case the calculated _size_ for the _target value_ met an _opening price_ which bumped the value to `30706.56`
    

How this effect can be avoided:

*   The sample uses a `Market` type execution for the orders and this effect cannot be avoided
    
*   The methods `order_target_xxx` allow specifying the _execution type_ and _price_.
    
    One could specify `Limit` as the execution order and let the price be the _close_ price (chosen by the method if nothing else be provided) or even provide specific pricing
    

[![image](../order_target_value.png)](https://www.backtrader.com/docu/order_target/order_target_value.png)

### order\_target\_percent

In this case it is simply a percentage of the current portfolio value.

```
$ ./order_target.py --target-percent --plot
0001 - 2005-01-03 - Position Size:     00 - Value 1000000.00
0001 - 2005-01-03 - data percent 0.00
0001 - 2005-01-03 - Order Target Percent: 0.03
0002 - 2005-01-04 - Position Size:     785 - Value 998532.05
0002 - 2005-01-04 - data percent 0.03
0002 - 2005-01-04 - Order Target Percent: 0.04
0003 - 2005-01-05 - Position Size:     1091 - Value 998007.44
0003 - 2005-01-05 - data percent 0.04
0003 - 2005-01-05 - Order Target Percent: 0.05
0004 - 2005-01-06 - Position Size:     1381 - Value 996985.64
...
0020 - 2005-01-31 - Position Size:     7985 - Value 991966.28
0020 - 2005-01-31 - data percent 0.28
0020 - 2005-01-31 - Order Target Percent: 0.31
0021 - 2005-02-01 - Position Size:     8733 - Value 988008.94
0021 - 2005-02-01 - data percent 0.31
0021 - 2005-02-01 - Order Target Percent: 0.30
0022 - 2005-02-02 - Position Size:     8530 - Value 995005.45
0022 - 2005-02-02 - data percent 0.30
0022 - 2005-02-02 - Order Target Percent: 0.29
0023 - 2005-02-03 - Position Size:     8120 - Value 991240.75
0023 - 2005-02-03 - data percent 0.29
0023 - 2005-02-03 - Order Target Percent: 0.28
...
```

And the information has been changed to see the `%` the data represents in the portfolio.

[![image](../order_target_percent.png)](https://www.backtrader.com/docu/order_target/order_target_percent.png)

## Sample Usage

```
$ ./order_target.py --help
usage: order_target.py [-h] [--data DATA] [--fromdate FROMDATE]
                       [--todate TODATE] [--cash CASH]
                       (--target-size | --target-value | --target-percent)
                       [--plot [kwargs]]

Sample for Order Target

optional arguments:
  -h, --help            show this help message and exit
  --data DATA           Specific data to be read in (default:
                        ../../datas/yhoo-1996-2015.txt)
  --fromdate FROMDATE   Starting date in YYYY-MM-DD format (default:
                        2005-01-01)
  --todate TODATE       Ending date in YYYY-MM-DD format (default: 2006-12-31)
  --cash CASH           Ending date in YYYY-MM-DD format (default: 1000000)
  --target-size         Use order_target_size (default: False)
  --target-value        Use order_target_value (default: False)
  --target-percent      Use order_target_percent (default: False)
  --plot [kwargs], -p [kwargs]
                        Plot the read data applying any kwargs passed For
                        example: --plot style="candle" (to plot candles)
                        (default: None)
```

## Sample Code

```
from __future__ import (absolute_import, division, print_function,
                        unicode_literals)

import argparse
from datetime import datetime

import backtrader as bt


class TheStrategy(bt.Strategy):
    '''
    This strategy is loosely based on some of the examples from the Van
    K. Tharp book: *Trade Your Way To Financial Freedom*. The logic:

      - Enter the market if:
        - The MACD.macd line crosses the MACD.signal line to the upside
        - The Simple Moving Average has a negative direction in the last x
          periods (actual value below value x periods ago)

     - Set a stop price x times the ATR value away from the close

     - If in the market:

       - Check if the current close has gone below the stop price. If yes,
         exit.
       - If not, update the stop price if the new stop price would be higher
         than the current
    '''

    params = (
        ('use_target_size', False),
        ('use_target_value', False),
        ('use_target_percent', False),
    )

    def notify_order(self, order):
        if order.status == order.Completed:
            pass

        if not order.alive():
            self.order = None  # indicate no order is pending

    def start(self):
        self.order = None  # sentinel to avoid operrations on pending order

    def next(self):
        dt = self.data.datetime.date()

        portfolio_value = self.broker.get_value()
        print('%04d - %s - Position Size:     %02d - Value %.2f' %
              (len(self), dt.isoformat(), self.position.size, portfolio_value))

        data_value = self.broker.get_value([self.data])

        if self.p.use_target_value:
            print('%04d - %s - data value %.2f' %
                  (len(self), dt.isoformat(), data_value))

        elif self.p.use_target_percent:
            port_perc = data_value / portfolio_value
            print('%04d - %s - data percent %.2f' %
                  (len(self), dt.isoformat(), port_perc))

        if self.order:
            return  # pending order execution

        size = dt.day
        if (dt.month % 2) == 0:
            size = 31 - size

        if self.p.use_target_size:
            target = size
            print('%04d - %s - Order Target Size: %02d' %
                  (len(self), dt.isoformat(), size))

            self.order = self.order_target_size(target=size)

        elif self.p.use_target_value:
            value = size * 1000

            print('%04d - %s - Order Target Value: %.2f' %
                  (len(self), dt.isoformat(), value))

            self.order = self.order_target_value(target=value)

        elif self.p.use_target_percent:
            percent = size / 100.0

            print('%04d - %s - Order Target Percent: %.2f' %
                  (len(self), dt.isoformat(), percent))

            self.order = self.order_target_percent(target=percent)


def runstrat(args=None):
    args = parse_args(args)

    cerebro = bt.Cerebro()
    cerebro.broker.setcash(args.cash)

    dkwargs = dict()
    if args.fromdate is not None:
        dkwargs['fromdate'] = datetime.strptime(args.fromdate, '%Y-%m-%d')
    if args.todate is not None:
        dkwargs['todate'] = datetime.strptime(args.todate, '%Y-%m-%d')

    # data
    data = bt.feeds.YahooFinanceCSVData(dataname=args.data, **dkwargs)
    cerebro.adddata(data)

    # strategy
    cerebro.addstrategy(TheStrategy,
                        use_target_size=args.target_size,
                        use_target_value=args.target_value,
                        use_target_percent=args.target_percent)

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
        description='Sample for Order Target')

    parser.add_argument('--data', required=False,
                        default='../../datas/yhoo-1996-2015.txt',
                        help='Specific data to be read in')

    parser.add_argument('--fromdate', required=False,
                        default='2005-01-01',
                        help='Starting date in YYYY-MM-DD format')

    parser.add_argument('--todate', required=False,
                        default='2006-12-31',
                        help='Ending date in YYYY-MM-DD format')

    parser.add_argument('--cash', required=False, action='store',
                        type=float, default=1000000,
                        help='Ending date in YYYY-MM-DD format')

    pgroup = parser.add_mutually_exclusive_group(required=True)

    pgroup.add_argument('--target-size', required=False, action='store_true',
                        help=('Use order_target_size'))

    pgroup.add_argument('--target-value', required=False, action='store_true',
                        help=('Use order_target_value'))

    pgroup.add_argument('--target-percent', required=False,
                        action='store_true',
                        help=('Use order_target_percent'))

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
