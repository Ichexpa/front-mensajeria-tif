const cuerpoDocumento=document.querySelector("body")
const canalesContenedor=document.querySelector(".canales")
let menuAbierto=false;
const perfilUsuario=document.querySelector(".perfil-usuario")
const servidoresContenedor=document.querySelector(".servidores-del-usuario")
const mensajeSiNoHayCanales=document.querySelector(".sin-canales-ni-servidor")

function menuContextualComponente(opciones){  
  const contenedorMenuContextual=document.createElement("div");
  contenedorMenuContextual.className="menu-contextual"
  const menuContextual=document.createElement("ul")
  contenedorMenuContextual.appendChild(menuContextual);
  opciones.forEach(opcion => {
    const item=document.createElement("li");
    item.textContent=opcion
    menuContextual.appendChild(item);
  });
  return contenedorMenuContextual
}
function cerrarMenusContextualesActivos(){
  const menuContextuales=document.querySelectorAll(".menu-contextual");
  menuContextuales.forEach(menu=>{
    menu.remove();
  })
}
function mostrarMenuContextual(items,e){
  const menuContextual=menuContextualComponente(items)
  cuerpoDocumento.appendChild(menuContextual)
  const posX = e.clientX;
  const posY = e.clientY;
  menuContextual.style.left= posX+"px"
  menuContextual.style.top= posY+"px"
  menuContextual.style.display = "block";
  
  const menuHeight = menuContextual.clientHeight;
  const ventanaHeight = window.innerHeight;
  
  if (posY + menuHeight > ventanaHeight) {
    const adjustarTop = ventanaHeight - menuHeight;
    menuContextual.style.top = `${adjustarTop}px`;
  } else {
    menuContextual.style.top = `${posY}px`;
  }  
  // Ajustar la posición horizontal
  menuContextual.style.left = `${posX}px`;
  // Retorno el componente para operarlo al activar uno de sus opciones
  return menuContextual
}
perfilUsuario.addEventListener("contextmenu",(e)=>{
  e.preventDefault();
  /* cerrarMenusContextualesActivos() */
  console.log(menuAbierto)
  if(menuAbierto){
    cerrarMenusContextualesActivos()
  }
  mostrarMenuContextual(["Ver perfil","Editar perfil"],e)
  menuAbierto=true 
})
/* Sacar comentario cuando arregle los errores JS */
canalesContenedor.addEventListener("contextmenu",(e)=>{
    e.preventDefault();
    const canal=e.target.closest(".canal");
    
    if(menuAbierto){
      cerrarMenusContextualesActivos()
    }    
    if(canal){
      const menuContextual=mostrarMenuContextual(["Eliminar"],e) 
      console.log(menuContextual)
      const opciones=menuContextual.querySelector("li")
      console.log(opciones)
      opciones.addEventListener("click",()=>{
        const nombreCanal=canal.querySelector("span").textContent
        const modalEliminarCanal=modalComponenteConfirmacion("Eliminar Canal","Estas seguro que deseas eliminar el canal?:","rgb(85,26,46)","../assets/imagenes/eliminar-canal.png",nombreCanal)
        mostarModalMenuContextuales(modalEliminarCanal)
        respuestaModalMenuContextuales(modalEliminarCanal,canal,mostrarMensajeSiNoHayCanales,mensajeIndicandoSeleccionCanal)

      })
      menuAbierto=true
    }
    else{
        menuAbierto=false
    }
})

servidoresContenedor.addEventListener("contextmenu",(e)=>{
  e.preventDefault();
  const servidor=e.target.closest(".servidores");
  if(menuAbierto){
    cerrarMenusContextualesActivos()
  }
  if(servidor){    
    const menuContextualServidores=mostrarMenuContextual(["Abandonar Servidor"],e) 
    const abandonarServidorOpcion=menuContextualServidores.querySelector("li")
    abandonarServidorOpcion.addEventListener("click",()=>{
      const nombreServidor=servidor.querySelector("img").getAttribute("alt")
      const modalAbandonarServidor=modalComponenteConfirmacion("Abandonar Servidor","Estas seguro que desea abandonar el servidor?:","rgb(29,14,90)","../assets/imagenes/abandonar-servidor.png",nombreServidor)
      mostarModalMenuContextuales(modalAbandonarServidor)
      respuestaModalMenuContextuales(modalAbandonarServidor,servidor,mostrarMensajeSiNoHayServidores,seEliminoServidorSeleccionado)
    })
    menuAbierto=true
  }
  else{
    menuAbierto=false
  }
})

document.addEventListener("click", (e) => {
  if(menuAbierto){
    cerrarMenusContextualesActivos();
    menuAbierto=false
  }

});

function respuestaModalMenuContextuales(modal,componente,callbackComprobarExistencia,callbackMensajeAyuda){
    modal.addEventListener("click",(e)=>{
        const confirmar=e.target.closest(".boton-confirmar")
        const cancelar=e.target.closest(".boton-cancelar")
        if(confirmar){
            modal.remove()
            callbackMensajeAyuda(componente)
            componente.remove()
            callbackComprobarExistencia()
            
        }
        if(cancelar){
            modal.remove()
        }
    })
}
function elCanaleEstaSeleccionado(canal){
  return canal.classList.contains("canal-seleccionado")
}
function seleccionaServidorMensaje(){
  const mensajesUsuarioContenedor=document.querySelector(".mensajes-usuarios");
  const cajaMensaje=document.querySelector(".caja-mensajes")
  mensajesUsuarioContenedor.style.display="none"
  cajaMensaje.style.display="none"
}
function seEliminoServidorSeleccionado(servidorComponente){
  if(servidorComponente.classList.contains("servidor-seleccionado")){
    mensajeSiNoHayServidores("../assets/imagenes/seleccionar-servidor.png","Seleccione un Servidor para comenzar")
  }
}
function comprobarSiExistenCanales(){
  const contenedorCanales=document.querySelector(".canales")
  return contenedorCanales.children.length>0
}
function mostrarMensajeSiNoHayCanales(){
  if(!comprobarSiExistenCanales()){
    mensajeSiNoHayCanales.style.display="flex"
  }
}

function comprobarSiExistenServidores(){
  const contenedorServidores=document.querySelector(".servidores-del-usuario")
  console.log(contenedorServidores.childElementCount)
  return contenedorServidores.childElementCount>0
}
function mostrarMensajeSiNoHayServidores(){
  console.log(comprobarSiExistenServidores())
  if(!comprobarSiExistenServidores()){
    console.log("Entro ")
    mensajeSiNoHayServidores("../assets/imagenes/explorar-servidores.png","Explore servidores para comunicarse con otras personas")
  }
}
function mensajeSiNoHayServidores(imagen,mensaje){
    const imagenInfoUsuario=document.querySelector(".accion-requerida-imagen").children[0];
    const descripcionInfoUsuario=document.querySelector(".accion-requerida-descripcion")
    imagenInfoUsuario.setAttribute("src",imagen)
    descripcionInfoUsuario.textContent= mensaje
    eliminarComponentesCanalesSinServidores()
    mensajeSiNoHayCanales.style.display="flex"
}
function mensajeSiNoSeSeleccionoUnCanal(){
  /* Se oculta la caja de mensajes y mensajes */
  const mensajesUsuarioContenedor=document.querySelector(".mensajes-usuarios");
  const cajaMensaje=document.querySelector(".caja-mensajes")
  mensajesUsuarioContenedor.style.display="none"
  cajaMensaje.style.display="none"
  /* Se carga el mensaje indicando que no hay canales seleccionado */
  const imagenInfoUsuario=document.querySelector(".accion-requerida-imagen").children[0];
  const descripcionInfoUsuario=document.querySelector(".accion-requerida-descripcion")
  imagenInfoUsuario.setAttribute("src","../assets/imagenes/user-interface-0.png")
  descripcionInfoUsuario.textContent="Selecciona un canal para comenzar a chatear"
}
function mensajeIndicandoSeleccionCanal(canal){
  if(elCanaleEstaSeleccionado(canal)){
    mensajeSiNoSeSeleccionoUnCanal()
  }
}
/* TUVE QUE REPETIR CODIGO PORQUE NO SE PUEDEN IMPORTAR FUNCIONES */
function eliminarComponentesCanalesSinServidores(){
    const listadoCanalesComponente=document.querySelector(".listado-canales")
    let listadoHijosCanalesComponente=Array.from(listadoCanalesComponente.children)
    console.log(listadoHijosCanalesComponente)

    listadoHijosCanalesComponente.slice(0,listadoHijosCanalesComponente.length-1).forEach(hijos=>{
        hijos.style.display="none"
    }
    )
}

function modalComponenteConfirmacion(titulo,titulo_info,color_fondo,imagenURL,contenidoAModificar){
    const modalContendorPrincipal=document.createElement("section")
    modalContendorPrincipal.classList.add("modal")
    modalContendorPrincipal.classList.add("agregar-canal")
    modalContendorPrincipal.classList.add("modal-mostrar")
    const modal=document.createElement("div");
    modal.style.backgroundColor=color_fondo
    modal.className="modal-container"        
    modalContendorPrincipal.appendChild(modal)
    const tituloModal=document.createElement("h1")
    tituloModal.className="modal-titulo"
    tituloModal.textContent=titulo
    modal.appendChild(tituloModal)
    const cuerpoModal=document.createElement("div")
    cuerpoModal.className="cuerpo-modal-advertencias"
    modal.appendChild(cuerpoModal)
    const contenedorImagen=document.createElement("div")
    contenedorImagen.className="imagen-cuerpo-modal"
    cuerpoModal.appendChild(contenedorImagen)
    const imagenAdvertencia=document.createElement("img")
    imagenAdvertencia.src=imagenURL
    contenedorImagen.appendChild(imagenAdvertencia)
    const contenedorInfo=document.createElement("div")
    contenedorInfo.className="info-cuerpo-modal"
    cuerpoModal.appendChild(contenedorInfo)
    const tituloInfo=document.createElement("h3")
    tituloInfo.textContent=titulo_info
    contenedorInfo.appendChild(tituloInfo)
    const textoInfo=document.createElement("p")
    textoInfo.textContent=contenidoAModificar
    contenedorInfo.appendChild(textoInfo)
    const contenedorBotones=document.createElement("div")
    contenedorBotones.className="seccion-botones-confirmacion"
    modal.appendChild(contenedorBotones)
    const botonCancelar=document.createElement("button")
    botonCancelar.textContent="Cancelar"
    botonCancelar.classList.add("boton-cancelar")
    const botonConfirmar=document.createElement("button")
    botonConfirmar.textContent="Confirmar"    
    botonConfirmar.classList.add("boton-confirmar")
    contenedorBotones.appendChild(botonCancelar)
    contenedorBotones.appendChild(botonConfirmar)    
    
    return modalContendorPrincipal
}
function mostarModalMenuContextuales(modal){
    const cuerpoDocumento=document.body
    cuerpoDocumento.appendChild(modal)
}


