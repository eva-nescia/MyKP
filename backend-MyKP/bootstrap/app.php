<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->api(prepend: [
            \Illuminate\Http\Middleware\HandleCors::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        // Return a clean JSON 404 / 405 for any unmatched /api/* request so
        // typo'd endpoints (e.g. POST /api/logi instead of /api/login) don't
        // surface as Laravel's full HTML/stack-trace debug page. The fallback
        // route in api.php only catches GET; this catches every method.
        $exceptions->render(function (NotFoundHttpException $e, $request) {
            if ($request->is('api/*') || $request->expectsJson()) {
                return response()->json([
                    'message' => 'Endpoint not found. Check the URL.',
                    'path'    => $request->path(),
                    'method'  => $request->method(),
                ], 404);
            }
        });

        $exceptions->render(function (MethodNotAllowedHttpException $e, $request) {
            if ($request->is('api/*') || $request->expectsJson()) {
                return response()->json([
                    'message' => 'HTTP method not allowed for this endpoint.',
                    'path'    => $request->path(),
                    'method'  => $request->method(),
                ], 405);
            }
        });
    })->create();
