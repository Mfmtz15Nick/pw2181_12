const $ = require('jquery')
//Para tener acceso al main atraves del js
//Para obtener informacion
const{BrowserWindow}=require('electron').remote
const app=require('electron').app
const path = require('path')
const url = require('url')

var usuariovalida=require('electron').remote.getGlobal('infoUsuarios').usuariovalida;
var periodo=require('electron').remote.getGlobal('infoUsuarios').periodo;
var usuario=require('electron').remote.getGlobal('infoUsuarios').usuario;

var url2 = "http://itculiacan.edu.mx/dadm/apipaselista/data/obtienegrupos2.php?usuario="

var usuarios;
//Funcion para mandar los datos al arreglo
function datos(usu,val,peri,materia,grupo){
    this.usu=usu;
    this.val=val;
    this.peri=peri;
    this.materia=materia;
    this.grupo=grupo;
}



function inicia(){
    //NombreMateria, ClaveMateria, ClaveGrupo
    
    var ClaveMateria = "";
    var ClaveGrupo = "";
    var resultado = "";
    var NombreMateria = "";
    
    //Armar la url con los datos globales
    url2 = url2+usuario+"&usuariovalida="+usuariovalida+"&periodoactual="+periodo;
    
    $.ajax({
        url:url2 ,
        dataType: 'json',
        success: function(data){
            if(data.respuesta){
                alert("Holis");
                //Crear variable para saber cuantos grupos tiene
                var grupos = data.grupos[0].cantidad;
                //Crear arreglo para almacenar todos los grupos del maestro.
                usuarios = new Array(grupos);
                var j=1;
           
                for (var i = 0; i < grupos; i++) {
                    ClaveMateria = data.grupos[j].clavemateria;
                    //alert("Clave Materia:"+ClaveMateria);
                    ClaveGrupo = data.grupos[j].grupo;
                   // alert("Clave Grupo:"+ClaveGrupo);
                    NombreMateria = data.grupos[j].materia;
                   // alert("Nombre Materia:"+NombreMateria);
                    
                    resultado = "<li>Clave Materia: "+ClaveMateria+"<br>Clave Grupo: "+ClaveGrupo+"<br>Nombre Materia: "+NombreMateria+"<button id="+i+">Detalle </button>"
                    $("#listado").append(resultado);
                    
                    usuarios[i] = new datos(usuario,usuariovalida,periodo,ClaveMateria,ClaveGrupo);
                    j++;
                }
            }
           
        }
    });

}
function abrirTercerPantalla(){
    //alert("Abri segunda pantalla");
    //alert(this.id);
    require('electron').remote.getGlobal('infoUsuarios').usuario=usuarios[this.id].usu;
    require('electron').remote.getGlobal('infoUsuarios').usuariovalida=usuarios[this.id].val;
    require('electron').remote.getGlobal('infoUsuarios').periodo=usuarios[this.id].peri;
    require('electron').remote.getGlobal('infoUsuarios').materia=usuarios[this.id].materia;
    require('electron').remote.getGlobal('infoUsuarios').grupo=usuarios[this.id].grupo;
 
 
 
   let tercerPantalla = new BrowserWindow({width:600,height:600});
    tercerPantalla.loadURL(url.format({
        pathname: path.join(__dirname,'terceraPantalla.html'),
        protocol:'file',
        slashes:true
    }));
    //tercerPantalla.webContents.openDevTools();
    tercerPantalla.show();

}
$("body").on("click","li > button",abrirTercerPantalla);
inicia();