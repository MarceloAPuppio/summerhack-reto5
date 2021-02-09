//eliminar esta primera linea de codigo, sino no va a andar el storage;
localStorage.clear();
let carrito = [];
if (localStorage.getItem("carrito")) {
  carrito = JSON.parse(localStorage.getItem("carrito"));
  refreshCarrito();
}
//Arreglo del Carrito  + Local storage

//punteros HTMLS
let btnNavShow = document.getElementById("btn-nav-show");
let btnNavHidden = document.getElementById("btn-nav-hidden");
let btnCarritoHide = document.getElementById("btn-carrito-hide");

//addEventlisteners
btnNavShow.addEventListener("click", () => {
  document
    .querySelector(".nav--mobile__sider")
    .classList.add("translateX-efect");
});
btnNavHidden.addEventListener("click", () => {
  document
    .querySelector(".nav--mobile__sider")
    .classList.remove("translateX-efect");
});
btnCarritoHide.addEventListener("click", () => {
  document
    .getElementById("pantalla-carrito")
    .classList.remove("translateY-efect");
});
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
                document.getElementById("pantalla-home").style.display="none";
                document.getElementById("pantalla-categorias").style.display="flex";
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
            refreshCarrito();
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
            refreshCarrito();
            localStorage.setItem("carrito", JSON.stringify(carrito));
          });
      });
      document.getElementById("pantalla-loading").style.display = "none";
    });
}
function carritoPush(item) {
  carrito.push(item);
}

let btnCarrito = document.getElementById("li-btn-cart");
btnCarrito.addEventListener("click", () => {
  renderizarCarrito();
});
function renderizarCarrito() {
  let pantallaCarrito = document.getElementById("pantalla-carrito");
  let listadoCarrito = document.getElementById("listado-carrito").content;
  document.getElementById("body-item-container").innerHTML = "";
  let total = 0;
  carrito.map((e) => {
    total += e.price;
    listadoCarrito.querySelector(".item-container__img").src = e.image;
    listadoCarrito.querySelector(".item-container__title").textContent =
      e.title;
    listadoCarrito.querySelector(
      ".item-container__price"
    ).textContent = e.price.toFixed(2);
    let clone = listadoCarrito.cloneNode(true);
    document.getElementById("body-item-container").appendChild(clone);
    document.getElementById("footerPrice").innerHTML = total.toFixed(2);
    pantallaCarrito.classList.add("translateY-efect");
    document
      .querySelector(".nav--mobile__sider")
      .classList.remove("translateX-efect");
  });
  // console.log(carrito);
  // console.log(JSON.parse(localStorage.getItem("carrito")));
}

function refreshCarrito() {
  document.querySelector("#li-btn-cart span").innerHTML = carrito.length;
}
