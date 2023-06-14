// Llamo a los contenedores y los dejo disponibles de forma global
const contenedor = document.getElementById("contenedor");
const contenedor1 = document.getElementById("contenedor1");
const contenidoDelCarrito = document.getElementById("contenidoCarrito");
const precioTotal = document.getElementById("totalCompra");
const agregados = document.getElementById("agregados");
const botonCarrito = document.getElementById("botonDelCarrito");

//en este array guardo mis prod agregados al carrito
let productosSeleccionados = [];
console.log(productosSeleccionados+"---->test");

//aca traigo la data de los productos

fetch("/data.json")
  .then((res) => res.json())
  .then((json) => {
    //recorro el arreglo
    for (const producto of json) {
      //creo y asigno un id a mis cards, para despues modifica el css
      let divProd = document.createElement("div");
      divProd.setAttribute("id", "cards");
      //armo la card con la data q quiero mostrar
      divProd.innerHTML = `
                                            <h2>${producto.nombre}<h2/>
                                            <img class="card-img-top" src = ${producto.img}></img>
                                            <h5>Precio $ ${producto.precio}</h5>
                                            <button class="btn btn-outline-success mb-2" id="agregar${producto.id}">Agregar al carrito</button>
                                            `;
      //asigno la clase de bs para q quede en 3 cols
      divProd.className =
        "col-4 m-1 card d-flex justify-content-between align-items-center ";
      // renderizo
      contenedor.appendChild(divProd);
      //agrego eventListener para click en boton agregar, dispara toastify
      let botonAgregar = document.getElementById(`agregar${producto.id}`);
      botonAgregar.addEventListener("click", () => {
        
        
//agregue timeout, xq necesito refrescar y al refrescar, no se muestra el tosty, con el timeOut, se llega a ver la tosty =)
        setTimeout('document.location.reload()',300)
        console.log(botonAgregar.id);
        Toastify({
          text: `Agregaste ${producto.nombre}`,
          duration: 2000,
          destination: "https://github.com/apvarun/toastify-js",
          newWindow: true,
          close: true,
          gravity: "top",
          position: "left",
          stopOnFocus: true,
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          },
          onClick: function () {},
        }).showToast();
        //location.reload()
        //invoco la funcion que guarda el objeto
        agregadosAlCarrito(
          producto.id,
          producto.nombre,
          producto.precio,
          producto.img,
          producto.stock
        );
        localStorage.setItem("carrito", JSON.stringify(productosSeleccionados));
      });
      
    }
  });

  //console.log(cards +"a ver q trae");
const agregadosAlCarrito = (id, nombre, precio, img, stock) => {
  // const agregadosAlCarrito = (id) => {
  let prod = {
    id: id,
    nombre: nombre,
    precio: precio,
    img: img,
    stock: stock,
  };
  //console.log(prod.precio);
  productosSeleccionados.push(prod);
  localStorage.setItem("carrito", JSON.stringify(productosSeleccionados));

  sumarTodo();
};


function sumarTodo() {
  
//console.log(productosSeleccionados+"vamo a ver");
  let cantidad = Object.values(productosSeleccionados).reduce((acc, {stock}) => acc + stock, 0);
  agregados.innerHTML = cantidad;
  console.log(cantidad);
  let todoElprecio = Object.values(productosSeleccionados).reduce((acc, {precio, stock})=> acc + precio * stock, 0)
  precioTotal.innerHTML = todoElprecio;
  //console.log(todoElprecio);
  
}

function restarTodo() {
  
  //console.log(productosSeleccionados+"vamo a ver");

    let cantidad = Object.values(productosSeleccionados).reduce((acc, {stock}) => acc + stock, 0);
    agregados.innerHTML = cantidad;
    console.log(cantidad+"borrado");
    
    let todoElprecio = Object.values(productosSeleccionados).reduce((acc, {precio, stock})=> acc + precio * stock, 0)
    precioTotal.innerHTML = todoElprecio;
    //console.log(todoElprecio);
    
  }


const eliminarProd = (id) => {
  let json = localStorage.getItem("carrito");
  productosSeleccionados = JSON.parse(json);

  let prodABorrar = productosSeleccionados.filter(
    (carrito) => carrito.id != id
  );
  localStorage.setItem("carrito", JSON.stringify(prodABorrar));
  
  sumarTodo();
  //location.reload();
};

// con esto guardo los cambios, lo voy a comentar, a ver si se me ocurre algo mejor.
function guardar() {
  let almacenarCarrito = JSON.parse(localStorage.getItem("carrito"));
  
  almacenarCarrito.forEach((element) => {
    agregadosAlCarrito(
      element.id,
      element.nombre,
      element.precio,
      element.img,
      element.stock
    );
    let divTest = document.createElement("div");
    divTest.innerHTML = `
      
      <h2>${element.nombre}</h2>
      <img class="img-fluid" src="${element.img}"></img>
      <h5>Precio: $${element.precio}</h5>
      <button id="eliminar${element.id}" type="button" class="btn btn-outline-danger d-grid gap-2 col-6 mx-auto mt-2 mb-2">Quitar del Carrito</button>
      `;
      
      
    contenidoDelCarrito.appendChild(divTest);
    sumarTodo();
    
    //voy a llamar al boton eliminar

    let botonEliminarProd = document.getElementById(`eliminar${element.id}`);
    //agrego eventlistener al hacer click
    botonEliminarProd.addEventListener("click", () => {
      //invoco a la función borrar
      eliminarProd(element.id);
      //y llamo a un tosty q me muestre lo q borre
      Toastify({
        text: `Eliminaste ${element.nombre} del carrito`,
        duration: 2000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to left, #f50707, #eeaeae)",
        },
        onClick: function () {},
      }).showToast();
      //borro el objeto creado en el carrito
      divTest.remove();
      restarTodo();
      //location.reload();
    });
    
  });
}

guardar();

/* 

me falta lograr que el reduce, muestre un solo html cuando elijo el mismo producto y aumente su cantidad seleccionada
me falta que se resten bien los productos, cuando los elimino. En realidad se descuentan pero es como que va atrasado
de este ultimo punto, se desprende, que cuando elimino todo lo del carrito, siempre me queda en el boton, el 1, x eso
creo que va como "atrasado"

*/
