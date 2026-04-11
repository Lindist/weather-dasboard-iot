import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * GitHub (and other Supabase OAuth providers) redirect here with ?code=...
 * after the user authorizes. We exchange the code for a session and set auth cookies.
 */
export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const nextParam = url.searchParams.get('next') ?? '/'

  const safeNext =
    nextParam.startsWith('/') && !nextParam.startsWith('//') ? nextParam : '/'

  if (!code) {
    return NextResponse.redirect(new URL('/auth?error=missing_code', url.origin))
  }

  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        },
      },
    }
  )

  try {
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      return NextResponse.redirect(
        new URL(`/auth?error=${encodeURIComponent(error.message)}`, url.origin)
      )
    }

    const forwardedHost = request.headers.get('x-forwarded-host')
    const isLocal = process.env.NODE_ENV === 'development'

    if (isLocal) {
      return NextResponse.redirect(new URL(safeNext, url.origin))
    }

    if (forwardedHost) {
      return NextResponse.redirect(new URL(safeNext, `https://${forwardedHost}`))
    }

    return NextResponse.redirect(new URL(safeNext, url.origin))
  } catch {
    return NextResponse.redirect(new URL('/auth?error=oauth', url.origin))
  }
}
