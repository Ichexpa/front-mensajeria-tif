const canalesContenedorElemento=document.querySelector(".canales");
let existeMensajeBienvenida=false
canalesContenedorElemento.addEventListener("click",(e)=>{
    const canalSeleccionado=e.target.closest(".canal")
    if(canalSeleccionado){
        console.log(existeMensajeBienvenida)
        if(existeMensajeBienvenida){            
            const mensajeBienvenida=document.querySelector(".mensaje-bienvenida")
            /* console.log(mensajeBienvenida) */
            mensajeBienvenida.remove()
        }
        const nombreCanal=canalSeleccionado.querySelector("span").textContent
        const descripcionCanal=canalSeleccionado.querySelector(".canal-descripcion").textContent
        mensajeBienvenidaComponente(nombreCanal,descripcionCanal)
        activarContenedorMensajesInput()
        existeMensajeBienvenida=true
    }
})
function activarContenedorMensajesInput(){
    const mensajesUsuarioContenedor=document.querySelector(".mensajes-usuarios");
    const cajaMensaje=document.querySelector(".caja-mensajes")
    mensajesUsuarioContenedor.style.display="flex"
    cajaMensaje.style.display="flex"
}
function mensajeBienvenidaComponente(nombreCanal,descripcionCanal){
    const contenedorDeMensajes=document.querySelector(".mensajes-usuarios")
    const mensajeBienvenida=document.createElement("div")
    mensajeBienvenida.className="mensaje-bienvenida"
    contenedorDeMensajes.appendChild(mensajeBienvenida)
    const logoHashtag=document.createElement("div")
    logoHashtag.className="hastag-logo"
    mensajeBienvenida.appendChild(logoHashtag)
    const imagenLogo=document.createElement("img")
    imagenLogo.src="../assets/iconos/Hashtag.png"
    logoHashtag.appendChild(imagenLogo)
    const tituloMensaje=document.createElement("h1")
    tituloMensaje.textContent= `¡Te damos la bienvenida a ${nombreCanal}!`
    mensajeBienvenida.appendChild(tituloMensaje)
    const parrafoBienvenida=document.createElement("p")
    parrafoBienvenida.textContent=descripcionCanal
    mensajeBienvenida.appendChild(parrafoBienvenida)
}
