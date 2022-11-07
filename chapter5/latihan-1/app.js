const express = require('express');
const fs = require('fs').promises;
const app = express();

app.use(express.json());

const users = {
    create: async (req,res) => {
        try {
            const {name, email, password,is_active} = req.body;
    
            if (!name || !email || !password || is_active==null) {
                return res.status(400).json({
                    message:"invalid input",
                    data:{}
                })
            }
            const dataUnparsed = await fs.readFile('./data.json','utf-8');
            const data = JSON.parse(dataUnparsed)
            const isExist = data.users.filter((e) => {
                return (e.name == name || e.email == email)
            })
            console.log(isExist)
            if (isExist.lenght) {
                return res.status(400).json({
                    message:"data already exist",
                    data
                })
            }
            let id = !data.users.length ? 0:data.users[data.users.length-1].id + 1;
            data.users.push({
                id,
                ...req.body
            })
            await fs.writeFile('./data.json',JSON.stringify(data))
            res.status(201).json({
                data
            })
        } catch (err) {
            res.status(500).json({
                data:err
            })
        }
    },
    read: async (req,res) => {
        try {
            const dataUnparsed = await fs.readFile('./data.json','utf-8');
            const data = JSON.parse(dataUnparsed)
            res.status(200).json(data.users)
        } catch (err) {
            res.status(500).json({
                data:err
            })
        }
    },
    readById: async (req,res) => {
        try {
            const dataUnparsed = await fs.readFile('./data.json','utf-8');
            const {id} = req.params
            const data = JSON.parse(dataUnparsed)
            const dataSought = data.users.filter(e => e.id == id)
            // console.log(req.param)
            res.status(200).json(dataSought)
        } catch (err) {
            res.status(500).json({
                data:err
            })
        }
    },
    update: async (req,res) => {
        try {
            const dataUnparsed = await fs.readFile('./data.json','utf-8');
            const {name,email,password,is_active} = req.body;
            const {id} = req.params
            const data = JSON.parse(dataUnparsed)
    
            if (!name || !email || !password || is_active==null) {
                return res.status(200).json({
                    message:"no data updated",
                    data
                })
            }
            const index = data.users.findIndex(e => e.id == id)
            if (name) {
                data.users[index].name = name
            }
            if (email) {
                data.users[index].email = email
            }
            if (password) {
                data.users[index].password = password
            }
            if (is_active) {
                data.users[index].is_active = is_active
            }
            await fs.writeFile('./data.json',JSON.stringify(data))
            return res.status(201).json({
                data
            })
        } catch (err) {
            res.status(500).json({
                data:err
            })
        }
    },
    delete: async (req,res) => {
        try {
            const dataUnparsed = await fs.readFile('./data.json','utf-8');
            const {id} = req.params
            const data = JSON.parse(dataUnparsed)
            const dataSought = data.users.filter(e => e.id == id)
            if (!dataSought) {
                return res.status(401).json({
                    message:"data not found",
                    data:{}
                })
            }
            const index = data.users.findIndex(e => e.id == id);
            data.users.splice(index,1)
            await fs.writeFile('./data.json',JSON.stringify(data))
            return res.status(200).json({
                data
            })
        } catch (err) {
            
        }
    }
}

app.post("/api/user", users.create);
app.get("/api/user",users.read)
app.get("/api/user/:id",users.readById)
app.put("/api/user/:id",users.update)
app.delete("/api/user/:id",users.delete)

app.listen(3000, () => {
    console.log("Server running at http://127.0.0.1:3000")
  })