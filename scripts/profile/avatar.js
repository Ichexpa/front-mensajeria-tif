const input_imagen = document.getElementById("input_imagen");
const avatar_usuario = document.getElementById("avatar_usuario");

const btn_guardar_foto =document.getElementById("btn_guardar_foto");
const btn_editar_foto =document.getElementById("btn_editar_foto");
const btn_cancelar_foto =document.getElementById("btn_cancelar_foto");
const form_avatar = document.forms["form-imagen"];

/* let imagen = null; */

btn_editar_foto.addEventListener("click",e=>{
    e.preventDefault();
    activarEdicion(form_avatar);
    btn_guardar_foto.style = "display:inline-block";
    btn_cancelar_foto.style = "display:inline-block";
    btn_editar_foto.style.display = "none";
});

btn_guardar_foto.addEventListener("click",e=>{
    e.preventDefault();

    let imagen =input_imagen.files[0];
    console.log(imagen);

    //no logro hacer funcionar esto
    if(imagen!=null){
        let formData = new FormData();
        formData.append("profile_imagen",imagen)
        console.log(formData)
        const url = "http://127.0.0.1:5000/usuario/update_avatar";
        fetch(url, {
            method: "POST",
            body: formData,
            credentials: "include"
        })
        .then(response => {
            if (response.status === 201) {
                return response.json().then(res => {
                    
                    console.log(res.message);
                });
            } else {
                return response.json().then(res => {
                    
                    console.log(res.error.description)
                });
            }
        })
        .catch(error => {
          
            console.log("An error occurred.")
        });
    };
    desactivarEdicion(form_avatar);
    btn_guardar_foto.style = "display:none";
    btn_cancelar_foto.style = "display:none";
    btn_editar_foto.style.display = "inline-block";

})


function mostrarImagen(event){
    var imagenSource = event.target.result;
    var pre_image = document.getElementById("prev-imagen");
    //console.log(imagenSource);
    pre_image.src = imagenSource;
}

function procesarArchivo(event){
    imagen = event.target.files[0];
    /* console.log(imagen);
    console.log(imagen.files[1]) */
    var lector  = new FileReader();
    lector.addEventListener("load", mostrarImagen, false)
    lector.readAsDataURL(imagen)
};


input_imagen.addEventListener("change",procesarArchivo,false);
