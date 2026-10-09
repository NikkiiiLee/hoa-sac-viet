import React from 'react';
import { AiStylistConsultationResult } from '../services/aiStylistBrain';
import { Sparkles, Download, RotateCcw, X, Hash, Award, CheckCircle2 } from 'lucide-react';

interface GeminiStylistChatBubbleProps {
  consultation: AiStylistConsultationResult;
  onOpenLookbook: () => void;
  onTryAnotherVariant: () => void;
  onClose: () => void;
}

export const GeminiStylistChatBubble: React.FC<GeminiStylistChatBubbleProps> = ({
  consultation,
  onOpenLookbook,
  onTryAnotherVariant,
  onClose,
}) => {
  const { greeting, reasoning, hashtags, occasionName, elementRelation, paletteDescription } =
    consultation;

  return (
    <div className="w-full relative z-20 animate-in slide-in-from-top-4 fade-in duration-300">
      <div className="p-0.5 rounded-3xl bg-gradient-to-r from-[#D4AF37] via-[#7C3AED]/50 to-[#D4AF37] shadow-xl ring-2 ring-[#D4AF37]/20">
        <div className="bg-gradient-to-br from-[#FFFDF9]/98 via-white/95 to-[#FAF5FF]/95 backdrop-blur-md rounded-[22px] p-4 sm:p-5 space-y-3.5">
          {/* Top Bar of Chat Bubble */}
          <div className="flex items-start justify-between gap-3 border-b border-[#EDE7DC] pb-3">
            <div className="flex items-center gap-2.5 min-w-0">
              {/* Gemini Stylist Avatar Badge */}
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#1B3B6F] via-[#7C3AED] to-[#D4AF37] text-white flex items-center justify-center shadow-md">
                  <Sparkles className="w-5 h-5 text-amber-200" />
                </div>
                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-serif font-black tracking-wide text-[#7C3AED] uppercase flex items-center gap-1">
                    ✦ Stylist Gemini Di Sản
                  </span>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>100% Chuẩn Di Sản</span>
                  </span>
                </div>
                <p className="text-[11px] text-[#7A6E5F] truncate mt-0.5">
                  Phân tích ngữ cảnh: <strong className="text-[#2C241D]">{occasionName}</strong>
                </p>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 text-[#7A6E5F] hover:text-[#B83227] hover:bg-[#FAF7F2] rounded-xl transition-colors cursor-pointer shrink-0"
              title="Đóng hộp thoại tư vấn"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Core Response Body */}
          <div className="space-y-2">
            <h4 className="text-sm font-serif font-bold text-[#1B3B6F] leading-snug">
              {greeting}
            </h4>
            <p className="text-xs sm:text-[13px] text-[#3D332A] leading-relaxed font-normal">
              {reasoning}
            </p>
          </div>

          {/* Harmony & Five Elements Info Strip */}
          <div className="flex items-center justify-between gap-2 p-2.5 bg-amber-500/10 rounded-xl border border-amber-300/60 text-xs flex-wrap">
            <div className="flex items-center gap-1.5 text-amber-900 font-semibold">
              <Award className="w-4 h-4 text-amber-600" />
              <span>Hòa sắc Ngũ Hành: {elementRelation}</span>
            </div>
            <div className="text-[11px] text-[#7A6E5F]">
              Cặp màu: <strong className="text-[#2C241D]">{paletteDescription}</strong>
            </div>
          </div>

          {/* Cultural Hashtags */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {hashtags.map((tag, idx) => (
              <span
                key={idx}
                className="text-[11px] font-semibold text-[#7C3AED] bg-[#7C3AED]/10 px-2.5 py-0.5 rounded-full border border-[#7C3AED]/20 flex items-center gap-1"
              >
                <Hash className="w-3 h-3 opacity-60" />
                <span>{tag.replace('#', '')}</span>
              </span>
            ))}
          </div>

          {/* Action Buttons Row */}
          <div className="pt-2 border-t border-[#EDE7DC] flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              {/* Export Lookbook Button */}
              <button
                onClick={onOpenLookbook}
                className="px-3.5 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-[#1B3B6F] hover:brightness-110 active:scale-95 rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer border border-emerald-400/40"
              >
                <Download className="w-3.5 h-3.5 text-emerald-200" />
                <span>Xuất Thẻ Lookbook Ngay</span>
              </button>

              {/* Try Another Variant Button */}
              <button
                onClick={onTryAnotherVariant}
                className="px-3 py-1.5 text-xs font-semibold text-[#1B3B6F] bg-white hover:bg-[#FAF7F2] rounded-xl border border-[#D6CEBE] shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                title="Đổi phương án phối màu và phụ kiện khác cho cùng bối cảnh"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#1B3B6F]" />
                <span>Thử Phương Án Khác</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="text-xs text-[#7A6E5F] hover:text-[#2C241D] font-medium cursor-pointer"
            >
              Đóng Hộp Thoại
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
