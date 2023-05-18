$(document).ready(function () {
  $("#div_validacion").hide();
  $("#sp_loading").hide();
  $("#btn_in").hide();
 

});


$(function () {
  $("#register").hide();
  $(".container-header-navigation-form").on("click", call => {
    if (call.target.parentNode.id == "loginTap") {
      $("#registerTap").removeClass("selected");
      $("#" + call.target.parentNode.id).addClass("selected");
      $("#login").show();
      $("#register").hide();
    } else {
      $("#loginTap").removeClass("selected");
      $("#" + call.target.parentNode.id).addClass("selected");
      $("#login").hide();
      $("#register").show();
    }
  })
})

function comprarAlmacenar(){
  var correo = localStorage.getItem('correo');
  console.log(correo)
  var data = {
    nombreFuncion: "CompraAlmacenar",
    parametros: [correo]
  };

  $.ajax({
    method: "POST",
    url: "https://fer-sepulveda.cl/API_PLANTAS/api-service.php",
    data: JSON.stringify(data),
    success: function (response) {
      
      localStorage.setItem('idCompra', response.result[0].RESPUESTA)
      console.log(response.result[0].RESPUESTA)
      
    }
  })
  
}
function agregarProducto(codigo_producto, cantidad){
 
  var idcompra= localStorage.getItem('idCompra');
  
  var data = {
    nombreFuncion: "CompraDetalleAlmacenar",
    parametros: [idcompra,codigo_producto,cantidad]
  };
  $.ajax({
    method: "POST",
    url: "https://fer-sepulveda.cl/API_PLANTAS/api-service.php",
    data: JSON.stringify(data),
    success: function (response) {
      console.log(response)
      console.log(idcompra)
      console.log(codigo_producto)
      console.log(cantidad)
    }})
}
function almacenarUsuario() {
  var correo = $("#emailregister").val();
  var contrasena = $("#passwordregister").val();
  var nombre = $("#nombreregister").val();
  var apellido = $("#apellidoregister").val();

  console.log(correo);
  console.log(contrasena);
  console.log(nombre);
  console.log(apellido);

  var data = {
    nombreFuncion: "ClienteAlmacenar",
    parametros: [correo, contrasena, nombre, apellido],
  };

  $.ajax({
    method: "POST",
    url: "https://fer-sepulveda.cl/API_PLANTAS/api-service.php",
    data: JSON.stringify(data),
    success: function (response) {
      if (response.result[0].RESPUESTA == "OK") {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 4000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
        $("#sp_loading").show();
        Toast.fire({
          icon: "success",
          title: "Cliente registrado correctamente",
        });

        $("#txt_nuevoCorreo").val("");
        $("#txt_nuevoContrasena").val("");
        $("#txt_nuevoNombre").val("");
        $("#txt_nuevoApellido").val("");

        var miModal = document.getElementById("exampleModal");
        $(miModal).modal("hide");
      } else if (response.result[0].RESPUESTA == "ERR01") {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 4000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "warning",
          title: "Correo ingresado ya se encuentra registrado",
        });
      }

      console.log(response);
    },
    error: function (error) {
      console.log(error);
    },
  });
}
function validarLogin(){
  var correo = $("#emaillogin").val();
  var contrasena = $("#passwordlogin").val();
  if (correo == ''|| contrasena==''){
    console.log('RELLENA LOS DATOS')
  }else{
    login();
  }
}
function login() {
  var correo = $("#emaillogin").val();
  var contrasena = $("#passwordlogin").val();


  var data = {
      nombreFuncion: "ClienteLogin",
      parametros: [correo, contrasena]
  };
  $.ajax({
      method: "POST",
      url: "https://fer-sepulveda.cl/API_PLANTAS/api-service.php",
      data: JSON.stringify(data),
      success: function (response) {
        console.log(response.result)
        console.log(correo)
          if (response.result == 'LOGIN OK') {

            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('correo', correo);
            
            $('#sp_loading').show();
            setTimeout(() => {
              
              Swal.fire({
                  title: 'Ingreso correcto',

                  icon: 'success',
                  confirmButtonText: 'OK'
              });
              $('#sp_loading').fadeOut();
              }, 1500);
              ;
              setTimeout(() => {$(window.location.href = "index.html");},4000);

                
              /*almacenarCompraID()*/
              
          } else if (response.result == 'LOGIN NOK') {
              const Toast = Swal.mixin({
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 4000,
                  timerProgressBar: true,
                  didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                  }
              })

              Toast.fire({
                  icon: 'warning',
                  title: 'Credenciales inválidas'
              });
          }


          console.log(response);
      },
      error: function (error) {
          console.log(error);
      }
  });
}
function loginAdmin() {
  var correo = $("#emaillogin").val();
  var contrasena = $("#passwordlogin").val();


  var data = {
      nombreFuncion: "ClienteLogin",
      parametros: [correo, contrasena]
  };
  $.ajax({
      method: "POST",
      url: "https://fer-sepulveda.cl/API_PLANTAS/api-service.php",
      data: JSON.stringify(data),
      success: function (response) {
        console.log(response.result)
        console.log(correo)
          if (response.result == 'LOGIN OK') {
            
            $('#sp_loading').show();
            
            setTimeout(() => {
              
              Swal.fire({
                  title: 'Ingreso correcto',

                  icon: 'success',
                  confirmButtonText: 'OK'
              });
              
              $("#btn_in").show();
              $("#btn_ingresa").hide()
              $('#sp_loading').fadeOut();
              }, 1500);
              ;

              /*var miModal = document.getElementById("cuenta.html");
              $(miModal).modal("hide");*/
              
              setTimeout(() => {$(window.location.href = "administrador.html");},4000);
                
              /*almacenarCompraID()*/
              
          } else if (response.result == 'LOGIN NOK') {
              const Toast = Swal.mixin({
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 4000,
                  timerProgressBar: true,
                  didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                  }
              })

              Toast.fire({
                  icon: 'warning',
                  title: 'Credenciales inválidas'
              });
          }


          console.log(response);
      },
      error: function (error) {
          console.log(error);
      }
  });
}

/*ESTA FUNCION SOLO VERIFICA SI LOS CAMPOS ESTAN VACIOS */
function validarAlmacenarProducto(){
  var codigo = $("#codeprd").val();
  var nombre = $("#nombreprd").val();
  var descripcion = $("#descprd").val();
  var precio = $("#precioprd").val();
  var stock = $("#stockprd").val();
  if(codigo==''||nombre==''||descripcion==''||precio==''||stock==''){
    console.log('RELLENA BIEN LOS DATOS DEL PRODUCTO')
  }else{
    almacenarProducto();//LLAMAMOS A LA FUNCION DE ABAJO PARA QUE CUANDO LOS CAMPOS ESTEN LLENOS, ALMACENE EL PRODUCTO
  }
}

function almacenarProducto() {
  var codigo = $("#codeprd").val();
  var nombre = $("#nombreprd").val();
  var descripcion = $("#descprd").val();
  var precio = $("#precioprd").val();
  var stock = $("#stockprd").val();


  var data = {
      nombreFuncion: "ProductoAlmacenar",
      parametros: [codigo, nombre,descripcion,precio,stock]
  };

  $.ajax({
      method: "POST",
      url: "https://fer-sepulveda.cl/API_PLANTAS/api-service.php",
      data: JSON.stringify(data),
      success: function (response) {
          if (response.result[0].RESPUESTA == 'OK') {
              const Toast = Swal.mixin({
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 4000,
                  timerProgressBar: true,
                  didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                  }
              
              })

              Toast.fire({
                  icon: 'success',
                  title: 'Producto almacenado'
              });
              
              
          } else if (response.result[0].RESPUESTA == 'ERR01') {
              const Toast = Swal.mixin({
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 4000,
                  timerProgressBar: true,
                  didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                  }
              })

              Toast.fire({
                  icon: 'warning',
                  title: 'Producto ya se encuentra registrado'
              });
          }


          console.log(response);
      },
      error: function (error) {
          console.log(error);
      }
  });
}

function generarCardsModal() {
  var modalContent = '';

  for (var i = 0; i < productosFiltrados.length; i++) {
    var producto = productosFiltrados[i];
    var precio = Math.max(Math.floor(Math.random() * 10) * 1000, 1000); // Generar precio aleatorio multiplos de 1000 y k no sea menor a lukita 

    modalContent += '<div class="col-md-4 mb-4">' +
    '<div class="card">' +
    '<div class="card-body">' +
    '<h5 class="card-title text-primary">' + producto.NOMBRE + '</h5>' +
    '<p class="card-text">' + producto.DESCRIPCION + '</p>' +
    '<p class="card-text">Precio: $' + precio + '</p>' +
    '<p class="card-text">Stock: ' + producto.STOCK + '</p>' +
    '<div class="text-center">' +
    '<a href="#" class="btn btn-primary btn-sm">Comprar</a>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>';
  }

  var modalBody = document.getElementById('modalBody');
  modalBody.innerHTML = '<div class="row">' + modalContent + '</div>';
}

function cerrarSesion() {
  localStorage.removeItem('isLoggedIn');
}

/*function login() {
  let usuario = $("#txt_usuario").val();
  let contrasena = $("#txt_contrasena_login").val();

  if (usuario == "" || contrasena == "") {
    
    Swal.fire({
      title: "Información",
      text: "Todos los campos son obligatorios",
      icon: "warning",
      confirmButtonText: "OK",
    });
  } else {
    if (usuario == "administrador" || contrasena == "1234") {
      $("#sp_loading").fadeIn();
      Swal.fire({
        title: "Información",
        text: "Ingresado correctamente",
        icon: "success",
        confirmButtonText: "OK",
      });

      setTimeout(() => {
        window.location = "administrador.html";
      }, 3000);
    } else {
      $("#sp_loading").fadeIn();
      setTimeout(() => {
        Swal.fire({
          title: "Datos incorrectos",
          text: "",
          icon: "error",
          confirmButtonText: "OK",
        });
        $("#sp_loading").fadeOut();
      }, 3000);
    }
  }
}*/
/*function listarProductos() {
  $.ajax({
      method: "GET",
      url: "https://fer-sepulveda.cl/API_PLANTAS/api-service.php?nombreFuncion=ProductoListar",
      success: function (response) {
          console.log(response.result);
          
          const $cardsContainer = $('#div_productos');

          response.result.forEach((card) => {
              // Crear una nueva card con jQuery
              const $card = $('<div>', { class: 'col-sm-4 mb-4' }).append(
                $('<div>', { class: 'card' }).append(
                  //$('<img>', { class: 'card-img-top', src: card.image, alt: card.title }),
                  $('<div>', { class: 'card-body' }).append(
                    $('<h5>', { class: 'card-title', text: card.NOMBRE }),
                    $('<p>', { class: 'card-text', text: card.DESCRIPCION }),
                    
                    $('<button>', { class: 'btn btn-primary boton', text: 'Agregar', 
                      onclick: "agregarProducto(\"" + card.CODIGO+ "\", 999)", type:"button" })

                  )
                )
              );
              // Agregar la card al contenedor
              $cardsContainer.append($card);
          })
      },
      error: function (error) {
          console.log(error);
      }
  });
}*/

/*FUNCION PARA TRAER TUS PRODUCTOS DE LA API */
var productosFiltrados = [];
function traerProductosApi(){
    $.ajax({
        method: "GET",
        url: "https://fer-sepulveda.cl/API_PLANTAS/api-service.php?nombreFuncion=ProductoListar",
        CODIGO: 'GL*', fields: 'CODIGO,NOMBRE,DESCRIPCION,STOCK',
        
        success: function (response){

            var result = response.result;

            $.each(result, function(index, product) {
                var productCodigo = product.CODIGO;
                var productNombre = product.NOMBRE;
                var productDescripcion = product.DESCRIPCION;
                var productStock = product.STOCK;
              // Filtra los productos que cumplen con el criterio CAJ
                if (productCodigo.startsWith('GL')) {
                    productosFiltrados.push({CODIGO: productCodigo, NOMBRE: productNombre, DESCRIPCION: productDescripcion, STOCK: productStock});
                }
            });
            console.log(productosFiltrados);
        },
        
        error: function (error) {
                console.log(error);
        }
    });
}

/*FUNCION PARA TRAER TUS PRODUCTOS DE LA API FIN*/
/*FUNCION PARA QUE GENERE LA TABLA CON TUS PRODUCTOS DE LA FUNCION traerProductosApi();*/
function generarFilasTabla() {


  //TODA ESTA FUNCION PARA ABAJO LO UNICO QUE HACE ES IRTE TRAYENDO TUS PRODUCTOS DEL ARREGLO "productosFiltrados[]"
  //OJITO QUE PARA QUE ESTA WEA FUNCIONE TIENE QUE APRETAR DOS VECES EL BOTON
  // POR QUE LA FUNCION QUE ESTOY LLAMANDO ARRIBA "traerProductosApi();" SE DEMORA EN TRAER LOS PRODUCTOS
  var tabla = document.getElementById('datatable');
  var filasHTML = '';
  
  for (var i = 0; i < productosFiltrados.length; i++) {
    var producto = productosFiltrados[i];
    
    filasHTML += '<tr>' +
      '<td>' + producto.CODIGO + '</td>' +
      '<td>' + producto.NOMBRE + '</td>' +
      '<td>' + producto.DESCRIPCION + '</td>' +
      '<td>' + producto.PRECIO + '</td>' +
      '<td>' + producto.STOCK + '</td>' +
      '</tr>';
  }
  
  tabla.innerHTML = filasHTML;
}

window.addEventListener('load', function() {
  // Aquí colocas el código de la primera función a ejecutar
  traerProductosApi();

  // Aquí colocas el código de la segunda función a ejecutar
  generarCardsModal()
});