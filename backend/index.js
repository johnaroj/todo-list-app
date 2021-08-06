const express = require('express')
var cors = require('cors')
var app = express()
const port = 8080
const fetch   = require('node-fetch');

app.use(cors())
app.get('/todos', function (req, res) {
    var url = 'https://0je8g9zvze.execute-api.eu-west-1.amazonaws.com/test/todos';
    
    fetch(url)
    .then(res => res.json())
    .then(data => {
        res.send({ data });
    })
    .catch(err => {
        res.send(err);
    });
});

app.get('/todos/:id', function (req, res) {
    var url = 'https://0je8g9zvze.execute-api.eu-west-1.amazonaws.com/test/todos/'+ req.params.id;
    
    fetch(url)
    .then(res => res.json())
    .then(data => {
        res.send({ data });
    })
    .catch(err => {
        res.send(err);
    });
});

app.post('/todos', function (req, res) {
    console.log(req)
    var url = 'https://0je8g9zvze.execute-api.eu-west-1.amazonaws.com/test/todos';
    
    fetch(url,{
        method: 'POST',
        body:req.body
    })
    .then(res => res.json())
    .then(data => {
        res.send({ data });
    })
    .catch(err => {
        res.send(err);
    });
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})