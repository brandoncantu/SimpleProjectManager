<?php
    include_once('includes/funciones/sesiones.php');
    include 'includes/funciones/funciones.php';
    include_once('includes/templates/header.php');
    include_once('includes/templates/barra.php');
    
    // Obtener el ID de la URL
    if(isset($_GET['id_proyecto'])) {
        $id_proyecto = $_GET['id_proyecto'];
    }
    if(isset($_GET['nombre'])) {
        $nombre = $_GET['nombre'];
    }
    
?>

<div class="contenedor">
    
    <?php
        include 'includes/templates/sidebar.php';
    ?>

<main class="contenido-principal">

    <h1>Proyecto Actual: 
        <span><?php echo str_replace("%20", " ", $nombre);?></span>
    </h1>
    
        <form action="#" class="agregar-tarea">
            <div class="campo">
                <label for="tarea">Tarea:</label>
                <input type="text" placeholder="Nombre Tarea" class="nombre-tarea"> 
            </div>
            <div class="campo enviar">
                <input type="hidden" id="id_proyecto" value="<?php echo $id_proyecto?>">
                <input type="submit" class="boton nueva-tarea" value="Agregar">
            </div>
        </form>
        
        <div class="avance">
            <div id="barra-avance" class="barra-avance">
                <div id="porcentaje" class="porcentaje"></div>
            </div>
        </div>

        <h2>Listado de tareas:</h2>

        <div class="listado-pendientes">
            <ul>
            </ul>
        </div>

    </main>
</div><!--.contenedor-->

<?php
    include_once('includes/templates/footer.php');
?>