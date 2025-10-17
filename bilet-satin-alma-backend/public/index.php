<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once __DIR__ . '/../database.php';

$db = new Database();
$pdo = $db->getPdo();

$request_uri = $_SERVER['REQUEST_URI'];
$request_method = $_SERVER['REQUEST_METHOD'];
$request_body = json_decode(file_get_contents('php://input'), true);

if ($request_method === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Basic router
switch ($request_uri) {
    case '/api/register':
        if ($request_method === 'POST') {
            handle_register($pdo, $request_body);
        }
        break;
    case '/api/login':
        if ($request_method === 'POST') {
            handle_login($pdo, $request_body);
        }
        break;
    case '/api/tickets':
        if ($request_method === 'POST') {
            handle_purchase_ticket($pdo, $request_body);
        }
        break;
    case '/api/trips':
        if ($request_method === 'GET') {
            handle_get_trips($pdo);
        }
        break;
    case '/api/user/tickets':
        if ($request_method === 'GET') {
            handle_get_user_tickets($pdo);
        }
        break;
    case '/api/user/update':
        if ($request_method === 'PUT') {
            handle_update_user($pdo, $request_body);
        }
        break;
    case '/api/user/balance':
        if ($request_method === 'PUT') {
            handle_update_balance($pdo, $request_body);
        }
        break;
    default:
        if (preg_match('/\/api\/tickets\/(\w+)/', $request_uri, $matches)) {
            if ($request_method === 'DELETE') {
                handle_cancel_ticket($pdo, $matches[1]);
            }
        } else {
            http_response_code(404);
            echo json_encode(['message' => 'Bulamadık bunu.']);
        }
        break;
}

function handle_register($pdo, $data) {
    if (empty($data['full_name']) || empty($data['email']) || empty($data['password'])) {
        http_response_code(400);
        echo json_encode(['message' => 'Her yeri doldur canım']);
        return;
    }

    try {
        $stmt = $pdo->prepare('SELECT id FROM "User" WHERE email = :email');
        $stmt->execute(['email' => $data['email']]);
        if ($stmt->fetch()) {
            http_response_code(409);
            echo json_encode(['message' => 'Sahtecilik yapma, bu e-mail zaten kayıtlı!']);
            return;
        }

        $id = uniqid();
        $hashed_password = password_hash($data['password'], PASSWORD_BCRYPT);
        $created_at = date('Y-m-d H:i:s');

        $stmt = $pdo->prepare(
            'INSERT INTO "User" (id, full_name, email, role, password, created_at) 
             VALUES (:id, :full_name, :email, :role, :password, :created_at)'
        );

        $stmt->execute([
            'id' => $id,
            'full_name' => $data['full_name'],
            'email' => $data['email'],
            'role' => 'user',
            'password' => $hashed_password,
            'created_at' => $created_at
        ]);

        http_response_code(201);
        echo json_encode(['message' => 'Gezginin kaydı başarıyla tamamlandı', 'user_id' => $id]);

    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['message' => 'Database hatası: ' . $e->getMessage()]);
    }
}

function handle_login($pdo, $data) {
    if (empty($data['email']) || empty($data['password'])) {
        http_response_code(400);
        echo json_encode(['message' => 'Email ve şifre gerekli canım']);
        return;
    }

    try {
        $stmt = $pdo->prepare('SELECT * FROM "User" WHERE email = :email');
        $stmt->execute(['email' => $data['email']]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($data['password'], $user['password'])) {
            // In a real application, you would generate a JWT token here
            unset($user['password']);
            http_response_code(200);
            echo json_encode(['message' => 'Gezginin girişi başarılı', 'user' => $user]);
        } else {
            http_response_code(401);
            echo json_encode(['message' => 'Parolanı kontrol eder misin? Yanlış görünüyor.']);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['message' => 'Database hatası: ' . $e->getMessage()]);
    }
}

function handle_get_trips($pdo) {
    try {
        $stmt = $pdo->query(
            'SELECT t.*, bc.name as company_name, bc.logo_path 
             FROM "Trips" t 
             JOIN "Bus_Company" bc ON t.company_id = bc.id'
        );
        $trips_from_db = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $trips = array_map(function($trip) {
            return [
                'id' => $trip['id'],
                'from' => $trip['departure_city'],
                'to' => $trip['destination_city'],
                'departureDate' => date('Y-m-d', strtotime($trip['departure_time'])),
                'departureTime' => date('H:i', strtotime($trip['departure_time'])),
                'arrivalTime' => date('H:i', strtotime($trip['arrival_time'])),
                'busCompany' => $trip['company_name'],
                'price' => $trip['price'],
                'availableSeats' => range(1, $trip['capacity']), // Placeholder
                'busType' => '2+1', // Placeholder
                'features' => ['Wifi', 'USB', 'TV'] // Placeholder
            ];
        }, $trips_from_db);

        http_response_code(200);
        echo json_encode($trips);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['message' => 'Database hatası: ' . $e->getMessage()]);
    }
}

function get_user_id_from_header() {
    $auth_header = null;
    if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
        $auth_header = $_SERVER['HTTP_AUTHORIZATION'];
    } else if (function_exists('getallheaders')) {
        $headers = getallheaders();
        if (isset($headers['Authorization'])) {
            $auth_header = $headers['Authorization'];
        }
    }

    if ($auth_header) {
        if (preg_match('/Bearer\s(\S+)/', $auth_header, $matches)) {
            return $matches[1];
        }
    }
    
    return null;
}

function handle_get_user_tickets($pdo) {
    $user_id = get_user_id_from_header();
    if (!$user_id) {
        http_response_code(401);
        echo json_encode(['message' => 'Yetkisizsin, burası Mordor!']);
        return;
    }

    try {
        $stmt = $pdo->prepare(
            'SELECT t.*, tr.departure_city, tr.destination_city, tr.departure_time, tr.arrival_time, bc.name as company_name, bs.seat_number
             FROM "Tickets" t
             JOIN "Trips" tr ON t.trip_id = tr.id
             JOIN "Bus_Company" bc ON tr.company_id = bc.id
             JOIN "Booked_Seats" bs ON bs.ticket_id = t.id
             WHERE t.user_id = :user_id'
        );
        $stmt->execute(['user_id' => $user_id]);
        $tickets = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($tickets);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['message' => 'Database hatası: ' . $e->getMessage()]);
    }
}

function handle_update_user($pdo, $data) {
    $user_id = get_user_id_from_header();
    if (!$user_id) {
        http_response_code(401);
        echo json_encode(['message' => 'Yetkisizsin, burası Mordor!']);
        return;
    }

    if (empty($data['full_name'])) {
        http_response_code(400);
        echo json_encode(['message' => 'Adını gircen mi canım?']);
        return;
    }

    try {
        $stmt = $pdo->prepare('UPDATE "User" SET full_name = :full_name WHERE id = :id');
        $stmt->execute(['full_name' => $data['full_name'], 'id' => $user_id]);
        echo json_encode(['message' => 'Gezginin bilgileri başarıyla güncellendi']);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['message' => 'Database hatası: ' . $e->getMessage()]);
    }
}

function handle_update_balance($pdo, $data) {
    $user_id = get_user_id_from_header();
    if (!$user_id) {
        http_response_code(401);
        echo json_encode(['message' => 'Yetkisizsin, burası Mordor!']);
        return;
    }

    if (!isset($data['amount']) || !is_numeric($data['amount']) || $data['amount'] <= 0) {
        http_response_code(400);
        echo json_encode(['message' => 'Ne kadar ekleyeceksin canım?']);
        return;
    }

    try {
        $pdo->beginTransaction();

        $stmt = $pdo->prepare('SELECT balance FROM "User" WHERE id = :id');
        $stmt->execute(['id' => $user_id]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        $new_balance = $user['balance'] + $data['amount'];

        $stmt = $pdo->prepare('UPDATE "User" SET balance = :balance WHERE id = :id');
        $stmt->execute(['balance' => $new_balance, 'id' => $user_id]);

        $pdo->commit();

        // Return the updated user object
        $stmt = $pdo->prepare('SELECT * FROM "User" WHERE id = :id');
        $stmt->execute(['id' => $user_id]);
        $updated_user = $stmt->fetch(PDO::FETCH_ASSOC);
        unset($updated_user['password']);

        http_response_code(200);
        echo json_encode(['message' => 'Bakiyen güncellendi', 'user' => $updated_user]);

    } catch (PDOException $e) {
        $pdo->rollBack();
        http_response_code(500);
        echo json_encode(['message' => 'Database hatası: ' . $e->getMessage()]);
    }
}

function handle_purchase_ticket($pdo, $data) {
    $user_id = get_user_id_from_header();
    if (!$user_id) {
        http_response_code(401);
        echo json_encode(['message' => 'Yetkisizsin, burası Mordor!']);
        return;
    }

    if (empty($data['trip_id']) || empty($data['seat_number'])) {
        http_response_code(400);
        echo json_encode(['message' => 'Sefer ve koltuk numarası gerekli.']);
        return;
    }

    try {
        $pdo->beginTransaction();

        // Get trip price and user balance
        $stmt = $pdo->prepare('SELECT price FROM "Trips" WHERE id = :id');
        $stmt->execute(['id' => $data['trip_id']]);
        $trip = $stmt->fetch(PDO::FETCH_ASSOC);

        $stmt = $pdo->prepare('SELECT balance FROM "User" WHERE id = :id');
        $stmt->execute(['id' => $user_id]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user['balance'] < $trip['price']) {
            http_response_code(402);
            echo json_encode(['message' => 'Yetersiz bakiye.']);
            $pdo->rollBack();
            return;
        }

        // Update user balance
        $new_balance = $user['balance'] - $trip['price'];
        $stmt = $pdo->prepare('UPDATE "User" SET balance = :balance WHERE id = :id');
        $stmt->execute(['balance' => $new_balance, 'id' => $user_id]);

        // Create ticket
        $ticket_id = uniqid();
        $created_at = date('Y-m-d H:i:s');

        $stmt = $pdo->prepare(
            'INSERT INTO "Tickets" (id, user_id, trip_id, total_price, created_at) 
             VALUES (:id, :user_id, :trip_id, :total_price, :created_at)'
        );
        $stmt->execute([
            'id' => $ticket_id,
            'user_id' => $user_id,
            'trip_id' => $data['trip_id'],
            'total_price' => $trip['price'],
            'created_at' => $created_at
        ]);

        // Book the seat
        $stmt = $pdo->prepare(
            'INSERT INTO "Booked_Seats" (id, ticket_id, seat_number, created_at)
             VALUES (:id, :ticket_id, :seat_number, :created_at)'
        );
        $stmt->execute([
            'id' => uniqid(),
            'ticket_id' => $ticket_id,
            'seat_number' => $data['seat_number'],
            'created_at' => $created_at
        ]);

        $pdo->commit();

        // Return updated user
        $stmt = $pdo->prepare('SELECT * FROM "User" WHERE id = :id');
        $stmt->execute(['id' => $user_id]);
        $updated_user = $stmt->fetch(PDO::FETCH_ASSOC);
        unset($updated_user['password']);

        http_response_code(201);
        echo json_encode(['message' => 'Biletin başarıyla oluşturuldu!', 'user' => $updated_user]);

    } catch (PDOException $e) {
        $pdo->rollBack();
        http_response_code(500);
        echo json_encode(['message' => 'Database hatası: ' . $e->getMessage()]);
    }
}

function handle_cancel_ticket($pdo, $ticket_id) {
    $user_id = get_user_id_from_header();
    if (!$user_id) {
        http_response_code(401);
        echo json_encode(['message' => 'Yetkisizsin, burası Mordor!']);
        return;
    }

    try {
        // First, verify the ticket belongs to the user
        $stmt = $pdo->prepare('SELECT * FROM "Tickets" WHERE id = :id AND user_id = :user_id');
        $stmt->execute(['id' => $ticket_id, 'user_id' => $user_id]);
        $ticket = $stmt->fetch();

        if (!$ticket) {
            http_response_code(404);
            echo json_encode(['message' => 'Bu bilet sisler arasında kaybolmuş olabilir. Ya da iptal etme yetkisi henüz sana verilmedi.']);
            return;
        }

        $stmt = $pdo->prepare('DELETE FROM "Tickets" WHERE id = :id');
        $stmt->execute(['id' => $ticket_id]);
        
        // You might want to delete from Booked_Seats as well
        $stmt = $pdo->prepare('DELETE FROM "Booked_Seats" WHERE ticket_id = :ticket_id');
        $stmt->execute(['ticket_id' => $ticket_id]);

        echo json_encode(['message' => 'Bilet rüzgarlara karıştı.']);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['message' => 'Database hatası: ' . $e->getMessage()]);
    }
}

?>
