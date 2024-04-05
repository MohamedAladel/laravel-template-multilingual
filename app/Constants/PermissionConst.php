<?php

namespace App\Constants;

class PermissionConst
{
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

        ['label' => 'Create customer', 'name' => 'create-customer'],
        ['label' => 'Update customer', 'name' => 'update-customer'],
        ['label' => 'View customer', 'name' => 'view-customer'],
        ['label' => 'Delete customer', 'name' => 'delete-customer'],

        // #Add New Permission Below!
    ];
}