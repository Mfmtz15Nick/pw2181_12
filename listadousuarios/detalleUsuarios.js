const $ = require('jquery');

var foto=require('electron').remote.getGlobal('infoUsuarios').foto;
var nombre=require('electron').remote.getGlobal('infoUsuarios').nombre;
var genero=require('electron').remote.getGlobal('infoUsuarios').genero;
var direccion=require('electron').remote.getGlobal('infoUsuarios').direccion;
var telefono=require('electron').remote.getGlobal('infoUsuarios').telefono;


$("#idNombre").html(nombre);
$("#idGenero").html(genero);
$("#idDireccion").html(direccion);
$("#idTelefono").html(telefono);
$("#idFoto").attr("src",foto);


