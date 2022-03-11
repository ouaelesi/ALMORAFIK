import dbConnection from "../../../utils/dbConnect";
import {addUser, getUsers} from '../../../controlers/users'

dbConnection()
export default async (req ,res) =>{
   const method = req.method ; 

   switch(method){
        case 'GET':
            try{
               getUsers(req ,res)
            }catch(err){
               res.status(400).send('eroor')
            }
           break ; 
        case 'POST': 
              addUser(req ,res) ;
        break ;
   }
}