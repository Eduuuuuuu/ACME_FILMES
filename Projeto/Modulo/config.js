/***************************************************************************************** 
 * Objetivo: Arquivo responsável pela organização de variáveis globais utilizadas no projeto
 * Data: 22/02/2024
 * Autor: Eduardo Vilas Boas
 * Versão: 1.0.0
******************************************************************************************/

/******************** MENSAGEM DE ERRO ********************/

const ERROR_INVALID_ID         =  {status: false, status_code: 400, message: 'O ID encaminhado na requisição não é válido !!'}
const ERROR_REQUIRED_FIELDS    =  {status: false, status_code: 400, message: 'O parâmetro encaminhado na requisição não é valido !!'}
const ERROR_NOT_FOUND          =  {status: false, status_code: 404, message: 'Não foram encontrados itens na requisição !!'}
const ERROR_INTERNAL_SERVER_DB =  {status: false, status_code: 500, message: 'Não foi possível processar a requisição devido a um problema na comunicação com Banco de Dados. Contate o Administrador da API !!'}

module.exports = {
    ERROR_INVALID_ID,
    ERROR_NOT_FOUND,
    ERROR_INTERNAL_SERVER_DB,
    ERROR_REQUIRED_FIELDS
}