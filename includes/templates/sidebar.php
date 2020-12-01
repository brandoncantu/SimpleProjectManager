<aside class="contenedor-proyectos">
        <div class="panel crear-proyecto">
            <a href="#" class="boton">Nuevo Proyecto <i class="fas fa-plus"></i> </a>
        </div>
    
        <div class="panel lista-proyectos">
            <h2>Proyectos</h2>
            <ul id="proyectos">
                <?php
                    $proyectos = obtenerProyectos();
                    //$proyecto1 = obtenerProyectosAll(8);
                    if($proyectos){
                        foreach($proyectos as $proyecto){ ?>
                            <li>
                                <a href="index.php?id_proyecto=<?php echo $proyecto['id_proyecto']."&nombre=".$proyecto['nombre'];?>" id="<?php echo $proyecto['id_proyecto'];?>">
                                <?php echo $proyecto['nombre'];?>
                                </a>
                            </li>
                        
                <?php   }
                    }
                ?>
            </ul>
        </div>
        <a class="logout-mobile" href="login.php?cerrar-sesion=true">Cerrar Sesión</a>
    </aside>