<?php

namespace App\Generator;

use Illuminate\Support\Str;

class FileGenerator
{
    private $model;

    public static function new()
    {
        return new FileGenerator;
    }

    public function ScaffoldModal($model, $replaces)
    {
        $this->model = Str::ucfirst($model);

        // ModelController.php
        (new StubFileGenerator)->from(base_path('resources/stubs/scaffold_modal/').'ModelController.stub')
            ->to(app_path('Http/Controllers/'))
            ->name($this->model.'Controller')
            ->ext('php')
            ->replaces($replaces)
            ->generate();

        // Index.jsx
        (new StubFileGenerator)->from(base_path('resources/stubs/scaffold_modal/').'Index.stub')
            ->to(resource_path('js/Pages/').$this->model.'/')
            ->name('Index')
            ->ext('jsx')
            ->replaces($replaces)
            ->generate();

        // FormModal.jsx
        (new StubFileGenerator)->from(base_path('resources/stubs/scaffold_modal/').'FormModal.stub')
            ->to(resource_path('js/Pages/').$this->model.'/')
            ->name('FormModal')
            ->ext('jsx')
            ->replaces($replaces)
            ->generate();
    }

    public function ScaffoldPage($model, $replaces)
    {
        $this->model = Str::ucfirst($model);

        // ModelController.php
        (new StubFileGenerator)->from(base_path('resources/stubs/scaffold_page/').'ModelController.stub')
            ->to(app_path('Http/Controllers/'))
            ->name($this->model.'Controller')
            ->ext('php')
            ->replaces($replaces)
            ->generate();

        // Index.jsx
        (new StubFileGenerator)->from(base_path('resources/stubs/scaffold_page/').'Index.stub')
            ->to(resource_path('js/Pages/').$this->model.'/')
            ->name('Index')
            ->ext('jsx')
            ->replaces($replaces)
            ->generate();

        // FormModal.jsx
        (new StubFileGenerator)->from(base_path('resources/stubs/scaffold_page/').'Form.stub')
            ->to(resource_path('js/Pages/').$this->model.'/')
            ->name('Form')
            ->ext('jsx')
            ->replaces($replaces)
            ->generate();
    }

    public function ScaffoldSinglePage($model, $replaces)
    {
        $this->model = Str::ucfirst($model);

        // ModelController.php
        (new StubFileGenerator)->from(base_path('resources/stubs/single_page/').'ModelController.stub')
            ->to(app_path('Http/Controllers/'))
            ->name($this->model.'Controller')
            ->ext('php')
            ->replaces($replaces)
            ->generate();

        // Index.jsx
        (new StubFileGenerator)->from(base_path('resources/stubs/single_page/').'Index.stub')
            ->to(resource_path('js/Pages/').$this->model.'/')
            ->name('Index')
            ->ext('jsx')
            ->replaces($replaces)
            ->generate();
    }
}
