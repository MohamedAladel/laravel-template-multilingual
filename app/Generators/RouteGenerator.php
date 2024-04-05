<?php

namespace App\Generators;

use Illuminate\Support\Facades\File;

class RouteGenerator
{
    static function toWeb($method, $uri, $contoller,  $func = null,  $name = null, $positionName = null)
    {
        $route = "\nRoute::$method('$uri'";

        if ($func == null) {
            $route .= ", '$contoller');\n";
        } else {
            $route .= ", ['$contoller','$func'])";
        }

        if ($name != null) {
            $route .= "->name('$name')";
        }

        $route .= ';\n';

        // Open the file in read mode to read its contents
        $file = File::get(base_path('routes/web.php'));

        $position = -1;
        if ($positionName != null) {
            $position = strpos($file, $positionName) ?: -1;
        }

        // Insert the new string at the specified position
        if ($position) {
            $file = substr_replace($file, $route, $position + 13, 0);

            // Open the file in write mode to overwrite its contents
            File::put(base_path('routes/web.php'), $file);
        }

        return $position;
    }
}
