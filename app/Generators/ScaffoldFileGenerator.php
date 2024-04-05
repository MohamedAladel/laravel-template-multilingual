<?php

namespace App\Generators;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

use function Laravel\Prompts\info;

class ScaffoldFileGenerator
{
    public static function ScaffoldModal($model)
    {
        // model
        $model = Str::lower($model);
        // models
        $models = Str::plural($model);
        // Model
        $Model = Str::ucfirst($model);
        // destinations
        $destinations = [
            'files' => [app_path('Http/Controllers/').$Model.'Controller.php'],
            'dirs' => [resource_path('js/Pages/').$models],
        ];

        try {
            // ModelController.php
            (new StubFileGenerator)->from(base_path('resources/stubs/').'crud_modal/ModelController.stub')
                ->to(app_path('Http/Controllers/'))
                ->name($Model.'Controller')
                ->ext('php')
                ->replaces([
                    'model' => $model,
                    'models' => $models,
                    'Model' => $Model,
                ])
                ->generate();

            // Index.jsx
            (new StubFileGenerator)->from(base_path('resources/stubs/').'crud_modal/Index.stub')
                ->to(resource_path('js/Pages/').$Model.'/')
                ->name('Index')
                ->ext('jsx')
                ->replaces([
                    'model' => $model,
                    'models' => $models,
                    'Model' => $Model,
                ])
                ->generate();

            // FormModal.jsx
            (new StubFileGenerator)->from(base_path('resources/stubs/').'crud_modal/FormModal.stub')
                ->to(resource_path('js/Pages/').$Model.'/')
                ->name('FormModal')
                ->ext('jsx')
                ->replaces([
                    'model' => $model,
                    'models' => $models,
                    'Model' => $Model,
                ])
                ->generate();

            // Web Router
            RouteGenerator::addUse($Model.'Controller');
            RouteGenerator::toWeb('get', $models, $Model.'Controller', 'index', $models.'.index');
            RouteGenerator::toWeb('post', $models, $Model.'Controller', 'store', $models.'.store');
            RouteGenerator::toWeb('put', $models.'/{'.$model.'}', $Model.'Controller', 'update', $models.'.update');
            RouteGenerator::toWeb('delete', $models.'/{'.$model.'}', $Model.'Controller', 'destroy', $models.'.destroy');
        } catch (\Exception $e) {
            info('Failed to create scaffold');
            Log::info(self::class, ['message' => $e->getMessage()]);
            foreach ($destinations['dirs'] as $d) {
                File::deleteDirectory($d);
            }
            foreach ($destinations['files'] as $d) {
                File::delete($d);
            }
        }

        info('Scaffold created successfully.');
    }

    public static function ScaffoldPage($model)
    {
    }

    public static function ScaffoldSinglePage($model)
    {
    }
}
