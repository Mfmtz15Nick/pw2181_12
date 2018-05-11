const $ = require('jquery');

var nombre=require('electon').remote.getGlobal('infoUsuarios').nombre;
var genero=require('electon').remote.getGlobal('infoUsuarios').genero;
var direccion=require('electon').remote.getGlobal('infoUsuarios').direccion;
var telefono=require('electon').remote.getGlobal('infoUsuarios').telefono;

$("#idNombre").html(nombre);
$("#idGenero").html(genero);
$("#idDireccion").html(direccion);
$("#idTelefono").html(telefono);
$("#idFoto").attr("src",foto);


