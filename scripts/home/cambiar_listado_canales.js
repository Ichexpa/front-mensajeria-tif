/* ELIMINA TODOS LOS COMPONENTES QUE SE ENCUENTRAN EN LISTADO CANALES SI NO SE SELECCIONA UN SERVIDOR*/
function eliminarComponentesCanales(){
    const listadoCanalesComponente=document.querySelector(".listado-canales")
    let listadoHijosCanalesComponente=Array.from(listadoCanalesComponente.children)
    console.log(listadoHijosCanalesComponente)

    listadoHijosCanalesComponente.slice(0,listadoHijosCanalesComponente.length-1).forEach(hijos=>{
        hijos.style.display="none"
    }
    )
}
eliminarComponentesCanales()