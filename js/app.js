/* ===================================
   ELEMENTOS
=================================== */

const mainImage =
  document.querySelector("#main-product-image");

const thumbnails =
  document.querySelectorAll(".thumbnail");

const sizeButtons =
  document.querySelectorAll("[data-size]");

const colorButtons =
  document.querySelectorAll("[data-color]");

const selectedColorText =
  document.querySelector("#selected-color");

const quantityText =
  document.querySelector("#quantity");

const increaseQuantity =
  document.querySelector("#increase-quantity");

const decreaseQuantity =
  document.querySelector("#decrease-quantity");

const buyButton =
  document.querySelector("#buy-button");

const mobileBuyButton =
  document.querySelector("#mobile-buy-button");

const faqQuestions =
  document.querySelectorAll(".faq-question");


/* ===================================
   ESTADO DEL PRODUCTO
=================================== */

let selectedSize = null;

let selectedColor = "Negro";

let quantity = 1;


/* ===================================
   GALERÍA
=================================== */

thumbnails.forEach((thumbnail) => {

  thumbnail.addEventListener("click", () => {

    const newImage =
      thumbnail.dataset.image;

    mainImage.style.opacity = "0";


    setTimeout(() => {

      mainImage.src = newImage;

      mainImage.style.opacity = "1";

    }, 150);


    thumbnails.forEach((item) => {

      item.classList.remove("active");

    });


    thumbnail.classList.add("active");

  });

});


/* ===================================
   TALLAS
=================================== */

sizeButtons.forEach((button) => {

  button.addEventListener("click", () => {

    selectedSize =
      button.dataset.size;


    sizeButtons.forEach((item) => {

      item.classList.remove("selected");

    });


    button.classList.add("selected");

  });

});


/* ===================================
   COLORES
=================================== */

colorButtons.forEach((button) => {

  button.addEventListener("click", () => {

    selectedColor =
      button.dataset.color;


    selectedColorText.textContent =
      selectedColor;


    colorButtons.forEach((item) => {

      item.classList.remove("active");

    });


    button.classList.add("active");

  });

});


/* ===================================
   CANTIDAD
=================================== */

increaseQuantity.addEventListener("click", () => {

  quantity++;

  quantityText.textContent =
    quantity;

});


decreaseQuantity.addEventListener("click", () => {

  if (quantity > 1) {

    quantity--;

    quantityText.textContent =
      quantity;

  }

});


/* ===================================
   FAQ
=================================== */

faqQuestions.forEach((question) => {

  question.addEventListener("click", () => {

    const answer =
      question.nextElementSibling;

    const icon =
      question.querySelector(".faq-icon");

    const isOpen =
      question.classList.contains("active");


    faqQuestions.forEach((item) => {

      item.classList.remove("active");

      item.querySelector(".faq-icon")
        .textContent = "+";

      item.nextElementSibling
        .style.maxHeight = null;

    });


    if (!isOpen) {

      question.classList.add("active");

      icon.textContent = "−";

      answer.style.maxHeight =
        answer.scrollHeight + "px";

    }

  });

});


/* ===================================
   FUNCIÓN DE COMPRA
=================================== */

function buyProduct() {

  if (!selectedSize) {

    alert(
      "Por favor selecciona una talla antes de continuar."
    );

    const sizeSection =
      document.querySelector(".size-options");


    sizeSection.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

    return;

  }


  const productData = {

    producto:
      "Nombre del producto",

    precio:
      129900,

    talla:
      selectedSize,

    color:
      selectedColor,

    cantidad:
      quantity

  };


  console.log(
    "Producto seleccionado:",
    productData
  );


  /*
  =====================================

  MÁS ADELANTE AQUÍ VAMOS A CONECTAR:

  MERCADO PAGO

  Y ENVIAREMOS:

  - Producto
  - Precio
  - Color
  - Talla
  - Cantidad

  =====================================
  */


  alert(
    `Producto listo para comprar.

Talla: ${selectedSize}
Color: ${selectedColor}
Cantidad: ${quantity}

Próximamente conectaremos Mercado Pago.`
  );

}


/* BOTÓN DESKTOP */

buyButton.addEventListener(
  "click",
  buyProduct
);


/* BOTÓN MOBILE */

mobileBuyButton.addEventListener(
  "click",
  () => {

    const productSection =
      document.querySelector("#producto");


    productSection.scrollIntoView({
      behavior: "smooth"
    });

  }
);


/* ===================================
   MENSAJE DE PRUEBA
=================================== */

console.log(
  "Landing cargada correctamente ✅"
);