//-------------------------------------------------
//Inverse Fast Fourier Transform (Cooley-Tukey Method)
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

var fft = require('./FFT').fft;


module.exports = {
    ifft: function ifft(signal){
        // Intercambia partes reales e imaginarias
        var csignal=[];
        for(var i=0; i<signal.length; i++){
            csignal[i]=[signal[i][1], signal[i][0]];
        }
    
        // Aplicar fft
        var ps=fft(csignal);
        
        // Intercambia partes reales e imaginarias
        var res=[];
        for(var j=0; j<ps.length; j++){
            res[j]=[ps[j][1]/ps.length, ps[j][0]/ps.length];
        }
        return res;
    }
};