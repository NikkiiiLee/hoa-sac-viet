import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { GarmentId, OutfitConfig } from '../types/costume';
import { GARMENTS } from '../data/costumeData';
import { getRealGarmentDetail, TU_THAN_PARTS } from '../data/garmentRealAssets';
import {
  X,
  Camera,
  Layers,
  Sparkles,
  Scissors,
  CheckCircle2,
  Copy,
  Check,
  ChevronRight,
  ShieldCheck,
  Maximize2,
  Info,
  MapPin,
  ExternalLink,
} from 'lucide-react';

interface RealGarmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  outfit: OutfitConfig;
  onSelectGarment?: (garmentId: GarmentId) => void;
}

export const RealGarmentModal: React.FC<RealGarmentModalProps> = ({
  isOpen,
  onClose,
  outfit,
  onSelectGarment,
}) => {
  const [activeGarmentId, setActiveGarmentId] = useState<GarmentId>(outfit.garmentId);
  const [activeTab, setActiveTab] = useState<'specs' | 'tailoring' | 'styling'>('specs');
  const [isCopied, setIsCopied] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [tuThanViewMode, setTuThanViewMode] = useState<'model' | 'parts'>('model');
  const [customPhotos] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('custom_garment_photos');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Cơ chế Ánh xạ tương ứng (Auto-mapping): khi mở popup, đồng bộ chính xác theo dáng áo đang chọn trên bản vẽ 2D
  useEffect(() => {
    if (isOpen) {
      setActiveGarmentId(outfit.garmentId);
      setIsZoomed(false);
      setTuThanViewMode('model');
    }
  }, [isOpen, outfit.garmentId]);

  // ESC key listener to close modal easily
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const detail = getRealGarmentDetail(activeGarmentId, outfit.mainColor);
  const currentColor = outfit.mainColor;
  const currentDisplayedPhoto = customPhotos[activeGarmentId] || detail.photoUrl;

  const handleCopySpecs = () => {
    const textToCopy = `[HỌA SẮC VIỆT - THÔNG SỐ MAY ĐO ĐỜI THỰC]
Y phục: ${detail.name} (${detail.eraName})
• Chất liệu: ${detail.fabricSpec.materialName} - ${detail.fabricSpec.weaveType} (${detail.fabricSpec.weightMomme})
• Quy cách khuy: ${detail.buttonSpec.name} (${detail.buttonSpec.quantity} cúc) - Chất liệu: ${detail.buttonSpec.material}
  Vị trí: ${detail.buttonSpec.placement}
• Chiều dài tà áo: ${detail.silhouetteSpec.hemLength}
• Cổ áo lập lĩnh: ${detail.silhouetteSpec.collarHeight}
• Cửa tay áo: ${detail.silhouetteSpec.sleeveWidth}
• Độ xòe tà & Độ rủ: ${detail.silhouetteSpec.hemWidth} - ${detail.silhouetteSpec.drapeBehavior}
• Màu phối hiện tại: ${currentColor.vietnameseName || currentColor.name} (${currentColor.hex})
• Kỹ thuật may: ${detail.tailoringNotes.join('; ')}
• Nhà may gợi ý: ${detail.recommendedTailors.map((t) => `${t.name} (${t.city})`).join(', ')}
Khám phá thêm tại Họa Sắc Việt Studio.`;

    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleSwitchGarment = (id: GarmentId) => {
    setActiveGarmentId(id);
    if (onSelectGarment) {
      onSelectGarment(id);
    }
  };

  // Sử dụng createPortal gắn trực tiếp vào document.body để thoát khỏi mọi stacking context
  return createPortal(
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[1000] overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 pt-6 sm:p-5 sm:pt-6 md:p-6 animate-in fade-in duration-200"
    >
      {/* Modal Container: Flexbox 3 tầng với chiều cao xác định, căn giữa mỹ thuật */}
      <div
        className="relative my-auto w-full max-w-4xl h-[88vh] max-h-[820px] flex flex-col bg-[#FCFAF6] border-2 border-[#D4AF37]/80 rounded-3xl shadow-2xl overflow-hidden text-[#2C241D] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* TẦNG 1: HEADER CỐ ĐỊNH TRÊN CÙNG (SHRINK-0, Z-20) */}
        <div className="shrink-0 px-4 py-3 sm:px-6 sm:py-3.5 bg-gradient-to-r from-[#1B3B6F] via-[#244883] to-[#1B3B6F] text-white flex items-center justify-between border-b border-[#D4AF37]/40 z-20">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#B83227] border border-[#F4D03F] flex items-center justify-center shadow-xs shrink-0">
              <Camera className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-sm sm:text-base font-bold text-[#FFFDF9] tracking-wide">
                  Chi Tiết Y Phục Đời Thực
                </h3>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider bg-[#B83227]/90 text-amber-100 px-2 py-0.5 rounded-full border border-amber-300/40">
                  <ShieldCheck className="w-3 h-3 text-amber-200" /> Chuẩn May Đo Di Sản
                </span>
              </div>
              <p className="text-[11px] text-blue-100/90 leading-tight">
                Ánh xạ ảnh chụp thực tế người thật mặc • Chất liệu gấm lụa & quy cách thước tấc
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleCopySpecs}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-medium text-white border border-white/20 transition-all cursor-pointer active:scale-95"
              title="Sao chép toàn bộ thông số may đo vào bộ nhớ tạm"
            >
              {isCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                  <span className="text-emerald-200">Đã chép</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Chép thông số</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
              title="Đóng cửa sổ và trở lại Bản vẽ 2D (hoặc nhấn Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* THANH CHỌN Y PHỤC (CỐ ĐỊNH, SHRINK-0, Z-10) */}
        <div className="shrink-0 px-4 py-2 bg-[#F4EFE6] border-b border-[#E3DAC9] flex items-center gap-1.5 overflow-x-auto z-10 scrollbar-none">
          <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#7A6E5F] shrink-0 pl-1">
            Dòng Cổ Phục:
          </span>
          {Object.values(GARMENTS).map((g) => {
            const isSelected = activeGarmentId === g.id;
            return (
              <button
                key={g.id}
                type="button"
                onClick={() => handleSwitchGarment(g.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all shrink-0 cursor-pointer flex items-center gap-1 ${
                  isSelected
                    ? 'bg-[#1B3B6F] text-white shadow-xs font-semibold'
                    : 'bg-white/80 text-[#5C5346] hover:bg-white hover:text-[#2C241D] border border-black/5'
                }`}
              >
                <span>{g.name}</span>
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
              </button>
            );
          })}
        </div>

        {/* TẦNG 2: THÂN CUỘN CHUẨN MỰC (FLEX-1, MIN-H-0, OVERFLOW-Y-AUTO) */}
        <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-4 sm:p-6 space-y-5 overscroll-contain">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
            
            {/* CỘT TRÁI: ẢNH CHỤP MẪU THẬT & MÔ TẢ (5 cols) */}
            <div className="md:col-span-5 space-y-3">
              {/* Photo Header Label (Đã xóa tiền tố 'Ảnh 1, Ảnh 2' và nút 'Đổi ảnh') */}
              <div className="flex items-center justify-between gap-1.5">
                <span className="text-[11.5px] font-bold text-[#1B3B6F] flex items-center gap-1.5 truncate">
                  <span>📸</span>
                  <span className="truncate">{detail.photoIndexLabel}</span>
                </span>
                <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 shrink-0">
                  Ảnh Chụp Thực Tế
                </span>
              </div>

              {/* Special Toggle for Ao Tu Than (Xem Mẫu Thật vs Sơ Đồ 8 Bộ Phận) */}
              {activeGarmentId === 'ao_tu_than' && (
                <div className="flex items-center p-1 bg-[#FAF7F2] rounded-xl border border-[#EDE7DC] gap-1">
                  <button
                    type="button"
                    onClick={() => setTuThanViewMode('model')}
                    className={`flex-1 py-1 text-[11px] font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 ${
                      tuThanViewMode === 'model'
                        ? 'bg-[#1B3B6F] text-white shadow-2xs'
                        : 'text-[#6B5E4F] hover:text-[#2C241D]'
                    }`}
                  >
                    <span>📸</span>
                    <span>Ảnh Mẫu Thật</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTuThanViewMode('parts')}
                    className={`flex-1 py-1 text-[11px] font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 ${
                      tuThanViewMode === 'parts'
                        ? 'bg-[#B83227] text-white shadow-2xs'
                        : 'text-[#6B5E4F] hover:text-[#2C241D]'
                    }`}
                  >
                    <span>📜</span>
                    <span>Sơ Đồ 8 Bộ Phận</span>
                  </button>
                </div>
              )}

              {/* VIEW 1: REAL PHOTO DISPLAY */}
              {activeGarmentId !== 'ao_tu_than' || tuThanViewMode === 'model' ? (
                <>
                  <div className="relative group rounded-2xl overflow-hidden border-2 border-[#D6CEBE] bg-stone-900 shadow-md">
                    <img
                      src={currentDisplayedPhoto}
                      alt={detail.name}
                      className={`w-full object-cover transition-all duration-300 ${
                        isZoomed
                          ? 'max-h-[520px] scale-110 cursor-zoom-out'
                          : 'max-h-[360px] sm:max-h-[400px] object-top cursor-zoom-in'
                      }`}
                      onClick={() => setIsZoomed(!isZoomed)}
                    />

                    {/* Overlay Tag */}
                    <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1 pointer-events-none">
                      <span className="bg-[#B83227]/90 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-lg border border-amber-300/40 shadow-xs">
                        📸 ẢNH CHỤP THỰC TẾ
                      </span>
                      <span className="bg-[#1B3B6F]/85 backdrop-blur-xs text-white text-[9.5px] font-medium px-2 py-0.5 rounded-md border border-white/20">
                        {detail.eraName}
                      </span>
                    </div>

                    {/* Zoom Hint */}
                    <button
                      type="button"
                      onClick={() => setIsZoomed(!isZoomed)}
                      className="absolute bottom-2.5 right-2.5 p-1.5 bg-black/60 hover:bg-black/80 text-white rounded-lg backdrop-blur-xs text-xs transition-colors cursor-pointer"
                      title={isZoomed ? 'Thu nhỏ ảnh' : 'Phóng to xem chi tiết'}
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Photo Caption & Model Metadata */}
                  <div className="p-3.5 bg-[#FAF7F2] rounded-xl border border-[#EDE7DC] space-y-2.5 text-xs">
                    <p className="text-[#2C241D] font-medium leading-relaxed">
                      {detail.photoCaption}
                    </p>

                    <div className="pt-2 border-t border-[#EDE7DC] space-y-2">
                      {/* Dòng Concept đầy đủ 100%, không bị cắt chữ hay mất chữ */}
                      <div className="bg-white/95 p-2.5 rounded-lg border border-[#EDE7DC] shadow-2xs">
                        <div className="text-[11.5px] text-[#2C241D] leading-relaxed break-words font-medium">
                          <span className="text-[#B83227] font-bold mr-1">📸 Concept:</span>
                          <span>{detail.modelInfo.replace(/^Concept:\s*/i, '')}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-1 text-[11px] pt-0.5">
                        <span className="text-[#7A6E5F] font-medium">Quy chuẩn phục chế:</span>
                        <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 shrink-0">
                          ✓ {detail.heritageRating}
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                /* VIEW 2: CÁC BỘ PHẬN CỦA ÁO TỨ THÂN (SƠ ĐỒ 8 BỘ PHẬN) */
                <div className="rounded-2xl border-2 border-[#D4AF37] bg-gradient-to-b from-[#FFFDF9] to-[#F7F2E7] p-3.5 shadow-md space-y-3 animate-in fade-in duration-200">
                  <div className="text-center pb-2 border-b border-[#E3DAC9]">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#B83227] bg-red-50 px-2 py-0.5 rounded-full border border-red-200">
                      📜 MINH HỌA DI SẢN BẮC BỘ
                    </span>
                    <h4 className="font-serif text-sm font-black text-[#8A1C14] mt-1 tracking-wide uppercase">
                      CÁC BỘ PHẬN CỦA ÁO TỨ THÂN
                    </h4>
                    <p className="text-[10.5px] text-[#7A6E5F] mt-0.5">
                      8 cấu kiện hoàn chỉnh tạo nên hồn cốt thiếu nữ Kinh Bắc
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[360px] overflow-y-auto pr-1">
                    {TU_THAN_PARTS.map((part) => (
                      <div
                        key={part.number}
                        className="p-2 bg-white/90 rounded-xl border border-[#EDE7DC] hover:border-[#D4AF37] transition-all space-y-1 shadow-2xs"
                      >
                        <div className="flex items-center gap-1.5">
                          <span className="w-4 h-4 rounded-full bg-[#B83227] text-white text-[9px] font-bold flex items-center justify-center shrink-0">
                            {part.number}
                          </span>
                          <span className="text-xs font-bold text-[#1B3B6F] truncate">
                            {part.name}
                          </span>
                        </div>
                        <p className="text-[10.5px] text-[#4A3E31] leading-tight pl-5">
                          {part.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="p-2 bg-amber-50/90 rounded-xl border border-amber-200/80 text-[10.5px] text-[#6B552F] flex items-center gap-1.5">
                    <span className="text-xs">💡</span>
                    <span>Bấm lại <strong>"Ảnh Mẫu Thật"</strong> để xem ảnh thiếu nữ diện áo tứ thân du xuân ngày Tết.</span>
                  </div>
                </div>
              )}

              {/* Color Swatch Link to Studio */}
              <div className="p-3 bg-white rounded-xl border border-[#D6CEBE] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-7 h-7 rounded-full border-2 border-stone-200 shadow-xs shrink-0"
                    style={{ backgroundColor: currentColor.hex }}
                  />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#7A6E5F] block">
                      Màu bạn đang chọn:
                    </span>
                    <span className="text-xs font-bold text-[#2C241D]">
                      {currentColor.vietnameseName || currentColor.name}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] bg-amber-100 text-amber-800 font-semibold px-2 py-0.5 rounded-md border border-amber-200">
                    Mệnh {currentColor.fiveElements}
                  </span>
                </div>
              </div>
            </div>

            {/* CỘT PHẢI: THÔNG SỐ THỰC TẾ, QUY CÁCH MAY ĐO & NHÀ MAY GỢI Ý (7 cols) */}
            <div className="md:col-span-7 space-y-4">
              
              {/* Tiêu đề y phục không bị đè chữ hay icon */}
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="font-serif text-lg sm:text-2xl font-bold text-[#1B3B6F] leading-tight">
                    {detail.name}
                  </h4>
                  <span className="text-xs text-amber-800 font-semibold bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200/80 shrink-0">
                    {detail.eraName}
                  </span>
                </div>
                <p className="text-xs text-[#5C5346] leading-relaxed">
                  {detail.tagline}
                </p>
              </div>

              {/* Navigation Tabs */}
              <div className="flex border-b border-[#E3DAC9] gap-3 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setActiveTab('specs')}
                  className={`pb-2 transition-colors cursor-pointer border-b-2 flex items-center gap-1.5 ${
                    activeTab === 'specs'
                      ? 'border-[#B83227] text-[#B83227] font-bold'
                      : 'border-transparent text-[#7A6E5F] hover:text-[#2C241D]'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Thông Số Cốt Lõi</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('tailoring')}
                  className={`pb-2 transition-colors cursor-pointer border-b-2 flex items-center gap-1.5 ${
                    activeTab === 'tailoring'
                      ? 'border-[#B83227] text-[#B83227] font-bold'
                      : 'border-transparent text-[#7A6E5F] hover:text-[#2C241D]'
                  }`}
                >
                  <Scissors className="w-3.5 h-3.5" />
                  <span>Quy Cách & Nhà May</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('styling')}
                  className={`pb-2 transition-colors cursor-pointer border-b-2 flex items-center gap-1.5 ${
                    activeTab === 'styling'
                      ? 'border-[#B83227] text-[#B83227] font-bold'
                      : 'border-transparent text-[#7A6E5F] hover:text-[#2C241D]'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Phối Đồ Đời Thực</span>
                </button>
              </div>

              {/* TAB 1: CORE SPECS (Chất liệu lụa/gấm, Khuy ngũ thường, Chiều dài tà áo & Phom dáng) */}
              {activeTab === 'specs' && (
                <div className="space-y-3 animate-in fade-in duration-150">
                  
                  {/* SPEC 1: CHẤT LIỆU LỤA / GẤM */}
                  <div className="p-3.5 bg-white rounded-2xl border border-[#D6CEBE] shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-[#1B3B6F]">
                          🧵
                        </div>
                        <h5 className="text-xs font-bold uppercase tracking-wider text-[#1B3B6F]">
                          Chất Liệu Thực Tế: {detail.fabricSpec.materialName}
                        </h5>
                      </div>
                      <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        {detail.fabricSpec.weightMomme}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                      <div className="bg-[#FAF7F2] p-2 rounded-xl border border-[#EDE7DC]">
                        <span className="text-[10px] font-bold text-[#7A6E5F] uppercase block">
                          Kiểu Dệt & Hoa Văn:
                        </span>
                        <span className="text-[#2C241D] font-medium">
                          {detail.fabricSpec.weaveType}
                        </span>
                      </div>
                      <div className="bg-[#FAF7F2] p-2 rounded-xl border border-[#EDE7DC]">
                        <span className="text-[10px] font-bold text-[#7A6E5F] uppercase block">
                          Nguồn Gốc Làng Nghề:
                        </span>
                        <span className="text-[#2C241D] font-medium">
                          {detail.fabricSpec.origin}
                        </span>
                      </div>
                    </div>

                    <p className="text-[11.5px] text-[#4A3E31] leading-relaxed pt-1">
                      💡 <strong>Cảm nhận thớ vải:</strong> {detail.fabricSpec.feelDescription}
                    </p>
                  </div>

                  {/* SPEC 2: QUY CÁCH MAY KHUY NGŨ THƯỜNG */}
                  <div className="p-3.5 bg-white rounded-2xl border border-[#D6CEBE] shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-[#B83227]">
                          🔘
                        </div>
                        <h5 className="text-xs font-bold uppercase tracking-wider text-[#B83227]">
                          Quy Cách Khuy: {detail.buttonSpec.name}
                        </h5>
                      </div>
                      <span className="text-[11px] font-bold text-[#B83227] bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                        {detail.buttonSpec.quantity > 0 ? `${detail.buttonSpec.quantity} Hạt Khuy` : 'Không dùng khuy'}
                      </span>
                    </div>

                    <div className="text-xs space-y-1.5 pt-1">
                      <div className="bg-[#FAF7F2] p-2 rounded-xl border border-[#EDE7DC] space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10.5px] text-[#7A6E5F] font-semibold">Chất liệu cúc:</span>
                          <span className="font-semibold text-[#2C241D]">{detail.buttonSpec.material}</span>
                        </div>
                        <div className="flex items-start justify-between gap-2 pt-1 border-t border-[#EDE7DC]/70">
                          <span className="text-[10.5px] text-[#7A6E5F] font-semibold shrink-0">Vị trí đính cúc:</span>
                          <span className="text-right text-[#2C241D] text-[11px] leading-tight">
                            {detail.buttonSpec.placement}
                          </span>
                        </div>
                      </div>

                      <p className="text-[11px] text-[#4A3E31] leading-relaxed italic">
                        ⭐ <strong>Ý nghĩa Nho gia:</strong> {detail.buttonSpec.meaning}
                      </p>
                    </div>
                  </div>

                  {/* SPEC 3: CHIỀU DÀI TÀ ÁO & PHOM DÁNG */}
                  <div className="p-3.5 bg-white rounded-2xl border border-[#D6CEBE] shadow-xs space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800">
                        📐
                      </div>
                      <h5 className="text-xs font-bold uppercase tracking-wider text-[#2C241D]">
                        Chiều Dài Tà Áo & Phom Dáng Thước Tấc
                      </h5>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                      <div className="p-2 bg-[#FAF7F2] rounded-xl border border-[#EDE7DC]">
                        <span className="text-[10px] text-[#7A6E5F] font-bold uppercase block">
                          Chiều dài tà áo:
                        </span>
                        <span className="font-bold text-[#1B3B6F] text-xs">
                          {detail.silhouetteSpec.hemLength}
                        </span>
                      </div>

                      <div className="p-2 bg-[#FAF7F2] rounded-xl border border-[#EDE7DC]">
                        <span className="text-[10px] text-[#7A6E5F] font-bold uppercase block">
                          Cổ áo lập lĩnh:
                        </span>
                        <span className="font-bold text-[#B83227] text-xs">
                          {detail.silhouetteSpec.collarHeight}
                        </span>
                      </div>

                      <div className="p-2 bg-[#FAF7F2] rounded-xl border border-[#EDE7DC]">
                        <span className="text-[10px] text-[#7A6E5F] font-bold uppercase block">
                          Cửa tay áo:
                        </span>
                        <span className="font-medium text-[#2C241D] text-[11px]">
                          {detail.silhouetteSpec.sleeveWidth}
                        </span>
                      </div>

                      <div className="p-2 bg-[#FAF7F2] rounded-xl border border-[#EDE7DC]">
                        <span className="text-[10px] text-[#7A6E5F] font-bold uppercase block">
                          Độ xòe gấu áo:
                        </span>
                        <span className="font-medium text-[#2C241D] text-[11px]">
                          {detail.silhouetteSpec.hemWidth}
                        </span>
                      </div>
                    </div>

                    <div className="p-2 bg-amber-50/80 rounded-xl border border-amber-200 text-[11px] text-[#5C5346]">
                      <span>🌊 <strong>Độ rủ thực tế:</strong> {detail.silhouetteSpec.drapeBehavior}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: TAILORING NOTES & RECOMMENDED TAILORS */}
              {activeTab === 'tailoring' && (
                <div className="space-y-3.5 animate-in fade-in duration-150">
                  {/* QUY CHUẨN KỸ THUẬT */}
                  <div className="p-4 bg-white rounded-2xl border border-[#D6CEBE] shadow-xs space-y-3">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-[#1B3B6F] flex items-center gap-1.5">
                      <Scissors className="w-3.5 h-3.5 text-[#B83227]" />
                      Quy Chuẩn Kỹ Thuật May Lối Cổ
                    </h5>
                    <ul className="space-y-2 text-xs text-[#2C241D]">
                      {detail.tailoringNotes.map((note, idx) => (
                        <li key={idx} className="flex items-start gap-2 bg-[#FAF7F2] p-2.5 rounded-xl border border-[#EDE7DC]">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{note}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-xs text-[#1B3B6F] space-y-1">
                      <span className="font-bold flex items-center gap-1">
                        <Info className="w-3.5 h-3.5" /> Lời khuyên khi đặt may:
                      </span>
                      <p className="text-[11.5px] leading-relaxed">
                        Để may đúng chuẩn cổ phục, nên chọn vải khổ 40–45cm nối sống lưng (can sống). Thợ may cần lưu ý vạt phải đè vạt trái (hữu nhậm), không làm xếch tà hoặc gãy chân cổ lập lĩnh.
                      </p>
                    </div>
                  </div>

                  {/* NHÀ MAY GỢI Ý (ĐỊA CHỈ MAY ĐO CỔ PHỤC UY TÍN) */}
                  <div className="p-4 bg-gradient-to-b from-[#FFFDF9] to-[#FBF8F2] rounded-2xl border-2 border-[#D4AF37]/70 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <h5 className="text-xs font-bold uppercase tracking-wider text-[#B83227] flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#B83227]" />
                        Nhà May Gợi Ý (Địa Chỉ May Đo Cổ Phục Uy Tín)
                      </h5>
                      <span className="text-[10px] font-bold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-md border border-amber-300">
                        Đã Khảo Sát Di Sản
                      </span>
                    </div>

                    <div className="space-y-2">
                      {detail.recommendedTailors.map((tailor, tIdx) => (
                        <div
                          key={tIdx}
                          className="p-3 bg-white rounded-xl border border-[#EDE7DC] hover:border-[#D4AF37] transition-all space-y-1.5 shadow-2xs"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="font-serif text-xs font-bold text-[#1B3B6F]">
                                  {tailor.name}
                                </span>
                                {tailor.isVerifiedHeritage && (
                                  <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded-sm">
                                    Chuẩn lối cổ
                                  </span>
                                )}
                              </div>
                              <span className="text-[10.5px] text-[#7A6E5F] flex items-center gap-1 mt-0.5">
                                <MapPin className="w-3 h-3 text-[#B83227]" />
                                {tailor.city}
                              </span>
                            </div>
                          </div>

                          <p className="text-[11px] text-[#2C241D] leading-tight">
                            🎯 <strong>Chuyên môn:</strong> {tailor.specialty}
                          </p>
                          <p className="text-[10.5px] text-[#6B5E4F] italic bg-[#FAF7F2] p-1.5 rounded-lg border border-[#EDE7DC]/70">
                            💬 {tailor.contactNote}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: REAL-WORLD STYLING */}
              {activeTab === 'styling' && (
                <div className="p-4 bg-white rounded-2xl border border-[#D6CEBE] shadow-xs space-y-3 animate-in fade-in duration-150">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-[#B83227] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                    Gợi Ý Phối Đồ & Bảo Quản Ngoài Đời
                  </h5>
                  
                  <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EDE7DC] text-xs space-y-1.5">
                    <span className="font-bold text-[#1B3B6F] block">Gợi ý trang phục đời thường:</span>
                    <p className="text-[#4A3E31] leading-relaxed">
                      {detail.stylingAdvice}
                    </p>
                  </div>

                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs space-y-1">
                    <span className="font-bold text-[#7A4B10] block">Hướng dẫn giặt & ủi lụa gấm:</span>
                    <p className="text-[11.5px] text-[#5C5346] leading-relaxed">
                      Giặt hấp (dry clean) hoặc giặt tay bằng nước lạnh pha dầu gội/sữa tắm dịu nhẹ. Không vắt xoắn tà áo. Là ủi ở nhiệt độ thấp mặt trái khi vải còn ẩm nhẹ để giữ trọn vẹn hoa văn vân chìm.
                    </p>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* TẦNG 3: FOOTER CỐ ĐỊNH DƯỚI CÙNG (SHRINK-0, Z-20) */}
        <div className="shrink-0 px-4 py-3 sm:px-6 bg-[#F4EFE6] border-t border-[#E3DAC9] flex items-center justify-between z-20">
          <div className="text-[11px] text-[#7A6E5F] hidden sm:flex items-center gap-1.5">
            <span>🎨</span>
            <span>Bấm <strong>"Quay Lại Bản Vẽ 2D"</strong> để tiếp tục thử màu & phối phụ kiện trong Studio.</span>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <button
              type="button"
              onClick={handleCopySpecs}
              className="sm:hidden px-3 py-1.5 rounded-xl bg-white border border-[#D6CEBE] text-xs font-semibold text-[#2C241D] hover:bg-stone-50 cursor-pointer"
            >
              {isCopied ? 'Đã chép' : 'Chép thông số'}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#1B3B6F] hover:bg-[#244883] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <span>Quay Lại Bản Vẽ 2D</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
