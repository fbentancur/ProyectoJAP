let infoContainer = document.getElementById("contenedorDeInformacionDeProducto")

fetch(PRODUCT_INFO_URL+localStorage.getItem('productId')+EXT_TYPE)
.then(response => response.json())
.then(data => {
    console.log(data)
    let temporal =""
    temporal+=
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
        temporal+=`<div id="imagenesDeProductos">`
        for(let imagen of data.images){
          temporal+= `<div class="divImagenIndividual"><img src="${imagen}" class="product_image"></div>`
            
            
        }
        temporal+=`</div>`
        infoContainer.innerHTML = temporal
})

