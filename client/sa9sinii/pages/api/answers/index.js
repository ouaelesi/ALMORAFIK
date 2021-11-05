import dbConnection from "../../../utils/dbConnect";
import {addAnswer} from '../../../controlers/answers' ; 

dbConnection() ; 

export default async (req ,res)=>{
    const method = req.method ; 

    switch(method){
        case 'GET':
            res.send('this is a get request from the answers')
            break ; 
        case 'POST':
            addAnswer(req ,res) ;
            
            break ;
    }
}
