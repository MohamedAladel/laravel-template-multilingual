<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Permission extends Model
{
    use HasFactory, HasUlids;

    protected $fillable = [
        'name',
        'label',
    ];

    const LIST = [
        ['label' => 'View Dashboard', 'name' => 'view-dashboard'],

        ['label' => 'Create User', 'name' => 'create-user'],
        ['label' => 'Update User', 'name' => 'update-user'],
        ['label' => 'View User', 'name' => 'view-user'],
        ['label' => 'Delete User', 'name' => 'delete-user'],

        ['label' => 'Create Role', 'name' => 'create-role'],
        ['label' => 'Update Role', 'name' => 'update-role'],
        ['label' => 'View Role', 'name' => 'view-role'],
        ['label' => 'Delete Role', 'name' => 'delete-role'],

        ['label' => 'View Setting', 'name' => 'view-setting'],
    ];
}
