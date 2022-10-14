let infoContainer = document.getElementById("contenedorDeInformacionDeProducto")
let commentContainer = document.getElementById("contenedor-de-comentarios")
let botonComentario = document.getElementById("enviar-comentario")
let productosRelacionados = document.getElementById('productosRelacionados')



fetch(PRODUCT_INFO_URL+localStorage.getItem('productId')+EXT_TYPE)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        let temporalInfo =""
        temporalInfo+=
        `<div>
            <h1>${data.name}</h1>
            <hr>
        </div>
        <div>
            <ul>
                <li><b>Precio</b><br>${data.currency}: ${data.cost}</li><br>
                <li><b>Descripción</b><br>${data.description}</li><br>
                <li><b>Categoría</b><br>${data.category}</li><br>
                <li><b>Cantidad de Vendidos</b><br>${data.soldCount}</li><br>
            </ul>
            
        </div> 
        <h2>Imagenes ilustrativas:</h2>`
        temporalInfo+=`<div id="imagenesDeProductos">`
        for(let imagen of data.images){
        temporalInfo+= `<div class="divImagenIndividual"><img src="${imagen}" class="product_image"></div>`    
        }

        
        for(let productoRelacionado of data.relatedProducts){
            let divRelatedProduct=document.createElement("div")
            divRelatedProduct.innerHTML+=`<div id="contenedorProductoRelacionado"><h3>${productoRelacionado.name}</h3>
            <img class='relatedProductImage' src="${productoRelacionado.image}"></div></div>`

            productosRelacionados.appendChild(divRelatedProduct)
            divRelatedProduct.addEventListener("click",()=>{
                localStorage.removeItem("productId")
                localStorage.setItem("productId",productoRelacionado.id)
                location.reload();
            })  
        }
        temporalInfo+=`</div>`
        infoContainer.innerHTML = temporalInfo
        

})

fetch(PRODUCT_INFO_COMMENTS_URL+localStorage.getItem('productId')+EXT_TYPE)
    .then(response => response.json())
    .then(dataComment => {
        let temporalComments = ""
        temporalComments+=`<div class="caja_de_comentarios">`
        for(let comentarioData of dataComment){
            let estrellas = ""
            for(let i =0; i < comentarioData.score; i++){
                estrellas+=`<span class="fa fa-star checked"></span>`
            }
            for(let i =0; i < 5-comentarioData.score; i++){
                estrellas+=`<span class="fa fa-star"></span>`
            }
            temporalComments +=`
            <div class="comentario">
                <span><b>${comentarioData.user}</b> ${comentarioData.dateTime} ${estrellas}</span>
                <p>${comentarioData.description}</p>
            </div>`
        }
        temporalComments+=`</div>`
        commentContainer.innerHTML=temporalComments
    })

    botonComentario.addEventListener('click', function(){
        location.reload();
    } )

