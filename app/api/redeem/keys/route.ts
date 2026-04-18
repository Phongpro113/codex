// app/api/redeem/keys/route.ts
import { NextRequest, NextResponse } from 'next/server'

// Interface cho request body
interface RedeemRequest {
    key: string
}

interface ProviderRedeemResponse {
    code: string
    status: string
    key_type: string
    plan: string
    term: string
    service: string
    subscription_hours: number
    activated_email: string | null
    date_active?: string | null
}

export async function POST(request: NextRequest) {
    try {
        // Parse request body
        const body: RedeemRequest = await request.json()
        const { key } = body

        // Validate input
        if (!key || typeof key !== 'string') {
            return NextResponse.json(
                { success: false, message: 'Invalid key format' },
                { status: 400 }
            )
        }

        // Validate key format (example: uppercase hex)
        const isSendApi = true

        if (isSendApi) {
            // call api to https://opencodex.plus/api/redeem/keys/key
            const response = await fetch(`https://opencodex.plus/api/redeem/keys/${key}`, {
                method: 'GET', // hoặc POST tùy API yêu cầu
                headers: {
                    'Content-Type': 'application/json',
                    // Thêm nếu API yêu cầu authentication
                    // 'Authorization': `Bearer ${process.env.API_TOKEN}`,
                    // 'X-API-Key': process.env.X_API_KEY,
                },
            })
            const data: ProviderRedeemResponse = await response.json()
            if (response.ok) {
                return NextResponse.json(data, { status: 200 })
            } else {
                return NextResponse.json({ success: false, message: 'Invalid CDK key format' }, { status: 400 })
            }
        }
    } catch (error) {
        console.error('Redeem error:', error)

        return NextResponse.json(
            {
                success: false,
                message: 'Internal server error. Please try again later.'
            },
            { status: 500 }
        )
    }
}