<?php
    error_reporting(0);
    require "dbutil/dbConnUtil.php";

    $filmId = $_REQUEST["filmId"];

    $sql = "select * from film_comment where filmId=$filmId  ";
    //echo $sql;

    $result = mysqli_query($conn,$sql);
 
    $resultArr = array();

    if($result&&$result->num_rows>=0){
        //设置查询消息
       $resultArr["msg"] = "查询成功";
       //设置查询状态  true 表示查询成功
       $resultArr["resultState"] = true;

       $commentArr = array();

       while ($row = mysqli_fetch_array($result,MYSQLI_ASSOC)) {
          array_push($commentArr, $row);
       }

       // 将查询结果放置在关联数组中
       $resultArr["result"] = $commentArr;
	   //echo "aa";
	   //print_r($resultArr);
   }else{
		//echo "aaa";
       $resultArr["msg"] = mysqli_error($conn);
       //设置查询状态  false  表示查询失败
       $resultArr["resultState"] = false;

       $resultArr["result"] = array();

   } 
  // print_r($resultArr);
   echo json_encode($resultArr);
    


?>