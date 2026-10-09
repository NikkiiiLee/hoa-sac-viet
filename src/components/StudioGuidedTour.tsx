import React from 'react';
import {
  X,
  ArrowRight,
  ArrowLeft,
  Check,
  Compass,
  Sparkles,
} from 'lucide-react';

interface StudioGuidedTourProps {
  tourStep: number | null; // 1 | 2 | 3 | 4 | null
  onNext: () => void;
  onPrev: () => void;
  onSkip: () => void;
}

const TOUR_STEPS = [
  {
    step: 1,
    badge: 'Điểm 1: Thanh Sự Kiện & AI Prompt Bar',
    title: '1. Bắt đầu tại đây: Chọn sự kiện, thời tiết hoặc gõ câu lệnh tự nhiên cho Gemini Stylist.',
    detail:
      'Bạn có thể nhập câu lệnh tiếng Việt tự nhiên (VD: "Phối đồ chụp kỷ yếu Dinh Độc Lập") hoặc dùng micro giọng nói để AI tự lên đồ.',
  },
  {
    step: 2,
    badge: 'Điểm 2: Bảng Điều Khiển & Lưới Phụ Kiện Cột Phải',
    title: '2. Tự do sáng tạo: Chọn loại cổ phục, màu sắc ngũ hành và các phụ kiện Gen Z thời thượng.',
    detail:
      'Bấm chọn ngay Cụm Gợi Ý Mẫu 1-Chạm (Kỷ Yếu, Dạo Phố, Đi Tết) hoặc tùy chỉnh từng sắc màu Ngũ Hành, Sneaker, Blazer, Túi Tote.',
  },
  {
    step: 3,
    badge: 'Điểm 3: Khung Canvas 2D Cột Trái',
    title: '3. Xem thay đổi trực tiếp: Ngắm trang phục thay đổi theo thời gian thực và theo dõi Thước đo Chuẩn mực Di sản.',
    detail:
      'Rê chuột vào 5 điểm chấm vàng trên áo để tra cứu Từ Cổ (Ngũ Thường, Hữu Nhậm) và điều chỉnh chiều cao, cân nặng.',
  },
  {
    step: 4,
    badge: 'Điểm 4: Nút Xuất Lookbook Ở Góc Trên Phải',
    title: '4. Lan tỏa thành phẩm: Bấm Xuất Lookbook để tạo ảnh thẻ 9:16 chia sẻ lên Story mạng xã hội!',
    detail:
      'Tải ảnh PNG chất lượng cao hoặc tạo Album QR Code công khai gửi vào nhóm Zalo/Messenger cho cả lớp cùng bình chọn.',
  },
];

export const StudioGuidedTour: React.FC<StudioGuidedTourProps> = ({
  tourStep,
  onNext,
  onPrev,
  onSkip,
}) => {
  if (!tourStep) return null;

  const currentInfo =
    TOUR_STEPS.find((s) => s.step === tourStep) || TOUR_STEPS[0];

  return (
    <>
      {/* Full-screen dark spotlight backdrop */}
      <div
        onClick={onSkip}
        className="fixed inset-0 bg-black/60 z-40 transition-all duration-300 backdrop-blur-[1.5px]"
      />

      {/* Floating Guided Tour Tooltip Card */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[2000] w-[94%] max-w-xl bg-gradient-to-b from-[#FFFDF9] via-[#FAF7F2] to-[#F3EDE0] rounded-3xl border-2 border-[#D4AF37] shadow-[0_0_40px_rgba(212,175,55,0.55)] p-5 sm:p-6 animate-in zoom-in-95 duration-200">
        {/* Top bar: Progress indicator + Skip button */}
        <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#E3DAC9]">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#B83227] text-white text-[11px] font-bold">
              <Compass className="w-3.5 h-3.5 text-amber-300" />
              <span>Bước {tourStep} / 4</span>
            </span>
            <span className="text-xs font-bold text-[#8A5A19] truncate">
              {currentInfo.badge}
            </span>
          </div>

          <button
            type="button"
            onClick={onSkip}
            className="px-2.5 py-1 text-[11px] font-bold text-[#7A6E5F] hover:text-[#B83227] hover:bg-red-50 rounded-xl transition-colors flex items-center gap-1 cursor-pointer shrink-0"
          >
            <X className="w-3.5 h-3.5" />
            <span>✖ Bỏ qua tour</span>
          </button>
        </div>

        {/* Step Content */}
        <div className="py-3.5 space-y-2">
          <h4 className="text-base sm:text-lg font-serif font-black text-[#2C241D] leading-snug">
            {currentInfo.title}
          </h4>
          <p className="text-xs text-[#5C5346] leading-relaxed">
            {currentInfo.detail}
          </p>
        </div>

        {/* Stepper Dots + Navigation Buttons */}
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#E3DAC9]">
          {/* Stepper dots */}
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4].map((dot) => (
              <span
                key={dot}
                className={`h-2 rounded-full transition-all ${
                  dot === tourStep
                    ? 'w-6 bg-[#B83227]'
                    : dot < tourStep
                    ? 'w-2 bg-[#D4AF37]'
                    : 'w-2 bg-[#D6CEBE]'
                }`}
              />
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2">
            {tourStep > 1 && (
              <button
                type="button"
                onClick={onPrev}
                className="px-3.5 py-2 text-xs font-bold text-[#2C241D] bg-white hover:bg-[#EDE7DC] border border-[#D6CEBE] rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>⬅ Quay Lại</span>
              </button>
            )}

            <button
              type="button"
              onClick={onNext}
              className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#B83227] to-[#99261c] hover:brightness-110 rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              {tourStep < 4 ? (
                <>
                  <span>Tiếp Tục ➔</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Hoàn Tất</span>
                  <Check className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
