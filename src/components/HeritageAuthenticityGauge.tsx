import React, { useState } from 'react';
import { HeritageAuthenticityResult } from '../data/heritageGauge';
import { ShieldCheck, ShieldAlert, Sparkles, ChevronDown, ChevronUp, Wrench, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface HeritageAuthenticityGaugeProps {
  authenticity: HeritageAuthenticityResult;
  onRestoreCompliant: () => void;
  compact?: boolean;
}

export const HeritageAuthenticityGauge: React.FC<HeritageAuthenticityGaugeProps> = ({
  authenticity,
  onRestoreCompliant,
  compact = false,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const { score, level, statusText, badge, barColor, isPerfect, penalties } = authenticity;

  return (
    <div
      className={`rounded-2xl border transition-all duration-300 shadow-xs overflow-hidden ${
        isPerfect
          ? 'bg-gradient-to-r from-emerald-50/80 via-white to-emerald-50/80 border-emerald-200'
          : level === 'warning'
          ? 'bg-gradient-to-r from-yellow-50/80 via-white to-yellow-50/80 border-yellow-300'
          : 'bg-gradient-to-r from-rose-50/90 via-white to-rose-50/90 border-rose-400 ring-2 ring-rose-400/20'
      } ${compact ? 'p-2.5' : 'p-3.5'}`}
    >
      {/* Top Header of Gauge */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div
            className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 border ${
              isPerfect
                ? 'bg-emerald-600 text-white border-emerald-500 shadow-xs'
                : level === 'warning'
                ? 'bg-yellow-500 text-white border-yellow-400 shadow-xs'
                : 'bg-rose-600 text-white border-rose-500 shadow-xs animate-bounce'
            }`}
          >
            {isPerfect ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-100" />
            ) : (
              <ShieldAlert className="w-4 h-4 text-white" />
            )}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-serif font-bold text-[#2C241D] whitespace-nowrap">
                Thước Đo Chuẩn Mực Di Sản:
              </span>
              <span
                className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border shadow-2xs whitespace-nowrap ${
                  isPerfect
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    : level === 'warning'
                    ? 'bg-yellow-100 text-yellow-900 border-yellow-300'
                    : 'bg-rose-100 text-rose-900 border-rose-300 animate-pulse'
                }`}
              >
                {badge}
              </span>
            </div>

            <p className="text-[11px] text-[#5C5346] truncate font-medium mt-0.5">
              {statusText}
            </p>
          </div>
        </div>

        {/* Score & One-Click Fix Button */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="text-right">
            <span
              className={`text-base font-serif font-black ${
                isPerfect
                  ? 'text-emerald-700'
                  : level === 'warning'
                  ? 'text-yellow-700'
                  : 'text-rose-700 font-extrabold'
              }`}
            >
              {score}%
            </span>
          </div>

          {!isPerfect && (
            <button
              onClick={onRestoreCompliant}
              className="px-2.5 py-1 text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-[#1B3B6F] hover:brightness-110 active:scale-95 rounded-xl shadow-xs transition-all flex items-center gap-1 shrink-0 border border-emerald-400/40 cursor-pointer animate-in zoom-in-95 duration-200"
              title="Khôi phục mọi chi tiết về 100% chuẩn mực"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
              <span className="hidden sm:inline">💡 Khắc phục về chuẩn mực</span>
              <span className="sm:hidden">Sửa nhanh</span>
            </button>
          )}

          {penalties.length > 0 && (
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="p-1 text-[#7A6E5F] hover:text-[#2C241D] hover:bg-black/5 rounded-lg transition-colors cursor-pointer"
              title={showDetails ? 'Thu gọn chi tiết' : 'Xem chi tiết lỗi bị trừ điểm'}
            >
              {showDetails ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-[#E5DFD5] h-2 rounded-full overflow-hidden mt-2 relative">
        <div
          className={`h-full transition-all duration-500 rounded-full ${barColor}`}
          style={{ width: `${score}%` }}
        />
      </div>

      {/* Expandable Breakdown of Deductions */}
      {showDetails && penalties.length > 0 && (
        <div className="mt-2.5 pt-2 border-t border-black/5 space-y-1.5 animate-in fade-in duration-200">
          <span className="text-[10px] uppercase font-bold text-[#7A6E5F] block">
            Chi tiết các điểm bị trừ quy chuẩn ({penalties.length} lỗi):
          </span>
          <div className="space-y-1">
            {penalties.map((item) => (
              <div
                key={item.id}
                className="text-[11px] p-1.5 rounded-lg bg-white/90 border border-rose-200 flex items-start justify-between gap-2"
              >
                <div className="min-w-0">
                  <strong className="text-rose-900 block font-semibold">{item.label}</strong>
                  <p className="text-[10.5px] text-[#5C5346] leading-relaxed line-clamp-2">
                    {item.reason}
                  </p>
                </div>
                <span className="text-rose-700 font-bold font-mono shrink-0 px-1.5 py-0.5 rounded-md bg-rose-100/70 border border-rose-200">
                  -{item.penalty}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
