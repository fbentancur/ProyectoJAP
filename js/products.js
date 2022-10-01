let tipoDeFiltro = "relevancia"
let orden = "descendente"
let filtroPrecioMin = undefined
let filtroPrecioMax = undefined

function mostrarProductosDeCategoria(categoria) {
    getJSONData(PRODUCTS_URL + categoria + EXT_TYPE)
        .then(result => {
            if (result.status === 'ok') {
                mostrarProductosOk(result.data.products)
            }
            else {
                mostrarError()
            }
        })
}

function mostrarProductosOk(products) {
    products = products.filter((a) => {
            if (filtroPrecioMin === undefined) {
                return true;
            }
            return a.cost >= filtroPrecioMin;
        })
        .filter((a)=>{
            if(filtroPrecioMax === undefined){
                return true;
            }
            return a.cost <= filtroPrecioMax;
        })
        .sort(compararProductos);
    let productsListDiv = document.getElementById('products-list');
    productsListDiv.innerHTML = ""
    for (let product of products) {
        productsListDiv.innerHTML += `
            <div class="product-container" identificador="${product.id}">
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
    let productsContainerArray = document.getElementsByClassName("product-container")
    for(let producto of productsContainerArray){
        producto.addEventListener("click", function(){
            localStorage.setItem("productId", producto.getAttribute('identificador'))
            RedireccionarProductInfo()
        })
    }
}
function mostrarError() {
    let divError = document.getElementById('product-error')
    divError.innerHTML += `
        <div class="alert alert-danger text-center" role="alert">
            <h4 class="alert-heading">Error al consultar los productos</h4> 
        </div>`
}

window.addEventListener("load", function () {
    mostrarProductosDeCategoria(localStorage.getItem('catID'))
    document.getElementById('filtrarMinMax').addEventListener("click",()=>{
        let minimo = document.getElementById('minimo')
        let maximo = document.getElementById('maximo')
        if(minimo.value ===undefined || minimo.value ===""){
            filtroPrecioMin = undefined
        }
        else{
            filtroPrecioMin= minimo.value;
        }
        if(maximo.value ===undefined || maximo.value ===""){
            filtroPrecioMax = undefined
        }
        else{
            filtroPrecioMax= maximo.value;
        }
        mostrarProductosDeCategoria(localStorage.getItem('catID'))

    })
    document.getElementById("precio-ascendente").addEventListener("click", () => {
        tipoDeFiltro = "precio"
        orden = "ascendente"
        mostrarProductosDeCategoria(localStorage.getItem('catID'))
    })
    document.getElementById("precio-descendente").addEventListener("click", () => {
        tipoDeFiltro = "precio"
        orden = "descendente"
        mostrarProductosDeCategoria(localStorage.getItem('catID'))
    })
    document.getElementById("relevancia").addEventListener("click", () => {
        tipoDeFiltro = "relevancia"
        orden = "descendente"
        mostrarProductosDeCategoria(localStorage.getItem('catID'))
    })
    this.document.getElementById('limpiar').addEventListener("click",()=>{
        tipoDeFiltro = "relevancia"
        orden = "descendente"
        filtroPrecioMin = undefined
        filtroPrecioMax = undefined
        document.getElementById('minimo').value="";
        document.getElementById('maximo').value="";
        mostrarProductosDeCategoria(localStorage.getItem('catID'))

    })
})

function compararProductos(a, b) {
    let aValue = tipoDeFiltro === "precio" ? a.cost : a.soldCount;
    let bValue = tipoDeFiltro === "precio" ? b.cost : b.soldCount;
    if (aValue > bValue) return orden === "ascendente" ? 1 : -1;
    else if (aValue < bValue) return orden === "ascendente" ? -1 : 1;
    else return 0;
}

function RedireccionarProductInfo(){
    window.location='product-info.html'
}

