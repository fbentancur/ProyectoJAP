let cartContent = document.getElementById("cart-container")

fetch(CART_INFO_URL+25801+EXT_TYPE)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        for(let content of data.articles){
            let contentForInner=""
            contentForInner+=`
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
                    <td id="precio-total">${content.unitCost*content.count}</td>
                </tr>
            </tbody>
        </table>
    </div>
            `

            let tarjeta = document.getElementById('tarj-number')
            let cvu = document.getElementById('cvu')
            let vencimiento =document.getElementById('vencimiento')
            let cuenta= document.getElementById("numero-cuenta")
            let boton = document.getElementById('boton-modal')

            document.getElementById("credito").addEventListener("click",()=>{
                document.getElementById("numero-cuenta").disabled=true
                tarjeta.disabled=false
                cvu.disabled=false
                vencimiento.disabled=false
                boton.innerHTML="Forma de pago : Tarjeta"
            })
            
            document.getElementById('transferencia').addEventListener("click", ()=>{
                tarjeta.disabled=true
                cvu.disabled=true
                vencimiento.disabled=true
                cuenta.disabled=false
                boton.innerHTML="Forma de pago : Transferencia"
            })

            cartContent.innerHTML+=contentForInner

            let cantidad = document.getElementById(`cantidad-productos+${content.id}`)
            let subtotal = document.getElementById('subtotal-price')
            let envioCost =document.getElementById('envio-price')
            let precioTotal = document.getElementById('total-price')
            let tiposDeEnvio = document.querySelectorAll("[name='tipo-de-envio']")
            let coste = document.getElementById("precio-total")
            subtotal.innerHTML=`<p>${content.currency} ${content.unitCost}</p>`
            envioCost.innerHTML=`<p>${content.currency} 0</p>`
            precioTotal.innerHTML=`<p>${content.currency} ${content.unitCost*cantidad.value}</p>`
            

            cantidad.addEventListener("change",()=>{
                precioTotal.innerHTML=`<p>${content.currency} ${content.unitCost*cantidad.value}</p>`
                rellenarCostes()
            })

            for(let i =0; i< tiposDeEnvio.length; i++){
                console.log(tiposDeEnvio[i])
                tiposDeEnvio[i].addEventListener("click",()=>{
                    rellenarCostes()
                })
            } 
            

        function rellenarCostes(){
            coste.innerHTML=`${cantidad.value * content.unitCost}`
            subtotal.innerHTML=`<p>${content.currency} ${cantidad.value * content.unitCost}</p>`
            
            for(let tipoDeEnvio of tiposDeEnvio){
                if(tipoDeEnvio.checked && tipoDeEnvio.id =="premium"){
                    envioCost.innerHTML=`<p>${content.currency} ${(15*(cantidad.value * content.unitCost))/100}</p>`
                    precioTotal.innerHTML=`<p>${content.currency} ${((15*(cantidad.value * content.unitCost))/100)+ (cantidad.value * content.unitCost)}</p>`
                }
                    else if(tipoDeEnvio.checked && tipoDeEnvio.id =="express"){
                        envioCost.innerHTML=`<p>${content.currency} ${(7*(cantidad.value * content.unitCost))/100}</p>`
                    }
                        else if(tipoDeEnvio.checked && tipoDeEnvio.id =="standard"){
                            envioCost.innerHTML=`<p>${content.currency} ${(5*(cantidad.value * content.unitCost))/100}</p>`
                        }
            }
        }
        let botonComprar = document.getElementById('btn-comprar')
        let form = document.getElementById('form-modal')
        let botonCheckModal = document.getElementById('check-modal')
        
        form.addEventListener('submit',(e)=>{
            if(!form.checkValidity()){
                e.preventDefault()
                e.stopPropagation()
            }
            form.classList.add("was-validated")
        },false)

        botonCheckModal.addEventListener('click',()=>{
            let event = new Event("click",{bubbles: true, cancelable:true})
            form.dispatchEvent(event)
            alert("puto")
        })
        
    }
        
})



    
    
    