import express from 'express'
import 'dotenv/config'
import { LoggerMiddleware } from './middlewares/logger.js'
import users from './users.json' with {type:"json"}

const app = express()

const PORT = process.env.PORT ?? 8000


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(LoggerMiddleware)



app.get('/',(req,res)=>{
    return res.send(`
        <h1>Hello word \n PORT:${PORT}</h1>
        `)

}
)

app.get('/users',(req,res)=>{
    return res.json(users)
})


app.post('/users',(req,res)=>{

    const {name,email} = req.body

    const newUser={
        id:crypto.randomUUID(),
        name,
        email
    }

    users.push(newUser)
    return res.status(201).json({message:"created"})

})
app.get('/get_user/:id',(req,res)=>{
    const {id} = req.params

    const user = users.find(user => user.id === id)

    if(!user){
        return res.status(404).json({message:"user not found"})
    }
    return res.json(user)
})

app.put('/users/:id',(req,res)=>{
    const {id} = req.params

    
    const user = users.find(user => user.id === id)
    
    if(!user){
        return res.status(404).json({"error":"user not found"})
    }
    
    const {name, email} = req.body
    user.name = name
    user.email = email
    return res.status(201).json(user)
})
app.patch('/users/:id',(req,res)=>{
    const {id} = req.params
    const update_fields = ["name", "email"] 

    const index = users.findIndex(user => user.id === id)

    if(index === -1){
        return res.status(404).json({Error:"User not find"})
    }

    const update_user = Object.keys(req.body)

    update_user.forEach(e=>{
        if(update_fields.includes(e)){

            users[index][e] = req.body[e]
        }
    })

    return res.status(201).json(users[index])

})
app.delete('/users/:id',(req,res)=>{
    const {id} = req.params

    const user = users.findIndex(user => user.id === id)

    if(user === -1){
        return res.status(404).json({Message:"User not found"})
    }
    users.splice(user,1)
    return res.status(204).json({message:"No content"})

})
app.post('/api/data',(req,res)=>{
    const data = req.body;
    if(!data){
        return res.status(404).json({error:"Not data"})
    }

    return res.status(201).json({
        message:"DATA",
        data
    })
})

app.get('/healt',(req,res)=>{
    return res.json({

        "time":process.uptime()
    })
})



app.listen(PORT,()=>{
    console.log(`Alive in http://localhost:${PORT}`)
})