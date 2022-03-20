import Cookies from 'js-cookie';
import {createContext , useReducer} from 'react' ; 

export const Store = createContext() ;

const initialState = {
    myVar : Number(Cookies.get('myCookies')) || 0 , 
}

function reducer(state ,action ){
    switch (action.type){
        case 'increment' : 
        return {...state , myVar : state.myVar+1}
        case 'decrement' : 
        return {...state , myVar : state.myVar-1}
    }
}

export function StroeProvider(props){
    const [state , dispatch] = useReducer(reducer , initialState) ; 
    const value = {state , dispatch} ; 
    return <Store.Provider value ={value} >{props.children}</Store.Provider>
}