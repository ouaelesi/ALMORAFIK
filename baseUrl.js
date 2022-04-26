const production = "https://sa-9-sini-website.vercel.app" 
const development = "http://localhost:3000" 
const baseURL =  process.env.NODE_ENV ? production : development ; 

export default baseURL ; 