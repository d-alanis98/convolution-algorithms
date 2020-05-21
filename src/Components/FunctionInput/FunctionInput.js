import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
//Componentes
import SubmitButton from '../Layout/SubmitButton';
import AditionalSettings from './Fields/AditionalSettings';
import FunctionInputField from './Fields/FunctionInputField';
//HOC
import withContextConsumer from '../../Context/InputFunction/HOC/withContextConsumer';
//Clases
import InputFunction from '../../Classes/InputFunction';

const FunctionInput = ({ history, alert, setAlert, setFunctions }) => {
    //Initial states
    const initialSequenceInput = {
        firstFunction: '',
        secondFunction: ''
    }
    const initialSequenceConstraints = {
        firstFunctionOrigin: 0,
        firstFunctionPeriodic: false,
        secondFunctionOrigin: 0,
        secondFunctionPeriodic: false
    }
    //Hooks
    const [sequenceInput, setSequenceInput] = useState(initialSequenceInput);
    const [inputFunctions, setInputFunctions] = useState();
    const [sequenceConstraints, setSequenceConstraints] = useState(initialSequenceConstraints);

    //Efectos
    useEffect(() => {
        !alert.type && setAlert({
            type: 'info',
            message: 'Si va a definir secuencias periódicas, solo escriba la parte correspondiente a un periodo que incluya al origen',
            duration: 15000
        })
    }, [])

    const saveFunctions = () => {
        let { firstFunctionAsArray, secondFunctionAsArray } = getInputFunctionAsArray()
        //Actualizamos el estado
        let { firstFunctionProperties, secondFunctionProperties } = getInputFunctionsProperties(firstFunctionAsArray, secondFunctionAsArray);
        let functions = {    
            firstFunction:  new InputFunction(firstFunctionProperties),
            secondFunction: new InputFunction(secondFunctionProperties)
        }
        setInputFunctions(functions);
        setFunctions(functions);
    }

    const getInputFunctionAsArray = () => {
        return{
            firstFunctionAsArray: InputFunction.getInputAsArray(sequenceInput.firstFunction),
            secondFunctionAsArray: InputFunction.getInputAsArray(sequenceInput.secondFunction)
        }
    }

    const getInputFunctionsProperties = (firstFunctionAsArray, secondFunctionAsArray) => {
        return{
            firstFunctionProperties: {
                sequence: firstFunctionAsArray,
                origin: sequenceConstraints.firstFunctionOrigin,
                periodic: sequenceConstraints.firstFunctionPeriodic
            },
            secondFunctionProperties: {
                sequence: secondFunctionAsArray,
                origin: sequenceConstraints.secondFunctionOrigin,
                periodic: sequenceConstraints.secondFunctionPeriodic
            }
        }
    }

    //HANDLERS 

    const handleInputFunctionChange = event => {
        let { name, value } = event.target;
        setSequenceInput({
            ...sequenceInput,
            [name]: value
        });
    }

    const handleConstraintsChange = event => {
        let { name, value, type } = event.target;
        value = (type === 'checkbox') ? (event.target.checked ? true : false) : parseInt(value);
        setSequenceConstraints({
            ...sequenceConstraints,
            [name]: value
        })
    }

    const handleSubmit = event => {
        event.preventDefault();
        if(!sequenceInput.firstFunction || !sequenceInput.secondFunction){
            alert('Se deben proporcionar ambas funciones');
            return;
        }
        saveFunctions();
    }

    const handleRedirect = event => {
        history.push('/preview');
    }


    return(
            <div className='container text-center text-main mt-3 py-4'>
                <h3>1. Introducir secuencias</h3>
                <FunctionInputField
                    name = 'firstFunction'
                    label = 'Secuencia1 [f(n)]: '
                    onChange = { handleInputFunctionChange }
                    placeholder = 'Introducir los numeros separados por comas'
                />
                <AditionalSettings
                    originFieldName = 'firstFunctionOrigin'
                    periodicFieldName = 'firstFunctionPeriodic'
                    onChange = { handleConstraintsChange }
                />
                <FunctionInputField
                    name = 'secondFunction'
                    label = 'Secuencia 2 [g(n)]: '
                    onChange = { handleInputFunctionChange }
                    placeholder = 'Introducir los numeros separados por comas'
                />
                <AditionalSettings
                    originFieldName = 'secondFunctionOrigin'
                    periodicFieldName = 'secondFunctionPeriodic'
                    onChange = { handleConstraintsChange }
                />
                <hr />
                <SubmitButton
                    onClick = { inputFunctions ? handleRedirect : handleSubmit }
                >
                    { inputFunctions ? 'Avanzar' : 'Guardar'  }
                </SubmitButton>
            </div>
    )
}

export default withContextConsumer(withRouter(FunctionInput));