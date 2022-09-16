"use strict"

/**
MathAbs
Returns absolute value (modulus) of the specified numeric value
*/ 
function MathAbs(value){
    return Math.abs(value);
}
/*
MathArccos
Returns the arc cosine of x in radians
*/ 
function MathArccos(value){
    return Math.acos(value);
}
/*
MathArcsin
Returns the arc sine of x in radians
*/ 
function MathArcsin(value){
    return Math.asin(value);
}
/*
MathArctan
Returns the arc tangent of x in radians
*/ 
function MathArctan(value){
    return Math.atan(value);
}
/*
MathCeil
Returns integer numeric value closest from above
*/ 
function MathCeil(value){
    return Math.ceil(value);
}
/*
MathCos
Returns the cosine of a number
*/ 
function MathCos(value){
    return Math.cos(value);
}
/*
MathExp
Returns exponent of a number
*/ 
function MathExp(value){
    return Math.exp(value);
}
/*
MathFloor
Returns integer numeric value closest from below
*/ 
function MathFloor(value){
    return Math.floor(value);
}
/*
MathLog
Returns natural logarithm
*/ 
function MathLog(value){
    return Math.log(value);
}
/*
MathLog10
Returns the logarithm of a number by base 10
*/ 
function MathLog10(value){
    return Math.log10(value);
}
/*
MathMax
Returns the maximal value of the two numeric values
*/ 
function MathMax(value){
    return Math.max(value);
}
/*
MathMin
Returns the minimal value of the two numeric values
*/ 
function MathMin(value){
    return Math.min(value);
}
/*
MathMod
Returns the real remainder after the division of two numbers
*/ 
function MathMod(dividend,divisor){
    return Number(dividend % divisor);
}
/*
MathPow
Raises the base to the specified power
*/ 
function MathPow(value,pow){
    return Math.pow(value,pow);
}
/*
MathRand
Returns a pseudorandom value within the range of 0 to 32767
*/ 
function MathRand(){
    return Math.floor(Math.random() * 32767);
}
/*
MathRound
Rounds of a value to the nearest integer
*/ 
function MathRound(value){
    return Math.round(value);
}
/*
MathSin
Returns the sine of a number
*/ 
function MathSin(value){
    return Math.sin(value);
}
/*
MathSqrt
Returns a square root
*/
function MathSqrt(value){
    return Math.sqrt(value);
}
/*
MathSrand
Sets the starting point for generating a series of pseudorandom integers
*/ 
function MathSrand(value){
    return Math.floor(Math.random() * value);
}
/*
MathTan
Returns the tangent of a number
*/ 
function MathTan(value){
    return Math.tan(value);
}
/*
MathIsValidNumber
Checks the correctness of a real number
 */
function MathIsValidNumber(value){
    return (value==0 ? true : (Number(value) > 0 ? true: false));
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