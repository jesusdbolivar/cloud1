const mysql = require('mysql2');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'taller'
};

const connection = mysql.createConnection(dbConfig);

connection.connect((error) => {
  if (error) {
    console.error('Error de conexión a la base de datos:', error);
  } else {
    console.log('Conectado a la base de datos MySQL.');
  }
});

module.exports = connection;
