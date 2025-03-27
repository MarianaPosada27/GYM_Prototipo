window.onload = capturarDatos();



function capturarDatos(){

    const url = 'http://localhost:3000/api/usuarios/'
    let terminos = document.getElementById('terminos');

    let botonRegistrarse = document.getElementById("botonRegistrarse"); 

    botonRegistrarse.addEventListener("click",function(){
        
        // Verifica campos vacios
        
        if(CamposVacios() == false){

            

                let Nombre =  document.getElementById("txtNombre").value;
                let Apellido = document.getElementById("txtApellido").value;
                let Nidentificacion = document.getElementById("txtNidentificacion").value;
                let CorreoElectronico = document.getElementById("txtCorreoElectronico").value;
                let TelefonoCelular = document.getElementById("txtTelefonoCelular").value;
                let TiploPlan = "";
                let ValorPlan =  0;
                let FechaInicio = "";
                let Contraseña = document.getElementById("txtContraseña").value;

            

            
            
            fetch(url, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json'
                        },
                body: JSON.stringify({

                    Nombres: Nombre.toUpperCase(),
                    Apellidos: Apellido.toUpperCase(),
                    Nidentificacion: Nidentificacion,
                    CorreoElectronico: CorreoElectronico.toUpperCase(),
                    TelefonoCelular: TelefonoCelular,
                    TipoPlan: TiploPlan,
                    ValorPlan: ValorPlan,
                    FechaInicio: FechaInicio,
                    Contraseña: Contraseña
                    
                })

            })
            .then(response => response.json())
            
            alertify.success("¡Alerta! Usuario registrado correctamente");
            
            
                    
        }else{

            alertify.error("¡Alerta! Se detectaron campos vacios o verifique terminos y condiciones");
            
                

        }

    });

};



function CamposVacios() {

    if(document.getElementById("txtNombre").value != "" && document.getElementById("txtApellido").value != "" &&
        document.getElementById("txtNidentificacion").value != "" &&
        document.getElementById("txtCorreoElectronico").value != "" &&
        document.getElementById("txtTelefonoCelular").value != "" &&
        document.getElementById("txtContraseña").value != "" && terminos.checked == true ){

            return false;

    }else{

        return true;
    }
}

