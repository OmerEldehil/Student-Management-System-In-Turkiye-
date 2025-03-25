
<?php
session_start();

if(!isset($_SESSION['username']) || !isset($_SESSION['user_id'])) {
  header('Location: ../index.php');
  exit();
} else {
include("connection.php");

$data = json_decode(file_get_contents("php://input"), true);
$gelenSehirler = $data['citiesToUpdate'];
$type = $data['type'];

if (!$connection) {
    die("Veri Tabanina Baglanilmadi " . mysqli_connect_error());
}



$query1 = "UPDATE iller SET $type = 'yok'";
mysqli_query($connection, $query1);

if (mysqli_query($connection, $query1)) {
    echo "Şehirler Silindi";
} else {
    echo "Şehirler Guncellemede Yanlislik Oldu: " . mysqli_error($connection);
}


for($i = 0; $i < count($gelenSehirler); $i++ ) {
    $city = $gelenSehirler[$i];
    
    $query2 = "UPDATE iller SET $type = 'var' WHERE il_id = '$city'";
    mysqli_query($connection, $query2);

    if (mysqli_query($connection, $query2)) {
        echo "Şehirler Guncellendi";
    } else {
        echo "Şehirler Guncellemede Yanlislik Oldu: " . mysqli_error($connection);
    }
}


mysqli_close($connection);
}
?>

