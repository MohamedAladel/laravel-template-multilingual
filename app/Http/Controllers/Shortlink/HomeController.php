<?php

namespace App\Http\Controllers\Shortlink;

use App\Http\Controllers\Controller;
use App\Models\Shortlink\Link;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        return inertia('Shortlink/Home/Index');
    }

    public function store(Request $request)
    {
        $request->validate(['link' => 'required|string|url']);

        $link = Link::create([
            'name' => $request->input('link'),
            'code' => Link::generateCode(),
            'real_link' => $request->input('link'),
            'user_id' => auth()->id(),
        ]);

        return redirect()->route('shortlink.home')
            ->with('message', [
                'type' => 'success',
                'message' => 'link success created',
                'link' => route('shortlink.redirect', $link),
            ]);
    }

    public function redirect(Link $link)
    {
        $link->update([
            'visit_count' => $link->visit_count + 1,
            'last_visited_at' => now(),
        ]);

        $link->visitor()->create([
            'user_id' => auth()->id(),
            'request' => json_encode(request()->input()),
            'header' => json_encode(request()->header()),
            'device' => request()->header('sec-ch-ua-mobile'),
            'platform' => request()->header('sec-ch-ua-platform', 'bot'),
            'browser' => request()->header('sec-ch-ua'),
            'languages' => json_encode(request()->header('accept-language')),
            'ip' => request()->ip(),
            'useragent' => request()->header('user-agent'),
        ]);

        return redirect($link->real_link, 302);
    }
}
