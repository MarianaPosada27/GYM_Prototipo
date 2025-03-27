




const url = 'http://localhost:3000/api/clientes/'
const contenedor = document.querySelector('tbody')
const contenedorResultados = document.querySelector(".contenedorResultados")
document.getElementById('TablaBusqueda').style.visibility = 'Hidden';
const horaActual = document.querySelector("#fechaSistema");


let resultados = '';
let resultadosBusqueda = '';

horaActual.innerHTML = new Date();


const modalCliente = new bootstrap.Modal(document.getElementById('modalCliente'));
const formCliente = document.querySelector('form');
const nombre = document.getElementById("nombre");
const apellido = document.getElementById('apellido');
const identificacion = document.getElementById('identificacion');
const correo = document.getElementById('correo');
const telefono = document.getElementById('telefono');
const plan = document.getElementById('plan');
const valor = document.getElementById('valor');
const fecha = document.getElementById('fecha');
const contraseña = document.getElementById('contraseñaCliente');
let opcion = '';


botonRefrescar.addEventListener('click', function(){
    location.reload();

})


botonReportes.addEventListener('click', function(){

    let opcionesVentana = "left=400,top=200,width=1200,height=500";
        window.open("Reportes.html", '_blank', opcionesVentana);
    

})


botonOpciones.addEventListener('click', function(){
    
    alertify.prompt(" 1. Cambiar valores de los planes", "Ingrese plan A,B o C",
  function(evt, value){
        
        opcion = value;
        if(opcion.toUpperCase() === 'A'){
                let planA;
                 planA = prompt('Ingrese el nuevo valor del plan A:');
                 localStorage.setItem('valorPlanA',JSON.stringify(planA));  

        }else if(opcion.toUpperCase() === 'B'){
                let planB;
                planB = prompt('Ingrese el nuevo valor del plan B:');
                localStorage.setItem('valorPlanB',JSON.stringify(planB));  

        }else if(opcion.toUpperCase() === 'C'){
                let planC;
                planC  = prompt('Ingrese el nuevo valor del plan C:');
                localStorage.setItem('valorPlanC',JSON.stringify(planC));  
        }else{
                alert('¡Alerta! Valor no valido, intente nuevamente');

        }

  },
  function(){
    alertify.error('Ajustes cancelados');
  })
  ;


})


botonBusqueda.addEventListener('click', function(){
    document.getElementById('TablaBusqueda').style.visibility = 'Visible';

    alertify.prompt("Ingrese el Numero de identificación:", "",
        function(evt, value ){

            if(value === ""){
                alertify.error('¡Alerta! # de identificacion no valido, verifique');
                document.getElementById('TablaBusqueda').style.visibility = 'Hidden';

            }else{

                alertify.success('Realizando busqueda...' + value);

                const mostrarBusqueda = (clientes) =>{
            
                    clientes.forEach(cliente => {
            
                        resultadosBusqueda += `
                            <tr>
                                <td>${cliente.id}</td>
                                <td>${cliente.Nombres}</td>
                                <td>${cliente.Apellidos}</td>
                                <td>${cliente.Nidentificacion}</td>
                                <td>${cliente.CorreoElectronico}</td>
                                <td>${cliente.TelefonoCelular}</td>
                                <td>${cliente.TipoPlan}</td>
                                <td>${cliente.ValorPlan}</td>
                                <td>${cliente.FechaInicio}</td>
                                <td class="text-center"> <a class ="btnEditar btn btn-primary">Editar</a> <a class ="btnBorrar btn btn-danger" >Borrar</a></td>
                            </tr>
                            `
                    });
            
                
                contenedorResultados.innerHTML = resultadosBusqueda;       
                
            }
            fetch(url+value, {
                method: 'GET'
            })
            .then( response => response.json())
            .then( data => mostrarBusqueda(data))
            .catch( error => alert(error)) 

            }
                    

  },
  function(){
    alertify.error('Busqueda cancelada');
    document.getElementById('TablaBusqueda').style.visibility = 'Hidden';
  });

});




botonCrear.addEventListener('click', ()=>{

    nombre.value = "";
    apellido.value = "";
    identificacion.value = "";
    correo.value = "";
    telefono.value = "";
    plan.value = "";
    valor.value = "";
    fecha.value = "";
    modalCliente.show();
    opcion = "crear";

});

const mostrar = (clientes) =>{

    clientes.forEach(cliente => {
        resultados += `
            <tr>
                <td>${cliente.id}</td>
                <td>${cliente.Nombres   }</td>
                <td>${cliente.Apellidos}</td>
                <td>${cliente.Nidentificacion}</td>
                <td>${cliente.CorreoElectronico}</td>
                <td>${cliente.TelefonoCelular}</td>
                <td>${cliente.TipoPlan}</td>
                <td>${cliente.ValorPlan}</td>
                <td>${cliente.FechaInicio}</td> 
                <td class="text-center"> <a class ="btnEditar btn btn-primary">Editar</a> <a class ="btnBorrar btn btn-danger" >Borrar</a></td>
                <td>${cliente.Contraseña}</td>
            </tr>

            `
    });

    
    contenedor.innerHTML = resultados;
                

}


//procedimiento mostrar
fetch(url)
    .then( response => response.json())
    .then( data => mostrar(data))
    .catch( error => console.log(error))


    const on = (element, event, selector, handler)=>{


        element.addEventListener(event, e => {
            if(e.target.closest(selector)){
                handler(e);
            }
        });

    }

    on(document, 'click', '.btnBorrar', e => {
        const fila = e.target.parentNode.parentNode;
        const id = fila.firstElementChild.innerHTML;
        alertify.confirm("¿Esta seguro de elimar el registro?",
            function(){
                fetch(url +id, {
                    method: 'DELETE'
                })
                .then( res => res.json())
                .then(()=> location.reload())
                alertify.success('Registro eliminado correctamente');
            },
            function(){
                alertify.error('Cancelado');
            });
    })


    let idenForm = 0;

    on(document, 'click', '.btnEditar', e =>{

        const fila = e.target.parentNode.parentNode;
        idenForm = fila.children[3].innerHTML;

        const nombresForm = fila.children[1].innerHTML;
        const apellidosForm = fila.children[2].innerHTML;
        const identificacionForm = fila.children[3].innerHTML;
        const correoForm = fila.children[4].innerHTML;
        const celularForm = fila.children[5].innerHTML;
        const tipoForm = fila.children[6].innerHTML;
        const valorForm = fila.children[7].innerHTML;
        const fechaForm = fila.children[8].innerHTML;
        const contraseñaForm = fila.children[10].innerHTML;


        nombre.value = nombresForm;
        apellido.value = apellidosForm;
        identificacion.value = identificacionForm;
        correo.value = correoForm;
        telefono.value = celularForm;
        plan.value = tipoForm;
        valor.value = valorForm;
        fecha.value = fechaForm;
        contraseña.value = contraseñaForm;
        opcion = 'editar';
        modalCliente.show();
    })


    formCliente.addEventListener('submit', (e)=>{
        e.preventDefault()

        

        if(opcion == 'crear'){

            fetch(url, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json'
                        },
                body: JSON.stringify({
                    Nombres: nombre.value.toUpperCase(),
                    Apellidos: apellido.value.toUpperCase(),
                    Nidentificacion: identificacion.value,
                    CorreoElectronico: correo.value.toUpperCase(),
                    TelefonoCelular: telefono.value,
                    TipoPlan: plan.value,
                    ValorPlan: valor.value,
                    FechaInicio: fecha.value,
                    Contraseña: contraseña.value
                })

            })
            .then(response => response.json())
            .then(data =>{
                const nuevoCliente = [];
                nuevoCliente.push(data)
                mostrar(nuevoCliente)
                location.reload();

            })

        }
        if(opcion == 'editar'){

            fetch(url+idenForm,{
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            Nombres: nombre.value,
                            Apellidos: apellido.value,
                            Nidentificacion: identificacion.value,
                            CorreoElectronico: correo.value,
                            TelefonoCelular: telefono.value,
                            TipoPlan: plan.value,
                            ValorPlan: valor.value,
                            FechaInicio: fecha.value,
                            Contraseña: contraseña.value
                        })


            })
            .then(response => response.json())
            .then(location.reload())

        }


    })



