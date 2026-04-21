'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import ValidateCdkSection from '@/components/ValidateCdkSection'
import TokenVerificationSection from '@/components/TokenVerificationSection'
import ConfirmRechargeSection from '@/components/ConfirmRechargeSection'
import CompletionSection from '@/components/CompletionSection'
import UsedKeyModal, { type UsedKeyInfo } from '@/components/UsedKeyModal'
import {
  emptyApiSDKResponse,
  emptyRechargeDetails,
  type ApiSDKResponse,
  type RechargeDetails,
  type SessionJsonShape,
} from '@/lib/recharge-types'
import { sessionJsonToRechargeDetails, tryParseSessionJson } from '@/lib/session-json'

export default function Home() {
  const [key, setKey] = useState('')
  const [loading, setLoading] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [stepStatus, setStepStatus] = useState(1)
  const [sessionToken, setSessionToken] = useState('')
  const [rechargeDetails, setRechargeDetails] = useState<RechargeDetails>(emptyRechargeDetails)
  const [apiSDKResponse, setApiSDKResponse] = useState<ApiSDKResponse>(emptyApiSDKResponse)
  const [usedKeyInfo, setUsedKeyInfo] = useState<UsedKeyInfo | null>(null)

  function saveRedeemLogAsync(parsed: SessionJsonShape) {
    void fetch('/api/redeem/logs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code: apiSDKResponse.code,
        status: apiSDKResponse.status,
        key_type: apiSDKResponse.key_type,
        plan: apiSDKResponse.plan,
        term: apiSDKResponse.term,
        service: apiSDKResponse.service,
        subscription_hours: apiSDKResponse.subscription_hours,
        activated_email: apiSDKResponse.activated_email,
        date_active: parsed.expires,
        json_data: parsed,
      }),
    }).catch((err) => console.error('save redeem log:', err))
  }

  const handleStep2Continue = () => {
    if (!sessionToken.trim()) {
      toast.error('Please paste session JSON first')
      return
    }

    const parsed = tryParseSessionJson(sessionToken)
    if (!parsed) {
      toast.error('format json invalid')
      return
    }

    setRechargeDetails(sessionJsonToRechargeDetails(parsed, apiSDKResponse, key))
    setStepStatus(3)
  }

  function resetActivationFlow() {
    setKey('')
    setSessionToken('')
    setError('')
    setSuccess('')
    setRechargeDetails(emptyRechargeDetails())
    setApiSDKResponse(emptyApiSDKResponse())
    setConfirmLoading(false)
    setStepStatus(1)
  }

  async function handleConfirmRecharge() {
    if (!rechargeDetails.keyValue.trim()) {
      toast.error('Missing CDK key')
      return
    }
    if (!sessionToken.trim()) {
      toast.error('Session JSON is missing — go back to step 2')
      return
    }
    setConfirmLoading(true)
    try {
      const response = await fetch('/api/redeem/comfirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: rechargeDetails.keyValue.trim(),
          session: sessionToken.trim(),
          recharge: rechargeDetails,
          sdk: apiSDKResponse,
        }),
      })
      const data = (await response.json()) as { message?: string }
      if (!response.ok) {
        toast.error(data.message ?? 'Confirm failed')
        return
      }
      toast.success('Recharge confirmed')
      const parsed = tryParseSessionJson(sessionToken)
      if (parsed) {
        saveRedeemLogAsync(parsed)
      }
      setStepStatus(4)
    } catch (err) {
      console.error('confirm recharge:', err)
      toast.error('Network error')
    } finally {
      setConfirmLoading(false)
    }
  }

  const handleRedeem = async () => {
    if (!key.trim()) {
      setError('Please enter your CDK key')
      return
    }

    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch('/api/redeem/keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: key.trim() }),
      })

      const data = await response.json()

      if (!response.ok && data.code && data.status) {
        // Key already exists in database
        const email = (data.jsonData as { user?: { email?: string } } | null)?.user?.email ?? data.activatedEmail ?? null
        setUsedKeyInfo({ code: data.code, email, dateActive: data.dateActive ?? null, status: data.status })
        toast.error('key is used')
        return
      }

      if (data.status === 'activated') {
        toast('Code is activated', {
          style: { background: 'rgb(64, 108, 30)', color: '#fff', border: 'none' },
        })
      }

      if (data.status === 'Available') {
        setStepStatus(2)
        setApiSDKResponse(data)
      }

      if (!response.ok) {
        throw new Error(data.message || 'Failed to redeem key')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex flex-1 justify-center bg-[#f5f7ff] px-4 py-10 md:px-6">
      <div className="w-full max-w-4xl">
        <header className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-[#0b1a4f]">
            Activate subscription
          </h1>
          <p className="mt-2 text-lg font-semibold text-[#7881a9]">
            Redeem your CDK key to activate a ChatGPT subscription.
          </p>
        </header>

        {stepStatus === 1 && (
          <ValidateCdkSection
            keyValue={key}
            loading={loading}
            error={error}
            success={success}
            onKeyChange={setKey}
            onRedeem={handleRedeem}
          />
        )}

        {stepStatus === 2 && (
          <TokenVerificationSection
            loading={loading}
            tokenJson={sessionToken}
            onTokenChange={setSessionToken}
            onBack={() => setStepStatus(1)}
            onContinue={handleStep2Continue}
          />
        )}

        {stepStatus === 3 && (
          <ConfirmRechargeSection
            keyValue={rechargeDetails.keyValue}
            plan={rechargeDetails.plan}
            duration={rechargeDetails.duration}
            service={rechargeDetails.service}
            accountName={rechargeDetails.accountName}
            accountEmail={rechargeDetails.accountEmail}
            currentPlan={rechargeDetails.currentPlan}
            tokenExpires={rechargeDetails.tokenExpires}
            loading={confirmLoading}
            onBack={() => setStepStatus(2)}
            onConfirm={handleConfirmRecharge}
          />
        )}

        {stepStatus === 4 && (
          <CompletionSection
            accountEmail={rechargeDetails.accountEmail}
            planLine={
              [rechargeDetails.plan, rechargeDetails.duration].filter(Boolean).join(' · ') ||
              rechargeDetails.plan
            }
            keyValue={rechargeDetails.keyValue}
            onActivateAnother={resetActivationFlow}
          />
        )}
      </div>

      {usedKeyInfo && (
        <UsedKeyModal info={usedKeyInfo} onClose={() => setUsedKeyInfo(null)} />
      )}
    </main>
  )
}
