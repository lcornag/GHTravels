create database GH_Travels character set Latin1 collate latin1_spanish_ci;
use GH_Travels;
create table usuarios(
	id integer auto_increment not null primary key,
    usuario varchar(20) not null,
    email varchar(30) not null,
    password varchar(40) not null,
	hash integer(80) null
);

