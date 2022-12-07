
const client = require("./databasepg.js")
const express = require("express")
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.listen(3300, ()=>{
    console.log("SERVE IS LISTENING IN PORT 3300")
})

client.connect();



/* Buscar todos os users do bd */
app.get("/users", (req,res)=>{
    client.query('Select * from users', (err,result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

/* Buscar pelo ID */

app.get('/users/:id', (req, res)=>{
    client.query(`Select * from users where id=${req.params.id}`, (err, result)=>{
            if(!err){
                res.send(result.rows)
            }
    });
    client.end;
})

/* Criar user novo */

app.post('/users', (req, res)=> {
    const user = req.body;
    let insertQuery = `insert into users(id, firstname, lastname, location) 
                       values(${user.id}, '${user.firstname}', '${user.lastname}', '${user.location}')`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Insertion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})

/* Alterar users */

app.put('/users/:id', (req,res)=>{
    let user = req.body;
    let updateQuery = `update users
    set firstname = '${user.firstname}',
    lastname = '${user.lastname}',
    location = '${user.location}'
    where id = ${user.id}`

    client.query(updateQuery, (err, result)=>{
        if(!err){
            res.send(result.rows)
        }
        else{
            console.log(err.message)
        }
    })
    client.end;

})
/*Deletar um users */



app.delete('/users/:id', (req,res)=>{
    let insertQuery = `delete from users where id=${req.params.id}`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send("Deletion was successful")
        }
        else(console.log(err.message))
    })
    client.end;
})
