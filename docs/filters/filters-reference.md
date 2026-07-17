---
source: https://www.backtrader.com/docu/filters-reference/
fetched: 2026-07-17
title: "Filters - Reference"
---

# Filters Reference

## SessionFilter

#### class backtrader.filters.SessionFilter(data)

This class can be applied to a data source as a filter and will filter out intraday bars which fall outside of the regular session times (ie: pre/post market data)

This is a “non-simple” filter and must manage the stack of the data (passed during init and **call**)

It needs no “last” method because it has nothing to deliver

## SessionFilterSimple

#### class backtrader.filters.SessionFilterSimple(data)

This class can be applied to a data source as a filter and will filter out intraday bars which fall outside of the regular session times (ie: pre/post market data)

This is a “simple” filter and must NOT manage the stack of the data (passed during init and **call**)

It needs no “last” method because it has nothing to deliver

Bar Management will be done by the SimpleFilterWrapper class made which is added durint the DataBase.addfilter\_simple call

## SessionFilller

#### class backtrader.filters.SessionFiller(data)

Bar Filler for a Data Source inside the declared session start/end times.

The fill bars are constructed using the declared Data Source `timeframe` and `compression` (used to calculate the intervening missing times)

Params:

*   fill\_price (def: None):
    
    If None is passed, the closing price of the previous bar will be used. To end up with a bar which for example takes time but it is not displayed in a plot … use float(‘Nan’)
    
*   fill\_vol (def: float(‘NaN’)):
    
    Value to use to fill the missing volume
    
*   fill\_oi (def: float(‘NaN’)):
    
    Value to use to fill the missing Open Interest
    
*   skip\_first\_fill (def: True):
    
    Upon seeing the 1st valid bar do not fill from the sessionstart up to that bar
    

## CalendarDays

#### class backtrader.filters.CalendarDays(data)

Bar Filler to add missing calendar days to trading days

Params:

*   fill\_price (def: None):
    
    > 0: The given value to fill 0 or None: Use the last known closing price -1: Use the midpoint of the last bar (High-Low average)
    
*   fill\_vol (def: float(‘NaN’)):
    
    Value to use to fill the missing volume
    
*   fill\_oi (def: float(‘NaN’)):
    
    Value to use to fill the missing Open Interest
    

## BarReplayer\_Open

#### class backtrader.filters.BarReplayer\_Open(data)

This filters splits a bar in two parts:

*   `Open`: the opening price of the bar will be used to deliver an initial price bar in which the four components (OHLC) are equal
    
    The volume/openinterest fields are 0 for this initial bar
    
*   `OHLC`: the original bar is delivered complete with the original `volume`/`openinterest`
    

The split simulates a replay without the need to use the _replay_ filter.

## DaySplitter\_Close

#### class backtrader.filters.DaySplitter\_Close(data)

Splits a daily bar in two parts simulating 2 ticks which will be used to replay the data:

*   First tick: `OHLX`
    
    The `Close` will be replaced by the _average_ of `Open`, `High` and `Low`
    
    The session opening time is used for this tick
    

and

*   Second tick: `CCCC`
    
    The `Close` price will be used for the four components of the price
    
    The session closing time is used for this tick
    

The volume will be split amongst the 2 ticks using the parameters:

*   `closevol` (default: `0.5`) The value indicate which percentage, in absolute terms from 0.0 to 1.0, has to be assigned to the _closing_ tick. The rest will be assigned to the `OHLX` tick.

**This filter is meant to be used together with** `cerebro.replaydata`

## HeikinAshi

#### class backtrader.filters.HeikinAshi(data)

The filter remodels the open, high, low, close to make HeikinAshi candlesticks

See:

```
* [https://en.wikipedia.org/wiki/Candlestick_chart#Heikin_Ashi_candlesticks](https://en.wikipedia.org/wiki/Candlestick_chart#Heikin_Ashi_candlesticks)

* [http://stockcharts.com/school/doku.php?id=chart_school:chart_analysis:heikin_ashi](http://stockcharts.com/school/doku.php?id=chart_school:chart_analysis:heikin_ashi)
```

## Renko

#### class backtrader.filters.Renko(data)

Modify the data stream to draw Renko bars (or bricks)

Params:

*   `hilo` (default: _False_) Use high and low instead of close to decide if a new brick is needed
    
*   `size` (default: _None_) The size to consider for each brick
    
*   `autosize` (default: _20.0_) If _size_ is _None_, this will be used to autocalculate the size of the bricks (simply dividing the current price by the given value)
    
*   `dynamic` (default: _False_) If _True_ and using _autosize_, the size of the bricks will be recalculated when moving to a new brick. This will of course eliminate the perfect alignment of Renko bricks.
    
*   `align` (default: _1.0_) Factor use to align the price boundaries of the bricks. If the price is for example _3563.25_ and _align_ is _10.0_, the resulting aligned price will be _3560_. The calculation:
    
    *   3563.25 / 10.0 = 356.325
        
    *   round it and remove the decimals -> 356
        
    *   356 \* 10.0 -> 3560
        

See:

```
* [http://stockcharts.com/school/doku.php?id=chart_school:chart_analysis:renko](http://stockcharts.com/school/doku.php?id=chart_school:chart_analysis:renko)
```
