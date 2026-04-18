"use client";

import { Button } from "@/components/ui/button";

function SpinnerIcon({ className }: { className?: string }) {
  return (
    <svg
      className={`animate-spin ${className ?? ""}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

type ConfirmRechargeSectionProps = {
  keyValue: string;
  plan: string;
  duration: string;
  service: string;
  accountName: string;
  accountEmail: string;
  currentPlan: string;
  tokenExpires: string;
  loading: boolean;
  onBack: () => void;
  onConfirm: () => void;
};

export default function ConfirmRechargeSection({
  keyValue,
  plan,
  duration,
  service,
  accountName,
  accountEmail,
  currentPlan,
  tokenExpires,
  loading,
  onBack,
  onConfirm,
}: ConfirmRechargeSectionProps) {
  return (
    <section className="relative mt-6 overflow-hidden rounded-2xl border border-[#e8ebff] bg-white shadow-sm">
      {loading && (
        <div
          className="absolute inset-0 z-20 flex items-center justify-center rounded-2xl bg-white/75 backdrop-blur-[2px]"
          aria-busy="true"
          aria-live="polite"
        >
          <div className="flex flex-col items-center gap-3 px-4">
            <SpinnerIcon className="h-10 w-10 text-[#4257ff]" />
            <span className="text-sm font-semibold text-[#4257ff]">Processing...</span>
          </div>
        </div>
      )}

      <div className="border-b border-[#e8ebff] px-5 py-6 md:px-8">
        <div className="relative grid grid-cols-4 gap-2">
          <span className="absolute top-4 left-0 h-[2px] w-full bg-[#ecf0ff]" />
          <span className="absolute top-4 left-0 h-[2px] w-[66.666%] bg-[#4257ff]" />

          <div className="relative z-10 flex flex-col items-center gap-2.5 text-center">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#4257ff] bg-[#4257ff] text-sm font-bold text-white">
              ✓
            </div>
            <span className="max-w-[90px] text-[10px] font-bold uppercase tracking-[0.18em] text-[#4257ff]">
              Validate CDK
            </span>
          </div>

          <div className="relative z-10 flex flex-col items-center gap-2.5 text-center">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#4257ff] bg-[#4257ff] text-sm font-bold text-white">
              ✓
            </div>
            <span className="max-w-[90px] text-[10px] font-bold uppercase tracking-[0.18em] text-[#4257ff]">
              Token verification
            </span>
          </div>

          <div className="relative z-10 flex flex-col items-center gap-2.5 text-center">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#4257ff] bg-[#4257ff] text-sm font-bold text-white">
              3
            </div>
            <span className="max-w-[90px] text-[10px] font-bold uppercase tracking-[0.18em] text-[#4257ff]">
              Confirm recharge
            </span>
          </div>

          <div className="relative z-10 flex flex-col items-center gap-2.5 text-center">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#ecf0ff] bg-[#f3f5ff] text-sm font-bold text-[#69739f]">
              4
            </div>
            <span className="max-w-[90px] text-[10px] font-bold uppercase tracking-[0.18em] text-[#a1a8c9]">
              Complete
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-5 p-5 md:p-8">
        <div>
          <h2 className="text-3xl font-bold text-[#0b1a4f]">Confirm recharge</h2>
          <p className="mt-1.5 text-[17px] text-[#7881a9]">
            Review the details below before proceeding.
          </p>
        </div>

        <div className="rounded-xl border border-[#e8ebff] bg-[#f9faff] p-5">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#7881a9]">Key</h3>
          <div className="mt-4 space-y-3 text-[#0b1a4f]">
            <div className="flex items-center justify-between border-b border-[#e8ebff] pb-2">
              <span className="font-semibold text-[#7881a9]">Code</span>
              <span className="font-semibold">{keyValue || "-"}</span>
            </div>
            <div className="flex items-center justify-between border-b border-[#e8ebff] pb-2">
              <span className="font-semibold text-[#7881a9]">Plan</span>
              <span className="font-semibold">{plan}</span>
            </div>
            <div className="flex items-center justify-between border-b border-[#e8ebff] pb-2">
              <span className="font-semibold text-[#7881a9]">Duration</span>
              <span className="font-semibold">{duration}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#7881a9]">Service</span>
              <span className="font-semibold">{service}</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-[#e8ebff] bg-[#f9faff] p-5">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#7881a9]">Account</h3>
          <div className="mt-4 space-y-3 text-[#0b1a4f]">
            <div className="flex items-center justify-between border-b border-[#e8ebff] pb-2">
              <span className="font-semibold text-[#7881a9]">Name</span>
              <span className="font-semibold">{accountName}</span>
            </div>
            <div className="flex items-center justify-between border-b border-[#e8ebff] pb-2">
              <span className="font-semibold text-[#7881a9]">Email</span>
              <span className="font-semibold">{accountEmail}</span>
            </div>
            <div className="flex items-center justify-between border-b border-[#e8ebff] pb-2">
              <span className="font-semibold text-[#7881a9]">Current plan</span>
              <span className="font-semibold">{currentPlan}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#7881a9]">Token expires</span>
              <span className="font-semibold">{tokenExpires}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={onBack}
            disabled={loading}
            className="rounded-full border-[#e8ebff] px-7 text-base font-semibold text-[#0b1a4f] hover:bg-[#f5f7ff]"
          >
            Back
          </Button>
          <Button
            type="button"
            size="lg"
            onClick={onConfirm}
            disabled={loading}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#4257ff] py-4 text-lg font-bold text-white hover:bg-[#3649f2] disabled:opacity-90"
          >
            {loading ? (
              <>
                <SpinnerIcon className="h-5 w-5 text-white" />
                <span>Confirming…</span>
              </>
            ) : (
              <>Confirm recharge →</>
            )}
          </Button>
        </div>
      </div>
    </section>
  );
}
