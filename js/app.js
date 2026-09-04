/* =========================================================
   RS IMPORTS
   CAJA FUERTE DIGITAL
   LANDING 100% CONTRA ENTREGA
========================================================= */


/* =========================================================
   PRODUCTO
========================================================= */

const product = {
  name: "Caja Fuerte Digital de Acero Reforzado",
  price: 129900
};

let quantity = 1;


/* =========================================================
   FORMATEAR PRECIOS
========================================================= */

function formatPrice(value) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0
  }).format(value);
}


/* =========================================================
   GALERÍA
========================================================= */

const mainProductImage =
  document.querySelector("#main-product-image");

const mainProductVideo =
  document.querySelector("#main-product-video");

const mediaThumbnails =
  document.querySelectorAll(".thumbnail");

const videoThumbnailPreview =
  document.querySelector(".video-thumbnail-preview");


/* FRAME DEL VIDEO EN MINIATURA */

if (videoThumbnailPreview) {

  videoThumbnailPreview.addEventListener(
    "loadedmetadata",
    () => {

      if (videoThumbnailPreview.duration > 1) {
        videoThumbnailPreview.currentTime = 0.5;
      }

    }
  );

}


/* =========================================================
   ZOOM
========================================================= */

const zoomButton =
  document.querySelector("#zoom-button");

const zoomModal =
  document.querySelector("#zoom-modal");

const zoomImage =
  document.querySelector("#zoom-image");

const zoomClose =
  document.querySelector("#zoom-close");


/* =========================================================
   CAMBIAR FOTO / VIDEO
========================================================= */

mediaThumbnails.forEach((thumbnail) => {

  thumbnail.addEventListener("click", () => {

    const type =
      thumbnail.dataset.type;

    const media =
      thumbnail.dataset.media;


    /* QUITAR ACTIVO */

    mediaThumbnails.forEach((item) => {
      item.classList.remove("active");
    });


    thumbnail.classList.add("active");


    /* =========================
       MOSTRAR IMAGEN
    ========================= */

    if (type === "image") {

      if (mainProductVideo) {

        mainProductVideo.pause();

        mainProductVideo.style.display =
          "none";

      }


      if (mainProductImage) {

        mainProductImage.style.display =
          "block";

        mainProductImage.style.opacity =
          "0";


        setTimeout(() => {

          mainProductImage.src = media;

          mainProductImage.style.opacity =
            "1";

        }, 120);

      }


      if (zoomButton) {

        zoomButton.style.display = "";

      }

    }


    /* =========================
       MOSTRAR VIDEO
    ========================= */

    if (type === "video") {

      if (mainProductImage) {

        mainProductImage.style.display =
          "none";

      }


      if (mainProductVideo) {

        mainProductVideo.style.display =
          "block";

      }


      if (zoomButton) {

        zoomButton.style.display =
          "none";

      }


      const source =
        mainProductVideo
          ?.querySelector("source");


      if (
        source &&
        source.getAttribute("src") !== media
      ) {

        source.src = media;

        mainProductVideo.load();

      }


      mainProductVideo
        ?.play()
        .catch(() => {});

    }

  });

});


/* =========================================================
   ABRIR ZOOM
========================================================= */

if (
  zoomButton &&
  zoomModal &&
  zoomImage
) {

  zoomButton.addEventListener(
    "click",
    () => {

      if (!mainProductImage) {
        return;
      }


      zoomImage.src =
        mainProductImage.src;


      zoomImage.classList.remove(
        "zoomed"
      );


      zoomModal.classList.add(
        "active"
      );


      zoomModal.setAttribute(
        "aria-hidden",
        "false"
      );


      document.body.style.overflow =
        "hidden";

    }
  );

}


/* CLICK PARA AMPLIAR MÁS */

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


/* CERRAR ZOOM */

function closeZoom() {

  if (!zoomModal) {
    return;
  }


  zoomModal.classList.remove(
    "active"
  );


  zoomModal.setAttribute(
    "aria-hidden",
    "true"
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


if (zoomModal) {

  zoomModal.addEventListener(
    "click",
    (event) => {

      if (event.target === zoomModal) {

        closeZoom();

      }

    }
  );

}


/* =========================================================
   CANTIDAD
========================================================= */

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


function updateQuantity() {

  const total =
    product.price * quantity;


  /* PDP */

  if (quantityText) {

    quantityText.textContent =
      quantity;

  }


  /* CHECKOUT */

  const checkoutQuantity =
    document.querySelector(
      "#checkout-product-quantity"
    );

  const checkoutProductPrice =
    document.querySelector(
      "#checkout-product-price"
    );

  const checkoutSubtotal =
    document.querySelector(
      "#checkout-subtotal"
    );

  const checkoutTotal =
    document.querySelector(
      "#checkout-total"
    );


  if (checkoutQuantity) {

    checkoutQuantity.textContent =
      quantity;

  }


  /*
    Aquí mostramos el total correspondiente
    a la cantidad seleccionada.
  */

  if (checkoutProductPrice) {

    checkoutProductPrice.textContent =
      formatPrice(total);

  }


  if (checkoutSubtotal) {

    checkoutSubtotal.textContent =
      formatPrice(total);

  }


  if (checkoutTotal) {

    checkoutTotal.textContent =
      formatPrice(total);

  }

}


/* AUMENTAR */

if (increaseQuantity) {

  increaseQuantity.addEventListener(
    "click",
    () => {

      quantity++;

      updateQuantity();

    }
  );

}


/* DISMINUIR */

if (decreaseQuantity) {

  decreaseQuantity.addEventListener(
    "click",
    () => {

      if (quantity > 1) {

        quantity--;

        updateQuantity();

      }

    }
  );

}


/* =========================================================
   CHECKOUT CONTRA ENTREGA
========================================================= */

const checkoutPanel =
  document.querySelector(
    "#checkout-panel"
  );

const checkoutOverlay =
  document.querySelector(
    "#checkout-overlay"
  );

const checkoutClose =
  document.querySelector(
    "#checkout-close"
  );


/* =========================================================
   ABRIR CHECKOUT
========================================================= */

function openCheckout() {

  if (!checkoutPanel) {
    return;
  }


  updateQuantity();


  checkoutPanel.classList.add(
    "active"
  );


  if (checkoutOverlay) {

    checkoutOverlay.classList.add(
      "active"
    );

  }


  checkoutPanel.setAttribute(
    "aria-hidden",
    "false"
  );


  document.body.style.overflow =
    "hidden";


  /*
    Siempre que abra el checkout,
    lo mostramos desde arriba.
  */

  checkoutPanel.scrollTop = 0;

}


/* =========================================================
   CERRAR CHECKOUT
========================================================= */

function closeCheckout() {

  if (!checkoutPanel) {
    return;
  }


  checkoutPanel.classList.remove(
    "active"
  );


  if (checkoutOverlay) {

    checkoutOverlay.classList.remove(
      "active"
    );

  }


  checkoutPanel.setAttribute(
    "aria-hidden",
    "true"
  );


  document.body.style.overflow =
    "";

}


/* X */

if (checkoutClose) {

  checkoutClose.addEventListener(
    "click",
    closeCheckout
  );

}


/* OVERLAY */

if (checkoutOverlay) {

  checkoutOverlay.addEventListener(
    "click",
    closeCheckout
  );

}


/* =========================================================
   TODOS LOS BOTONES CONTRA ENTREGA
========================================================= */

const codButtons = [

  "#header-cod-button",

  "#gallery-cod-button",

  "#cod-buy-button",

  "#banner-cod-button",

  "#final-cod-button",

  "#mobile-cod-button"

];


codButtons.forEach((selector) => {

  const button =
    document.querySelector(selector);


  if (button) {

    button.addEventListener(
      "click",
      openCheckout
    );

  }

});


/* =========================================================
   FORMULARIO
========================================================= */

const checkoutForm =
  document.querySelector(
    "#checkout-form"
  );

const confirmOrderButton =
  document.querySelector(
    "#confirm-order-button"
  );


/* =========================================================
   SUCCESS
========================================================= */

const orderSuccess =
  document.querySelector(
    "#order-success"
  );

const successTotal =
  document.querySelector(
    "#success-total"
  );

const successOrderId =
  document.querySelector(
    "#success-order-id"
  );

const successClose =
  document.querySelector(
    "#success-close"
  );


/* =========================================================
   ENVIAR PEDIDO CONTRA ENTREGA
========================================================= */

if (checkoutForm) {

  checkoutForm.addEventListener(
    "submit",
    async (event) => {

      event.preventDefault();


      /* =========================
         VALIDAR FORMULARIO
      ========================= */

      if (
        !checkoutForm.checkValidity()
      ) {

        checkoutForm.reportValidity();

        return;

      }


      /* =========================
         EVITAR DOBLE PEDIDO
      ========================= */

      if (confirmOrderButton) {

        confirmOrderButton.disabled =
          true;

        confirmOrderButton.textContent =
          "ENVIANDO PEDIDO...";

      }


      try {


        /* =========================
           DATOS FORMULARIO
        ========================= */

        const formData =
          new FormData(
            checkoutForm
          );


        const orderData = {

          cantidad:
            quantity,

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


        /* =========================
           ENVIAR A API VERCEL
        ========================= */

        const response =
          await fetch(
            "/api/pedido-contra-entrega",
            {

              method: "POST",

              headers: {

                "Content-Type":
                  "application/json"

              },

              body:
                JSON.stringify(
                  orderData
                )

            }
          );


        /* =========================
           RESPUESTA
        ========================= */

        const result =
          await response.json();


        if (
          !response.ok ||
          !result.success
        ) {

          throw new Error(
            result.message ||
            "No fue posible registrar el pedido."
          );

        }


        /* =========================
           PEDIDO EXITOSO
        ========================= */

        closeCheckout();


        if (successOrderId) {

          successOrderId.textContent =
            result.orderId ||
            "Pedido confirmado";

        }


        if (successTotal) {

          successTotal.textContent =
            formatPrice(
              result.total ||
              product.price * quantity
            );

        }


        if (orderSuccess) {

          orderSuccess.classList.add(
            "active"
          );

        }


        document.body.style.overflow =
          "hidden";


      } catch (error) {


        console.error(
          "ERROR PEDIDO:",
          error
        );


        alert(
          "No pudimos registrar tu pedido en este momento. Por favor intenta nuevamente."
        );


      } finally {


        if (confirmOrderButton) {

          confirmOrderButton.disabled =
            false;

          confirmOrderButton.textContent =
            "CONFIRMAR PEDIDO CONTRA ENTREGA";

        }

      }

    }
  );

}


/* =========================================================
   CERRAR CONFIRMACIÓN
========================================================= */

if (successClose) {

  successClose.addEventListener(
    "click",
    () => {

      if (orderSuccess) {

        orderSuccess.classList.remove(
          "active"
        );

      }


      document.body.style.overflow =
        "";


      /* LIMPIAR FORMULARIO */

      if (checkoutForm) {

        checkoutForm.reset();

      }


      /* VOLVER CANTIDAD A 1 */

      quantity = 1;

      updateQuantity();


      /* VOLVER ARRIBA */

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }
  );

}


/* =========================================================
   FAQ
========================================================= */

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


      /* CERRAR TODAS */

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


      /* ABRIR SELECCIONADA */

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


/* =========================================================
   TECLA ESC
========================================================= */

document.addEventListener(
  "keydown",
  (event) => {

    if (event.key !== "Escape") {
      return;
    }


    /* CHECKOUT */

    if (
      checkoutPanel &&
      checkoutPanel.classList.contains(
        "active"
      )
    ) {

      closeCheckout();

    }


    /* ZOOM */

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


/* =========================================================
   INICIAR LANDING
========================================================= */

updateQuantity();


console.log(
  "RS Imports · Landing contra entrega cargada correctamente"
);
