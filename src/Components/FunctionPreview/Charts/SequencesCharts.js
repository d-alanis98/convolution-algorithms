import React from 'react';
//Componentes
import Chart from '../../Charts/Chart';
import Sequence from '../../Sequence/Sequence';

const SequencesCharts = ({ firstSequence, secondSequence, sequenceProperty }) => {
    const DEFAULT_PROPERTY = 'function';
    return(
        <div className='row text-center mx-0'>
            <div className='col-xl-6 col-lg-12'>
                <Sequence
                    label = 'Secuencia 1:'
                    sequence = { firstSequence }
                />
                <Chart 
                    id = 'first_sequence_chart'
                    label = 'Secuencia 1'
                    color = '255, 0, 255'
                    sequence = { firstSequence[sequenceProperty || DEFAULT_PROPERTY] }
                    origin = { firstSequence.origin }
                />
            </div>
            <div className='col-xl-6 col-lg-12'>
                <Sequence
                    label = 'Secuencia 2:'
                    sequence = { secondSequence }
                />
                <Chart 
                    id = 'second_sequence_chart'
                    label = 'Secuencia 2'
                    color = '255, 255, 0'
                    sequence = { secondSequence[sequenceProperty || DEFAULT_PROPERTY] }
                    origin = { secondSequence.origin }
                />
            </div>
        </div>
    )
}

export default SequencesCharts;