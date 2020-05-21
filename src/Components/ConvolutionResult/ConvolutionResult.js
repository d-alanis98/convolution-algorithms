import React from 'react';
//HOC
import withConvolution from '../../Context/Convolution/HOC/withConvolution';
import Sequence from '../Sequence/Sequence';

const ConvolutionResult = ({ convolutionResult }) => {
    return(
        <div className='container text-center'>
            <h2>Resultados</h2>
            <Sequence 
                label = 'Secuencia de resultado:'
                sequence = { convolutionResult }
                sequenceProperty = 'sequence'
            />
        </div>
    )
}

export default withConvolution(ConvolutionResult);

