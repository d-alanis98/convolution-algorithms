import BasicConvolution from "./BasicConvolution";

export default class PeriodicConvolution extends BasicConvolution{
    constructor(firstFunction, secondFunction){
        super(firstFunction, secondFunction);
    }
    /**
     * @override
     */
    calculate = () => {
        let baseConvolutionResult = super.calculate();
        let periodicResultBlocks = baseConvolutionResult.getArrayBlocks(period);
        console.log(periodicResultBlocks)
        let periodicResult = sumArrays(periodicResultBlocks)
        console.log(periodicResult)
    }
}