"use client";

import { Button } from "@/components/ui/button";

function maskCdkKey(key: string): string {
  const t = key.trim();
  if (!t) return "—";
  if (t.length <= 8) return "****";
  return `****${t.slice(-8)}`;
}

type CompletionSectionProps = {
  accountEmail: string;
  planLine: string;
  keyValue: string;
  onActivateAnother: () => void;
};

export default function CompletionSection({
  accountEmail,
  planLine,
  keyValue,
  onActivateAnother,
}: CompletionSectionProps) {
  return (
    <section className="mt-6 overflow-hidden rounded-2xl border border-[#e8ebff] bg-white shadow-sm">
      <div className="border-b border-[#e8ebff] px-5 py-6 md:px-8">
        <div className="relative grid grid-cols-4 gap-2">
          <span className="absolute top-4 left-0 h-[2px] w-full bg-[#ecf0ff]" />
          <span className="absolute top-4 left-0 h-[2px] w-full bg-[#4257ff]" />

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
              ✓
            </div>
            <span className="max-w-[90px] text-[10px] font-bold uppercase tracking-[0.18em] text-[#4257ff]">
              Confirm recharge
            </span>
          </div>

          <div className="relative z-10 flex flex-col items-center gap-2.5 text-center">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#4257ff] bg-[#4257ff] text-sm font-bold text-white">
              4
            </div>
            <span className="max-w-[90px] text-[10px] font-bold uppercase tracking-[0.18em] text-[#4257ff]">
              Complete
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-6 p-5 md:p-8">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#86d4a6] bg-[#e8f8ec]">
            <svg
              className="h-9 w-9 text-[#22a060]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
              aria-hidden
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="mt-2 text-2xl font-bold text-[#0b1a4f]">Recharge successful</h2>
          <p className="mt-1 text-[17px] text-[#7881a9]">
            Your subscription has been activated.
          </p>
        </div>

        <div className="rounded-xl border border-[#e8ebff] bg-[#f9faff] p-5">
          <div className="space-y-0 text-[#0b1a4f]">
            <div className="flex items-center justify-between border-b border-[#e8ebff] py-3 first:pt-0">
              <span className="font-semibold text-[#7881a9]">Account</span>
              <span className="max-w-[60%] truncate text-right font-semibold text-[#0b1a4f]">
                {accountEmail || "—"}
              </span>
            </div>
            <div className="flex items-center justify-between border-b border-[#e8ebff] py-3">
              <span className="font-semibold text-[#7881a9]">Plan</span>
              <span className="font-semibold">{planLine || "—"}</span>
            </div>
            <div className="flex items-center justify-between py-3 last:pb-0">
              <span className="font-semibold text-[#7881a9]">CDK key</span>
              <span className="font-mono font-semibold tracking-wide">
                {maskCdkKey(keyValue)}
              </span>
            </div>
          </div>
        </div>

        <Button
          type="button"
          size="lg"
          onClick={onActivateAnother}
          className="w-full rounded-full bg-[#4257ff] py-4 text-lg font-bold text-white hover:bg-[#3649f2]"
        >
          Activate another key
        </Button>
      </div>
    </section>
  );
}
