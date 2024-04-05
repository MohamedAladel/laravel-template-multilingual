<?php

namespace App\Generator;

use Illuminate\Support\Facades\File;

class RouteGenerator
{
    public static function new()
    {
        return new RouteGenerator;
    }

    public function addWebUse($model)
    {
        $contoller = $model . 'Controller';
        $use = "\n" . 'use App\Http\Controllers' . '\\' . $contoller . ';';
        // Open the file in read mode to read its contents
        $file = File::get(base_path('routes/web.php'));
        $position = strpos($file, '<?php \n') + 6;
        $file = substr_replace($file, $use, $position, 0);
        // Open the file in write mode to overwrite its contents
        File::put(base_path('routes/web.php'), $file);

        return $this;
    }

    public function addWebRoute($method, $uri, $model, $func = null, $name = null, $positionName = null)
    {
        $contoller = $model . 'Controller';

        $route = "\nRoute::$method('$uri'";

        if ($func == null) {
            $route .= ", '$contoller');\n";
        } else {
            $route .= ", [$contoller::class,'$func'])";
        }

        if ($name != null) {
            $route .= "->name('$name')";
        }

        $route .= ';';

        // Open the file in read mode to read its contents
        $file = File::get(base_path('routes/web.php'));

        $position = -1;
        if ($positionName != null) {
            $position = strpos($file, $positionName) + strlen($positionName) ?: -1;
        }

        // Insert the new string at the specified position
        if ($position) {
            $file = substr_replace($file, $route, $position, 0);

            // Open the file in write mode to overwrite its contents
            File::put(base_path('routes/web.php'), $file);
        }

        return $position;
    }

    public function addWebRoutes(array $routes)
    {
        foreach ($routes as $route) {
            $this->addWebRoute(...$route);
        }

        return $this;
    }
}
