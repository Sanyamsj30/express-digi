import express from 'express'

const app = express();

const port = 8000;

app.use(express.json());

let teaData = [];
let nextId = 1;
//add tea
app.post("/teas",(req,res)=>{
    const{name,price} = req.body;
    const newTea = {
        id:nextId++,
        name,
        price,
    }
    teaData.push(newTea);
    res.status(201).send(newTea);
})
//get all tea
app.get("/teas",(req,res)=>{
    res.status(200).send(teaData);
})
//get a tea with id
app.get("/teas/:id",(req,res)=>{
    const tea = teaData.find(t=>t.id===parseInt(req.params.id));//to request anything from the url we use params keyword
    //anything that comes from url is in string format
    if(!tea){
        return res.status(404).send("Tea not found");
    }
    return res.status(200).send(tea)
    
})

app.put("/teas/:id",(req,res)=>{
    const tea = teaData.find(t=>t.id===parseInt(req.params.id));
    if(!tea){
        return res.status(404).send("Tea not found");
    }
    const {name,price} = req.body;
    tea.name=name;
    tea.price=price;
    return res.status(200).send(tea)
})

app.delete("/teas/:id",(req,res)=>{
    const index = teaData.findIndex(t=>t.id===parseInt(req.params.id));
    if(index===-1){
        return res.status(404).send("Tea not found");
    }
    teaData.splice(index,1);
    return res.status(200).send('deleted');
})

// app.get("/",(req,res)=>{
//     res.send("Hello from sanyam and his tea");
// })
// app.get("/ice-tea",(req,res)=>{
//     res.send("What type of ice tea would you prefer?");
// })

app.listen(port,()=>{
    console.log(`Server is listening on the port:${port}`);
})