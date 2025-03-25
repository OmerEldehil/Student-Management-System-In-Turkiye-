<?php
session_start();

if(!isset($_SESSION['username']) || !isset($_SESSION['user_id'])) {
  header('Location: ../index.php');
  exit();
} else {

include("connection.php");

// استقبال الاسم المرسل من الجافاسكريبت
$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id'];


if (!$connection) {
    die("Veri Tabanına Bağlantı Kurulamadı: " . mysqli_connect_error());
}

$query = "DELETE FROM ogrenciler WHERE id = '$id'";

if (mysqli_query($connection, $query)) {
    echo "Öğrenci Silindi";
} else {
    echo "Öğrenci Silinemedi: " . mysqli_error($connection);
}

mysqli_close($connection);
}
?>