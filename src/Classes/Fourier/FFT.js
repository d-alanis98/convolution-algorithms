//-------------------------------------------------
//Fast Fourier Transform (Cooley-Tukey Method)
//-------------------------------------------------

//-------------------------------------------------
//El siguiente código no esta optimizado
//Se obtiene mejores resultados en C o 
//en enesamblador
//-------------------------------------------------

//-------------------------------------------------
//El siguiente código supone que un número complejo
//es una matriz [real, imaginario]
//-------------------------------------------------


var complex = require('./Complex'),
    fftUtil = require('./FFTUtil'),
    twiddle = require('bit-twiddle');

module.exports = {
  //-------------------------------------------------
  // Calcular FFT para el vector donde vector.length
  // se asume que es una potencia de 2.
  //-------------------------------------------------
  fft: function fft(vector) {
    var X = [],
        N = vector.length;

    // El caso base es X = x + 0i ya que se supone que nuestra entrada es solo real.
    if (N == 1) {
      if (Array.isArray(vector[0])) // Si el vector de entrada contiene números complejos
        return [[vector[0][0], vector[0][1]]];      
      else
        return [[vector[0], 0]];
    }

    // Recurse: todas las muestras pares
    var X_evens = fft(vector.filter(even)),

        // Recurse: todas las muestras impares
        X_odds  = fft(vector.filter(odd));

    // ¡Ahora, realiza N / 2 operaciones!
    for (var k = 0; k < N / 2; k++) {
      // t es un número complejo!
      var t = X_evens[k],
          e = complex.multiply(fftUtil.exponent(k, N), X_odds[k]);

      X[k] = complex.add(t, e);
      X[k + (N / 2)] = complex.subtract(t, e);
    }

    function even(__, ix) {
      return ix % 2 == 0;
    }

    function odd(__, ix) {
      return ix % 2 == 1;
    }

    return X;
  },
// -------------------------------------------------
// Calcular FFT para el vector donde se supone que 
//vector.length es una potencia de 2. Esta es la 
//implementación in situ, para evitar la huella de 
//memoria utilizada por la recursividad.
// -------------------------------------------------
  fftInPlace: function(vector) {
    var N = vector.length;

    var trailingZeros = twiddle.countTrailingZeros(N); // Una vez invertido, esto será ceros a la izquierda

    // Reverse bits
    for (var k = 0; k < N; k++) {
      var p = twiddle.reverse(k) >>> (twiddle.INT_BITS - trailingZeros);
      if (p > k) {
        var complexTemp = [vector[k], 0];
        vector[k] = vector[p];
        vector[p] = complexTemp;
      } else {
        vector[p] = [vector[p], 0];
      }
    }

    // Haz el DIT ahora in-place
    for (var len = 2; len <= N; len += len) {
      for (var i = 0; i < len / 2; i++) {
        var w = fftUtil.exponent(i, len);
        for (var j = 0; j < N / len; j++) {
          var t = complex.multiply(w, vector[j * len + i + len / 2]);
          vector[j * len + i + len / 2] = complex.subtract(vector[j * len + i], t);
          vector[j * len + i] = complex.add(vector[j * len + i], t);
        }
      }
    }
  }
};