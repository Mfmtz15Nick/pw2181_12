
var inicioApp = function(){
    var Aceptar = function(){
        var usuario=$("#txtUsuario").val();
        var clave  =$("#txtClave").val();
        var parametros="opc=validaentrada"+
                       "&usuario="+usuario+
                       "&clave="+clave+
                       "&aleatorio="+Math.random();
        $.ajax({
            cache:false,
            type:"POST",
            dataType: "json",
            url: "php/validaentrada.php",
            data: parametros,
            success: function(response){
                if(response.respuesta==true){
                    //Ocultamos inicio
                    $("#secInicio").hide(("slow"));
                    //Aparecer Usuario
                    $("#frmUsuarios").show("slow");
                    //Cursor en el primer cuadro de texto
                    $("#txtNombreUsuario").focus();
                }else{
                    alert("Error");
                }

            },
            error: function(xhr,ajaxOptions,thrownError){
                console.log(xhr);

            }
        });
    }
    var buscarUsuario = function(){
        var usuario = $("#txtNombreUsuario").val();
        var parametros = "opc=buscarUsuario"+
                         "&usuario="+usuario+
                         "&aleatorio="+Math.random();
        if(usuario != ""){
            $.ajax({
                cache:false,
                type:"POST",
                dataType: "json",
                url: "php/buscausuario.php",
                data: parametros,
                success: function(response){
                    if(response.respuesta == true){
                        $("#txtNombre").val(response.nombre);
                        $("#txtClaveUsuario").val(reponse.clave);
                       
                    }else{
                        $("#txtNombre").focus();
                    }
                    
    
                },
                error: function(xhr,ajaxOptions,thrownError){
                    console.log(xhr);
    
                }
            });

        }
    }
    var teclaNombreUsuario = function(tecla){
        if(tecla.which == 13){//Enter
            buscarUsuario();
        }
    }
    var Guardar = function(){
        var usuario=$('#txtNombreUsuario').val();
        var nombre =$('#txtNombre').val();
        var clave =$('#txtClaveUsuario').val();
        if(usuario !="" && nombre !="" && clave != ""){

$.ajax({
            cache:false,
            type:"POST",
            dataType: "json",
            url: "php/guardarusuario.php",
            data: parametros,
            success: function(response){
                if(response.respuesta==true){
                    alert("Datos guardados correctamente");
                    $("#frmUsuarios >input").val("");
                    
                }else{
                    alert("Ocurrio un error, intente de nuevo mas tarde");
                }

            },
            error: function(xhr,ajaxOptions,thrownError){
                console.log(xhr);

            }
        });


        }else{
            alert("Llene todos los campos");
        }
    }
    $("#btnAceptar").on("click",Aceptar);
    $("#txtNombreUsuario").on("keypress",teclaNombreUsuario);
    $("#btnGuardar").on("click",Guardar);

}
$(document).ready(inicioApp);