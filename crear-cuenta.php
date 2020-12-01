<?php
    include_once('includes/funciones/funciones.php');
    include_once('includes/templates/header.php');
?>
    <div class="contenedor-formulario">
        <img src="img/logo.PNG" alt="_SPManager">
        <form id="formulario" class=" caja-login" method="post">
            <div class="campo">
                <label for="usuario">Usuario: </label>
                <input type="text" name="usuario" id="usuario" placeholder="Usuario">
            </div>
            <div class="campo">
                <label for="password">Password: </label>
                <input type="password" name="password" id="password" placeholder="Password">
            </div>
            <div class="campo enviar">
                <input type="hidden" id="tipo" value="crear">
                <input type="submit" class="boton" value="Crear cuenta">
            </div>
            <div class="campo change">
                <a href="login">Inicia Sesión Aquí</a>
            </div>
        </form>
    </div>

<?php
    include_once('includes/templates/footer.php');
?>