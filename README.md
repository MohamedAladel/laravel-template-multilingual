# Laravel Template - Preline

This just a laravel template with breeze react, user role based access crud with setup <a href="https://daisyui.com?ref=github.com/ajikamaludin" target="_blank">daisyui style</a> admin template

## Support me

<a href="https://trakteer.id/ajikamaludin" target="_blank"><img id="wse-buttons-preview" src="https://cdn.trakteer.id/images/embed/trbtn-blue-2.png" height="40" style="border:0px;height:40px;" alt="Trakteer Saya"></a>

## Requirements

-   PHP 8.2 or latest
-   Node 20+ or latest

## How to run

prepare env

```bash
cp .env.example .env # configure app for laravel
touch database/database.sqlite # if you use .env.example with default sqlite database
composer install
npm install
```

use php server

```bash
php artisan migrate --seed # create table for db and seed data
php artisan key:gen
php artisan ser #keep run to dev
```

compile asset

```bash
npm run dev # compiling asset for development # keep run for dev
```

<hr/>

easy way

```bash
docker compose up -d
```

## Default User

```bash
username : admin@admin.com
password : password
```

## Compile Assets ( to prod )

```bash
npm run build
```

## Screen Capture

![](screenshot_v3.gif?raw=true)

<hr/>

## Features

### 1. Scaffold generator

it can generate 3 type of crud : form modal, form page, and single form, run command below to test

```bash
php artisan scaffold
```

will ask you few options

![](screenshot_generator.png?raw=true)

in above example you will can see the result by access [http://localhost/customers](http://localhost/customers) or add menu to sidebar with

```js
// resources/js/Layouts/routes.cjs
{
    name: 'Customer',
    show: true,
    icon: HiCog,
    route: route('customers.index'),
    active: 'customers.index',
    permission: 'view-setting-customers',
},
```
