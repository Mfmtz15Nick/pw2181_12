var inicioApp = function(){
    var Aceptar = function(){
        var usuario=$("#txtUsuario").val();
        var clave=$("#txtClave").val();
        
        var parametros="opc=validaentrada"+
                       "&usuario="+usuario+
                       "&clave="+clave+
                       "&aleatorio="+Math.random();
        $.ajax({
            cache:false,
            type: "POST",
            dataType: "json",
            url: "php/validaentrada.php",
            data: parametros,
            success: function(response){
                if(response.respuesta == true){
                    // alert("Bienvenido");
                    //Ocultamos al inicio
                    $("#secInicio").hide("slow");
                    //Aparecemos usuarios
                    $("#frmUsuarios").show("slow");
                    //Cursor en el primer cuadro de texto
                    $("#txtNombreUsuario").focus();

                }else{
                    alert("Usuario o Clave incorrecta");
                }

            },
            error: function(xhr,ajaxOptions,throwError){
                console.log(xhr);
               
            }
        });
    }

    var buscarUsuario = function(){
        var usuario = $("#txtNombreUsuario").val();
        var parametros="opc=buscarUsuario"+
                       "&usuario="+usuario+
                       "&aleatorio="+Math.random();

        if(usuario != ""){
            $.ajax({
                cache:false,
                type: "POST",
                dataType: "json",
                url: "php/buscausuario.php",
                data: parametros,
                success: function(response){
                    if(response.respuesta == true){
                        
                        $("#txtNombre").val(response.nombre);
                        $("#txtClaveUsuario").val(response.clave);
                    }else{
                        $("#txtNombre").focus();
                    }
                 
                },
                error: function(xhr,ajaxOptions,throwError){
                    console.log(xhr);
                   
                }
            });

        }
    }

    var teclaNombreUsuario = function(tecla){
        if(tecla.which == 13){//A un Enter
            buscarUsuario();
        }
    }
    var Guardar = function(){
        var usuario=$("#txtNombreUsuario").val();
        var nombre=$("#txtNombre").val();
        var clave=$("#txtClaveUsuario").val();
        var parametros="opc=guardarUsuario"+
                        "&usuario="+usuario+
                        "&clave="+clave+
                        "&nombre="+nombre+
                        "&aleatorio="+Math.random();
        if(usuario!="" && nombre!="" && clave!=""){
            $.ajax({
                cache:false,
                type: "POST",
                dataType: "json",
                url: "php/guardarusuario.php",
                data: parametros,
                success: function(response){
                    if(response.respuesta == true){
                        alert("Datos guardados correctamente");
                        $("#frmUsuarios > input").val("");
                    }else{
                        alert("entra aqui :)")
                    }
                },
                error: function(xhr,ajaxOptions,throwError){
                    console.log(xhr);
                   
                }
            });

        }else{
            alert("Llene todos los campos");
        }
        
    }

    var Borrar = function(){
        var usuario = $("txtNombreUsuario").val();
        var nombre=$("#txtNombre").val();
        var pregunta = prompt("Seguro que desea borrar a"+nombre+"? (si/no)","no");
        var parametros = "opc=guardarUsuario"+
        "&usuario="+usuario+
        "&clave="+clave+
        "&nombre="+nombre+
        "&aleatorio="+Math.random();
        if(pregunta != null && pregunta == "si"){
            //Aqui va el AJAX.
            $.ajax({
                cache:false,
                type: "POST",
                dataType: "json",
                url: "php/borrarusuario.php",
                data: parametros,
                success: function(response){
                    if(response.respuesta == true){
                        alert("Datos borrados correctamente");
                        $("#frmUsuarios > input").val("");
                    }else{
                        alert("ocurrio un error, Intente de nuevo mas tarde")
                    }
                },
                error: function(xhr,ajaxOptions,throwError){
                    console.log(xhr);
                   
                }
            });
        }

    }

    var Listado = function(){
        $("main > section").hide("slow");
        $("frmListado").show("slow");
        var parametros = "opc=listado"+
                         "$aleatorio="+Math.random();
        $.ajax({
            cache:false,
            type: "POST",
            dataType: "json",
            url: "php/Listado.php",
            data: parametros,
            success: function(response){
                if(response.respuesta == true){
                   
                }else{
                    alert("ocurrio un error, Intente de nuevo mas tarde")
                }
            },
            error: function(xhr,ajaxOptions,throwError){
                console.log(xhr);
               
            }
        });

    }


    $("#btnAceptar").on("click",Aceptar);
    $("#txtNombreUsuario").on("keypress",teclaNombreUsuario);
    $("#btnGuardar").on("click",Guardar);
    $("#btnBorrar").on("click",Borrar);
    $("btnListado").on("click",Listado);

}

$(document).ready(inicioApp);