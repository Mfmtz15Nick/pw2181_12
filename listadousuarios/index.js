const $ = require('jquery');
const {BrowserWindow}=require('electron').remote
const app = require('electron').app
const path = require('path')
const url = require('url')

let pantallaDetalle;
var usuarios = new Array(20);

function datos(nombre,genero,foto,direccion,telefono){
    this.nombre = nombre;
    this.genero = genero;
    this.foto = foto;
    this.direccion = direccion;
    this.telefono = telefono;
}

function inicia(){
    var resultado ="";
    var nombre="";
    var foto = "";
    var genero = "";
    var direccion = "";
    var telefono = "";
    $.ajax({
        url: 'http://randomuser.me/api/?results=20',
        dataType: 'json',
        success: function(data){
            for(var i=0;i<20;i++){
                nombre=data.results[i].name.first+" "+data.results[i].name.last;
                foto=data.results[i].picture.medium;
                genero=data.results[i].gender;
                direccion=data.results[i].location.street;
                telefono=data.results[i].phone;
                resultado="<li><img src="+foto+">"+nombre+"<button id="+i+">Detalle </button>"
                $("#lstUsuarios").append(resultado);
                usuarios[i] = new datos(nombre,genero,foto,direccion,telefono);

            }
        }
    });
}

function botonDetalle(){
    //alert(this.id);

}

$("body").on("click","li > button",botonDetalle);
inicia();









