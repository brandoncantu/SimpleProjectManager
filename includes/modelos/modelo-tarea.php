<?php
    $accion = $_POST['accion'];
    $tarea = $_POST['tarea'];
    $id = (int) $_POST['id'];

    if($accion == 'crear'){   
        include_once('../funciones/config.php');
        try{
            $sql = "INSERT INTO tareas (tarea, proyecto) values (?, ?)";
            $stmt = $link->prepare($sql);
            $stmt->bind_param('ss', $tarea, $id);
            $stmt->execute();
            if($stmt->affected_rows > 0){
                $respsuesta = array(
                    'respuesta' => 'correcto',
                    'id_insertado' => $stmt->insert_id,
                    'tipo' => $accion,
                    'tarea' => $tarea
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
//-----------------------------------------------
if($accion == 'check'){   
    include_once('../funciones/config.php');
    try{
        $sql = "UPDATE tareas set estado = ? where id_tarea = ? ";
        $stmt = $link->prepare($sql);
        $stmt->bind_param('ii',$tarea, $id);
        $stmt->execute();
        if($stmt->affected_rows > 0){
            $respsuesta = array(
                'respuesta' => 'correcto',
                'tipo' => $accion,
                'tarea' => $id,
                'estado' => $tarea
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
//-----------------------------------------------
if($accion == 'dump'){   
    include_once('../funciones/config.php');
    try{
        $sql = "DELETE FROM tareas where id_tarea = ? ";
        $stmt = $link->prepare($sql);
        $stmt->bind_param('i', $id);
        $stmt->execute();
        if($stmt->affected_rows > 0){
            $respsuesta = array(
                'respuesta' => 'correcto',
                'tipo' => $accion,
                'tarea' => $id
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