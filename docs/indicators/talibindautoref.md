---
source: https://www.backtrader.com/docu/talibindautoref/
fetched: 2026-07-17
title: "Indicators - ta-lib - Reference"
---

# Indicators - ta-lib - Reference

## TA-Lib Indicator Reference

### ACOS

ACOS(\[input\_arrays\])

Vector Trigonometric ACos (Math Transform)

Inputs:

```
price: (any ndarray)
```

Outputs:

```
real
```

Lines:

```
* real
```

PlotInfo:

```
* subplot (True)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

### AD

AD(\[input\_arrays\])

Chaikin A/D Line (Volume Indicators)

Inputs:

```
prices: [‘high’, ‘low’, ‘close’, ‘volume’]
```

Outputs:

```
real
```

Lines:

```
* real
```

PlotInfo:

```
* subplot (True)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

### ADD

ADD(\[input\_arrays\])

Vector Arithmetic Add (Math Operators)

Inputs:

```
price0: (any ndarray) price1: (any ndarray)
```

Outputs:

```
real
```

Lines:

```
* real
```

PlotInfo:

```
* subplot (True)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

### ADOSC

ADOSC(\[input\_arrays\], \[fastperiod=3\], \[slowperiod=10\])

Chaikin A/D Oscillator (Volume Indicators)

Inputs:

```
prices: [‘high’, ‘low’, ‘close’, ‘volume’]
```

Parameters:

```
fastperiod: 3 slowperiod: 10
```

Outputs:

```
real
```

Lines:

```
* real
```

Params:

```
* fastperiod (3)

* slowperiod (10)
```

PlotInfo:

```
* subplot (True)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

### ADX

ADX(\[input\_arrays\], \[timeperiod=14\])

Average Directional Movement Index (Momentum Indicators)

Inputs:

```
prices: [‘high’, ‘low’, ‘close’]
```

Parameters:

```
timeperiod: 14
```

Outputs:

```
real
```

Lines:

```
* real
```

Params:

```
* timeperiod (14)
```

PlotInfo:

```
* subplot (True)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

### ADXR

ADXR(\[input\_arrays\], \[timeperiod=14\])

Average Directional Movement Index Rating (Momentum Indicators)

Inputs:

```
prices: [‘high’, ‘low’, ‘close’]
```

Parameters:

```
timeperiod: 14
```

Outputs:

```
real
```

Lines:

```
* real
```

Params:

```
* timeperiod (14)
```

PlotInfo:

```
* subplot (True)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

### APO

APO(\[input\_arrays\], \[fastperiod=12\], \[slowperiod=26\], \[matype=0\])

Absolute Price Oscillator (Momentum Indicators)

Inputs:

```
price: (any ndarray)
```

Parameters:

```
fastperiod: 12 slowperiod: 26 matype: 0 (Simple Moving Average)
```

Outputs:

```
real
```

Lines:

```
* real
```

Params:

```
* fastperiod (12)

* slowperiod (26)

* matype (0)
```

PlotInfo:

```
* subplot (True)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

### AROON

AROON(\[input\_arrays\], \[timeperiod=14\])

Aroon (Momentum Indicators)

Inputs:

```
prices: [‘high’, ‘low’]
```

Parameters:

```
timeperiod: 14
```

Outputs:

```
aroondown aroonup
```

Lines:

```
* aroondown

* aroonup
```

Params:

```
* timeperiod (14)
```

PlotInfo:

```
* subplot (True)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* aroondown: - ls (–)

* aroonup: - ls (-)
```

### AROONOSC

AROONOSC(\[input\_arrays\], \[timeperiod=14\])

Aroon Oscillator (Momentum Indicators)

Inputs:

```
prices: [‘high’, ‘low’]
```

Parameters:

```
timeperiod: 14
```

Outputs:

```
real
```

Lines:

```
* real
```

Params:

```
* timeperiod (14)
```

PlotInfo:

```
* subplot (True)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

### ASIN

ASIN(\[input\_arrays\])

Vector Trigonometric ASin (Math Transform)

Inputs:

```
price: (any ndarray)
```

Outputs:

```
real
```

Lines:

```
* real
```

PlotInfo:

```
* subplot (True)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

### ATAN

ATAN(\[input\_arrays\])

Vector Trigonometric ATan (Math Transform)

Inputs:

```
price: (any ndarray)
```

Outputs:

```
real
```

Lines:

```
* real
```

PlotInfo:

```
* subplot (True)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

### ATR

ATR(\[input\_arrays\], \[timeperiod=14\])

Average True Range (Volatility Indicators)

Inputs:

```
prices: [‘high’, ‘low’, ‘close’]
```

Parameters:

```
timeperiod: 14
```

Outputs:

```
real
```

Lines:

```
* real
```

Params:

```
* timeperiod (14)
```

PlotInfo:

```
* subplot (True)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

### AVGPRICE

AVGPRICE(\[input\_arrays\])

Average Price (Price Transform)

Inputs:

```
prices: [‘open’, ‘high’, ‘low’, ‘close’]
```

Outputs:

```
real
```

Lines:

```
* real
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

### BBANDS

BBANDS(\[input\_arrays\], \[timeperiod=5\], \[nbdevup=2\], \[nbdevdn=2\], \[matype=0\])

Bollinger Bands (Overlap Studies)

Inputs:

```
price: (any ndarray)
```

Parameters:

```
timeperiod: 5 nbdevup: 2 nbdevdn: 2 matype: 0 (Simple Moving
Average)
```

Outputs:

```
upperband middleband lowerband
```

Lines:

```
* upperband

* middleband

* lowerband
```

Params:

```
* timeperiod (5)

* nbdevup (2)

* nbdevdn (2)

* matype (0)
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* middleband: - _samecolor (True) - ls (-)

* upperband:

* lowerband: - _samecolor (True)
```

### BETA

BETA(\[input\_arrays\], \[timeperiod=5\])

Beta (Statistic Functions)

Inputs:

```
price0: (any ndarray) price1: (any ndarray)
```

Parameters:

```
timeperiod: 5
```

Outputs:

```
real
```

Lines:

```
* real
```

Params:

```
* timeperiod (5)
```

PlotInfo:

```
* subplot (True)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

### BOP

BOP(\[input\_arrays\])

Balance Of Power (Momentum Indicators)

Inputs:

```
prices: [‘open’, ‘high’, ‘low’, ‘close’]
```

Outputs:

```
real
```

Lines:

```
* real
```

PlotInfo:

```
* subplot (True)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

### CCI

CCI(\[input\_arrays\], \[timeperiod=14\])

Commodity Channel Index (Momentum Indicators)

Inputs:

```
prices: [‘high’, ‘low’, ‘close’]
```

Parameters:

```
timeperiod: 14
```

Outputs:

```
real
```

Lines:

```
* real
```

Params:

```
* timeperiod (14)
```

PlotInfo:

```
* subplot (True)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

CDL2###CROWS

CDL2CROWS(\[input\_arrays\])

Two Crows (Pattern Recognition)

Inputs:

```
prices: [‘open’, ‘high’, ‘low’, ‘close’]
```

Outputs:

```
integer (values are -100, 0 or 100)
```

Lines:

```
* integer

* _candleplot
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (True)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* integer: - _plotskip (True)

* _candleplot: - marker (d) - fillstyle (full) - markersize (7.0) -
  ls () - _name (CDL2CROWS)
```

CDL3###BLACKCROWS

CDL3BLACKCROWS(\[input\_arrays\])

Three Black Crows (Pattern Recognition)

Inputs:

```
prices: [‘open’, ‘high’, ‘low’, ‘close’]
```

Outputs:

```
integer (values are -100, 0 or 100)
```

Lines:

```
* integer

* _candleplot
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (True)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* integer: - _plotskip (True)

* _candleplot: - marker (d) - fillstyle (full) - markersize (7.0) -
  ls () - _name (CDL3BLACKCROWS)
```

CDL3###INSIDE

CDL3INSIDE(\[input\_arrays\])

Three Inside Up/Down (Pattern Recognition)

Inputs:

```
prices: [‘open’, ‘high’, ‘low’, ‘close’]
```

Outputs:

```
integer (values are -100, 0 or 100)
```

Lines:

```
* integer

* _candleplot
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (True)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* integer: - _plotskip (True)

* _candleplot: - marker (d) - fillstyle (full) - markersize (7.0) -
  ls () - _name (CDL3INSIDE)
```

CDL3###LINESTRIKE

CDL3LINESTRIKE(\[input\_arrays\])

Three-Line Strike (Pattern Recognition)

Inputs:

```
prices: [‘open’, ‘high’, ‘low’, ‘close’]
```

Outputs:

```
integer (values are -100, 0 or 100)
```

Lines:

```
* integer

* _candleplot
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (True)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* integer: - _plotskip (True)

* _candleplot: - marker (d) - fillstyle (full) - markersize (7.0) -
  ls () - _name (CDL3LINESTRIKE)
```

CDL3###OUTSIDE

CDL3OUTSIDE(\[input\_arrays\])

Three Outside Up/Down (Pattern Recognition)

Inputs:

```
prices: [‘open’, ‘high’, ‘low’, ‘close’]
```

Outputs:

```
integer (values are -100, 0 or 100)
```

Lines:

```
* integer

* _candleplot
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (True)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* integer: - _plotskip (True)

* _candleplot: - marker (d) - fillstyle (full) - markersize (7.0) -
  ls () - _name (CDL3OUTSIDE)
```

CDL3###STARSINSOUTH

CDL3STARSINSOUTH(\[input\_arrays\])

Three Stars In The South (Pattern Recognition)

Inputs:

```
prices: [‘open’, ‘high’, ‘low’, ‘close’]
```

Outputs:

```
integer (values are -100, 0 or 100)
```

Lines:

```
* integer

* _candleplot
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (True)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* integer: - _plotskip (True)

* _candleplot: - marker (d) - fillstyle (full) - markersize (7.0) -
  ls () - _name (CDL3STARSINSOUTH)
```

CDL3###WHITESOLDIERS

CDL3WHITESOLDIERS(\[input\_arrays\])

Three Advancing White Soldiers (Pattern Recognition)

Inputs:

```
prices: [‘open’, ‘high’, ‘low’, ‘close’]
```

Outputs:

```
integer (values are -100, 0 or 100)
```

Lines:

```
* integer

* _candleplot
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (True)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* integer: - _plotskip (True)

* _candleplot: - marker (d) - fillstyle (full) - markersize (7.0) -
  ls () - _name (CDL3WHITESOLDIERS)
```

### CDLABANDONEDBABY

CDLABANDONEDBABY(\[input\_arrays\], \[penetration=0.3\])

Abandoned Baby (Pattern Recognition)

Inputs:

```
prices: [‘open’, ‘high’, ‘low’, ‘close’]
```

Parameters:

```
penetration: 0.3
```

Outputs:

```
integer (values are -100, 0 or 100)
```

Lines:

```
* integer

* _candleplot
```

Params:

```
* penetration (0.3)
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (True)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* integer: - _plotskip (True)

* _candleplot: - marker (d) - fillstyle (full) - markersize (7.0) -
  ls () - _name (CDLABANDONEDBABY)
```

### CDLADVANCEBLOCK

CDLADVANCEBLOCK(\[input\_arrays\])

Advance Block (Pattern Recognition)

Inputs:

```
prices: [‘open’, ‘high’, ‘low’, ‘close’]
```

Outputs:

```
integer (values are -100, 0 or 100)
```

Lines:

```
* integer

* _candleplot
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (True)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* integer: - _plotskip (True)

* _candleplot: - marker (d) - fillstyle (full) - markersize (7.0) -
  ls () - _name (CDLADVANCEBLOCK)
```

### CDLBELTHOLD

CDLBELTHOLD(\[input\_arrays\])

Belt-hold (Pattern Recognition)

Inputs:

```
prices: [‘open’, ‘high’, ‘low’, ‘close’]
```

Outputs:

```
integer (values are -100, 0 or 100)
```

Lines:

```
* integer

* _candleplot
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (True)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* integer: - _plotskip (True)

* _candleplot: - marker (d) - fillstyle (full) - markersize (7.0) -
  ls () - _name (CDLBELTHOLD)
```

### CDLBREAKAWAY

CDLBREAKAWAY(\[input\_arrays\])

Breakaway (Pattern Recognition)

Inputs:

```
prices: [‘open’, ‘high’, ‘low’, ‘close’]
```

Outputs:

```
integer (values are -100, 0 or 100)
```

Lines:

```
* integer

* _candleplot
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (True)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* integer: - _plotskip (True)

* _candleplot: - marker (d) - fillstyle (full) - markersize (7.0) -
  ls () - _name (CDLBREAKAWAY)
```

### CDLCLOSINGMARUBOZU

CDLCLOSINGMARUBOZU(\[input\_arrays\])

Closing Marubozu (Pattern Recognition)

Inputs:

```
prices: [‘open’, ‘high’, ‘low’, ‘close’]
```

Outputs:

```
integer (values are -100, 0 or 100)
```

Lines:

```
* integer

* _candleplot
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (True)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* integer: - _plotskip (True)

* _candleplot: - marker (d) - fillstyle (full) - markersize (7.0) -
  ls () - _name (CDLCLOSINGMARUBOZU)
```

### CDLCONCEALBABYSWALL

CDLCONCEALBABYSWALL(\[input\_arrays\])

Concealing Baby Swallow (Pattern Recognition)

Inputs:

```
prices: [‘open’, ‘high’, ‘low’, ‘close’]
```

Outputs:

```
integer (values are -100, 0 or 100)
```

Lines:

```
* integer

* _candleplot
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (True)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* integer: - _plotskip (True)

* _candleplot: - marker (d) - fillstyle (full) - markersize (7.0) -
  ls () - _name (CDLCONCEALBABYSWALL)
```

### CDLCOUNTERATTACK

CDLCOUNTERATTACK(\[input\_arrays\])

Counterattack (Pattern Recognition)

Inputs:

```
prices: [‘open’, ‘high’, ‘low’, ‘close’]
```

Outputs:

```
integer (values are -100, 0 or 100)
```

Lines:

```
* integer

* _candleplot
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (True)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* integer: - _plotskip (True)

* _candleplot: - marker (d) - fillstyle (full) - markersize (7.0) -
  ls () - _name (CDLCOUNTERATTACK)
```

### CDLDARKCLOUDCOVER

CDLDARKCLOUDCOVER(\[input\_arrays\], \[penetration=0.5\])

Dark Cloud Cover (Pattern Recognition)

Inputs:

```
prices: [‘open’, ‘high’, ‘low’, ‘close’]
```

Parameters:

```
penetration: 0.5
```

Outputs:

```
integer (values are -100, 0 or 100)
```

Lines:

```
* integer

* _candleplot
```

Params:

```
* penetration (0.5)
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (True)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* integer: - _plotskip (True)

* _candleplot: - marker (d) - fillstyle (full) - markersize (7.0) -
  ls () - _name (CDLDARKCLOUDCOVER)
```

### CDLDOJI

CDLDOJI(\[input\_arrays\])

Doji (Pattern Recognition)

Inputs:

```
prices: [‘open’, ‘high’, ‘low’, ‘close’]
```

Outputs:

```
integer (values are -100, 0 or 100)
```

Lines:

```
* integer

* _candleplot
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (True)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* integer: - _plotskip (True)

* _candleplot: - marker (d) - fillstyle (full) - markersize (7.0) -
  ls () - _name (CDLDOJI)
```

### CDLDOJISTAR

CDLDOJISTAR(\[input\_arrays\])

Doji Star (Pattern Recognition)

Inputs:

```
prices: [‘open’, ‘high’, ‘low’, ‘close’]
```

Outputs:

```
integer (values are -100, 0 or 100)
```

Lines:

```
* integer

* _candleplot
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (True)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* integer: - _plotskip (True)

* _candleplot: - marker (d) - fillstyle (full) - markersize (7.0) -
  ls () - _name (CDLDOJISTAR)
```

### CDLDRAGONFLYDOJI

CDLDRAGONFLYDOJI(\[input\_arrays\])

Dragonfly Doji (Pattern Recognition)

Inputs:

```
prices: [‘open’, ‘high’, ‘low’, ‘close’]
```

Outputs:

```
integer (values are -100, 0 or 100)
```

Lines:

```
* integer

* _candleplot
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (True)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* integer: - _plotskip (True)

* _candleplot: - marker (d) - fillstyle (full) - markersize (7.0) -
  ls () - _name (CDLDRAGONFLYDOJI)
```

### CDLENGULFING

CDLENGULFING(\[input\_arrays\])

Engulfing Pattern (Pattern Recognition)

Inputs:

```
prices: [‘open’, ‘high’, ‘low’, ‘close’]
```

Outputs:

```
integer (values are -100, 0 or 100)
```

Lines:

```
* integer

* _candleplot
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (True)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* integer: - _plotskip (True)

* _candleplot: - marker (d) - fillstyle (full) - markersize (7.0) -
  ls () - _name (CDLENGULFING)
```

### CDLEVENINGDOJISTAR

CDLEVENINGDOJISTAR(\[input\_arrays\], \[penetration=0.3\])

Evening Doji Star (Pattern Recognition)

Inputs:

```
prices: [‘open’, ‘high’, ‘low’, ‘close’]
```

Parameters:

```
penetration: 0.3
```

Outputs:

```
integer (values are -100, 0 or 100)
```

Lines:

```
* integer

* _candleplot
```

Params:

```
* penetration (0.3)
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (True)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* integer: - _plotskip (True)

* _candleplot: - marker (d) - fillstyle (full) - markersize (7.0) -
  ls () - _name (CDLEVENINGDOJISTAR)
```

### CDLEVENINGSTAR

CDLEVENINGSTAR(\[input\_arrays\], \[penetration=0.3\])

Evening Star (Pattern Recognition)

Inputs:

```
prices: [‘open’, ‘high’, ‘low’, ‘close’]
```

Parameters:

```
penetration: 0.3
```

Outputs:

```
integer (values are -100, 0 or 100)
```

Lines:

```
* integer

* _candleplot
```

Params:

```
* penetration (0.3)
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (True)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* integer: - _plotskip (True)

* _candleplot: - marker (d) - fillstyle (full) - markersize (7.0) -
  ls () - _name (CDLEVENINGSTAR)
```

### CDLGAPSIDESIDEWHITE

CDLGAPSIDESIDEWHITE(\[input\_arrays\])

Up/Down-gap side-by-side white lines (Pattern Recognition)

Inputs:

```
prices: [‘open’, ‘high’, ‘low’, ‘close’]
```

Outputs:

```
integer (values are -100, 0 or 100)
```

Lines:

```
* integer

* _candleplot
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (True)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* integer: - _plotskip (True)

* _candleplot: - marker (d) - fillstyle (full) - markersize (7.0) -
  ls () - _name (CDLGAPSIDESIDEWHITE)
```

### CDLGRAVESTONEDOJI

CDLGRAVESTONEDOJI(\[input\_arrays\])

Gravestone Doji (Pattern Recognition)

Inputs:

```
prices: [‘open’, ‘high’, ‘low’, ‘close’]
```

Outputs:

```
integer (values are -100, 0 or 100)
```

Lines:

```
* integer

* _candleplot
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (True)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* integer: - _plotskip (True)

* _candleplot: - marker (d) - fillstyle (full) - markersize (7.0) -
  ls () - _name (CDLGRAVESTONEDOJI)
```

### CDLHAMMER

CDLHAMMER(\[input\_arrays\])

Hammer (Pattern Recognition)

Inputs:

```
prices: [‘open’, ‘high’, ‘low’, ‘close’]
```

Outputs:

```
integer (values are -100, 0 or 100)
```

Lines:

```
* integer

* _candleplot
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (True)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* integer: - _plotskip (True)

* _candleplot: - marker (d) - fillstyle (full) - markersize (7.0) -
  ls () - _name (CDLHAMMER)
```

### CDLHANGINGMAN

CDLHANGINGMAN(\[input\_arrays\])

Hanging Man (Pattern Recognition)

Inputs:

```
prices: [‘open’, ‘high’, ‘low’, ‘close’]
```

Outputs:

```
integer (values are -100, 0 or 100)
```

Lines:

```
* integer

* _candleplot
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (True)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* integer: - _plotskip (True)

* _candleplot: - marker (d) - fillstyle (full) - markersize (7.0) -
  ls () - _name (CDLHANGINGMAN)
```

### CDLHARAMI

CDLHARAMI(\[input\_arrays\])

Harami Pattern (Pattern Recognition)

Inputs:

```
prices: [‘open’, ‘high’, ‘low’, ‘close’]
```

Outputs:

```
integer (values are -100, 0 or 100)
```

Lines:

```
* integer

* _candleplot
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (True)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* integer: - _plotskip (True)

* _candleplot: - marker (d) - fillstyle (full) - markersize (7.0) -
  ls () - _name (CDLHARAMI)
```

### CDLHARAMICROSS

CDLHARAMICROSS(\[input\_arrays\])

Harami Cross Pattern (Pattern Recognition)

Inputs:

```
prices: [‘open’, ‘high’, ‘low’, ‘close’]
```

Outputs:

```
integer (values are -100, 0 or 100)
```

Lines:

```
* integer

* _candleplot
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (True)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* integer: - _plotskip (True)

* _candleplot: - marker (d) - fillstyle (full) - markersize (7.0) -
  ls () - _name (CDLHARAMICROSS)
```

### CDLHIGHWAVE

CDLHIGHWAVE(\[input\_arrays\])

High-Wave Candle (Pattern Recognition)

Inputs:

```
prices: [‘open’, ‘high’, ‘low’, ‘close’]
```

Outputs:

```
integer (values are -100, 0 or 100)
```

Lines:

```
* integer

* _candleplot
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (True)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* integer: - _plotskip (True)

* _candleplot: - marker (d) - fillstyle (full) - markersize (7.0) -
  ls () - _name (CDLHIGHWAVE)
```

### CDLHIKKAKE

CDLHIKKAKE(\[input\_arrays\])

Hikkake Pattern (Pattern Recognition)

Inputs:

```
prices: [‘open’, ‘high’, ‘low’, ‘close’]
```

Outputs:

```
integer (values are -100, 0 or 100)
```

Lines:

```
* integer

* _candleplot
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (True)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* integer: - _plotskip (True)

* _candleplot: - marker (d) - fillstyle (full) - markersize (7.0) -
  ls () - _name (CDLHIKKAKE)
```

### CDLHIKKAKEMOD

CDLHIKKAKEMOD(\[input\_arrays\])

Modified Hikkake Pattern (Pattern Recognition)

Inputs:

```
prices: [‘open’, ‘high’, ‘low’, ‘close’]
```

Outputs:

```
integer (values are -100, 0 or 100)
```

Lines:

```
* integer

* _candleplot
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (True)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* integer: - _plotskip (True)

* _candleplot: - marker (d) - fillstyle (full) - markersize (7.0) -
  ls () - _name (CDLHIKKAKEMOD)
```

### CDLHOMINGPIGEON

CDLHOMINGPIGEON(\[input\_arrays\])

Homing Pigeon (Pattern Recognition)

Inputs:

```
prices: [‘open’, ‘high’, ‘low’, ‘close’]
```

Outputs:

```
integer (values are -100, 0 or 100)
```

Lines:

```
* integer

* _candleplot
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (True)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* integer: - _plotskip (True)

* _candleplot: - marker (d) - fillstyle (full) - markersize (7.0) -
  ls () - _name (CDLHOMINGPIGEON)
```

CDLIDENTICAL3###CROWS

CDLIDENTICAL3CROWS(\[input\_arrays\])

Identical Three Crows (Pattern Recognition)

Inputs:

```
prices: [‘open’, ‘high’, ‘low’, ‘close’]
```

Outputs:

```
integer (values are -100, 0 or 100)
```

Lines:

```
* integer

* _candleplot
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (True)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* integer: - _plotskip (True)

* _candleplot: - marker (d) - fillstyle (full) - markersize (7.0) -
  ls () - _name (CDLIDENTICAL3CROWS)
```

### CDLINNECK

CDLINNECK(\[input\_arrays\])

In-Neck Pattern (Pattern Recognition)

Inputs:

```
prices: [‘open’, ‘high’, ‘low’, ‘close’]
```

Outputs:

```
integer (values are -100, 0 or 100)
```

Lines:

```
* integer

* _candleplot
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (True)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* integer: - _plotskip (True)

* _candleplot: - marker (d) - fillstyle (full) - markersize (7.0) -
  ls () - _name (CDLINNECK)
```

### CDLINVERTEDHAMMER

CDLINVERTEDHAMMER(\[input\_arrays\])

Inverted Hammer (Pattern Recognition)

Inputs:

```
prices: [‘open’, ‘high’, ‘low’, ‘close’]
```

Outputs:

```
integer (values are -100, 0 or 100)
```

Lines:

```
* integer

* _candleplot
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (True)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* integer: - _plotskip (True)

* _candleplot: - marker (d) - fillstyle (full) - markersize (7.0) -
  ls () - _name (CDLINVERTEDHAMMER)
```

### CDLKICKING

CDLKICKING(\[input\_arrays\])

Kicking (Pattern Recognition)

Inputs:

```
prices: [‘open’, ‘high’, ‘low’, ‘close’]
```

Outputs:

```
integer (values are -100, 0 or 100)
```

Lines:

```
* integer

* _candleplot
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (True)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* integer: - _plotskip (True)

* _candleplot: - marker (d) - fillstyle (full) - markersize (7.0) -
  ls () - _name (CDLKICKING)
```

### CDLKICKINGBYLENGTH

CDLKICKINGBYLENGTH(\[input\_arrays\])

Kicking - bull/bear determined by the longer marubozu (Pattern Recognition)

Inputs:

```
prices: [‘open’, ‘high’, ‘low’, ‘close’]
```

Outputs:

```
integer (values are -100, 0 or 100)
```

Lines:

```
* integer

* _candleplot
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (True)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* integer: - _plotskip (True)

* _candleplot: - marker (d) - fillstyle (full) - markersize (7.0) -
  ls () - _name (CDLKICKINGBYLENGTH)
```

### CDLLADDERBOTTOM

CDLLADDERBOTTOM(\[input\_arrays\])

Ladder Bottom (Pattern Recognition)

Inputs:

```
prices: [‘open’, ‘high’, ‘low’, ‘close’]
```

Outputs:

```
integer (values are -100, 0 or 100)
```

Lines:

```
* integer

* _candleplot
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (True)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* integer: - _plotskip (True)

* _candleplot: - marker (d) - fillstyle (full) - markersize (7.0) -
  ls () - _name (CDLLADDERBOTTOM)
```

### CDLLONGLEGGEDDOJI

CDLLONGLEGGEDDOJI(\[input\_arrays\])

Long Legged Doji (Pattern Recognition)

Inputs:

```
prices: [‘open’, ‘high’, ‘low’, ‘close’]
```

Outputs:

```
integer (values are -100, 0 or 100)
```

Lines:

```
* integer

* _candleplot
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (True)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* integer: - _plotskip (True)

* _candleplot: - marker (d) - fillstyle (full) - markersize (7.0) -
  ls () - _name (CDLLONGLEGGEDDOJI)
```

### CDLLONGLINE

CDLLONGLINE(\[input\_arrays\])

Long Line Candle (Pattern Recognition)

Inputs:

```
prices: [‘open’, ‘high’, ‘low’, ‘close’]
```

Outputs:

```
integer (values are -100, 0 or 100)
```

Lines:

```
* integer

* _candleplot
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (True)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* integer: - _plotskip (True)

* _candleplot: - marker (d) - fillstyle (full) - markersize (7.0) -
  ls () - _name (CDLLONGLINE)
```

### CDLMARUBOZU

CDLMARUBOZU(\[input\_arrays\])

Marubozu (Pattern Recognition)

Inputs:

```
prices: [‘open’, ‘high’, ‘low’, ‘close’]
```

Outputs:

```
integer (values are -100, 0 or 100)
```

Lines:

```
* integer

* _candleplot
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (True)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* integer: - _plotskip (True)

* _candleplot: - marker (d) - fillstyle (full) - markersize (7.0) -
  ls () - _name (CDLMARUBOZU)
```

### CDLMATCHINGLOW

CDLMATCHINGLOW(\[input\_arrays\])

Matching Low (Pattern Recognition)

Inputs:

```
prices: [‘open’, ‘high’, ‘low’, ‘close’]
```

Outputs:

```
integer (values are -100, 0 or 100)
```

Lines:

```
* integer

* _candleplot
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (True)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* integer: - _plotskip (True)

* _candleplot: - marker (d) - fillstyle (full) - markersize (7.0) -
  ls () - _name (CDLMATCHINGLOW)
```

### CDLMATHOLD

CDLMATHOLD(\[input\_arrays\], \[penetration=0.5\])

Mat Hold (Pattern Recognition)

Inputs:

```
prices: [‘open’, ‘high’, ‘low’, ‘close’]
```

Parameters:

```
penetration: 0.5
```

Outputs:

```
integer (values are -100, 0 or 100)
```

Lines:

```
* integer

* _candleplot
```

Params:

```
* penetration (0.5)
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (True)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* integer: - _plotskip (True)

* _candleplot: - marker (d) - fillstyle (full) - markersize (7.0) -
  ls () - _name (CDLMATHOLD)
```

### CDLMORNINGDOJISTAR

CDLMORNINGDOJISTAR(\[input\_arrays\], \[penetration=0.3\])

Morning Doji Star (Pattern Recognition)

Inputs:

```
prices: [‘open’, ‘high’, ‘low’, ‘close’]
```

Parameters:

```
penetration: 0.3
```

Outputs:

```
integer (values are -100, 0 or 100)
```

Lines:

```
* integer

* _candleplot
```

Params:

```
* penetration (0.3)
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (True)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* integer: - _plotskip (True)

* _candleplot: - marker (d) - fillstyle (full) - markersize (7.0) -
  ls () - _name (CDLMORNINGDOJISTAR)
```

### CDLMORNINGSTAR

CDLMORNINGSTAR(\[input\_arrays\], \[penetration=0.3\])

Morning Star (Pattern Recognition)

Inputs:

```
prices: [‘open’, ‘high’, ‘low’, ‘close’]
```

Parameters:

```
penetration: 0.3
```

Outputs:

```
integer (values are -100, 0 or 100)
```

Lines:

```
* integer

* _candleplot
```

Params:

```
* penetration (0.3)
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (True)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* integer: - _plotskip (True)

* _candleplot: - marker (d) - fillstyle (full) - markersize (7.0) -
  ls () - _name (CDLMORNINGSTAR)
```

### CDLONNECK

CDLONNECK(\[input\_arrays\])

On-Neck Pattern (Pattern Recognition)

Inputs:

```
prices: [‘open’, ‘high’, ‘low’, ‘close’]
```

Outputs:

```
integer (values are -100, 0 or 100)
```

Lines:

```
* integer

* _candleplot
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (True)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* integer: - _plotskip (True)

* _candleplot: - marker (d) - fillstyle (full) - markersize (7.0) -
  ls () - _name (CDLONNECK)
```

### CDLPIERCING

CDLPIERCING(\[input\_arrays\])

Piercing Pattern (Pattern Recognition)

Inputs:

```
prices: [‘open’, ‘high’, ‘low’, ‘close’]
```

Outputs:

```
integer (values are -100, 0 or 100)
```

Lines:

```
* integer

* _candleplot
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (True)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* integer: - _plotskip (True)

* _candleplot: - marker (d) - fillstyle (full) - markersize (7.0) -
  ls () - _name (CDLPIERCING)
```

### CDLRICKSHAWMAN

CDLRICKSHAWMAN(\[input\_arrays\])

Rickshaw Man (Pattern Recognition)

Inputs:

```
prices: [‘open’, ‘high’, ‘low’, ‘close’]
```

Outputs:

```
integer (values are -100, 0 or 100)
```

Lines:

```
* integer

* _candleplot
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (True)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* integer: - _plotskip (True)

* _candleplot: - marker (d) - fillstyle (full) - markersize (7.0) -
  ls () - _name (CDLRICKSHAWMAN)
```

CDLRISEFALL3###METHODS

CDLRISEFALL3METHODS(\[input\_arrays\])

Rising/Falling Three Methods (Pattern Recognition)

Inputs:

```
prices: [‘open’, ‘high’, ‘low’, ‘close’]
```

Outputs:

```
integer (values are -100, 0 or 100)
```

Lines:

```
* integer

* _candleplot
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (True)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* integer: - _plotskip (True)

* _candleplot: - marker (d) - fillstyle (full) - markersize (7.0) -
  ls () - _name (CDLRISEFALL3METHODS)
```

### CDLSEPARATINGLINES

CDLSEPARATINGLINES(\[input\_arrays\])

Separating Lines (Pattern Recognition)

Inputs:

```
prices: [‘open’, ‘high’, ‘low’, ‘close’]
```

Outputs:

```
integer (values are -100, 0 or 100)
```

Lines:

```
* integer

* _candleplot
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (True)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* integer: - _plotskip (True)

* _candleplot: - marker (d) - fillstyle (full) - markersize (7.0) -
  ls () - _name (CDLSEPARATINGLINES)
```

### CDLSHOOTINGSTAR

CDLSHOOTINGSTAR(\[input\_arrays\])

Shooting Star (Pattern Recognition)

Inputs:

```
prices: [‘open’, ‘high’, ‘low’, ‘close’]
```

Outputs:

```
integer (values are -100, 0 or 100)
```

Lines:

```
* integer

* _candleplot
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (True)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* integer: - _plotskip (True)

* _candleplot: - marker (d) - fillstyle (full) - markersize (7.0) -
  ls () - _name (CDLSHOOTINGSTAR)
```

### CDLSHORTLINE

CDLSHORTLINE(\[input\_arrays\])

Short Line Candle (Pattern Recognition)

Inputs:

```
prices: [‘open’, ‘high’, ‘low’, ‘close’]
```

Outputs:

```
integer (values are -100, 0 or 100)
```

Lines:

```
* integer

* _candleplot
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (True)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* integer: - _plotskip (True)

* _candleplot: - marker (d) - fillstyle (full) - markersize (7.0) -
  ls () - _name (CDLSHORTLINE)
```

### CDLSPINNINGTOP

CDLSPINNINGTOP(\[input\_arrays\])

Spinning Top (Pattern Recognition)

Inputs:

```
prices: [‘open’, ‘high’, ‘low’, ‘close’]
```

Outputs:

```
integer (values are -100, 0 or 100)
```

Lines:

```
* integer

* _candleplot
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (True)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* integer: - _plotskip (True)

* _candleplot: - marker (d) - fillstyle (full) - markersize (7.0) -
  ls () - _name (CDLSPINNINGTOP)
```

### CDLSTALLEDPATTERN

CDLSTALLEDPATTERN(\[input\_arrays\])

Stalled Pattern (Pattern Recognition)

Inputs:

```
prices: [‘open’, ‘high’, ‘low’, ‘close’]
```

Outputs:

```
integer (values are -100, 0 or 100)
```

Lines:

```
* integer

* _candleplot
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (True)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* integer: - _plotskip (True)

* _candleplot: - marker (d) - fillstyle (full) - markersize (7.0) -
  ls () - _name (CDLSTALLEDPATTERN)
```

### CDLSTICKSANDWICH

CDLSTICKSANDWICH(\[input\_arrays\])

Stick Sandwich (Pattern Recognition)

Inputs:

```
prices: [‘open’, ‘high’, ‘low’, ‘close’]
```

Outputs:

```
integer (values are -100, 0 or 100)
```

Lines:

```
* integer

* _candleplot
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (True)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* integer: - _plotskip (True)

* _candleplot: - marker (d) - fillstyle (full) - markersize (7.0) -
  ls () - _name (CDLSTICKSANDWICH)
```

### CDLTAKURI

CDLTAKURI(\[input\_arrays\])

Takuri (Dragonfly Doji with very long lower shadow) (Pattern Recognition)

Inputs:

```
prices: [‘open’, ‘high’, ‘low’, ‘close’]
```

Outputs:

```
integer (values are -100, 0 or 100)
```

Lines:

```
* integer

* _candleplot
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (True)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* integer: - _plotskip (True)

* _candleplot: - marker (d) - fillstyle (full) - markersize (7.0) -
  ls () - _name (CDLTAKURI)
```

### CDLTASUKIGAP

CDLTASUKIGAP(\[input\_arrays\])

Tasuki Gap (Pattern Recognition)

Inputs:

```
prices: [‘open’, ‘high’, ‘low’, ‘close’]
```

Outputs:

```
integer (values are -100, 0 or 100)
```

Lines:

```
* integer

* _candleplot
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (True)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* integer: - _plotskip (True)

* _candleplot: - marker (d) - fillstyle (full) - markersize (7.0) -
  ls () - _name (CDLTASUKIGAP)
```

### CDLTHRUSTING

CDLTHRUSTING(\[input\_arrays\])

Thrusting Pattern (Pattern Recognition)

Inputs:

```
prices: [‘open’, ‘high’, ‘low’, ‘close’]
```

Outputs:

```
integer (values are -100, 0 or 100)
```

Lines:

```
* integer

* _candleplot
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (True)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* integer: - _plotskip (True)

* _candleplot: - marker (d) - fillstyle (full) - markersize (7.0) -
  ls () - _name (CDLTHRUSTING)
```

### CDLTRISTAR

CDLTRISTAR(\[input\_arrays\])

Tristar Pattern (Pattern Recognition)

Inputs:

```
prices: [‘open’, ‘high’, ‘low’, ‘close’]
```

Outputs:

```
integer (values are -100, 0 or 100)
```

Lines:

```
* integer

* _candleplot
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (True)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* integer: - _plotskip (True)

* _candleplot: - marker (d) - fillstyle (full) - markersize (7.0) -
  ls () - _name (CDLTRISTAR)
```

CDLUNIQUE3###RIVER

CDLUNIQUE3RIVER(\[input\_arrays\])

Unique 3 River (Pattern Recognition)

Inputs:

```
prices: [‘open’, ‘high’, ‘low’, ‘close’]
```

Outputs:

```
integer (values are -100, 0 or 100)
```

Lines:

```
* integer

* _candleplot
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (True)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* integer: - _plotskip (True)

* _candleplot: - marker (d) - fillstyle (full) - markersize (7.0) -
  ls () - _name (CDLUNIQUE3RIVER)
```

CDLUPSIDEGAP2###CROWS

CDLUPSIDEGAP2CROWS(\[input\_arrays\])

Upside Gap Two Crows (Pattern Recognition)

Inputs:

```
prices: [‘open’, ‘high’, ‘low’, ‘close’]
```

Outputs:

```
integer (values are -100, 0 or 100)
```

Lines:

```
* integer

* _candleplot
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (True)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* integer: - _plotskip (True)

* _candleplot: - marker (d) - fillstyle (full) - markersize (7.0) -
  ls () - _name (CDLUPSIDEGAP2CROWS)
```

CDLXSIDEGAP3###METHODS

CDLXSIDEGAP3METHODS(\[input\_arrays\])

Upside/Downside Gap Three Methods (Pattern Recognition)

Inputs:

```
prices: [‘open’, ‘high’, ‘low’, ‘close’]
```

Outputs:

```
integer (values are -100, 0 or 100)
```

Lines:

```
* integer

* _candleplot
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (True)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* integer: - _plotskip (True)

* _candleplot: - marker (d) - fillstyle (full) - markersize (7.0) -
  ls () - _name (CDLXSIDEGAP3METHODS)
```

### CEIL

CEIL(\[input\_arrays\])

Vector Ceil (Math Transform)

Inputs:

```
price: (any ndarray)
```

Outputs:

```
real
```

Lines:

```
* real
```

PlotInfo:

```
* subplot (True)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

### CMO

CMO(\[input\_arrays\], \[timeperiod=14\])

Chande Momentum Oscillator (Momentum Indicators)

Inputs:

```
price: (any ndarray)
```

Parameters:

```
timeperiod: 14
```

Outputs:

```
real
```

Lines:

```
* real
```

Params:

```
* timeperiod (14)
```

PlotInfo:

```
* subplot (True)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

### CORREL

CORREL(\[input\_arrays\], \[timeperiod=30\])

Pearson’s Correlation Coefficient ® (Statistic Functions)

Inputs:

```
price0: (any ndarray) price1: (any ndarray)
```

Parameters:

```
timeperiod: 30
```

Outputs:

```
real
```

Lines:

```
* real
```

Params:

```
* timeperiod (30)
```

PlotInfo:

```
* subplot (True)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

### COS

COS(\[input\_arrays\])

Vector Trigonometric Cos (Math Transform)

Inputs:

```
price: (any ndarray)
```

Outputs:

```
real
```

Lines:

```
* real
```

PlotInfo:

```
* subplot (True)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

### COSH

COSH(\[input\_arrays\])

Vector Trigonometric Cosh (Math Transform)

Inputs:

```
price: (any ndarray)
```

Outputs:

```
real
```

Lines:

```
* real
```

PlotInfo:

```
* subplot (True)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

### DEMA

DEMA(\[input\_arrays\], \[timeperiod=30\])

Double Exponential Moving Average (Overlap Studies)

Inputs:

```
price: (any ndarray)
```

Parameters:

```
timeperiod: 30
```

Outputs:

```
real
```

Lines:

```
* real
```

Params:

```
* timeperiod (30)
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

### DIV

DIV(\[input\_arrays\])

Vector Arithmetic Div (Math Operators)

Inputs:

```
price0: (any ndarray) price1: (any ndarray)
```

Outputs:

```
real
```

Lines:

```
* real
```

PlotInfo:

```
* subplot (True)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

### DX

DX(\[input\_arrays\], \[timeperiod=14\])

Directional Movement Index (Momentum Indicators)

Inputs:

```
prices: [‘high’, ‘low’, ‘close’]
```

Parameters:

```
timeperiod: 14
```

Outputs:

```
real
```

Lines:

```
* real
```

Params:

```
* timeperiod (14)
```

PlotInfo:

```
* subplot (True)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

### EMA

EMA(\[input\_arrays\], \[timeperiod=30\])

Exponential Moving Average (Overlap Studies)

Inputs:

```
price: (any ndarray)
```

Parameters:

```
timeperiod: 30
```

Outputs:

```
real
```

Lines:

```
* real
```

Params:

```
* timeperiod (30)
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

### EXP

EXP(\[input\_arrays\])

Vector Arithmetic Exp (Math Transform)

Inputs:

```
price: (any ndarray)
```

Outputs:

```
real
```

Lines:

```
* real
```

PlotInfo:

```
* subplot (True)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

### FLOOR

FLOOR(\[input\_arrays\])

Vector Floor (Math Transform)

Inputs:

```
price: (any ndarray)
```

Outputs:

```
real
```

Lines:

```
* real
```

PlotInfo:

```
* subplot (True)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

HT\_###DCPERIOD

HT\_DCPERIOD(\[input\_arrays\])

Hilbert Transform - Dominant Cycle Period (Cycle Indicators)

Inputs:

```
price: (any ndarray)
```

Outputs:

```
real
```

Lines:

```
* real
```

PlotInfo:

```
* subplot (True)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

HT\_###DCPHASE

HT\_DCPHASE(\[input\_arrays\])

Hilbert Transform - Dominant Cycle Phase (Cycle Indicators)

Inputs:

```
price: (any ndarray)
```

Outputs:

```
real
```

Lines:

```
* real
```

PlotInfo:

```
* subplot (True)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

HT\_###PHASOR

HT\_PHASOR(\[input\_arrays\])

Hilbert Transform - Phasor Components (Cycle Indicators)

Inputs:

```
price: (any ndarray)
```

Outputs:

```
inphase quadrature
```

Lines:

```
* inphase

* quadrature
```

PlotInfo:

```
* subplot (True)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* inphase: - ls (-)

* quadrature: - ls (–)
```

HT\_###SINE

HT\_SINE(\[input\_arrays\])

Hilbert Transform - SineWave (Cycle Indicators)

Inputs:

```
price: (any ndarray)
```

Outputs:

```
sine leadsine
```

Lines:

```
* sine

* leadsine
```

PlotInfo:

```
* subplot (True)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* leadsine: - ls (–)

* sine: - ls (-)
```

HT\_###TRENDLINE

HT\_TRENDLINE(\[input\_arrays\])

Hilbert Transform - Instantaneous Trendline (Overlap Studies)

Inputs:

```
price: (any ndarray)
```

Outputs:

```
real
```

Lines:

```
* real
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

HT\_###TRENDMODE

HT\_TRENDMODE(\[input\_arrays\])

Hilbert Transform - Trend vs Cycle Mode (Cycle Indicators)

Inputs:

```
price: (any ndarray)
```

Outputs:

```
integer (values are -100, 0 or 100)
```

Lines:

```
* integer
```

PlotInfo:

```
* subplot (True)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* integer: - ls (-)
```

### KAMA

KAMA(\[input\_arrays\], \[timeperiod=30\])

Kaufman Adaptive Moving Average (Overlap Studies)

Inputs:

```
price: (any ndarray)
```

Parameters:

```
timeperiod: 30
```

Outputs:

```
real
```

Lines:

```
* real
```

Params:

```
* timeperiod (30)
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

### LINEARREG

LINEARREG(\[input\_arrays\], \[timeperiod=14\])

Linear Regression (Statistic Functions)

Inputs:

```
price: (any ndarray)
```

Parameters:

```
timeperiod: 14
```

Outputs:

```
real
```

Lines:

```
* real
```

Params:

```
* timeperiod (14)
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

LINEARREG\_###ANGLE

LINEARREG\_ANGLE(\[input\_arrays\], \[timeperiod=14\])

Linear Regression Angle (Statistic Functions)

Inputs:

```
price: (any ndarray)
```

Parameters:

```
timeperiod: 14
```

Outputs:

```
real
```

Lines:

```
* real
```

Params:

```
* timeperiod (14)
```

PlotInfo:

```
* subplot (True)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

LINEARREG\_###INTERCEPT

LINEARREG\_INTERCEPT(\[input\_arrays\], \[timeperiod=14\])

Linear Regression Intercept (Statistic Functions)

Inputs:

```
price: (any ndarray)
```

Parameters:

```
timeperiod: 14
```

Outputs:

```
real
```

Lines:

```
* real
```

Params:

```
* timeperiod (14)
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

LINEARREG\_###SLOPE

LINEARREG\_SLOPE(\[input\_arrays\], \[timeperiod=14\])

Linear Regression Slope (Statistic Functions)

Inputs:

```
price: (any ndarray)
```

Parameters:

```
timeperiod: 14
```

Outputs:

```
real
```

Lines:

```
* real
```

Params:

```
* timeperiod (14)
```

PlotInfo:

```
* subplot (True)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

### LN

LN(\[input\_arrays\])

Vector Log Natural (Math Transform)

Inputs:

```
price: (any ndarray)
```

Outputs:

```
real
```

Lines:

```
* real
```

PlotInfo:

```
* subplot (True)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

LOG10

LOG10(\[input\_arrays\])

Vector Log10 (Math Transform)

Inputs:

```
price: (any ndarray)
```

Outputs:

```
real
```

Lines:

```
* real
```

PlotInfo:

```
* subplot (True)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

### MA

MA(\[input\_arrays\], \[timeperiod=30\], \[matype=0\])

Moving average (Overlap Studies)

Inputs:

```
price: (any ndarray)
```

Parameters:

```
timeperiod: 30 matype: 0 (Simple Moving Average)
```

Outputs:

```
real
```

Lines:

```
* real
```

Params:

```
* timeperiod (30)

* matype (0)
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

### MACD

MACD(\[input\_arrays\], \[fastperiod=12\], \[slowperiod=26\], \[signalperiod=9\])

Moving Average Convergence/Divergence (Momentum Indicators)

Inputs:

```
price: (any ndarray)
```

Parameters:

```
fastperiod: 12 slowperiod: 26 signalperiod: 9
```

Outputs:

```
macd macdsignal macdhist
```

Lines:

```
* macd

* macdsignal

* macdhist
```

Params:

```
* fastperiod (12)

* slowperiod (26)

* signalperiod (9)
```

PlotInfo:

```
* subplot (True)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* macdsignal: - ls (–)

* macd: - ls (-)

* macdhist: - _method (bar)
```

### MACDEXT

MACDEXT(\[input\_arrays\], \[fastperiod=12\], \[fastmatype=0\], \[slowperiod=26\], \[slowmatype=0\], \[signalperiod=9\], \[signalmatype=0\])

MACD with controllable MA type (Momentum Indicators)

Inputs:

```
price: (any ndarray)
```

Parameters:

```
fastperiod: 12 fastmatype: 0 slowperiod: 26 slowmatype: 0
signalperiod: 9 signalmatype: 0
```

Outputs:

```
macd macdsignal macdhist
```

Lines:

```
* macd

* macdsignal

* macdhist
```

Params:

```
* fastperiod (12)

* fastmatype (0)

* slowperiod (26)

* slowmatype (0)

* signalperiod (9)

* signalmatype (0)
```

PlotInfo:

```
* subplot (True)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* macdsignal: - ls (–)

* macd: - ls (-)

* macdhist: - _method (bar)
```

### MACDFIX

MACDFIX(\[input\_arrays\], \[signalperiod=9\])

Moving Average Convergence/Divergence Fix 12/26 (Momentum Indicators)

Inputs:

```
price: (any ndarray)
```

Parameters:

```
signalperiod: 9
```

Outputs:

```
macd macdsignal macdhist
```

Lines:

```
* macd

* macdsignal

* macdhist
```

Params:

```
* signalperiod (9)
```

PlotInfo:

```
* subplot (True)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* macdsignal: - ls (–)

* macd: - ls (-)

* macdhist: - _method (bar)
```

### MAMA

MAMA(\[input\_arrays\], \[fastlimit=0.5\], \[slowlimit=0.05\])

MESA Adaptive Moving Average (Overlap Studies)

Inputs:

```
price: (any ndarray)
```

Parameters:

```
fastlimit: 0.5 slowlimit: 0.05
```

Outputs:

```
mama fama
```

Lines:

```
* mama

* fama
```

Params:

```
* fastlimit (0.5)

* slowlimit (0.05)
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* mama: - ls (-)

* fama: - ls (–)
```

### MAVP

MAVP(\[input\_arrays\], \[minperiod=2\], \[maxperiod=30\], \[matype=0\])

Moving average with variable period (Overlap Studies)

Inputs:

```
price: (any ndarray) periods: (any ndarray)
```

Parameters:

```
minperiod: 2 maxperiod: 30 matype: 0 (Simple Moving Average)
```

Outputs:

```
real
```

Lines:

```
* real
```

Params:

```
* minperiod (2)

* maxperiod (30)

* matype (0)
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

### MAX

MAX(\[input\_arrays\], \[timeperiod=30\])

Highest value over a specified period (Math Operators)

Inputs:

```
price: (any ndarray)
```

Parameters:

```
timeperiod: 30
```

Outputs:

```
real
```

Lines:

```
* real
```

Params:

```
* timeperiod (30)
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

### MAXINDEX

MAXINDEX(\[input\_arrays\], \[timeperiod=30\])

Index of highest value over a specified period (Math Operators)

Inputs:

```
price: (any ndarray)
```

Parameters:

```
timeperiod: 30
```

Outputs:

```
integer (values are -100, 0 or 100)
```

Lines:

```
* integer
```

Params:

```
* timeperiod (30)
```

PlotInfo:

```
* subplot (True)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* integer: - ls (-)
```

### MEDPRICE

MEDPRICE(\[input\_arrays\])

Median Price (Price Transform)

Inputs:

```
prices: [‘high’, ‘low’]
```

Outputs:

```
real
```

Lines:

```
* real
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

### MFI

MFI(\[input\_arrays\], \[timeperiod=14\])

Money Flow Index (Momentum Indicators)

Inputs:

```
prices: [‘high’, ‘low’, ‘close’, ‘volume’]
```

Parameters:

```
timeperiod: 14
```

Outputs:

```
real
```

Lines:

```
* real
```

Params:

```
* timeperiod (14)
```

PlotInfo:

```
* subplot (True)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

### MIDPOINT

MIDPOINT(\[input\_arrays\], \[timeperiod=14\])

MidPoint over period (Overlap Studies)

Inputs:

```
price: (any ndarray)
```

Parameters:

```
timeperiod: 14
```

Outputs:

```
real
```

Lines:

```
* real
```

Params:

```
* timeperiod (14)
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

### MIDPRICE

MIDPRICE(\[input\_arrays\], \[timeperiod=14\])

Midpoint Price over period (Overlap Studies)

Inputs:

```
prices: [‘high’, ‘low’]
```

Parameters:

```
timeperiod: 14
```

Outputs:

```
real
```

Lines:

```
* real
```

Params:

```
* timeperiod (14)
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

### MIN

MIN(\[input\_arrays\], \[timeperiod=30\])

Lowest value over a specified period (Math Operators)

Inputs:

```
price: (any ndarray)
```

Parameters:

```
timeperiod: 30
```

Outputs:

```
real
```

Lines:

```
* real
```

Params:

```
* timeperiod (30)
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

### MININDEX

MININDEX(\[input\_arrays\], \[timeperiod=30\])

Index of lowest value over a specified period (Math Operators)

Inputs:

```
price: (any ndarray)
```

Parameters:

```
timeperiod: 30
```

Outputs:

```
integer (values are -100, 0 or 100)
```

Lines:

```
* integer
```

Params:

```
* timeperiod (30)
```

PlotInfo:

```
* subplot (True)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* integer: - ls (-)
```

### MINMAX

MINMAX(\[input\_arrays\], \[timeperiod=30\])

Lowest and highest values over a specified period (Math Operators)

Inputs:

```
price: (any ndarray)
```

Parameters:

```
timeperiod: 30
```

Outputs:

```
min max
```

Lines:

```
* min

* max
```

Params:

```
* timeperiod (30)
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* max: - ls (-)

* min: - ls (-)
```

### MINMAXINDEX

MINMAXINDEX(\[input\_arrays\], \[timeperiod=30\])

Indexes of lowest and highest values over a specified period (Math Operators)

Inputs:

```
price: (any ndarray)
```

Parameters:

```
timeperiod: 30
```

Outputs:

```
minidx maxidx
```

Lines:

```
* minidx

* maxidx
```

Params:

```
* timeperiod (30)
```

PlotInfo:

```
* subplot (True)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* maxidx: - ls (-)

* minidx: - ls (-)
```

MINUS\_###DI

MINUS\_DI(\[input\_arrays\], \[timeperiod=14\])

Minus Directional Indicator (Momentum Indicators)

Inputs:

```
prices: [‘high’, ‘low’, ‘close’]
```

Parameters:

```
timeperiod: 14
```

Outputs:

```
real
```

Lines:

```
* real
```

Params:

```
* timeperiod (14)
```

PlotInfo:

```
* subplot (True)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

MINUS\_###DM

MINUS\_DM(\[input\_arrays\], \[timeperiod=14\])

Minus Directional Movement (Momentum Indicators)

Inputs:

```
prices: [‘high’, ‘low’]
```

Parameters:

```
timeperiod: 14
```

Outputs:

```
real
```

Lines:

```
* real
```

Params:

```
* timeperiod (14)
```

PlotInfo:

```
* subplot (True)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

### MOM

MOM(\[input\_arrays\], \[timeperiod=10\])

Momentum (Momentum Indicators)

Inputs:

```
price: (any ndarray)
```

Parameters:

```
timeperiod: 10
```

Outputs:

```
real
```

Lines:

```
* real
```

Params:

```
* timeperiod (10)
```

PlotInfo:

```
* subplot (True)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

### MULT

MULT(\[input\_arrays\])

Vector Arithmetic Mult (Math Operators)

Inputs:

```
price0: (any ndarray) price1: (any ndarray)
```

Outputs:

```
real
```

Lines:

```
* real
```

PlotInfo:

```
* subplot (True)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

### NATR

NATR(\[input\_arrays\], \[timeperiod=14\])

Normalized Average True Range (Volatility Indicators)

Inputs:

```
prices: [‘high’, ‘low’, ‘close’]
```

Parameters:

```
timeperiod: 14
```

Outputs:

```
real
```

Lines:

```
* real
```

Params:

```
* timeperiod (14)
```

PlotInfo:

```
* subplot (True)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

### OBV

OBV(\[input\_arrays\])

On Balance Volume (Volume Indicators)

Inputs:

```
price: (any ndarray) prices: [‘volume’]
```

Outputs:

```
real
```

Lines:

```
* real
```

PlotInfo:

```
* subplot (True)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

PLUS\_###DI

PLUS\_DI(\[input\_arrays\], \[timeperiod=14\])

Plus Directional Indicator (Momentum Indicators)

Inputs:

```
prices: [‘high’, ‘low’, ‘close’]
```

Parameters:

```
timeperiod: 14
```

Outputs:

```
real
```

Lines:

```
* real
```

Params:

```
* timeperiod (14)
```

PlotInfo:

```
* subplot (True)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

PLUS\_###DM

PLUS\_DM(\[input\_arrays\], \[timeperiod=14\])

Plus Directional Movement (Momentum Indicators)

Inputs:

```
prices: [‘high’, ‘low’]
```

Parameters:

```
timeperiod: 14
```

Outputs:

```
real
```

Lines:

```
* real
```

Params:

```
* timeperiod (14)
```

PlotInfo:

```
* subplot (True)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

### PPO

PPO(\[input\_arrays\], \[fastperiod=12\], \[slowperiod=26\], \[matype=0\])

Percentage Price Oscillator (Momentum Indicators)

Inputs:

```
price: (any ndarray)
```

Parameters:

```
fastperiod: 12 slowperiod: 26 matype: 0 (Simple Moving Average)
```

Outputs:

```
real
```

Lines:

```
* real
```

Params:

```
* fastperiod (12)

* slowperiod (26)

* matype (0)
```

PlotInfo:

```
* subplot (True)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

### ROC

ROC(\[input\_arrays\], \[timeperiod=10\])

Rate of change : ((price/prevPrice)-1)\*100 (Momentum Indicators)

Inputs:

```
price: (any ndarray)
```

Parameters:

```
timeperiod: 10
```

Outputs:

```
real
```

Lines:

```
* real
```

Params:

```
* timeperiod (10)
```

PlotInfo:

```
* subplot (True)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

### ROCP

ROCP(\[input\_arrays\], \[timeperiod=10\])

Rate of change Percentage: (price-prevPrice)/prevPrice (Momentum Indicators)

Inputs:

```
price: (any ndarray)
```

Parameters:

```
timeperiod: 10
```

Outputs:

```
real
```

Lines:

```
* real
```

Params:

```
* timeperiod (10)
```

PlotInfo:

```
* subplot (True)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

### ROCR

ROCR(\[input\_arrays\], \[timeperiod=10\])

Rate of change ratio: (price/prevPrice) (Momentum Indicators)

Inputs:

```
price: (any ndarray)
```

Parameters:

```
timeperiod: 10
```

Outputs:

```
real
```

Lines:

```
* real
```

Params:

```
* timeperiod (10)
```

PlotInfo:

```
* subplot (True)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

ROCR100

ROCR100(\[input\_arrays\], \[timeperiod=10\])

Rate of change ratio 100 scale: (price/prevPrice)\*100 (Momentum Indicators)

Inputs:

```
price: (any ndarray)
```

Parameters:

```
timeperiod: 10
```

Outputs:

```
real
```

Lines:

```
* real
```

Params:

```
* timeperiod (10)
```

PlotInfo:

```
* subplot (True)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

### RSI

RSI(\[input\_arrays\], \[timeperiod=14\])

Relative Strength Index (Momentum Indicators)

Inputs:

```
price: (any ndarray)
```

Parameters:

```
timeperiod: 14
```

Outputs:

```
real
```

Lines:

```
* real
```

Params:

```
* timeperiod (14)
```

PlotInfo:

```
* subplot (True)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

### SAR

SAR(\[input\_arrays\], \[acceleration=0.02\], \[maximum=0.2\])

Parabolic SAR (Overlap Studies)

Inputs:

```
prices: [‘high’, ‘low’]
```

Parameters:

```
acceleration: 0.02 maximum: 0.2
```

Outputs:

```
real
```

Lines:

```
* real
```

Params:

```
* acceleration (0.02)

* maximum (0.2)
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

### SAREXT

SAREXT(\[input\_arrays\], \[startvalue=0\], \[offsetonreverse=0\], \[accelerationinitlong=0.02\], \[accelerationlong=0.02\], \[accelerationmaxlong=0.2\], \[accelerationinitshort=0.02\], \[accelerationshort=0.02\], \[accelerationmaxshort=0.2\])

Parabolic SAR - Extended (Overlap Studies)

Inputs:

```
prices: [‘high’, ‘low’]
```

Parameters:

```
startvalue: 0 offsetonreverse: 0 accelerationinitlong: 0.02
accelerationlong: 0.02 accelerationmaxlong: 0.2
accelerationinitshort: 0.02 accelerationshort: 0.02
accelerationmaxshort: 0.2
```

Outputs:

```
real
```

Lines:

```
* real
```

Params:

```
* startvalue (0)

* offsetonreverse (0)

* accelerationinitlong (0.02)

* accelerationlong (0.02)

* accelerationmaxlong (0.2)

* accelerationinitshort (0.02)

* accelerationshort (0.02)

* accelerationmaxshort (0.2)
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

### SIN

SIN(\[input\_arrays\])

Vector Trigonometric Sin (Math Transform)

Inputs:

```
price: (any ndarray)
```

Outputs:

```
real
```

Lines:

```
* real
```

PlotInfo:

```
* subplot (True)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

### SINH

SINH(\[input\_arrays\])

Vector Trigonometric Sinh (Math Transform)

Inputs:

```
price: (any ndarray)
```

Outputs:

```
real
```

Lines:

```
* real
```

PlotInfo:

```
* subplot (True)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

### SMA

SMA(\[input\_arrays\], \[timeperiod=30\])

Simple Moving Average (Overlap Studies)

Inputs:

```
price: (any ndarray)
```

Parameters:

```
timeperiod: 30
```

Outputs:

```
real
```

Lines:

```
* real
```

Params:

```
* timeperiod (30)
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

### SQRT

SQRT(\[input\_arrays\])

Vector Square Root (Math Transform)

Inputs:

```
price: (any ndarray)
```

Outputs:

```
real
```

Lines:

```
* real
```

PlotInfo:

```
* subplot (True)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

### STDDEV

STDDEV(\[input\_arrays\], \[timeperiod=5\], \[nbdev=1\])

Standard Deviation (Statistic Functions)

Inputs:

```
price: (any ndarray)
```

Parameters:

```
timeperiod: 5 nbdev: 1
```

Outputs:

```
real
```

Lines:

```
* real
```

Params:

```
* timeperiod (5)

* nbdev (1)
```

PlotInfo:

```
* subplot (True)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

### STOCH

STOCH(\[input\_arrays\], \[fastk\_period=5\], \[slowk\_period=3\], \[slowk\_matype=0\], \[slowd\_period=3\], \[slowd\_matype=0\])

Stochastic (Momentum Indicators)

Inputs:

```
prices: [‘high’, ‘low’, ‘close’]
```

Parameters:

```
fastk_period: 5 slowk_period: 3 slowk_matype: 0 slowd_period: 3
slowd_matype: 0
```

Outputs:

```
slowk slowd
```

Lines:

```
* slowk

* slowd
```

Params:

```
* fastk_period (5)

* slowk_period (3)

* slowk_matype (0)

* slowd_period (3)

* slowd_matype (0)
```

PlotInfo:

```
* subplot (True)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* slowk: - ls (–)

* slowd: - ls (–)
```

### STOCHF

STOCHF(\[input\_arrays\], \[fastk\_period=5\], \[fastd\_period=3\], \[fastd\_matype=0\])

Stochastic Fast (Momentum Indicators)

Inputs:

```
prices: [‘high’, ‘low’, ‘close’]
```

Parameters:

```
fastk_period: 5 fastd_period: 3 fastd_matype: 0
```

Outputs:

```
fastk fastd
```

Lines:

```
* fastk

* fastd
```

Params:

```
* fastk_period (5)

* fastd_period (3)

* fastd_matype (0)
```

PlotInfo:

```
* subplot (True)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* fastk: - ls (-)

* fastd: - ls (-)
```

### STOCHRSI

STOCHRSI(\[input\_arrays\], \[timeperiod=14\], \[fastk\_period=5\], \[fastd\_period=3\], \[fastd\_matype=0\])

Stochastic Relative Strength Index (Momentum Indicators)

Inputs:

```
price: (any ndarray)
```

Parameters:

```
timeperiod: 14 fastk_period: 5 fastd_period: 3 fastd_matype: 0
```

Outputs:

```
fastk fastd
```

Lines:

```
* fastk

* fastd
```

Params:

```
* timeperiod (14)

* fastk_period (5)

* fastd_period (3)

* fastd_matype (0)
```

PlotInfo:

```
* subplot (True)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* fastk: - ls (-)

* fastd: - ls (-)
```

### SUB

SUB(\[input\_arrays\])

Vector Arithmetic Substraction (Math Operators)

Inputs:

```
price0: (any ndarray) price1: (any ndarray)
```

Outputs:

```
real
```

Lines:

```
* real
```

PlotInfo:

```
* subplot (True)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

### SUM

SUM(\[input\_arrays\], \[timeperiod=30\])

Summation (Math Operators)

Inputs:

```
price: (any ndarray)
```

Parameters:

```
timeperiod: 30
```

Outputs:

```
real
```

Lines:

```
* real
```

Params:

```
* timeperiod (30)
```

PlotInfo:

```
* subplot (True)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

T3

T3(\[input\_arrays\], \[timeperiod=5\], \[vfactor=0.7\])

Triple Exponential Moving Average (T3) (Overlap Studies)

Inputs:

```
price: (any ndarray)
```

Parameters:

```
timeperiod: 5 vfactor: 0.7
```

Outputs:

```
real
```

Lines:

```
* real
```

Params:

```
* timeperiod (5)

* vfactor (0.7)
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

### TAN

TAN(\[input\_arrays\])

Vector Trigonometric Tan (Math Transform)

Inputs:

```
price: (any ndarray)
```

Outputs:

```
real
```

Lines:

```
* real
```

PlotInfo:

```
* subplot (True)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

### TANH

TANH(\[input\_arrays\])

Vector Trigonometric Tanh (Math Transform)

Inputs:

```
price: (any ndarray)
```

Outputs:

```
real
```

Lines:

```
* real
```

PlotInfo:

```
* subplot (True)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

### TEMA

TEMA(\[input\_arrays\], \[timeperiod=30\])

Triple Exponential Moving Average (Overlap Studies)

Inputs:

```
price: (any ndarray)
```

Parameters:

```
timeperiod: 30
```

Outputs:

```
real
```

Lines:

```
* real
```

Params:

```
* timeperiod (30)
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

### TRANGE

TRANGE(\[input\_arrays\])

True Range (Volatility Indicators)

Inputs:

```
prices: [‘high’, ‘low’, ‘close’]
```

Outputs:

```
real
```

Lines:

```
* real
```

PlotInfo:

```
* subplot (True)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

### TRIMA

TRIMA(\[input\_arrays\], \[timeperiod=30\])

Triangular Moving Average (Overlap Studies)

Inputs:

```
price: (any ndarray)
```

Parameters:

```
timeperiod: 30
```

Outputs:

```
real
```

Lines:

```
* real
```

Params:

```
* timeperiod (30)
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

### TRIX

TRIX(\[input\_arrays\], \[timeperiod=30\])

1-day Rate-Of-Change (ROC) of a Triple Smooth EMA (Momentum Indicators)

Inputs:

```
price: (any ndarray)
```

Parameters:

```
timeperiod: 30
```

Outputs:

```
real
```

Lines:

```
* real
```

Params:

```
* timeperiod (30)
```

PlotInfo:

```
* subplot (True)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

### TSF

TSF(\[input\_arrays\], \[timeperiod=14\])

Time Series Forecast (Statistic Functions)

Inputs:

```
price: (any ndarray)
```

Parameters:

```
timeperiod: 14
```

Outputs:

```
real
```

Lines:

```
* real
```

Params:

```
* timeperiod (14)
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

### TYPPRICE

TYPPRICE(\[input\_arrays\])

Typical Price (Price Transform)

Inputs:

```
prices: [‘high’, ‘low’, ‘close’]
```

Outputs:

```
real
```

Lines:

```
* real
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

### ULTOSC

ULTOSC(\[input\_arrays\], \[timeperiod1=7\], \[timeperiod2=14\], \[timeperiod3=28\])

Ultimate Oscillator (Momentum Indicators)

Inputs:

```
prices: [‘high’, ‘low’, ‘close’]
```

Parameters:

```
timeperiod1: 7 timeperiod2: 14 timeperiod3: 28
```

Outputs:

```
real
```

Lines:

```
* real
```

Params:

```
* timeperiod1 (7)

* timeperiod2 (14)

* timeperiod3 (28)
```

PlotInfo:

```
* subplot (True)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

### VAR

VAR(\[input\_arrays\], \[timeperiod=5\], \[nbdev=1\])

Variance (Statistic Functions)

Inputs:

```
price: (any ndarray)
```

Parameters:

```
timeperiod: 5 nbdev: 1
```

Outputs:

```
real
```

Lines:

```
* real
```

Params:

```
* timeperiod (5)

* nbdev (1)
```

PlotInfo:

```
* subplot (True)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

### WCLPRICE

WCLPRICE(\[input\_arrays\])

Weighted Close Price (Price Transform)

Inputs:

```
prices: [‘high’, ‘low’, ‘close’]
```

Outputs:

```
real
```

Lines:

```
* real
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

### WILLR

WILLR(\[input\_arrays\], \[timeperiod=14\])

Williams’ %R (Momentum Indicators)

Inputs:

```
prices: [‘high’, ‘low’, ‘close’]
```

Parameters:

```
timeperiod: 14
```

Outputs:

```
real
```

Lines:

```
* real
```

Params:

```
* timeperiod (14)
```

PlotInfo:

```
* subplot (True)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```

### WMA

WMA(\[input\_arrays\], \[timeperiod=30\])

Weighted Moving Average (Overlap Studies)

Inputs:

```
price: (any ndarray)
```

Parameters:

```
timeperiod: 30
```

Outputs:

```
real
```

Lines:

```
* real
```

Params:

```
* timeperiod (30)
```

PlotInfo:

```
* subplot (False)

* plot (True)

* plotskip (False)

* plotname ()

* plotforce (False)

* plotyhlines ([])

* plothlines ([])

* plotabove (False)

* plotymargin (0.0)

* plotlinelabels (False)

* plotmaster (None)

* plotyticks ([])
```

PlotLines:

```
* real: - ls (-)
```
