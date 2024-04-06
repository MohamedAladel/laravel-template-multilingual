<?php

namespace App\Console\Commands;

use App\Services\PermissionServices;
use Illuminate\Console\Command;

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
        $this->setAliases(['sync-permission', 'syncp', 'sp', 'permission-sync', 'permsync']);

        parent::configure();
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        [$to_add, $to_delete] = PermissionServices::new()->sync();
        $this->info('Permission synced : '.count($to_add).' added, '.count($to_delete).' deleted');
    }
}
