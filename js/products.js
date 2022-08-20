function mostrarProductosDeCategoria(categoria){
    getJSONData(PRODUCTS_URL + categoria + EXT_TYPE)
        .then(result => {
            if(result.status === 'ok'){
                mostrarProductosOk(result.data.products)
            }
            else{
                mostrarError(result.data)
            }
        })
}
function mostrarProductosOk(products){
    let productsListDiv= document.getElementById('products-list')
    for(let product of products){
        productsListDiv.innerHTML+=`
            <div class="product-container">
                <div class="product-image">
                    <img src="${product.image}" alt="" width="100%" >
                </div>
                <div class="product-description">
                    <h4>${product.name} ${product.cost} ${product.currency}</h4>
                    <p>${product.description}</p>
                </div>
                <div>
                    <span>${product.soldCount} Vendidos </span>
                </div>
            </div>`
    }
}
function mostrarError(error){
   /* to do <h4 class="alert-heading">Funcionalidad en desarrollo</h4> */
}
window.addEventListener("load", function(){
    mostrarProductosDeCategoria(101)
})