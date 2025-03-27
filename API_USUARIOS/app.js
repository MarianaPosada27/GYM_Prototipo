

var express = require('express');
const { json } = require('express/lib/response');
var mysql = require('mysql');
var cors = require('cors');


// Se le asigna un puerto a la conexion
// y una funcion que nos indica que el servidor esta conectado.

var app = express();
app.use(express.json());
app.use(cors());

const puerto = process.env.PUERTO || 4000;

app.listen(puerto,function(){
    console.log("Servidor Ok, en puerto: " + puerto);
})

//Se crea el objeto para establecer la conexion.


var conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'',
    database: 'dbusuarios'
});





// Se establece la conexion
conexion.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log("Conexion exitosa al servidor - Usuarios ");

    }
});





    
//Recurso: Mostrar todos los clientes.

app.get('/api/usuarios', (req,res) => {
    conexion.query('SELECT * FROM usuarios',(error,filas) => {
        if(error){
            throw error;
        }else{
            res.send(filas);
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







//Recurso: Insertar un cliente.

app.post('/api/usuarios', (req,res) => {
    let data = {Nombres:req.body.Nombres, Apellidos: req.body.Apellidos, Nidentificacion: req.body.Nidentificacion, CorreoElectronico: req.body.CorreoElectronico,
                TelefonoCelular: req.body.TelefonoCelular, TipoPlan: req.body.TipoPlan, ValorPlan: req.body.ValorPlan, FechaInicio: req.body.FechaInicio, Contraseña: req.body.Contraseña
                };
                
    let sql = "INSERT INTO usuarios SET ?";
    conexion.query(sql, data,(error,resultado) => {
        if(error){
            throw error;
        }else{
            res.send(resultado);
        }
    })

});

//Recurso: Modificar un cliente con el numero de identificacion.
app.put('/api/usuarios/:Nidentificacion', (req,res) => {

    let Nombres = req.body.Nombres;
    let Apellidos = req.body.Apellidos;
    let Nidentificacion = req.params.Nidentificacion;
    let CorreoElectronico = req.body.CorreoElectronico;
    let TelefonoCelular = req.body.TelefonoCelular;
    let TipoPlan = req.body.TipoPlan;
    let ValorPlan = req.body.ValorPlan;
    let FechaInicio = req.body.FechaInicio;
    let Contraseña =  req.body.Contraseña;


    let sql = "UPDATE usuarios SET Nombres = ?, Apellidos = ?, Nidentificacion = ?, CorreoElectronico = ?, TelefonoCelular = ?, TipoPlan = ?, ValorPlan = ?, FechaInicio = ?, Contraseña = ? WHERE Nidentificacion = ?";

    conexion.query(sql, [Nombres,Apellidos,Nidentificacion,CorreoElectronico,TelefonoCelular,TipoPlan,ValorPlan,FechaInicio,Contraseña], (error,fila) => {
        if(error){
            throw error;
        }else{
            res.send(fila);
        }
    })

});


//Recurso: Eliminar cliente.
app.delete('/api/usuarios/:CorreoElectronico', function(req,res){

    conexion.query('DELETE  FROM usuarios  WHERE CorreoElectronico = ?', [req.params.CorreoElectronico],(error,filas) => {
        if(error){
            throw error;
        }else{
            res.send(filas);
        }
    });

});



