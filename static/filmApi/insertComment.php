<?php
    require "dbutil/dbConnUtil.php";

    $username = $_REQUEST["username"];
    $userImg = $_REQUEST["userImg"];
    $userSource = $_REQUEST["userSource"];
    $userMsg = $_REQUEST["userMsg"];
    $filmId = $_REQUEST["filmId"];

    $sql = "insert into film_comment (username, userImg, userSource, userMsg, createTime, filmId) values ('$username', '$userImg', '$userSource', '$userMsg', now(), '$filmId') ";
    //echo $sql;

    $result = mysqli_query($conn,$sql);

    echo $result;
    


?>