const express = require('express');
const mysql = require('mysql')
const cors = require("cors");
const app = express();

require('dotenv').config({ path: '../.env'})

app.use(express.json())
app.use(cors())


let db;
try {
    db = mysql.createConnection({
        user: process.env.DB_USERNAME,
        host: process.env.DB_HOST,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    }) 
    app.listen(3001, console.log('The server working on port 3001'))
} catch (error) {
    console.log(error);
}

app.get('/', (req, res) => {
    return db.query('SELECT * FROM autocomplete_task', function(err, result, fields) {
         if(err) throw err;
         res.json({result: result})
     })
    
 })

 app.get('/get', (req, res) => {
    return db.query('SELECT * FROM autocomplete_task', function(err, result) {
         if(err) throw err;
         res.send({result})
     })
    
 })

 app.post('/insert', (req, res) => {
     const newItem = req.body.name;
     const newDetails = req.body.details;

     db.query(
         'INSERT INTO autocomplete_task (name, pk) VALUES (?,?)',
         [newItem,newDetails],
         (err, result) => {
             console.log(err);
         }
     )
 })
 
 app.delete('/delete/:name', (req, res) => {
     const name = req.params.name;
     const sqlDelete = 'DELETE FROM autocomplete_task WHERE name = ?';

     db.query(sqlDelete, name, (err, result) => {
         if(err) console.log(err);
     })
 })

 app.put('/update', (req, res) => {
     const name = req.body.name;
     const pk = req.body.details;

     const sqlUpdate = "UPDATE autocomplete_task SET pk = ? WHERE name = ?";

     db.query(sqlUpdate, [pk, name], (err, result) => {
         if(err) console.log(err);
     })
 })
