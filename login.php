<?php
    session_start();
    include_once('includes/funciones/funciones.php');
    include_once('includes/templates/header.php');

    if(isset($_GET['cerrar-sesion'])){
        $_SESSION = array();
    }
?>

    <div class="contenedor-formulario">
        <img src="img/logo.PNG" alt="_SPManager">
        <form id="formulario" class="caja-login" method="post">
            <div class="campo">
                <label for="usuario">Usuario: </label>
                <input type="text" name="usuario" id="usuario" placeholder="Usuario">
            </div>
            <div class="campo">
                <label for="password">Password: </label>
                <input type="password" name="password" id="password" placeholder="Password">
            </div>
            <div class="campo enviar">
                <input type="hidden" id="tipo" value="login">
                <input type="submit" class="boton" value="Iniciar Sesión">
            </div>

            <div class="campo change">
                <a href="crear-cuenta">Crea una cuenta nueva</a>
            </div>
        </form>
    </div>

<?php
    include 'includes/templates/footer.php';
?>