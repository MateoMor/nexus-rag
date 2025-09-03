import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    
    try {
      await supabase.auth.exchangeCodeForSession(code)
      console.log('OAuth login successful')
    } catch (error) {
      console.error('Error during OAuth:', error)
      return NextResponse.redirect(new URL('/login?error=oauth_error', request.url))
    }
  }

  // Redirigir al dashboard
  return NextResponse.redirect(new URL('/dashboard', request.url))
}