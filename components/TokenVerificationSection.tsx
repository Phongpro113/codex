"use client";

import { Button } from "@/components/ui/button";

type TokenVerificationSectionProps = {
  tokenJson: string;
  loading: boolean;
  onTokenChange: (value: string) => void;
  onBack: () => void;
  onContinue: () => void;
};

export default function TokenVerificationSection({
  tokenJson,
  loading,
  onTokenChange,
  onBack,
  onContinue,
}: TokenVerificationSectionProps) {
  return (
    <section className="mt-6 overflow-hidden rounded-2xl border border-[#e8ebff] bg-white shadow-sm">
      <div className="border-b border-[#e8ebff] px-5 py-6 md:px-8">
        <div className="relative grid grid-cols-4 gap-2">
          <span className="absolute top-4 left-0 h-[2px] w-full bg-[#ecf0ff]" />
          <span className="absolute top-4 left-0 h-[2px] w-[33.333%] bg-[#4257ff]" />

          <div className="relative z-10 flex flex-col items-center gap-2.5 text-center">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#4257ff] bg-[#4257ff] text-sm font-bold text-white">
              1
            </div>
            <span className="max-w-[90px] text-[10px] font-bold uppercase tracking-[0.18em] text-[#4257ff]">
              Validate CDK
            </span>
          </div>

          <div className="relative z-10 flex flex-col items-center gap-2.5 text-center">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#4257ff] bg-[#4257ff] text-sm font-bold text-white">
              2
            </div>
            <span className="max-w-[90px] text-[10px] font-bold uppercase tracking-[0.18em] text-[#4257ff]">
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
          <h2 className="text-3xl font-bold text-[#0b1a4f]">Token verification</h2>
          <p className="mt-1.5 max-w-xl text-[17px] leading-snug text-[#7881a9]">
            Paste the complete sessionToken JSON below. The system will automatically
            extract your account information.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {/* <Button
            type="button"
            size="lg"
            className="rounded-full bg-[#4257ff] py-4 text-lg font-bold text-white hover:bg-[#3649f2]"
            disabled={loading}
          >
            ⚡ Get automatically
          </Button> */}
          <Button
            type="button"
            size="lg"
            className="rounded-full bg-[#4257ff] py-4 text-lg font-bold text-white hover:bg-[#3649f2]"
            disabled={loading}
            onClick={() => window.open('https://chatgpt.com/api/auth/session', '_blank')}
          >
            ↗ Open session page
          </Button>
        </div>

        <p className="text-center text-[15px] font-semibold text-[#ff8b00]">
          ⚠ Auto-fill only works if you are logged into ChatGPT in this browser.
        </p>

        <div className="relative">
          <div className="absolute inset-x-0 top-1/2 h-px bg-[#ecf0ff]" />
          <p className="relative mx-auto w-fit bg-white px-3 text-[15px] text-[#7881a9]">
            or paste manually
          </p>
        </div>

        <textarea
          placeholder="Paste the complete session JSON here..."
          value={tokenJson}
          onChange={(e) => onTokenChange(e.target.value)}
          rows={6}
          disabled={loading}
          className="w-full resize-y rounded-xl border border-[#e8ebff] bg-[#f9faff] p-4 font-mono text-[16px] text-[#6a739a] placeholder:text-[#a1a8c9] focus:border-[#4257ff] focus:outline-none"
        />

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
            onClick={onContinue}
            disabled={loading}
            className="flex-1 rounded-full bg-[#c7ccff] py-4 text-lg font-bold text-white hover:bg-[#b8c0ff]"
          >
            Confirm and continue →
          </Button>
        </div>
      </div>
    </section>
  );
}
