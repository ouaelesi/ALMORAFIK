import dbConnection from "../../../utils/dbConnect";
import {findQuestion , addQuestion} from '../../../controlers/questions'

dbConnection()
export default async (req ,res) =>{
   const method = req.method ; 

   switch(method){
        case 'GET':
            try{
               // const questions = await questionModel.find({}) ; 
               // res.status(200).json({success : true , data : questions}) 
               findQuestion(req ,res)
            }catch(err){
               res.status(400).send('eroor')
            }
           break ; 
        case 'POST': 
             addQuestion(req ,res) ; 
        break ;
   }
}