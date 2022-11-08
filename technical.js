"use strict"

const talib = require('ta-lib');
const { spawn } = require('child_process');

const ENUM_MA_METHOD = {
    MODE_SMA: 0,
    MODE_EMA: 1,
    MODE_SMMA: 2,
    MODE_LWMA: 3
};

/**
 * iAC
 * Accelerator Oscillator
*/ 
function iAC(symbol,timeframe,shift,callback){
    
}
/**
 * iAD
 * Accumulation/Distribution
*/ 
function iAD(callback){
    
}
/**
 * iADX
 * Average Directional Index
*/ 
function iADX(callback){

}
/**
 * iAlligator
 * Alligator
*/ 
function iAlligator(callback){}
/**
 * iAO
 * Awesome Oscillator
*/ 
function iAO(callback){}
/**
 * iATR
 * Average True Range
*/ 
function iATR(callback){}
/**
 * iBearsPower
 * Bears Power
*/ 
function iBearsPower(callback){}
/**
 * iBands
 * Bollinger Bands®
*/ 
function iBands(symbol,timeframe,period,deviation,bands_shift,applied_price,mode,shift,callback){

    var values = [];
    callback({status: 'success', bbands: talib.BBANDS(values,period,deviation)});
}
/**
 * iBandsOnArray
 * Calculation of Bollinger Bands® indicator on data, stored in a numeric array
*/ 
function iBandsOnArray(callback){}
/**
 * iBullsPower
 * Bulls Power
*/ 
function iBullsPower(callback){}
/**
 * iCCI
 * Commodity Channel Index
*/ 
function iCCI(callback){}
/**
 * iCCIOnArray
 * Calculation of Commodity Channel Index indicator on data, stored in a numeric array
*/ 
function iCCIOnArray(callback){}
/**
 * iCustom
 * Custom indicator 
 * 
 * @param {*} callback callback function to caller
 * @param {*} symbol currency pair
 * @param {*} timeframe time frame
 * @param {*} name full path name of custom indicator executable
 * @param  {...any} args additional arguments required for the custom indicator
 * 
 * the custom indicator output the results to the console which will be returned in the stdout capture
 */
function iCustom(callback,symbol,timeframe,name,...args){
    const child = spawn(name, [symbol,timeframe,...args], {shell: true});
    child.stdout.on('data', (data) => {
      callback({status: 'success', data: data});
    });
      
    child.stderr.on('data', (data) => {
      callback({status: 'error', message: data});
    });
      
    child.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });
}
/**
 * iDeMarker
 * DeMarker
*/ 
function iDeMarker(callback){}
/**
 * iEnvelopes
 * Envelopes
*/ 
function iEnvelopes(callback){}
/**
 * iEnvelopesOnArray
 * Calculation of Envelopes indicator on data, stored in a numeric array
*/ 
function iEnvelopesOnArray(callback){}
/**
 * iForce
 * Force Index
*/ 
function iForce(callback){}
/**
 * iFractals
 * Fractals
*/ 
function iFractals(callback){}
/**
 * iGator
 * Gator Oscillator
*/ 
function iGator(callback){}
/**
 * iIchimoku
 * Ichimoku Kinko Hyo
*/ 
function iIchimoku(callback){}
/**
 * iBWMFI
 * Market Facilitation Index by Bill Williams
*/ 
function iBWMFI(callback){}
/**
 * iMomentum
 * Momentum
*/ 
function iMomentum(callback){}
/**
 * iMomentumOnArray
 * Calculation of Momentum indicator on data, stored in a numeric array
*/ 
function iMomentumOnArray(callback){}
/**
 * iMFI
 * Money Flow Index
*/ 
function iMFI(callback){}
/**
 * iMA
 * Moving Average
*/ 
function iMA(symbol,timeframe,period,ma_shift,ma_method,applied_price,shift,callback){
    switch(ma_method) {
        case ENUM_MA_METHOD.MODE_SMA:
            callback({status: 'success', ma: talib.SMA(values,values.length)});
            break;
        case ENUM_MA_METHOD.MODE_EMA:
            callback({status: 'success', ma: talib.EMA(values,values.length)});
            break;
        case ENUM_MA_METHOD.MODE_SMMA:
            callback({status: 'error', message: 'not implemented'});
            break;
        case ENUM_MA_METHOD.MODE_LWMA:
            callback({status: 'error', message: 'not implemented'});
            break;
    }
}
/**
 * iMAOnArray
 * Calculation of Moving Average indicator on data, stored in a numeric array
*/ 
function iMAOnArray(callback){}
/**
 * iOsMA
 * Moving Average of Oscillator (MACD histogram)
*/ 
function iOsMA(callback){}
/**
 * iMACD
 * Moving Averages Convergence-Divergence
*/ 
function iMACD(callback){
    talib.MACD(values,i12,i26,i9);
}
/**
 * iOBV
 * On Balance Volume
*/ 
function iOBV(callback){}
/**
 * iSAR
 * Parabolic Stop And Reverse System
*/ 
function iSAR(callback){}
/**
 * iRSI
 * Relative Strength Index
*/ 
function iRSI(callback){
    talib.RSI(values,period);
}
/**
 * iRSIOnArray
 * Calculation of Momentum indicator on data, stored in a numeric array
*/ 
function iRSIOnArray(callback){}
/**
 * iRVI
 * Relative Vigor Index
*/ 
function iRVI(callback){}
/**
 * iStdDev
 * Standard Deviation
*/ 
function iStdDev(callback){
}
/**
 * iStdDevOnArray
 * Calculation of Standard Deviation indicator on data, stored in a numeric array
*/ 
function iStdDevOnArray(callback){}
/**
 * iStochastic
 * Stochastic Oscillator
*/ 
function iStochastic(callback){
    
}
/**
 * iWPR
 * Williams' Percent Range
 */
function iWPR(callback){
    talib.WILLR(values,lows,closes,lookback);
}


module.exports = {
    ENUM_MA_METHOD,
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
};