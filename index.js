const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { default: axios } = require('axios');

//#region  Configurações iniciais
const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//#endregion

app.get('/listar', (req, res) => {
    axios.get('http://localhost:3030/listar')
        .then(function (response) {
            res.status(200).send(response.data);
        })
        .catch(function (error) {
            res.status(500).send(error);
        })
});

app.post('/cadastrar', (req, res) => {
    try {

        axios.post('http://localhost:3030/cadastrar', req.body)
            .then(function (response) {
                res.status(201).send(response.data);
            })
            .catch(function (error) {
                res.status(500).send(error);
            })
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(3031, () => {
    console.log("Servidor rodando na porta 3031");
});