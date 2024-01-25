/*********************************************************************************************************
 * Objetivo: Nesta primeira etapa você foi convidado a criar uma API com apenas 02 Endpoints do tipo GET. 
 * Nome: Eduardo Vilas Boas
 * Data: 25/01/2024
 * Versão: 1.0.0
 *********************************************************************************************************/ 

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const funcoes = require('./Controller/funcoes.js')

const app = express()

app.use((request, response, next) => {

    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET')

    app.use(cors())

    next()

})

app.get('/v1/ACMEFilmes/filmes', cors(), async function(request, respose, next) {

    respose.json(funcoes.getListarFilmes())
    respose.status(200)

})

app.get('v1/ACMEFilmes/filme/1', cors(), async function(request, response, next) {
    
    response.json(funcoes.getListarFilmes())
    response.status(200)
})

app.listen('8080', function() {
    console.log('API funcionando!!')
})