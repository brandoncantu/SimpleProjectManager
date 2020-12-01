<?php

function obtenerPagActual(){
    $archivo = basename($_SERVER['PHP_SELF']);
    $pagina = str_replace('.php', "", $archivo);
    return $pagina;
}

function obtenerProyectos(){
    include_once('config.php');
    try{
        return $link->query('SELECT id_proyecto, nombre FROM proyectos');
    }catch(Exception $e){
        echo "Error!: " . $e->getMessage();
        return false;
    }
}

function obtenerNombre($id){
    include_once('config.php');
    //try{
        $sql = $link->query("SELECT nombre FROM proyectos WHERE id_proyecto = {$id}");
        $arr = $sql->fetch_array(MYSQLI_ASSOC);
        $res = $arr['nombre']; 
        echo $res;
    //}catch(Exception $e){
    //    echo "Error!: " . $e->getMessage();
    //    return false;
    //}
}


function obtenerTareas($id){
    include_once('config.php');
    try{
        return $link->query("SELECT id_tarea, tarea, estado FROM tareas where proyecto = {$id}");
    }catch(Exception $e){
        echo "Error!: " . $e->getMessage();
        return false;
    }
}
?>