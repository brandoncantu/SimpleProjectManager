eventListeners();

function eventListeners(){
    document.querySelector('#formulario').addEventListener('submit', validarRegistro);
}

function validarRegistro(event){
    event.preventDefault();
    var usuario = document.querySelector('#usuario').value;
        pass = document.querySelector('#password').value,
        tipo = document.querySelector('#tipo').value;
    if(usuario=='' || pass==''){
        if(usuario==''){
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Nombre de usuario obligatorio!',
            });
        }
        if(pass==''){
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Contraseña obligatoria!',
              });
        }
        if(usuario=='' && pass==''){
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Ambos campos obligatorios',
                });
            }
    }else{
        var datos = new FormData();
        datos.append('usuario', usuario);
        datos.append('password', pass);
        datos.append('accion', tipo);

        var xhr = new XMLHttpRequest();

        xhr.open('POST', 'includes/modelos/modelo-admin.php', true);

        xhr.onload = function(){
            if(this.status == 200){
                var resultado = JSON.parse(xhr.responseText);
                //console.log(resultado);
                if(resultado.respuesta == 'correcto'){
                    if(resultado.tipo == 'crear'){
                        Swal.fire({
                            icon: 'success',
                            title: 'Registro exitoso',
                            timer: 1500
                          });
                    }else if(resultado.tipo == 'login'){
                        Swal.fire({
                            icon: 'success',
                            title: 'Login exitoso',
                            timer: 1500
                        })    
                        setTimeout(function(){
                            window.location.href = 'index.php';
                        }, 2000);
                    }
                }else{
                    if(resultado.respuesta == 'error'){
                        Swal.fire({
                            icon: 'error',
                            title: 'Error!',
                            text: resultado.error
                        });
                    }
                }
            }
        }

        xhr.send(datos);

    }
}