# PINGLEWARE Metatrader API Proxy for OANDA v2.0 REST API
API algorithmin trading is independent of the operating system and trading platform. The OANDA REST API has functionality not available to metatrader expert advisors like a Market-If-Touch order which is an extensive pending order.

This module provides provides matching functionality of the metatrader functions to the OANDA REST API.

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

# Supported Metatrader Functions
The following functions are supported and use callbacks for asynchronous communication,

    initialize,

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
    ??/??/2022       1.0.0          Initial release

# End-of-Life Doctrine
When a piece of software is useful, there should never be an EOL doctrine. The intention for this application is to achieve immoratlity ;).
At some point of time in the future, this project may appear to be dead and abandon. The opposite will be true!
When this project reaches that stage, this project has matured to a level where maintenance is minimal (mostly updating to latest version of Node).

    Patrick O. Ingle
    September 12, 2022
