import React from 'react';
import { RuleViolation, OutfitConfig } from '../types/costume';
import {
  AlertTriangle,
  Check,
  ShieldAlert,
  Sparkles,
  ShieldCheck,
  RotateCcw,
  BookOpen,
  ArrowRight,
} from 'lucide-react';

interface HeritageWarningBannerProps {
  violations: RuleViolation[];
  outfit: OutfitConfig;
  onFixViolation: (violationId: string) => void;
  onRestoreCompliant?: () => void;
}

export const HeritageWarningBanner: React.FC<HeritageWarningBannerProps> = ({
  violations,
  outfit,
  onFixViolation,
  onRestoreCompliant,
}) => {
  if (violations.length === 0) {
    return (
      <div className="p-3 bg-emerald-50/90 border border-emerald-300 rounded-2xl flex items-center justify-between text-xs text-emerald-900 transition-all shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Check className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="font-bold text-emerald-950 flex items-center gap-1.5">
              <span>Kiểm Duyệt Di Sản: 100% Chuẩn Mực Văn Hóa</span>
              <span className="text-[10px] bg-emerald-200/80 text-emerald-900 px-2 py-0.5 rounded-full font-semibold">
                Đại Cát
              </span>
            </span>
            <span className="text-emerald-800 text-[11px] block sm:inline sm:ml-2">
              Bộ phối tuân thủ trọn vẹn quy cách cổ chế, ngũ hành tương sinh và tinh thần thời đại.
            </span>
          </div>
        </div>
        <span className="text-[11px] font-bold text-emerald-800 bg-white/90 border border-emerald-200 px-2.5 py-1 rounded-xl hidden md:inline shadow-xs">
          🛡️ Bảo Tồn Chuẩn Xác
        </span>
      </div>
    );
  }

  const criticalCount = violations.filter((v) => v.severity === 'critical').length;

  return (
    <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
      {/* Header Alert summary with Glowing Border and Rescue Action */}
      <div
        className={`p-4 rounded-2xl border-2 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-md transition-all ${
          criticalCount > 0
            ? 'bg-gradient-to-r from-red-50 via-[#FAF7F2] to-red-50/80 border-[#B83227] ring-2 ring-[#B83227]/20 animate-pulse-alert'
            : 'bg-amber-50/90 border-amber-400 text-amber-950'
        }`}
      >
        <div className="flex items-start gap-3">
          <div
            className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 mt-0.5 shadow-sm ${
              criticalCount > 0 ? 'bg-[#B83227] text-white animate-bounce' : 'bg-amber-600 text-white'
            }`}
          >
            {criticalCount > 0 ? (
              <ShieldAlert className="w-5 h-5" />
            ) : (
              <AlertTriangle className="w-5 h-5" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-sm font-bold font-serif text-[#2C241D] flex items-center gap-2">
                Bộ Kiểm Duyệt Di Sản Kích Hoạt
              </h4>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#B83227] text-white tracking-wide uppercase">
                {violations.length} Sai Lệch Cần Khắc Phục
              </span>
            </div>
            <p className="text-xs text-[#5C5346] mt-1 leading-relaxed">
              Phát hiện yếu tố cấm kỵ hoặc đi ngược lại quy chuẩn nghi lễ cổ nhân. Dưới đây là căn cứ văn hóa và cách khắc phục ngay lập tức:
            </p>
          </div>
        </div>

        {/* Big Rescue Button */}
        {onRestoreCompliant && (
          <button
            onClick={onRestoreCompliant}
            className="w-full md:w-auto px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-[#1B3B6F] hover:brightness-110 active:scale-95 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 shrink-0 transition-all border border-emerald-400/40 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-200" />
            <span>🛡️ Sửa Sai & Hoàn Nguyên Chuẩn Mực</span>
          </button>
        )}
      </div>

      {/* Violation Cards with Rich Historical Context and Quick Fix Actions */}
      <div className="grid grid-cols-1 gap-2.5">
        {violations.map((violation) => (
          <div
            key={violation.id}
            className="p-3.5 bg-white rounded-2xl border-2 border-red-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs hover:border-red-300 transition-colors"
          >
            <div className="space-y-1.5 max-w-3xl">
              <div className="flex items-center gap-2">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    violation.severity === 'critical' ? 'bg-[#B83227] animate-ping' : 'bg-amber-500'
                  }`}
                />
                <span className="font-bold text-[#B83227] text-sm font-serif">
                  {violation.title}
                </span>
              </div>
              <p className="text-[#3A3027] font-medium leading-relaxed">
                {violation.description}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 pt-2 border-t border-[#EDE7DC]">
                <div className="p-2 bg-[#FAF7F2] rounded-xl border border-[#EDE7DC]">
                  <strong className="text-[11px] text-[#1B3B6F] flex items-center gap-1 mb-0.5">
                    <BookOpen className="w-3 h-3" /> Nguồn cội & Vì sao tiền nhân cấm:
                  </strong>
                  <p className="text-[11px] text-[#5C5346] leading-relaxed">
                    {violation.historicalContext}
                  </p>
                </div>

                <div className="p-2 bg-emerald-50/60 rounded-xl border border-emerald-200/80">
                  <strong className="text-[11px] text-emerald-800 flex items-center gap-1 mb-0.5">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" /> Cách sửa đúng chuẩn:
                  </strong>
                  <p className="text-[11px] text-emerald-900 leading-relaxed">
                    {violation.solution}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 shrink-0 self-end md:self-center">
              <button
                onClick={() => onFixViolation(violation.id)}
                className="px-3.5 py-2 text-xs font-bold text-white bg-[#1B3B6F] hover:bg-[#152e57] active:scale-95 transition-all rounded-xl shrink-0 flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Sửa Lỗi Này</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

