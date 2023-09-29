const formulario = document.getElementById("formulario");
const btn_registrar = document.getElementById("btn_registrar") 

const form_lista = document.forms["formulario"];

btn_registrar.addEventListener("click",(e)=>{
    e.preventDefault();
    quitar_input_error(form_lista);
    if (validarFormulario(form_lista)){
        console.log(form_lista[0].value)
        if(validarCorreo(form_lista[0].value)){
            registrar();
        }else{
            alert("El correo no es valido")
        }
        
    }else{
        poner_input_error(form_lista);
        alert("Complete todo los campos por favor") ;
    }
    
});

function validarCorreo(correo) {
    // Expresión regular para validar el formato del correo electrónico
    var expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Verificar si el correo cumple con el formato válido
    if (expresion.test(correo)) {
      return true;
    } else {
      return false;
    }
  }

function quitar_input_error(formulario){
    for(let elemento of formulario){
        if (elemento.type != "submit"){
            elemento.setAttribute('class',"input");
        }
    }
};

function poner_input_error(formulario){
    for(let elemento of formulario){
        if (elemento.type != "submit"){
            if (elemento.value == ""){
                console.log(elemento.getAttribute('class'))
                elemento.setAttribute('class',"input-error");
            }
        }
    }   
}
function validarFormulario(formulario){
    for(let elemento of formulario){
        if (elemento.type != "submit"){
            if (elemento.value == ""){
                return false;
            }
        }
    }
    return true;
}



function registrar(){
    let datosLogin = new FormData(formulario);
    const data = {
        email : datosLogin.get("input_email"),
        contrasenia : datosLogin.get("input_contrasenia"), 
        nombre : datosLogin.get("input_nombre"), 
        apellido : datosLogin.get("input_apellido"), 
        fecha_nac : datosLogin.get("input_fecha"), 
        nickname : datosLogin.get("input_nickname")
    };
    fetch("http://127.0.0.1:5000/usuario/register", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (response.status === 201) {
            // Redirect to profile page if login is successful
            return response.json().then(data => {
                //window.location.href = "templates/login.html";
                document.getElementById("message").innerHTML = data.message;
                //ver si se agrega una ventana modal
                alert(data.message);
                window.location.href = "login.html"
            });
        } else {
            return response.json().then(data => {
                document.getElementById("message").innerHTML = data.error.description;
                alert(data.error.message);
            });
        }
    })
    .catch(error => {
        document.getElementById("message").innerHTML = "An error occurred.";
    });
}
