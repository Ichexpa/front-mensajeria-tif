// JavaScript
const input = document.getElementById("input-mensaje");
const boton = document.getElementById("boton-enviar");
const imgEnviar= document.getElementById("img-enviar")
const contenedorDeMensajes= document.querySelector(".mensajes");
function enviarMensaje() {
  if (input.value.trim() !== "") {
    console.log("Mensaje enviado:", input.value.trim());
    componenteMensajeAenviar("Mauricio",input.value.trim(),fechaYHoraActual())
    input.value = ""; // Limpiamos el input después de enviar el mensaje
    boton.disabled = true; // Deshabilitamos el botón después de enviar el mensaje
    deshabilitarEnvio(true)
  }
}
function fechaYHoraActual(){
    let fechaYhora= new Date();
    let h=fechaYhora.getHours();  
    let m=fechaYhora.getMinutes();  
    let s=fechaYhora.getSeconds();  
    let dia=fechaYhora.getDate();  
    let mes=fechaYhora.getMonth()+1;  
    let anio=fechaYhora.getFullYear();  
    return `${dia}-${mes}-${anio} ${h}:${m}:${s}`
}
function deshabilitarEnvio(estaVacio){
  if(estaVacio){
    boton.style.cursor=null
    imgEnviar.style.filter="invert(93%) sepia(28%) saturate(464%) hue-rotate(170deg) brightness(113%) contrast(97%)";
  }
  else{
    boton.style.cursor="pointer"
    imgEnviar.style.filter="invert(51%) sepia(67%) saturate(3453%) hue-rotate(87deg) brightness(118%) contrast(93%)";
  }
}
function validarInput() {
  let estaVacio=input.value.trim() === "";
  boton.disabled=estaVacio
  deshabilitarEnvio(estaVacio)
}

input.addEventListener("input", validarInput);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    enviarMensaje();
  }
});

function componenteMensajeAenviar(nombreUsuario,contenidoMensaje,fechaYhora){
  const contenedorEstructuraMensajes=document.createElement("div");
  contenedorEstructuraMensajes.className="contenedor-mensaje";
  const contenedorImgPerfil=document.createElement("div");
  contenedorImgPerfil.className="mensaje-perfil-img";
  const contenedorImg=document.createElement("img");
  contenedorImg.className="img-perfil";
  /* Direccion de la imagen */
  contenedorImg.src="../assets/avatares/imagen1.jpg";
  contenedorImg.alt="Foto de perfil";
  contenedorImgPerfil.appendChild(contenedorImg);
  contenedorEstructuraMensajes.appendChild(contenedorImgPerfil)
  const contenedorMensajesFotoPerfil=document.createElement("div");
  contenedorMensajesFotoPerfil.className="mensaje-con-foto-perfil";
  contenedorEstructuraMensajes.appendChild(contenedorMensajesFotoPerfil);      
  const contenedorMensajeInfo= document.createElement("div");
  contenedorMensajeInfo.className="mensaje-info";
  contenedorMensajesFotoPerfil.appendChild(contenedorMensajeInfo);
  const contenedorNombreRemitente=document.createElement("div");
  contenedorNombreRemitente.className="mensaje-nombre-remitente"
  /* Nombre Usuario */
  contenedorNombreRemitente.textContent=nombreUsuario;
  contenedorMensajeInfo.appendChild(contenedorNombreRemitente);
  const contenedorFechaHoraEnvio=document.createElement("div");
  contenedorFechaHoraEnvio.className="mensaje-fecha"
  /* Hora Envio */
  contenedorFechaHoraEnvio.textContent=fechaYhora;
  contenedorMensajeInfo.appendChild(contenedorFechaHoraEnvio);
  const contenedorAcciones=document.createElement("div");
  contenedorAcciones.className="mensaje-acciones";
  contenedorMensajeInfo.appendChild(contenedorAcciones);
  const contenedorEditarMensaje=document.createElement("div");
  contenedorEditarMensaje.className="editar-mensaje";
  contenedorAcciones.appendChild(contenedorEditarMensaje);
  const iconoEditar=document.createElement("i");
  iconoEditar.className="fa-solid fa-pen-to-square";
  contenedorEditarMensaje.appendChild(iconoEditar);
  const contenedorEliminarMensaje=document.createElement("div");   
  contenedorEliminarMensaje.className="eliminar-mensaje";
  contenedorAcciones.appendChild(contenedorEliminarMensaje);
  const iconoEliminar=document.createElement("i");
  iconoEliminar.className="fa-solid fa-trash"; 
  contenedorEliminarMensaje.appendChild(iconoEliminar);             
  const contenedorContenidoMensaje=document.createElement("div");
  contenedorContenidoMensaje.className="mensaje";
  /* Contenido del mensaje */
  contenedorContenidoMensaje.textContent=contenidoMensaje
  contenedorMensajesFotoPerfil.appendChild(contenedorContenidoMensaje);
  contenedorDeMensajes.appendChild(contenedorEstructuraMensajes)
}

boton.addEventListener("click", enviarMensaje);


