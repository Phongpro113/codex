// app/api/redeem/logs/route.ts
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

type CreateRedeemLogBody = {
  code: string
  status: string
  key_type: string
  plan: string
  term: string
  service: string
  subscription_hours: number
  activated_email: string | null
  date_active?: string | null
  json_data?: Prisma.InputJsonValue
}

function isInputJsonValue(v: unknown): v is Prisma.InputJsonValue {
  if (v === null) return false
  const t = typeof v
  if (t === 'string' || t === 'number' || t === 'boolean') return true
  if (Array.isArray(v)) return v.every(isInputJsonValue)
  if (t === 'object') {
    return Object.values(v as Record<string, unknown>).every(isInputJsonValue)
  }
  return false
}

function isCreateBody(value: unknown): value is CreateRedeemLogBody {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) return false
  const o = value as Record<string, unknown>
  if (
    typeof o.code !== 'string' ||
    typeof o.status !== 'string' ||
    typeof o.key_type !== 'string' ||
    typeof o.plan !== 'string' ||
    typeof o.term !== 'string' ||
    typeof o.service !== 'string' ||
    typeof o.subscription_hours !== 'number' ||
    !(o.activated_email === null || typeof o.activated_email === 'string')
  ) {
    return false
  }
  if ('json_data' in o && o.json_data !== undefined && !isInputJsonValue(o.json_data)) {
    return false
  }
  return true
}

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json()
    if (!isCreateBody(body)) {
      return NextResponse.json(
        { success: false, error: 'Invalid request body' },
        { status: 400 }
      )
    }

    const row = await prisma.redeemLog.create({
      data: {
        code: body.code,
        // status: body.status,
        status: 'Used',
        keyType: body.key_type,
        plan: body.plan,
        term: body.term,
        service: body.service,
        subscriptionHours: body.subscription_hours,
        activatedEmail: body.activated_email,
        dateActive: body.date_active ?? null,
        ...(body.json_data !== undefined ? { jsonData: body.json_data } : {}),
      },
    })

    const email = (body.json_data as { user?: { email?: string } } | null)?.user?.email ?? body.activated_email ?? null

    const newEntry = { code: body.code, email, dateActive: body.date_active ?? null, status: 'Used' }
    let existing: typeof newEntry[] = []
    try {
      const raw = request.cookies.get('redeemRecord')?.value
      if (raw) existing = JSON.parse(decodeURIComponent(raw)) as typeof newEntry[]
      if (!Array.isArray(existing)) existing = []
    } catch { existing = [] }
    existing.push(newEntry)

    const res = NextResponse.json({ success: true, data: row }, { status: 201 })
    res.cookies.set('redeemRecord', JSON.stringify(existing), {
      path: '/', maxAge: 60 * 60 * 24 * 30, sameSite: 'lax',
    })
    return res
  } catch (error) {
    console.error('Error creating redeem log:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to save record' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Lấy tất cả records, limit 100 records nếu không có query params limit
    let limit = parseInt(request.nextUrl.searchParams.get('limit') || '100', 10)
    if (isNaN(limit) || limit <= 0 || limit > 200) {
      limit = 100
    }
    
    const allLogs = await prisma.redeemLog.findMany({
      select: {
        id: true,
        code: true,
        status: true,
        keyType: true,
        plan: true,
        term: true,
        service: true,
        subscriptionHours: true,
        activatedEmail: true,
        dateActive: true,
        createdAt: true,
        jsonData: true,
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: limit
    })

    const data = allLogs.map(({ jsonData, ...log }) => ({
      ...log,
      email: (jsonData as { user?: { email?: string } } | null)?.user?.email ?? null,
    }))

    return NextResponse.json({
      success: true,
      data,
      count: data.length
    })
    
  } catch (error) {
    console.error('Error fetching logs:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch records' },
      { status: 500 }
    )
  }
}