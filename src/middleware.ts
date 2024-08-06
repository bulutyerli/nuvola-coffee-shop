import { NextRequest, NextResponse } from 'next/server';
import { runWithAmplifyServerContext } from './utils/amplify-server-utils';
import { fetchAuthSession } from 'aws-amplify/auth/server';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const user = await runWithAmplifyServerContext({
    nextServerContext: { request, response },
    operation: async (contextSpec) => {
      try {
        const session = await fetchAuthSession(contextSpec);
        return (
          session.tokens?.accessToken !== undefined &&
          session.tokens?.idToken !== undefined
        );
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  });
  console.log(user);
  if (
    !user &&
    (request.nextUrl.pathname.startsWith('/account') ||
      request.nextUrl.pathname.startsWith('/checkout') ||
      request.nextUrl.pathname.startsWith('/orders'))
  ) {
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
