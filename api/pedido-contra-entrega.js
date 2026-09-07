/* =========================================
     SOLO ACEPTAR POST
  ========================================= */

  if (req.method !== "POST") {

    return res.status(405).json({
      success: false,
      message: "Método no permitido"
    });

  }


  try {

    /* =========================================
       VARIABLES PRIVADAS DE VERCEL
    ========================================= */

    const appsScriptUrl =
      process.env.APPS_SCRIPT_URL;

    const apiSecret =
      process.env.API_SECRET;


    if (!appsScriptUrl || !apiSecret) {

      return res.status(500).json({
        success: false,
        message:
          "La API no está configurada correctamente."
      });

    }


    /* =========================================
       DATOS RECIBIDOS DEL CHECKOUT
    ========================================= */

    const data = req.body;


    if (!data || !data.cliente) {

      return res.status(400).json({
        success: false,
        message:
          "No se recibieron los datos del pedido."
      });

    }


    /* =========================================
       PREPARAR PEDIDO
    ========================================= */

    const orderData = {

      apiSecret: apiSecret,

      producto:
        "Caja Fuerte Digital de Acero Reforzado",

      cantidad:
        Math.max(
          1,
          Number(data.cantidad) || 1
        ),

      cliente: {

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

      }

    };


    /* =========================================
       VALIDACIÓN
    ========================================= */

    if (
      !orderData.cliente.nombre ||
      !orderData.cliente.celular ||
      !orderData.cliente.departamento ||
      !orderData.cliente.ciudad ||
      !orderData.cliente.direccion
    ) {

      return res.status(400).json({
        success: false,
        message:
          "Faltan datos obligatorios."
      });

    }


    /* =========================================
       ENVIAR A GOOGLE APPS SCRIPT
    ========================================= */

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
            JSON.stringify(orderData)

        }
      );


    const responseText =
      await googleResponse.text();


    let googleData;


    try {

      googleData =
        JSON.parse(responseText);

    } catch (error) {

      console.error(
        "Respuesta Google:",
        responseText
      );

      return res.status(502).json({
        success: false,
        message:
          "Google no devolvió una respuesta válida."
      });

    }


    /* =========================================
       GOOGLE REPORTÓ ERROR
    ========================================= */

    if (!googleData.success) {

      console.error(
        "Error Apps Script:",
        googleData
      );

      return res.status(400).json({
        success: false,
        message:
          googleData.message ||
          "No fue posible registrar el pedido."
      });

    }


    /* =========================================
       PEDIDO GUARDADO
    ========================================= */

    return res.status(200).json({

      success: true,

      orderId:
        googleData.orderId,

      total:
        googleData.total,

      message:
        "Pedido registrado correctamente"

    });


  } catch (error) {

    console.error(
      "ERROR API PEDIDO:",
      error
    );


    return res.status(500).json({

      success: false,

      message:
        "Ocurrió un error registrando el pedido."

    });

  }

};
