<?php

namespace App\Http\Controllers\Default;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules\File;

class FileController extends Controller
{
    public function show(string $name)
    {
        if (Storage::disk('local')->exists('default/' . $name)) {
            return Storage::disk('local')->get('default/' . $name);
        }

        return Storage::disk('local')->get('public/' . $name);
    }

    public function store(Request $request)
    {
        $rule = ['required', 'file'];
        if ($request->filemimes != '') {
            $rule[] = File::types($request->filemimes);
        }

        $request->validate([
            'file' => $rule,
        ]);

        $file = $request->file('file');

        Storage::disk('local')->put('public', $file);

        return response()->json([
            'id' => Str::ulid(),
            'name_original' => $file->getClientOriginalName(),
            'name' => $file->hashName(),
            'url' => route('file.show', ['file' => $file->hashName()]),
        ]);
    }
}
