import React from 'react';

let avatars = {
    josue: 'https://avatars0.githubusercontent.com/u/8957173?s=460&v=4',
    damian: 'https://avatars1.githubusercontent.com/u/5724479?s=460&u=ac1cb8e67e18ebd3a92c1f0432e814f4b82f4f55&v=4',
    vladimir: 'https://avatars0.githubusercontent.com/u/24665258?s=460&u=823e5aea71fa80796a2da5a0aebd8fb7fa2818c5&v=4'
}

const Member = ({ id, name, className }) => (
    <div className={ `card bg-members border-0 rounded-lg ${ className }` }>
        <div className='card-img'>
            <img src={ avatars[id] } className='rounded-lg my-3' height='60px' />
        </div>
        <div className='card-body'>
            { name }
        </div>
    </div>
)

export default Member;