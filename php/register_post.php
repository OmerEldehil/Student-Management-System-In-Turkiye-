<?php
include("connection.php");

$err_s = 0;
$username = '';
$password = '';
$password_repeat = '';

if (isset($_POST['submit'])) {
    $username = stripcslashes($_POST['username']);
    $password = stripcslashes($_POST['password']);
    $password_repeat = stripcslashes($_POST['password_repeat']);

    $username = htmlentities(mysqli_real_escape_string($connection, $username));
    $password = htmlentities(mysqli_real_escape_string($connection, $password));
    $password_repeat = htmlentities(mysqli_real_escape_string($connection, $password_repeat));
    $md5_password = md5($password);

    $check_user = "SELECT * FROM `users` WHERE username='$username'";
    $check_result = mysqli_query($connection, $check_user);
    $num_rows = mysqli_num_rows($check_result);
    if ($num_rows != 0) {
        $username_error = '<p id="error">Bu Kullanıcı Adı Zaten Kullanılmaktadır, Başka Birini Deneyin</p>';
        $err_s = 1;
    }

    if (empty($username)) {
        $username_error = '<p id="error">Lütfen Kullanıcı Adı Yazınız!</p>';
        $err_s = 1;
    } elseif (str_word_count($username) > 1) {
        $username_error = '<p id="error">Kullanıcı Adı Sadece Bir Kelime Olmalıdır!</p>';
        $err_s = 1;
    } elseif (strlen($username) < 8) {
        $username_error = '<p id="error">Kullanıcı Adı En Az 8 Karekter Olamalıdır!</p>';
        $err_s = 1;
    } elseif (filter_var($username, FILTER_VALIDATE_INT)) {
        $username_error = '<p id="error">Lütfen Geçerli Bir Kullanıcı Adını Giriniz!</p>';
        $err_s = 1;
    }

    if (empty($password)) {
        $password_error = '<p id="error">Lütfen Şifre Yazınız!</p>';
        $err_s = 1;
    } elseif (strlen($password) < 8) {
        $password_error = '<p id="error">Şifre En Az 8 Karekter Olamalıdır!</p>';
        $err_s = 1;
    } elseif (!preg_match('/[A-Z]/', $password) || !preg_match('/[a-z]/', $password) || !preg_match('/[0-9]/', $password)) {
        $password_error = '<p id="error">Şifre büyük harf, küçük harf ve rakam içermelidir!</p>';
        $err_s = 1;
    } elseif (empty($password_repeat)) {
        $password_repeat_error = '<p id="error">Lütfen Şifre Tekrarını Yazınız!</p>';
        $err_s = 1;
    } elseif ($password !== $password_repeat) {
        $password_error = '<p id="error">Yazdığınız Şifreler Aynı Değildir!</p>';
        $err_s = 1;
    }

    if ($err_s == 0) {
        $sql = "INSERT INTO registration_requests(username, md5_pass) 
                VALUES ('$username', '$md5_password')";
        mysqli_query($connection, $sql);
        header('location:../index.php');
    } else {
        include('register.php');
    }
}
?>
