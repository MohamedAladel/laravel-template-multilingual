<?php

namespace App\Constants;

class PermissionConstant
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
        ['label' => 'View Shortlink', 'name' => 'view-shortlink'],


        // #Add New Permission Below!
		['label' => 'Delete Customer', 'name' => 'delete-customer'],
		['label' => 'Update Customer', 'name' => 'update-customer'],
		['label' => 'Create Customer', 'name' => 'create-customer'],
		['label' => 'View Customer', 'name' => 'view-customer'],

    ];
}
