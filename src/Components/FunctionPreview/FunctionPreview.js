import React, { useContext, useEffect, useState } from 'react';
//Componentes
import Chart from '../Charts/Chart';
import Sequence from '../Sequence/Sequence';
import SubmitButton from '../Layout/SubmitButton';
//HOC
import withConvolution from '../../Context/Convolution/HOC/withConvolution';
import withContextConsumer from '../../Context/InputFunction/HOC/withContextConsumer';
//Clases
import BasicConvolution from '../../Classes/Convolution/BasicConvolution';
import SequencesCharts from './SequencesCharts';


const FunctionPreview = ({ functions, history, convolutionResult, setAlert, setFunctions, setConvolutionResult, showDefaultAlert }) => {
    const [convolutionAlgorithm, setConvolutionAlgorithm] = useState('basic')
    const [convolutionCalculated, setConvolutionCalculated] = useState(false);

    const clearFunctions = event => {
        setFunctions(null);
        showDefaultAlert(false);
        setAlert({
            type: 'warning',
            message: 'Se eliminaron las funciones introducidas, vuelva a ingresarlas'
        })
    }

    const handleSubmit = event => {
        //let convolutionAlgorithm = new ConvolutionFactory(type, functions.firstFunction, functions.secondFunction);
        let convolutionAlgorithm = new BasicConvolution(functions.firstFunction, functions.secondFunction)
        let convolutionResult = convolutionAlgorithm.calculate()
        setConvolutionResult(convolutionResult);
        setConvolutionCalculated(true);
    }

    const handleRedirect = event => {
        history.push('/result');
    }
    
    return(
        <div className='container text-center mt-3 py-3'>
            <h3>Preview de las secuencias:</h3>
            <Sequence
                label = 'Secuencia 1:'
                sequence = { functions.firstFunction }
            />
            <Sequence
                label = 'Secuencia 2:'
                sequence = { functions.secondFunction }
            />
            <button className='btn btn-danger btn-sm rounded-lg shadow' onClick = { clearFunctions }>
                Restablecer
            </button>
            <hr/>
            <h3>Gráficas</h3>
            <SequencesCharts
                firstSequence = { functions.firstFunction }
                secondSequence = { functions.secondFunction }
            />
            <SubmitButton
                onClick = { convolutionCalculated ? handleRedirect :  handleSubmit }
            >
                { convolutionCalculated ? 'Ver resultados' : 'Calcular' }
            </SubmitButton>
        </div>
    )
}

export default withContextConsumer(withConvolution(FunctionPreview));