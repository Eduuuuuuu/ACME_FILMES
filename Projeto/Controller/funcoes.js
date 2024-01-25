var infoFilmes = require('../Modulo/filmes.js')

const getListarFilmes = () => {
    const filmes = infoFilmes.filmes.filmes

    let jsonFilmes = {}
    let arrayFilmes = []

    filmes.forEach((filme) => {

        let jsonFilmes = {

            nome: filme.nome,
            sinopse: filme.sinopse,
            duracao: filme.duracao,
            data_lancamento: filme.data_lancamento,
            data_relancamento: filme.data_relancamento,
            foto_capa: filme.foto_capa,
            valor_unitario: filme.valor_unitario

        }

        arrayFilmes.push(jsonFilmes)

    })

    jsonFilmes.filmes = arrayFilmes

    return jsonFilmes

}

const getDadosFilmes = () => {
    const filmes = infoFilmes.filmes.filmes

    let jsonFilmes = {}
    let arrayFilmes = []
    let filtro = 'id'

}

module.exports = {
    getListarFilmes
}