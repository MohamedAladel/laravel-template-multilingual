<?php

namespace App\Generators;

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
        $Model  = Str::ucfirst($model);

        // ModelController.php
        (new StubFileGenerator())->from(base_path('resources/stubs/') . 'crud_modal/ModelController.stub')
            ->to(app_path('Http/Controllers/'))
            ->name($Model . 'Controller')
            ->ext('php')
            ->replaces([
                'model' => $model,
                'models' => $models,
                'Model' => $Model
            ])
            ->generate();
        info('Created ' . $Model . 'Controller.php');

        // Index.jsx
        (new StubFileGenerator())->from(base_path('resources/stubs/') . 'crud_modal/Index.stub')
            ->to(resource_path('js/Pages/') . $models . '/')
            ->name('Index')
            ->ext('jsx')
            ->replaces([
                'model' => $model,
                'models' => $models,
                'Model' => $Model
            ])
            ->generate();
        info('Created ' . 'js/Pages/' . $models . '/Index.jsx');

        // FormModal.jsx
        (new StubFileGenerator())->from(base_path('resources/stubs/') . 'crud_modal/FormModal.stub')
            ->to(resource_path('js/Pages/') . $models . '/')
            ->name('FormModal')
            ->ext('jsx')
            ->replaces([
                'model' => $model,
                'models' => $models,
                'Model' => $Model
            ])
            ->generate();
        info('Created ' . 'js/Pages/' . $models . '/FormModal.jsx');

        // Web Router
        RouteGenerator::toWeb('get', $models, $Model . 'Controller', 'index', $models . '.index');
        RouteGenerator::toWeb('post', $models, $Model . 'Controller', 'store', $models . '.store');
        RouteGenerator::toWeb('put', $models . '/{' . $model . '}', $Model . 'Controller', 'update', $models . '.update');
        RouteGenerator::toWeb('delete', $models . '/{' . $model . '}', $Model . 'Controller', 'destroy', $models . '.destroy');

        info('Route registred');
    }

    public static function ScaffoldPage($model)
    {
    }

    public static function ScaffoldSinglePage($model)
    {
    }
}
