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
                    <td><input type="number" id="cantidad-productos+${content.id}" class="input-cantidad" value="${content.count}"></td>
                    <td id="precio-total">${content.unitCost*content.count}</td>
                </tr>
            </tbody>
        </table>
    </div>
            `
            cartContent.innerHTML+=contentForInner

            let cantidad = document.getElementById(`cantidad-productos+${content.id}`)
            cantidad.addEventListener("change",()=>{
            let coste = document.getElementById("precio-total")
            coste.innerHTML=`${cantidad.value * content.unitCost}`
            
        })
        }
        
    })
    
   
    
    