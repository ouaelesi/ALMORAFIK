import dbConnection from "../../../utils/dbConnect";
import {logIn} from '../../../controlers/users'

dbConnection()
export default async (req ,res) =>{
   const method = req.method ; 

   switch(method){
        case 'POST': 
              logIn(req ,res)
        break ;
   }
}