const contenedor = document.getElementById("contenedor");
const contenedor1 = document.getElementById("contenedor1");

const accesoUsuarios = document.getElementById("login");

 let productos = [
   {
    id: 1,
     nombre: "Planta 1",
     precio: 1000,
     img: "../assets/images/galeria05-640x503.webp",
   },
   {
     id: 2,
     nombre: "Planta 2",
     precio: 2000,
     img: "../assets/images/galeria02-640x690.webp",
   },
   {
     id: 3,
     nombre: "Planta 3",
     precio: 3000,
     img: "../assets/images/galeria03-640x503.webp",
   },
   {
     id: 4,
     nombre: "Planta 4",
     precio: 4000,
     img: "../assets/images/galeria04-640x360.webp",
   },
 ];

localStorage.setItem("productos", JSON.stringify(productos));

//let productos = JSON.parse(localStorage.getItem("productos"));
let carrito = document.getElementById("carrito");

function limpiarContenedor() {
  contenedor1.innerHTML = "";
}

for (const producto of productos) {
  let divProd = document.createElement("div");
  divProd.innerHTML = `
                              <h2>Productos Disponibles<h2/>
                              <h3> ID: ${producto.id}</h3> 
                              <p>  Producto: ${producto.nombre}</p>
                              <b>  Precio $ ${producto.precio}</b>
                              </br>
                              <img src = ${producto.img}></img>
                              </br>
                              <button id="agregar${producto.id}">Agregar al carrito <button id= "quitar${producto.id}">Quitar del carrito</button>
                              
                              <hr />
                              `;
                              // divProd.className = "col";
                              // divProd.className = "card shadow-sm";
                              divProd.className = "col card shadow-sm d-flex justify-content-between align-items-center";
  contenedor.append(divProd);
}

let formulario = document.getElementById("formulario");
formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  let valorInput = e.target.children;

  console.log(valorInput[1].value);
  if (valorInput[0].value <= 0) {
    alert("Por favor ingrese un numero mayor");
    document.body.append(div);
  } else if (valorInput[1].value > 0) {
    limpiarContenedor();

    let filtrados = productos.filter(
      (item) => item.precio >= valorInput[1].value
    );
    console.log("entre al elseif" + valorInput[1].value);
    filtrados.forEach((item) => {
      let divProductos = document.createElement("div");

      divProductos.innerHTML = `
          
          <h2>Productos Filtrados<h2/>
          <h3>ID: ${item.id}</h3>
          <p>Nombre: ${item.nombre}</p>
          <b>Precio: $${item.precio}</b>
          </br>
          <img src = ${item.img}></img>
          </br>
          <button id="agregar${item.id}">Agregar al carrito <button id= "quitar${item.id}">Quitar del carrito</button>
          <hr />
          
          `;
          divProductos.className = "col card shadow-sm d-flex justify-content-between align-items-center";
      contenedor1.append(divProductos);
    });
  } else {
    alert("producto no encontrado");
  }
});

