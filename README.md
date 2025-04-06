# 📌 Eğitim Platformu Öğrenci Yönetim Sistemi

## 📖 Genel Bakış
Bu proje, Türkiye'de örnek bir eğitim platformu için geliştirilen bir **öğrenci yönetim sistemidir**.  
Kullanıcılar, öğrencilerin verilerini yönetebilir ve onları **şehirlere ve eğitim programlarına** göre sınıflandırabilir.  
Sistem, her şehirdeki öğrencilerin verilerini göstermek için **interaktif bir Türkiye haritası** içerir.  

## 🎥 Proje Tanıtım Videoları
- 📌 **Türkçe:** https://youtu.be/hc116kMPo_k
- 📌 **English:** https://youtu.be/DPhREYZqzAU
- 📌 **العربية:** https://youtu.be/xnjJdfEUUwg 

## 🔧 Kullanılan Teknolojiler
- **Frontend:** HTML, CSS, JavaScript  
- **Backend:** PHP  
- **Veritabanı:** MySQL (Yerel sunucu için XAMPP kullanıldı)  

## ✨ Temel Özellikler
✅ **Giriş Sistemi:** Kullanıcılar **Yönetici (Admin)** veya **Normal Kullanıcı** olarak giriş yapabilir.  
✅ **Harita Entegrasyonu:** Türkiye haritasına tıklayarak şehirlerdeki öğrencileri görüntüleme.  
✅ **Öğrenci Yönetimi:** Öğrenci ekleme, düzenleme ve silme işlemleri.  
✅ **İstatistik Sayfası:** Öğrencilerin genel istatistikleri (aktif öğrenciler, mezunlar, sınıflara ve programlara göre dağılım vb.).  
✅ **Şehir ve Merkez Bilgileri:** Merkez türlerine göre şehirlerdeki öğrencileri görüntüleme.  
✅ **Kullanıcı Yönetimi (Yalnızca Adminler İçin):** Kullanıcıların yönetimi ve yeni üyelik başvurularını onaylama veya reddetme.  

## 📁 Proje Yapısı
/Student-Management-System-In-Turkiye 
│── /css → CSS dosyaları
│── /js → JavaScript dosyaları
│── /php → Backend PHP dosyaları ve Ana Dosyalar
│── /img → Görseller ve harita
│── example.sql → Örnek Veritabanı dosyası
│── index.php → Ana giriş sayfası
└── README.md → Proje açıklaması

## ⚡ Kurulum Talimatları
1️⃣ **XAMPP veya benzeri bir yerel sunucu kurun.**  
2️⃣ **Veritabanını oluşturun: `example.sql` dosyasını içe aktarın.** 
3️⃣ **`connection.php` dosyanızda veritabanı bağlantısını yapılandırın.**  
4️⃣ **Tarayıcınızda projeyi açın ve giriş yapın!**  

## 📌 Örnek Veritabanı Bağlantısı (`connection.php`)
```php
<?php
$connection = mysqli_connect("localhost", "root", "", "student_management");

if (!$connection) {
    die("Connection failed: " . mysqli_connect_error());
}
?>

## 📜 Lisans
Bu proje açık kaynaklıdır ve MIT Lisansı altında yayınlanmıştır.

## 📩 İletişim & Katkı
Projeye katkıda bulunmak istiyorsanız, lütfen bir Pull Request (PR) oluşturun veya bana ulaşın. 🎯
