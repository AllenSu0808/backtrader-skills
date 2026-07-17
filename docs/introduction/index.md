---
source: https://www.backtrader.com/docu/./
fetched: 2026-07-17
title: "Introduction"
---

# Introduction

Welcome to the _backtrader_ documentation!

The platform has 2 main objectives:

1.  Ease of use
    
2.  Go back to 1
    

> Note
>
> Loosely based on the _Karate (Kid)_ rules by _Mr. Miyagi_.

The basics of running this platform:

*   Create a Strategy
    
    *   Decide on potential adjustable parameters
        
    *   Instantiate the Indicators you need in the Strategy
        
    *   Write down the logic for entering/exiting the market
        

> Tip
>
> Or alternatively:
>
> *   Prepare some indicators to work as _long_/_short_ signals

And then

*   Create a _Cerebro_ Engine
    
    *   First: Inject the _Strategy_ (or signal-based strategy)
    
    And then:
    
    *   Load and Inject a Data Feed (once created use `cerebro.adddata`)
        
    *   And execute `cerebro.run()`
        
    *   For visual feedback use: `cerebro.plot()`
        

The platform is highly configurable

Let’s hope you, the user, find the platform useful and fun to work with.
