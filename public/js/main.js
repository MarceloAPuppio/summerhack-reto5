//eliminar esta primera linea de codigo, sino no va a andar el storage;
// localStorage.clear();
let carrito = [];
if (localStorage.getItem("carrito")) {
  carrito = JSON.parse(localStorage.getItem("carrito"));
  refreshCarrito();
}

//punteros HTMLS
let btnNavShow = document.getElementById("btn-nav-show");
let btnNavHidden = document.getElementById("btn-nav-hidden");
let btnCarritoHide = document.getElementById("btn-carrito-hide");

//listeners
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

let arraySliderButtons = document.querySelectorAll(".nav--mobile__sider li");
// let arraySliderButtonsFilter=arraySliderButtons.filter((e)=>{e.inn})
for (
  let i = 1;
  /* así no toma en cuenta el icono */ i <
  arraySliderButtons.length - 1 /* así no toma en cuenta el carrito */;
  i++
) {
  arraySliderButtons[i].addEventListener("click", () => {
    window.location.assign(
      `categorias.html?categoria=${arraySliderButtons[
        i
      ].innerHTML.toLowerCase()}`
    );
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
}

function refreshCarrito() {
  document.querySelector("#li-btn-cart span").innerHTML = carrito.length;
}
