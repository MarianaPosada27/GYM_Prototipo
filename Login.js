
    const url = 'http://localhost:3000/api/usuarios/'
    let login = document.getElementById("botonLogin");
    login.addEventListener("click", funcionBotonLogin);
    let usuario;
    let contraseña;
    let Nidentificacion;




function funcionBotonLogin (){

    usuario = document.getElementById("campoUsuario").value.toUpperCase();
    contraseña = document.getElementById("campoContraseña").value;
    
    validarIngresoBase(traerDatos);


}

function validarIngresoBase(fn){

    
    fetch(url+usuario, {
        method: 'GET'
    })
    .then( response => response.json())
    .then( data => traerDatos(data))
    .catch( error => alert(error)) 

    fun();


}


function traerDatos(data){

    let id = "";
    let pwd = "";

    for(let i = 0; i < data.length; i++){
        id = data[i].CorreoElectronico;
        pwd = data[i].Contraseña;
       
}


    if(usuario != "" && contraseña != ""){
        if(id === usuario && contraseña === pwd){

                window.open("Users.html", "_self");
                localStorage.setItem('correoUsuario',JSON.stringify(id));
                
                
        }else if(usuario === "SRM" && contraseña === "sebas123"){

            window.open("Admins.html", "_self");
            
        }else{

            alert('¡Alerta! Usuario o contraseña incorrectos');
        }

    }else{
        alert('¡Alerta! Se dectectaron campos vacios');

    }

}




















