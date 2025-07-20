<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;

class TicketRequest extends FormRequest
{
    protected function prepareForValidation()
    {
        $this->merge([
            'slug' => Str::slug($this->title),
        ]);
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'unique:tickets,slug,' . $this->ticket?->id],
            'description' => ['required', 'string', 'max:1000'],
            'price' => ['required', 'integer', 'min:5', 'max:50000'],
            'popular' => ['boolean'],
            'features' => ['required', 'array', 'min:1', 'max:10'],
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'The nom de l\'offre est requis.',
            'slug.required' => 'Le slug de l\'offre est requis.',
            'description.required' => 'La description de l\'offre est requise.',
            'price.required' => 'Le prix de l\'offre est requis.',
            'features.required' => 'Les caractéristiques de l\'offre sont requises.',
            'title.max' => 'Le nom de l\'offre ne peut pas dépasser 255 caractères.',
            'slug.max' => 'Le slug de l\'offre ne peut pas dépasser 255 caractères.',
            'description.max' => 'La description de l\'offre ne peut pas dépasser 1000 caractères.',
            'price.min' => 'Le prix de l\'offre doit être au moins de 5.',
            'price.max' => 'Le prix de l\'offre ne peut pas dépasser 50000.',
            'features.array' => 'Les caractéristiques de l\'offre doivent être un tableau.',
            'features.min' => 'Les caractéristiques de l\'offre doivent contenir au moins une caractéristique.',
            'features.max' => 'Les caractéristiques de l\'offre ne peuvent pas contenir plus de 10 caractéristiques.',
            'slug.unique' => 'Le slug de l\'offre doit être unique.',
            'features.*.string' => 'Chaque caractéristique de l\'offre doit être une chaîne de caractères.',
            'features.*.max' => 'Chaque caractéristique de l\'offre ne peut pas dépasser 255 caractères.',
            'features.*.required' => 'Chaque caractéristique de l\'offre est requise.',
            'popular.boolean' => 'Le champ populaire doit être vrai ou faux.',
        ];
    }
}
