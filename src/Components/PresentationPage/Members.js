import React from 'react';
import Member from './Member';

const Members = () => (
    <div className='my-3 py-3'>
        <h5>Integrantes:</h5>
        <div className='d-flex flex-row justify-content-center w-100'>
            <Member
                id = 'damian'
                name = 'Damián Alanís Ramírez'
            />
            <Member
                id = 'josue'
                name = 'Josue David Ramírez'
                className = 'ml-3'
            />
            <Member
                id = 'vladimir'
                name = 'Vladimir Azpetía Hernández'
                className = 'ml-3'
            />
        </div>
    </div>
);

export default Members;