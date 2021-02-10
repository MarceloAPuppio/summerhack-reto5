//Tomamos el valor de  win.location
let objetoUrl = {};
let parameter = window.location.search.substring(1); //básicamente le quito el '?'
//hago esto en caso que en algún momento utilice algún parameter más
let arrayParameter = parameter.split("&");
for (let i = 0; i < arrayParameter.length; i++) {
  let arrayVariable = arrayParameter[i].split("="); //Acá estamos haciendo un arreglo con el nombre y el valor de la variable.
  objetoUrl[arrayVariable[0]] = arrayVariable[1];
}
console.log(objetoUrl);

renderizarListadoProductos(
  `https://fakestoreapi.com/products/category/${objetoUrl.categoria}`
);

function renderizarListadoProductos(url) {
  document.getElementById("pantalla-loading").style.display = "flex";
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      document.getElementById(
        "pantalla-categorias"
      ).innerHTML = `<h2 class="pantalla-categoria__titulo">${objetoUrl.categoria.replace(
        "%20",
        " "
      )}<h2>`;
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
        document
          .getElementsByClassName("btn-ampliar")
          [i].addEventListener("click", () => {
            renderizarDetalle(item);
            document
            .getElementById("pantalla-product-detail")
            .classList.add("translateY-efect-down");
          });
      });
      document.getElementById("pantalla-loading").style.display = "none";
    });
}

function renderizarDetalle(item) {
  const templateDetail = document.getElementById("pantalla-detail").content;
  let fragment = document.createDocumentFragment();
  templateDetail.getElementById("detail-image").src = item.image;
  templateDetail.getElementById("detail-description").innerHTML =
    item.description;
  templateDetail.getElementById("detail-title").innerHTML = item.title;
  templateDetail.getElementById("detail-price").innerHTML = item.price;
  templateDetail.getElementById("detail-btn").addEventListener("click", () => {
    carritoPush(item);
    refreshCarrito();
    localStorage.setItem("carrito", JSON.stringify(carrito));
  });
  let clone = templateDetail.cloneNode(true);
  fragment.appendChild(clone);
  let pantallaDetail = document.getElementById("pantalla-product-detail");
  pantallaDetail.innerHTML=`<h1 id="btn-detail">&times</h1>`
  pantallaDetail.appendChild(fragment);
  pantallaDetail.style.display = "flex";
  document.getElementById('btn-detail').addEventListener("click", () => {
    document
    .getElementById("pantalla-product-detail")
    .classList.remove("translateY-efect-down");
  });
}
