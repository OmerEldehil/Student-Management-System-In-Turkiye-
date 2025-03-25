<?php
session_start();

if(!isset($_SESSION['username']) || !isset($_SESSION['user_id'])) {
  header('Location: ../index.php');
  exit();
} else {
error_reporting(E_ALL);
ini_set('display_errors', 1);

include("connection.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $grubName = isset($_POST["grubName"]) ? $_POST["grubName"] : '';
    $grubBaskan = isset($_POST["grubBaskan"]) ? $_POST["grubBaskan"] : '';
    $grubBaskanTel = isset($_POST["grubBaskanTel"]) ? $_POST["grubBaskanTel"] : '';
    $ilIdToPHP = isset($_POST["ilIdToPHP"]) ? $_POST["ilIdToPHP"] : '';
    $ilAdToPHP = isset($_POST["ilAdToPHP"]) ? $_POST["ilAdToPHP"] : '';
    $DBtevarmiInput = isset($_POST["DBtevarmiInput"]) ? $_POST["DBtevarmiInput"] : '';

    $grubName = mysqli_real_escape_string($connection, $grubName);
    $grubBaskan = mysqli_real_escape_string($connection, $grubBaskan);
    $grubBaskanTel = mysqli_real_escape_string($connection, $grubBaskanTel);
    $ilIdToPHP = mysqli_real_escape_string($connection, $ilIdToPHP);
    $ilAdToPHP = mysqli_real_escape_string($connection, $ilAdToPHP);
    $DBtevarmiInput = mysqli_real_escape_string($connection, $DBtevarmiInput);
    
    $response = 'iceri girilmedi';


    if($DBtevarmiInput === "false") {
        $query = "INSERT INTO grublar(il_id, il_ad, grub_ismi, grub_baskani, baskan_tel) 
              VALUES ('$ilIdToPHP', '$ilAdToPHP', '$grubName', '$grubBaskan', '$grubBaskanTel')";

        if (mysqli_query($connection, $query)) {
            $response = array(
                'success' => true,
                'message' => 'grub Eklendi'
            );

            echo json_encode($response);
        } else {
            $response = array(
                'success' => false,
                'message' => 'grub Eklemede Yanlislik Oldu'
            );

            echo json_encode($response);
        }
    } else if($DBtevarmiInput === "true") {
        $query = "UPDATE grublar 
            SET grub_ismi = '$grubName',
                grub_baskani = '$grubBaskan',
                baskan_tel = '$grubBaskanTel'
            WHERE il_id = '$ilIdToPHP'";

        if (mysqli_query($connection, $query)) {
            $response = array(
                'success' => true,
                'message' => 'grub Guncellendi'
            );

            echo json_encode($response);
        } else {
            $response = array(
                'success' => false,
                'message' => 'grub Guncllemede Yanlislik Oldu'
            );

        }

    }

    echo json_encode($response);

    mysqli_close($connection);

    header("Location: home.php");
}
}
?>