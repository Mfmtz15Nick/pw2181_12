var $ = require('jquery');
var inicia = function(){
	//JSON = JavaScript Object Notation
 	var nuevo = function(){
 		$.ajax({
  			url: 'https://randomuser.me/api/',
  			dataType: 'json',
  			success: function(data) {
  				$("#nombre").html(data.results[0].name.first+" "+data.results[0].name.last)
    		//console.log(data);
    			//Cambiar de atributos al img 
    			$("#foto").attr("src",data.results[0].picture.large);
  }
});

 	}
	$("#btnNuevo").on("click",nuevo);
	//$("#btnNuevo").off("click",nuevo);


}
$(document).ready(inicia);
