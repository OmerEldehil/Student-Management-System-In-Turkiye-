<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Giriş Sayfası</title>
    <link rel="stylesheet" href="css/login.css">
</head>
<body>
    <div class="container">
    <h1 style="margin-top: 80px;">Giriş Yap</h1><br>


    <form action="php/login.php" method="POST">
        <?php if(isset($username_error)) {echo $username_error;}?>
        <input type="text" name="username" id="username" placeholder="Kullanıcı Adı" value="<?php echo isset($username) ? $username : ''; ?>"><br>

        <?php if(isset($password_error)) {echo $password_error;}?>
        <input type="password" name="password" id="password" placeholder="Şifre" value="<?php echo isset($password) ? $password : ''; ?>"><br>

        <input type="submit" name="submit" id="submit" value="Giriş Yap"><br>
    </form>
    
    <h3>Yada</h3><br>
    <a href="php/register.php">Yeni Hesap Oluştur</a>
    </div>
    <?php include 'php/footer.php'; ?>
</body>
</html>
