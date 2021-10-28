import dbConnection from "../../utils/dbConnect";
dbConnection() ; 

export default async (req ,res)=>{
  res.send('hello mother focker')
}
