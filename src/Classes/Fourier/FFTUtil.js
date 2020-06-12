//-------------------------------------------------
//Pasos Transformada Rápida de Fourier
//Frecuencia/Magnitud
//-------------------------------------------------

//-------------------------------------------------
//El siguiente código supone que un número complejo
//es una matriz [real, imaginario]
//-------------------------------------------------

var complex = require('./Complex');

//-------------------------------------------------
//Por Euler
//
// e^(i*x) = cos(x) + i*sin(x)
//
// y en la Transformada de Fourier Discreta
// x = -2*PI*(k/N)
//-------------------------------------------------


var mapExponent = {},
    exponent = function (k, N) {
      var x = -2 * Math.PI * (k / N);

      mapExponent[N] = mapExponent[N] || {};
      mapExponent[N][k] = mapExponent[N][k] || [Math.cos(x), Math.sin(x)];// [Real, Imaginary]

      return mapExponent[N][k];
};

//-------------------------------------------------
// Calculando la amgnitud FFT para numeros complejos
//-------------------------------------------------

var fftMag = function (fftBins) {
    var ret = fftBins.map(complex.magnitude);
    return ret.slice(0, ret.length / 2);
};

// -------------------------------------------------
// Calcular intervalos de frecuencia
//
// Devuelve una matriz de las frecuencias (en hertzios)
// de cada contenedor FFT proporcionado, suponiendo 
// que la frecuencia de muestreo son muestras tomadas 
//por segundo. (sampleRate)
// -------------------------------------------------

var fftFreq = function (fftBins, sampleRate) {
    var stepFreq = sampleRate / (fftBins.length);
    var ret = fftBins.slice(0, fftBins.length / 2);

    return ret.map(function (__, ix) {
        return ix * stepFreq;
    });
};

//-------------------------------------------------
// Exports
//-------------------------------------------------
module.exports = {
    fftMag: fftMag,
    fftFreq: fftFreq,
    exponent: exponent
};