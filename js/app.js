/* ==========================================
   RS IMPORTS
   LANDING PAGE - CAJA FUERTE DIGITAL
========================================== */


/* ==========================================
   ELEMENTOS DE LA GALERÍA
========================================== */

const mainProductImage =
  document.querySelector("#main-product-image");

const mainProductVideo =
  document.querySelector("#main-product-video");

const mediaThumbnails =
  document.querySelectorAll(".thumbnail");

const videoThumbnailPreview =
  document.querySelector(".video-thumbnail-preview");


/* ==========================================
   ELEMENTOS DEL ZOOM
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
   OTROS ELEMENTOS
========================================== */

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


/* ==========================================
   DATOS DEL PRODUCTO
========================================== */

const product = {

  name:
    "Caja Fuerte Digital de Acero Reforzado",

  price:
    129900

};


/* ==========================================
   CANTIDAD INICIAL
========================================== */

let quantity = 1;


/* ==========================================
   PREVIEW DEL VIDEO EN MINIATURA
========================================== */

if (videoThumbnailPreview) {

  videoThumbnailPreview.addEventListener(
    "loadedmetadata",
    () => {

      /*
        Mostramos un frame del video
        para evitar que la miniatura
        aparezca completamente negra.
      */

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
   GALERÍA DE PRODUCTO
========================================== */

mediaThumbnails.forEach((thumbnail) => {

  thumbnail.addEventListener(
    "click",
    () => {


      const type =
        thumbnail.dataset.type;


      const media =
        thumbnail.dataset.media;


      /* ==================================
         QUITAR SELECCIÓN ACTUAL
      ================================== */

      mediaThumbnails.forEach((item) => {

        item.classList.remove("active");

      });


      /* ==================================
         MARCAR MINIATURA SELECCIONADA
      ================================== */

      thumbnail.classList.add("active");


      /* ==================================
         MOSTRAR IMAGEN
      ================================== */

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

            mainProductImage.src =
              media;


            mainProductImage.style.opacity =
              "1";

          }, 120);

        }


        /*
          Volver a mostrar lupa
          cuando seleccionamos imagen.
        */

        if (zoomButton) {

          zoomButton.style.display =
            "";

        }

      }


      /* ==================================
         MOSTRAR VIDEO
      ================================== */

      if (type === "video") {


        if (mainProductImage) {

          mainProductImage.style.display =
            "none";

        }


        if (mainProductVideo) {

          mainProductVideo.style.display =
            "block";


          const videoSource =
            mainProductVideo.querySelector(
              "source"
            );


          if (videoSource) {


            if (
              videoSource.getAttribute(
                "src"
              ) !== media
            ) {

              videoSource.src =
                media;


              mainProductVideo.load();

            }

          }


          /*
            Intentamos reproducir el video.
            Si el navegador bloquea autoplay,
            simplemente queda listo para Play.
          */

          mainProductVideo
            .play()
            .catch(() => {

              console.log(
                "Autoplay bloqueado por el navegador."
              );

            });

        }


        /*
          Ocultar la lupa mientras
          estamos viendo video.
        */

        if (zoomButton) {

          zoomButton.style.display =
            "none";

        }

      }


    }
  );

});


/* ==========================================
   AUMENTAR CANTIDAD
========================================== */

if (
  increaseQuantity &&
  quantityText
) {

  increaseQuantity.addEventListener(
    "click",
    () => {


      quantity++;


      quantityText.textContent =
        quantity;


    }
  );

}


/* ==========================================
   DISMINUIR CANTIDAD
========================================== */

if (
  decreaseQuantity &&
  quantityText
) {

  decreaseQuantity.addEventListener(
    "click",
    () => {


      if (quantity > 1) {


        quantity--;


        quantityText.textContent =
          quantity;


      }


    }
  );

}


/* ==========================================
   FAQ
========================================== */

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


      /* ==================================
         CERRAR TODOS
      ================================== */

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


      /* ==================================
         ABRIR FAQ SELECCIONADO
      ================================== */

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
   ABRIR ZOOM
========================================== */

if (
  zoomButton &&
  zoomModal &&
  zoomImage &&
  mainProductImage
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


      zoomModal.setAttribute(
        "aria-hidden",
        "false"
      );


      /*
        Evita que la landing se mueva
        mientras el zoom está abierto.
      */

      document.body.style.overflow =
        "hidden";


    }
  );

}


/* ==========================================
   ZOOM DENTRO DE LA IMAGEN
========================================== */

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


/* ==========================================
   FUNCIÓN CERRAR ZOOM
========================================== */

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


/* ==========================================
   BOTÓN X DEL ZOOM
========================================== */

if (zoomClose) {

  zoomClose.addEventListener(
    "click",
    closeZoom
  );

}


/* ==========================================
   CERRAR ZOOM AL HACER CLIC EN EL FONDO
========================================== */

if (zoomModal) {

  zoomModal.addEventListener(
    "click",
    (event) => {


      if (
        event.target === zoomModal
      ) {

        closeZoom();

      }


    }
  );

}


/* ==========================================
   CERRAR ZOOM CON ESC
========================================== */

document.addEventListener(
  "keydown",
  (event) => {


    if (
      event.key === "Escape" &&
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
   FORMATEAR PRECIO
========================================== */

function formatPrice(value) {


  return new Intl.NumberFormat(
    "es-CO",
    {

      style:
        "currency",

      currency:
        "COP",

      maximumFractionDigits:
        0

    }

  ).format(value);


}


/* ==========================================
   FUNCIÓN COMPRAR
========================================== */

function buyProduct() {


  const total =
    product.price *
    quantity;


  const productData = {


    producto:
      product.name,


    precioUnitario:
      product.price,


    cantidad:
      quantity,


    total:
      total


  };


  console.log(
    "Producto seleccionado:",
    productData
  );


  /*
  =========================================

  MÁS ADELANTE AQUÍ CONECTAREMOS
  MERCADO PAGO.

  Vamos a enviar:

  - Nombre del producto
  - Precio
  - Cantidad
  - Total

  =========================================
  */


  alert(
    `Producto listo para comprar.

${product.name}

Cantidad: ${quantity}

Total: ${formatPrice(total)}

Próximamente conectaremos Mercado Pago.`
  );


}


/* ==========================================
   BOTÓN COMPRAR PRINCIPAL
========================================== */

if (buyButton) {

  buyButton.addEventListener(
    "click",
    buyProduct
  );

}


/* ==========================================
   BOTÓN COMPRAR MOBILE
========================================== */

if (mobileBuyButton) {

  mobileBuyButton.addEventListener(
    "click",
    buyProduct
  );

}


/* ==========================================
   MENSAJE CONSOLA
========================================== */

console.log(
  "Landing RS Imports cargada correctamente"
);
