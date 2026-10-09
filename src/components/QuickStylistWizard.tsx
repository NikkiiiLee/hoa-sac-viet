import React, { useState } from 'react';
import { OutfitConfig, GarmentId, LandmarkId, LightingMoodId } from '../types/costume';
import { GARMENTS, COLOR_PALETTE, calculateColorHarmony } from '../data/costumeData';
import { LANDMARKS, LIGHTING_MOODS } from '../data/landmarksData';
import {
  GraduationCap,
  Coffee,
  Sparkles,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  Check,
  RotateCcw,
  Sliders,
  Share2,
  Award,
  Layers,
  Glasses,
  Footprints,
  ShoppingBag,
  MapPin,
  Sun,
} from 'lucide-react';

interface QuickStylistWizardProps {
  outfit: OutfitConfig;
  onUpdateOutfit: (updates: Partial<OutfitConfig>) => void;
  onSwitchToStudio: () => void;
  onOpenLookbook: () => void;
}

export type WizardOccasionId = 'di_hoc' | 'ky_yeu' | 'dao_pho' | 'le_tet';
export type WizardVibeId = 'sporty_modern' | 'minimalist' | 'soft_vintage';

export const QuickStylistWizard: React.FC<QuickStylistWizardProps> = ({
  outfit,
  onUpdateOutfit,
  onSwitchToStudio,
  onOpenLookbook,
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [selectedOccasion, setSelectedOccasion] = useState<WizardOccasionId>('di_hoc');
  const [selectedVibe, setSelectedVibe] = useState<WizardVibeId>('sporty_modern');

  // Occasions list for Step 1
  const OCCASIONS_DATA = [
    {
      id: 'di_hoc' as WizardOccasionId,
      title: 'Đi Học / Thuyết Trình',
      icon: '🎓',
      recommendedGarment: 'Áo Ngũ Thân Tay Chẽn',
      garmentId: 'ao_chen' as GarmentId,
      description: 'Thanh lịch, chuẩn mực, cử động linh hoạt nơi giảng đường và hội trường.',
      culturalTag: 'Thường phục Nho nhã',
    },
    {
      id: 'ky_yeu' as WizardOccasionId,
      title: 'Chụp Kỷ Yếu Tốt Nghiệp',
      icon: '📸',
      recommendedGarment: 'Áo Ngũ Thân Tay Thụng (Áo Tấc)',
      garmentId: 'ao_tac' as GarmentId,
      description: 'Trang trọng, tay thụng thướt tha, khí chất học thức tri thức trẻ.',
      culturalTag: 'Đại lễ phục Hoàng triều',
    },
    {
      id: 'dao_pho' as WizardOccasionId,
      title: 'Dạo Phố Check-in Cafe',
      icon: '☕',
      recommendedGarment: 'Áo Dài Cách Tân Gen Z',
      garmentId: 'ao_dai_cach_tan' as GarmentId,
      description: 'Trẻ trung, thoải mái, nổi bật trong từng khung hình sống ảo.',
      culturalTag: 'Đương đại Remix',
    },
    {
      id: 'le_tet' as WizardOccasionId,
      title: 'Đi Lễ Tết / Trẩy Hội Du Xuân',
      icon: '🏮',
      recommendedGarment: 'Áo Giao Lĩnh Cổ Chéo',
      garmentId: 'ao_giao_linh' as GarmentId,
      description: 'Phóng khoáng, rạng rỡ, đậm đà phong vị văn hóa cổ truyền ngàn năm.',
      culturalTag: 'Đại Việt Cổ Kính',
    },
  ];

  // Vibe styles for Step 2
  const VIBES_DATA = [
    {
      id: 'sporty_modern' as WizardVibeId,
      title: 'Năng Động Hiện Đại',
      subtitle: 'Modern Sporty / Smart Casual',
      icon: '👟',
      items: [
        { label: 'Sneaker retro đế bệt Samba / Stan Smith', icon: '👟' },
        { label: 'Áo Blazer oversize khoác ngoài buông cúc', icon: '🧥' },
        { label: 'Túi tote canvas in họa tiết cổ', icon: '👜' },
      ],
      description: 'Sự tương phản thời thượng giữa cổ phục đoan trang và nhịp thở streetwear thể thao.',
    },
    {
      id: 'minimalist' as WizardVibeId,
      title: 'Tối Giản Thanh Lịch',
      subtitle: 'Minimalist Aesthetic',
      icon: '🌿',
      items: [
        { label: 'Giày Loafer da bóng chỉn chu', icon: '👞' },
        { label: 'Kính mắt kim loại gọng tròn thanh mảnh', icon: '👓' },
        { label: 'Quạt xếp giấy dó nan tre trầm hương', icon: '🪭' },
      ],
      description: 'Phong thái trí thức điềm đạm, đường nét tinh gọn, mang lại cảm giác an yên thanh tao.',
    },
    {
      id: 'soft_vintage' as WizardVibeId,
      title: 'Duyên Dáng Nữ Tính',
      subtitle: 'Chic Heritage / Soft Vintage',
      icon: '🌸',
      items: [
        { label: 'Giày búp bê Mary Jane / Hài thêu êm chân', icon: '🥿' },
        { label: 'Chân váy dập ly midi mềm mại buông rủ', icon: '👗' },
        { label: 'Bờm nhung đỏ đô / Kẹp càng cua ngọc', icon: '🎀' },
      ],
      description: 'Ngọt ngào, đằm thắm, kết nối mỹ cảm thiếu nữ xưa cùng phong cách nàng thơ vintage.',
    },
  ];

  // STEP 2 -> STEP 3: EXECUTE AUTOMATIC COMPOSITION (AI STYLIST)
  const handleGenerateOutfit = () => {
    let mainColor = COLOR_PALETTE[3]; // Xanh chàm
    let innerColor = COLOR_PALETTE[12]; // Trắng ngà
    let bottomColor = COLOR_PALETTE[12];
    let selectedBottom = 'quan_lua_ong_suong';
    let selectedShoes = 'loafer_da';
    let selectedHeadwear = 'khan_dong';
    let selectedGlasses = 'none';
    let selectedOuterwear = 'none';
    let selectedHandheld = 'none';
    let title = 'Set Đồ Hoàn Mỹ';

    // 1. Pick garment based on Occasion
    const occasionObj = OCCASIONS_DATA.find((o) => o.id === selectedOccasion)!;
    const garmentId = occasionObj.garmentId;

    // 2. Color by Occasion & Five Elements
    if (selectedOccasion === 'di_hoc') {
      // Kim sinh Thủy: Trắng ngà + Xanh chàm Đại Việt
      mainColor = COLOR_PALETTE.find((c) => c.id === 'xanh_cham') || COLOR_PALETTE[3];
      innerColor = COLOR_PALETTE.find((c) => c.id === 'bach_ngoc') || COLOR_PALETTE[12];
      bottomColor = COLOR_PALETTE.find((c) => c.id === 'bach_ngoc') || COLOR_PALETTE[12];
      title = 'Chẽn Thanh Niên Giảng Đường';
    } else if (selectedOccasion === 'ky_yeu') {
      // Thủy & Kim: Xanh Chàm + Bạch Ngọc
      mainColor = COLOR_PALETTE.find((c) => c.id === 'xanh_cham') || COLOR_PALETTE[3];
      innerColor = COLOR_PALETTE.find((c) => c.id === 'bach_ngoc') || COLOR_PALETTE[12];
      bottomColor = COLOR_PALETTE.find((c) => c.id === 'bach_ngoc') || COLOR_PALETTE[12];
      title = 'Tấc Cố Đô Vọng Nguyệt';
    } else if (selectedOccasion === 'dao_pho') {
      // Mộc & Thổ: Xanh Sage + Beige Mộc
      mainColor = COLOR_PALETTE.find((c) => c.id === 'sage_remix') || COLOR_PALETTE[15];
      innerColor = COLOR_PALETTE.find((c) => c.id === 'bach_ngoc') || COLOR_PALETTE[12];
      bottomColor = COLOR_PALETTE.find((c) => c.id === 'beige_remix') || COLOR_PALETTE[16];
      selectedBottom = outfit.gender === 'male' ? 'quan_lua_ong_suong' : 'chan_vay_midi_xep_ly';
      title = 'Tân Thời Dạo Khúc';
    } else if (selectedOccasion === 'le_tet') {
      // Hỏa sinh Thổ: Đỏ Chu Sa + Vàng Nghệ / Vàng Hoàng Yến
      mainColor = COLOR_PALETTE.find((c) => c.id === 'do_chu_sa') || COLOR_PALETTE[0];
      innerColor = COLOR_PALETTE.find((c) => c.id === 'vang_hoang_yen') || COLOR_PALETTE[8];
      bottomColor = COLOR_PALETTE.find((c) => c.id === 'bach_ngoc') || COLOR_PALETTE[12];
      title = 'Giao Lĩnh Nghênh Xuân Đại Cát';
    }

    // 3. Accessories by Vibe
    if (selectedVibe === 'sporty_modern') {
      selectedShoes = 'sneaker_retro';
      selectedOuterwear = 'blazer_oversize';
      selectedHandheld = 'tui_tote_canvas';
    } else if (selectedVibe === 'minimalist') {
      selectedShoes = 'loafer_da';
      selectedGlasses = 'kinh_kim_loai';
      selectedHandheld = 'quat_xep_giay_do';
    } else if (selectedVibe === 'soft_vintage') {
      selectedShoes = outfit.gender === 'female' ? 'mary_jane' : 'hai_theu_cung_dinh';
      selectedBottom = outfit.gender === 'male' ? 'quan_lua_ong_suong' : 'chan_vay_midi_xep_ly';
      selectedHeadwear = outfit.gender === 'female' ? 'bom_nhung' : 'khan_dong';
    }

    // 4. Smart Landmark & Lighting Context Binding
    let backdropId: LandmarkId = 'van_mieu';
    let lightingId: LightingMoodId = 'nang_am';

    if (selectedOccasion === 'le_tet') {
      backdropId = 'hoang_thanh_hue';
      lightingId = 'nang_am'; // Golden hour glow
    } else if (selectedOccasion === 'ky_yeu') {
      backdropId = 'van_mieu';
      lightingId = 'sang_som'; // Fresh morning mist
    } else if (selectedOccasion === 'dao_pho') {
      backdropId = selectedVibe === 'minimalist' ? 'cafe_indochine' : 'pho_co_hoi_an';
      lightingId = selectedVibe === 'sporty_modern' ? 'nang_am' : 'chieu_thu';
    } else if (selectedOccasion === 'di_hoc') {
      backdropId = 'van_mieu';
      lightingId = 'sang_som'; // Fresh morning mist
    }

    // Update Outfit in App state
    onUpdateOutfit({
      title,
      garmentId,
      mainColor,
      innerColor,
      bottomColor,
      selectedBottom,
      selectedShoes,
      selectedHeadwear,
      selectedGlasses,
      selectedOuterwear,
      selectedHandheld,
      backdropId,
      lightingId,
      lapelDirection: 'huu_nham',
      isSleeveRolled: false,
    });

    setCurrentStep(3);
  };

  const harmony = calculateColorHarmony(outfit.mainColor, outfit.innerColor, outfit.bottomColor);
  const currentLandmark = LANDMARKS.find((l) => l.id === (outfit.backdropId || 'van_mieu'));
  const currentLighting = LIGHTING_MOODS.find((m) => m.id === (outfit.lightingId || 'nang_am'));

  return (
    <div className="bg-white rounded-3xl border border-[#D6CEBE] p-5 sm:p-7 shadow-xs space-y-6">
      
      {/* STEPPER PROGRESS BAR */}
      <div className="border-b border-[#EDE7DC] pb-5">
        <div className="flex items-center justify-between max-w-xl mx-auto relative">
          
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#EDE7DC] -translate-y-1/2 z-0" />
          <div
            className="absolute top-1/2 left-0 h-0.5 bg-[#B83227] -translate-y-1/2 transition-all duration-300 z-0"
            style={{
              width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%',
            }}
          />

          {/* Step 1 Pill */}
          <button
            onClick={() => setCurrentStep(1)}
            className="relative z-10 flex flex-col items-center group cursor-pointer"
          >
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-xs ${
                currentStep >= 1
                  ? 'bg-[#B83227] text-white ring-4 ring-[#FAF7F2]'
                  : 'bg-white text-[#7A6E5F] border border-[#D6CEBE]'
              }`}
            >
              1
            </div>
            <span
              className={`text-[11px] font-semibold mt-1.5 whitespace-nowrap ${
                currentStep === 1 ? 'text-[#B83227]' : 'text-[#7A6E5F]'
              }`}
            >
              Hoàn Cảnh & Dáng Áo
            </span>
          </button>

          {/* Step 2 Pill */}
          <button
            onClick={() => setCurrentStep(2)}
            className="relative z-10 flex flex-col items-center group cursor-pointer"
          >
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-xs ${
                currentStep >= 2
                  ? 'bg-[#B83227] text-white ring-4 ring-[#FAF7F2]'
                  : 'bg-white text-[#7A6E5F] border border-[#D6CEBE]'
              }`}
            >
              2
            </div>
            <span
              className={`text-[11px] font-semibold mt-1.5 whitespace-nowrap ${
                currentStep === 2 ? 'text-[#B83227]' : 'text-[#7A6E5F]'
              }`}
            >
              Phong Cách Gen Z
            </span>
          </button>

          {/* Step 3 Pill */}
          <div className="relative z-10 flex flex-col items-center">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-xs ${
                currentStep === 3
                  ? 'bg-[#D4AF37] text-white ring-4 ring-[#FAF7F2]'
                  : 'bg-white text-[#7A6E5F] border border-[#D6CEBE]'
              }`}
            >
              3
            </div>
            <span
              className={`text-[11px] font-semibold mt-1.5 whitespace-nowrap ${
                currentStep === 3 ? 'text-[#D4AF37]' : 'text-[#7A6E5F]'
              }`}
            >
              Chiêm Ngưỡng & Xuất
            </span>
          </div>

        </div>
      </div>

      {/* ======================= BƯỚC 1: CHỌN HOÀN CẢNH & DÁNG ÁO ======================= */}
      {currentStep === 1 && (
        <div className="space-y-5 animate-in fade-in duration-300">
          <div>
            <h3 className="text-xl font-serif font-bold text-[#2C241D]">
              Bước 1: Bạn muốn mặc Cổ Phục trong dịp nào?
            </h3>
            <p className="text-xs text-[#5C5346] mt-1">
              Chọn bối cảnh thực tế của bạn, hệ thống sẽ đề xuất phom áo chuẩn nghi lễ và tiện dụng nhất.
            </p>
          </div>

          {/* 4 HERO CARDS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {OCCASIONS_DATA.map((occ) => {
              const isSelected = selectedOccasion === occ.id;
              return (
                <div
                  key={occ.id}
                  onClick={() => setSelectedOccasion(occ.id)}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between space-y-3 group hover:scale-[1.01] ${
                    isSelected
                      ? 'bg-[#B83227]/5 border-[#B83227] shadow-sm'
                      : 'bg-[#FAF7F2] border-[#EDE7DC] hover:border-[#D6CEBE]'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{occ.icon}</span>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                          isSelected
                            ? 'bg-[#B83227] text-white'
                            : 'bg-white text-[#7A6E5F] border border-[#EDE7DC]'
                        }`}
                      >
                        {occ.culturalTag}
                      </span>
                    </div>

                    <h4 className="text-base font-serif font-bold text-[#2C241D]">
                      {occ.title}
                    </h4>

                    <div className="text-xs text-[#1B3B6F] font-semibold">
                      Dáng áo: {occ.recommendedGarment}
                    </div>

                    <p className="text-xs text-[#5C5346] leading-relaxed">
                      {occ.description}
                    </p>
                  </div>

                  {/* Active Indicator Radio */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#EDE7DC]/70">
                    <span className="text-[11px] text-[#7A6E5F]">
                      {isSelected ? 'Đang chọn dịp này' : 'Bấm để chọn'}
                    </span>
                    <div
                      className={`w-4 h-4 rounded-full flex items-center justify-center border ${
                        isSelected
                          ? 'border-[#B83227] bg-[#B83227] text-white'
                          : 'border-[#D6CEBE] bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-2.5 h-2.5" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action to Step 2 */}
          <div className="flex justify-end pt-3">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-6 py-2.5 text-xs font-bold text-white bg-[#B83227] hover:bg-[#99261c] rounded-xl transition-all shadow-xs flex items-center gap-2 active:scale-95 cursor-pointer"
            >
              <span>Tiếp Tục Sang Bước 2</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ======================= BƯỚC 2: CHỌN PHONG CÁCH GEN Z ======================= */}
      {currentStep === 2 && (
        <div className="space-y-5 animate-in fade-in duration-300">
          <div>
            <h3 className="text-xl font-serif font-bold text-[#2C241D]">
              Bước 2: Chọn Gu Phối Đồ Thời Thượng (Personal Remix Vibe)
            </h3>
            <p className="text-xs text-[#5C5346] mt-1">
              Bạn thích hòa nhập cổ phục vào đời thường theo phong cách nào?
            </p>
          </div>

          {/* 3 VIBE CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {VIBES_DATA.map((vibe) => {
              const isSelected = selectedVibe === vibe.id;
              return (
                <div
                  key={vibe.id}
                  onClick={() => setSelectedVibe(vibe.id)}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between space-y-3.5 hover:scale-[1.01] ${
                    isSelected
                      ? 'bg-[#1B3B6F]/5 border-[#1B3B6F] shadow-sm'
                      : 'bg-[#FAF7F2] border-[#EDE7DC] hover:border-[#D6CEBE]'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{vibe.icon}</span>
                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center border ${
                          isSelected
                            ? 'border-[#1B3B6F] bg-[#1B3B6F] text-white'
                            : 'border-[#D6CEBE] bg-white'
                        }`}
                      >
                        {isSelected && <Check className="w-2.5 h-2.5" />}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-base font-serif font-bold text-[#2C241D]">
                        {vibe.title}
                      </h4>
                      <span className="text-[10px] text-[#7A6E5F] block uppercase tracking-wider">
                        {vibe.subtitle}
                      </span>
                    </div>

                    <p className="text-xs text-[#5C5346] leading-relaxed">
                      {vibe.description}
                    </p>

                    {/* Items chips list */}
                    <div className="pt-2 border-t border-[#EDE7DC] space-y-1.5">
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-[#7A6E5F] block">
                        Món đồ tự động phối kèm:
                      </span>
                      {vibe.items.map((it, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-1.5 text-[11px] text-[#2C241D] bg-white p-1.5 rounded-lg border border-[#EDE7DC]"
                        >
                          <span>{it.icon}</span>
                          <span className="truncate">{it.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-3 border-t border-[#EDE7DC]">
            <button
              onClick={() => setCurrentStep(1)}
              className="px-4 py-2 text-xs font-medium text-[#5C5346] hover:text-[#2C241D] bg-[#FAF7F2] hover:bg-[#EDE7DC] border border-[#D6CEBE] rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Quay Lại Bước 1</span>
            </button>

            <button
              onClick={handleGenerateOutfit}
              className="px-6 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#B83227] to-[#D4AF37] hover:brightness-110 rounded-xl transition-all shadow-md flex items-center gap-2 active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>Tạo Set Đồ Hoàn Mỹ ➔</span>
            </button>
          </div>
        </div>
      )}

      {/* ======================= BƯỚC 3: CHIÊM NGƯỠNG & XUẤT LOOKBOOK ======================= */}
      {currentStep === 3 && (
        <div className="space-y-5 animate-in fade-in duration-300">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Đã Phối Thành Công · 100% Chuẩn Ngũ Hành & Văn Hóa
              </span>
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#2C241D]">
              Bộ Phối: "{outfit.title}"
            </h3>
            <p className="text-xs text-[#5C5346] mt-0.5">
              Tất cả các món đồ và màu sắc tương sinh đã được tự động khoác lên nhân vật ở cột bên trái.
            </p>
          </div>

          {/* SUMMARY HERO CARD */}
          <div className="p-4 sm:p-5 bg-[#FAF7F2] rounded-2xl border border-[#D6CEBE] space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="p-3 bg-white rounded-xl border border-[#EDE7DC]">
                <span className="text-[10px] text-[#7A6E5F] uppercase tracking-wider block">
                  Dòng Cổ Phục
                </span>
                <span className="text-sm font-bold text-[#1B3B6F] font-serif block mt-0.5">
                  {GARMENTS[outfit.garmentId].name}
                </span>
                <span className="text-[11px] text-[#7A6E5F]">
                  {GARMENTS[outfit.garmentId].eraName}
                </span>
              </div>

              <div className="p-3 bg-white rounded-xl border border-[#EDE7DC]">
                <span className="text-[10px] text-[#7A6E5F] uppercase tracking-wider block">
                  Cặp Màu Ngũ Hành
                </span>
                <div className="flex items-center gap-1.5 mt-1">
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                    style={{ backgroundColor: outfit.mainColor.hex }}
                  />
                  <span className="text-xs font-semibold text-[#2C241D] truncate">
                    {outfit.mainColor.name} ({outfit.mainColor.fiveElements})
                  </span>
                </div>
                <span className="text-[10px] text-emerald-700 font-medium block mt-0.5">
                  {harmony.fiveElementsRelation}
                </span>
              </div>

              <div className="p-3 bg-white rounded-xl border border-[#EDE7DC]">
                <span className="text-[10px] text-[#7A6E5F] uppercase tracking-wider block">
                  Bối Cảnh & Ánh Sáng
                </span>
                <span className="text-xs font-bold text-[#2C241D] block mt-0.5 truncate">
                  {currentLandmark?.icon} {currentLandmark?.name.split(' (')[0]}
                </span>
                <span className="text-[10px] text-amber-700 font-medium block mt-0.5">
                  {currentLighting?.icon} {currentLighting?.name.split(' (')[0]}
                </span>
              </div>

              <div className="p-3 bg-white rounded-xl border border-[#EDE7DC]">
                <span className="text-[10px] text-[#7A6E5F] uppercase tracking-wider block">
                  Đánh Giá Di Sản
                </span>
                <span className="text-sm font-bold text-emerald-700 block mt-0.5 flex items-center gap-1">
                  <Check className="w-4 h-4 text-emerald-600" />
                  Chuẩn 100/100
                </span>
                <span className="text-[10px] text-[#7A6E5F]">
                  Vạt Hữu nhậm đoan chính
                </span>
              </div>
            </div>

            {/* AI STYLIST RATIONALE */}
            <div className="p-3 bg-white rounded-xl border border-[#EDE7DC] text-xs text-[#4A4036] flex items-start gap-2.5">
              <div className="w-6 h-6 rounded-lg bg-[#D4AF37]/20 text-[#B83227] flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <p className="leading-relaxed">
                <strong>Lời khuyên Stylist:</strong> {harmony.advice} Bộ đồ kết hợp hài hòa nét trang trọng truyền thống cùng các phụ kiện đương đại giúp bạn tự tin xuất hiện trước mọi ánh nhìn.
              </p>
            </div>
          </div>

          {/* SMART ACTION NAVIGATION BUTTONS */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-[#EDE7DC]">
            <button
              onClick={() => setCurrentStep(1)}
              className="w-full sm:w-auto px-4 py-2.5 text-xs font-medium text-[#5C5346] hover:text-[#2C241D] bg-[#FAF7F2] hover:bg-[#EDE7DC] border border-[#D6CEBE] rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Phối Lại Từ Đầu</span>
            </button>

            <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-2.5">
              <button
                onClick={onSwitchToStudio}
                className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-[#1B3B6F] bg-[#1B3B6F]/10 hover:bg-[#1B3B6F]/20 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                title="Giữ nguyên set đồ và mở Studio chuyên sâu để đổi màu, phụ kiện tùy thích"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Tùy Biến Thêm Trong Studio Chuyên Sâu</span>
              </button>

              <button
                onClick={onOpenLookbook}
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-white bg-[#B83227] hover:bg-[#99261c] rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Xuất Thẻ Lookbook (PNG)</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
