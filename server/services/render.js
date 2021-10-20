export const homeRender = (req ,res)=>{
    res.send('Home page') ; 
}

export const getQuestions = (req , res)=>{
    res.send('Questions page')
}

export const getQuestion = (req ,res )=>{
    res.send(`question details ${req.params.id}`)
}

export const LoginPageRender = (req ,res)=> {
    res.send("login page!!")
}

export const singInRender = (req ,res)=>{
    res.send('sign in page !!')
}

export const aboutUsRender = (req , res)=>{
    res.send('about us page!!')
}