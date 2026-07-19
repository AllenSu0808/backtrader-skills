# Backtrader Documentation

## Analyzers

- [Analyzers](analyzers/analyzers-analyzers.md): Be it backtesting or trading, being able to analyze the performance of the trading system is key to understanding if not only profit has been attained, but also if it has been achieved with too much risk or if it was really worth the effort.
- [Analyzers - PyFolio - Integration](analyzers/analyzers-pyfolio-integration-pyfolio-integration.md): The integration of a portfolio tool, namely `pyfolio`, came up with in GitHub Ticket #108 to help analyze and visualize portfolio performance using the pyfolio library.
- [Analyzers - PyFolio](analyzers/analyzers-pyfolio.md): Integration with the PyFolio library for comprehensive portfolio analysis, including tear sheets and performance visualization for backtested strategies.

## Analyzers Reference

- [Analyzers Reference](analyzers-reference/analyzers-reference.md): This analyzer calculates the AnnualReturns by looking at the beginning and end of the year, providing annual return performance metrics for your trading strategies.

## Automated Running

- [Automated Running](automated-running/automated-bt-run-automated-bt-run.md): So far all backtrader examples and working samples have started from scratch creating a main Python module which loads datas, strategies, observers and analyzers. This page presents a more automatic way.

## Broker

- [Broker](broker/broker.md): Broker Simulator providing the core brokerage functionality to simulate order execution, cash management, and position tracking during backtesting.
- [Broker - Cheat-On-Open](broker/cerebro-cheat-on-open-cheat-on-open.md): Release 1.9.44.116 adds support for Cheat-On-Open, allowing strategies to have access to the bar’s open price information before the main next() call.
- [Broker - Volume Filling - Fillers](broker/filler.md): The backtrader broker simulation has a default strategy when it comes to using volume for order execution. This document explains the volume-based order filling mechanisms.
- [Broker - Slippage](broker/slippage-slippage.md): Backtesting cannot guarantee real market conditions. This document explains how to simulate slippage in your backtests to make them more realistic.

## Cerebro

- [Cerebro](cerebro/cerebro.md): This class is the cornerstone of backtrader because it serves as a central point for organizing and running backtests, managing data feeds, strategies, and brokers.
- [Cerebro - Exceptions](cerebro/exceptions.md): One of the design goals was to quit as early as possible and let the users have full transparency of what was happening with errors and exceptions.
- [Cerebro - Memory Savings](cerebro/memory-savings-memory-savings.md): Release 1.3.1.92 has reworked and fully implemented the memory saving schemes that were introduced in earlier releases to optimize memory usage during backtesting.
- [Cerebro - Optimization - Improvements](cerebro/optimization-improvements.md): Version 1.8.12.99 of backtrader includes an improvement in how data feeds and results are managed during multiprocessing optimization runs.

## Commission Schemes

- [Commission Schemes - Credit Interest](commission-schemes/commission-credit.md): In some situations, the cash amount in real brokers may be decreased because the operation on assets includes an interest rate, which can be simulated.
- [Commission Schemes](commission-schemes/commission-schemes-commission-schemes.md): Before going forward remember that backtrader tries to remain agnostic as to what the data represents. Different commission schemes can be applied to simulate various broker fee structures.
- [Commission Schemes - Extending](commission-schemes/extending-commissions-commission-schemes-extended.md): Commissions and associated functionality were managed by a single class CommissionInfo and can be extended to create custom commission schemes and fee structures.
- [Commission Schemes - Custom Schemes](commission-schemes/user-defined-commissions-commission-schemes-subclassing.md): The most important part of reworking the CommInfo object to the actual incarnation involved creating custom subclasses to implement your own commission and fee logic.

## Data Feeds

- [Data Feeds - Multiple Timeframes](data-feeds/data-multitimeframe-data-multitimeframe.md): Sometimes investing decisions are taken using different timeframes. This document explains how to work with multiple timeframes simultaneously in backtrader.
- [Data Feeds - Replay](data-feeds/data-replay-data-replay.md): The time is gone and testing a strategy against a fully formed and closed bar is good, but it could be better. Replay allows testing against bar replay for more granular analysis.
- [Data Feeds - Resample](data-feeds/data-resampling-data-resampling.md): When data is only available in a single timeframe and the analysis has to be done for a different timeframe, it’s time to do some resampling.
- [Data Feeds - Rollover](data-feeds/data-rollover-rolling-futures-over.md): Not every provider offers a continuous future for the instruments with which one can trade. Sometimes you need to roll over from one contract to the next.
- [Data Feeds - Reference](data-feeds/dataautoref.md): Reference documentation for all available data feed lines and properties that can be accessed in strategies and indicators.
- [Data Feeds - Development - CSV](data-feeds/datafeed-develop-csv.md): Backtrader already offers a Generic CSV Data feed and some specific CSV Data Feeds for various data providers. Learn how to create your own CSV data feed.
- [Data Feeds - Development - General](data-feeds/datafeed-develop-general-datafeed-develop-general.md): Guide to developing custom data feeds for proprietary data sources or specialized data formats not covered by built-in data feed parsers.
- [Data Feeds](data-feeds/datafeed.md): Backtrader comes with a set of Data Feed parsers to let you load data from different sources. This page provides an overview of all available data feeds.
- [Data Feeds - Yahoo](data-feeds/datayahoo.md): In May 2017 Yahoo discontinued the existing API for historical data downloads in CSV format. This document explains alternative approaches for getting historical data.
- [Data Feeds - Extending](data-feeds/extending-a-datafeed.md): Issues in GitHub are actually pushing into finishing documentation parts or helping understand if backtrader has the ease of use and flexibility needed for custom data feeds.
- [Data Feeds - Panda](data-feeds/pandas-datafeed-pandas-datafeed.md): Supporting Pandas Dataframes is available through a dedicated data feed class. Learn how to load your data using Pandas and use it with backtrader.

## Datetime

- [Datetime - Management](datetime/timemgmt.md): Up until release 1.5.0, backtrader used a direct approach to time management. This document explains how datetime is handled in backtrader.
- [Datetime - Timers](datetime/timers-timers.md): Release 1.9.44.116 added timers to the arsenal of tools available in backtrader. This functionality allows to get a call back to the notify_timer method at specific times.
- [Datetime - Trading Calendars](datetime/tradingcalendar-tradingcalendar.md): Release 1.9.42.116 adds support for Trading Calendars. This is useful when resampling in scenarios where holidays or non-trading days need to be skipped.

## Filters

- [Filters - Reference](filters/filters-reference.md): This class can be applied to a data source as a filter and will filter out intraday bars which fall outside of the regular session times (pre/post market, holidays, etc).
- [Filters](filters/filters.md): This functionality is a relatively late addition to backtrader and had to be fitted to the already existing internals, making it flexible for filtering data feeds.

## Indicators

- [Indicators - Reference](indicators/indautoref.md): Complete reference documentation for all built-in indicators available in backtrader, including their parameters, lines, and usage.
- [Indicators - Development](indicators/inddev.md): If anything besides one or more winning Strategies must ever be developed, this something is a custom Indicator. Learn how to create your own indicators.
- [Indicators - Usage](indicators/induse.md): Indicators can be used in two places in the platform: in the Strategy class and during optimization to help refine your trading systems.
- [Indicators - Timeframe Mixing](indicators/mixing-timeframes-indicators-mixing-timeframes.md): Release 1.3.0.92 brings up the possibility to have data from either data feeds and/or indicators being mixed timeframes in the same strategy.
- [Indicators - ta-lib](indicators/talib-talib.md): Even if backtrader offers an already high number of built-in indicators, many traders prefer to use ta-lib. This document explains ta-lib integration.
- [Indicators - ta-lib - Reference](indicators/talibindautoref.md): Reference documentation for all ta-lib indicators available through the backtrader ta-lib wrapper.

## Installation

- [Installation](installation/installation.md): Backtrader is self-contained with no external dependencies except if you want to plot. Get started with easy installation instructions.

## Introduction

- [Introduction](introduction/index.md): Welcome to the backtrader documentation! This is your starting point for learning about the backtrader backtesting and live trading platform.

## Live Trading

- [Live Trading - Interactive Brokers](live-trading/live-ib-ib.md): The integration with Interactive Brokers supports both live data and live trading, allowing you to trade real accounts through backtrader.
- [Live Trading - Intro](live-trading/live-live.md): Starting with release 1.5.0 backtrader supports live data and live trading, enabling real-time trading with your strategies.
- [Live Trading - Oanda v1.0](live-trading/live-oanda-oanda.md): The integration with Oanda supports both live data and live trading for forex traders using the backtrader platform.
- [Live Trading - Visual Chart](live-trading/live-vc-vc.md): The integration with Visual Chart supports both live data and live trading for traders using the Visual Chart data provider.

## Logging

- [Logging - Writer](logging/writer.md): Write out to a stream the following contents from your backtest, including price data, orders, trades, and strategy operations for debugging and analysis.

## Observers

- [Observers - Benchmarking](observers/observer-benchmark-benchmarking.md): Ticket #89 is about adding benchmarking against an asset. Sensible as one may actually have a strategy which outperforms an asset but is it really worth the effort?
- [Observers - Statistics](observers/observers-and-statistics-observers-and-statistics.md): Strategies running inside backtrader do mostly deal with data feeds and indicators. Observers track additional statistics about strategy performance.
- [Observers - Reference](observers/observers-reference.md): This observer stores the returns of the strategy and the return of a reference asset for comparison and benchmarking purposes.

## Operating the Platform

- [Operating the Platform](operating-the-platform/operating.md): To engage into operations, the platform uses the notion of line iterators. They have been loosely modeled after Python’s iterators but have actually nothing to do with them.

## Orders

- [Orders - Brackets](orders/order-creation-execution-bracket-bracket.md): Release 1.9.37.116 adds bracket orders giving a very broad spectrum of orders which are supported by the backtesting broker including protective stops and profit targets.
- [Orders - Future-Spot Compensation](orders/order-creation-execution-futurespot-future-vs-spot.md): Release 1.9.32.116 adds support for an interesting use case presented in the Community for trading both futures and spot instruments together.
- [Orders - OCO](orders/order-creation-execution-oco-oco.md): Release 1.9.34.116 adds OCO (One Cancel Others) to the backtesting arsenal, allowing multiple orders where only one can execute before others are cancelled.
- [Orders - Creation/Execution](orders/order-creation-execution-order-creation-execution.md): Backtesting, and hence backtrader, would not be complete if orders could not be simulated. This document covers order creation and execution.
- [Orders - StopTrail](orders/order-creation-execution-trail-stoptrail.md): Release 1.9.35.116 adds the StopTrail and StopTrailLimit order execution types to the backtesting arsenal for trailing stop strategies.
- [Orders - Target Orders](orders/order-target-order-target.md): Until version 1.8.10.96 smart staking was possible with backtrader over the Strategy methods. This document explains target orders for position sizing.
- [Orders - General](orders/order.md): Cerebro is the key control system in backtrader and Strategy (a subclass) is the key control point of the end user. This document covers order fundamentals.

## Platform Concepts

- [Platform Concepts](platform-concepts/concepts.md): This is a collection of some of the concepts of the platform. It tries to gather information bits which can be useful in using the platform.

## Plotting

- [Plotting](plotting/plotting-plotting.md): Although backtesting is meant to be an automated process based on mathematical calculations, it is often the case that one wants to actually visualize what happened.
- [Plotting - Date Ranges](plotting/plotting-ranges-plotting-date-ranges.md): The release 1.9.31.x added the capability to make partial plots, showing only specific date ranges instead of the entire backtest period.
- [Plotting - Same Axis](plotting/plotting-sameaxis-plot-sameaxis.md): The previous post future-spot was plotting the original data and the slightly (randomly) modified data on the same space, but not on the same axis.

## Position

- [Position](position/position.md): Position on an asset is usually checked from within a Strategy with methods that allow you to query and manage your current positions.

## Quickstart Guide

- [Quickstart Guide](quickstart-guide/quickstart-quickstart.md): Let’s run through a series of examples from almost an empty one to a fully fledged strategy to help you get started with backtrader.

## Sizers

- [Sizers - Reference](sizers/sizers-reference.md): This sizer simply returns a fixed size for any operation. Size can be controlled by number of tranches that a system wishes to use to scale into trades.
- [Sizers](sizers/sizers-sizers.md): Sizers allow you to control position sizing in backtrader, including smart staking and dynamic position sizing strategies.

## Strategy

- [Strategy - Signals](strategy/signal-strategy-signal-strategy.md): Operating backtrader is also possible without having to write a Strategy. Although this is the preferred way, due to the object hierarchy which makes it easy to manage.
- [Strategy - Reference](strategy/strategy-reference.md): Reference for the built-in strategies and strategy interface documentation for creating your own strategies.
- [Strategy](strategy/strategy.md): A Cerebro instance is the pumping heart and controlling brain of backtrader. A Strategy is the same for the platform user.

## Trade

- [Trade](trade/trade.md): Definition of a trade, including how backtrader tracks and manages trades from entry to exit, and how to access trade information in your strategies.
