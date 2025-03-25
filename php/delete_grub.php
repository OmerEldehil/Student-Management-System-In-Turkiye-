<?php
session_start();

if(!isset($_SESSION['username']) || !isset($_SESSION['user_id'])) {
  header('Location: ../index.php');
  exit();
} else {


include("connection.php");

// استقبال البيانات المرسلة من الجافا سكريبت
$data = json_decode(file_get_contents("php://input"), true);
$il_id = $data['il_id'];
$grub_ismi = $data['grub_ismi'];

// تحقق من وجود اتصال بقاعدة البيانات
if (!$connection) {
    die("Veri Tabanına Bağlantı Kurulamadı: " . mysqli_connect_error());
}

// استعلام SQL لحذف الفريق
$query = "DELETE FROM grublar WHERE il_id = '$il_id' AND grub_ismi = '$grub_ismi'";

// تنفيذ الاستعلام
if (mysqli_query($connection, $query)) {
    echo "Grub Basariyla Silindi";
} else {
    echo "Grub Silinmedi: " . mysqli_error($connection);
}

// إغلاق الاتصال بقاعدة البيانات
mysqli_close($connection);
}
?>