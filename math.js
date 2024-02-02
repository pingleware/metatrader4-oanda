"use strict"

/**
 * MathAbs
 * Returns absolute value (modulus) of the specified numeric value
*/ 
async function MathAbs(value){
    return new Promise((resolve,reject) => {
        try {
            resolve({ status: 'success', result: Math.abs(value), function: 'MathAbs' });
        } catch(error) {
            reject({status: 'error', message: error, function: 'MathAbs'});
        }
    })
}
/**
 * MathArccos
 * Returns the arc cosine of x in radians
*/ 
async function MathArccos(value){
    return new Promise((resolve,reject) => {
        try {
            resolve({ status: 'success', result: Math.acos(value), function: 'MathArccos' });
        } catch(error) {
            reject({status: 'error', message: error, function: 'MathArccos'});
        }
    })
}
/**
 * MathArcsin
 * Returns the arc sine of x in radians
*/ 
async function MathArcsin(value){
    return new Promise((resolve,reject) => {
        try {
            resolve({ status: 'success', result: Math.asin(value), function: 'MathArcsin' });
        } catch(error) {
            reject({status: 'error', message: error, function: 'MathArcsin'});
        }
    })
}
/**
 * MathArctan
 * Returns the arc tangent of x in radians
*/ 
async function MathArctan(value){
    return new Promise((resolve,reject) => {
        try {
            resolve({ status: 'success', result: Math.atan(value), function: 'MathArctan' });
        } catch(error) {
            reject({status: 'error', message: error, function: 'MathArctan'});
        }
    })
}
/**
 * MathCeil
 * Returns integer numeric value closest from above
*/ 
async function MathCeil(value){
    return new Promise((resolve,reject) => {
        try {
            resolve({ status: 'success', result: Math.ceil(value), function: 'MathCeil' });
        } catch(error) {
            reject({status: 'error', message: error, function: 'MathCeil'});
        }
    })
}
/**
 * MathCos
 * Returns the cosine of a number
*/ 
async function MathCos(value){
    return new Promise((resolve,reject) => {
        try {
            resolve({ status: 'success', result: Math.cos(value), function: 'MathCos' });
        } catch(error) {
            reject({status: 'error', message: error, function: 'MathCos'});
        }
    })
}
/**
 * MathExp
 * Returns exponent of a number
*/ 
async function MathExp(value){
    return new Promise((resolve,reject) => {
        try {
            resolve({ status: 'success', result: Math.exp(value), function: 'MathExp' });
        } catch(error) {
            reject({status: 'error', message: error, function: 'MathExp'});
        }
    })
}
/**
 * MathFloor
 * Returns integer numeric value closest from below
*/ 
async function MathFloor(value){
    return new Promise((resolve,reject) => {
        try {
            resolve({ status: 'success', result: Math.floor(value), function: 'MathFloor' });
        } catch(error) {
            reject({status: 'error', message: error, function: 'MathFloor'});
        }
    })
}
/**
 * MathLog
 * Returns natural logarithm
*/ 
async function MathLog(value){
    return new Promise((resolve,reject) => {
        try {
            resolve({ status: 'success', result: Math.log(value), function: 'MathLog' });
        } catch(error) {
            reject({status: 'error', message: error, function: 'MathLog'});
        }
    })
}
/**
 * MathLog10
 * Returns the logarithm of a number by base 10
*/ 
async function MathLog10(value){
    return new Promise((resolve,reject) => {
        try {
            resolve({ status: 'success', result: Math.log10(value), function: 'MathLog10' });
        } catch(error) {
            reject({status: 'error', message: error, function: 'MathLog10'});
        }
    })
}
/**
 * MathMax
 * Returns the maximal value of the two numeric values
*/ 
async function MathMax(value1, value2){
    return new Promise((resolve,reject) => {
        try {
            var max = value1;
            if (value2 > max) {
                max = value2;
            }
            resolve({ status: 'success', maximum: Number(max), function: 'MathMax' });        
        } catch(error) {
            reject({status: 'error', message: error, function: 'MathMax'});
        }
    })
}
/**
 * MathMin
 * Returns the minimal value of the two numeric values
*/ 
async function MathMin(value1, value2){
    return new Promise((resolve,reject) => {
        try {
            var min = value1;
            if (value2 < min) {
                min = value2;
            }
            resolve({ status: 'success', minimum: Number(min), function: 'MathMin' });        
        } catch(error) {
            reject({status: 'error', message: error, function: 'MathMin'});
        }
    })
}
/**
 * MathMod
 * Returns the real remainder after the division of two numbers
*/ 
async function MathMod(dividend,divisor){
    return new Promise((resolve,reject) => {
        try {
            resolve({ status: 'success', modulus: Number(dividend % divisor), function: 'MathMod' });
        } catch(error) {
            reject({status: 'error', message: error, function: 'MathMod'});
        }
    })
}
/**
 * MathPow
 * Raises the base to the specified power
*/ 
async function MathPow(value,pow){
    return new Promise((resolve,reject) => {
        try {
            resolve({ status: 'success', result: Math.pow(value,pow), function: 'MathPow' });
        } catch(error) {
            reject({status: 'error', message: error, function: 'MathPow'});
        }
    })
}
/**
 * MathRand
 * Returns a pseudorandom value within the range of 0 to 32767
*/ 
async function MathRand(){
    return new Promise((resolve,reject) => {
        try {
            resolve({ status: 'success', result: Math.floor(Math.random() * 32767), function: 'MathRand' });
        } catch(error) {
            reject({status: 'error', message: error, function: 'MathRand'});
        }
    })
}
/**
 * MathRound
 * Rounds of a value to the nearest integer
*/ 
async function MathRound(value){
    return new Promise((resolve,reject) => {
        try {
            resolve({ status: 'success', result: Math.round(value), function: 'MathRound' });
        } catch(error) {
            reject({status: 'error', message: error, function: 'MathRound'});
        }
    })
}
/**
 * MathSin
 * Returns the sine of a number
*/ 
async function MathSin(value){
    return new Promise((resolve,reject) => {
        try {
            resolve({ status: 'success', result: Math.sin(value), function: 'MathSin' });
        } catch(error) {
            reject({status: 'error', message: error, function: 'MathSin'});
        }
    })
}
/**
 * MathSqrt
 * Returns a square root
*/
async function MathSqrt(value){
    return new Promise((resolve,reject) => {
        try {
            resolve({ status: 'success', result: Math.sqrt(value), function: 'MathSqrt' });
        } catch(error) {
            reject({status: 'error', message: error, function: 'MathSqrt'});
        }
    })
}
/**
 * MathSrand
 * Sets the starting point for generating a series of pseudorandom integers
*/ 
async function MathSrand(value){
    return new Promise((resolve,reject) => {
        try {
            resolve({ status: 'success', result: Math.floor(Math.random() * value), function: 'MathSrand' });
        } catch(error) {
            reject({status: 'error', message: error, function: 'MathSrand'});
        }
    })
}
/**
 * MathTan
 * Returns the tangent of a number
*/ 
async function MathTan(value){
    return new Promise((resolve,reject) => {
        try {
            resolve({ status: 'success', result: Math.tan(value), function: 'MathTan' });
        } catch(error) {
            reject({status: 'error', message: error, function: 'MathTan'});
        }
    })
}
/**
 * MathIsValidNumber
 * Checks the correctness of a real number
 */
async function MathIsValidNumber(value){
    return new Promise((resolve,reject) => {
        try {
            resolve({ status: 'success', valid: (value==0 ? true : (Number(value) > 0 ? true: false)), function: 'MathIsValidNumber' });
        } catch(error) {
            reject({status: 'error', message: error, function: 'MathIsValidNumber'});
        }
    })
}

module.exports = {
    MathAbs,
    MathArccos,
    MathArcsin,
    MathArctan,
    MathCeil,
    MathCos,
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
};