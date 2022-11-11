"use strict"

/**
 * MathAbs
 * Returns absolute value (modulus) of the specified numeric value
*/ 
function MathAbs(value){
    return { status: 'success', result: Math.abs(value), function: 'MathAbs' };
}
/**
 * MathArccos
 * Returns the arc cosine of x in radians
*/ 
function MathArccos(value){
    return { status: 'success', result: Math.acos(value), function: 'MathArccos' };
}
/**
 * MathArcsin
 * Returns the arc sine of x in radians
*/ 
function MathArcsin(value){
    return { status: 'success', result: Math.asin(value), function: 'MathArcsin' };
}
/**
 * MathArctan
 * Returns the arc tangent of x in radians
*/ 
function MathArctan(value){
    return { status: 'success', result: Math.atan(value), function: 'MathArctan' };
}
/**
 * MathCeil
 * Returns integer numeric value closest from above
*/ 
function MathCeil(value){
    return { status: 'success', result: Math.ceil(value), function: 'MathCeil' };
}
/**
 * MathCos
 * Returns the cosine of a number
*/ 
function MathCos(value){
    return { status: 'success', result: Math.cos(value), function: 'MathCos' };
}
/**
 * MathExp
 * Returns exponent of a number
*/ 
function MathExp(value){
    return { status: 'success', result: Math.exp(value), function: 'MathExp' };
}
/**
 * MathFloor
 * Returns integer numeric value closest from below
*/ 
function MathFloor(value){
    return { status: 'success', result: Math.floor(value), function: 'MathFloor' };
}
/**
 * MathLog
 * Returns natural logarithm
*/ 
function MathLog(value){
    return { status: 'success', result: Math.log(value), function: 'MathLog' };
}
/**
 * MathLog10
 * Returns the logarithm of a number by base 10
*/ 
function MathLog10(value){
    return { status: 'success', result: Math.log10(value), function: 'MathLog10' };
}
/**
 * MathMax
 * Returns the maximal value of the two numeric values
*/ 
function MathMax(value1, value2){
    var max = value1;
    if (value2 > max) {
        max = value2;
    }
    return { status: 'success', maximum: Number(max), function: 'MathMax' };
}
/**
 * MathMin
 * Returns the minimal value of the two numeric values
*/ 
function MathMin(value1, value2){
    var min = value1;
    if (value2 < min) {
        min = value2;
    }
    return { status: 'success', minimum: Number(min), function: 'MathMin' };
}
/**
 * MathMod
 * Returns the real remainder after the division of two numbers
*/ 
function MathMod(dividend,divisor){
    return { status: 'success', modulus: Number(dividend % divisor), function: 'MathMod' };
}
/**
 * MathPow
 * Raises the base to the specified power
*/ 
function MathPow(value,pow){
    return { status: 'success', result: Math.pow(value,pow), function: 'MathPow' };
}
/**
 * MathRand
 * Returns a pseudorandom value within the range of 0 to 32767
*/ 
function MathRand(){
    return { status: 'success', result: Math.floor(Math.random() * 32767), function: 'MathRand' };
}
/**
 * MathRound
 * Rounds of a value to the nearest integer
*/ 
function MathRound(value){
    return { status: 'success', result: Math.round(value), function: 'MathRound' };
}
/**
 * MathSin
 * Returns the sine of a number
*/ 
function MathSin(value){
    return { status: 'success', result: Math.sin(value), function: 'MathSin' };
}
/**
 * MathSqrt
 * Returns a square root
*/
function MathSqrt(value){
    return { status: 'success', result: Math.sqrt(value), function: 'MathSqrt' };
}
/**
 * MathSrand
 * Sets the starting point for generating a series of pseudorandom integers
*/ 
function MathSrand(value){
    return { status: 'success', result: Math.floor(Math.random() * value), function: 'MathSrand' };
}
/**
 * MathTan
 * Returns the tangent of a number
*/ 
function MathTan(value){
    return { status: 'success', result: Math.tan(value), function: 'MathTan' };
}
/**
 * MathIsValidNumber
 * Checks the correctness of a real number
 */
function MathIsValidNumber(value){
    return { status: 'success', valid: (value==0 ? true : (Number(value) > 0 ? true: false)), function: 'MathIsValidNumber' };
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