/* =========================================================
   RS IMPORTS
   API PEDIDOS CONTRA ENTREGA
   VERCEL -> GOOGLE APPS SCRIPT
========================================================= */

export default async function handler(req, res) {


  /* =======================================================
     PRUEBA DE API
  ======================================================= */

  if (req.method === "GET") {

    return res.status(200).json({
      success: true,
      message: "API de pedidos RS Imports activa"
    });

  }


  /* =======================================================
     SOLO PERMITIR POST PARA PEDIDOS
  ======================================================= */

  if (req.method !== "POST") {

    return res.status(405).json({
      success: false,
      message: "Método no permitido"
    });

  }


  try {


    /* =====================================================
       VARIABLES PRIVADAS DE VERCEL
    ===================================================== */

    const appsScriptUrl =
      process.env.APPS_SCRIPT_URL;

    const apiSecret =
      process.env.API_SECRET;


    if (!appsScriptUrl) {

      console.error(
        "Falta APPS_SCRIPT_URL"
      );


      return res.status(500).json({
        success: false,
        message:
          "La conexión con Google Sheets no está configurada."
      });

    }


    if (!apiSecret) {

      console.error(
        "Falta API_SECRET"
      );


      return res.status(500).json({
        success: false,
        message:
          "La seguridad de pedidos no está configurada."
      });

    }



    /* =====================================================
       DATOS RECIBIDOS
    ===================================================== */

    const data =
      req.body;


    if (
      !data ||
      !data.cliente
    ) {

      return res.status(400).json({
        success: false,
        message:
          "No se recibieron los datos del pedido."
      });

    }



    /* =====================================================
       CANTIDAD
    ===================================================== */

    const cantidad =
      Math.max(
        1,
        parseInt(
          data.cantidad,
          10
        ) || 1
      );



    /* =====================================================
       LIMPIAR INFORMACIÓN DEL CLIENTE
    ===================================================== */

    const cliente = {

      nombre:
        String(
          data.cliente.nombre || ""
        ).trim(),

      celular:
        String(
          data.cliente.celular || ""
        ).trim(),

      email:
        String(
          data.cliente.email || ""
        ).trim(),

      departamento:
        String(
          data.cliente.departamento || ""
        ).trim(),

      ciudad:
        String(
          data.cliente.ciudad || ""
        ).trim(),

      direccion:
        String(
          data.cliente.direccion || ""
        ).trim(),

      barrio:
        String(
          data.cliente.barrio || ""
        ).trim(),

      referencia:
        String(
          data.cliente.referencia || ""
        ).trim(),

      indicaciones:
        String(
          data.cliente.indicaciones || ""
        ).trim()

    };



    /* =====================================================
       VALIDACIONES
    ===================================================== */

    if (!cliente.nombre) {

      return res.status(400).json({
        success: false,
        message:
          "El nombre es obligatorio."
      });

    }


    if (!cliente.celular) {

      return res.status(400).json({
        success: false,
        message:
          "El celular es obligatorio."
      });

    }


    if (!cliente.departamento) {

      return res.status(400).json({
        success: false,
        message:
          "El departamento es obligatorio."
      });

    }


    if (!cliente.ciudad) {

      return res.status(400).json({
        success: false,
        message:
          "La ciudad es obligatoria."
      });

    }


    if (!cliente.direccion) {

      return res.status(400).json({
        success: false,
        message:
          "La dirección es obligatoria."
      });

    }



    /* =====================================================
       PREPARAR PEDIDO PARA GOOGLE
    ===================================================== */

    const orderData = {

      apiSecret:
        apiSecret,

      producto:
        "Caja Fuerte Digital de Acero Reforzado",

      cantidad:
        cantidad,

      cliente:
        cliente

    };



    /* =====================================================
       ENVIAR PEDIDO A GOOGLE APPS SCRIPT
    ===================================================== */

    const googleResponse =
      await fetch(
        appsScriptUrl,
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



    /* =====================================================
       LEER RESPUESTA DE GOOGLE
    ===================================================== */

    const responseText =
      await googleResponse.text();


    let googleData;


    try {

      googleData =
        JSON.parse(
          responseText
        );

    } catch (error) {


      console.error(
        "Respuesta inesperada de Google:",
        responseText
      );


      return res.status(502).json({
        success: false,
        message:
          "Google Sheets devolvió una respuesta inválida."
      });

    }



    /* =====================================================
       ERROR REPORTADO POR APPS SCRIPT
    ===================================================== */

    if (!googleData.success) {

      console.error(
        "Apps Script reportó error:",
        googleData
      );


      return res.status(400).json({
        success: false,
        message:
          googleData.message ||
          "No fue posible guardar el pedido."
      });

    }



    /* =====================================================
       TODO CORRECTO
    ===================================================== */

    return res.status(200).json({

      success:
        true,

      orderId:
        googleData.orderId,

      total:
        googleData.total,

      message:
        "Pedido registrado correctamente"

    });


  } catch (error) {


    console.error(
      "ERROR API CONTRA ENTREGA:",
      error
    );


    return res.status(500).json({

      success:
        false,

      message:
        "Ocurrió un error al registrar el pedido."

    });

  }

}
