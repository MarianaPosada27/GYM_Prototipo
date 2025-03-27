

const url = 'http://localhost:3000/api/usuarios/'
const urlDos = 'http://localhost:3000/api/clientes/'



document.getElementById('contenedorPagoTarjeta').style.visibility = "Hidden";

let contenedorDatos = document.querySelector('tbody');
const correoUsuario = JSON.parse(localStorage.getItem('correoUsuario'));
let fecha = new Date();
let idTransaccion = fecha.getTime();
let resultados = "";
let dia = fecha.getDate();
let mes = fecha.getMonth()+1;
let año = fecha.getFullYear();

let planElegido = JSON.parse(localStorage.getItem('tipoPlan'));
let valorPlan;



if(planElegido == "A"){
    valorPlan = 90000;
}else if(planElegido == "B"){
    valorPlan = 75000;
}else if(planElegido == "C"){
    valorPlan = 55000;
}else{

    valorPlan = 0;
}


let cliente;


const traerDatos = (Usuarios) =>{

    cliente = Usuarios;

    Usuarios.forEach(usuario => {

        resultados += `
                <tr>
                    <td>${dia+"/"+mes+"/"+año}</td>
                    <td>${idTransaccion + usuario.Nidentificacion} </td>
                    <td>${usuario.Nombres}</td>
                    <td>${usuario.Apellidos}</td>
                    <td>${usuario.Nidentificacion}</td>
                    <td><b>${planElegido}</b></td>
                    <td> <b>${valorPlan}</b></td>

                </tr>
                    `

                    contenedorDatos.innerHTML = resultados;

    })




}



fetch(url+correoUsuario,{
    method: 'GET'
    })
    .then( response => response.json())
    .then( data => traerDatos(data))
    .catch( error => alert(error)) 






    
    botonPagoTarjeta.addEventListener('click',function(){

        document.getElementById('contenedorPagoTarjeta').style.visibility = "Visible";
    })




    botonConfirmarPago.addEventListener('click',function(){

        let nombreTarjeta = document.getElementById('nombreTarjeta').value;
        let numeroTarjeta = document.getElementById('numeroTarjeta').value;
        let fechaVencimiento = document.getElementById('fechaVencimiento').value;
        let codigoSeguridad = document.getElementById('codigoSeguridad').value;
            
         let Nombres, Apellidos, Nidentificacion, CorreoElectronico, TelefonoCelular, Fecha, Contraseña;

        


         if(nombreTarjeta !== "" && numeroTarjeta !== "" && fechaVencimiento !== "" && codigoSeguridad !== ""){

            for(let i = 0; i < cliente.length; i++){

                Nombres = cliente[i].Nombres;
                Apellidos = cliente[i].Apellidos;
                Nidentificacion = cliente[i].Nidentificacion;
                CorreoElectronico = cliente[i].CorreoElectronico;
                TelefonoCelular = cliente[i].TelefonoCelular;
                Contraseña = cliente[i].Contraseña;
    
             }
    
             fetch(urlDos,{
                 method: 'POST',
                 headers: { 
                    'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            Nombres: Nombres,
                            Apellidos: Apellidos,
                            Nidentificacion: Nidentificacion,
                            CorreoElectronico: CorreoElectronico,
                            TelefonoCelular: TelefonoCelular,
                            TipoPlan: planElegido,
                            ValorPlan: valorPlan,
                            FechaInicio: fecha,
                            Contraseña: Contraseña
    
                        })
             })
             .then(response => response.json())
    
             alertify.alert('Confirmacion de pago', 'Pago confirmado', function(){ alertify.success('ID transaccion:'+(idTransaccion+Nidentificacion)); });
    
            
         }else{

            alertify.alert('Error', 'Debe ingresar toda la informacion de pago', function(){ alertify.error('Operacion cancelada'); });

         }

         

    })






   