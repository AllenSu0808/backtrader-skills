---
source: https://www.backtrader.com/docu/order-creation-execution/futurespot/future-vs-spot/
fetched: 2026-07-17
title: "Orders - Future-Spot Compensation"
---

# Futures and Spot Compensation

Release `1.9.32.116` adds support for an interesting use case presented in the [Community](https://community.backtrader.com/)

*   Start a trade with a future, which includes **physical delivery**
    
*   Have an indicator tell you something
    
*   If needed be, close the position by operating on the spot price, effectively canceling the physical delivery, be it for receiving the goods or for having to deliver them (and hopefully making a profit)
    
    The future expires on the same day the operation on the spot price takes place
    

That means:

*   The platform is fed with data points from two different assets
    
*   The platform has to somehow understand the assets are related and that operations on the _spot_ price will close positions open on the _future_
    
    In reality, the future is not closed, only the physical delivery is _compensated_
    

Using that _compensation_ concept, `backtrader` adds a way to let the user communicate to the platform that things on one data feed will have compensating effects on another. The usage pattern

```
import backtrader as bt

cerebro = bt.Cerebro()

data0 = bt.feeds.MyFavouriteDataFeed(dataname='futurename')
cerebro.adddata(data0)

data1 = bt.feeds.MyFavouriteDataFeed(dataname='spotname')
data1.compensate(data0)  # let the system know ops on data1 affect data0
cerebro.adddata(data1)

...

cerebro.run()
```

## Putting it all together

An example is always worth a thousand posts, so let’s put all the pieces together for it.

*   Use one of the standard sample feeds from the `backtrader` sources. This will be the future
    
*   Simulate a similar but distinct price, by reusing the same feed and adding a filter which will randomly move the price some points above/below, to create a spread. As simple as:
    
    ```
    # The filter which changes the close price
    def close_changer(data, *args, **kwargs):
        data.close[0] += 50.0 * random.randint(-1, 1)
        return False  # length of stream is unchanged
    ```
    
*   Plotting on the same axis will mix the default included `BuyObserver` markers and therefore the standard observers will be disabled and manually readded to plot with different per-data markers
    
*   Positions will be entered randomly and exited 10 days later
    
    This doesn’t match future expiration periods, but this is just putting the functionality in place and not checking a trading calendar
    

!!! note

```
  A simulation including execution on the spot price on the day of
  future expiration would require activating `cheat-on-close` to
  make sure the orders are executed when the future expires. This is
  not needed in this sample, because the expiration is being chosen
  at random.
```

*   Notice that the strategy
    
    *   `buy` operations are executed on `data0`
        
    *   `sell` operations are executed on `data1`
        
    
    ```
    class St(bt.Strategy):
        def __init__(self):
            bt.obs.BuySell(self.data0, barplot=True)  # done here for
            BuySellArrows(self.data1, barplot=True)  # different markers per data
    
        def next(self):
            if not self.position:
                if random.randint(0, 1):
                    self.buy(data=self.data0)
                    self.entered = len(self)
    
            else:  # in the market
                if (len(self) - self.entered) >= 10:
                    self.sell(data=self.data1)
    ```
    

The execution:

```
$ ./future-spot.py --no-comp
```

With this graphical output.

[![image](../future-spot.png)](https://www.backtrader.com/docu/order-creation-execution/futurespot/future-spot.png)

And it works:

*   `buy` operations are signaled with a green triangle pointing upwards and the legend tells us they belong to `data0` as expected
    
*   `sell` operations are signaled with an arrow pointing downwards and the legend tells us they belong to `data1` as expected
    
*   Trades are being closed, even if they are being open with `data0` and being closed with `data1`, achieving the desired effect (which in real life is avoiding the physical delivery of the goods acquired by means of the _future_)
    

One could only imagine what would happen if the same logic is applied without the _compensation_ taking place. Let’s do it:

```
$ ./future-spot.py --no-comp
```

And the output

[![image](../future-spot-nocomp.png)](https://www.backtrader.com/docu/order-creation-execution/futurespot/future-spot-nocomp.png)

It should be quite obvious that this fails miserably:

*   The logic expects positions on `data0` to be closed by the operations on `data1` and to only open positions on `data0` when not in the market
    
*   But _compensation_ has been deactivated and the intial operation on `data0` (green triangle) is never closed, so no other operation can never be initiated and short positions on `data1` start accumulating.
    

## Sample Usage

```
$ ./future-spot.py --help
usage: future-spot.py [-h] [--no-comp]

Compensation example

optional arguments:
  -h, --help  show this help message and exit
  --no-comp
```

## Sample Code

```
from __future__ import (absolute_import, division, print_function,
                        unicode_literals)

import argparse
import random
import backtrader as bt


# The filter which changes the close price
def close_changer(data, *args, **kwargs):
    data.close[0] += 50.0 * random.randint(-1, 1)
    return False  # length of stream is unchanged


# override the standard markers
class BuySellArrows(bt.observers.BuySell):
    plotlines = dict(buy=dict(marker='$\u21E7$', markersize=12.0),
                     sell=dict(marker='$\u21E9$', markersize=12.0))


class St(bt.Strategy):
    def __init__(self):
        bt.obs.BuySell(self.data0, barplot=True)  # done here for
        BuySellArrows(self.data1, barplot=True)  # different markers per data

    def next(self):
        if not self.position:
            if random.randint(0, 1):
                self.buy(data=self.data0)
                self.entered = len(self)

        else:  # in the market
            if (len(self) - self.entered) >= 10:
                self.sell(data=self.data1)


def runstrat(args=None):
    args = parse_args(args)
    cerebro = bt.Cerebro()

    dataname = '../../datas/2006-day-001.txt'  # data feed

    data0 = bt.feeds.BacktraderCSVData(dataname=dataname, name='data0')
    cerebro.adddata(data0)

    data1 = bt.feeds.BacktraderCSVData(dataname=dataname, name='data1')
    data1.addfilter(close_changer)
    if not args.no_comp:
        data1.compensate(data0)
    data1.plotinfo.plotmaster = data0
    cerebro.adddata(data1)

    cerebro.addstrategy(St)  # sample strategy

    cerebro.addobserver(bt.obs.Broker)  # removed below with stdstats=False
    cerebro.addobserver(bt.obs.Trades)  # removed below with stdstats=False

    cerebro.broker.set_coc(True)
    cerebro.run(stdstats=False)  # execute
    cerebro.plot(volume=False)  # and plot


def parse_args(pargs=None):
    parser = argparse.ArgumentParser(
        formatter_class=argparse.ArgumentDefaultsHelpFormatter,
        description=('Compensation example'))

    parser.add_argument('--no-comp', required=False, action='store_true')
    return parser.parse_args(pargs)


if __name__ == '__main__':
    runstrat()
```
