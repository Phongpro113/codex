"use client";

import { Button } from "@/components/ui/button";

type ValidateCdkSectionProps = {
  keyValue: string;
  loading: boolean;
  error: string;
  success: string;
  onKeyChange: (value: string) => void;
  onRedeem: () => void;
};

export default function ValidateCdkSection({
  keyValue,
  loading,
  error,
  success,
  onKeyChange,
  onRedeem,
}: ValidateCdkSectionProps) {
  return (
    <section className="mt-6 overflow-hidden rounded-2xl border border-[#e8ebff] bg-white shadow-sm">
      <div className="border-b border-[#e8ebff] px-5 py-6 md:px-8">
        <div className="relative grid grid-cols-4 gap-2">
          <span className="absolute top-4 left-0 h-[2px] w-full bg-[#ecf0ff]" />
          <div className="relative z-10 flex flex-col items-center gap-2.5 text-center">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#4257ff] bg-[#4257ff] text-sm font-bold text-white">
              1
            </div>
            <span className="max-w-[90px] text-[10px] font-bold uppercase tracking-[0.18em] text-[#4257ff]">
              Validate CDK
            </span>
          </div>
          <div className="relative z-10 flex flex-col items-center gap-2.5 text-center">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#ecf0ff] bg-[#f3f5ff] text-sm font-bold text-[#69739f]">
              2
            </div>
            <span className="max-w-[90px] text-[10px] font-bold uppercase tracking-[0.18em] text-[#a1a8c9]">
              Token verification
            </span>
          </div>
          <div className="relative z-10 flex flex-col items-center gap-2.5 text-center">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#ecf0ff] bg-[#f3f5ff] text-sm font-bold text-[#69739f]">
              3
            </div>
            <span className="max-w-[90px] text-[10px] font-bold uppercase tracking-[0.18em] text-[#a1a8c9]">
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
          <h2 className="text-3xl font-bold text-[#0b1a4f]">Verify card key</h2>
          <p className="mt-1.5 text-[17px] text-[#7881a9]">
            Enter your CDK key to begin the activation process.
          </p>
        </div>

        <div>
          <label className="block px-1 text-xs font-bold uppercase tracking-[0.2em] text-[#7881a9]">
            Subscription key
          </label>
          <input
            type="text"
            placeholder="e.g. 3200222F249E4CB6981FF0C362E47AC7"
            value={keyValue}
            onChange={(e) => onKeyChange(e.target.value)}
            className="mt-3 w-full border-b-2 border-[#eaedff] bg-transparent px-1 pb-2 font-mono text-lg tracking-wider text-[#6a739a] placeholder:text-[#c2c7df] focus:border-[#4257ff] focus:outline-none"
            disabled={loading}
          />
        </div>

        {error && <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>}

        {success && (
          <div className="rounded-lg bg-green-50 p-3 text-sm text-green-600">{success}</div>
        )}

        <Button size="lg" className="w-full" onClick={onRedeem} disabled={loading}>
          {loading ? "Processing..." : "Start verification"}
        </Button>

        <div className="flex items-start gap-3 text-[#7881a9]">
          <span className="mt-0.5 text-base text-[#4a5cff]">i</span>
          <p className="text-base">
            Keys are single-use only. Please ensure you are logged into the correct
            account before activation.
          </p>
        </div>
      </div>
    </section>
  );
}
