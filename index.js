const express = require('express')
const app = express()
const PORT = 3004;
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('postProject')
const bcrypt = require('bcrypt');
const saltRounds = 10;


app.use(bodyParser.json())

app.get('/allUsers', (req, res)=>{
    db.all("SELECT * FROM users", (err, data)=>{
        console.log(data);
        res.json(data)
    })
})

app.get('/allPosts', (req, res)=>{
    db.all("SELECT user_id, text, name FROM posts JOIN users ON users.id = posts.user_id", (err, data)=>{
        console.log(data);
        res.json(data)
    })
})

app.post('/checkUser', (req, res)=>{
    const {name, password} = req.body
    // console.log(name);
    
    db.get(`SELECT * FROM users WHERE name = '${name}'`, (err, data)=>{
        console.log(data);
        if (data && bcrypt.compareSync(password, data.password)) {
            return res.sendStatus(200)  
        }
    return res.sendStatus(401)
    })
})


app.post('/newUser', (req,res)=>{
    const {name, password} = req.body
    const hash = bcrypt.hashSync(password, saltRounds)
    db.run(`INSERT INTO users (name, password) VALUES ('${name}', '${hash}')`)
    db.get(`SELECT id,name FROM users WHERE name='${name}'`, (err,data)=>{
        res.json(data)
    })
})


app.delete('/deleteUser', (req,res)=>{
    const {id} = req.body
    db.run(`DELETE FROM users WHERE id = '${id}'`)
    res.sendStatus(200)
})

app.listen(PORT, ()=>{
    console.log(`http://localhost:${PORT}`);
})


