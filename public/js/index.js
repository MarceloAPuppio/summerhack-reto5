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
              window.location.assign(`categorias.html?categoria=${item}`);
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
