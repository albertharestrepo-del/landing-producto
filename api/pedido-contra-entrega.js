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
     SOLO PERMITIR POST
  ======================================================= */

  if (req.method !== "POST") {

    return res.status(405).json({
      success: false,
      message: "Método no permitido"
    });

  }


  try {


    /* =====================================================
       VARIABLES PRIVADAS
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
          "La conexión con el sistema de pedidos no está configurada."
      });

    }


    if (!apiSecret) {

      console.error(
        "Falta API_SECRET"
      );

      return res.status(500).json({
        success: false,
        message:
          "La seguridad del sistema de pedidos no está configurada."
      });

    }



    /* =====================================================
       DATOS RECIBIDOS
    ===================================================== */

    const data =
      req.body;


    if (
      !data ||
      typeof data !== "object" ||
      !data.cliente
    ) {

      return res.status(400).json({
        success: false,
        message:
          "No se recibieron los datos del pedido."
      });

    }



    /* =====================================================
       VALIDAR CANTIDAD
    ===================================================== */

    const cantidadRecibida =
      parseInt(
        data.cantidad,
        10
      ) || 1;


    const cantidad =
      Math.min(
        10,
        Math.max(
          1,
          cantidadRecibida
        )
      );



    /* =====================================================
       LIMPIAR DATOS DEL CLIENTE
    ===================================================== */

    const cliente = {

      nombre:
        String(
          data.cliente.nombre || ""
        )
          .trim()
          .slice(0, 100),

      celular:
        String(
          data.cliente.celular || ""
        )
          .replace(/\D/g, "")
          .trim(),

      email:
        String(
          data.cliente.email || ""
        )
          .trim()
          .slice(0, 150),

      departamento:
        String(
          data.cliente.departamento || ""
        )
          .trim()
          .slice(0, 80),

      ciudad:
        String(
          data.cliente.ciudad || ""
        )
          .trim()
          .slice(0, 80),

      direccion:
        String(
          data.cliente.direccion || ""
        )
          .trim()
          .slice(0, 200),

      barrio:
        String(
          data.cliente.barrio || ""
        )
          .trim()
          .slice(0, 100),

      referencia:
        String(
          data.cliente.referencia || ""
        )
          .trim()
          .slice(0, 200),

      indicaciones:
        String(
          data.cliente.indicaciones || ""
        )
          .trim()
          .slice(0, 500)

    };



    /* =====================================================
       VALIDACIONES OBLIGATORIAS
    ===================================================== */

    if (!cliente.nombre) {

      return res.status(400).json({
        success: false,
        message:
          "El nombre es obligatorio."
      });

    }


    /* CELULAR COLOMBIANO */

    if (
      !/^3\d{9}$/.test(
        cliente.celular
      )
    ) {

      return res.status(400).json({
        success: false,
        message:
          "Ingresa un celular colombiano válido de 10 dígitos."
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
       VALIDAR EMAIL SI LO ESCRIBIERON
    ===================================================== */

    if (
      cliente.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        cliente.email
      )
    ) {

      return res.status(400).json({
        success: false,
        message:
          "El correo electrónico no es válido."
      });

    }



    /* =====================================================
       ARMAR PEDIDO
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
       ENVIAR A GOOGLE APPS SCRIPT
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
       LEER RESPUESTA GOOGLE
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
          "No fue posible comunicarse correctamente con el sistema de pedidos."
      });

    }



    /* =====================================================
       GOOGLE REPORTÓ ERROR
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
       PEDIDO EXITOSO
    ===================================================== */

    return res.status(200).json({

      success:
        true,

      orderId:
        googleData.orderId,

      total:
        googleData.total,

      cantidad:
        cantidad,

      message:
        "Pedido registrado correctamente"

    });


  } catch (error) {


    console.error(
      "ERROR API CONTRA ENTREGA:",
      error
    );


    return res.status(500).json({

      success: false,

      message:
        "Ocurrió un error al registrar el pedido."

    });

  }

}
