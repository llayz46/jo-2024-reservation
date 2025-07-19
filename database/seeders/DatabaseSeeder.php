<?php

namespace Database\Seeders;

use App\Models\Ticket;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        Ticket::factory()->create([
            'title' => 'Offre Solo',
            'slug' => 'solo',
            'description' => 'Parfait pour vivre l’événement en solo, à son rythme.',
            'price' => 45,
            'popular' => false,
            'features' => [
                'Accès à 3-5 épreuves',
                'Emplacement standard en tribune',
                'Transport inclus',
                'Guide officiel'
            ],
        ]);

        Ticket::factory()->create([
            'title' => 'Offre Duo',
            'slug' => 'duo',
            'description' => 'L’expérience olympique à deux, idéale pour partager un moment fort.',
            'price' => 69,
            'popular' => true,
            'features' => [
                'Accès pour 2 personnes à la même épreuve',
                'Placement côte à côte garanti',
                'Restauration incluse',
                'Accès à une épreuve supplémentaire'
            ],
        ]);

        Ticket::factory()->create([
            'title' => 'Offre Familiale',
            'slug' => 'familiale',
            'description' => 'Parfait pour toute la famille, jusqu’à 4 personnes incluses.',
            'price' => 129,
            'popular' => false,
            'features' => [
                'Accès pour 4 personnes à la même épreuve',
                'Activités enfants',
                'Zone famille dédiée',
                'Réductions boutique'
            ],
        ]);
    }
}
