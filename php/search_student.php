<?php
session_start();

if(!isset($_SESSION['username']) || !isset($_SESSION['user_id'])) {
  header('Location: ../index.php');
  exit();
} else {

include("connection.php");

$name = preg_replace("/[^a-zA-Z\s]/", "", $_GET['name']);

// SQL sorgusunu hazırla
$sql = "SELECT * FROM ogrenciler WHERE adsoyad LIKE ?";
$stmt = $connection->prepare($sql);

// Parametreleri bağla ve sorguyu çalıştır
$stmt->bind_param("s", $nameParam);
$nameParam = "%{$name}%";
$stmt->execute();

// Sonuçları al
$result = $stmt->get_result();

$students = array();
while($row = $result->fetch_assoc()) {
    $students[] = $row;
}

echo json_encode($students);

// Bağlantıyı kapat
$stmt->close();
$connection->close();
}

?>
