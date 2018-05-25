<?php
include 'conexiones.php';
function guardarusuario(){
    $respuesta=false;
    $usuario=GetSQLValueString($_POST["usuario"],"text");
    $nombre=GetSQLValueString($_POST["nombre"],"text");
    $clave=GetSQLValueString(md5($_POST["clave"]),"text");
    

   
    //Conectarnosal servidor de BD.
    $con=conecta();
    //$consulta="select usuario from usuarios where usuario= '".$usuario."' limit 1";
    $consulta=printf("select usuario from usuarios where usuario = %s",$usuario);
    $resConsulta=mysqli_query($con,$consulta);
    $consultaGuarda ="";
    //Si ya existe en la tabla el usuario
    
   
    if(mysqli_num_rows($resConsulta) > 0){
        $consultaGuarda=sprintf("update usuarios set nombre = %s,clave = %s where usuario = %s",$nombre,$clave,$usuario);
        
    }else{//No existe en la tabla
        $consultaGuarda=sprintf("insert into usuarios values(default,%s,%s,%s)",$usuario,$nombre,$clave);
    }
    mysqli_query($con,$consultaGuarda);//ejecuta la consulta
    if(mysqli_affected_rows()>0){
        $respuesta = true;
    }
    $salidaJSON = array('respuesta' => $respuesta);
    print json_encode($salidaJSON);
}
$opc=$_POST["opc"];
switch ($opc) {
    case 'guardarUsuario':
        guardarusuario();
        break;
    
    default:
        # code...
        break;
}
?>