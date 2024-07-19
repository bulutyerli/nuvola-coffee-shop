import { type NextRequest, NextResponse } from 'next/server';
import { authenticatedUser } from './utils/amplify-server-utils';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const user = await authenticatedUser({ request, response });

  const isOnAccount = request.nextUrl.pathname.startsWith('/account');

  if (isOnAccount && !user) {
    return NextResponse.redirect(new URL('/auth/sign-in', request.nextUrl));
  }

  if (
    user &&
    (request.nextUrl.pathname.startsWith('/auth/sign-in') ||
      request.nextUrl.pathname.startsWith('/auth/sign-up'))
  ) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }
}

export const config = {
  /*
   * Match all request paths except for the ones starting with
   */
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
