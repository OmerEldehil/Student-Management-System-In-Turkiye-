<?php
include("connection.php");
session_start();

if ($_SESSION['role'] !== 'admin') {
    header('Location: ../index.php');
    exit();
}

$user_id = $_SESSION['user_id'];
$username = $_SESSION['username'];
$role = $_SESSION['role'];

$sqlRequests = "SELECT * FROM registration_requests";
$resultRequests = mysqli_query($connection, $sqlRequests);

$sqlUsers = "SELECT * FROM users";
$resultUsers = mysqli_query($connection, $sqlUsers);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Requests</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet">   
    <link rel="stylesheet" href="../css/all.min.css">
    <link href="../css/master.css" rel="stylesheet" />
    <link rel="stylesheet" href="../css/admin.css">
    <script>
      setTimeout(function() {
        alert("Oturum süreniz doldu. Lütfen tekrar giriş yapın.");
        window.location.href = 'login.php';
      }, 1800000); // 30 dakika (1800 saniye) sonra
    </script>
</head>
<body>
<header>
      <div class="logo-side">
        <div class="logo">
          <span>LOGO</span>
        </div>
      </div>
      <div class="search-side"></div>
      <div class="links-side">
        <div class="bars" id="bars">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>
        </div>
        <div class="links-side-content">
          <div class="close">
            <svg id="links-close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>
          </div>
          <div class="links">
            <div class="account">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z"/></svg>
              <?php 
              echo $username . "<br>";
              if($role === "admin") {echo "Yetkili Kullanıcı";} else {echo "Normal Kullanıcı";}
              ?>
            </div>
            <ul>
              <li>
                <a href="home.php">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg>
                  <span>Ana Sayfa</span>
                </a>
              </li>
              <li>
                <a href="charts.php">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M160 80c0-26.5 21.5-48 48-48h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V80zM0 272c0-26.5 21.5-48 48-48H80c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V272zM368 96h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H368c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48z"/></svg>
                  <span>İstatistikler</span>
                </a>
              </li>
              <li>
                <a href="merkezler.php">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M408 120c0 54.6-73.1 151.9-105.2 192c-7.7 9.6-22 9.6-29.6 0C241.1 271.9 168 174.6 168 120C168 53.7 221.7 0 288 0s120 53.7 120 120zm8 80.4c3.5-6.9 6.7-13.8 9.6-20.6c.5-1.2 1-2.5 1.5-3.7l116-46.4C558.9 123.4 576 135 576 152V422.8c0 9.8-6 18.6-15.1 22.3L416 503V200.4zM137.6 138.3c2.4 14.1 7.2 28.3 12.8 41.5c2.9 6.8 6.1 13.7 9.6 20.6V451.8L32.9 502.7C17.1 509 0 497.4 0 480.4V209.6c0-9.8 6-18.6 15.1-22.3l122.6-49zM327.8 332c13.9-17.4 35.7-45.7 56.2-77V504.3L192 449.4V255c20.5 31.3 42.3 59.6 56.2 77c20.5 25.6 59.1 25.6 79.6 0zM288 152a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"/></svg>                            
                    <span>Merkezlerimiz</span>
                </a>
              </li>
              <?php if($role === "admin") : ?>
              <li>
                <a href="admin_requests.php">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z"/></svg>                
                <span>Kullanıcılar</span>
                </a>
              </li>
              <?php endif; ?>
              <li>
                <a href="logout.php">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"/></svg>                
                <span>Çıkış Yap</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
    <div class="container">
        <div class="current-users">
            <h1>Bulunan Kullanıcı Hesapları</h1>
            <?php while ($userRow = mysqli_fetch_assoc($resultUsers)): ?>
                <div class="user">
                    <p>Kullanıcı Adı: <?php echo $userRow['username']; ?></p>
                    <p>Rolü: <?php echo $userRow['role'] == "admin" ? "Yetkili Kullanıcı" : "Normal Kullanıcı"; ?></p>
                    <p>Kabul Tarihi: <?php echo $userRow['accepted_at']; ?></p>
                    <form method="POST" action="process_request.php">
                        <input type="hidden" name="user_id" value="<?php echo htmlspecialchars($userRow['user_id']); ?>">
                        <button class="role" type="submit" name="user_action" value="toggle_role">Rolü Değiştir</button>
                        <button class="sil" type="submit" name="user_action" value="delete">Hesabı Sil</button>
                    </form>
                </div>
            <?php endwhile; ?>
            <?php if (mysqli_num_rows($resultUsers) == 0): ?>
                <p>Kullanıcı Hesapları Bulunmamaktadır</p>
            <?php endif; ?>
        </div>
        <div class="requests">
            <h1>Hesap Açma Talepleri</h1>
            <?php if (mysqli_num_rows($resultRequests) > 0): ?>
                <?php while ($row = mysqli_fetch_assoc($resultRequests)): ?>
                    <div class="request">
                        <p>Kullanıcı Adı: <?php echo htmlspecialchars($row['username']); ?></p>
                        <p>Talep Tarihi: <?php echo htmlspecialchars($row['created_at']); ?></p>
                        <form method="POST" action="process_request.php">
                            <input type="hidden" name="request_id" value="<?php echo htmlspecialchars($row['id']); ?>">
                            <button class="approve" type="submit" name="action" value="approve">Kabul Et</button>
                            <button class="reject" type="submit" name="action" value="reject">Reddet</button>
                        </form>
                    </div>
                <?php endwhile; ?>
            <?php else: ?>
                <p>Hesap Açma Talebi Bulunmamaktadır</p>
            <?php endif; ?>
        </div>
    </div>

    <script src="../js/admin.js"></script>
    <?php include 'footer.php'; ?>
</body>
</html>

