import router from 'next/router';
import React from 'react';

const BoxAnswer = (props) => {
    const supAnswer = async (e)=>{
        const res = await fetch(`http://localhost:3000/api/answers/${props.data._id}` , {
            method : 'DELETE'
        })
        router.push('/questions')
    }
    return (
        <div>
            <div>{props.data.answer}</div>
            <button>edit</button>
            <button onClick={supAnswer}>delete</button>
        </div>
    );
};

export default BoxAnswer;