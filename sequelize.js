//import do sequelize
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config(); // pega todas as configurações do .env

//criando a constante sequelize e passando as informações
const db = 
    new Sequelize(
        process.env.DB_NAME, 
        process.env.DB_USER, 
        process.env.DB_PASS, 
        {
            host: process.env.DB_HOST,
            dialect: 'mysql'
        });

module.exports = db;

