/*******************************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo acesso ao Banco de dados MySQL, aqui faremos o CRUD na tabela de Diretor
 * Data: 01/05/2024
 * Autor: Eduardo Vilas Boas
 * Versão: 1.0.0
 *******************************************************************************************************************************************/

const {PrismaClient} = require('@prisma/client');


const prisma = new PrismaClient();

const selectAllDiretores = async function() {
    let sql = 'select * from tbl_diretor'; 

    let rsDiretores = await prisma.$queryRawUnsafe(sql)

    if(rsDiretores.length > 0 )
        return rsDiretores
    else
        return false
}

const deleteDiretor = async function(id) {
    try {

        let sql = `delete from tbl_diretor where id_diretor = ${id}`

        let rsDiretor = await prisma.$queryRawUnsafe(sql);

        return rsDiretor
    } catch (error) {
        return false
    }
}

const selectByIdDiretor = async function(id) {
    try {

        let sql = `select * from tbl_diretor where id_diretor = ${id}`;

        let rsDiretor = await prisma.$queryRawUnsafe(sql);

        return rsDiretor;
    } catch (error) {
        return false;
    }
}

const insertDiretor = async function(dadosDiretor) {
    try {

        let sql;
            
        sql = `insert into tbl_diretor (
                                                    nome,
                                                    data_nascimento,
                                                    biografia,
                                                    foto,
                                                    id_sexo
        ) values (
                                                    '${dadosDiretor.nome}',
                                                    '${dadosDiretor.data_nascimento}',
                                                    '${dadosDiretor.biografia}',
                                                    '${dadosDiretor.foto}',
                                                    '${dadosDiretor.sexo[0].id}'
        )`;

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return result
        else
            return false

    } catch (error) {
        return error
    }
}

const updateDiretor = async function(id, dadosDiretor) {
    try {
        
        let sql;

        sql = `update tbl_diretor set 
                                                    nome = '${dadosDiretor.nome}',
                                                    data_nascimento = '${dadosDiretor.data_nascimento}',
                                                    biografia = '${dadosDiretor.biografia}',
                                                    foto = '${dadosDiretor.foto}',
                                                    id_sexo = '${dadosDiretor.sexo[0].id}' 
            where id_diretor = ${id}`;
        
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else 
            return false

    } catch (error) {
        return false
    }
}

const selectByNomeDiretor = async function(nome) {
    try {

        let sql = `select * from tbl_diretor where nome like "%${nome}%"`;

        let rsDiretor = await prisma.$queryRawUnsafe(sql)

        return rsDiretor
    } catch (error) {
        return false
    }
}

const selectByLastIdDiretor = async function() {
    try {
        
        let sql ='select cast(last_insert_id() as decimal) as id_diretor from tbl_diretor limit 1';

        let rsDiretor = await prisma.$queryRawUnsafe(sql)

        return rsDiretor
    } catch (error) {
        return false
    }
}

module.exports = {
    selectAllDiretores,
    selectByIdDiretor,
    selectByLastIdDiretor,
    selectByNomeDiretor,
    deleteDiretor,
    updateDiretor,
    insertDiretor
}