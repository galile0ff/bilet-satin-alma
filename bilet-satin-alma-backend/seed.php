<?php
require_once __DIR__ . '/database.php';

$db = new Database();
$pdo = $db->getPdo();

try {
    // Clear existing data
    $pdo->exec('DELETE FROM "User_Coupons"');
    $pdo->exec('DELETE FROM "Coupons"');
    $pdo->exec('DELETE FROM "Booked_Seats"');
    $pdo->exec('DELETE FROM "Tickets"');
    $pdo->exec('DELETE FROM "Trips"');
    $pdo->exec('DELETE FROM "Bus_Company"');
    $pdo->exec('DELETE FROM "User"');

    // Seed Bus Companies
    $companies = [
        ['id' => 'company1', 'name' => 'Metro Turizm', 'logo_path' => '/logos/metro.png'],
        ['id' => 'company2', 'name' => 'Pamukkale Turizm', 'logo_path' => '/logos/pamukkale.png']
    ];

    $stmt = $pdo->prepare('INSERT INTO "Bus_Company" (id, name, logo_path, created_at) VALUES (:id, :name, :logo_path, :created_at)');
    foreach ($companies as $company) {
        $stmt->execute([
            'id' => $company['id'],
            'name' => $company['name'],
            'logo_path' => $company['logo_path'],
            'created_at' => date('Y-m-d H:i:s')
        ]);
    }

    // Seed Trips
    $trips = [
        [
            'id' => 'trip1', 'company_id' => 'company1', 'destination_city' => 'Ankara',
            'arrival_time' => '2025-10-18 14:00:00', 'departure_time' => '2025-10-18 08:00:00',
            'departure_city' => 'Istanbul', 'price' => 150, 'capacity' => 40
        ],
        [
            'id' => 'trip2', 'company_id' => 'company2', 'destination_city' => 'Izmir',
            'arrival_time' => '2025-10-19 16:00:00', 'departure_time' => '2025-10-19 09:00:00',
            'departure_city' => 'Ankara', 'price' => 180, 'capacity' => 45
        ],
        [
            'id' => 'trip3', 'company_id' => 'company1', 'destination_city' => 'Antalya',
            'arrival_time' => '2025-10-20 10:00:00', 'departure_time' => '2025-10-19 22:00:00',
            'departure_city' => 'Istanbul', 'price' => 100000, 'capacity' => 38
        ]
    ];

    $stmt = $pdo->prepare(
        'INSERT INTO "Trips" (id, company_id, destination_city, arrival_time, departure_time, departure_city, price, capacity, created_date) 
         VALUES (:id, :company_id, :destination_city, :arrival_time, :departure_time, :departure_city, :price, :capacity, :created_date)'
    );

    foreach ($trips as $trip) {
        $stmt->execute([
            'id' => $trip['id'],
            'company_id' => $trip['company_id'],
            'destination_city' => $trip['destination_city'],
            'arrival_time' => $trip['arrival_time'],
            'departure_time' => $trip['departure_time'],
            'departure_city' => $trip['departure_city'],
            'price' => $trip['price'],
            'capacity' => $trip['capacity'],
            'created_date' => date('Y-m-d H:i:s')
        ]);
    }

    echo "Database seeded successfully!\n";

} catch (PDOException $e) {
    die("Seeding failed: " . $e->getMessage());
}
?>
