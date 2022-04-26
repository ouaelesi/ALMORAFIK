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
        <div className="my-4">
            <div>Answered by: {props.data.creator}</div>
            <div className="bg-light p-3  rounded-3 border">{props.data.answer}</div>
            <button className="bg-light px-3 mt-2 rounded-3 border" onClick={editAnsw}>edit</button>
            <button className="bg-light px-3 mt-2 rounded-3 border"  onClick={supAnswer}>delete</button>
            <div>likes: {props.data.likes}</div>
            <hr/>
        </div>
    );
};

export default BoxAnswer;