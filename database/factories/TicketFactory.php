<?php

namespace Database\Factories;

use App\Models\Ticket;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class TicketFactory extends Factory
{
    protected $model = Ticket::class;

    public function definition(): array
    {
        return [
            'title' => $this->faker->words(3, true),
            'slug' => $this->faker->unique()->slug(),
            'description' => $this->faker->text(),
            'price' => $this->faker->randomFloat(2, 5, 500),
            'popular' => $this->faker->boolean(),
            'features' => [
                $this->faker->word(),
                $this->faker->word(),
                $this->faker->word(),
                $this->faker->word(),
            ],
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ];
    }
}
