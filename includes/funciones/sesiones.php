<?php

session_start();
usuario_autenticado();

function usuario_autenticado(){
    if(!revisar_usuario()){
        header('Location: login');
        exit();
    }
}

function revisar_usuario(){
    return isset($_SESSION['nombre']);
}

?>