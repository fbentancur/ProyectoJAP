function mostrarProductosDeCategoria(categoria){
    getJSONData(PRODUCTS_URL + categoria + EXT_TYPE)
        .then(result => {
            if(result.status === 'ok'){
                mostrarProductosOk(result.data.products)
            }
            else{
                mostrarError()
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
function mostrarError(){
    let divError = document.getElementById('product-error')
    divError.innerHTML+=`
        <div class="alert alert-danger text-center" role="alert">
            <h4 class="alert-heading">Error al consultar los productos</h4> 
        </div>`
}
window.addEventListener("load", function(){
    mostrarProductosDeCategoria(localStorage.getItem('catID'))
})