const url = 'http://localhost:3000/api/clientes/';

let contenedorA = document.querySelector('.contenedorValorA');
let contenedorB = document.querySelector('#contenedorValorB');
let contenedorC = document.querySelector('.contenedorValorC');

let opcionPlan = "";

const usuario = JSON.parse(localStorage.getItem('Usuario'));
const identificacionUsuario = JSON.parse(localStorage.getItem('id'))

let contenedorMensaje = document.getElementById('nombreInicio');
let mensaje = JSON.parse(localStorage.getItem('correoUsuario'));
contenedorMensaje.innerHTML = mensaje;
let opcionesVentana = "left=400,top=200,width=800,height=500";


let valorPlanA = JSON.parse(localStorage.getItem('valorPlanA'));
contenedorA.innerHTML = valorPlanA;

let valorPlanB = JSON.parse(localStorage.getItem('valorPlanB'));
contenedorB.innerHTML = valorPlanB;

let valorPlanC = JSON.parse(localStorage.getItem('valorPlanC'));
contenedorC.innerHTML = valorPlanC;


document.getElementById('pagarPlanA').addEventListener('click', function(){
        
        window.open("Pago.html", '_blank', opcionesVentana);
        
        opcionPlan = "A";
        alert(opcionPlan);
        localStorage.setItem('tipoPlan', JSON.stringify(opcionPlan));
    

});

pagarPlanB.addEventListener('click',function(){

    window.open("Pago.html", '_blank', opcionesVentana);
    opcionPlan = "B";
    alert(opcionPlan);
    localStorage.setItem('tipoPlan', JSON.stringify(opcionPlan));

})


pagarPlanC.addEventListener('click',function(){

    window.open("Pago.html", '_blank', opcionesVentana);
    opcionPlan = "C"
    alert(opcionPlan);
    localStorage.setItem('tipoPlan', JSON.stringify(opcionPlan));

})












