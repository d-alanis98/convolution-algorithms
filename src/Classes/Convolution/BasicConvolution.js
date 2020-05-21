//Prototypes
Array.prototype.addZerosToEnd = function(zeros){
    return this.concat(new Array(zeros + 1).fill(0));
}

Array.prototype.addZerosToStart = function(zeros){
    return (new Array(zeros).fill(0)).concat(this);
}

Array.prototype.getArrayBlocks = function(itemsPerBlock){
    let numberOfArrayBlocks = Math.ceil(this.length / itemsPerBlock);
    return Array.from(new Array(numberOfArrayBlocks)).map((array, index) => {
        let blockStartIndex = index * itemsPerBlock;
        let blockEndIndex = blockStartIndex + itemsPerBlock;
        return this.slice(blockStartIndex, blockEndIndex);
    });
}

export default class BasicConvolution{
    constructor(firstFunctionProperties, secondFunctionProperties){
        this.firstFunctionProperties = firstFunctionProperties;
        this.secondFunctionProperties = secondFunctionProperties;
        //Obtenemos directamente las funciones para poder operar sobre ellas con mayor facilidad
        this.firstFunction = firstFunctionProperties.function;
        this.secondFunction = secondFunctionProperties.function;
        //Secuencia de resultado
        this.resultSequence = [];
    }


    //Helpers
    getResultArrayLength = resultArray => resultArray[0].length;

    getLengthFixedArrays = arraysToFix => {
        let targetLength = this.getResultArrayLength(arraysToFix);
        return arraysToFix.map(array => array.addZerosToStart(targetLength - array.length))
    }

    //Algoritmo
    calculateResultSequenceOrigin = () => {
        return this.firstFunctionProperties.origin + this.secondFunctionProperties.origin;
    }

    isConvolutionResultPeriodic = () => {
        return this.firstFunctionProperties.periodic || this.secondFunctionProperties.periodic;
    }

    sumArrays = arraysToSum => {
        let resultArray = [];
        //Obtenemos el numero de posiciones a calcular (sumar), esto es la longitud del primer array aunque todos
        let resultArrayLength = this.getResultArrayLength(arraysToSum); //tienen la misma longitud en este punto pues ya fueron normalizados
        let numberOfArrays = arraysToSum.length; //EL numero de arreglos o 'filas' de la multiplicacion
        //Inicio del algoritmo
        for(let arrayPosition = 0; arrayPosition < resultArrayLength; arrayPosition++){
            let positionSum = 0;
            //Calculamos la suma de todos los elementos de los arrays de esa posicion especifica
            for(let arrayNumber = 0; arrayNumber < numberOfArrays; arrayNumber++)
                positionSum += arraysToSum[arrayNumber][arrayPosition]
            //La agregamos al array de resultados
            resultArray.push(positionSum)
        }
        return resultArray;
    }

    multiplicate = () => {
        let secondFunctionNumberOfItems = this.secondFunction.length;
        return this.secondFunction.map((secondFunctionItem, secondFunctionIndex) => {
            let parcialResultArray = this.firstFunction.map(firstFunctionItem => firstFunctionItem * secondFunctionItem)
            return parcialResultArray.addZerosToEnd(secondFunctionNumberOfItems - secondFunctionIndex - 2)
        })
    }



    calculate = () => {
        let partialResultArray = this.multiplicate();
        let lengthFixedResultArray = this.getLengthFixedArrays(partialResultArray);
        this.resultSequence = this.sumArrays(lengthFixedResultArray);

        return{
            sequence: this.resultSequence,
            origin: this.calculateResultSequenceOrigin(),
            periodic: this.isConvolutionResultPeriodic()
        }
    }
}