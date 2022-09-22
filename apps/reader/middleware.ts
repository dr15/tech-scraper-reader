import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // an API path to fetch rss feeds
  if (request.nextUrl.pathname.startsWith('/api/rss')) {
    const newPathArray = request.nextUrl.pathname
      .split('/')
      .filter((item) => item != '');
    newPathArray.splice(0, 2); // removes "api" and "rss" (/api/rss) from path
    const newPathString = `https://${newPathArray.join('/')}`;

    return NextResponse.rewrite(new URL(newPathString, request.url));
  }
}
