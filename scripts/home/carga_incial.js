const apiRaizURL="http://127.0.0.1:5000"
const rutaRaizImagenes="G:/UPATECO/MENSAJERIA_TIF/api_mensajeria/static_folder/servidor_imagenes/"
const requestOption={
    methods:"GET",
    headers:{
        "Accept":"application/json"
    }
}
/* POR AHORA SE UTILIZA POR DEFECTO EL ID 1 DESPUES HACERLO DINAMICO */
fetch(`${apiRaizURL}/usuario_servidor/usuario/1`)
    .then(response=>{
        if(response.status===200){
            return response.json()
        }
        else{
            throw Error("OCURRIO UN ERROR EN LA SOLICITUD")
        }
    })
    .then(data=>{
        procesarJsonServidorAComponente(data)
    } )
    .catch(error=> console.log("ERROR",error))

function procesarJsonServidorAComponente(json_servidores){
    const listado_servidores=json_servidores.servidores_usuario
    listado_servidores.forEach(propiedad_servidor_usuario=>{
        const id_usuario_servidor=propiedad_servidor_usuario.id_usuario_servidor
        const servidor=propiedad_servidor_usuario.servidor
        const rutaCompletaImagen=rutaRaizImagenes+servidor.imagen
        servidorComponenteAPIGET(servidor.nombre,rutaCompletaImagen,
                            servidor.descripcion,servidor.id_servidor,id_usuario_servidor)
    })
    
}

function servidorComponenteAPIGET(nombre,imagen,descripcion,id_servidor,id_usuario_servidor){
    const contenedorServidoresUsuario=document.querySelector(".servidores-del-usuario")
    const servidorComponente=document.createElement("div")
    servidorComponente.className="servidores";
    servidorComponente.id=id_servidor.toString()
    /* ESTE SPAN SIRVE PARA ABANDONAR UN SERVIDOR TOMANDO EL id_usuario_servidor DE LA BD */
    const spanIdUsuarioServidor=document.createElement("span")
    spanIdUsuarioServidor.id=id_usuario_servidor.toString()
    servidorComponente.appendChild(spanIdUsuarioServidor)
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
    
function eliminarComponentesCanales(){
    const listadoCanalesComponente=document.querySelector(".listado-canales")
    let listadoHijosCanalesComponente=Array.from(listadoCanalesComponente.children)
    console.log(listadoHijosCanalesComponente)

    listadoHijosCanalesComponente.slice(0,listadoHijosCanalesComponente.length-1).forEach(hijos=>{
        hijos.style.display="none"
    }
    )
}
function cambiarChatXMensajeInformacion(){
    const mensajesUsuarioContenedor=document.querySelector(".mensajes-usuarios");
    const cajaMensaje=document.querySelector(".caja-mensajes")
    mensajesUsuarioContenedor.style.display="none"
    cajaMensaje.style.display="none"

}
cambiarChatXMensajeInformacion() 
eliminarComponentesCanales()