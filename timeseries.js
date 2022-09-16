"use strict"

/**
SeriesInfoInteger
Returns information about the state of historical data
*/ 
function SeriesInfoInteger(callback){}
/**
RefreshRates
Refreshing of data in pre-defined variables and series arrays
*/ 
function RefreshRates(callback){}
/**
CopyRates
Gets history data of the Rates structure for a specified symbol and period into an array
*/ 
function CopyRates(callback){}
/**
CopyTime
Gets history data on bar opening time for a specified symbol and period into an array
*/ 
function CopyTime(callback){}
/**
CopyOpen
Gets history data on bar opening price for a specified symbol and period into an array
*/ 
function CopyOpen(callback){}
/**
CopyHigh
Gets history data on maximal bar price for a specified symbol and period into an array
*/ 
function CopyHigh(callback){}
/**
CopyLow
Gets history data on minimal bar price for a specified symbol and period into an array
*/ 
function CopyLow(callback){}
/**
CopyClose
Gets history data on bar closing price for a specified symbol and period into an array
*/ 
function CopyClose(callback){}
/**
CopyTickVolume
Gets history data on tick volumes for a specified symbol and period into an array
*/ 
function CopyTickVolume(callback){}
/**
Bars
Returns the number of bars count in the history for a specified symbol and period
*/ 
function Bars(callback){}
/**
iBars
Returns the number of bars on the specified chart
*/ 
function iBars(callback){}
/**
iBarShift
Returns the index of the bar which covers the specified time
*/ 
function iBarShift(callback){}
/**
iClose
Returns Close price value for the bar of specified symbol with timeframe and shift
*/ 
function iClose(callback){}
/**
iHigh
Returns High price value for the bar of specified symbol with timeframe and shift
*/ 
function iHigh(callback){}
/**
iHighest
Returns the shift of the maximum value over a specific number of bars
*/ 
function iHighest(callback){}
/**
iLow
Returns Low price value for the bar of indicated symbol with timeframe and shift
*/ 
function iLow(callback){}
/**
iLowest
Returns the shift of the lowest value over a specific number of bars
*/ 
function iLowest(callback){}
/**
iOpen
Returns Open price value for the bar of specified symbol with timeframe and shift
*/ 
function iOpen(callback){}
/**
iTime
Returns time value for the bar of specified symbol with timeframe and shift
*/ 
function iTime(callback){}
/**
iVolume
Returns Tick Volume value for the bar of specified symbol with timeframe and shift
 */
function iVolume(callback){}


module.exports = {
    SeriesInfoInteger,
    RefreshRates,
    CopyRates,
    CopyTime,
    CopyOpen,
    CopyHigh,
    CopyLow,
    CopyClose,
    CopyTickVolume,
    Bars,
    iBars,
    iBarShift,
    iClose,
    iHigh,
    iHighest,
    iLow,
    iLowest,
    iOpen,
    iTime,
    iVolume
};