<?php
class Database {
    private $pdo;

    public function __construct() {
        $this->connect();
        $this->createTables();
    }

    private function connect() {
        try {
            $this->pdo = new PDO('sqlite:' . __DIR__ . '/data/database.sqlite');
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            die("Connection failed: " . $e->getMessage());
        }
    }

    private function createTables() {
        $commands = [
            'CREATE TABLE IF NOT EXISTS "User" (
                "id" TEXT PRIMARY KEY,
                "full_name" TEXT NOT NULL,
                "email" TEXT UNIQUE NOT NULL,
                "role" TEXT NOT NULL,
                "password" TEXT NOT NULL,
                "company_id" TEXT,
                "balance" INTEGER DEFAULT 800,
                "created_at" TEXT NOT NULL
            )',
            'CREATE TABLE IF NOT EXISTS "Bus_Company" (
                "id" TEXT PRIMARY KEY,
                "name" TEXT UNIQUE NOT NULL,
                "logo_path" TEXT,
                "created_at" TEXT NOT NULL
            )',
            'CREATE TABLE IF NOT EXISTS "Trips" (
                "id" TEXT PRIMARY KEY,
                "company_id" TEXT NOT NULL,
                "destination_city" TEXT NOT NULL,
                "arrival_time" TEXT NOT NULL,
                "departure_time" TEXT NOT NULL,
                "departure_city" TEXT NOT NULL,
                "price" INTEGER NOT NULL,
                "capacity" INTEGER NOT NULL,
                "created_date" TEXT NOT NULL,
                FOREIGN KEY("company_id") REFERENCES "Bus_Company"("id")
            )',
            'CREATE TABLE IF NOT EXISTS "Tickets" (
                "id" TEXT PRIMARY KEY,
                "trip_id" TEXT NOT NULL,
                "user_id" TEXT NOT NULL,
                "status" TEXT DEFAULT "active" NOT NULL,
                "total_price" INTEGER NOT NULL,
                "created_at" TEXT NOT NULL,
                FOREIGN KEY("trip_id") REFERENCES "Trips"("id"),
                FOREIGN KEY("user_id") REFERENCES "User"("id")
            )',
            'CREATE TABLE IF NOT EXISTS "Booked_Seats" (
                "id" TEXT PRIMARY KEY,
                "ticket_id" TEXT NOT NULL,
                "seat_number" INTEGER NOT NULL,
                "created_at" TEXT NOT NULL,
                FOREIGN KEY("ticket_id") REFERENCES "Tickets"("id")
            )',
            'CREATE TABLE IF NOT EXISTS "Coupons" (
                "id" TEXT PRIMARY KEY,
                "company_id" TEXT,
                "code" TEXT NOT NULL,
                "discount_rate" REAL NOT NULL,
                "usage_limit" INTEGER NOT NULL,
                "expiry_date" TEXT NOT NULL,
                "created_at" TEXT NOT NULL,
                FOREIGN KEY("company_id") REFERENCES "Bus_Company"("id")
            )',
            'CREATE TABLE IF NOT EXISTS "Coupon_Usage" (
                "id" TEXT PRIMARY KEY,
                "coupon_id" TEXT NOT NULL,
                "user_id" TEXT NOT NULL,
                "used_at" TEXT NOT NULL,
                FOREIGN KEY("coupon_id") REFERENCES "Coupons"("id"),
                FOREIGN KEY("user_id") REFERENCES "User"("id")
            )',
            'CREATE TABLE IF NOT EXISTS "Notifications" (
                "id" TEXT PRIMARY KEY,
                "user_id" TEXT NOT NULL,
                "message" TEXT NOT NULL,
                "is_read" INTEGER DEFAULT 0,
                "created_at" TEXT NOT NULL,
                FOREIGN KEY("user_id") REFERENCES "User"("id")
            )'
        ];

        foreach ($commands as $command) {
            $this->pdo->exec($command);
        }

        $this->seedAdmin();
    }

    private function seedAdmin() {
        $stmt = $this->pdo->prepare('SELECT id FROM "User" WHERE email = ?');
        $stmt->execute(['admin@galileoff.com']);
        if ($stmt->fetch()) {
            return; // Admin already exists
        }

        $adminId = uniqid();
        $passwordHash = password_hash('faulkner', PASSWORD_BCRYPT);
        $createdAt = date('Y-m-d H:i:s');

        $stmt = $this->pdo->prepare(
            'INSERT INTO "User" (id, full_name, email, role, password, created_at) VALUES (?, ?, ?, ?, ?, ?)'
        );
        $stmt->execute([$adminId, 'Admin User', 'admin@galileoff.com', 'admin', $passwordHash, $createdAt]);
    }

    public function getPdo() {
        return $this->pdo;
    }
}
?>
