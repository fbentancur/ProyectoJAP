let cartContent = document.getElementById("cart-container")
let boton = document.getElementById('boton-modal')
let subtotal = document.getElementById('subtotal-price')
let envioCost = document.getElementById('envio-price')
let precioTotal = document.getElementById('total-price')
let form = document.getElementById('formulario')
let error = document.getElementById('error')
let botonModal = document.getElementById('boton-modal')

fetch(CART_INFO_URL + 25801 + EXT_TYPE)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        for (let content of data.articles) {
            let contentForInner = ""
            contentForInner += `
    <div class="table-div">
        <table class="product-table">
            <thead>
                <tr>
                    <th></th>
                    <th>Nombre</th>
                    <th>Costo</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><img src="${content.image}" class="cart-product-image"></td>
                    <td>${content.name}</td>
                    <td>${content.unitCost}</td>
                    <td><input type="number" id="cantidad-productos+${content.id}" class="input-cantidad" value="${content.count}" min="1"></td>
                    <td id="precio-total">${content.unitCost * content.count}</td>
                </tr>
            </tbody>
        </table>
    </div>
            `
            cartContent.innerHTML += contentForInner
            inicializarCostes(content)
            tarjetaOTransferencia()
            actualizarCostes(content)


            botonModal.addEventListener("click", () => {
                error.innerHTML = ""
            })

            // botonComprar.addEventListener('click', () => {
            //     if (!form.checkValidity()) {
            //         error.innerHTML = `<div class="container">
            //     <div class="alert alert-danger text-center" role="alert">
            //       <h4 class="alert-heading">Faltan datos importantes</h4>
            //     </div>
            //   </div>`

            //     }
            // })
        }

    })



function inicializarCostes(content) {
    let cantidad = document.getElementById(`cantidad-productos+${content.id}`)
    subtotal.innerHTML = `<p>${content.currency} ${content.unitCost}</p>`
    envioCost.innerHTML = `<p>${content.currency} 0 </p>`
    precioTotal.innerHTML = `<p>${content.currency} ${content.unitCost * cantidad.value}</p>`
}

function tarjetaOTransferencia() {
    let tarjeta = document.getElementById('tarj-number')
    let cvu = document.getElementById('cvu')
    let vencimiento = document.getElementById('vencimiento')
    let cuenta = document.getElementById("numero-cuenta")
    document.getElementById("credito").addEventListener("click", () => {
        document.getElementById("numero-cuenta").disabled = true
        tarjeta.disabled = false
        cvu.disabled = false
        vencimiento.disabled = false
        boton.innerHTML = "Forma de pago : Tarjeta"
    })

    document.getElementById('transferencia').addEventListener("click", () => {
        tarjeta.disabled = true
        cvu.disabled = true
        vencimiento.disabled = true
        cuenta.disabled = false
        boton.innerHTML = "Forma de pago : Transferencia"
    })

}

function rellenarCostes(content, cantidad, tiposDeEnvio) {
    let coste = document.getElementById("precio-total")
    coste.innerHTML = `${cantidad * content.unitCost}`
    subtotal.innerHTML = `<p>${content.currency} ${cantidad * content.unitCost}</p>`

    for (let tipoDeEnvio of tiposDeEnvio) {
        if (tipoDeEnvio.checked && tipoDeEnvio.id == "premium") {
            envioCost.innerHTML = `<p>${content.currency} ${(15 * (cantidad * content.unitCost)) / 100}</p>`
            precioTotal.innerHTML = `<p>${content.currency} ${((15 * (cantidad * content.unitCost)) / 100) + (cantidad * content.unitCost)}</p>`
        }
        else if (tipoDeEnvio.checked && tipoDeEnvio.id == "express") {
            envioCost.innerHTML = `<p>${content.currency} ${(7 * (cantidad * content.unitCost)) / 100}</p>`
            precioTotal.innerHTML = `<p>${content.currency} ${((7 * (cantidad * content.unitCost)) / 100) + (cantidad * content.unitCost)}</p>`
        }
        else if (tipoDeEnvio.checked && tipoDeEnvio.id == "standard") {
            envioCost.innerHTML = `<p>${content.currency} ${(5 * (cantidad * content.unitCost)) / 100}</p>`
            precioTotal.innerHTML = `<p>${content.currency} ${((5 * (cantidad * content.unitCost)) / 100) + (cantidad * content.unitCost)}</p>`
        }
    }
}

function actualizarCostes(content) {
    let cantidad = document.getElementById(`cantidad-productos+${content.id}`)
    let tiposDeEnvio = document.querySelectorAll("[name='tipo-de-envio']")
    cantidad.addEventListener("change", () => {
        precioTotal.innerHTML = `<p>${content.currency} ${content.unitCost * cantidad.value}</p>`
        rellenarCostes(content, cantidad.value, tiposDeEnvio)
    })

    for (let i = 0; i < tiposDeEnvio.length; i++) {
        console.log(tiposDeEnvio[i])
        tiposDeEnvio[i].addEventListener("click", () => {
            rellenarCostes(content, cantidad.value, tiposDeEnvio)
        })
    }
}



(function () {
    'use strict'

    var forms = document.querySelectorAll('.needs-validation')

    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {

                console.log(form)

                if (form.checkValidity()) {
                    alert("ha comprado con exsito")
                }
                else {
                    alert("fallo la compra")
                }
                event.preventDefault()
                event.stopPropagation()

                form.classList.add('was-validated')
            }, false)
        })
})()