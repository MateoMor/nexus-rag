import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

/**
 * OAuth callback handler for Supabase authentication
 * 
 * This route handler processes OAuth callbacks from third-party providers 
 * and exchanges the authorization code for a user session.
 * 
 * @param request - The incoming HTTP request containing the authorization code
 * @returns NextResponse - Redirects to dashboard on success or login page on error
 * 
 * @route GET /auth/callback
 */
export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    
    try {
      // Exchange the authorization code for a user session
      await supabase.auth.exchangeCodeForSession(code)
      console.log('OAuth login successful')
    } catch (error) {
      console.error('Error during OAuth:', error)
      return NextResponse.redirect(new URL('/login?error=oauth_error', request.url))
    }
  }

  // Redirect to dashboard on successful authentication
  return NextResponse.redirect(new URL('/dashboard', request.url))
}