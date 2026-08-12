# Backtrader Documentation

## Analyzers

- [Analyzers](analyzers/analyzers-analyzers.md): 無論是回測還是交易，能夠分析交易系統的績效是關鍵的，不僅要了解是否獲利，還要評估是否承擔了過多風險或付出的努力是否值得。
- [Analyzers - PyFolio - Integration](analyzers/analyzers-pyfolio-integration-pyfolio-integration.md): 在 GitHub Ticket #108 中，整合了投資組合工具 `pyfolio`，幫助使用 pyfolio 函式庫分析和視覺化投資組合績效。
- [Analyzers - PyFolio](analyzers/analyzers-pyfolio.md): 與 PyFolio 函式庫的整合，提供全面的投資組合分析，包括淚表和回測策略的績效視覺化。

## Analyzers Reference

- [Analyzers Reference](analyzers-reference/analyzers-reference.md): 此分析器透過查看年度開始和結束時間點來計算年度回報，為您的交易策略提供年度回報績效指標。

## Automated Running

- [Automated Running](automated-running/automated-bt-run-automated-bt-run.md): 到目前為止，所有 backtrader 範例和工作樣本都是從零開始建立主 Python 模組，載入資料、策略、觀察者和分析器。本頁面介紹一種更自動化的方式。

## Broker

- [Broker](broker/broker.md): 經紀商模擬器，提供核心經紀功能以模擬訂單執行、現金管理和回測期間的部位追蹤。
- [Broker - Cheat-On-Open](broker/cerebro-cheat-on-open-cheat-on-open.md): 版本 1.9.44.116 新增對 Cheat-On-Open 的支援，允許策略在主 next() 呼叫之前存取 K 線的開盤價資訊。
- [Broker - Volume Filling - Fillers](broker/filler.md): backtrader 經紀商模擬針對訂單執行時使用成交量有預設策略。本文件說明基於成交量的訂單成交機制。
- [Broker - Slippage](broker/slippage-slippage.md): 回測無法保證真實市場狀況。本文件說明如何在回測中模擬滑點，使結果更貼近現實。

## Cerebro

- [Cerebro](cerebro/cerebro.md): 此類別是 backtrader 的基石，因為它作為組織和運行回測、管理資料源、策略和經紀商的中心點。
- [Cerebro - Exceptions](cerebro/exceptions.md): 設計目標之一是盡早退出並讓使用者完全了解錯誤和例外發生的情況。
- [Cerebro - Memory Savings](cerebro/memory-savings-memory-savings.md): 版本 1.3.1.92 重新設計並完整實現了之前版本引入的記憶體節省方案，以優化回測期間的記憶體使用。
- [Cerebro - Optimization - Improvements](cerebro/optimization-improvements.md): 版本 1.8.12.99 改進了在多處理最佳化執行期間資料源和結果的管理方式。

## Commission Schemes

- [Commission Schemes - Credit Interest](commission-schemes/commission-credit.md): 在某些情況下，真實經紀商的現金金額可能會因資產操作包含利率而減少，這可以被模擬。
- [Commission Schemes](commission-schemes/commission-schemes-commission-schemes.md): 記住 backtrader 試圖保持對資料代表內容的不可知性。可以應用不同的費用計劃以模擬各種經紀商費用結構。
- [Commission Schemes - Extending](commission-schemes/extending-commissions-commission-schemes-extended.md): 費用和相關功能由單一類別 CommissionInfo 管理，可以擴展以建立自訂費用計劃和費用結構。
- [Commission Schemes - Custom Schemes](commission-schemes/user-defined-commissions-commission-schemes-subclassing.md): 重新設計 CommInfo 物件最重要的部分涉及建立自訂子類別以實現您自己的費用和手續費邏輯。

## Data Feeds

- [Data Feeds - Multiple Timeframes](data-feeds/data-multitimeframe-data-multitimeframe.md): 有時投資決策是使用不同的時間框架進行的。本文件說明如何在 backtrader 中同時使用多個時間框架。
- [Data Feeds - Replay](data-feeds/data-replay-data-replay.md): 時光已逝，針對完全形成和已平倉的 K 線進行策略測試很好，但可能更好。Replay 允許針對 K 線重播進行更精細的分析測試。
- [Data Feeds - Resample](data-feeds/data-resampling-data-resampling.md): 當資料只在單一時間框架中可用，而分析必須在不同的時間框架中進行時，是時候進行重新取樣了。
- [Data Feeds - Rollover](data-feeds/data-rollover-rolling-futures-over.md): 並非每個提供者都為您可以交易的商品提供連續期貨合約。有時您需要從一份合約展期到下一份。
- [Data Feeds - Reference](data-feeds/dataautoref.md): 所有可用資料源線及其在策略和指標中可存取的屬性的參考文件。
- [Data Feeds - Development - CSV](data-feeds/datafeed-develop-csv.md): Backtrader 已經提供通用 CSV 資料源和各種資料提供者的特定 CSV 資料源。學習如何建立您自己的 CSV 資料源。
- [Data Feeds - Development - General](data-feeds/datafeed-develop-general-datafeed-develop-general.md): 為專有資料源或未由內建資料源解析器涵蓋的特殊資料格式開發自訂資料源的指南。
- [Data Feeds](data-feeds/datafeed.md): Backtrader 提供一組資料源解析器，讓您從不同來源載入資料。本頁面提供所有可用資料源的概述。
- [Data Feeds - Yahoo](data-feeds/datayahoo.md): 2017 年 5 月，Yahoo 停止了現有的歷史資料 CSV 格式下載 API。本文件說明獲取歷史資料的替代方法。
- [Data Feeds - Extending](data-feeds/extending-a-datafeed.md): GitHub 上的議題實際上推動了完成文件部分或幫助了解 backtrader 對自訂資料源的易用性和靈活性。
- [Data Feeds - Panda](data-feeds/pandas-datafeed-pandas-datafeed.md): 支援 Pandas 資料框可透過專用資料源類別進行。學習如何使用 Pandas 載入您的資料並將其用於 backtrader。

## Datetime

- [Datetime - Management](datetime/timemgmt.md): 直到版本 1.5.0，backtrader 採用直接方法進行時間管理。本文件說明 backtrader 中的日期時間處理方式。
- [Datetime - Timers](datetime/timers-timers.md): 版本 1.9.44.116 在 backtrader 可用工具中新增了計時器。此功能允許在特定時間回呼 notify_timer 方法。
- [Datetime - Trading Calendars](datetime/tradingcalendar-tradingcalendar.md): 版本 1.9.42.116 新增了對交易日曆的支援。這在重新取樣時很有用，特別是在需要跳過假期或非交易日時。

## Filters

- [Filters - Reference](filters/filters-reference.md): 此類別可應用於資料源作為篩選器，將超出正常交易時段（市場前/後交易、假期等）的盤中 K 線過濾出去。
- [Filters](filters/filters.md): 此功能相對較晚加入 backtrader，必須適應現有的內部結構，使其靈活地用於過濾資料源。

## Indicators

- [Indicators - Reference](indicators/indautoref.md): backtrader 中所有內建指標的完整參考文件，包括其參數、線和使用方法。
- [Indicators - Development](indicators/inddev.md): 如果必須開發除了一個或多個獲勝策略之外的任何東西，那就是自訂指標。學習如何建立您自己的指標。
- [Indicators - Usage](indicators/induse.md): 指標可在平台中的兩個地方使用：在 Strategy 類別中和在最佳化期間以幫助改進交易系統。
- [Indicators - Timeframe Mixing](indicators/mixing-timeframes-indicators-mixing-timeframes.md): 版本 1.3.0.92 帶來了在同一策略中混合資料源和/或指標時間框架的可能性。
- [Indicators - ta-lib](indicators/talib-talib.md): 儘管 backtrader 已提供大量內建指標，但許多交易者仍偏好使用 ta-lib。本文件說明 ta-lib 整合。
- [Indicators - ta-lib - Reference](indicators/talibindautoref.md): 透過 backtrader ta-lib 包裝器可用的所有 ta-lib 指標的參考文件。

## Installation

- [Installation](installation/installation.md): Backtrader 是獨立的，除非您想繪圖，否則沒有外部依賴項。透過簡單的安裝說明快速上手。

## Introduction

- [Introduction](introduction/index.md): 歡迎來到 backtrader 文件！這是您開始學習 backtrader 回測和實盤交易平台的起點。

## Live Trading

- [Live Trading - Interactive Brokers](live-trading/live-ib-ib.md): 與 Interactive Brokers 的整合支援實時資料和實盤交易，允許您透過 backtrader 交易真實帳戶。
- [Live Trading - Intro](live-trading/live-live.md): 從版本 1.5.0 開始，backtrader 支援實時資料和實盤交易，啟用與策略的實時交易。
- [Live Trading - Oanda v1.0](live-trading/live-oanda-oanda.md): 與 Oanda 的整合為使用 backtrader 平台的外匯交易者支援實時資料和實盤交易。
- [Live Trading - Visual Chart](live-trading/live-vc-vc.md): 與 Visual Chart 的整合為使用 Visual Chart 資料提供者的交易者支援實時資料和實盤交易。

## Logging

- [Logging - Writer](logging/writer.md): 寫出回測的以下內容到流，包括價格資料、訂單、交易和策略操作，用於除錯和分析。

## Observers

- [Observers - Benchmarking](observers/observer-benchmark-benchmarking.md): Ticket #89 關於對資產的基準測試。合理的是，您可能擁有一個策略，其表現優於資產，但真的值得付出努力嗎？
- [Observers - Statistics](observers/observers-and-statistics-observers-and-statistics.md): backtrader 中執行的策略主要處理資料源和指標。觀察者追蹤有關策略績效的額外統計資訊。
- [Observers - Reference](observers/observers-reference.md): 此觀察者儲存策略的回報和參考資產的回報，用於比較和基準測試目的。

## Operating the Platform

- [Operating the Platform](operating-the-platform/operating.md): 要進行操作，平台使用線迭代器的概念。它們是根據 Python 的迭代器鬆散建模的，但實際上與它們無關。

## Orders

- [Orders - Brackets](orders/order-creation-execution-bracket-bracket.md): 版本 1.9.37.116 新增括號訂單，提供回測經紀商支援的非常廣泛的訂單，包括保護性停止損失和獲利目標。
- [Orders - Future-Spot Compensation](orders/order-creation-execution-futurespot-future-vs-spot.md): 版本 1.9.32.116 新增了對社群提出的有趣用例的支援，用於同時交易期貨和現貨商品。
- [Orders - OCO](orders/order-creation-execution-oco-oco.md): 版本 1.9.34.116 在回測工具中新增了 OCO（一取消其他），允許多個訂單，其中只有一個可以執行，其他被取消。
- [Orders - Creation/Execution](orders/order-creation-execution-order-creation-execution.md): 如果無法模擬訂單，backtrader 和回測就不完整。本文件涵蓋訂單建立和執行。
- [Orders - StopTrail](orders/order-creation-execution-trail-stoptrail.md): 版本 1.9.35.116 在回測工具中新增了 StopTrail 和 StopTrailLimit 訂單執行類型，用於追蹤停止損失策略。
- [Orders - Target Orders](orders/order-target-order-target.md): 直到版本 1.8.10.96，智慧佈局在 backtrader 中透過 Strategy 方法成為可能。本文件說明用於部位規模調整的目標訂單。
- [Orders - General](orders/order.md): Cerebro 是 backtrader 中的關鍵控制系統，Strategy（子類別）是終端使用者的關鍵控制點。本文件涵蓋訂單基礎知識。

## Platform Concepts

- [Platform Concepts](platform-concepts/concepts.md): 這是平台某些概念的集合。它試圖收集在使用平台時可能有用的資訊位。

## Plotting

- [Plotting](plotting/plotting-plotting.md): 儘管回測應該是基於數學計算的自動化過程，但有時人們希望實際視覺化發生了什麼。
- [Plotting - Date Ranges](plotting/plotting-ranges-plotting-date-ranges.md): 版本 1.9.31.x 增加了製作部分圖表的功能，只顯示特定日期範圍而不是整個回測期間。
- [Plotting - Same Axis](plotting/plotting-sameaxis-plot-sameaxis.md): 之前的期貨-現貨貼文在同一空間上繪製原始資料和略微（隨機）修改的資料，但不在同一軸上。

## Position

- [Position](position/position.md): 資產上的部位通常在 Strategy 中檢查，使用允許您查詢和管理目前部位的方法。

## Quickstart Guide

- [Quickstart Guide](quickstart-guide/quickstart-quickstart.md): 讓我們透過一系列範例，從幾乎空白到功能完整的策略，幫助您開始使用 backtrader。

## Sizers

- [Sizers - Reference](sizers/sizers-reference.md): 此規模調整器只為任何操作返回固定大小。大小可以透過系統希望用於擴展交易的分階段數量來控制。
- [Sizers](sizers/sizers-sizers.md): 規模調整器允許您控制 backtrader 中的部位規模調整，包括智慧佈局和動態部位規模調整策略。

## Strategy

- [Strategy - Signals](strategy/signal-strategy-strategy-signal-strategy.md): 也可以在不編寫 Strategy 的情況下運行 backtrader。雖然這是首選方式，但由於物件層級結構使其易於管理。
- [Strategy - Reference](strategy/strategy-reference.md): 內建策略和策略介面文件的參考，用於建立您自己的策略。
- [Strategy](strategy/strategy.md): Cerebro 實例是 backtrader 的跳動心臟和控制大腦。Strategy 對平台使用者也是如此。

## Trade

- [Trade](trade/trade.md): 交易的定義，包括 backtrader 如何從進入到退出追蹤和管理交易，以及如何在您的策略中存取交易資訊。
