<?php
session_start();

if(!isset($_SESSION['username']) || !isset($_SESSION['user_id'])) {
  header('Location: ../index.php');
  exit();
} else {
// Yeni gelen veriyi JSON'dan al
$data = json_decode(file_get_contents("php://input"), true);
$newNote = $data['note'];
$id = $data['id'];

include("connection.php");

if (!$connection) {
    die("Veri Tabanina Baglanilmadi " . mysqli_connect_error());
}

$newNote = stripcslashes($newNote);
$newNote = htmlentities(mysqli_real_escape_string($connection, $newNote));

// Hazırlanan ifadeler kullanarak SQL sorgusu
$query = "UPDATE ogrenciler SET note = ? WHERE id = ?";
$stmt = $connection->prepare($query);

if ($stmt === false) {
    die("Hazırlanan ifade oluşturulamadı: " . $connection->error);
}

// Parametreleri bağla
$stmt->bind_param("si", $newNote, $id);

// Hazırlanan ifadeyi çalıştır
if ($stmt->execute()) {
    echo "Note Guncellendi";
} else {
    echo "Note Guncellemede Yanlislik Oldu: " . $stmt->error;
}

// İfadeyi ve bağlantıyı kapat
$stmt->close();
$connection->close();
}
?>
