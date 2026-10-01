const fs = require('node:fs/promises');
const path = require('node:path');
const express = require('express');
const port = 3000;

const app = express();

let cache = {};

const pathToFile = path.join(__dirname, 'db.json');


async function readData(){
    try{
        let data = await fs.readFile(pathToFile, {"encoding":"utf-8"});
        return JSON.parse(data);
    }catch(err){
        console.log(err);
    }
}

async function delayReadData(){
    await new Promise((resolve, reject)=>{
        setTimeout(resolve, 3000)
    })
    return await readData();
}
app.get('/products', async (req, res)=>{
    let key = req.url;
    let value = cache[key]
    try{
        if(value){
            return res.json(value)
        }
        let products = await delayReadData();
        cache[key] = products;
        res.json(products)
    }
    catch(err){
        console.log(err)
    }
})

app.get('/products/:id', async (req, res)=>{
    const id = Number(req.params.id);
    key = id;
    let value = cache[id];
    if (value){
        return res.json(value)
    }
    try{
        let products = await delayReadData();
        let data = products.find(item => item["id"] === id);
        if (!data){
            res.json({message: `There is no product with id ${id}`})
        }
        cache[key] = data;
        res.json(cache[key]);
    }catch(err){
        console.log(err);
    }
})


app.listen(port, ()=>{
    console.log("Server is running")
});


