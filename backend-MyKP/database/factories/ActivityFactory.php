<?php

namespace Database\Factories;

use App\Models\Activity;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Activity>
 */
class ActivityFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\Illuminate\Database\Eloquent\Model>
     */
    protected $model = Activity::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(), // Creates or assigns a user for the foreign key
            'name' => fake()->sentence(4),
            'kp_category' => fake()->randomElement(['Academic', 'Non-Academic', 'Community Service', 'Competition']),
            'kp_amount' => fake()->numberBetween(10, 100),
            'eligible_generation' => fake()->year(),
            'eligible_study_program' => fake()->randomElement(['Informatics', 'Information Systems', 'Computer Engineering', 'All Programs']),
            'date' => fake()->date(),
            'start_time' => fake()->time('H:i:s'),
            'end_time' => fake()->time('H:i:s'),
            'location' => fake()->address(),
            'registration_link' => fake()->url(),
            'registration_deadline_date' => fake()->dateTimeBetween('now', '+1 month')->format('Y-m-d'),
            'registration_deadline_time' => fake()->time('H:i'),
            'description' => fake()->paragraph(),
            'requirements' => fake()->paragraph(),
            'claiming_procedure' => fake()->paragraph(),
            'contact_person' => fake()->name() . ' (' . fake()->phoneNumber() . ')',
            'event_poster' => fake()->imageUrl(800, 600, 'events', true),
        ];
    }
}