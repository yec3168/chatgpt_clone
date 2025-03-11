import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { AUTH_ROUTES, BASE_URL, PUBLIC_ROUTES } from './constants/routes';
import { cookies } from 'next/headers';
import { verify } from './actions/session';

 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    /**
     * 1. 사용자 로그인 여부 확인
     * 2. 페이지 접근 여부 판별
     * 3. 필요하면 특정 페이지에 리다이렉트 
     * 
     * PUBLIC_ROUTE : 로그인 없이 접근할 수 있는 경로.
     */
    const {pathname} = request.nextUrl;
    // public_route인지 확인
    const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

    // session 확인.
    const cookie = (await cookies()).get('session')?.value;
    const session = await verify(cookie);

    
    if(!isPublicRoute && !session){
        return NextResponse.redirect(new URL(AUTH_ROUTES.LOGIN, request.url))
    }
    if(isPublicRoute && session){
        return NextResponse.redirect(new URL(BASE_URL, request.url))
    }
    return NextResponse.next();
//   return NextResponse.redirect(new URL('/home', request.url))
}
 
/**
 * 미들웨어는 프로젝트 모든 경로에서 호출되기 때문에 특정한 경로를 정확히 타겟팅하거나 제외하기위해서 matcher를 설정한다.
 * 아래 경로로 접근하는 경로에서는 미들웨어를 호출하지 않는다.
 */
export const config = {
    matcher: [
      /*
       * Match all request paths except for the ones starting with:
       * - api (API routes)
       * - _next/static (static files)
       * - _next/image (image optimization files)
       * - favicon.ico, sitemap.xml, robots.txt (metadata files)
       */
      '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
  }