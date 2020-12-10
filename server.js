/* Variables estandar */
var express = require('express');
var bodyparser = require('body-parser');
/* Implementando la bd de Oracle */
var oracledb = require('oracledb');

var app = express();

/* Configuración estandar */
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

/* Creamos nuestra conexión a nuestra BD */
var connAttrs = {
    "user": "system",
    "password": "admin",
    "connectString": "(DESCRIPTION =(LOAD_BALANCE = ON)(FAILOVER = ON)(ADDRESS =(PROTOCOL = TCP)(HOST = localhost)(PORT = 1521))(ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=XE)(FAILOVER_MODE=(TYPE=SELECT)(METHOD = BASIC))))"
}


/* Routing RESTFUL */
app.get('/', (req, res) => {
    res.send([{ message: "Listo" }]);
})

/* Acceso a la base de datos (Metodos) */
/////Consulter users////// done
app.get('/maestros', function(req, res) {
    "use strict";

    oracledb.getConnection(connAttrs, function(err, connection) {
        if (err) {
            // Error connecting to DB
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error connecting to DB",
                detailed_message: err.message
            }));
            return;
        }
        connection.execute("SELECT * FROM salario", {}, {
            outFormat: oracledb.OBJECT // Return the result as Object
        }, function(err, result) {
            if (err) {
                res.set('Content-Type', 'application/json');
                res.status(500).send(JSON.stringify({
                    status: 500,
                    message: "Error getting the dba_tablespaces",
                    detailed_message: err.message
                }));
            } else {
                res.header('Access-Control-Allow-Origin', '*');
                res.header('Access-Control-Allow-Headers', 'Content-Type');
                res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
                res.contentType('application/json').status(200);
                res.send(JSON.stringify(result.rows));

            }
            // Release the connection
            connection.release(
                function(err) {
                    if (err) {
                        console.error(err.message);
                    } else {
                        console.log("GET /sendTablespace : Connection released");
                    }
                });
        });
    });
});


/* Prender puerto */
app.listen(3000, (err, res) => {
    if (err) {
        console.log('Error al levantar servidor')
        return;
    }
    console.log('Servidor escuchando en el puerto 3000')
})
