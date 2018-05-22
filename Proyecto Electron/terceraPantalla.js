const $ = require('jquery');
const {BrowserWindow} = require('electron').remote
const app = require('electron').app;


var usuario=require('electron').remote.getGlobal('infoUsuarios').usuario;
var usuariovalida=require('electron').remote.getGlobal('infoUsuarios').usuariovalida;
var periodo=require('electron').remote.getGlobal('infoUsuarios').periodo;
var materia=require('electron').remote.getGlobal('infoUsuarios').materia;
var grupo=require('electron').remote.getGlobal('infoUsuarios').grupo;

//Url que me sirve para obtener un listado de todos los alumnos
var url2 = "http://itculiacan.edu.mx/dadm/apipaselista/data/obtienealumnos2.php?usuario=";
url2 = url2+usuario+"&usuariovalida="+usuariovalida+"&periodoactual="+periodo+"&materia="+materia+"&grupo="+grupo;

function inicia(){
    var numeroControl = "";
    var apepat = "";
    var apemat = "";
    var nombre = "";
    var resultado = "";
    
    $.ajax({
        url:url2 ,
        dataType: 'json',
        success: function(data){
            if(data.respuesta){
                //Crear variable para saber cuantos alumnos tiene el grupo
                var alumnos = data.alumnos[0].cantidad;
                var j = 1;              
                for (var i = 0; i < alumnos; i++) {
                    numeroControl=data.alumnos[j].ncontrol;
                    apepat=data.alumnos[j].apellidopaterno;
                    apemat=data.alumnos[j].apellidomaterno;
                    nombre=data.alumnos[j].nombre;
                    //En el id del boton concatene un 1 o un 0 segun sea asistencia o falta
                    //0 = asistencia.
                    //1 = falta.
                    resultado = "<li>No. Control: "+numeroControl+"<br>Apellido Paterno: "+apepat+"<br>Apellido Materno: "+apemat+"<br>Nombre: "+nombre+"<br><button id=0"+numeroControl+">Asistencia </button><button id=1"+numeroControl+">Falta </button>"
                    $("#listado").append(resultado); 
                   j++; 
                }
            }  
        }
    });
}
//Esta funcion me sirve para saber si el boton que se dio click es falta o asistencia.
function asistencia(){
    //Esta variable me sirve para obtener el id del boton
    var aux = this.id;
    //Esta varialbe me sirve para optener el primer caracter del id ya sea 1 o 0
    var aux2 = aux.substring(0,1);
    //Para obtener el verdadero id que manda el boton 
    var aux3 = aux.substring(1,aux.lenght);
    //este if es para cuando es falta.
    if(aux2==1){
        alert("Falta mijo");
        var numeroControl=aux3;
        //Esta url es para ingresar asistencia
        var url4 = "http://itculiacan.edu.mx/dadm/apipaselista/data/asignaincidencia.php?usuario=";        
        url4 = url4+usuario+"&usuariovalida="+usuariovalida+"&periodoactual="+periodo+"&materia="+materia+"&grupo="+grupo+"&ncontrol="+numeroControl+"&incidencia=2";
        $.ajax({
            url:url4 ,
            dataType: 'json',
            success: function(data){
                alert(data.respuesta);
                if(data.respuesta){
                    alert("TIESNES FALTA MIJO :(");
                }
                else{
                    alert("no hubo insercion");
                }  
            }
        });
    }
    //Este if es para cuando es asistencia.
    if(aux2==0){
        alert("asistencia papa");
        var numeroControl=aux3;
        var url4 = "http://itculiacan.edu.mx/dadm/apipaselista/data/asignaincidencia.php?usuario=";        
        url4 = url4+usuario+"&usuariovalida="+usuariovalida+"&periodoactual="+periodo+"&materia="+materia+"&grupo="+grupo+"&ncontrol="+numeroControl+"&incidencia=1";
        $.ajax({
            url:url4 ,
            dataType: 'json',
            success: function(data){
                alert(data.respuesta);
                if(data.respuesta){
                    alert("Fue asistencia VIEJOOOON");
                }
                else{
                    alert("no hubo insercion");
                }
            }
        });
    }
}
$("body").on("click","li > button",asistencia);
inicia();