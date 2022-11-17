let nombre = document.getElementById('nombre')
let segundoNombre = document.getElementById('segundo-nombre')
let apellido = document.getElementById('apellido')
let segundoApellido = document.getElementById('segundo-apellido')
let mail = document.getElementById('mail')
let telefono = document.getElementById('telefono')
let btnConfirm = document.getElementById('boton-perfil')


if(localStorage.getItem('nombre')!==null){
    nombre.value=localStorage.getItem('nombre')
    segundoNombre.value=localStorage.getItem('segundoNombre')
    apellido.value=localStorage.getItem('apellido')
    segundoApellido.value=localStorage.getItem('segundoApellido')
    mail.value=localStorage.getItem('mail')
    telefono.value=localStorage.getItem('telefono')
}


function invalidarSubmits () {
    
    var forms = document.querySelectorAll('.needs-validation')

    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {

                if (form.checkValidity()) {
                    localStorage.setItem('nombre', nombre.value)
                    localStorage.setItem('segundoNombre', segundoNombre.value)
                    localStorage.setItem('apellido', apellido.value)
                    localStorage.setItem('segundoApellido', segundoApellido.value)
                    localStorage.setItem('mail', mail.value)
                    localStorage.setItem('telefono', telefono.value)
                }
                else {
                    alert("Faltan datos")
                    event.preventDefault()
                    event.stopPropagation()
                }
                

                form.classList.add('was-validated')
            }, false)
        })
}

invalidarSubmits()