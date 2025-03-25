<?php
$connection = mysqli_connect("localhost", "root", "", "student_management");

if (!$connection) {
    die("Connection failed: " . mysqli_connect_error());
}
?>