<?php
    $user = 'bf9c21fc2d651a';
    $password = 'dd70c8e7';
    $db = 'heroku_f2eef08d6f776c1';
    $host = 'us-cdbr-east-02.cleardb.com';

    $link = mysqli_connect($host, $user, $password, $db);
        if(!$link){
            die("Connection failed: " . mysqli_connect_error());
        }else{
            //echo "Connection succesfull!";
        }

?>
