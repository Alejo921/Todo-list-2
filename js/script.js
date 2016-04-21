
window.onload = function()

{
	tareasgen = [];
	var indEdita = -1; 

	function tareaespe(id,estado)  /* constructor */

	{
		this.estado = estado;
		this.tareaespe = id;
		

		this.imprime = function()
		{

			return [

						this.tareaespe, 
						this.estado
					];
		}
	}

	if(localStorage.getItem("listar")) /* capturar el dato para almacenar en el localstorage */
	{
		var obj = eval(localStorage.getItem("listar"));
		var id = estado = "";
		for(var i in obj)
		{
			var id = obj[i].tareaespe; /*creacion de las 3 variables importantes*/
			var estado = obj[i].estado;
			var nuevaTarea = new tareaespe(id,estado);
			tareasgen.push(nuevaTarea);
		}
	}


	var busIndi = function(id) /*esta es la funcion principal de buscar indice para utilizarla en cada caso crud*/

	{
		var indice = -1;
		for(var i in tareasgen)
		{	
			if(tareasgen[i].tareaespe == id)
			{
				indice = i;
				break;
			}
		}
		return indice;
	}

	var limpiaCamp = function() /* funcion que me permite limpiar tabla e imprimirla se utiliza en otros metodos*/

	{
		indEdita = -1; 
		nom_div("nueva_tarea").value = "";	
		imprimeUsu(); /*sirve para poder imprimir o ver las tareas en la lista*/
	}

	function exisTar(id) /*funcion que sirve para comprobar si un id existe en ese caso es la tarea*/
	{
		var existe = 0; 
		for(var i in tareasgen)
		{
			if(i !== indEdita)
			{
				if(tareasgen[i].tareaespe.trim().toLowerCase() === id.trim().toLowerCase())
				{
					existe = 1; 
					break;
				}
			}
		}
		return existe;
	}

	var imprimeUsu = (function imprimeUsu()
	{

		var txt = "";
		for(var i = 0; i < tareasgen.length; i++)/*permite generar el listado de tareas e irlo incrementando*/
		{
			var datTarea = tareasgen[i].imprime();/*permite generar el listado de tareas con sus respectivas imagenes*/
			if(datTarea[1] == 1){
				txt += "<div class='tareasgen' id='activada'>";
				txt += "<center>"+(datTarea[0])+"</center>";
				txt += "<img src = 'img/bien.png' border = '0' id = 'editar_"+i+"'/>";
				txt += "<img align='right' src = 'img/mal.png' border = '0' id = 'eliminar_"+i+"'/>";
				txt += "</div>";

			}
			else{
				txt += "<div class='tareasgen' id='desactivada'>";
				txt += "<center>"+(datTarea[0])+"</center>";
				txt += "<img src = 'img/bien-bajo.png' border = '0' id = 'editar_"+i+"'/>";
				txt += "<img align='right' src = 'img/mal-bajo.png' border = '0' id = 'eliminar_"+i+"'/>";
				txt += "</div>";
			}
			
		}



		nom_div("imprime").innerHTML = txt;

		for(var i = 0; i < tareasgen.length; i++)
		{
			
			//para dar una tarea por terminada
			nom_div("editar_" + i).addEventListener('click', function(event)

			{
				var ind = event.target.id.split("_")[1];
				var idUser = tareasgen[ind].tareaespe;    /*busca la tarea por indice asignado*/
				console.log("Valor de idUser: ", idUser);
				ind = busIndi(idUser); 
				if(ind >= 0)
				{
					tareasgen[ind].estado = 0;
					localStorage.setItem("listar", JSON.stringify(tareasgen));
					limpiaCamp();
				}

				else
				{
					swal("No hay ningun ID");
				}
			});

		nom_div("eliminar_" + i).addEventListener('click', function(event) /* selecccion la tarea a eliminar */

			{
				var ind = event.target.id.split("_")[1];/*resultado de un array*/
				var idUser = tareasgen[ind].tareaespe;   /*busca el id de la tarea para eliminar*/
				if(confirm("Desea eliminar esta tarea por completo?"))
				{
					ind = busIndi(idUser);

					if(ind >= 0)
					{
						tareasgen.splice(ind, 1); /* elimina una tarea  d euna matriz */
						localStorage.setItem("listar", JSON.stringify(tareasgen));
						
						imprimeUsu(); /*luego vuelve a imprimir para generar la tabla sin la tar eliminada*/
					}
				}
			});
		}
		return imprimeUsu;
	})();

	

	nom_div("agregar").addEventListener('click', function(event) /*es la funcion escucha cuando damos clic*/
	{
		var existe = false;
		var valor = [];
		if(nom_div("nueva_tarea").value == "") /* evalua si la caja esta vacia para que ingrese tare */
		{
			swal("Digite una tarea gracias!");
			nom_div("nueva_tarea").focus();
			existe = true;
		}
		else
		{
			valor = nom_div("nueva_tarea").value;
		}
		if(existe == false)
		{
			if(exisTar(valor) == 0) 
			{
				if(indEdita < 0)
				{
					var nuevaTarea = new tareaespe(valor,1);
					tareasgen.push(nuevaTarea);
				}
				else
				{
					tareasgen[indEdita].tareaespe = valor;
				}

				localStorage.setItem("listar", JSON.stringify(tareasgen));
				limpiaCamp();
			}
			
		}

	});

	function nom_div(div)
	{
		return document.getElementById(div);
	}
}