const { v4: uuidv4 } = require('uuid');
const express = require('express');
const app = express();
const PORT = 3000;
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'desafionode'
};

const mysql = require('mysql');


app.get('/', (req, res) => {
    const connection = mysql.createConnection(config);

    const sql = `INSERT INTO people(name) values('${uuidv4()}')`
    connection.query(sql)

    connection.query('SELECT * FROM people', (error, result, fiels) => {
        if (error) throw error;
        res.send(`<h1>Full Cycle</h1><ul>${result.map(item => (`<li>${item.name}</li>`))}</ul>`)
    })
    connection.end()
});

app.listen(PORT, () => {
    console.log(`Ouvindo na porta: ${PORT}`);
});
