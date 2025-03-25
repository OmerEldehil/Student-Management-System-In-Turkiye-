<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Yeni Hesap</title>
    <link rel="stylesheet" href="../css/login.css">
</head>
<body>
    <div class="container">
        <h1>Yeni Hesap Oluşturma</h1><br>

        <form action="register_post.php" method="POST">
            <?php if(isset($username_error)) {echo $username_error;}?>
            <input type="text" name="username" id="username" placeholder="Kullanıcı Adı" value="<?php echo isset($username) ? $username : ''; ?>"><br>

            <?php if(isset($password_error)) {echo $password_error;}?>
            <input type="text" name="password" id="password" placeholder="Yeni Şifre" value="<?php echo isset($password) ? $password : ''; ?>"><br>

            <?php if(isset($password_repeat_error)) {echo $password_repeat_error;}?>
            <input type="text" name="password_repeat" id="password_repeat" placeholder="Yeni Şifre Tekrarı" value="<?php echo isset($password_repeat) ? $password_repeat : ''; ?>"><br>

            <input name="submit" type="submit" value="Kaydet">
        </form>

        <h3>Yada</h3><br>
        <a href="../index.php">Giriş Yap</a>
    </div>
</body>
</html>
