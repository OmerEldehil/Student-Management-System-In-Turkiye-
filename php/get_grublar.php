<?php
session_start();

if(!isset($_SESSION['username']) || !isset($_SESSION['user_id'])) {
  header('Location: ../index.php');
  exit();
} else {
include("connection.php");

// استعلام SELECT لاسترجاع البيانات
$sql = "SELECT * FROM grublar";
$result = $connection->query($sql);

$grublar = array();
// استرجاع البيانات كمصفوفة متعددة الأبعاد
while($row = $result->fetch_assoc()) {
    $grublar[] = $row;
}

// إرسال البيانات بتنسيق JSON
echo json_encode($grublar);
}
?>
