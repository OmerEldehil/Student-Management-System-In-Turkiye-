<?php
session_start();

if(!isset($_SESSION['username']) || !isset($_SESSION['user_id'])) {
  header('Location: ../index.php');
  exit();
} else {

include("connection.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = isset($_POST["studentName"]) ? $_POST["studentName"] : '';
    $university = isset($_POST["studentUniversity"]) ? $_POST["studentUniversity"] : '';
    $major = isset($_POST["studentMajor"]) ? $_POST["studentMajor"] : '';
    $class = isset($_POST["studentClass"]) ? $_POST["studentClass"] : '';
    $phone = isset($_POST["studentPhone"]) ? $_POST["studentPhone"] : '';
    $homeland = isset($_POST["studentHomeland"]) ? $_POST["studentHomeland"] : '';
    $akademik = isset($_POST["studentAkademik"]) ? $_POST["studentAkademik"] : '';
    $burs = isset($_POST["studentBurs"]) ? $_POST["studentBurs"] : '';
    $il = isset($_POST["il"]) ? $_POST["il"] : '';
    $isUpdate = isset($_POST["isUpdate"]) ? $_POST["isUpdate"] : '';
    $studentId = isset($_POST["studentId"]) ? $_POST["studentId"] : '';

    $name = stripcslashes($name);
    $university = stripcslashes($university);
    $major = stripcslashes($major);
    $class = stripcslashes($class);
    $phone = stripcslashes($phone);
    $homeland = stripcslashes($homeland);
    $akademik = stripcslashes($akademik);
    $burs = stripcslashes($burs);
    $il = stripcslashes($il);
    $isUpdate = stripcslashes($isUpdate);
    $studentId = stripcslashes($studentId);

    $name = mysqli_real_escape_string($connection, $name);
    $university = mysqli_real_escape_string($connection, $university);
    $major = mysqli_real_escape_string($connection, $major);
    $class = mysqli_real_escape_string($connection, $class);
    $phone = mysqli_real_escape_string($connection, $phone);
    $homeland = mysqli_real_escape_string($connection, $homeland);
    $akademik = mysqli_real_escape_string($connection, $akademik);
    $burs = mysqli_real_escape_string($connection, $burs);
    $il = mysqli_real_escape_string($connection, $il);
    $isUpdate = mysqli_real_escape_string($connection, $isUpdate);
    $studentId = mysqli_real_escape_string($connection, $studentId);

    $phone = trim($phone);
    if (substr($phone, 0, 2) === "05" && strlen($phone) === 11) {
        $phone = substr($phone, 0, 4) . " " . substr($phone, 4, 3) . " " . substr($phone, 7, 2) . " " . substr($phone, 9, 2);
    } else if (substr($phone, 0, 1) === "5" && strlen($phone) === 10) { //  5376810788
        $phone = "0" . substr($phone, 0, 3) . " " . substr($phone, 3, 3) . " " . substr($phone, 6, 2) . " " . substr($phone, 8, 2);
    }
    
    $response = array();

    if($isUpdate === "ekleme") {
        $query = "INSERT INTO ogrenciler(adsoyad, universite, bolum, sinif, tel, memleket, akademik, burs, il) 
              VALUES ('$name', '$university', '$major', '$class', '$phone', '$homeland', '$akademik', '$burs', '$il')";

        if (mysqli_query($connection, $query)) {
            $response = array(
                'success' => true,
                'message' => 'Ogrenci Eklendi'
            );
        } else {
            $response = array(
                'success' => false,
                'message' => 'Ogrenci Eklemede Yanlislik Oldu'
            );
        }
    } else if($isUpdate === "guncelleme") {
        $query = "UPDATE ogrenciler 
            SET adsoyad = '$name',
                universite = '$university',
                bolum = '$major',
                sinif = '$class',
                tel = '$phone',
                memleket = '$homeland',
                akademik = '$akademik',
                burs = '$burs',
                il = '$il'
            WHERE id = '$studentId'";

        if (mysqli_query($connection, $query)) {
            $response = array(
                'success' => true,
                'message' => 'Ogrenci Guncellendi'
            );
        } else {
            $response = array(
                'success' => false,
                'message' => 'Ogrenci Guncellemede Yanlislik Oldu'
            );
        }
    }

    mysqli_close($connection);

    header('Content-Type: application/json');
    echo json_encode($response);
    exit;
}
}
?>
