//Pedidos de cafe y guardar todos los pedidos en un array
const pedidos = JSON.parse(localStorage.getItem('1')) || [];

function shop(coffe_name, coffe_price, coffe_img, coffe_id) {
    //Declarar variables nombre y precio
    let cafe = coffe_name;
    let valor = coffe_price;
    let imagen = coffe_img;
    let id = coffe_id;

    //Declarar objeto de pedidos
    class Pedidos {
        constructor(cafe, valor, imagen, id) {
            this.coffe = cafe;
            this.price = valor;
            this.img = imagen;
            this.id = id;
        }
    }

    //Agregar pedido a la lista de pedidos
    const agregarPedidos = new Pedidos (cafe, valor, imagen, id);
    pedidos.push(agregarPedidos);
    console.log("Hola:");
    console.log(Pedidos);

    //Alerta de pedido realizado
    Toastify({
        text: "Successfully added " + cafe + " to cart.",
        duration: 3000,
        newWindow: false,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
        background: "linear-gradient(to right top, #00b09b, #1db3a0, #2cb6a5, #38b9a9, #43bcae)",
        },
    }).showToast();

    //Almacenar informacion pedido
    const pedidoAJson = JSON.stringify(pedidos);
    //console.log(pedidoAJson);
    localStorage.setItem('1',pedidoAJson);  
}

//Obtener productos del LocalStorage para el carrito
function cart(){
    //Obtener Json
    let pedidosJson = localStorage.getItem('1');
    //Json => Objeto (pedidosCart)
    const pedidosCart = JSON.parse(pedidosJson);

    console.log("Pedidos carrito: ");
    console.log(pedidosCart);

    //Contenedores 
    let conteiner = document.getElementById("detail_coffe");
    const conteinerResume = document.getElementById("checkout_coffe");

    //Verificar si hay productos en el carrito
    if (pedidosCart == null || pedidosCart.length === 0) {
        //Si el carrito no tiene productos
        boxCart = document.createElement("div");
        boxCart.innerHTML = "<p class='empty-cart'>Your shopping cart is currently empty.</p>";
        conteiner.appendChild(boxCart);        
    } else {
        //Productos del carrito
        for (const element of pedidosCart) {
            let Coffe = element.coffe;
            let Precio = element.price;
            let img = element.img;

            //Obtener indice
            let index = pedidosCart.indexOf(element);

            //Por cada elemento de pedidosCart crear un elemento
            boxCart = document.createElement("div");
            boxCart.innerHTML = "<div id=" + Coffe + " class='container-fluid product_cart'><div class='img_cart'><img src='../img/" + img + "' alt=''></div><div class='info_cart'><h3>" + Coffe + "</h3><p class='price'>$" + Precio + "</p></div><button onclick='eliminarProductosCarrito(" + index + ")'>X</button></div>";
            conteiner.appendChild(boxCart);
        }

        //Informacion de compra y boton compra
        boxCheckout = document.createElement("div");
        boxCheckout.innerHTML = "<button class='buttonBuy btn' onclick='finalizarCompra()'>BUY</button>";
        conteinerResume.appendChild(boxCheckout);
    }
}

//Obtener productos de Api Caramel_Coffe
const conteinerProducts = document.getElementById("productos");

function obtenerProductos() {
    let comillas = "'";

    fetch("https://62e86860249bb1284eae24fa.mockapi.io/Caramel_Coffe")
    .then((response) => response.json())
    .then((data) => {

    console.log(data);

    //Acceder a la informacion
    data.forEach((producto) => {
        const boxProduct = document.createElement("article");
        boxProduct.className = 'row container card col-xl-3 col-lg-4 col-md-6 col-12 product_info';
        boxProduct.innerHTML = '<div class="card-img"><img class="card-img-top" src="../img/' + producto.img +'" alt="Producto Cafe"></div><div class="card-body"><div><h3 class="card-title">' + producto.name +'</h3><p class="card-text">' + producto.info +'</p></div><div><p class="card-text card-price"> $' + producto.price +'</p></div></div><div class="card-btn"><a class="btn-shop" onclick="shop(' + comillas + producto.name + comillas + ',' + producto.price + ',' +comillas + producto.img + comillas+',' +comillas + producto.id + comillas+')">Add to Cart</a></div>';
        conteinerProducts.appendChild(boxProduct);   
    })
    });
}

//Finalizar compra
function finalizarCompra() {
    //Alerta de pedido realizado
    const promesa = new Promise(function(myResolve, myReject) {
        setTimeout(function(){ myResolve("Purchase successful."); }, 500);
    });

    promesa.then(function(value) {
        Toastify({
            text: value,
            duration: 3000,
            newWindow: false,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
            background: "linear-gradient(to right top, #00b09b, #1db3a0, #2cb6a5, #38b9a9, #43bcae)",
            },
        }).showToast();
    });

    //Eliminar datos del Local Storage
    localStorage.clear();

    //Set time out
    setTimeout(()=> {location.href = "../index.html";},2000);
}

//Eliminar productos del carrito
function eliminarProductosCarrito(i) {
    //Obtener Json
    let pedidosJson = localStorage.getItem('1');

    //Json => Objeto (pedidosCart)
    const lista = JSON.parse(pedidosJson);

    //Eliminar producto
    lista.splice(i, 1);

    //Almacenar informacion pedido
    const listaJSON = JSON.stringify(lista);
    console.log(listaJSON);
    localStorage.setItem('1',listaJSON);  

    //Actualizar
    location.reload();
}

//Ejecutar funciones
function main() {
    obtenerProductos();
    cart();
}

main();


/*
//Registrar Productos en Api Caramel Coffe
function registrarProductos(producto) {
    fetch("https://62e86860249bb1284eae24fa.mockapi.io/Caramel_Coffe",{
        //Crear objeto de configuracion
        method:"POST",
        //Enviar el objeto
        body: JSON.stringify(producto),
        headers: {"Content-type":"application/json"}
    }) 
        .then((response) => response.json())
        .then((data) => console.log(data));
} 

//Crear objeto producto
const productoRegistrar = {
    name:"Café cortado",
    price:"500",
    info:"El tipo de café que más se utiliza y a su vez que más apreciado resulta es el que se corresponde con las primeras variantes utilizadas para elaborar la bebida: el café arábica.",
};

registrarProductos(productoRegistrar);
*/