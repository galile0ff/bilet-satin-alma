<?php
date_default_timezone_set('Europe/Istanbul');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once __DIR__ . '/../database.php';

$db = new Database();
$pdo = $db->getPdo();

$request_uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$request_method = $_SERVER['REQUEST_METHOD'];
$request_body = json_decode(file_get_contents('php://input'), true);

if ($request_method === 'OPTIONS') {
    http_response_code(200);
    exit();
}

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
        } elseif ($request_method === 'POST') {
            handle_create_trip($pdo, $request_body);
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
    case '/api/cities':
        if ($request_method === 'GET') {
            handle_get_cities($pdo);
        }
        break;
    case '/api/register/company':
        if ($request_method === 'POST') {
            handle_company_register($pdo, $request_body);
        }
        break;
    case '/api/company/trips':
        if ($request_method === 'GET') {
            handle_get_company_trips($pdo);
        }
        break;
    case '/api/user/notifications':
        if ($request_method === 'GET') {
            handle_get_user_notifications($pdo);
        }
        break;
    case '/api/company/update':
        if ($request_method === 'PUT') {
            handle_update_company($pdo, $request_body);
        }
        break;
    case '/api/company/coupons':
        if ($request_method === 'POST') {
            handle_create_coupon($pdo, $request_body);
        } elseif ($request_method === 'GET') {
            handle_get_company_coupons($pdo);
        }
        break;
    case '/api/clean-mock-trips':
        if ($request_method === 'DELETE') {
            handle_clean_mock_trips($pdo);
        }
        break;
    case '/api/coupons/validate':
        if ($request_method === 'POST') {
            handle_validate_coupon($pdo, $request_body);
        }
        break;
    case '/api/public-coupons':
        if ($request_method === 'GET') {
            handle_get_public_coupons($pdo);
        }
        break;
    case '/api/public-companies':
        if ($request_method === 'GET') {
            handle_get_public_companies($pdo);
        }
        break;
    case '/api/admin/users':
        if ($request_method === 'GET') {
            handle_admin_get_users($pdo);
        }
        break;
    case '/api/admin/companies':
        if ($request_method === 'GET') {
            handle_admin_get_companies($pdo);
        }
        break;
    case '/api/admin/all-coupons':
        if ($request_method === 'GET') {
            handle_admin_get_all_coupons($pdo);
        }
        break;
    case '/api/admin/coupons':
        if ($request_method === 'POST') {
            handle_admin_create_coupon($pdo, $request_body);
        }
        break;
    case '/api/admin/company-users':
        if ($request_method === 'POST') {
            handle_admin_create_company_user($pdo, $request_body);
        }
        break;
    default:
        if (preg_match('/\/api\/notifications\/(\w+)\/read/', $request_uri, $matches)) {
            if ($request_method === 'PUT') {
                handle_mark_notification_as_read($pdo, $matches[1]);
            }
        } else if (preg_match('/\/api\/trips\/(\w+)\/passengers/', $request_uri, $matches)) {
            if ($request_method === 'GET') {
                handle_get_trip_passengers($pdo, $matches[1]);
            }
        }
        else if (preg_match('/\/api\/trips\/(\w+)/', $request_uri, $matches)) {
            if ($request_method === 'PUT') {
                handle_update_trip($pdo, $matches[1], $request_body);
            } elseif ($request_method === 'DELETE') {
                handle_delete_trip($pdo, $matches[1]);
            }
        }
        else if (preg_match('/\/api\/tickets\/(\w+)/', $request_uri, $matches)) {
            if ($request_method === 'DELETE') {
                handle_cancel_ticket($pdo, $matches[1]);
            }
        } else if (preg_match('/\/api\/company\/tickets\/(\w+)/', $request_uri, $matches)) {
            if ($request_method === 'DELETE') {
                handle_company_cancel_ticket($pdo, $matches[1]);
            }
        } else if (preg_match('/\/api\/company\/coupons\/(\w+)\/usage/', $request_uri, $matches)) {
            if ($request_method === 'GET') {
                handle_get_coupon_usage($pdo, $matches[1]);
            }
        } else if (preg_match('/\/api\/company\/coupons\/(\w+)/', $request_uri, $matches)) {
            if ($request_method === 'PUT') {
                handle_update_coupon($pdo, $matches[1], $request_body);
            } elseif ($request_method === 'DELETE') {
                handle_delete_coupon($pdo, $matches[1]);
            }
        } else if (preg_match('/\/api\/admin\/coupons\/(\w+)/', $request_uri, $matches)) {
            if ($request_method === 'DELETE') {
                handle_admin_delete_coupon($pdo, $matches[1]);
            }
        } else if (preg_match('/\/api\/admin\/users\/(\w+)/', $request_uri, $matches)) {
            if ($request_method === 'DELETE') {
                handle_admin_delete_user($pdo, $matches[1]);
            } elseif ($request_method === 'PUT') {
                handle_admin_update_user($pdo, $matches[1], $request_body);
            }
        } else {
            http_response_code(404);
            echo json_encode(['message' => 'Bulamadık bunu.']);
        }
        break;
}

function handle_company_register($pdo, $data) {
    if (empty($data['full_name']) || empty($data['email']) || empty($data['password']) || empty($data['company_name'])) {
        http_response_code(400);
        echo json_encode(['message' => 'Tüm alanları doldurun.']);
        return;
    }

    try {
        $pdo->beginTransaction();

        $stmt = $pdo->prepare('SELECT id FROM "Bus_Company" WHERE name = :name');
        $stmt->execute(['name' => $data['company_name']]);
        if ($stmt->fetch()) {
            http_response_code(409);
            echo json_encode(['message' => 'Bu kervan adı zaten Orta Dünya yollarında yankılanıyor.']);
            $pdo->rollBack();
            return;
        }

        $stmt = $pdo->prepare('SELECT id FROM "User" WHERE email = :email');
        $stmt->execute(['email' => $data['email']]);
        if ($stmt->fetch()) {
            http_response_code(409);
            echo json_encode(['message' => 'Sahtecilik yapma, bu e-mail zaten kayıtlı!']);
            $pdo->rollBack();
            return;
        }

        $company_id = uniqid();
        $created_at = date('Y-m-d H:i:s');
        $stmt = $pdo->prepare(
            'INSERT INTO "Bus_Company" (id, name, created_at) 
             VALUES (:id, :name, :created_at)'
        );
        $stmt->execute([
            'id' => $company_id,
            'name' => $data['company_name'],
            'created_at' => $created_at
        ]);

        $user_id = uniqid();
        $hashed_password = password_hash($data['password'], PASSWORD_BCRYPT);
        $stmt = $pdo->prepare(
            'INSERT INTO "User" (id, full_name, email, role, password, company_id, created_at) 
             VALUES (:id, :full_name, :email, :role, :password, :company_id, :created_at)'
        );
        $stmt->execute([
            'id' => $user_id,
            'full_name' => $data['full_name'],
            'email' => $data['email'],
            'role' => 'company',
            'password' => $hashed_password,
            'company_id' => $company_id,
            'created_at' => $created_at
        ]);

        $pdo->commit();

        http_response_code(201);
        echo json_encode(['message' => 'Kervanın yola çıkmaya hazır canım.', 'user_id' => $user_id, 'company_id' => $company_id]);

    } catch (PDOException $e) {
        $pdo->rollBack();
        http_response_code(500);
        echo json_encode(['message' => 'Database hatası: ' . $e->getMessage()]);
    }
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
            if ($user['role'] === 'company' && !empty($user['company_id'])) {
                $stmt = $pdo->prepare('SELECT name FROM "Bus_Company" WHERE id = :company_id');
                $stmt->execute(['company_id' => $user['company_id']]);
                $company = $stmt->fetch(PDO::FETCH_ASSOC);
                if ($company) {
                    $user['company_name'] = $company['name'];
                }
            }
            
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
        $from = $_GET['from'] ?? null;
        $to = $_GET['to'] ?? null;

        $sql = 'SELECT t.*, bc.name as company_name, bc.logo_path 
                FROM "Trips" t 
                JOIN "Bus_Company" bc ON t.company_id = bc.id';
        
        $params = [];
        $conditions = [];

        if ($from) {
            $conditions[] = 't.departure_city = :from';
            $params[':from'] = $from;
        }
        if ($to) {
            $conditions[] = 't.destination_city = :to';
            $params[':to'] = $to;
        }

        if (!empty($conditions)) {
            $sql .= ' WHERE ' . implode(' AND ', $conditions);
        }

        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        $trips_from_db = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $trips = array_map(function($trip) use ($pdo) {
            $stmt = $pdo->prepare(
                'SELECT bs.seat_number 
                 FROM "Booked_Seats" bs
                 JOIN "Tickets" t ON bs.ticket_id = t.id
                 WHERE t.trip_id = :trip_id'
            );
            $stmt->execute(['trip_id' => $trip['id']]);
            $booked_seats = $stmt->fetchAll(PDO::FETCH_COLUMN);

            return [
                'id' => $trip['id'],
                'from' => $trip['departure_city'],
                'to' => $trip['destination_city'],
                'departureDate' => date('Y-m-d', strtotime($trip['departure_time'])),
                'departureTime' => date('H:i', strtotime($trip['departure_time'])),
                'arrivalTime' => date('H:i', strtotime($trip['arrival_time'])),
                'busCompany' => $trip['company_name'],
                'price' => $trip['price'],
                'bookedSeats' => array_map('intval', $booked_seats),
                'capacity' => $trip['capacity'],
                'busType' => '2+1', 
                'features' => ['Wifi', 'USB', 'TV'] 
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
    } catch (Throwable $e) {
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

    try {
        $stmt = $pdo->prepare('SELECT role, balance FROM "User" WHERE id = :id');
        $stmt->execute(['id' => $user_id]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$user) {
            http_response_code(404);
            echo json_encode(['message' => 'Kullanıcı bulunamadı.']);
            return;
        }

        if ($user['role'] === 'company') {
            http_response_code(403);
            echo json_encode(['message' => 'Firma hesapları bilet satın alamaz.']);
            return;
        }

        if (empty($data['trip_id']) || empty($data['seat_number'])) {
            http_response_code(400);
            echo json_encode(['message' => 'Sefer ve koltuk numarası gerekli.']);
            return;
        }

        $pdo->beginTransaction();

        $stmt = $pdo->prepare('SELECT price, company_id FROM "Trips" WHERE id = :id');
        $stmt->execute(['id' => $data['trip_id']]);
        $trip = $stmt->fetch(PDO::FETCH_ASSOC);
        $final_price = $trip['price'];
        $coupon_id = null;

        if (!empty($data['coupon_code'])) {
            $coupon_code = $data['coupon_code'];
            $stmt = $pdo->prepare(
                'SELECT c.*, COUNT(cu.id) as usage_count
                FROM "Coupons" c
                LEFT JOIN "Coupon_Usage" cu ON c.id = cu.coupon_id
                WHERE c.code = :code AND (c.company_id IS NULL OR c.company_id = :company_id)
                GROUP BY c.id'
            );
            $stmt->execute(['code' => $coupon_code, 'company_id' => $trip['company_id']]);
            $coupon = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($coupon && new DateTime() < new DateTime($coupon['expiry_date']) && $coupon['usage_count'] < $coupon['usage_limit']) {
                $discount_amount = ($trip['price'] * $coupon['discount_rate']) / 100;
                $final_price = $trip['price'] - $discount_amount;
                $coupon_id = $coupon['id'];
            }
        }

        if ($user['balance'] < $final_price) {
            http_response_code(402);
            echo json_encode(['message' => 'Yetersiz bakiye.']);
            $pdo->rollBack();
            return;
        }

        $new_balance = $user['balance'] - $final_price;
        $stmt = $pdo->prepare('UPDATE "User" SET balance = :balance WHERE id = :id');
        $stmt->execute(['balance' => $new_balance, 'id' => $user_id]);

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
            'total_price' => $final_price,
            'created_at' => $created_at
        ]);

        if ($coupon_id) {
            $stmt = $pdo->prepare(
                'INSERT INTO "Coupon_Usage" (id, coupon_id, user_id, used_at) 
                 VALUES (:id, :coupon_id, :user_id, :used_at)'
            );
            $stmt->execute([
                'id' => uniqid(),
                'coupon_id' => $coupon_id,
                'user_id' => $user_id,
                'used_at' => $created_at
            ]);
        }

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
        $pdo->beginTransaction();

        $stmt = $pdo->prepare(
            'SELECT t.*, tr.departure_time 
             FROM "Tickets" t
             JOIN "Trips" tr ON t.trip_id = tr.id
             WHERE t.id = :id AND t.user_id = :user_id'
        );
        $stmt->execute(['id' => $ticket_id, 'user_id' => $user_id]);
        $ticket = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$ticket) {
            http_response_code(404);
            echo json_encode(['message' => 'Bu bilet sisler arasında kaybolmuş olabilir. Ya da iptal etme yetkisi henüz sana verilmedi.']);
            $pdo->rollBack();
            return;
        }

        $departure_time = new DateTime($ticket['departure_time'], new DateTimeZone('Europe/Istanbul'));
        $cancellation_limit = (new DateTime('now', new DateTimeZone('Europe/Istanbul')))->add(new DateInterval('PT1H'));

        if ($departure_time < $cancellation_limit) {
            http_response_code(400);
            echo json_encode(['message' => 'Seferin kalkışına 1 saatten az bir süre kaldığı için bilet iptal edilemez.']);
            $pdo->rollBack();
            return;
        }

        $stmt = $pdo->prepare('UPDATE "User" SET balance = balance + :amount WHERE id = :id');
        $stmt->execute(['amount' => $ticket['total_price'], 'id' => $user_id]);

        $stmt = $pdo->prepare('DELETE FROM "Tickets" WHERE id = :id');
        $stmt->execute(['id' => $ticket_id]);
        
        $stmt = $pdo->prepare('DELETE FROM "Booked_Seats" WHERE ticket_id = :ticket_id');
        $stmt->execute(['ticket_id' => $ticket_id]);

        $pdo->commit();

        $stmt = $pdo->prepare('SELECT * FROM "User" WHERE id = :id');
        $stmt->execute(['id' => $user_id]);
        $updated_user = $stmt->fetch(PDO::FETCH_ASSOC);
        unset($updated_user['password']);

        http_response_code(200);
        echo json_encode(['message' => 'Bilet rüzgarlara karıştı ve tutar bakiyene eklendi.', 'user' => $updated_user]);

    } catch (PDOException $e) {
        $pdo->rollBack();
        http_response_code(500);
        echo json_encode(['message' => 'Database hatası: ' . $e->getMessage()]);
    }
}

function handle_get_cities($pdo) {
    try {
        $stmt = $pdo->query('SELECT DISTINCT departure_city FROM "Trips"');
        $departure_cities = $stmt->fetchAll(PDO::FETCH_COLUMN);

        $stmt = $pdo->query('SELECT DISTINCT destination_city FROM "Trips"');
        $destination_cities = $stmt->fetchAll(PDO::FETCH_COLUMN);

        $cities = array_unique(array_merge($departure_cities, $destination_cities));
        sort($cities);

        http_response_code(200);
        echo json_encode($cities);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['message' => 'Database hatası: ' . $e->getMessage()]);
    }
}

function handle_get_company_trips($pdo) {
    $user_id = get_user_id_from_header();
    if (!$user_id) {
        http_response_code(401);
        echo json_encode(['message' => 'Yetkisizsin burası Mordor!']);
        return;
    }

    try {
        $stmt = $pdo->prepare('SELECT company_id FROM "User" WHERE id = :id AND role = "company"');
        $stmt->execute(['id' => $user_id]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$user || !$user['company_id']) {
            http_response_code(403);
            echo json_encode(['message' => 'Bu işlem için yetkiniz yok.']);
            return;
        }
        $company_id = $user['company_id'];

        $stmt = $pdo->prepare('SELECT * FROM "Trips" WHERE company_id = :company_id ORDER BY departure_time ASC');
        $stmt->execute(['company_id' => $company_id]);
        $trips = $stmt->fetchAll(PDO::FETCH_ASSOC);

        http_response_code(200);
        echo json_encode($trips);

    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['message' => 'Database hatası: ' . $e->getMessage()]);
    }
}

function handle_create_trip($pdo, $data) {
    try {
        $user_id = get_user_id_from_header();
        if (!$user_id) {
            http_response_code(401);
            echo json_encode(['message' => 'Yetkisizsin burası Mordor!']);
            return;
        }

        $stmt = $pdo->prepare('SELECT company_id FROM "User" WHERE id = :id AND role = "company"');
        $stmt->execute(['id' => $user_id]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$user || !$user['company_id']) {
            http_response_code(403);
            echo json_encode(['message' => 'Bu işlem için yetkiniz yok.']);
            return;
        }
        $company_id = $user['company_id'];

        if (
            !isset($data['destination_city']) || $data['destination_city'] === '' ||
            !isset($data['arrival_time']) || $data['arrival_time'] === '' ||
            !isset($data['departure_time']) || $data['departure_time'] === '' ||
            !isset($data['departure_city']) || $data['departure_city'] === '' ||
            !isset($data['price']) || $data['price'] === '' ||
            !isset($data['capacity']) || $data['capacity'] === ''
        ) {
            http_response_code(400);
            echo json_encode(['message' => 'Tüm alanları doldurun.']);
            return;
        }

        $departure_city_upper = strtoupper($data['departure_city']);
        $destination_city_upper = strtoupper($data['destination_city']);

        if ($departure_city_upper === $destination_city_upper) {
            http_response_code(400);
            echo json_encode(['message' => 'Kalkış ve varış noktası aynı olamaz.']);
            return;
        }

        if ((int)$data['capacity'] > 20) {
            http_response_code(400);
            echo json_encode(['message' => 'Maksimum kapasite 20 olabilir.']);
            return;
        }

        $departure_dt = new DateTime($data['departure_time'], new DateTimeZone('Europe/Istanbul'));
        $arrival_dt = new DateTime($data['arrival_time'], new DateTimeZone('Europe/Istanbul'));
        $current_time = new DateTime('now', new DateTimeZone('Europe/Istanbul'));

        if ($departure_dt < $current_time) {
            http_response_code(400);
            echo json_encode(['message' => 'Zamanın akışıyla oynamak tehlikelidir sevgili firma sahibi. Geçmişe sefer düzenlenemez — çünkü hiçbir at, rüzgârı geriye doğru koşturamaz.']);
            return;
        }

        if ($arrival_dt < $departure_dt) {
            http_response_code(400);
            echo json_encode(['message' => 'Varış zamanı, kalkış zamanından önce olamaz. Zaman yolculuğu henüz icat edilmedi.']);
            return;
        }

        $stmt = $pdo->prepare(
            'SELECT id FROM "Trips" 
             WHERE company_id = :company_id 
             AND departure_city = :departure_city 
             AND destination_city = :destination_city 
             AND departure_time = :departure_time'
        );
        $stmt->execute([
            'company_id' => $company_id,
            'departure_city' => $departure_city_upper,
            'destination_city' => $destination_city_upper,
            'departure_time' => $departure_dt->format('Y-m-d H:i:s'),
        ]);
        if ($stmt->fetch()) {
            http_response_code(409);
            echo json_encode(['message' => 'Bu güzergaha bu tarih ve saatte zaten bir sefer mevcut.']);
            return;
        }

        $trip_id = uniqid();
        $created_at = date('Y-m-d H:i:s');

        $stmt = $pdo->prepare(
            'INSERT INTO "Trips" (id, company_id, destination_city, arrival_time, departure_time, departure_city, price, capacity, created_date) 
             VALUES (:id, :company_id, :destination_city, :arrival_time, :departure_time, :departure_city, :price, :capacity, :created_date)'
        );
        
        $params = [
            'id' => $trip_id,
            'company_id' => $company_id,
            'destination_city' => $destination_city_upper,
            'arrival_time' => $arrival_dt->format('Y-m-d H:i:s'),
            'departure_time' => $departure_dt->format('Y-m-d H:i:s'),
            'departure_city' => $departure_city_upper,
            'price' => $data['price'],
            'capacity' => $data['capacity'],
            'created_date' => $created_at
        ];
        
        $stmt->execute($params);

        http_response_code(201);
        echo json_encode(['message' => 'Sefer başarıyla oluşturuldu.', 'trip_id' => $trip_id]);

    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['message' => 'Database hatası: ' . $e->getMessage()]);
    } catch (Throwable $t) {
        http_response_code(500);
        echo json_encode(['message' => 'Beklenmedik bir hata oluştu: ' . $t->getMessage()]);
    }
}

function handle_update_trip($pdo, $trip_id, $data) {
    $user_id = get_user_id_from_header();
    if (!$user_id) {
        http_response_code(401);
        echo json_encode(['message' => 'Yetkisiz.']);
        return;
    }

    try {
        $pdo->beginTransaction();

        $stmt = $pdo->prepare('SELECT company_id FROM "User" WHERE id = :id AND role = "company"');
        $stmt->execute(['id' => $user_id]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$user || !$user['company_id']) {
            http_response_code(403);
            echo json_encode(['message' => 'Bu işlem için yetkiniz yok.']);
            $pdo->rollBack();
            return;
        }
        $company_id = $user['company_id'];

        $stmt = $pdo->prepare('SELECT * FROM "Trips" WHERE id = :id AND company_id = :company_id');
        $stmt->execute(['id' => $trip_id, 'company_id' => $company_id]);
        $trip = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$trip) {
            http_response_code(403);
            echo json_encode(['message' => 'Bu sefere erişim yetkiniz yok.']);
            $pdo->rollBack();
            return;
        }

        $departure_dt = new DateTime($data['departure_time'], new DateTimeZone('Europe/Istanbul'));
        $arrival_dt = new DateTime($data['arrival_time'], new DateTimeZone('Europe/Istanbul'));
        $current_time = new DateTime('now', new DateTimeZone('Europe/Istanbul'));

        if (
            !isset($data['destination_city']) || $data['destination_city'] === '' ||
            !isset($data['arrival_time']) || $data['arrival_time'] === '' ||
            !isset($data['departure_time']) || $data['departure_time'] === '' ||
            !isset($data['departure_city']) || $data['departure_city'] === '' ||
            !isset($data['price']) || $data['price'] === '' ||
            !isset($data['capacity']) || $data['capacity'] === ''
        ) {
            http_response_code(400);
            echo json_encode(['message' => 'Tüm alanları doldurun.']);
            $pdo->rollBack();
            return;
        }

        $departure_city_upper = strtoupper($data['departure_city']);
        $destination_city_upper = strtoupper($data['destination_city']);

        if ($departure_city_upper === $destination_city_upper) {
            http_response_code(400);
            echo json_encode(['message' => 'Kalkış ve varış noktası aynı olamaz.']);
            $pdo->rollBack();
            return;
        }

        if ((int)$data['capacity'] > 20) {
            http_response_code(400);
            echo json_encode(['message' => 'Maksimum kapasite 20 olabilir.']);
            $pdo->rollBack();
            return;
        }

        if ($arrival_dt < $departure_dt) {
            http_response_code(400);
            echo json_encode(['message' => 'Varış tarihi, kalkış tarihinden önce olamaz.']);
            $pdo->rollBack();
            return;
        }

        $stmt = $pdo->prepare(
            'SELECT id FROM "Trips" 
             WHERE company_id = :company_id 
             AND departure_city = :departure_city 
             AND destination_city = :destination_city 
             AND departure_time = :departure_time
             AND id != :trip_id'
        );
        $stmt->execute([
            'company_id' => $company_id,
            'departure_city' => $departure_city_upper,
            'destination_city' => $destination_city_upper,
            'departure_time' => $departure_dt->format('Y-m-d H:i:s'),
            'trip_id' => $trip_id
        ]);
        if ($stmt->fetch()) {
            http_response_code(409);
            echo json_encode(['message' => 'Bu güzergaha bu tarih ve saatte zaten bir sefer mevcut.']);
            $pdo->rollBack();
            return;
        }

        $new_capacity = (int)$data['capacity'];
        if ($new_capacity < $trip['capacity']) {
            $stmt = $pdo->prepare(
                'SELECT t.id as ticket_id, t.user_id, t.total_price
                 FROM "Tickets" t
                 JOIN "Booked_Seats" bs ON t.id = bs.ticket_id
                 WHERE t.trip_id = :trip_id AND bs.seat_number > :new_capacity'
            );
            $stmt->execute(['trip_id' => $trip_id, 'new_capacity' => $new_capacity]);
            $affected_tickets = $stmt->fetchAll(PDO::FETCH_ASSOC);

            foreach ($affected_tickets as $ticket) {
                $stmt = $pdo->prepare('UPDATE "User" SET balance = balance + :amount WHERE id = :id');
                $stmt->execute(['amount' => $ticket['total_price'], 'id' => $ticket['user_id']]);

                $stmt = $pdo->prepare('SELECT name FROM "Bus_Company" WHERE id = :id');
                $stmt->execute(['id' => $trip['company_id']]);
                $company = $stmt->fetch(PDO::FETCH_ASSOC);
                $company_name = $company['name'];

                $stmt = $pdo->prepare('SELECT full_name FROM "User" WHERE id = :id');
                $stmt->execute(['id' => $ticket['user_id']]);
                $ticket_user = $stmt->fetch(PDO::FETCH_ASSOC);
                $user_full_name = $ticket_user['full_name'];

                $notification_id = uniqid();
                $created_at = date('Y-m-d H:i:s');
                $message = "{$company_name} sına ait {$trip['departure_city']} - {$trip['destination_city']} seferinde, at arabalarının sayısı azaldı ve yolculuk rüzgârın iradesine bırakıldı. 🐎\nNe yazık ki koltuğunuz artık bu kervanın sınırları dışında kaldı.\nBüyülü biletiniz iptal edildi ve altınlarınız kesenize geri döndü. 💰\nYeni bir seferde sizi yeniden ağırlamaktan onur duyarız {$user_full_name}";
                
                $stmt = $pdo->prepare(
                    'INSERT INTO "Notifications" (id, user_id, message, created_at) 
                     VALUES (:id, :user_id, :message, :created_at)'
                );
                $stmt->execute([
                    'id' => $notification_id,
                    'user_id' => $ticket['user_id'],
                    'message' => $message,
                    'created_at' => $created_at
                ]);

                $stmt = $pdo->prepare('DELETE FROM "Booked_Seats" WHERE ticket_id = :ticket_id');
                $stmt->execute(['ticket_id' => $ticket['ticket_id']]);
                $stmt = $pdo->prepare('DELETE FROM "Tickets" WHERE id = :ticket_id');
                $stmt->execute(['ticket_id' => $ticket['ticket_id']]);
            }
        }

        $stmt = $pdo->prepare(
            'UPDATE "Trips" SET 
                destination_city = :destination_city, 
                arrival_time = :arrival_time, 
                departure_time = :departure_time, 
                departure_city = :departure_city, 
                price = :price, 
                capacity = :capacity 
             WHERE id = :id'
        );        

        $stmt->execute([
            'destination_city' => $destination_city_upper,
            'arrival_time' => $arrival_dt->format('Y-m-d H:i:s'),
            'departure_time' => $departure_dt->format('Y-m-d H:i:s'),
            'departure_city' => $departure_city_upper,
            'price' => $data['price'],
            'capacity' => $new_capacity,
            'id' => $trip_id
        ]);

        $pdo->commit();
        http_response_code(200);
        echo json_encode(['message' => 'Sefer başarıyla güncellendi.']);

    } catch (PDOException $e) {
        $pdo->rollBack();
        http_response_code(500);
        echo json_encode(['message' => 'Database hatası: ' . $e->getMessage()]);
    }
}

function handle_delete_trip($pdo, $trip_id) {
    $user_id = get_user_id_from_header();
    if (!$user_id) {
        http_response_code(401);
        echo json_encode(['message' => 'Yetkisiz.']);
        return;
    }

    try {
        $pdo->beginTransaction();

        $stmt = $pdo->prepare('SELECT company_id FROM "User" WHERE id = :id AND role = "company"');
        $stmt->execute(['id' => $user_id]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$user || !$user['company_id']) {
            http_response_code(403);
            echo json_encode(['message' => 'Bu işlem için yetkiniz yok.']);
            $pdo->rollBack();
            return;
        }
        $company_id = $user['company_id'];

        $stmt = $pdo->prepare('SELECT * FROM "Trips" WHERE id = :id AND company_id = :company_id');
        $stmt->execute(['id' => $trip_id, 'company_id' => $company_id]);
        $trip = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$trip) {
            http_response_code(403);
            echo json_encode(['message' => 'Bu sefere erişim yetkiniz yok.']);
            $pdo->rollBack();
            return;
        }

        $stmt = $pdo->prepare('SELECT * FROM "Tickets" WHERE trip_id = :trip_id');
        $stmt->execute(['trip_id' => $trip_id]);
        $tickets = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($tickets as $ticket) {
            $stmt = $pdo->prepare('UPDATE "User" SET balance = balance + :amount WHERE id = :id');
            $stmt->execute(['amount' => $ticket['total_price'], 'id' => $ticket['user_id']]);

            $stmt = $pdo->prepare('SELECT name FROM "Bus_Company" WHERE id = :id');
            $stmt->execute(['id' => $company_id]);
            $company = $stmt->fetch(PDO::FETCH_ASSOC);
            $company_name = $company['name'];

            $message = "{$company_name} firmasının {$trip['departure_city']} - {$trip['destination_city']} seferi iptal edildiği için bilet ücretiniz olan {$ticket['total_price']} TL bakiyenize iade edildi.";
            $stmt = $pdo->prepare(
                'INSERT INTO "Notifications" (id, user_id, message, created_at) 
                 VALUES (:id, :user_id, :message, :created_at)'
            );
            $stmt->execute([
                'id' => uniqid(),
                'user_id' => $ticket['user_id'],
                'message' => $message,
                'created_at' => date('Y-m-d H:i:s')
            ]);

            $stmt = $pdo->prepare('DELETE FROM "Booked_Seats" WHERE ticket_id = :ticket_id');
            $stmt->execute(['ticket_id' => $ticket['id']]);
            $stmt = $pdo->prepare('DELETE FROM "Tickets" WHERE id = :id');
            $stmt->execute(['id' => $ticket['id']]);
        }

        $stmt = $pdo->prepare('DELETE FROM "Trips" WHERE id = :id');
        $stmt->execute(['id' => $trip_id]);

        $pdo->commit();

        http_response_code(200);
        echo json_encode(['message' => 'Sefer başarıyla silindi ve tüm yolculara geri ödeme yapıldı.']);

    } catch (PDOException $e) {
        $pdo->rollBack();
        http_response_code(500);
        echo json_encode(['message' => 'Database hatası: ' . $e->getMessage()]);
    }
}

function handle_get_user_notifications($pdo) {
    $user_id = get_user_id_from_header();
    if (!$user_id) {
        http_response_code(401);
        echo json_encode(['message' => 'Yetkisiz.']);
        return;
    }

    try {
        $stmt = $pdo->prepare('SELECT * FROM "Notifications" WHERE user_id = :user_id AND is_read = 0');
        $stmt->execute(['user_id' => $user_id]);
        $notifications = $stmt->fetchAll(PDO::FETCH_ASSOC);

        http_response_code(200);
        echo json_encode($notifications);

    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['message' => 'Database hatası: ' . $e->getMessage()]);
    }
}

function handle_mark_notification_as_read($pdo, $notification_id) {
    $user_id = get_user_id_from_header();
    if (!$user_id) {
        http_response_code(401);
        echo json_encode(['message' => 'Yetkisiz.']);
        return;
    }

    try {
        $stmt = $pdo->prepare('UPDATE "Notifications" SET is_read = 1 WHERE id = :id AND user_id = :user_id');
        $stmt->execute(['id' => $notification_id, 'user_id' => $user_id]);

        http_response_code(200);
        echo json_encode(['message' => 'Bildirim okundu olarak işaretlendi.']);

    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['message' => 'Database hatası: ' . $e->getMessage()]);
    }
}

function handle_update_company($pdo, $data) {
    $user_id = get_user_id_from_header();
    if (!$user_id) {
        http_response_code(401);
        echo json_encode(['message' => 'Yetkisizsin, burası Mordor!']);
        return;
    }

    if (empty($data['name']) || empty($data['representative'])) {
        http_response_code(400);
        echo json_encode(['message' => 'Firma adı ve yetkili adı gerekli.']);
        return;
    }

    try {
        $pdo->beginTransaction();

        $stmt = $pdo->prepare('SELECT company_id FROM "User" WHERE id = :id AND role = "company"');
        $stmt->execute(['id' => $user_id]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$user || !$user['company_id']) {
            http_response_code(403);
            echo json_encode(['message' => 'Bu işlem için yetkiniz yok.']);
            $pdo->rollBack();
            return;
        }
        $company_id = $user['company_id'];

        $stmt = $pdo->prepare('UPDATE "Bus_Company" SET name = :name WHERE id = :id');
        $stmt->execute(['name' => $data['name'], 'id' => $company_id]);

        $stmt = $pdo->prepare('UPDATE "User" SET full_name = :full_name WHERE id = :id');
        $stmt->execute(['full_name' => $data['representative'], 'id' => $user_id]);

        $pdo->commit();

        echo json_encode(['message' => 'Firma bilgileri başarıyla güncellendi']);
    } catch (PDOException $e) {
        $pdo->rollBack();
        http_response_code(500);
        echo json_encode(['message' => 'Database hatası: ' . $e->getMessage()]);
    }
}

function handle_create_coupon($pdo, $data) {
    $user_id = get_user_id_from_header();
    if (!$user_id) {
        http_response_code(401);
        echo json_encode(['message' => 'Yetkisiz.']);
        return;
    }

    try {
        $stmt = $pdo->prepare('SELECT company_id FROM "User" WHERE id = :id AND role = "company"');
        $stmt->execute(['id' => $user_id]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$user || !$user['company_id']) {
            http_response_code(403);
            echo json_encode(['message' => 'Bu işlem için yetkiniz yok.']);
            return;
        }
        $company_id = $user['company_id'];

        if (empty($data['code']) || empty($data['discount_rate']) || empty($data['usage_limit']) || empty($data['expiry_date'])) {
            http_response_code(400);
            echo json_encode(['message' => 'Tüm alanları doldurun.']);
            return;
        }

        if ($data['discount_rate'] < 1 || $data['discount_rate'] > 100) {
            http_response_code(400);
            echo json_encode(['message' => 'İndirim oranı 1 ile 100 arasında olmalıdır.']);
            return;
        }

        $stmt = $pdo->prepare('SELECT id FROM "Coupons" WHERE code = :code');
        $stmt->execute(['code' => $data['code']]);
        if ($stmt->fetch()) {
            http_response_code(409);
            echo json_encode(['message' => 'Bu kupon kodu zaten tüm sistemde kullanılıyor.']);
            return;
        }

        $coupon_id = uniqid();
        $created_at = date('Y-m-d H:i:s');

        $stmt = $pdo->prepare(
            'INSERT INTO "Coupons" (id, company_id, code, discount_rate, usage_limit, expiry_date, created_at)
             VALUES (:id, :company_id, :code, :discount_rate, :usage_limit, :expiry_date, :created_at)'
        );
        $stmt->execute([
            'id' => $coupon_id,
            'company_id' => $company_id,
            'code' => $data['code'],
            'discount_rate' => $data['discount_rate'],
            'usage_limit' => $data['usage_limit'],
            'expiry_date' => $data['expiry_date'],
            'created_at' => $created_at
        ]);

        http_response_code(201);
        echo json_encode(['message' => 'Kupon başarıyla oluşturuldu.', 'coupon_id' => $coupon_id]);

    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['message' => 'Database hatası: ' . $e->getMessage()]);
    }
}

function handle_get_company_coupons($pdo) {
    $user_id = get_user_id_from_header();
    if (!$user_id) {
        http_response_code(401);
        echo json_encode(['message' => 'Yetkisiz.']);
        return;
    }

    try {
        $stmt = $pdo->prepare('SELECT company_id FROM "User" WHERE id = :id AND role = "company"');
        $stmt->execute(['id' => $user_id]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$user || !$user['company_id']) {
            http_response_code(403);
            echo json_encode(['message' => 'Bu işlem için yetkiniz yok.']);
            return;
        }
        $company_id = $user['company_id'];

        $stmt = $pdo->prepare(' 
            SELECT c.*, COUNT(cu.id) as usage_count
            FROM "Coupons" c
            LEFT JOIN "Coupon_Usage" cu ON c.id = cu.coupon_id
            WHERE c.company_id = :company_id
            GROUP BY c.id
        ');
        $stmt->execute(['company_id' => $company_id]);
        $coupons = $stmt->fetchAll(PDO::FETCH_ASSOC);

        http_response_code(200);
        echo json_encode($coupons);

    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['message' => 'Database hatası: ' . $e->getMessage()]);
    }
}

function handle_update_coupon($pdo, $coupon_id, $data) {
    $user_id = get_user_id_from_header();
    if (!$user_id) {
        http_response_code(401);
        echo json_encode(['message' => 'Yetkisiz.']);
        return;
    }

    try {
        $stmt = $pdo->prepare('SELECT company_id FROM "User" WHERE id = :id AND role = "company"');
        $stmt->execute(['id' => $user_id]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$user || !$user['company_id']) {
            http_response_code(403);
            echo json_encode(['message' => 'Bu işlem için yetkiniz yok.']);
            return;
        }
        $company_id = $user['company_id'];

        $stmt = $pdo->prepare('SELECT id FROM "Coupons" WHERE id = :id AND company_id = :company_id');
        $stmt->execute(['id' => $coupon_id, 'company_id' => $company_id]);
        if (!$stmt->fetch()) {
            http_response_code(403);
            echo json_encode(['message' => 'Bu kupona erişim yetkiniz yok.']);
            return;
        }

        if (empty($data['code']) || empty($data['discount_rate']) || empty($data['usage_limit']) || empty($data['expiry_date'])) {
            http_response_code(400);
            echo json_encode(['message' => 'Tüm alanları doldurun.']);
            return;
        }

        if ($data['discount_rate'] < 1 || $data['discount_rate'] > 100) {
            http_response_code(400);
            echo json_encode(['message' => 'İndirim oranı 1 ile 100 arasında olmalıdır.']);
            return;
        }

        $expiry_dt = new DateTime($data['expiry_date']);
        $today = new DateTime('today');
        if ($expiry_dt < $today) {
            http_response_code(400);
            echo json_encode(['message' => 'Kuponun geçerlilik tarihi geçmiş bir tarih olamaz.']);
            return;
        }

        $stmt = $pdo->prepare('SELECT id FROM "Coupons" WHERE code = :code AND id != :coupon_id');
        $stmt->execute(['code' => $data['code'], 'coupon_id' => $coupon_id]);
        if ($stmt->fetch()) {
            http_response_code(409);
            echo json_encode(['message' => 'Bu kupon kodu zaten başka bir kupon için kullanılıyor.']);
            return;
        }

        $stmt = $pdo->prepare(
            'UPDATE "Coupons" SET
                code = :code,
                discount_rate = :discount_rate,
                usage_limit = :usage_limit,
                expiry_date = :expiry_date
             WHERE id = :id'
        );
        $stmt->execute([
            'code' => $data['code'],
            'discount_rate' => $data['discount_rate'],
            'usage_limit' => $data['usage_limit'],
            'expiry_date' => $data['expiry_date'],
            'id' => $coupon_id
        ]);

        http_response_code(200);
        echo json_encode(['message' => 'Kupon başarıyla güncellendi.']);

    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['message' => 'Database hatası: ' . $e->getMessage()]);
    }
}

function handle_delete_coupon($pdo, $coupon_id) {
    $user_id = get_user_id_from_header();
    if (!$user_id) {
        http_response_code(401);
        echo json_encode(['message' => 'Yetkisiz.']);
        return;
    }

    try {
        $stmt = $pdo->prepare('SELECT company_id FROM "User" WHERE id = :id AND role = "company"');
        $stmt->execute(['id' => $user_id]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$user || !$user['company_id']) {
            http_response_code(403);
            echo json_encode(['message' => 'Bu işlem için yetkiniz yok.']);
            return;
        }
        $company_id = $user['company_id'];

        $stmt = $pdo->prepare('SELECT id FROM "Coupons" WHERE id = :id AND company_id = :company_id');
        $stmt->execute(['id' => $coupon_id, 'company_id' => $company_id]);
        if (!$stmt->fetch()) {
            http_response_code(403);
            echo json_encode(['message' => 'Bu kupona erişim yetkiniz yok.']);
            return;
        }

        $stmt = $pdo->prepare('DELETE FROM "Coupons" WHERE id = :id');
        $stmt->execute(['id' => $coupon_id]);

        http_response_code(200);
        echo json_encode(['message' => 'Kupon başarıyla silindi.']);

    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['message' => 'Database hatası: ' . $e->getMessage()]);
    }
}

function handle_get_trip_passengers($pdo, $trip_id) {
    $user_id = get_user_id_from_header();
    if (!$user_id) {
        http_response_code(401);
        echo json_encode(['message' => 'Yetkisiz.']);
        return;
    }

    try {
        $stmt = $pdo->prepare('SELECT company_id FROM "User" WHERE id = :id AND role = "company"');
        $stmt->execute(['id' => $user_id]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$user || !$user['company_id']) {
            http_response_code(403);
            echo json_encode(['message' => 'Bu işlem için yetkiniz yok.']);
            return;
        }
        $company_id = $user['company_id'];

        $stmt = $pdo->prepare('SELECT id FROM "Trips" WHERE id = :id AND company_id = :company_id');
        $stmt->execute(['id' => $trip_id, 'company_id' => $company_id]);
        if (!$stmt->fetch()) {
            http_response_code(403);
            echo json_encode(['message' => 'Bu sefere erişim yetkiniz yok.']);
            return;
        }

        $stmt = $pdo->prepare(
            'SELECT u.full_name, bs.seat_number, t.id as ticket_id
             FROM "Tickets" t
             JOIN "User" u ON t.user_id = u.id
             JOIN "Booked_Seats" bs ON bs.ticket_id = t.id
             WHERE t.trip_id = :trip_id'
        );
        $stmt->execute(['trip_id' => $trip_id]);
        $passengers = $stmt->fetchAll(PDO::FETCH_ASSOC);

        http_response_code(200);
        echo json_encode($passengers);

    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['message' => 'Database hatası: ' . $e->getMessage()]);
    }
}

function handle_company_cancel_ticket($pdo, $ticket_id) {
    $user_id = get_user_id_from_header();
    if (!$user_id) {
        http_response_code(401);
        echo json_encode(['message' => 'Yetkisiz.']);
        return;
    }

    try {
        $pdo->beginTransaction();

        $stmt = $pdo->prepare('SELECT company_id FROM "User" WHERE id = :id AND role = "company"');
        $stmt->execute(['id' => $user_id]);
        $company_user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$company_user || !$company_user['company_id']) {
            http_response_code(403);
            echo json_encode(['message' => 'Bu işlem için yetkiniz yok.']);
            $pdo->rollBack();
            return;
        }
        $company_id = $company_user['company_id'];

        $stmt = $pdo->prepare(
            'SELECT t.*, tr.company_id as trip_company_id, tr.departure_city, tr.destination_city
             FROM "Tickets" t
             JOIN "Trips" tr ON t.trip_id = tr.id
             WHERE t.id = :id'
        );
        $stmt->execute(['id' => $ticket_id]);
        $ticket = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$ticket || $ticket['trip_company_id'] !== $company_id) {
            http_response_code(403);
            echo json_encode(['message' => 'Bu bileti iptal etme yetkiniz yok.']);
            $pdo->rollBack();
            return;
        }

        $stmt = $pdo->prepare('UPDATE "User" SET balance = balance + :amount WHERE id = :id');
        $stmt->execute(['amount' => $ticket['total_price'], 'id' => $ticket['user_id']]);

        $stmt = $pdo->prepare('SELECT name FROM "Bus_Company" WHERE id = :id');
        $stmt->execute(['id' => $company_id]);
        $company = $stmt->fetch(PDO::FETCH_ASSOC);
        $company_name = $company['name'];

        $stmt = $pdo->prepare('SELECT full_name FROM "User" WHERE id = :id');
        $stmt->execute(['id' => $ticket['user_id']]);
        $ticket_user = $stmt->fetch(PDO::FETCH_ASSOC);
        $user_full_name = $ticket_user['full_name'];

        $stmt = $pdo->prepare('SELECT seat_number FROM "Booked_Seats" WHERE ticket_id = :ticket_id');
        $stmt->execute(['ticket_id' => $ticket_id]);
        $seat = $stmt->fetch(PDO::FETCH_ASSOC);
        $seat_number = $seat['seat_number'];

        $notification_id = uniqid();
        $created_at = date('Y-m-d H:i:s');
        $message = "{$company_name} firması, {$ticket['departure_city']} - {$ticket['destination_city']} seferindeki satın aldığınız {$seat_number} numaralı koltuğu iptal etti. Ödediğiniz altınlar bakiyenize geri döndü. 💰✨\nYeni bir yolculukta sizi yeniden ağırlamaktan onur duyarız, {$user_full_name}";

        $stmt = $pdo->prepare(
            'INSERT INTO "Notifications" (id, user_id, message, created_at)
             VALUES (:id, :user_id, :message, :created_at)'
        );
        $stmt->execute([
            'id' => $notification_id,
            'user_id' => $ticket['user_id'],
            'message' => $message,
            'created_at' => $created_at
        ]);

        $stmt = $pdo->prepare('DELETE FROM "Tickets" WHERE id = :id');
        $stmt->execute(['id' => $ticket_id]);

        $stmt = $pdo->prepare('DELETE FROM "Booked_Seats" WHERE ticket_id = :ticket_id');
        $stmt->execute(['ticket_id' => $ticket_id]);

        $pdo->commit();

        http_response_code(200);
        echo json_encode(['message' => 'Bilet başarıyla iptal edildi ve kullanıcıya bildirim gönderildi.']);

    } catch (PDOException $e) {
        $pdo->rollBack();
        http_response_code(500);
        echo json_encode(['message' => 'Database hatası: ' . $e->getMessage()]);
    }
}

function handle_clean_mock_trips($pdo) {
    try {
        $stmt = $pdo->prepare('DELETE FROM "Trips" WHERE id NOT IN (SELECT DISTINCT trip_id FROM "Tickets")');
        $stmt->execute();

        http_response_code(200);
        echo json_encode(['message' => 'Kullanıcılar tarafından oluşturulmamış tüm seferler silindi.']);

    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['message' => 'Database hatası: ' . $e->getMessage()]);
    }
}

function handle_get_coupon_usage($pdo, $coupon_id) {
    $user_id = get_user_id_from_header();
    if (!$user_id) {
        http_response_code(401);
        echo json_encode(['message' => 'Yetkisiz.']);
        return;
    }

    try {
        $stmt = $pdo->prepare('SELECT company_id FROM "User" WHERE id = :id AND role = "company"');
        $stmt->execute(['id' => $user_id]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$user || !$user['company_id']) {
            http_response_code(403);
            echo json_encode(['message' => 'Bu işlem için yetkiniz yok.']);
            return;
        }
        $company_id = $user['company_id'];

        $stmt = $pdo->prepare('SELECT id FROM "Coupons" WHERE id = :id AND company_id = :company_id');
        $stmt->execute(['id' => $coupon_id, 'company_id' => $company_id]);
        if (!$stmt->fetch()) {
            http_response_code(403);
            echo json_encode(['message' => 'Bu kupona erişim yetkiniz yok.']);
            return;
        }

        $stmt = $pdo->prepare(' 
            SELECT u.full_name, cu.used_at
            FROM "Coupon_Usage" cu
            JOIN "User" u ON cu.user_id = u.id
            WHERE cu.coupon_id = :coupon_id
        ');
        $stmt->execute(['coupon_id' => $coupon_id]);
        $usage = $stmt->fetchAll(PDO::FETCH_ASSOC);

        http_response_code(200);
        echo json_encode($usage);

    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['message' => 'Database hatası: ' . $e->getMessage()]);
    }
}

function is_admin($pdo) {
    $user_id = get_user_id_from_header();
    if (!$user_id) {
        return false;
    }

    $stmt = $pdo->prepare('SELECT role FROM "User" WHERE id = :id');
    $stmt->execute(['id' => $user_id]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    return $user && $user['role'] === 'admin';
}

function handle_admin_get_users($pdo) {
    if (!is_admin($pdo)) {
        http_response_code(403);
        echo json_encode(['message' => 'Yetkisiz erişim.']);
        return;
    }

    try {
        $stmt = $pdo->query('SELECT id, full_name, email, role, company_id FROM "User"');
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        http_response_code(200);
        echo json_encode($users);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['message' => 'Database hatası: ' . $e->getMessage()]);
    }
}

function handle_admin_get_companies($pdo) {
    if (!is_admin($pdo)) {
        http_response_code(403);
        echo json_encode(['message' => 'Yetkisiz erişim.']);
        return;
    }

    try {
        $stmt = $pdo->query('SELECT id, name FROM "Bus_Company"');
        $companies = $stmt->fetchAll(PDO::FETCH_ASSOC);
        http_response_code(200);
        echo json_encode($companies);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['message' => 'Database hatası: ' . $e->getMessage()]);
    }
}

function handle_admin_get_all_coupons($pdo) {
    if (!is_admin($pdo)) {
        http_response_code(403);
        echo json_encode(['message' => 'Yetkisiz erişim.']);
        return;
    }

    try {
        $stmt = $pdo->query('
            SELECT 
                c.id,
                c.code,
                c.discount_rate,
                c.usage_limit,
                c.expiry_date,
                c.created_at,
                COALESCE(bc.name, \'Tüm Firmalar (Genel)\') as company_name,
                CASE WHEN c.company_id IS NULL THEN \'Admin\' ELSE \'Firma\' END as creator,
                COUNT(cu.coupon_id) as usage_count
            FROM 
                "Coupons" c
            LEFT JOIN 
                "Bus_Company" bc ON c.company_id = bc.id
            LEFT JOIN 
                "Coupon_Usage" cu ON c.id = cu.coupon_id
            GROUP BY
                c.id, c.code, c.discount_rate, c.usage_limit, c.expiry_date, c.created_at, company_name, creator
            ORDER BY
                c.created_at DESC
        ');
        
        $coupons = $stmt->fetchAll(PDO::FETCH_ASSOC);
        http_response_code(200);
        echo json_encode($coupons);

    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['message' => 'Database hatası: ' . $e->getMessage()]);
    }
}

function handle_admin_create_coupon($pdo, $data) {
    if (!is_admin($pdo)) {
        http_response_code(403);
        echo json_encode(['message' => 'Yetkisiz erişim.']);
        return;
    }

    if (empty($data['code']) || empty($data['discount_rate']) || empty($data['usage_limit']) || empty($data['expiry_date'])) {
        http_response_code(400);
        echo json_encode(['message' => 'Kod, indirim oranı, kullanım limiti ve geçerlilik tarihi alanları zorunludur.']);
        return;
    }

    $company_id = !empty($data['company_id']) ? $data['company_id'] : null;

    $expiry_dt = new DateTime($data['expiry_date']);
    $today = new DateTime('today');
    if ($expiry_dt < $today) {
        http_response_code(400);
        echo json_encode(['message' => 'Zamanla oynamaya kalktın ha! Maalesef büyücüler konseyi karar aldı: geçmişe kupon basmak, zamanın dokusunu bozar. Yani evet… “Zaman yolculuğu teşebbüsü” başarısız. Kuponunu gelecekte dene; geçmiş seni beklemiyor.']);
        return;
    }

    try {
        $stmt = $pdo->prepare('SELECT id FROM "Coupons" WHERE code = :code');
        $stmt->execute(['code' => $data['code']]);
        if ($stmt->fetch()) {
            http_response_code(409);
            echo json_encode(['message' => 'Bu kupon kodu zaten sistemde mevcut. Lütfen farklı bir kod deneyin.']);
            return;
        }

        $coupon_id = uniqid();
        $created_at = date('Y-m-d H:i:s');

        $stmt = $pdo->prepare(
            'INSERT INTO "Coupons" (id, company_id, code, discount_rate, usage_limit, expiry_date, created_at)
             VALUES (:id, :company_id, :code, :discount_rate, :usage_limit, :expiry_date, :created_at)'
        );
        $stmt->execute([
            'id' => $coupon_id,
            'company_id' => $company_id,
            'code' => $data['code'],
            'discount_rate' => $data['discount_rate'],
            'usage_limit' => $data['usage_limit'],
            'expiry_date' => $data['expiry_date'],
            'created_at' => $created_at
        ]);

        http_response_code(201);
        echo json_encode(['message' => 'Kupon başarıyla oluşturuldu.', 'coupon_id' => $coupon_id]);

    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['message' => 'Database hatası: ' . $e->getMessage()]);
    }
}

function handle_admin_delete_coupon($pdo, $coupon_id) {
    if (!is_admin($pdo)) {
        http_response_code(403);
        echo json_encode(['message' => 'Yetkisiz erişim.']);
        return;
    }

    try {
        $pdo->beginTransaction();

        $stmt = $pdo->prepare('DELETE FROM "Coupon_Usage" WHERE coupon_id = :coupon_id');
        $stmt->execute(['coupon_id' => $coupon_id]);

        $stmt = $pdo->prepare('DELETE FROM "Coupons" WHERE id = :id');
        $stmt->execute(['id' => $coupon_id]);

        $pdo->commit();

        http_response_code(200);
        echo json_encode(['message' => 'Kupon başarıyla silindi.']);

    } catch (PDOException $e) {
        $pdo->rollBack();
        http_response_code(500);
        echo json_encode(['message' => 'Database hatası: ' . $e->getMessage()]);
    }
}

function handle_admin_create_company_user($pdo, $data) {
    if (!is_admin($pdo)) {
        http_response_code(403);
        echo json_encode(['message' => 'Yetkisiz erişim.']);
        return;
    }

    if (empty($data['full_name']) || empty($data['email']) || empty($data['password']) || empty($data['company_id'])) {
        http_response_code(400);
        echo json_encode(['message' => 'Tüm alanları doldurun.']);
        return;
    }

    try {
        $stmt = $pdo->prepare('SELECT id FROM "User" WHERE email = :email');
        $stmt->execute(['email' => $data['email']]);
        if ($stmt->fetch()) {
            http_response_code(409);
            echo json_encode(['message' => 'Bu e-mail adresi zaten kayıtlı.']);
            return;
        }

        $id = uniqid();
        $hashed_password = password_hash($data['password'], PASSWORD_BCRYPT);
        $created_at = date('Y-m-d H:i:s');

        $stmt = $pdo->prepare(
            'INSERT INTO "User" (id, full_name, email, role, password, company_id, created_at) 
             VALUES (:id, :full_name, :email, :role, :password, :company_id, :created_at)'
        );

        $stmt->execute([
            'id' => $id,
            'full_name' => $data['full_name'],
            'email' => $data['email'],
            'role' => 'company',
            'password' => $hashed_password,
            'company_id' => $data['company_id'],
            'created_at' => $created_at
        ]);

        http_response_code(201);
        echo json_encode(['message' => 'Firma kullanıcısı başarıyla oluşturuldu.', 'user_id' => $id]);

    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['message' => 'Database hatası: ' . $e->getMessage()]);
    }
}

function handle_admin_delete_user($pdo, $user_id) {
    if (!is_admin($pdo)) {
        http_response_code(403);
        echo json_encode(['message' => 'Yetkisiz erişim.']);
        return;
    }

    try {
        $stmt = $pdo->prepare('DELETE FROM "User" WHERE id = :id');
        $stmt->execute(['id' => $user_id]);

        if ($stmt->rowCount() > 0) {
            http_response_code(200);
            echo json_encode(['message' => 'Kullanıcı başarıyla silindi.']);
        } else {
            http_response_code(404);
            echo json_encode(['message' => 'Kullanıcı bulunamadı.']);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['message' => 'Database hatası: ' . $e->getMessage()]);
    }
}

function handle_admin_update_user($pdo, $user_id, $data) {
    if (!is_admin($pdo)) {
        http_response_code(403);
        echo json_encode(['message' => 'Yetkisiz erişim.']);
        return;
    }

    $email = $data['email'] ?? null;
    $password = $data['password'] ?? null;

    if (empty($email)) {
        http_response_code(400);
        echo json_encode(['message' => 'E-posta adresi boş olamaz.']);
        return;
    }

    try {
        $stmt = $pdo->prepare('SELECT id FROM "User" WHERE email = :email AND id != :id');
        $stmt->execute(['email' => $email, 'id' => $user_id]);
        if ($stmt->fetch()) {
            http_response_code(409);
            echo json_encode(['message' => 'Bu e-posta adresi zaten başka bir kullanıcı tarafından kullanılıyor.']);
            return;
        }

        if (!empty($password)) {
            $hashed_password = password_hash($password, PASSWORD_BCRYPT);
            $stmt = $pdo->prepare('UPDATE "User" SET email = :email, password = :password WHERE id = :id');
            $stmt->execute(['email' => $email, 'password' => $hashed_password, 'id' => $user_id]);
        } else {
            $stmt = $pdo->prepare('UPDATE "User" SET email = :email WHERE id = :id');
            $stmt->execute(['email' => $email, 'id' => $user_id]);
        }

        if ($stmt->rowCount() > 0) {
            http_response_code(200);
            echo json_encode(['message' => 'Kullanıcı başarıyla güncellendi.']);
        } else {
            http_response_code(404);
            echo json_encode(['message' => 'Kullanıcı bulunamadı veya bilgilerde değişiklik yapılmadı.']);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['message' => 'Database hatası: ' . $e->getMessage()]);
    }
}

function handle_validate_coupon($pdo, $data) {
    $user_id = get_user_id_from_header();
    if (!$user_id) {
        http_response_code(401);
        echo json_encode(['message' => 'Kupon kullanmak için giriş yapmalısınız.']);
        return;
    }

    if (empty($data['coupon_code']) || empty($data['trip_id'])) {
        http_response_code(400);
        echo json_encode(['message' => 'Kupon kodu ve sefer bilgisi gerekli.']);
        return;
    }

    try {
        $stmt = $pdo->prepare(' 
            SELECT c.*, COUNT(cu.id) as usage_count
            FROM "Coupons" c
            LEFT JOIN "Coupon_Usage" cu ON c.id = cu.coupon_id
            WHERE c.code = :code
            GROUP BY c.id
        ');
        $stmt->execute(['code' => $data['coupon_code']]);
        $coupon = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$coupon) {
            http_response_code(404);
            echo json_encode(['message' => 'Sakin ol sahtekar! Böyle bir kupon yok.']);
            return;
        }

        if ($coupon['company_id'] !== null) {
            $stmt = $pdo->prepare('SELECT company_id FROM "Trips" WHERE id = :trip_id');
            $stmt->execute(['trip_id' => $data['trip_id']]);
            $trip = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$trip || $trip['company_id'] !== $coupon['company_id']) {
                http_response_code(403);
                echo json_encode(['message' => 'Bu kupon bu kervanda geçmez.']);
                return;
            }
        }

        if (new DateTime() >= new DateTime($coupon['expiry_date'])) {
            http_response_code(410);
            echo json_encode(['message' => 'Bu kupon zamanla soldu. Artık kullanılamaz. Herşey gibi bununda süresi bitti gezgin.']);
            return;
        }

        if ($coupon['usage_count'] >= $coupon['usage_limit']) {
            http_response_code(429);
            echo json_encode(['message' => 'Bu kupon kullanım sınırına ulaştı gezgin. Artık kullanılamaz.']);
            return;
        }

        http_response_code(200);
        echo json_encode(['message' => 'Kupon geçerli.', 'discount_rate' => $coupon['discount_rate']]);

    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['message' => 'Database hatası: ' . $e->getMessage()]);
    }
}

function handle_get_public_coupons($pdo) {
    try {
        $stmt = $pdo->query('
            SELECT 
                c.id,
                c.code,
                c.discount_rate,
                c.usage_limit,
                c.expiry_date,
                COALESCE(bc.name, \'Tüm Firmalar\') as company_name,
                COUNT(cu.id) as usage_count
            FROM 
                "Coupons" c
            LEFT JOIN 
                "Bus_Company" bc ON c.company_id = bc.id
            LEFT JOIN 
                "Coupon_Usage" cu ON c.id = cu.coupon_id
            GROUP BY
                c.id, c.code, c.discount_rate, c.usage_limit, c.expiry_date, company_name
            ORDER BY
                c.expiry_date DESC, c.created_at DESC
        ');
        
        $coupons = $stmt->fetchAll(PDO::FETCH_ASSOC);

        http_response_code(200);
        echo json_encode($coupons);

    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['message' => 'Database hatası: ' . $e->getMessage()]);
    }
}

function handle_get_public_companies($pdo) {
    try {
        $stmt = $pdo->query('SELECT id, name, logo_path, created_at FROM "Bus_Company" ORDER BY name ASC');
        $companies = $stmt->fetchAll(PDO::FETCH_ASSOC);
        http_response_code(200);
        echo json_encode($companies);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['message' => 'Database hatası: ' . $e->getMessage()]);
    }
}
?>
