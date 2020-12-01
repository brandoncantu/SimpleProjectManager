<?php
    $accion = $_POST['accion'];
    $proyecto = $_POST['proyecto'];

    if($accion == 'crear'){   
        include_once('../funciones/config.php');
        try{
            $sql = "INSERT INTO proyectos (nombre) values (?)";
            $stmt = $link->prepare($sql);
            $stmt->bind_param('s', $proyecto);
            $stmt->execute();
            if($stmt->affected_rows > 0){
                $respsuesta = array(
                    'respuesta' => 'correcto',
                    'id_insertado' => $stmt->insert_id,
                    'tipo' => $accion,
                    'nombre' => $proyecto
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

?>