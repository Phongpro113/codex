// app/api/redeem/logs/route.ts
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    let limit = parseInt(request.nextUrl.searchParams.get('limit') || '100', 10)
    if (isNaN(limit) || limit <= 0 || limit > 200) {
      limit = 100
    }

    const sum = await prisma.redeemLog.count()
    if (sum === 0) {
      return NextResponse.json({ success: true, data: [], count: 0 })
    }

    const createdFrom = request.nextUrl.searchParams.get('createdFrom')
    const createdTo = request.nextUrl.searchParams.get('createdTo')
    const code = request.nextUrl.searchParams.get('code')
    const email = request.nextUrl.searchParams.get('email')

    const where = {
      ...(code ? { code: { contains: code } } : {}),
      ...(email ? { jsonData: { path: ['user', 'email'], string_contains: email } } : {}),
      ...((createdFrom || createdTo) ? {
        createdAt: {
          ...(createdFrom ? { gte: new Date(createdFrom) } : {}),
          ...(createdTo ? { lte: new Date(createdTo) } : {}),
        },
      } : {}),
    }

    const allLogs = await prisma.redeemLog.findMany({
      where,
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
        createdAt: 'desc',
      },
      take: limit,
    })

    const data = allLogs.map(({ jsonData, ...log }) => ({
      ...log,
      email: (jsonData as { user?: { email?: string } } | null)?.user?.email ?? null,
    }))

    return NextResponse.json({ success: true, data, count: sum })
  } catch (error) {
    console.error('Error fetching logs:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch records' },
      { status: 500 }
    )
  }
}
