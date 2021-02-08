//eliminar esta primera linea de codigo, sino no va a andar el storage;
// localStorage.clear();
let carrito = [];
if (localStorage.getItem("carrito")) {
  carrito = JSON.parse(localStorage.getItem("carrito"));
}
//Arreglo del Carrito  + Local storage

//addEventlisteners

let PromesaCategorias;
let PromesaProductoDestacado;

PromesaCategorias = new Promise((res, rej) => {
  res(
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((json) => {
        json.map((item, i) => {
          let fragment = document.createDocumentFragment();
          templateHomeCategoría.querySelector("img").src = `images/${item}.png`;
          templateHomeCategoría.querySelector("h2").textContent = item;
          let clon = templateHomeCategoría.cloneNode(true);
          fragment.appendChild(clon);
          document
            .querySelector(".pantalla-home__categorias-container")
            .appendChild(fragment);
          document
            .querySelector(
              `.pantalla-home__categoria-container:nth-child(${i + 1})`
            )
            .addEventListener("click", function () {
              renderizarListadoProductos(
                `https://fakestoreapi.com/products/category/${item}`
              );
            });
        });
      })
  );
});

PromesaProductoDestacado = new Promise((res, rej) => {
  res(
    fetch(
      `https://fakestoreapi.com/products/${Math.round(Math.random() * 19) + 1}`
    )
      .then((res) => res.json())
      .then((json) => {
        document.getElementById("destacado-image").src = json.image;
        document.getElementById("destacado-title").innerHTML = json.title;
        document.getElementById("destacado-description").innerHTML =
          json.description;
        document.getElementById("destacado-price").innerHTML = json.price;
        document
          .getElementById("destacado-btn")
          .addEventListener("click", () => {
            carritoPush(json);
            console.log(carrito);
            localStorage.setItem("carrito", JSON.stringify(carrito));
          });
      })
  );
});

Promise.all([PromesaCategorias, PromesaProductoDestacado]).then(() => {
  document.getElementById("pantalla-loading").style.display = "none";
});

const templateHomeCategoría = document.getElementById("home-categoría").content;

function renderizarListadoProductos(url) {
  document.getElementById("pantalla-loading").style.display = "flex";
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      document.getElementById("pantalla-categorias").innerHTML = "";
      let templateCategoria = document.getElementById("listado-categoria")
        .content;
      json.map((item, i) => {
        templateCategoria.querySelector(".pantalla-categoria__img").src =
          item.image;
        templateCategoria.querySelector(
          ".pantalla-categoria__productname"
        ).textContent = item.title;
        templateCategoria.querySelector(
          ".pantalla-categoria__productprice"
        ).textContent = item.price;

        let fragment = document.createDocumentFragment();
        let clon = templateCategoria.cloneNode(true);
        fragment.appendChild(clon);
        document.getElementById("pantalla-categorias").appendChild(fragment);
        document
          .getElementsByClassName("pantalla-categoria__button")
          [i].addEventListener("click", () => {
            carritoPush(item);
            localStorage.setItem("carrito", JSON.stringify(carrito));
          });
      });
      document.getElementById("pantalla-loading").style.display = "none";
    });
}
function carritoPush(item) {
  carrito.push(item);
}

let btnCarrito = document.getElementById("btn-carrito");
btnCarrito.addEventListener("click", () => {
  renderizarCarrito();
});
function renderizarCarrito() {
  alert("renderizandoooou");
  let pc = document.getElementById("pantalla-carrito");

  console.log(carrito);
  console.log(JSON.parse(localStorage.getItem("carrito")));
}
