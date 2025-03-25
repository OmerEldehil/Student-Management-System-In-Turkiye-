<?php
if (session_status() == PHP_SESSION_NONE) {
    // Oturum süresi 30 dakika (1800 saniye) olarak ayarlanır
    ini_set('session.gc_maxlifetime', 1800);
    session_set_cookie_params(1800);
    session_start();
} else {
    session_regenerate_id(true);
}

// Oturum başlangıç zamanını ayarla
if (!isset($_SESSION['start_time'])) {
    $_SESSION['start_time'] = time();
}

// Oturum süresini kontrol et (30 dakika)
$inactive = 1800; // 30 dakika

if (isset($_SESSION['start_time']) && (time() - $_SESSION['start_time'] > $inactive)) {
    // Oturum zaman aşımına uğradı, oturumu sonlandır
    session_unset();
    session_destroy();
    header("Location: login.php"); // Oturum kapanınca yönlendirme
    exit();
} else {
    // Oturum devam ediyor, başlangıç zamanını güncelle
    $_SESSION['start_time'] = time();
}
?>
