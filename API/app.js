var express = require('express');
const { json } = require('express/lib/response');
var mysql = require('mysql');
var cors = require('cors');


// Se le asigna un puerto a la conexion
// y una funcion que nos indica que el servidor esta conectado.

var app = express();
app.use(express.json());
app.use(cors());

const puerto = process.env.PUERTO || 3000;

app.listen(puerto,function(){
	console.log("[**************************************************************]");
	console.log("[ LOG ]: Servidor Ok, en puerto: " + puerto);
})

//Se crea el objeto para establecer la conexion.

var conexion;

// Se establece la conexión con un manejo de reintentos y reconexión en caso de error fatal
function connectWithRetry() {
    conexion = mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'dbclientes'
    });

    conexion.connect(function (error) {
        if (error) {
            console.error("[ ERROR ]: No se pudo conectar a MySQL. Reintentando en 5 segundos...");
            setTimeout(connectWithRetry, 5000); // Reintenta después de 5 segundos
        } else {
            console.log("[ LOG ]: Conexión exitosa al servidor, API-Status: ONLINE");
            console.log("[ LOG ]: By: Sebastian Rivera Mira");
            console.log("[**************************************************************]");
        }
    });

    conexion.on('error', function (error) {
        if (error.code === 'PROTOCOL_CONNECTION_LOST' || error.fatal) {
            console.error("[ ERROR ]: Conexión perdida. Intentando reconectar...");
            connectWithRetry();
        } else {
            throw error;
        }
    });
}

connectWithRetry();
    
//Mostrar todos los clientes.

app.get('/api/clientes', (req,res) => {
    conexion.query('SELECT * FROM clientes',(error,filas) => {
        if(error){
            throw error;
        }else{
	console.log("[ LOG ]: Consulta GET  - Mostrar todos los clientes");
            res.send(filas);
        }
    })

});


//Mostrar un solo cliente, usando como parametro de busqueda el numero de identificacion.
app.get('/api/clientes/:Nidentificacion', (req,res) => {
    conexion.query('SELECT * FROM clientes WHERE Nidentificacion = ?', [req.params.Nidentificacion], (error,filas) => {
        if(error){
            throw error;
        }else{
	console.log("[ LOG ]: Consulta GET|ID  - Mostrar cliente con ID ingresado");
            res.send(filas);
        }
    })

});

//Recurso: Insertar un cliente.

app.post('/api/clientes', (req,res) => {
    let data = {Nombres:req.body.Nombres, Apellidos: req.body.Apellidos, Nidentificacion: req.body.Nidentificacion, CorreoElectronico: req.body.CorreoElectronico,
                TelefonoCelular: req.body.TelefonoCelular, TipoPlan: req.body.TipoPlan, ValorPlan: req.body.ValorPlan, FechaInicio: req.body.FechaInicio, Contraseña: req.body.Contraseña
                };
                
    let sql = "INSERT INTO clientes SET ?";
    conexion.query(sql, data,(error,resultado) => {
        if(error){
            throw error;
        }else{
	console.log("[ LOG ]: Consulta POST  - Cliente insertado correctamente");
            res.send(resultado);
	
        }
    })

});

//Recurso: Modificar un cliente con el numero de identificacion.
app.put('/api/clientes/:Nidentificacion', (req,res) => {

    let Nombres = req.body.Nombres;
    let Apellidos = req.body.Apellidos;
    let Nidentificacion = req.params.Nidentificacion;
    let CorreoElectronico = req.body.CorreoElectronico;
    let TelefonoCelular = req.body.TelefonoCelular;
    let TipoPlan = req.body.TipoPlan;
    let ValorPlan = req.body.ValorPlan;
    let FechaInicio = req.body.FechaInicio;
    let Contraseña = req.body.Contraseña;

    let sql = "UPDATE clientes SET Nombres = ?, Apellidos = ?, Nidentificacion = ?, CorreoElectronico = ?, TelefonoCelular = ?, TipoPlan = ?, ValorPlan = ?, FechaInicio = ?, Contraseña = ? WHERE Nidentificacion = ?";

    conexion.query(sql, [Nombres,Apellidos,Nidentificacion,CorreoElectronico,TelefonoCelular,TipoPlan,ValorPlan,FechaInicio, Contraseña, Nidentificacion ], (error,fila) => {
        if(error){
            throw error;
        }else{
	console.log("[ LOG ]: Consulta PUT  - Cliente actualizado correctamente");
            res.send(fila);
        }
    })

});


//Recurso: Eliminar cliente.
app.delete('/api/clientes/:id', function(req,res){

    conexion.query('DELETE  FROM clientes  WHERE id = ?', [req.params.id],(error,filas) => {
        if(error){
            throw error;
        }else{
	console.log("[ LOG ]: Consulta DELETE  - Cliente eliminado correctamente");
            res.send(filas);
        }
    });

});

app.post('/api/usuarios', (req,res) => {
    let data = {Nombres:req.body.Nombres, Apellidos: req.body.Apellidos, Nidentificacion: req.body.Nidentificacion, CorreoElectronico: req.body.CorreoElectronico,
                TelefonoCelular: req.body.TelefonoCelular, TipoPlan: req.body.TipoPlan, ValorPlan: req.body.ValorPlan, FechaInicio: req.body.FechaInicio, Contraseña: req.body.Contraseña
                };
                
    let sql = "INSERT INTO usuarios SET ?";
    conexion.query(sql, data,(error,resultado) => {
        if(error){
            throw error;
        }else{
	console.log("[ LOG ]: Consulta POST  - Usuario insertado correctamente");
            res.send(resultado);
        }
    })

});

app.get('/api/usuarios/:CorreoElectronico', (req,res) => {
    conexion.query('SELECT * FROM usuarios WHERE CorreoElectronico = ?', [req.params.CorreoElectronico], (error,filas) => {
        if(error){
            throw error;
        }else{
            res.send(filas);
        }
    })

});





