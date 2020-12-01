<?php
$id = $_POST['id'];
 include_once('../funciones/funciones.php');

 $tareas = obtenerTareas($id);
 $c_tarea = array();
 $all_info = array();
 foreach($tareas as $tarea){
    array_push($c_tarea, $tarea['id_tarea']);
    array_push($c_tarea, $tarea['tarea']);
    array_push($c_tarea, $tarea['estado']);
    array_push($all_info, $c_tarea);
    $c_tarea = array();

 }

//  array_push($all_info, $c_id);
//  array_push($all_info, $c_tarea);
//  array_push($all_info, $c_estado);
 

 echo json_encode($all_info);
?>
