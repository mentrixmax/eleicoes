<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run()
    {
        $data = [
            [
                'name' => 'John Doe',
                'email' => 'john@example.com',
                'password_hash' => password_hash('password123', PASSWORD_BCRYPT),
                'role' => 'admin',
            ],
            [
                'name' => 'Jane Smith',
                'email' => 'jane@example.com',
                'password_hash' => password_hash('password456', PASSWORD_BCRYPT),
                'role' => 'user',
            ],
        ];

        // Usando Query Builder
        $this->db->table('users')->insertBatch($data);
    }
}
