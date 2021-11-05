import dbConnection from "../../../../utils/dbConnect";
import {deleteAnswer} from '../../../../controlers/answers' ; 

dbConnection() ; 

export default async (req ,res)=>{
    const method = req.method ; 

    switch(method){
        case 'DELETE':
            deleteAnswer(req ,res)
            break ; ;
    }
}
