const botonAgregarCanal=document.getElementById("agregar-canal-boton");
const botonAgregarServidor=document.getElementById("agregar-servidor")
const modalAgregarCanal=document.getElementById("modal-canal");
const modalAgregarServidor=document.getElementById("modal-servidor")
const modal=document.querySelector(".modal")
const cerrarModalcanal=document.getElementById("cerrar-modal-canal")
const cerrarModalservidor=document.getElementById("cerrar-modal-servidor")
const agregarCanalModal=document.querySelector("#crear-canal")
const agregarServidorModal=document.querySelector("#crear-servidor")
const contenedorDeCanales=document.querySelector(".canales")
const inputModal=modal.getElementsByTagName("input")[0]
const textAreaDescripcionCanal=document.getElementById("canal-descripcion-textarea")
const contenedorSubirImagen=modalAgregarServidor.querySelector(".subir-imagen-servidor");
const inputFileSubirImagen=document.getElementById("input-img-servidor");
const inputNombreServidorModal=document.getElementById("servidor-nombre")
const contenedorImagenServidor=document.getElementById("imagen-servidor")
const descripcionServidorTextarea=document.getElementById("servidor-descripcion")
const mensajeErrorServidor=document.querySelector("#msj-advertencia-servidor")
const mensajeErrorCanal=document.querySelector("#msj-advertencia-canal")
const componenteSiNoExistenCanales=document.querySelector(".sin-canales-ni-servidor")

botonAgregarCanal.addEventListener("click",(e)=>{
    e.preventDefault()
    mensajeErrorCanal.style.display="none"
    modalAgregarCanal.classList.add("modal-mostrar")
})

botonAgregarServidor.addEventListener("click",(e)=>{
    e.preventDefault()
    mensajeErrorServidor.style.display="none"
    modalAgregarServidor.classList.add("modal-mostrar")
})

cerrarModalcanal.addEventListener("click",(e)=>{
    e.preventDefault()
    modalAgregarCanal.classList.remove("modal-mostrar")
})

cerrarModalservidor.addEventListener("click",(e)=>{
    modalAgregarServidor.classList.remove("modal-mostrar")
})

contenedorSubirImagen.addEventListener("click",(e)=>{
    inputFileSubirImagen.click();
})
inputFileSubirImagen.addEventListener('change', (e)=> {
    const selectedFile = e.target.files[0];
    /* const imagen=contenedorSubirImagen.getElementsByTagName("img")[0]; */
    if (selectedFile) {
      const reader = new FileReader(); // Crea un objeto FileReader
      
      reader.onload = function(e) {
        contenedorImagenServidor.setAttribute("src",e.target.result)
      }
      reader.readAsDataURL(selectedFile);
    }
});
agregarCanalModal.addEventListener("click",()=>{    
    const valorInput=inputModal.value
    const valorTextAreaDescripcion=textAreaDescripcionCanal.value
    if(valorInput.trim() !== ""){
       const canalContenedor=canalComponente(valorInput,valorTextAreaDescripcion);
       contenedorDeCanales.appendChild(canalContenedor);
       modal.classList.remove("modal-mostrar")
       inputModal.value=""
       textAreaDescripcionCanal.value=""
       componenteSiNoExistenCanales.style.display="none"
    }
    else{
        mensajeErrorCanal.style.display="block"
    }
})

agregarServidorModal.addEventListener("click",()=>{
    const inputValor=inputNombreServidorModal.value;
    const imagenServidor=contenedorImagenServidor.src;
    const descripcionServidor=descripcionServidorTextarea.value
    if(imagenServidor !== "" && inputValor.trim() !== "" ){
        const servidorCreado=servidorComponente(inputValor,imagenServidor,descripcionServidor)
        modalAgregarServidor.classList.remove("modal-mostrar")
        alternarMensajesSinCanales_Servidores_Modales()
        servidorCreado.click()
    }
    else{
        mensajeErrorServidor.style.display="block"
    }
    inputNombreServidorModal.value=""
    contenedorImagenServidor.src="../assets/iconos/subir_imagen.png"
    contenedorImagenServidor.alt=""
    descripcionServidorTextarea.value=""
})

function canalComponente(nombre,descripcion){
    const canalContenedor = document.createElement("div");
    canalContenedor.className = "canal";

    const iconoSharp = document.createElement("i");
    iconoSharp.className = "fa-solid fa-hashtag hashtag-canales";
    canalContenedor.appendChild(iconoSharp);

    /* Contenedor para el nombre del canal */
    const nombreCanal = document.createElement("span");
    nombreCanal.textContent = nombre;
    canalContenedor.appendChild(nombreCanal);
    /*Contenedor para la descripcion del canal */
    const descripcionCanal= document.createElement("div");
    descripcionCanal.className="canal-descripcion"
    descripcionCanal.textContent=elCanaltieneDescripcion(descripcion)
    canalContenedor.appendChild(descripcionCanal)
    return canalContenedor;
}
function elCanaltieneDescripcion(descripcion){
    if(descripcion.trim() !== ""){
        return descripcion
    }
    else{
        return "El canal no posee descripción"
    }
}
function servidorComponente(nombre,imagen,descripcion){
    const contenedorServidoresUsuario=document.querySelector(".servidores-del-usuario")
    const servidorComponente=document.createElement("div")
    servidorComponente.className="servidores";
    const imagenServidor=document.createElement("img")
    imagenServidor.setAttribute("src",imagen)
    imagenServidor.setAttribute("alt",nombre)
    const descripcionServidor=document.createElement("div")
    descripcionServidor.className="servidor-descripcion"
    descripcionServidor.textContent=descripcion
    servidorComponente.appendChild(imagenServidor);
    servidorComponente.appendChild(descripcionServidor)
    contenedorServidoresUsuario.appendChild(servidorComponente);
    return servidorComponente
}
/* NO se puede exportar asi que repito la funcion */

function alternarMensajesSinCanales_Servidores_Modales(){
    const servidoresUsuario=document.querySelector(".servidores-del-usuario")
    const imagenInfoUsuario=document.querySelector(".accion-requerida-imagen").children[0];
    const descripcionInfoUsuario=document.querySelector(".accion-requerida-descripcion")
    if(servidoresUsuario.childElementCount===0){
        imagenInfoUsuario.setAttribute("src","imagenes/seleccionar-servidor.png")
        descripcionInfoUsuario.textContent="Seleccione un Servidor para comenzar"
    }
    else{
        imagenInfoUsuario.setAttribute("src","imagenes/user-interface-0.png")
        descripcionInfoUsuario.textContent="Selecciona un canal para comenzar a chatear"
    }
}
