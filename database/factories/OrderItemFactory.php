<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\order_item;
use App\Models\Ticket;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class OrderItemFactory extends Factory
{
    protected $model = order_item::class;

    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(3),
            'description' => $this->faker->paragraph(),
            'price' => $this->faker->randomFloat(2, 10, 1000),
            'quantity' => $this->faker->numberBetween(1, 10),
            'amount_total' => function (array $attributes) {
                return $attributes['price'] * $attributes['quantity'];
            },
            'ticket_id' => Ticket::factory()->create()->id,
            'order_id' => Order::factory()->create()->id,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ];
    }
}
