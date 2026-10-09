import React from 'react';
import {
  X,
  Sparkles,
  Rocket,
  Lightbulb,
  CheckCircle2,
  Compass,
} from 'lucide-react';

interface QuickGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartStudio: () => void;
  onStartGuidedTour?: () => void;
}

export const QuickGuideModal: React.FC<QuickGuideModalProps> = ({
  isOpen,
  onClose,
  onStartStudio,
  onStartGuidedTour,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-gradient-to-b from-[#FFFDF9] via-[#FAF7F2] to-[#F4EFE6] rounded-3xl border-2 border-[#D4AF37] shadow-2xl overflow-hidden ring-4 ring-[#D4AF37]/20 animate-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto">
        {/* Top Ornamental Gold Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#B83227] via-[#D4AF37] to-[#1B3B6F]" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-[#7A6E5F] hover:text-[#2C241D] hover:bg-black/5 rounded-xl transition-colors cursor-pointer"
          title="Đóng hướng dẫn"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/90 border border-[#D4AF37]/60 text-[#8A5A19] text-[11px] font-bold uppercase tracking-wider">
              <Lightbulb className="w-3.5 h-3.5 text-[#B83227]" />
              <span>Cẩm Nang Nhập Môn 30 Giây</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#2C241D] leading-snug">
              3 Bước Chạm Di Sản – Tự Tay Phối Cổ Phục
            </h2>
            <p className="text-xs sm:text-sm text-[#5C5346] leading-relaxed">
              Khám phá cách trở thành Stylist cổ phục hiện đại cùng Họa Sắc Việt chỉ trong 30 giây.
            </p>
          </div>

          {/* 3 Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {/* Step 1 */}
            <div className="p-5 bg-white/95 rounded-2xl border-2 border-[#E3DAC9] hover:border-[#D4AF37] shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-3 relative overflow-hidden">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="w-10 h-10 rounded-2xl bg-[#B83227]/10 border border-[#B83227]/20 flex items-center justify-center text-xl">
                    👘
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#FAF7F2] border border-[#D6CEBE] text-[10.5px] font-bold text-[#B83227] uppercase tracking-wider">
                    Bước 01 / 03
                  </span>
                </div>
                <h3 className="text-base font-serif font-bold text-[#2C241D] leading-snug">
                  Bước 1: Chọn Dáng Áo & Bối Cảnh
                </h3>
                <p className="text-xs text-[#5C5346] leading-relaxed">
                  <strong className="text-[#2C241D]">Bí quyết:</strong> Chọn dịp xuất hiện (Kỷ yếu tốt nghiệp, Dạo phố cafe, Trẩy hội Tết) và dáng áo yêu thích (Áo tấc, Áo chẽn, Áo dài, Giao lĩnh).
                </p>
              </div>
              <div className="pt-2 border-t border-[#F2ECE1] flex items-center gap-1.5 text-[11px] font-semibold text-[#1B3B6F]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Hỗ trợ chọn mẫu 1-Chạm siêu tốc</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-5 bg-white/95 rounded-2xl border-2 border-[#E3DAC9] hover:border-[#D4AF37] shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-3 relative overflow-hidden">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="w-10 h-10 rounded-2xl bg-[#1B3B6F]/10 border border-[#1B3B6F]/20 flex items-center justify-center text-xl">
                    👟
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#FAF7F2] border border-[#D6CEBE] text-[10.5px] font-bold text-[#1B3B6F] uppercase tracking-wider">
                    Bước 02 / 03
                  </span>
                </div>
                <h3 className="text-base font-serif font-bold text-[#2C241D] leading-snug">
                  Bước 2: Tự Do Remix Phụ Kiện & Hòa Sắc
                </h3>
                <p className="text-xs text-[#5C5346] leading-relaxed">
                  <strong className="text-[#2C241D]">Bí quyết:</strong> Kết hợp cùng Sneaker retro, Áo khoác blazer hoặc bấm nút{' '}
                  <span className="px-1.5 py-0.5 rounded bg-purple-100 text-purple-900 font-bold text-[10.5px]">
                    ✨ AI Auto-Match
                  </span>{' '}
                  để Gemini tự động cân bằng Ngũ Hành (Mộc sinh Hỏa, Kim sinh Thủy).
                </p>
              </div>
              <div className="pt-2 border-t border-[#F2ECE1] flex items-center gap-1.5 text-[11px] font-semibold text-[#1B3B6F]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Tùy chỉnh chiều cao & cân nặng thực tế</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-5 bg-white/95 rounded-2xl border-2 border-[#E3DAC9] hover:border-[#D4AF37] shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-3 relative overflow-hidden">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-xl">
                    📜
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#FAF7F2] border border-[#D6CEBE] text-[10.5px] font-bold text-[#8A5A19] uppercase tracking-wider">
                    Bước 03 / 03
                  </span>
                </div>
                <h3 className="text-base font-serif font-bold text-[#2C241D] leading-snug">
                  Bước 3: Tra Cứu Ý Nghĩa & Xuất Lookbook
                </h3>
                <p className="text-xs text-[#5C5346] leading-relaxed">
                  <strong className="text-[#2C241D]">Bí quyết:</strong> Rê chuột vào cúc áo để học đạo lý Ngũ thường, chú ý thanh Cảnh Báo Di Sản (tránh lỗi cấm kỵ), và bấm{' '}
                  <span className="px-1.5 py-0.5 rounded bg-red-100 text-[#B83227] font-bold text-[10.5px]">
                    Xuất Lookbook
                  </span>{' '}
                  tải ảnh thẻ Polaroid 9:16 về máy!
                </p>
              </div>
              <div className="pt-2 border-t border-[#F2ECE1] flex items-center gap-1.5 text-[11px] font-semibold text-[#1B3B6F]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Tạo Album QR chia sẻ nhóm kỷ yếu</span>
              </div>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="pt-2 border-t border-[#E3DAC9] flex flex-col sm:flex-row items-center justify-between gap-3">
            {onStartGuidedTour ? (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onStartGuidedTour();
                }}
                className="w-full sm:w-auto px-4 py-2.5 text-xs font-bold text-[#1B3B6F] bg-white hover:bg-[#FAF7F2] border border-[#D6CEBE] rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-[#B83227]" />
                <span>🧭 Xem Tour Giới Thiệu Từng Bước (4 Điểm)</span>
              </button>
            ) : (
              <div />
            )}

            <button
              type="button"
              onClick={() => {
                onClose();
                onStartStudio();
              }}
              className="w-full sm:w-auto px-7 py-3 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#B83227] via-[#99261c] to-[#B83227] hover:brightness-110 rounded-2xl shadow-lg shadow-[#B83227]/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <Rocket className="w-4 h-4 text-amber-300" />
              <span>🚀 Bắt Đầu Phối Đồ Ngay</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
