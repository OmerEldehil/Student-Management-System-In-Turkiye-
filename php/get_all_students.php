<?php
session_start();

if(!isset($_SESSION['username']) || !isset($_SESSION['user_id'])) {
  header('Location: ../index.php');
  exit();
} else {
  include("connection.php");
  
  $sql = "SELECT * FROM ogrenciler";
  
  $result = $connection->query($sql);
  
  // تحويل النتائج إلى مصفوفة
  $students = array();
  while($row = $result->fetch_assoc()) {
      $students[] = $row;
  }
  
  // إرجاع النتائج بتنسيق JSON
  echo json_encode($students);

}


?>
