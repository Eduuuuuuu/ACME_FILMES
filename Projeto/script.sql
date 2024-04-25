create database db_acme_filmes_turma_bb_edu;

use db_acme_filmes_turma_bb_edu;

create table tbl_filme (
	id_filme int not null auto_increment primary key,
    nome varchar(80) not null,
    sinopse text not null,
    duracao time not null,
    data_lancamento date not null,
    data_relancamento date,
    foto_capa varchar(200) not null,
    valor_unitario float not null,
    id_classificacao int not null,
    constraint fk_classificacao_filme
    foreign key (id_classificacao) references tbl_classificacao(id_classificacao),

	unique key(id_filme),
    unique index(id_filme)
);

show tables;

#Permite visualizar a estrutura de uma tabela
desc tbl_filme;
describe tbl_filme;

insert into tbl_filme (
							nome,
                            sinopse,
                            duracao,
                            data_lancamento,
                            data_relancamento,
                            foto_capa,
                            valor_unitario
					  ) values(
							'Gente Grande',
                            'Em Gente Grande, Lenny (Adam Sandler), Kurt (Chris Rock), Eric (Kevin James), Marcus (David Spade) e Rob (Rob Schneider) se conhecem desde pequenos. Passados trinta anos, os cinco amigos se reencontram para curtir um fim de semana juntos com as respectivas famílias, mas o feriado de 4 de Julho em uma casa no lago promete muito mais diversão do que apenas lembranças dos bons momentos. Casados e com várias crianças, os homens de família terão de confrontar o fato de não serem mais tão jovens.',
							'01:42:00',
                            '2010-09-24',
                            null,
                            'https://br.web.img3.acsta.net/c_310_420/pictures/210/299/21029996_20130821205722213.jpg',
                            '55.00'
                      ),	 (
							'Gente Grande 2',
                            'Lenny (Adam Sandler), Eric (Kevin James), Kurt (Chris Rock) e Marcus (David Spade) voltam a morar na mesma cidade. Lá, suas vidas seguem o curso natural dos adultos, seja pela existência dos problemas com as esposas para uns, com os filhos para outros, ou tudo junto e misturado. A coisa dá uma complicada quando os marmanjos pretendiam matar a saudade num dia de folga e acabam encarando os jovens da região, que agora dominam o lugar. É quando eles acabam tendo que enfrentar alguns fantasmas do passado, entre eles a covardia diante de valentões e o famigerado bullyng na escola. Mas algumas surpresas estão para acontecer, como a chegada de um filho rebelde para Marcus domar, uma possível gravidez e uma festa de arromba, que não vai deixar pedra sobre pedra.',
                            '01:41:00',
                            '2013-08-16',
                            null,
                            'https://br.web.img3.acsta.net/c_310_420/pictures/210/049/21004903_20130510170049514.jpg',
                            '55.00'
					  );
                      
create table tbl_genero(
id_genero int not null auto_increment primary key,
nome varchar(45) not null
);

insert into tbl_genero(
	nome
) values (
	'Ação'
);

create table tbl_nacionalidade(
id_nacionalidade int not null auto_increment primary key,
nome varchar(45) not null
);

create table tbl_sexo(
id_sexo int not null auto_increment primary key,
sigla varchar(1) not null,
nome varchar(15) not null
);

create table tbl_classificacao(
id_classificacao int not null auto_increment primary key,
faixa_etaria varchar(2) not null,
classificacao varchar(45) not null,
caracteristica varchar(100) not null,
icone varchar(200) not null
);

create table tbl_ator(
id_ator int not null auto_increment primary key,
nome varchar(100) not null,
data_nascimento date not null,
biografia text,
foto varchar(200) not null,
id_sexo int not null,
constraint fk_sexo_ator
foreign key (id_sexo) references tbl_sexo(id_sexo)
);

create table tbl_diretor(
id_diretor int not null auto_increment primary key,
nome varchar(100) not null,
data_nascimento date not null,
biografia text,
foto varchar(200) not null,
id_sexo int not null,
constraint fk_sexo_diretor
foreign key (id_sexo) references tbl_sexo(id_sexo)
);

create table tbl_filme_genero(
id_filme_genero int not null auto_increment primary key,
id_filme int not null,
id_genero int not null,
constraint fk_filme_FilmeGenero
foreign key (id_filme) references tbl_filme(id_filme),
constraint fk_genero_FilmeGenero
foreign key (id_genero) references tbl_genero(id_genero)
);

create table tbl_filme_ator(
id_filme_ator int not null auto_increment primary key,
id_filme int not null,
id_ator int not null,
constraint fk_filme_FilmeAtor 
foreign key (id_filme) references tbl_filme(id_filme),
constraint fk_ator_FilmeAtor
foreign key (id_ator) references tbl_ator(id_ator) 
);

create table tbl_filme_diretor(
id_filme_diretor int not null auto_increment primary key,
id_filme int not null,
id_diretor int not null,
constraint fk_filme_FilmeDiretor
foreign key (id_filme) references tbl_filme(id_filme),
constraint fk_diretor_FilmeDiretor
foreign key (id_diretor) references tbl_diretor(id_diretor)
);

create table tbl_ator_nacionalidade(
id_ator_nacionalidade int not null auto_increment primary key,
id_ator int not null,
id_nacionalidade int not null,
constraint fk_ator_AtorNacionalidade
foreign key (id_ator) references tbl_ator(id_ator),
constraint fk_nacionalidade_AtorNacionalidade
foreign key (id_nacionalidade) references tbl_nacionalidade(id_nacionalidade) 
);

create table tbl_diretor_nacionalidade(
id_diretor_nacionalidade int not null auto_increment primary key,
id_diretor int not null,
id_nacionalidade int not null,
constraint fk_diretor_DiretorNacionalidade
foreign key (id_diretor) references tbl_diretor(id_diretor),
constraint fk_nacionalidade_DiretorNacionalidade
foreign key (id_nacionalidade) references tbl_nacionalidade(id_nacionalidade)
);
               
drop database db_acme_filmes_turma_bb_edu;
               
select * from tbl_filme;
select * from tbl_genero where id_genero = 1;

delete from tbl_filme where id = 20;
update tbl_filme set sinopse = 'mudou ai?' where id = 19;

select id from tbl_filme order by id desc limit 1;
select cast(last_insert_id() as decimal) as id from tbl_filme limit 1;

#Adiciona uma nova coluna em uma tabela
alter table tbl_filme
add column id_classificacao int not null;

#Exclui uma coluna de uma tabela
alter table tbl_filme
drop column sinopse;

#Modifica a estrutura de uma coluna
alter table tbl_filme
modify column sinopse varchar(100) not null;

#Permite renomear a coluna e alterar os tipos de dados (opcional)
alter table tbl_filme
change column sinopse sinopse_filme varchar(45);

#Permite apagar a CONSTRAINT de uma tabela
alter table tbl_filme_ator
drop foreign key fk_filme_FilmeAtor;


alter table tbl_filme
add constraint fk_classificacao_filme
foreign key (id_classificacao) references tbl_classificacao(id_classificacao);

#Script para visualizar o nome das CONSTRAINT
select * 
from information_schema.table_constraints
where constraint_schema = 'db_acme_filmes_turma_bb_edu';

#Renomeia o nome da tabela
rename table tbl_filme to tbl_filmes;