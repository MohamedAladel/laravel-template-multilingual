<?php

namespace App\Models\Shortlink;

use App\Models\Default\Model;

class LinkVisitor extends Model
{
    protected $fillable = [
        'link_id',
        'user_id',
        'request',
        'header',
        'device',
        'platform',
        'browser',
        'languages',
        'ip',
        'useragent',
    ];
}
