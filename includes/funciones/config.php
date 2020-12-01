<?php
    define('DB_USUARIO', 'bf9c21fc2d651a');
    define('DB_PASSWORD', 'dd70c8e7');
    define('DB_HOST', 'us-cdbr-east-02.cleardb.com');
    define('DB_NOMBRE', 'heroku_f2eef08d6f776c1');

    $link = new mysqli(DB_HOST, DB_USUARIO, DB_PASSWORD, DB_NOMBRE );

    $link->set_charset('utf8');

?>
