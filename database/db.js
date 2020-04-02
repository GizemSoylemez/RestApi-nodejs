const express =require('express');
const mysql = require('mysql');

exports.con =mysql.createConnection({
    host:"localhost",
    user:"root",
    port:"3308",
    password:"password",
    database:"restapi_example",
    debug:false
});


//kullanıcı req atıyor ve benim alanlarıma eşit olmak zorunda 
//sınırlama geitirirsek oynamayız
//objeye eşitliyorum
//1den fazla veriye bakmamız için obje yaratmamız lazım
//data isminde şema oluşturuyorum bunu kullanarak

exports.Data={
    id:null,
    name:null,
    surname:null,
    email:null,
    password:null,
    createDate:null,
    updateDate:null,
    deleteDate:null
}