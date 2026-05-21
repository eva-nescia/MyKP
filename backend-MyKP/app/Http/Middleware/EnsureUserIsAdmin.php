<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (! $user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        if (strtolower((string) $user->Role) !== 'admin') {
            return response()->json([
                'error' => 'Forbidden — admin role required for this action.',
            ], 403);
        }

        return $next($request);
    }
}
