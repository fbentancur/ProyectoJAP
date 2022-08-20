function redirect() {
    window.location="main.html"
}

function showAlertError() {
    mostrarError()
}



function validarCampo(){
    let campoMail = document.getElementById('mail')
    let campoContrasena = document.getElementById('password')
    return campoMail.value !== undefined && campoMail.value !== '' && campoContrasena.value !== undefined && campoContrasena.value !== '';
    
}
window.addEventListener('load', function(){
    let boton = document.getElementById('botonRegistro');


    boton.addEventListener('click', () => {
        if(validarCampo()){
            redirect();
        }
        else{
            showAlertError();
        }
    });
})
function mostrarError(){
    let divError = document.getElementById('error-alert')
    divError.innerHTML+=`
        <div class="alert alert-danger text-center" role="alert">
            <h4 class="alert-heading">El usuario o contraseña ingresados no son correctos</h4> 
        </div>`}