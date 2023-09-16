const servidores=document.querySelector(".servidores-del-usuario")

servidores.addEventListener("click",(e)=>{
    const servidorClickeado=e.target.closest(".servidores")
    if(servidorClickeado){
        reestablecerCanales()
        ocultarChatCajaMensajes()
        mensajeServidorClickeado(servidorClickeado)
    }
})
function reestablecerCanales(){

    const canalesCantidad=document.querySelector(".canales")
    const mensajeSinCanalesDisponibles=document.querySelector(".sin-canales-ni-servidor")
    mostrarFuncionalidadesCanales()
    if(canalesCantidad.childElementCount===0){
        console.log("entro")
        mensajeSinCanalesDisponibles.style.display="flex"
    }
    else{
        mensajeSinCanalesDisponibles.style.display="none"
    }
 
}
function mostrarFuncionalidadesCanales(){
    const listadoCanalesComponente=document.querySelector(".listado-canales")
    let listadoHijosCanalesComponente=Array.from(listadoCanalesComponente.children)
    const ultimoElemento=listadoHijosCanalesComponente.length-1
    listadoHijosCanalesComponente.slice(0,ultimoElemento).forEach(hijos=>{
        hijos.style.display="flex"
    })
}
function descripcionCanalSeleccionado(servidorClickeado){
    const contenidoDescripcionServidor=servidorClickeado.querySelector(".servidor-descripcion")    
    return contenidoDescripcionServidor.textContent
}
function ocultarChatCajaMensajes(){
  /* Se oculta la caja de mensajes y mensajes */
  const mensajesUsuarioContenedor=document.querySelector(".mensajes-usuarios");
  const cajaMensaje=document.querySelector(".caja-mensajes")
  mensajesUsuarioContenedor.style.display="none"
  cajaMensaje.style.display="none"
}
/* CODIGO REPETIDO POR QUE NO ME DEJA EXPORTAR */

function mensajeServidorClickeado(servidorClickeado){  
  const descripcionServidor=descripcionCanalSeleccionado(servidorClickeado)  
  /* Se carga el mensaje indicando que no hay canales seleccionado */
  const imagenInfoUsuario=document.querySelector(".accion-requerida-imagen").children[0];
  const descripcionInfoUsuario=document.querySelector(".accion-requerida-descripcion")
  imagenInfoUsuario.setAttribute("src","../assets/imagenes/user-interface-0.png")
  descripcionInfoUsuario.textContent=elCanalPoseeDescripcion(descripcionServidor)
}
function elCanalPoseeDescripcion(texto){
    if(texto.trim()!==""){
        return "Descripcion del servidor: " + texto
    }
    else{
        return "El servidor no posee descripción"
    }
}
