//Crear dos workers, son hilos de ejecucion.
		var w1,w2;
		function iniciarWorker(){
			//Preguntar si el navegador soporta Workers.
			//preguntar si esta definido worker
			if (typeof(Worker) != "undefined") {
				if (typeof(w1) == "undefined") {
					w1 = new Worker("demoWorker.js");
					w1.onmessage = function(event){
						document.getElementById('resultado').innerHTML = event.data;
					}
				}
			}else {
				alert("El navegador no soporta Workers");
			}
		}
		function pararWorker(){
			w1.terminate();
			w1 = undefined;	
			}
	function iniciarWorker2(){
			//Preguntar si el navegador soporta Workers.
			//preguntar si esta definido worker
			if (typeof(Worker) != "undefined") {
				if (typeof(w2) == "undefined") {
					w2 = new Worker("demoWorker.js");
					w2.onmessage = function(event){
						document.getElementById('resultado2').innerHTML = event.data;
					}
				}
			}else {
				alert("El navegador no soporta Workers");
			}
		}
		function pararWorker2(){
			w2.terminate();
			w2 = undefined;	
			}
var aux = 0 ;
function empezar(id){
	if(aux == 0){
		iniciarWorker();
		iniciarWorker2();
		document.getElementById(id).innerHTML="X"
		aux++;
	}else if(aux==1){
		pararWorker2();
		iniciarWorker2();
		document.getElementById(id).innerHTML="O"
		aux++;
		validar("jugador 2","O");
	}
	else{
		pararWorker2();
		iniciarWorker2();
		document.getElementById(id).innerHTML="X"
		aux--;
		validar("jugador 1","X");
	}
}


	function validar(jugador,ficha){
		//primero vamos a validar los renglones
		//creare un vector con las posiciones con las que gana en renglones
		var arregloRenglones = [1,2,3,4,5,6,7,8,9];
		//var cont=0;
		
		a=document.getElementById("div"+arregloRenglones[0]).innerHTML;
		b=document.getElementById("div"+arregloRenglones[1]).innerHTML;
		c=document.getElementById("div"+arregloRenglones[2]).innerHTML;

		a2=document.getElementById("div"+arregloRenglones[3]).innerHTML;
		b2=document.getElementById("div"+arregloRenglones[4]).innerHTML;
		c2=document.getElementById("div"+arregloRenglones[5]).innerHTML;
		

		a3=document.getElementById("div"+arregloRenglones[6]).innerHTML;
		b3=document.getElementById("div"+arregloRenglones[7]).innerHTML;
		c3=document.getElementById("div"+arregloRenglones[8]).innerHTML;
		
		if((a==ficha&&b==ficha&&c==ficha)||(a2==ficha&&b2==ficha&&c2==ficha)||(a3==ficha&&b3==ficha&&c3==ficha)){
			//alert("Ya gano "+jugador);
			enviarNotificacion(jugador);
			pararWorker();
			pararWorker2();
		}else if((a==ficha&&a2==ficha&&a3==ficha)||(b==ficha&&b2==ficha&&b3==ficha)||(c==ficha&&c2==ficha&&c3==ficha)){
			//alert("Ya gano "+jugador);
			enviarNotificacion(jugador);	
			pararWorker();
			pararWorker2();
		}else if((a==ficha&&b2==ficha&&c3==ficha)||(c==ficha&&b2==ficha&&a3==ficha)){
			//alert("Ya gano "+jugador);
			enviarNotificacion(jugador);			
			pararWorker();
			pararWorker2();

		}
	
	
	}


	//alert(jugador+" "+revisar)
	//Obener el texto
	//alert(c.innerHTML);


	function enviarNotificacion(jugador){
		//Comprobar que el navegador soporta notificaciones.
		if(!("Notification" in window)){
			alert("No soporta notificaciones");
		}else if(Notification.permission==="denied"|| Notification.permission==="default"){
		//Pedimos permiso
		Notification.requestPermission(function (permission){
			if(permission === "granted"){
				var notificacion = new Notification("Gano el jugador "+jugador);
			}
		});
	}else if(Notification.permission === "granted"){
		var notificacion=new Notification("Gano el jugador "+jugador);
	}
}

		

		