<?php
    define('DB_USUARIO', 'root');
    define('DB_PASSWORD', 'root');
    define('DB_HOST', 'localhost:3307');
    define('DB_NOMBRE', 'uptask');

    $link = new mysqli(DB_HOST, DB_USUARIO, DB_PASSWORD, DB_NOMBRE );

    $link->set_charset('utf8');

?>
