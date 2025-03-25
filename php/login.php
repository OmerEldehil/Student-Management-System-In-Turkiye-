<?php
include("connection.php");

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

$username = '';
$password = '';
$err_s = 0;

if(isset($_POST['username']) && isset($_POST['password'])){
    $username = stripcslashes($_POST['username']);
    $password = stripcslashes($_POST['password']);
    
    // Girdileri sanitize et
    $username = mysqli_real_escape_string($connection, strip_tags(htmlspecialchars($username)));
    $password = mysqli_real_escape_string($connection, strip_tags(htmlspecialchars($password)));
    
    $md5_pass = md5($password);

    if(empty($username)) {
        $username_error = '<p id="error">Lütfen Kullanıcı Adını Yazınız!</p>';
        $err_s = 1;
    }

    if(empty($password)) {
        $password_error = '<p id="error">Lütfen Şifreyi Yazınız!</p>';
        $err_s = 1;
    }

    if($err_s == 0) {
        $sql = "SELECT user_id, role, username FROM users WHERE username='$username' AND md5_pass='$md5_pass' LIMIT 1";
        $result = mysqli_query($connection, $sql);

        if(mysqli_num_rows($result) != 0){
            $row = mysqli_fetch_assoc($result);

            if($row['username'] === $username){
                $_SESSION['username'] = $row['username'];
                $_SESSION['user_id'] = $row['user_id'];
                $_SESSION['role'] = $row['role'];
                header('Location:home.php');
                exit();
            }
        } else {
            $username_error = '<p id="error">Yanlış Kullanıcı Adı Yada Şifre</p>';
        }
    }
}
include_once('../index.php');
?>
