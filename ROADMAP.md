## TODO

-   [x] add dark mode
-   [x] add permission command -> just add to list model and run sync-permission
-   [x] change docker compose nginx+php-fpm to frankenphp (still in research)
-   [x] create a jwt token [https://github.com/firebase/php-jwt] | user login -> generate encode payload user id -> save in cache

## NICE TO CREATE

-   [ ] file service , centralize file upload and access
-   [ ] add rich editor
-   [ ] general table component, a component has filter and search
-   [ ] replace any component contains react-datepicker with react-tailwindcss-datepicker
-   [ ] create unit test to login, logout, manage role, manage user, test api select general table
-   [x] select api component (central table select api), props : what to show in select, item selected is id or full item
-   [x] change react-toastify to [sonner](https://github.com/emilkowalski/sonner)
<!-- stub -->
-   [ ] crud generator, a page that you can choose want create a single page, crud (modal, page), with/without permission :
    -   normal crud with model form -> after generate need to add route and web
        -   Index.jsx, FormModal.jsx, Contoller.php
    -   normal crud with form page -> after generate need to add route and web
        -   Index.jsx, Form.jsx, Contoller.php
    -   single page -> after generate need to add route and web
        -   Index.jsx, Contoller.php
