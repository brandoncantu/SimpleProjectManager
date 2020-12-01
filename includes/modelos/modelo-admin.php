<?php
$accion = $_POST['accion'];
$usuario = $_POST['usuario'];
$password = $_POST['password'];

if($accion == 'crear'){
    //hasheo password
    $opciones = array(
        'cost' => '12'
    );

    $hash_password = password_hash($password, PASSWORD_BCRYPT, $opciones);
    
    include_once('../funciones/config.php');
    try{
        $sql = "INSERT INTO usuarios (usuario, pass) values (?,?)";
        $stmt = $link->prepare($sql);
        $stmt->bind_param('ss', $usuario, $hash_password);
        $stmt->execute();
        if($stmt->affected_rows > 0){
            $respsuesta = array(
                'respuesta' => 'correcto',
                'id_insertado' => $stmt->insert_id,
                'tipo' => $accion
            );
        }else{
            $respsuesta = array(
                'respuesta' => 'error'
            );
        }
        $stmt->close();
        $link->close();
    }catch(Exception $e){
       $respsuesta = array(
           'respuesta' => $e-getMessage()
        );
    }

    echo json_encode($respsuesta);
}


if($accion == 'login'){

    include_once('../funciones/config.php');

    try{
        $sql = "SELECT usuario, id_usuario, pass FROM usuarios where usuario = ?";
        $stmt = $link->prepare($sql);
        $stmt->bind_param('s', $usuario);
        $stmt->execute();
        $stmt->bind_result($id_usuario, $nombre_usuario, $pass_usuario);
        $stmt->fetch();
        if($nombre_usuario){
            if(password_verify($password, $pass_usuario)){
                
                session_start();
                $_SESSION['nombre'] = $usuario;
                $_SESSION['id'] =  $id_usuario;
                $_SESSION['login'] = true;

                $respsuesta = array(
                    'respuesta' => 'correcto',
                    'nombre' => $nombre_usuario,
                    'pass' => $pass_usuario,
                    'tipo' => $accion
                );
            }else{
                $respsuesta = array(
                    'respuesta' => 'error',
                    'error' => 'Contraseña incorrecta'
                );
            }
        }else{
            $respsuesta = array(
                'respuesta' => 'error',
                'error' => 'Usuario inexistente'
            );
        }
        $stmt->close();
        $link->close();
    }catch(Exception $e){
        $respsuesta = array(
            'respuesta' => 'error',
            'respuesta' => $e-getMessage()
         );
     }

     echo json_encode($respsuesta);

}


?>