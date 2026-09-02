/* ==========================================
   RS IMPORTS
   CAJA FUERTE DIGITAL
========================================== */


/* ==========================================
   PRODUCTO
========================================== */

const product = {

  name:
    "Caja Fuerte Digital de Acero Reforzado",

  price:
    129900

};


let quantity = 1;


/* ==========================================
   FORMATEAR PRECIO
========================================== */

function formatPrice(value) {

  return new Intl.NumberFormat(
    "es-CO",
    {

      style: "currency",

      currency: "COP",

      maximumFractionDigits: 0

    }

  ).format(value);

}


/* ==========================================
   GALERÍA
========================================== */

const mainProductImage =
  document.querySelector("#main-product-image");

const mainProductVideo =
  document.querySelector("#main-product-video");

const mediaThumbnails =
  document.querySelectorAll(".thumbnail");

const videoThumbnailPreview =
  document.querySelector(
    ".video-thumbnail-preview"
  );


if (videoThumbnailPreview) {

  videoThumbnailPreview.addEventListener(
    "loadedmetadata",
    () => {

      if (
        videoThumbnailPreview.duration > 1
      ) {

        videoThumbnailPreview.currentTime =
          0.5;

      }

    }
  );

}


/* ==========================================
   ZOOM
========================================== */

const zoomButton =
  document.querySelector("#zoom-button");

const zoomModal =
  document.querySelector("#zoom-modal");

const zoomImage =
  document.querySelector("#zoom-image");

const zoomClose =
  document.querySelector("#zoom-close");


/* ==========================================
   CAMBIO DE MEDIA
========================================== */

mediaThumbnails.forEach((thumbnail) => {

  thumbnail.addEventListener(
    "click",
    () => {

      const type =
        thumbnail.dataset.type;

      const media =
        thumbnail.dataset.media;


      mediaThumbnails.forEach((item) => {

        item.classList.remove("active");

      });


      thumbnail.classList.add("active");


      /* FOTO */

      if (type === "image") {

        if (mainProductVideo) {

          mainProductVideo.pause();

          mainProductVideo.style.display =
            "none";

        }


        mainProductImage.style.display =
          "block";

        mainProductImage.style.opacity =
          "0";


        setTimeout(() => {

          mainProductImage.src =
            media;

          mainProductImage.style.opacity =
            "1";

        }, 120);


        if (zoomButton) {

          zoomButton.style.display =
            "";

        }

      }


      /* VIDEO */

      if (type === "video") {

        mainProductImage.style.display =
          "none";


        mainProductVideo.style.display =
          "block";


        if (zoomButton) {

          zoomButton.style.display =
            "none";

        }


        const source =
          mainProductVideo.querySelector(
            "source"
          );


        if (
          source &&
          source.getAttribute("src") !== media
        ) {

          source.src =
            media;

          mainProductVideo.load();

        }


        mainProductVideo
          .play()
          .catch(() => {});

      }

    }
  );

});


/* ==========================================
   ABRIR ZOOM
========================================== */

if (
  zoomButton &&
  zoomModal &&
  zoomImage
) {

  zoomButton.addEventListener(
    "click",
    () => {

      zoomImage.src =
        mainProductImage.src;

      zoomImage.classList.remove(
        "zoomed"
      );

      zoomModal.classList.add(
        "active"
      );

      document.body.style.overflow =
        "hidden";

    }
  );

}


if (zoomImage) {

  zoomImage.addEventListener(
    "click",
    () => {

      zoomImage.classList.toggle(
        "zoomed"
      );

    }
  );

}


function closeZoom() {

  if (!zoomModal) {
    return;
  }


  zoomModal.classList.remove(
    "active"
  );


  if (zoomImage) {

    zoomImage.classList.remove(
      "zoomed"
    );

  }


  document.body.style.overflow =
    "";

}


if (zoomClose) {

  zoomClose.addEventListener(
    "click",
    closeZoom
  );

}


/* ==========================================
   CANTIDAD PDP
========================================== */

const quantityText =
  document.querySelector("#quantity");

const increaseQuantity =
  document.querySelector(
    "#increase-quantity"
  );

const decreaseQuantity =
  document.querySelector(
    "#decrease-quantity"
  );


if (increaseQuantity) {

  increaseQuantity.addEventListener(
    "click",
    () => {

      quantity++;

      updateAllQuantities();

    }
  );

}


if (decreaseQuantity) {

  decreaseQuantity.addEventListener(
    "click",
    () => {

      if (quantity > 1) {

        quantity--;

        updateAllQuantities();

      }

    }
  );

}


/* ==========================================
   CART
========================================== */

const cartDrawer =
  document.querySelector("#cart-drawer");

const cartOverlay =
  document.querySelector("#cart-overlay");

const cartClose =
  document.querySelector("#cart-close");

const cartQuantityText =
  document.querySelector("#cart-quantity");

const cartIncrease =
  document.querySelector("#cart-increase");

const cartDecrease =
  document.querySelector("#cart-decrease");

const cartSubtotal =
  document.querySelector("#cart-subtotal");

const cartTotal =
  document.querySelector("#cart-total");


function updateCartTotals() {

  const total =
    product.price * quantity;


  if (cartQuantityText) {

    cartQuantityText.textContent =
      quantity;

  }


  if (cartSubtotal) {

    cartSubtotal.textContent =
      formatPrice(total);

  }


  if (cartTotal) {

    cartTotal.textContent =
      formatPrice(total);

  }

}


function openCart() {

  updateCartTotals();


  cartDrawer.classList.add(
    "active"
  );


  cartOverlay.classList.add(
    "active"
  );


  document.body.style.overflow =
    "hidden";

}


function closeCart() {

  if (cartDrawer) {

    cartDrawer.classList.remove(
      "active"
    );

  }


  if (cartOverlay) {

    cartOverlay.classList.remove(
      "active"
    );

  }


  document.body.style.overflow =
    "";

}


if (cartIncrease) {

  cartIncrease.addEventListener(
    "click",
    () => {

      quantity++;

      updateAllQuantities();

    }
  );

}


if (cartDecrease) {

  cartDecrease.addEventListener(
    "click",
    () => {

      if (quantity > 1) {

        quantity--;

        updateAllQuantities();

      }

    }
  );

}


if (cartClose) {

  cartClose.addEventListener(
    "click",
    closeCart
  );

}


if (cartOverlay) {

  cartOverlay.addEventListener(
    "click",
    closeCart
  );

}


/* ==========================================
   BOTONES PRINCIPALES
========================================== */

const buyButton =
  document.querySelector("#buy-button");

const codBuyButton =
  document.querySelector("#cod-buy-button");

const mobileBuyButton =
  document.querySelector(
    "#mobile-buy-button"
  );


/* COMPRAR NORMAL -> CARRITO */

if (buyButton) {

  buyButton.addEventListener(
    "click",
    openCart
  );

}


if (mobileBuyButton) {

  mobileBuyButton.addEventListener(
    "click",
    openCart
  );

}


/* ==========================================
   CHECKOUT CONTRA ENTREGA
========================================== */

const codCheckoutPanel =
  document.querySelector("#checkout-panel");

const codCheckoutOverlay =
  document.querySelector("#checkout-overlay");

const codCheckoutClose =
  document.querySelector("#checkout-close");

const codCheckoutForm =
  document.querySelector("#checkout-form");

const codCheckoutProductQuantity =
  document.querySelector(
    "#checkout-product-quantity"
  );

const codCheckoutProductPrice =
  document.querySelector(
    "#checkout-product-price"
  );

const codCheckoutSubtotal =
  document.querySelector(
    "#checkout-subtotal"
  );

const codCheckoutTotal =
  document.querySelector(
    "#checkout-total"
  );


function updateCodCheckout() {

  const total =
    product.price * quantity;


  if (codCheckoutProductQuantity) {

    codCheckoutProductQuantity.textContent =
      quantity;

  }


  if (codCheckoutProductPrice) {

    codCheckoutProductPrice.textContent =
      formatPrice(total);

  }


  if (codCheckoutSubtotal) {

    codCheckoutSubtotal.textContent =
      formatPrice(total);

  }


  if (codCheckoutTotal) {

    codCheckoutTotal.textContent =
      formatPrice(total);

  }

}


/* ABRIR CONTRA ENTREGA */

function openCodCheckout() {

  closeCart();

  updateCodCheckout();


  codCheckoutPanel.classList.add(
    "active"
  );


  codCheckoutOverlay.classList.add(
    "active"
  );


  codCheckoutPanel.setAttribute(
    "aria-hidden",
    "false"
  );


  document.body.style.overflow =
    "hidden";

}


/* CERRAR CONTRA ENTREGA */

function closeCodCheckout() {

  codCheckoutPanel.classList.remove(
    "active"
  );


  codCheckoutOverlay.classList.remove(
    "active"
  );


  codCheckoutPanel.setAttribute(
    "aria-hidden",
    "true"
  );


  document.body.style.overflow =
    "";

}


/* BOTÓN DIRECTO CONTRA ENTREGA */

if (codBuyButton) {

  codBuyButton.addEventListener(
    "click",
    openCodCheckout
  );

}


if (codCheckoutClose) {

  codCheckoutClose.addEventListener(
    "click",
    closeCodCheckout
  );

}


/* ==========================================
   CHECKOUT ONLINE
========================================== */

const onlineCheckoutPanel =
  document.querySelector(
    "#online-checkout-panel"
  );

const onlineCheckoutOverlay =
  document.querySelector(
    "#online-checkout-overlay"
  );

const onlineCheckoutClose =
  document.querySelector(
    "#online-checkout-close"
  );

const onlineCheckoutForm =
  document.querySelector(
    "#online-checkout-form"
  );

const onlineCheckoutProductQuantity =
  document.querySelector(
    "#online-checkout-product-quantity"
  );

const onlineCheckoutProductPrice =
  document.querySelector(
    "#online-checkout-product-price"
  );

const onlineCheckoutSubtotal =
  document.querySelector(
    "#online-checkout-subtotal"
  );

const onlineCheckoutTotal =
  document.querySelector(
    "#online-checkout-total"
  );


function updateOnlineCheckout() {

  const total =
    product.price * quantity;


  if (onlineCheckoutProductQuantity) {

    onlineCheckoutProductQuantity.textContent =
      quantity;

  }


  if (onlineCheckoutProductPrice) {

    onlineCheckoutProductPrice.textContent =
      formatPrice(total);

  }


  if (onlineCheckoutSubtotal) {

    onlineCheckoutSubtotal.textContent =
      formatPrice(total);

  }


  if (onlineCheckoutTotal) {

    onlineCheckoutTotal.textContent =
      formatPrice(total);

  }

}


/* ABRIR ONLINE */

function openOnlineCheckout() {

  closeCart();

  updateOnlineCheckout();


  onlineCheckoutPanel.classList.add(
    "active"
  );


  onlineCheckoutOverlay.classList.add(
    "active"
  );


  onlineCheckoutPanel.setAttribute(
    "aria-hidden",
    "false"
  );


  document.body.style.overflow =
    "hidden";

}


/* CERRAR ONLINE */

function closeOnlineCheckout() {

  onlineCheckoutPanel.classList.remove(
    "active"
  );


  onlineCheckoutOverlay.classList.remove(
    "active"
  );


  onlineCheckoutPanel.setAttribute(
    "aria-hidden",
    "true"
  );


  document.body.style.overflow =
    "";

}


/* ==========================================
   FINALIZAR COMPRA DEL CARRITO
   AHORA ABRE CHECKOUT ONLINE
========================================== */

const checkoutButton =
  document.querySelector(
    "#checkout-button"
  );


if (checkoutButton) {

  checkoutButton.addEventListener(
    "click",
    openOnlineCheckout
  );

}


if (onlineCheckoutClose) {

  onlineCheckoutClose.addEventListener(
    "click",
    closeOnlineCheckout
  );

}


/* ==========================================
   ACTUALIZAR TODO
========================================== */

function updateAllQuantities() {

  if (quantityText) {

    quantityText.textContent =
      quantity;

  }


  updateCartTotals();

  updateCodCheckout();

  updateOnlineCheckout();

}


/* ==========================================
   CONFIRMAR PEDIDO CONTRA ENTREGA
========================================== */

const orderSuccess =
  document.querySelector("#order-success");

const successTotal =
  document.querySelector("#success-total");

const successClose =
  document.querySelector("#success-close");


if (codCheckoutForm) {

  codCheckoutForm.addEventListener(
    "submit",
    (event) => {

      event.preventDefault();


      if (
        !codCheckoutForm.checkValidity()
      ) {

        codCheckoutForm.reportValidity();

        return;

      }


      const formData =
        new FormData(
          codCheckoutForm
        );


      const orderData = {

        producto:
          product.name,

        cantidad:
          quantity,

        precioUnitario:
          product.price,

        envio:
          0,

        total:
          product.price * quantity,

        metodoPago:
          "Contra entrega",

        cliente: {

          nombre:
            formData.get("name"),

          celular:
            formData.get("phone"),

          email:
            formData.get("email"),

          departamento:
            formData.get(
              "department"
            ),

          ciudad:
            formData.get("city"),

          direccion:
            formData.get("address"),

          barrio:
            formData.get(
              "neighborhood"
            ),

          referencia:
            formData.get(
              "reference"
            ),

          indicaciones:
            formData.get("notes")

        }

      };


      console.log(
        "PEDIDO CONTRA ENTREGA:",
        orderData
      );


      closeCodCheckout();


      if (successTotal) {

        successTotal.textContent =
          formatPrice(
            orderData.total
          );

      }


      if (orderSuccess) {

        orderSuccess.classList.add(
          "active"
        );

      }


      document.body.style.overflow =
        "hidden";

    }
  );

}


/* ==========================================
   PAGAR ONLINE
========================================== */

if (onlineCheckoutForm) {

  onlineCheckoutForm.addEventListener(
    "submit",
    (event) => {

      event.preventDefault();


      if (
        !onlineCheckoutForm.checkValidity()
      ) {

        onlineCheckoutForm.reportValidity();

        return;

      }


      const formData =
        new FormData(
          onlineCheckoutForm
        );


      const onlineOrderData = {

        producto:
          product.name,

        cantidad:
          quantity,

        precioUnitario:
          product.price,

        envio:
          0,

        total:
          product.price * quantity,

        metodoPago:
          "Mercado Pago",

        cliente: {

          nombre:
            formData.get("name"),

          celular:
            formData.get("phone"),

          email:
            formData.get("email"),

          departamento:
            formData.get(
              "department"
            ),

          ciudad:
            formData.get("city"),

          direccion:
            formData.get("address"),

          barrio:
            formData.get(
              "neighborhood"
            ),

          referencia:
            formData.get(
              "reference"
            ),

          indicaciones:
            formData.get("notes")

        }

      };


      console.log(
        "PEDIDO ONLINE:",
        onlineOrderData
      );


      /*
      =======================================

      AQUÍ CONECTAREMOS MERCADO PAGO.

      Por ahora NO se procesa ningún pago.

      =======================================
      */


      alert(
        `Checkout online listo.

Cantidad: ${quantity}

Envío: GRATIS

Total: ${formatPrice(
          onlineOrderData.total
        )}

El siguiente paso será conectar Mercado Pago.`
      );

    }
  );

}


/* ==========================================
   CERRAR SUCCESS
========================================== */

if (successClose) {

  successClose.addEventListener(
    "click",
    () => {

      orderSuccess.classList.remove(
        "active"
      );


      document.body.style.overflow =
        "";


      if (codCheckoutForm) {

        codCheckoutForm.reset();

      }


      quantity = 1;


      updateAllQuantities();

    }
  );

}


/* ==========================================
   FAQ
========================================== */

const faqQuestions =
  document.querySelectorAll(
    ".faq-question"
  );


faqQuestions.forEach((question) => {

  question.addEventListener(
    "click",
    () => {

      const answer =
        question.nextElementSibling;

      const icon =
        question.querySelector(
          ".faq-icon"
        );

      const isOpen =
        question.classList.contains(
          "active"
        );


      faqQuestions.forEach((item) => {

        item.classList.remove(
          "active"
        );


        const itemIcon =
          item.querySelector(
            ".faq-icon"
          );


        const itemAnswer =
          item.nextElementSibling;


        if (itemIcon) {

          itemIcon.textContent =
            "+";

        }


        if (itemAnswer) {

          itemAnswer.style.maxHeight =
            null;

        }

      });


      if (!isOpen) {

        question.classList.add(
          "active"
        );


        if (icon) {

          icon.textContent =
            "−";

        }


        if (answer) {

          answer.style.maxHeight =
            answer.scrollHeight +
            "px";

        }

      }

    }
  );

});


/* ==========================================
   ESC
========================================== */

document.addEventListener(
  "keydown",
  (event) => {

    if (event.key !== "Escape") {

      return;

    }


    if (
      cartDrawer &&
      cartDrawer.classList.contains(
        "active"
      )
    ) {

      closeCart();

    }


    if (
      codCheckoutPanel &&
      codCheckoutPanel.classList.contains(
        "active"
      )
    ) {

      closeCodCheckout();

    }


    if (
      onlineCheckoutPanel &&
      onlineCheckoutPanel.classList.contains(
        "active"
      )
    ) {

      closeOnlineCheckout();

    }


    if (
      zoomModal &&
      zoomModal.classList.contains(
        "active"
      )
    ) {

      closeZoom();

    }

  }
);


/* ==========================================
   INICIALIZACIÓN
========================================== */

updateAllQuantities();


console.log(
  "Landing RS Imports cargada correctamente"
);
