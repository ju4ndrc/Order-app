import express from 'express'
import 'dotenv/config'
import users from './users.json' with {type:"json"}

const app = express()

const PORT = process.env.PORT ?? 8000


app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use((req,res,next)=>{
    const timeString = new Date().toLocaleDateString()
    console.log(`[${timeString}] ${req.method} ${req.url}`)
    next()
})


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