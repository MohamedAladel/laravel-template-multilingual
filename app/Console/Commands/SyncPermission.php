<?php

namespace App\Console\Commands;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Console\Command;
use Illuminate\Support\Str;

class SyncPermission extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:sync-permission';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'sync any new create permission and attach to `admin` role ';

    /**
     * Configure the command.
     */
    protected function configure()
    {
        $this->setAliases(['sync-permission', 'syncp', 'sp']);

        parent::configure();
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $lists = collect(Permission::LIST)->map(fn ($permission) => $permission['name'])->toArray();
        $permissions = Permission::all()->pluck('name')->toArray();

        // remove existing permission in database
        $to_delete = array_diff($permissions, $lists);
        foreach ($to_delete as $name) {
            Permission::where('name', $name)->delete();
        }

        $adminRole = Role::where('name', 'admin')->first();
        // add new permission to database
        $to_add = array_diff($lists, $permissions);
        foreach ($to_add as $index => $name) {
            $np = Permission::create(['id' => Str::ulid(), ...Permission::LIST[$index]]);
            if ($adminRole != null) {
                $adminRole->rolePermissions()->create(['permission_id' => $np->id]);
            }
        }

        $this->info('Permission synced : '.count($to_add).' added, '.count($to_delete).' deleted');
    }
}
