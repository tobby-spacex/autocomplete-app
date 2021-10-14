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
    app.listen(3001, console.log('The server working'))
} catch (error) {
    console.log(error);
}

app.get('/', (req, res) => {
    return db.query('SELECT * FROM autocomplete_task', function(err, result, fields) {
         if(err) throw err;
         res.json({result: result})
     })
    
 })
 
