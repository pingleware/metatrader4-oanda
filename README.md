# PINGLEWARE Metatrader API Proxy for OANDA v2.0 REST API
API algorithmin trading is independent of the operating system and trading platform. The OANDA REST API has functionality not available to metatrader expert advisors like a Market-If-Touch order which is an extensive pending order, and API trading permits the inclusion of trailing stop.

This module provides provides matching functionality of the metatrader functions to the OANDA REST API.

# Using MQL5.COM private signals
If your trading account is associated with MetaTrader, then you can create a private signal to monitor and obtain live statistics and performance metrics of your API algorithmic trading, but keep in mond that API trading is marked as 'Placed manually' whereas a metatrader EA is marked as 'Placed by expert'. If only API trades are placed on the account, the Algo Trading metric will show 0% because metatrader is reporting those trades as manual trades. Best to keep the signal private with the above notation reminder in the description.

# Installation

    npm i @pingleware/metatrader4-oanda

# Usage

    "use strict"

    const {
        initialize, 
        AccountNumber
    } = require("@pingleware/metatrader4-oanda");

    // First, you must initialize the module with a selected OANDA account, whether LIVE or PRACTICE
    initialize('api-fxpractice.oanda.com','[ACCESS TOKEN]','[ACCOUNT ID (not the MT4 account number)]');

    // returns the MT4 account
    AccountNumber(function(accountNumber){
        console.log(accountNumber);
    });

OrderSend has a trailing stop parameter and removes the arrow color parameter. With API trading, you can include a trailing stop loss order when the order is first created. Prior to API trading and within the MQL programming, you were required to write a trailing stop algorithm in an expert advisor or watch the Metatrader terminal and add the trailing stop the each trade manually.

    OrderSend(symbol,cmd,volume,price,slippage,stoploss,takeprofit,trailingstop,comment=null,magic=0,expiration=0,callback);

where,

    symbol refers to the currency pair,
    cmd refers to the trade operation, OP_BUY, OP_SELL, etc.
    volume refers to the lot size in decimal format and wil automatically divide by 100,000 for a standard lot
    price refers to the trade price
    slippage refers to the maximum price you will accept
    stoploss refers to the stop loss target
    takeprofit refers to the take profit target
    trailingstop refers to the distance for the trailing stop loss, a zero indicates no trailing stop loss
    comment refers to a user-defined comment
    magic sets the tag value in the clientExtensions
    expiration sets an expiry time for LIMIT and STOP orders
    callback is the callback function to return the trade information

## iCustom function
The iCustom function is provided to invoke standalone executable indicator files, which take the command line arguments,

    program_name symbol timeframe [optional indicator arguments]

the indicator code should output the results to the console for the return to capture the console and send back to the caller.

# Supported Metatrader Functions
The following functions are supported and use callbacks for asynchronous communication,

## Initialization Functions

    initialize,
    configureFTP,
    configureTwilio,
    configSendGrid,

## Marketinfo

    MARKETINFO_MODE,
    ENUM_SYMBOL_INFO_INTEGER,
    ENUM_SYMBOL_INFO_DOUBLE,
    ENUM_SYMBOL_INFO_STRING,
    ENUM_SYMBOL_TRADE_MODE,
    ENUM_SYMBOL_TRADE_EXECUTION,
    ENUM_DAY_OF_WEEK,
    MarketInfo,
    SymbolsTotal,
    SymbolName,
    SymbolSelect,
    SymbolInfoDouble,
    SymbolInfoInteger,
    SymbolInfoString,
    SymbolInfoTick,
    SymbolInfoSessionQuote,
    SymbolInfoSessionTrade,

## Account Information

    ENUM_ACCOUNT_INFO_INTEGER,
    ENUM_ACCOUNT_INFO_DOUBLE,
    ENUM_ACCOUNT_INFO_STRING,
    ENUM_ACCOUNT_TRADE_MODE,
    ENUM_ACCOUNT_STOPOUT_MODE,
    AccountInfoDouble,
    AccountInfoInteger,
    AccountInfoString,
    AccountBalance,
    AccountCredit,
    AccountCompany,
    AccountCurrency,
    AccountEquity,
    AccountFreeMargin,
    AccountFreeMarginCheck,
    AccountFreeMarginMode,
    AccountLeverage,
    AccountMargin,
    AccountName,
    AccountNumber,
    AccountProfit,
    AccountServer,
    AccountStopoutLevel,
    AccountStopoutMode,

## Trade Operations

    TRADE_OP,
    OrderClose,
    OrderCloseBy,
    OrderClosePrice,
    OrderCloseTime,
    OrderComment,
    OrderCommission,
    OrderDelete,
    OrderExpiration,
    OrderLots,
    OrderMagicNumber,
    OrderModify,
    OrderOpenPrice,
    OrderOpenTime,
    OrderPrint,
    OrderProfit,
    OrderSelect,
    OrderSend,
    OrdersHistoryTotal,
    OrderStopLoss,
    OrdersTotal,
    OrderSwap,
    OrderSymbol,
    OrderTakeProfit,
    OrderTicket,
    OrderType

## Math Functions

    MathAbs,
    MathCos,
    MathArcsin,
    MathArctan,
    MathCeil,
    MathArccos,
    MathExp,
    MathFloor,
    MathLog,
    MathLog10,
    MathMax,
    MathMin,
    MathMod,
    MathPow,
    MathRand,
    MathRound,
    MathSin,
    MathSqrt,
    MathSrand,
    MathTan,
    MathIsValidNumber

## Time Series Functions

    ENUM_TIMEFRAMES,
    ENUM_SERIES_INFO_INTEGER,
    ENUM_SERIESMODE,
    SeriesInfoInteger,
    RefreshRates,
    CopyRatesFromStart,
    CopyRatesFromDate,
    CopyRatesBetween,
    CopyTimeFromStart,
    CopyTimeFromDate,
    CopyTimeBetween,
    CopyOpenFromStart,
    CopyOpenFromDate,
    CopyOpenBetween,
    CopyHighFromStart,
    CopyHighFromDate,
    CopyHighBetween,
    CopyLowFromStart,
    CopyLowFromDate,
    CopyLowBetween,
    CopyCloseFromStart,
    CopyCloseFromDate,
    CopyCloseBetween,
    CopyTickVolumeFromStart,
    CopyTickVolumeFromDate,
    CopyTickVolumeBetween,
    Bars,
    BarsBetween,
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

## Date Time Functions

    TimeCurrent,
    TimeLocal,
    TimeGMT,
    TimeDaylightSavings,
    TimeGMTOffset,
    TimeToStruct,
    StructToTime,
    Day,
    DayOfWeek,
    DayOfYear,
    Hour,
    Minute,
    Month,
    Seconds,
    TimeDay,
    TimeDayOfWeek,
    TimeDayOfYear,
    TimeHour,
    TimeMinute,
    TimeMonth,
    TimeSeconds,
    TimeYear,
    Year 

## Technical Indicators

    iAC,
    iAD,
    iADX,
    iAlligator,
    iAO,
    iATR,
    iBearsPower,
    iBands,
    iBandsOnArray,
    iBullsPower,
    iCCI,
    iCCIOnArray,
    iCustom,
    iDeMarker,
    iEnvelopes,
    iEnvelopesOnArray,
    iForce,
    iFractals,
    iGator,
    iIchimoku,
    iBWMFI,
    iMomentum,
    iMomentumOnArray,
    iMFI,
    iMA,
    iMAOnArray,
    iOsMA,
    iMACD,
    iOBV,
    iSAR,
    iRSI,
    iRSIOnArray,
    iRVI,
    iStdDev,
    iStdDevOnArray,
    iStochastic,
    iWPR

## Checkup Functions

    GetLastError,
    IsStopped,
    UninitializeReason,
    MQLInfoInteger,
    MQLInfoString,
    MQLSetInteger,
    TerminalInfoInteger,
    TerminalInfoDouble,
    TerminalInfoString,
    Symbol,
    Period,
    Digits,
    Point,
    IsConnected,
    IsDemo,
    IsDllsAllowed,
    IsExpertEnabled,
    IsLibrariesAllowed,
    IsOptimization,
    IsTesting,
    IsTradeAllowed,
    IsTradeContextBusy,
    IsVisualMode,
    TerminalCompany,
    TerminalName,
    TerminalPath

## Common Functions

    Alert,
    CheckPointer,
    Comment,
    CryptEncode,
    CryptDecode,
    DebugBreak,
    ExpertRemove,
    GetPointer,
    GetTickCount,
    GetMicrosecondCount,
    MessageBox,
    PeriodSeconds,
    PlaySound,
    Print,
    PrintFormat,
    ResetLastError,
    ResourceCreate,
    ResourceFree,
    ResourceReadImage,
    ResourceSave,
    SendFTP,
    SendMail,
    SendNotification,
    Sleep,
    TerminalClose,
    TesterStatistics,
    TranslateKey,
    WebRequest,
    ZeroMemory


# Release Schedule

        Date        Version
    ??/??/2022       1.0.0          Production release

## Release Tags

    alpha = preview not suitable for production, not all functionality is implemented, some functionality may change without notice; testing and evaluation purposes only
    beta  = functionality implementation has been finalized, some testing performed, not thoroughly tested, only major breaks will change functionality implementation
    gamma = functionality implemnetation has been locked down, extensive testing is under way.

    production = (without any version suffix), ready for live trading

# End-of-Life Doctrine
When a piece of software is useful, there should never be an EOL doctrine. The intention for this application is to achieve immoratlity ;).
At some point of time in the future, this project may appear to be dead and abandon. The opposite will be true!
When this project reaches that stage, this project has matured to a level where maintenance is minimal (mostly updating to latest version of Node).

    Patrick O. Ingle
    September 12, 2022
