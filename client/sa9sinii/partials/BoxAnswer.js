import router from 'next/router';
import React from 'react';

const BoxAnswer = (props) => {
    const supAnswer = async (e)=>{
        const res = await fetch(`http://localhost:3000/api/answers/${props.data._id}` , {
            method : 'DELETE'
        })
        router.push('/questions')
    }
    const editAnsw = async (e) =>{
        const input = document.getElementById('answerInput') ; 
        input.value = props.data.answer ; 
        
    }
    return (
        <div className="answerBox">
            <div>Answered by: {props.data.creator}</div>
            <div className="">{props.data.answer}</div>
            <button className="" onClick={editAnsw}>edit</button>
            <button onClick={supAnswer}>delete</button>
            <div>likes: {props.data.likes}</div>
        </div>
    );
};

export default BoxAnswer;