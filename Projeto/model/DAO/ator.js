/*******************************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo acesso ao Banco de dados MySQL, aqui faremos o CRUD na tabela de ator
 * Data: 25/04/2024
 * Autor: Eduardo Vilas Boas
 * Versão: 1.0.0
 *******************************************************************************************************************************************/

const {PrismaClient} = require('@prisma/client');


const prisma = new PrismaClient();

const selectAllAtores = async function(){
    let sql = 'select * from tbl_ator';

    let rsAtores = await prisma.$queryRawUnsafe(sql)

    if(rsAtores.length > 0)
        return rsAtores
    else
        return false
}

const selectByIdAtor = async function(id){
    try {
        
        let sql = `select * from tbl_ator where id_ator = ${id}`;
    
        let rsAtor = await prisma.$queryRawUnsafe(sql);

        return rsAtor;
    } catch (error) {
        return false;     
    }
}

const deleteAtor = async function (id) {
    try {

        let sql = `delete from tbl_ator where id_ator = ${id}`;

        let rsAtor = await prisma.$queryRawUnsafe(sql);

        return rsAtor
    } catch (error) {
        return false
    }
}

const selectByLastIdAtor = async function () {
    try {
        
        let sql ='select cast(last_insert_id() as decimal) as id_ator from tbl_ator limit 1';

        let rsAtor = await prisma.$queryRawUnsafe(sql)

        return rsAtor
    } catch (error) {
        return false
    }
}

const selectByNomeAtor = async function (nome) {
    try {

        let sql = `select * from tbl_ator where nome like "%${nome}%"`

        let rsAtor = await prisma.$queryRawUnsafe(sql)

        return rsAtor
    } catch (error) {
        return false
    }
}

const insertAtor = async function (dadosAtor){
    try {

        let sql;

        sql = `insert into tbl_ator (
                                                nome,
                                                data_nascimento,
                                                biografia,
                                                foto,
                                                id_sexo
        ) values (
                                                '${dadosAtor.nome}',
                                                '${dadosAtor.data_nascimento}',
                                                '${dadosAtor.biografia}',
                                                '${dadosAtor.foto}',
                                                '${dadosAtor.sexo[0].id}'
        )`;

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const updateAtor = async function (id, dadosAtor){
    try {

        let sql;

        sql = `update tbl_ator set
                                                nome = '${dadosAtor.nome}',
                                                data_nascimento = '${dadosAtor.data_nascimento}',
                                                biografia = '${dadosAtor.biografia}',
                                                foto = '${dadosAtor.foto}',
                                                id_sexo = '${dadosAtor.sexo[0].id}'
            where id_ator = ${id}`;

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

module.exports = {
    selectAllAtores,
    selectByIdAtor,
    selectByLastIdAtor,
    selectByNomeAtor,
    deleteAtor,
    updateAtor,
    insertAtor
}