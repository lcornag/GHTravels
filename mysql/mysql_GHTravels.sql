create database GH_Travels character set Latin1 collate latin1_spanish_ci;
use GH_Travels;
create table usuarios(
	id integer auto_increment not null primary key,
    usuario varchar(45) not null,
    email varchar(45) not null,
    password varchar(80) not null,
	hash varchar(80) null
);