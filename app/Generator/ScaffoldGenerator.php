<?php

namespace App\Generator;

use App\Services\PermissionServices;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

use function Laravel\Prompts\error;
use function Laravel\Prompts\info;

class ScaffoldGenerator
{
    private string $model;

    private string $models;

    private string $Model;

    private bool $adminAccess = false;

    private array $defaultDestinations;

    private array $fields; //not yet used

    public function __construct(
        string $model,
        bool $adminAccess = false,
        array $fields = [],
        public $createModelClass = false,
    ) {
        $this->model = Str::lower($model);
        $this->models = Str::plural($this->model);
        $this->Model = Str::ucfirst($this->model);

        $this->adminAccess = $adminAccess;
        $this->fields = $fields;

        $this->defaultDestinations = [
            'files' => [app_path('Http/Controllers/') . $this->Model . 'Controller.php'],
            'dirs' => [resource_path('js/Pages/') . $this->models],
        ];

        if ($this->createModelClass) {
            Artisan::call('make:model ' . $this->Model . ' -m');
        }
    }

    public function ScaffoldModal()
    {
        $replaces = [
            'model' => $this->model,
            'models' => $this->models,
            'Model' => $this->Model,
        ];

        try {
            // File: ModelController.php, Index.jsx, FormModal.jsx
            FileGenerator::new()->ScaffoldModal($this->model, $replaces);

            // Web Router
            $positionName = $this->adminAccess ? '// #Admin' : null;
            RouteGenerator::new()
                ->addWebUse($this->Model)
                ->addWebRoutes([
                    ['get', $this->models, $this->Model, 'index', $this->models . '.index', $positionName],
                    ['post', $this->models, $this->Model, 'store', $this->models . '.store', $positionName],
                    ['put', $this->models . '/{' . $this->model . '}', $this->Model, 'update', $this->models . '.update', $positionName],
                    ['delete', $this->models . '/{' . $this->model . '}', $this->Model, 'destroy', $this->models . '.destroy', $positionName],
                ]);

            // Permission 
            $this->createResourcePermissions();
        } catch (\Exception $e) {
            $this->removeDefaultDestinations();
            error('Failed to create scaffold');
            Log::info(self::class, ['message' => $e->getMessage()]);
        }

        info('Scaffold created successfully.');
    }

    public function ScaffoldPage()
    {
        $replaces = [
            'model' => $this->model,
            'models' => $this->models,
            'Model' => $this->Model,
        ];

        try {
            // File: ModelController.php, Index.jsx, Form.jsx
            FileGenerator::new()->ScaffoldPage($this->model, $replaces);

            // Web Router
            $positionName = $this->adminAccess ? '// #Admin' : null;
            RouteGenerator::new()
                ->addWebUse($this->Model)
                ->addWebRoute('resource', $this->models, $this->Model, positionName: $positionName);

            // Permission 
            $this->createResourcePermissions();
        } catch (\Exception $e) {
            $this->removeDefaultDestinations();
            error('Failed to create scaffold');
            Log::info(self::class, ['message' => $e->getMessage()]);
        }

        info('Scaffold created successfully.');
    }

    public function ScaffoldSinglePage()
    {
        $replaces = [
            'model' => $this->model,
            'models' => $this->models,
            'Model' => $this->Model,
        ];

        try {
            // File: ModelController.php, Index.jsx
            FileGenerator::new()->ScaffoldSinglePage($this->model, $replaces);

            // Web Router
            $positionName = $this->adminAccess ? '// #Admin' : null;
            RouteGenerator::new()
                ->addWebUse($this->Model)
                ->addWebRoutes([
                    ['get', $this->models, $this->Model, 'index', $this->models . '.index', $positionName],
                    ['post', $this->models, $this->Model, 'update', $this->models . '.update', $positionName],
                ]);

            // Permission 
            PermissionGenerator::new()->addPermission('view-' . $this->model, 'View ' . $this->Model);
            PermissionServices::new()->sync();
        } catch (\Exception $e) {
            $this->removeDefaultDestinations();
            error('Failed to create scaffold');
            Log::info(self::class, ['message' => $e->getMessage()]);
        }

        info('Scaffold created successfully.');
    }

    private function removeDefaultDestinations()
    {
        foreach ($this->defaultDestinations['dirs'] as $d) {
            File::deleteDirectory($d);
        }
        foreach ($this->defaultDestinations['files'] as $d) {
            File::delete($d);
        }
    }

    private function createResourcePermissions()
    {
        PermissionGenerator::new()
            ->addPermissions([
                ['view-' . $this->model, 'View ' . $this->Model],
                ['create-' . $this->model, 'Create ' . $this->Model],
                ['update-' . $this->model, 'Update ' . $this->Model],
                ['delete-' . $this->model, 'Delete ' . $this->Model],
            ]);

        PermissionServices::new()->sync();
    }
}
