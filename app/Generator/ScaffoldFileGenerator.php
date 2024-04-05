<?php

namespace App\Generator;

use App\Services\PermissionServices;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

use function Laravel\Prompts\error;
use function Laravel\Prompts\info;

class ScaffoldFileGenerator
{
    private string $models;

    private string $Model;

    private array $defaultDestinations;

    public function __construct(
        public string $model,
        public bool $adminAccess = false,
        public array $fields = []
    ) {
        $this->model = Str::lower($this->model);
        $this->models = Str::plural($this->model);
        $this->Model = Str::ucfirst($this->model);

        $this->defaultDestinations = [
            'files' => [app_path('Http/Controllers/') . $this->Model . 'Controller.php'],
            'dirs' => [resource_path('js/Pages/') . $this->models],
        ];
    }

    public function ScaffoldModal()
    {
        $replaces = [
            'model' => $this->model,
            'models' => $this->models,
            'Model' => $this->Model,
        ];

        try {
            // ModelController.php
            (new StubFileGenerator)->from(base_path('resources/stubs/scaffold_modal/') . 'ModelController.stub')
                ->to(app_path('Http/Controllers/'))
                ->name($this->Model . 'Controller')
                ->ext('php')
                ->replaces($replaces)
                ->generate();

            // Index.jsx
            (new StubFileGenerator)->from(base_path('resources/stubs/scaffold_modal/') . 'Index.stub')
                ->to(resource_path('js/Pages/') . $this->Model . '/')
                ->name('Index')
                ->ext('jsx')
                ->replaces($replaces)
                ->generate();

            // FormModal.jsx
            (new StubFileGenerator)->from(base_path('resources/stubs/scaffold_modal/') . 'FormModal.stub')
                ->to(resource_path('js/Pages/') . $this->Model . '/')
                ->name('FormModal')
                ->ext('jsx')
                ->replaces($replaces)
                ->generate();

            $positionName = $this->adminAccess ? '// #Admin' : null;
            // Web Router
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
            // ModelController.php
            (new StubFileGenerator)->from(base_path('resources/stubs/scaffold_page/') . 'ModelController.stub')
                ->to(app_path('Http/Controllers/'))
                ->name($this->Model . 'Controller')
                ->ext('php')
                ->replaces($replaces)
                ->generate();

            // Index.jsx
            (new StubFileGenerator)->from(base_path('resources/stubs/scaffold_page/') . 'Index.stub')
                ->to(resource_path('js/Pages/') . $this->Model . '/')
                ->name('Index')
                ->ext('jsx')
                ->replaces($replaces)
                ->generate();

            // FormModal.jsx
            (new StubFileGenerator)->from(base_path('resources/stubs/scaffold_page/') . 'Form.stub')
                ->to(resource_path('js/Pages/') . $this->Model . '/')
                ->name('Form')
                ->ext('jsx')
                ->replaces($replaces)
                ->generate();

            $positionName = $this->adminAccess ? '// #Admin' : null;
            // Web Router
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

    public static function ScaffoldSinglePage()
    {
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
