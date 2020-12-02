getTareas();
eventListeners();
var listaProyectos = document.querySelector('ul#proyectos');
var flagNuevoProyecto = false;

function eventListeners(){
    document.addEventListener('DOMContentLoaded', function(){
        actualizarProgreso();
    });
    document.querySelector('.crear-proyecto a').addEventListener('click', crearProyecto);
    document.querySelector('.nueva-tarea').addEventListener('click', agregarTarea);
    window.addEventListener("resize", showSidebar);
    var tareas = document.querySelectorAll('.check');
    Array.from(tareas).forEach(item => {
        item.addEventListener('click', checkTarea);
    });
    var dumps = document.querySelectorAll('.dump');
    Array.from(dumps).forEach(item => {
        item.addEventListener('click', dumpTarea);
    });
}

function crearProyecto(e){
    if(flagNuevoProyecto==false){
        flagNuevoProyecto = true;
        e.preventDefault();
        var nuevoProyecto = document.createElement('li');
        nuevoProyecto.innerHTML = '<input type="text" id="nuevo-proyecto">';
        listaProyectos.appendChild(nuevoProyecto);

        //seleccionar id con el nuevoProyyetco
        var inputNuevoProyecto = document.querySelector('#nuevo-proyecto');

        //al presionar enter crear proyecto
        inputNuevoProyecto.addEventListener('keypress', function(e){
            var tecla = e.which || e.keyCode;

            if(tecla == 13){
                guardarProyectoDB(inputNuevoProyecto.value);
                listaProyectos.removeChild(nuevoProyecto);
                document.querySelector('h1 span').innerHTML = inputNuevoProyecto.value;
                flagNuevoProyecto = false;
            }
        });
    }else{
        e.preventDefault();
    }
}

function guardarProyectoDB(nombreProyecto){
    //AJAX
    var xhr = new XMLHttpRequest();
    //enviar datos como FOrmData
    var datos = new FormData();
    datos.append('proyecto', nombreProyecto);
    datos.append('accion', 'crear');

    xhr.open('POST', 'includes/modelos/modelo-proyecto.php', true);

    xhr.onload  = function(){
        if(this.status == 200){
            var respuesta = JSON.parse(xhr.responseText);
            var proyecto = respuesta.nombre,
                id = respuesta.id_insertado,
                tipo = respuesta.tipo,
                res = respuesta.respuesta;

            if(res == 'correcto'){
                if(tipo == 'crear'){
                    //inyectar html
                    var nuevoProyecto = document.createElement('li');
                    nuevoProyecto.innerHTML = `
                        <a href="index?id_proyecto=${id}" id="${id}">
                            ${proyecto}
                        </a>
                    `;

                    listaProyectos.appendChild(nuevoProyecto);

                    Swal.fire({
                        icon: 'success',
                        title: 'Proyecto creado',
                        text: "El proyecto: " + proyecto + "se creó correctamente",
                      })
                      .then(res =>{
                        if(res.value){
                            var nombre = proyecto.replace(" ", "%20");
                            window.location.href = "index?id_proyecto=" + id+"&nombre="+ nombre;
                        }
                    })

                }else{

                }
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: resultado.error
                });
            }
        }
    }

    xhr.send(datos);
    
}

function agregarTarea(e){
    e.preventDefault();
    var nombreTarea = document.querySelector('.nombre-tarea').value;

    if(nombreTarea == "" || nombreTarea== " "){
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: "Debe agregar una tarea"
        });
    }else{
        //ajax
        var xhr = new XMLHttpRequest();

        var datos = new FormData();

        datos.append('tarea', nombreTarea);
        datos.append('accion', 'crear');
        datos.append('id', document.querySelector('#id_proyecto').value);  

        xhr.open('POST', 'includes/modelos/modelo-tarea.php', true);

        xhr.onload = function(){
            if(this.status == 200){
                var respuesta = JSON.parse(xhr.responseText);
                var resultado = respuesta.respuesta,
                    id_insertado = respuesta.id_insertado,
                    tarea = respuesta.tarea,
                    tipo = respuesta.tipo;

                    if(resultado == 'correcto'){
                        if(tipo == 'crear'){
                            Swal.fire({
                                icon: 'success',
                                title: 'Tarea Creada',
                                text: "La tarea: "+tarea+" fue creada.",
                                showConfirmButton: false,
                                timer: 1500
                              });
                            //borrar default
                            if(document.querySelector('#default')){
                                document.querySelector('#default').remove();
                            }
                            //template
                            var nuevaTarea = document.createElement('li');
                            nuevaTarea.id = 'tarea:'+id_insertado;
                            nuevaTarea.classList.add('tarea');
                            nuevaTarea.innerHTML= `
                            <p> ${tarea} </p>
                            <div class="acciones">
                                <i class="far fa-check-circle check" id="0"></i>
                                <i class="fas fa-trash dump"></i>
                            </div>
                            `;

                            var listado = document.querySelector('.listado-pendientes ul');
                            listado.appendChild(nuevaTarea);
                            actualizarProgreso();

                            document.querySelector('.agregar-tarea').reset;
                        }
                    }else{
                        Swal.fire({
                            icon: 'error',
                            title: 'Error!',
                            text: resultado.error
                        });
                    }

            }
        }

        xhr.send(datos);
    }
}

function getTareas(){
    var xhr = new XMLHttpRequest();

    xhr.open('POST', 'includes/views/tareas.php', false);

    var datos = new FormData();
    datos.append('id', document.querySelector('#id_proyecto').value);

    xhr.onload = function(){    
        if(this.status == 200){
            //console.log(JSON.parse(xhr.responseText));
            var respuesta = JSON.parse(xhr.responseText);           
            //console.log(respuesta.length);
            if(respuesta.length<1){
                var nuevaTarea = document.createElement('li');
                nuevaTarea.id = 'default';
                nuevaTarea.classList.add('tarea');
                nuevaTarea.innerHTML= `
                    <p> No hay tareas para este proyecto </p>
                    <div class="acciones">

                    </div>
                `;
                var listado = document.querySelector('.listado-pendientes ul');
                listado.appendChild(nuevaTarea);
            }
            for(var i=0; i< respuesta.length; i++){
                var id_tarea = respuesta[i][0],
                    tarea = respuesta[i][1],
                    estado = respuesta[i][2];
                    //console.log(id_tarea+" "+tarea+" "+estado);
                var nuevaTarea = document.createElement('li');
                nuevaTarea.id = 'tarea:'+id_tarea;
                nuevaTarea.classList.add('tarea');
                if(estado == '1'){
                    nuevaTarea.innerHTML= `
                    <p> ${tarea} </p>
                    <div class="acciones">
                    <i class="far fa-check-circle check" style="color:green" id="1"></i>
                    <i class="fas fa-trash dump"></i>
                    </div>
                `;
                }else{
                    nuevaTarea.innerHTML= `
                        <p> ${tarea} </p>
                        <div class="acciones">
                        <i class="far fa-check-circle check" id="0"></i>
                        <i class="fas fa-trash dump"></i>
                        </div>
                    `;
                }   

                var listado = document.querySelector('.listado-pendientes ul');
                listado.appendChild(nuevaTarea);
            }
        }
    }
    xhr.send(datos);
}

function checkTarea(e){
    var icon = this;
    var estadoTarea = this.id;
    var id_tarea = this.parentElement.parentElement.id;
    id_tarea = id_tarea.replace("tarea:", "");

    // if(estadoTarea == 1){
    //     alert("Desmarcar tarea?");
    //         estadoTarea = 0;              
    // }else{
    //     estadoTarea = 1;
    // }

    if(estadoTarea == 1){
        Swal.fire({
            icon: 'warning',
            title: 'Estas seguro?',
            showCancelButton: true,
            text: 'Seguro que desea desmarcar esta tarea?',
        }).then((result)=> {
            if(result.value){
            estadoTarea = 0;
            markTarea(icon, estadoTarea, id_tarea);
            this.id=0;
            actualizarProgreso();  
            }
        })            
    }else{
        estadoTarea = 1;
        markTarea(icon, estadoTarea, id_tarea); 
        this.id=1; 
        actualizarProgreso();
    }
}

function markTarea(icono, estadoTarea, id_tarea){
    //ajax
    var xhr = new XMLHttpRequest();
    var datos = new FormData();

    datos.append('id', id_tarea);
    datos.append('accion', 'check');
    datos.append('tarea', estadoTarea);  

    xhr.open('POST', 'includes/modelos/modelo-tarea.php', true);

    xhr.onload = function(){
        if(this.status == 200){
            var respuesta = JSON.parse(xhr.responseText);
            //console.log(respuesta);
            var resultado = respuesta.respuesta,
                estado = respuesta.estado,
                tipo = respuesta.tipo;

            if(resultado == 'correcto'){
                if(tipo == 'check'){
                    if(estado == "1"){
                        Swal.fire({
                            icon: 'success',
                            title: 'Tarea Completada',
                            showConfirmButton: false,
                            timer: 1500
                            });
                            icono.style.color="green";
                    }else{
                        Swal.fire({
                            icon: 'success',
                            title: 'Tarea Desmarcada',
                            showConfirmButton: false,
                            timer: 1500
                            });
                            icono.style.color="black";
                    }
                }
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: resultado.error
                });
            }
        }
    }
    xhr.send(datos);
}

function dumpTarea(e){
    var tarea = this.parentElement.parentElement;
    var id_tarea = this.parentElement.parentElement.id;
    id_tarea = id_tarea.replace("tarea:", "");
    Swal.fire({
        icon: 'warning',
        title: 'Estas seguro?',
        showCancelButton: true,
        text: 'Seguro que desea eliminar esta tarea?',
    }).then((result)=> {
        if(result.value){
            //ajax
            var xhr = new XMLHttpRequest();
            var datos = new FormData();

            datos.append('id', id_tarea);
            datos.append('accion', 'dump');
            datos.append('tarea', 'tarea');

            xhr.open('POST', 'includes/modelos/modelo-tarea.php', true);

            xhr.onload = function(){
                if(this.status == 200){
                    var respuesta = JSON.parse(xhr.responseText);
                    //console.log(respuesta);
                    var resultado = respuesta.respuesta,
                        tipo = respuesta.tipo;

                    if(resultado == 'correcto'){
                        if(tipo == 'dump'){
                            Swal.fire({
                                icon: 'success',
                                title: 'Tarea eliminada!',
                            });
                            tarea.remove();
                            actualizarProgreso();
                        }
                    }else{
                        Swal.fire({
                            icon: 'error',
                            title: 'Error!',
                            text: resultado.error
                        });
                    }
                }
            }
            xhr.send(datos);
        }
    })
}

function actualizarProgreso(){
    var total = document.querySelectorAll('.check');
    var cont = 0;

    for(var i=0; i<total.length; i++){
        if(total[i].id==1){
            cont = cont + 1;
        }
    }

    progress = cont * 100 / total.length;
    $(".porcentaje").each(function() {
        $(this)
          .data("progress", progress)
          .width(0)
          .animate({
            width: $(this).data("progress")+"%" // or + "%" if fluid
          }, 1200);
      });
    //document.querySelector('.porcentaje').style.width= progress+"%";
    //.log(progress);
}

function showSidebar(){
    //console.log(window.innerWidth);
    if(window.innerWidth>=600){
        document.querySelector('.contenedor-proyectos').style.display = 'block';
    }else{
        document.querySelector('.contenedor-proyectos').style.display = 'none';
    }
}

$(function(){

    //Menu movil
    $('.menu-movil').on('click', function(){
        $('.contenedor-proyectos').toggle("slow");
        $('.menu-movil span:first ').slideToggle();
        $('.menu-movil span:nth-child(3) ').slideToggle();
    });

});