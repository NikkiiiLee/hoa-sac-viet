import React from 'react';
import { OutfitConfig } from '../types/costume';
import { getAnatomyHotspots } from '../data/anatomyData';
import { X, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';

interface AnatomyModalProps {
  isOpen: boolean;
  onClose: () => void;
  outfit: OutfitConfig;
}

export const AnatomyModal: React.FC<AnatomyModalProps> = ({
  isOpen,
  onClose,
  outfit,
}) => {
  if (!isOpen) return null;

  const hotspots = getAnatomyHotspots(outfit);

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#FFFDF9] rounded-3xl border-2 border-[#D4AF37] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1B3B6F] to-[#2B4B7F] text-white p-5 flex items-start justify-between border-b border-[#D4AF37]/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-xs flex items-center justify-center border border-white/20 shrink-0">
              <BookOpen className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest bg-amber-400/20 text-amber-200 px-2 py-0.5 rounded-md border border-amber-300/30">
                Sơ Đồ Giải Phẫu Cổ Phục
              </span>
              <h3 className="text-lg font-serif font-bold text-white mt-1">
                Tra Cứu Cổ Từ & Triết Lý Ngũ Thường
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          <p className="text-sm text-[#5C5346] leading-relaxed">
            Mỗi chi tiết trên y phục cổ truyền Việt Nam đều là kết tinh của nhân sinh quan, lễ nhạc và đạo lý làm người. Dưới đây là 5 chi tiết giải phẫu cốt lõi tương ứng với trang phục bạn đang phối:
          </p>

          <div className="space-y-3">
            {hotspots.map((spot, index) => (
              <div
                key={spot.id}
                className="p-4 rounded-2xl bg-white border border-[#EDE7DC] hover:border-[#D4AF37] hover:shadow-xs transition-all space-y-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-[#FAF7F2] border border-[#EDE7DC] flex items-center justify-center text-xs font-bold text-[#1B3B6F]">
                      {index + 1}
                    </span>
                    <span className="text-base">{spot.icon}</span>
                    <h4 className="font-serif font-bold text-sm text-[#2C241D]">
                      {spot.title}
                    </h4>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#B83227] bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
                    {spot.badge}
                  </span>
                </div>

                <p className="text-xs text-[#4A3E31] leading-relaxed bg-[#FAF7F2] p-3 rounded-xl border border-[#EDE7DC]">
                  {spot.content}
                </p>
              </div>
            ))}
          </div>

          {/* Cultural Footer Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 text-amber-950 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="block text-xs font-bold text-amber-900">
                Thông điệp di sản từ tiền nhân:
              </strong>
              <p className="text-[11px] text-amber-900/90 leading-relaxed">
                Khi mặc một chiếc áo ngũ thân hay giao lĩnh, chúng ta không chỉ khoác lên một món đồ thời trang, mà đang mang trên mình cả đạo hiếu gia đình (Tứ thân phụ mẫu & Thân con), đạo đức làm người (Ngũ thường) và tinh thần khiêm cung hòa nhã của dân tộc Việt.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-white border-t border-[#E3DAC9] flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-white bg-[#1B3B6F] hover:bg-[#152e57] rounded-xl transition-all shadow-xs cursor-pointer"
          >
            Đã Hiểu & Quay Lại Studio
          </button>
        </div>
      </div>
    </div>
  );
};
