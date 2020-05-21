import React from 'react';
import { Switch, Route } from 'react-router-dom';
import FunctionInput from './Components/FunctionInput/FunctionInput';
import PresentationPage from './Components/PresentationPage/PresentationPage';
import FunctionPreview from './Components/FunctionPreview/FunctionPreview';
import ConvolutionResult from './Components/ConvolutionResult/ConvolutionResult';

const Routes = () => {
    return(
        <Switch>
            <Route 
                path = '/' 
                exact 
                strict
            >
                <PresentationPage />
            </Route>
            <Route
                path = '/start'
                exact
                strict
            >
                <FunctionInput />
            </Route>
            <Route
                path = '/preview'
                exact
                strict
            >
                <FunctionPreview />
            </Route>
            <Route
                path = '/result'
                exact
                strict
            >
                <ConvolutionResult />
            </Route>
        </Switch>
    )
}

export default Routes;