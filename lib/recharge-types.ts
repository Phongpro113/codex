export type RechargeDetails = {
  keyValue: string
  plan: string
  duration: string
  service: string
  accountName: string
  accountEmail: string
  currentPlan: string
  tokenExpires: string
}

/** Response from redeem/keys API (SDK). */
export interface ApiSDKResponse {
  code: string
  status: string
  key_type: string
  plan: string
  term: string
  service: string
  subscription_hours: number
  activated_email: string | null
}

/** Shape expected from ChatGPT /api/auth/session JSON (Step 2 paste). */
export type SessionJsonShape = {
  WARNING_BANNER: string
  user: {
    id: string
    name: string
    email: string
    idp?: string
    iat?: number
    mfa?: boolean
    image?: string
    picture?: string
  }
  expires: string
  account: {
    id: string
    planType: string
    structure?: string
    [key: string]: unknown
  }
  accessToken: string
  authProvider: string
  sessionToken: string
  rumViewTags: {
    light_account: { fetched: boolean }
  }
}

export const emptyRechargeDetails = (): RechargeDetails => ({
  keyValue: '',
  plan: '',
  duration: '',
  service: '',
  accountName: '',
  accountEmail: '',
  currentPlan: '',
  tokenExpires: '',
})

export const emptyApiSDKResponse = (): ApiSDKResponse => ({
  code: '',
  status: '',
  key_type: '',
  plan: '',
  term: '',
  service: '',
  subscription_hours: 0,
  activated_email: null,
})
