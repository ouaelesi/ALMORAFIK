import dbConnection from "../../../../utils/dbConnect";
import {findQuestionsAnswers} from '../../../../controlers/questions'

dbConnection(); 

export default async(req ,res)=>{
    const method = req.method ; 

    switch(method){
        case 'GET':
            findQuestionsAnswers(req ,res)
            break ; 
    }
}