<?php
session_start();

if(!isset($_SESSION['username']) || !isset($_SESSION['user_id'])) {
  header('Location: ../index.php');
  exit();
} else {
include("connection.php");

function sendDebugInfo($info) {
    echo json_encode(["debug" => $info]);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['user_action'])) {
        if (isset($_POST['user_id'])) {
            $userId = intval($_POST['user_id']);
            if ($_POST['user_action'] == 'toggle_role') {
                // Toplam admin sayısını kontrol et
                $adminCountQuery = "SELECT COUNT(*) as admin_count FROM users WHERE role = 'admin'";
                $adminCountResult = $connection->query($adminCountQuery);
                if ($adminCountResult === false) {
                    sendDebugInfo('Query failed: ' . htmlspecialchars($connection->error));
                    exit();
                }
                $adminCountRow = $adminCountResult->fetch_assoc();
                $adminCount = intval($adminCountRow['admin_count']);




                $requestSql111 = "SELECT role FROM users WHERE user_id=?";
                $stmt = $connection->prepare($requestSql111);
                if ($stmt === false) {
                    sendDebugInfo('Prepare failed: ' . htmlspecialchars($connection->error));
                }
                $stmt->bind_param('i', $userId);
                $stmt->execute();
                if ($stmt->error) {
                    sendDebugInfo('Execute failed: ' . htmlspecialchars($stmt->error));
                }
                $requestResult111 = $stmt->get_result();
                $requestRow111 = $requestResult111->fetch_assoc();

                if (($adminCount > 1 && $userId !== 1) || $requestRow111['role'] === "user") {
                    $query = "UPDATE users SET role = IF(role = 'admin', 'user', 'admin') WHERE user_id = ?";
                    $stmt = $connection->prepare($query);
                    if ($stmt === false) {
                        sendDebugInfo('Prepare failed: ' . htmlspecialchars($connection->error));
                        exit();
                    }
                    $stmt->bind_param('i', $userId);
                    $stmt->execute();
                    if ($stmt->error) {
                        sendDebugInfo('Execute failed: ' . htmlspecialchars($stmt->error));
                        exit();
                    }
                    echo json_encode(["message" => "Kullanıcı rolü değiştirildi."]);
                } else {
                    echo json_encode(["message" => "En az bir admin olmalı."]);
                }
                exit();
            } elseif ($_POST['user_action'] == 'delete') {
                $query = "DELETE FROM users WHERE user_id = ?";
                $stmt = $connection->prepare($query);
                if ($stmt === false) {
                    sendDebugInfo('Prepare failed: ' . htmlspecialchars($connection->error));
                }
                $stmt->bind_param('i', $userId);
                $stmt->execute();
                if ($stmt->error) {
                    sendDebugInfo('Execute failed: ' . htmlspecialchars($stmt->error));
                }
                echo json_encode(["message" => "Kullanıcı hesabı silindi."]);
                exit();
            }
        } else {
            sendDebugInfo('user_id parametresi eksik.');
        }
    } elseif (isset($_POST['action'])) {
        if (isset($_POST['request_id'])) {
            $requestId = intval($_POST['request_id']);
            $action = $_POST['action']; 

            $requestSql = "SELECT * FROM registration_requests WHERE id=?";
            $stmt = $connection->prepare($requestSql);
            if ($stmt === false) {
                sendDebugInfo('Prepare failed: ' . htmlspecialchars($connection->error));
            }
            $stmt->bind_param('i', $requestId);
            $stmt->execute();
            if ($stmt->error) {
                sendDebugInfo('Execute failed: ' . htmlspecialchars($stmt->error));
            }
            $requestResult = $stmt->get_result();
            $requestRow = $requestResult->fetch_assoc();
            
            if ($action == 'approve') {
                $username = $requestRow['username'];
                $md5_pass = $requestRow['md5_pass'];
                $acceptedAt = date('Y-m-d H:i:s');

                $insertSql = "INSERT INTO users (username, role, md5_pass, accepted_at) VALUES (?, 'user', ?, ?)";
                $stmt = $connection->prepare($insertSql);
                if ($stmt === false) {
                    sendDebugInfo('Prepare failed: ' . htmlspecialchars($connection->error));
                }
                $stmt->bind_param('sss', $username, $md5_pass, $acceptedAt);
                $stmt->execute();
                if ($stmt->error) {
                    sendDebugInfo('Execute failed: ' . htmlspecialchars($stmt->error));
                }
                $deleteSql = "DELETE FROM registration_requests WHERE id=?";
                $stmt = $connection->prepare($deleteSql);
                if ($stmt === false) {
                    sendDebugInfo('Prepare failed: ' . htmlspecialchars($connection->error));
                }
                $stmt->bind_param('i', $requestId);
                $stmt->execute();
                if ($stmt->error) {
                    sendDebugInfo('Execute failed: ' . htmlspecialchars($stmt->error));
                }
                echo json_encode(["message" => "Talep kabul edildi."]);
                exit();
            } elseif ($action == 'reject') {
                $deleteSql = "DELETE FROM registration_requests WHERE id=?";
                $stmt = $connection->prepare($deleteSql);
                if ($stmt === false) {
                    sendDebugInfo('Prepare failed: ' . htmlspecialchars($connection->error));
                }
                $stmt->bind_param('i', $requestId);
                $stmt->execute();
                if ($stmt->error) {
                    sendDebugInfo('Execute failed: ' . htmlspecialchars($stmt->error));
                }
                echo json_encode(["message" => "Talep reddedildi."]);
                exit();
            }
        } else {
            sendDebugInfo('request_id parametresi eksik.');
        }
    }
}
}
?>
