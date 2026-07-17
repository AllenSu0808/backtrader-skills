---
source: https://www.backtrader.com/docu/datayahoo/
fetched: 2026-07-17
title: "Data Feeds - Yahoo"
---

# Yahoo Data Feed Notes

In May 2017 Yahoo discontinued the existing API for historical data downloads in _csv_ format.

A new API (here named `v7`) was quickly _standardized_ and has been implemented.

This also brought a change to the actual CSV download format.

## Using the v7 API/format

Starting with version `1.9.49.116` this is the default behavior. Choose simply from

*   `YahooFinanceData` for online downloads
    
*   `YahooFinanceCSVData` for offline downloaded files
    

## Using the legacy API/format

To use the old API/format

1.  Instantiate the online Yahoo data feed as:
    
    ```
    data = bt.feeds.YahooFinanceData(
        ...
        version='',
        ...
    )
    ```
    
    of the offline Yahoo data feed as:
    
    ```
    data = bt.feeds.YahooFinanceCSVData(
        ...
        version='',
        ...
    )
    ```
    
    It might be that the online service comes back (the service was _discontinued_ without any announcement … it might as well come back)
    

or

1.  Only for Offline files downloaded before the change happened, the following can also be done:
    
    ```
    data = bt.feeds.YahooLegacyCSV(
        ...
        ...
    )
    ```
    
    The new `YahooLegacyCSV` simply automates using `version=''`
