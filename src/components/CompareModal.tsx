import React, { useState, useEffect } from 'react';
import { OutfitConfig, GarmentId } from '../types/costume';
import { GARMENTS, COLOR_PALETTE, ACCESSORIES, calculateColorHarmony, checkHeritageRules } from '../data/costumeData';
import { CostumeSvgView } from './CostumeSvgView';
import { LandmarkBackdrop } from './LandmarkBackdrop';
import {
  X,
  Check,
  Sparkles,
  Scale,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  Shirt,
  Layers,
  Copy,
  ArrowRightLeft,
  RotateCcw,
} from 'lucide-react';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentOutfit: OutfitConfig;
  onApplyPreset: (updates: Partial<OutfitConfig>) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  isOpen,
  onClose,
  currentOutfit,
  onApplyPreset,
}) => {
  // State for Outfit A (Initialized to cloned currentOutfit)
  const [outfitA, setOutfitA] = useState<OutfitConfig>(() => ({
    ...currentOutfit,
    id: 'compare-a',
    title: `Mockup A (${GARMENTS[currentOutfit.garmentId]?.name || 'Trang Phục Hiện Tại'})`,
  }));

  // State for Outfit B (Cloned duplicate with an alternative garment to compare 2 kinds of garments)
  const [outfitB, setOutfitB] = useState<OutfitConfig>(() => {
    const altGarmentId: GarmentId =
      currentOutfit.garmentId === 'ao_tac' ? 'ao_chen' :
      currentOutfit.garmentId === 'ao_chen' ? 'ao_tac' :
      currentOutfit.garmentId === 'ao_tu_than' ? 'ao_giao_linh' :
      currentOutfit.garmentId === 'ao_giao_linh' ? 'ao_tac' : 'ao_chen';

    return {
      ...currentOutfit,
      id: 'compare-b',
      title: `Mockup B (${GARMENTS[altGarmentId]?.name || 'Áo So Sánh'})`,
      garmentId: altGarmentId,
    };
  });

  // When CompareModal opens, automatically duplicate currentOutfit into Outfit A and an alternative into Outfit B
  useEffect(() => {
    if (isOpen) {
      setOutfitA({
        ...currentOutfit,
        id: 'compare-a',
        title: `Mockup A (${GARMENTS[currentOutfit.garmentId]?.name || 'Trang Phục Hiện Tại'})`,
      });

      const altGarmentId: GarmentId =
        currentOutfit.garmentId === 'ao_tac' ? 'ao_chen' :
        currentOutfit.garmentId === 'ao_chen' ? 'ao_tac' :
        currentOutfit.garmentId === 'ao_tu_than' ? 'ao_giao_linh' :
        currentOutfit.garmentId === 'ao_giao_linh' ? 'ao_tac' : 'ao_chen';

      setOutfitB({
        ...currentOutfit,
        id: 'compare-b',
        title: `Mockup B (${GARMENTS[altGarmentId]?.name || 'Áo So Sánh'})`,
        garmentId: altGarmentId,
      });
    }
  }, [isOpen, currentOutfit]);

  if (!isOpen) return null;

  const garmentA = GARMENTS[outfitA.garmentId];
  const garmentB = GARMENTS[outfitB.garmentId];

  const harmonyA = calculateColorHarmony(outfitA.mainColor, outfitA.innerColor, outfitA.bottomColor);
  const harmonyB = calculateColorHarmony(outfitB.mainColor, outfitB.innerColor, outfitB.bottomColor);

  const violationsA = checkHeritageRules(outfitA);
  const violationsB = checkHeritageRules(outfitB);

  const getAccessoryName = (id: string) => {
    return ACCESSORIES.find((a) => a.id === id)?.name || id;
  };

  // Actions: Clone A to B, Swap A and B, Reset from Studio
  const handleCloneAToB = () => {
    setOutfitB({
      ...outfitA,
      id: 'compare-b',
      title: `Bản Sao từ Mockup A (${garmentA.name})`,
    });
  };

  const handleSwapAAndB = () => {
    const tempA = { ...outfitA };
    setOutfitA({ ...outfitB, id: 'compare-a' });
    setOutfitB({ ...tempA, id: 'compare-b' });
  };

  const handleSyncFromStudio = () => {
    setOutfitA({
      ...currentOutfit,
      id: 'compare-a',
      title: `Mockup A (${GARMENTS[currentOutfit.garmentId]?.name || 'Trang Phục Hiện Tại'})`,
    });
  };

  // Garment options for quick switching
  const GARMENT_OPTIONS: { id: GarmentId; label: string; badge: string }[] = [
    { id: 'ao_chen', label: 'Áo Ngũ Thân Tay Chẽn', badge: 'Triều Nguyễn' },
    { id: 'ao_tac', label: 'Áo Tay Thụng (Áo Tấc)', badge: 'Đại Lễ Phục' },
    { id: 'ao_tu_than', label: 'Áo Tứ Thân', badge: 'Dân Gian' },
    { id: 'ao_giao_linh', label: 'Áo Giao Lĩnh', badge: 'Đại Việt' },
    { id: 'ao_dai_truyen_thong', label: 'Áo Dài Cổ Truyền', badge: 'Thế kỷ 20' },
    { id: 'ao_dai_cach_tan', label: 'Áo Dài Cách Tân', badge: 'Gen Z Remix' },
  ];

  // Quick preset toggles for A
  const setPresetTraditionalHue = () => {
    setOutfitA((prev) => ({
      ...prev,
      garmentId: 'ao_tac',
      mainColor: COLOR_PALETTE.find((c) => c.id === 'xanh_cham') || prev.mainColor,
      innerColor: COLOR_PALETTE.find((c) => c.id === 'bach_ngoc') || prev.innerColor,
      bottomColor: COLOR_PALETTE.find((c) => c.id === 'bach_ngoc') || prev.bottomColor,
      selectedBottom: 'quan_lua_ong_suong',
      selectedHeadwear: 'khan_dong',
      selectedGlasses: 'none',
      selectedShoes: 'hai_theu_cung_dinh',
      selectedHandheld: 'quat_xep_giay_do',
      selectedOuterwear: 'none',
      lapelDirection: 'huu_nham',
    }));
  };

  const setPresetTuThanBacBo = () => {
    setOutfitA((prev) => ({
      ...prev,
      garmentId: 'ao_tu_than',
      mainColor: COLOR_PALETTE.find((c) => c.id === 'nau_dat_nung') || prev.mainColor,
      innerColor: COLOR_PALETTE.find((c) => c.id === 'hong_tham') || prev.innerColor,
      bottomColor: COLOR_PALETTE.find((c) => c.id === 'den_huyen') || prev.bottomColor,
      selectedBottom: 'vay_dup_tham',
      selectedHeadwear: 'non_quai_thao',
      selectedGlasses: 'none',
      selectedShoes: 'sandal_quai_manh',
      selectedHandheld: 'none',
      selectedOuterwear: 'none',
      lapelDirection: 'huu_nham',
    }));
  };

  // Quick preset toggles for B
  const setPresetRemixBlazer = () => {
    setOutfitB((prev) => ({
      ...prev,
      garmentId: 'ao_chen',
      mainColor: COLOR_PALETTE.find((c) => c.id === 'sage_remix') || prev.mainColor,
      innerColor: COLOR_PALETTE.find((c) => c.id === 'bach_ngoc') || prev.innerColor,
      bottomColor: COLOR_PALETTE.find((c) => c.id === 'beige_remix') || prev.bottomColor,
      selectedBottom: 'chan_vay_midi_xep_ly',
      selectedHeadwear: 'bom_nhung',
      selectedGlasses: 'kinh_kim_loai',
      selectedShoes: 'sneaker_retro',
      selectedHandheld: 'tui_tote_canvas',
      selectedOuterwear: 'blazer_oversize',
      lapelDirection: 'huu_nham',
    }));
  };

  const setPresetRemixAoDai = () => {
    setOutfitB((prev) => ({
      ...prev,
      garmentId: 'ao_dai_cach_tan',
      mainColor: COLOR_PALETTE.find((c) => c.id === 'cam_dat_terracotta') || prev.mainColor,
      innerColor: COLOR_PALETTE.find((c) => c.id === 'bach_ngoc') || prev.innerColor,
      bottomColor: COLOR_PALETTE.find((c) => c.id === 'bach_ngoc') || prev.bottomColor,
      selectedBottom: 'chan_vay_midi_xep_ly',
      selectedHeadwear: 'kep_cang_cua',
      selectedGlasses: 'kinh_kim_loai',
      selectedShoes: 'mary_jane',
      selectedHandheld: 'tui_tote_canvas',
      selectedOuterwear: 'none',
      lapelDirection: 'huu_nham',
    }));
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl bg-[#FAF7F2] rounded-3xl border border-[#D6CEBE] shadow-2xl overflow-hidden max-h-[95vh] flex flex-col">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E3DAC9] bg-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#1B3B6F]/10 text-[#1B3B6F] flex items-center justify-center">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-serif font-bold text-[#2C241D]">
                So Sánh Đối Sánh (A/B Split View) – Nhân Đôi Mockup Trực Quan
              </h3>
              <p className="text-[11px] text-[#7A6E5F]">
                Đối chiếu trực tiếp 2 hình ảnh mockup trang phục cùng một lúc để thẩm định phom dáng và tính ứng dụng
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Gender Sync */}
            <div className="hidden sm:flex items-center gap-1 bg-[#FAF7F2] p-1 rounded-xl border border-[#EDE7DC] text-xs">
              <span className="text-[11px] text-[#7A6E5F] px-1.5">Giới tính:</span>
              <button
                onClick={() => {
                  setOutfitA((prev) => ({
                    ...prev,
                    gender: 'male',
                    selectedBottom: prev.selectedBottom.includes('vay') ? 'quan_lua_ong_suong' : prev.selectedBottom,
                  }));
                  setOutfitB((prev) => ({
                    ...prev,
                    gender: 'male',
                    selectedBottom: prev.selectedBottom.includes('vay') ? 'quan_lua_ong_suong' : prev.selectedBottom,
                  }));
                }}
                className={`px-2 py-0.5 rounded-lg text-xs font-medium cursor-pointer ${
                  outfitA.gender === 'male' ? 'bg-[#1B3B6F] text-white shadow-xs' : 'text-[#5C5346]'
                }`}
              >
                👨 Nam
              </button>
              <button
                onClick={() => {
                  setOutfitA((prev) => ({ ...prev, gender: 'female' }));
                  setOutfitB((prev) => ({ ...prev, gender: 'female' }));
                }}
                className={`px-2 py-0.5 rounded-lg text-xs font-medium cursor-pointer ${
                  outfitA.gender === 'female' ? 'bg-[#B83227] text-white shadow-xs' : 'text-[#5C5346]'
                }`}
              >
                👩 Nữ
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-[#7A6E5F] hover:text-[#2C241D] hover:bg-[#FAF7F2] rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* QUICK SYNC & DUAL MOCKUP ACTIONS TOOLBAR */}
        <div className="bg-[#F4EFE6] px-4 sm:px-6 py-2.5 border-b border-[#E3DAC9] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-[#5C5346]">Đang đối chiếu:</span>
            <span className="px-2.5 py-1 bg-white border border-[#1B3B6F]/30 rounded-lg font-bold text-[#1B3B6F] text-xs shadow-xs">
              Mockup A: {garmentA.name}
            </span>
            <span className="text-[#8D5B4C] font-black">⇄</span>
            <span className="px-2.5 py-1 bg-white border border-[#B83227]/30 rounded-lg font-bold text-[#B83227] text-xs shadow-xs">
              Mockup B: {garmentB.name}
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleCloneAToB}
              className="px-3 py-1.5 bg-white hover:bg-[#EDE7DC] text-[#1B3B6F] border border-[#D6CEBE] rounded-xl transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer shadow-xs active:scale-95"
              title="Nhân đôi toàn bộ mockup A sang mockup B"
            >
              <Copy className="w-3.5 h-3.5 text-[#1B3B6F]" />
              <span>Nhân đôi (A → B)</span>
            </button>
            <button
              onClick={handleSwapAAndB}
              className="px-3 py-1.5 bg-white hover:bg-[#EDE7DC] text-[#8D5B4C] border border-[#D6CEBE] rounded-xl transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer shadow-xs active:scale-95"
              title="Đổi chỗ hai mockup"
            >
              <ArrowRightLeft className="w-3.5 h-3.5 text-[#8D5B4C]" />
              <span>Hoán đổi (A ⇄ B)</span>
            </button>
            <button
              onClick={handleSyncFromStudio}
              className="px-3 py-1.5 bg-white hover:bg-[#EDE7DC] text-[#5C5346] border border-[#D6CEBE] rounded-xl transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer shadow-xs active:scale-95"
              title="Lấy lại cấu hình từ Studio"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#5C5346]" />
              <span>Lấy từ Studio</span>
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body: DUAL MOCKUPS SIDE-BY-SIDE */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          
          {/* THE DUAL MOCKUP SPLIT VIEW GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            
            {/* ===================== CỘT A: MOCKUP A ===================== */}
            <div className="p-4 sm:p-5 bg-white rounded-2xl border-2 border-[#1B3B6F]/40 shadow-sm space-y-4 relative flex flex-col justify-between">
              
              {/* Header Cột A */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1B3B6F]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#1B3B6F]">
                      MOCKUP A · {garmentA.name.toUpperCase()}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-white bg-[#1B3B6F] px-2 py-0.5 rounded-md">
                    {garmentA.eraName}
                  </span>
                </div>

                {/* Garment Selector Pills for Column A */}
                <div>
                  <span className="text-[11px] text-[#7A6E5F] font-semibold block mb-1">
                    Chọn loại cổ phục cho Mockup A:
                  </span>
                  <div className="grid grid-cols-3 gap-1.5">
                    {GARMENT_OPTIONS.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setOutfitA((prev) => ({ ...prev, garmentId: opt.id }))}
                        className={`px-2 py-1.5 rounded-lg text-[11px] font-medium transition-all text-center truncate cursor-pointer ${
                          outfitA.garmentId === opt.id
                            ? 'bg-[#1B3B6F] text-white shadow-xs font-bold'
                            : 'bg-[#FAF7F2] text-[#5C5346] border border-[#EDE7DC] hover:border-[#1B3B6F]'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color swatches for Outfit A */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-[#7A6E5F]">Đổi màu áo:</span>
                  <div className="flex items-center gap-1.5">
                    {COLOR_PALETTE.slice(0, 6).map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setOutfitA((prev) => ({ ...prev, mainColor: c }))}
                        style={{ backgroundColor: c.hex }}
                        title={`${c.name} (${c.fiveElements})`}
                        className={`w-5 h-5 rounded-full border border-black/20 transition-transform cursor-pointer ${
                          outfitA.mainColor.id === c.id ? 'ring-2 ring-[#1B3B6F] scale-110' : 'hover:scale-105'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* DYNAMIC SVG MOCKUP A CANVAS */}
              <div className="w-full h-[320px] sm:h-[350px] rounded-2xl border border-[#D6CEBE] p-2 flex items-center justify-center relative overflow-hidden shadow-inner">
                {/* Visualizer Backdrop Render */}
                <LandmarkBackdrop
                  landmarkId={outfitA.backdropId || 'van_mieu'}
                  lightingId={outfitA.lightingId || 'nang_am'}
                  isMiniPreview={true}
                />

                {/* Visualizer SVG Render */}
                <CostumeSvgView outfit={outfitA} className="w-full h-full max-h-[340px] relative z-10" />

                {/* Badge Overlay */}
                <div className="absolute top-2 left-2 z-20 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-md border border-[#D6CEBE] text-[10px] font-semibold text-[#1B3B6F]">
                  {garmentA.name}
                </div>
                {violationsA.length > 0 && (
                  <div className="absolute top-2 right-2 z-20 bg-[#B83227] text-white px-2 py-0.5 rounded-md text-[10px] font-bold">
                    ⚠️ {violationsA.length} Cảnh Báo
                  </div>
                )}
              </div>

              {/* Scores & Key Breakdown */}
              <div className="space-y-3 pt-1">
                {/* Score Indicators */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 bg-[#FAF7F2] rounded-xl border border-[#EDE7DC]">
                    <span className="text-[10px] text-[#7A6E5F] block uppercase tracking-wider">
                      Độ Trang Nghiêm
                    </span>
                    <span className="text-base font-bold text-[#1B3B6F] font-serif">
                      {outfitA.garmentId === 'ao_tac' ? '100 / 100' : outfitA.garmentId === 'ao_chen' ? '85 / 100' : '80 / 100'}
                    </span>
                  </div>
                  <div className="p-2 bg-[#FAF7F2] rounded-xl border border-[#EDE7DC]">
                    <span className="text-[10px] text-[#7A6E5F] block uppercase tracking-wider">
                      Hòa Sắc Ngũ Hành
                    </span>
                    <span className="text-base font-bold text-[#8D5B4C] font-serif">
                      {harmonyA.score} / 100
                    </span>
                  </div>
                </div>

                {/* Specifications Checklist */}
                <div className="space-y-1 text-[11px] text-[#4A4036] border-t border-[#EDE7DC] pt-2.5">
                  <div className="flex justify-between">
                    <span className="text-[#7A6E5F]">Áo chính:</span>
                    <span className="font-semibold text-[#2C241D]">{outfitA.mainColor.name} ({outfitA.mainColor.fiveElements})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7A6E5F]">Phom dáng:</span>
                    <span className="font-medium text-[#2C241D]">
                      {garmentA.sleeveType === 'chen' ? 'Tay Chẽn (Tiện Dụng)' : garmentA.sleeveType === 'thung' ? 'Tay Thụng (Trang Nghiêm)' : 'Tay Suông Phóng Khoáng'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7A6E5F]">Vạt áo:</span>
                    <span className="font-semibold text-emerald-800">
                      {outfitA.lapelDirection === 'huu_nham' ? 'Hữu Nhậm (Chuẩn lễ nhạc)' : 'Tả Nhậm (Tang phục)'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7A6E5F]">Trang phục dưới:</span>
                    <span className="font-medium text-[#2C241D]">{getAccessoryName(outfitA.selectedBottom)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7A6E5F]">Tương sinh / khắc:</span>
                    <span className="font-semibold text-[#1B3B6F]">{harmonyA.scheme}</span>
                  </div>
                </div>
              </div>

              {/* 1-Click Apply Button A */}
              <button
                onClick={() => {
                  onApplyPreset(outfitA);
                  onClose();
                }}
                className="w-full py-2.5 text-xs font-bold text-white bg-[#1B3B6F] hover:bg-[#152e57] rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer mt-2"
              >
                <Check className="w-3.5 h-3.5" />
                Áp Dụng Mockup A Vào Studio
              </button>
            </div>

            {/* ===================== CỘT B: MOCKUP B ===================== */}
            <div className="p-4 sm:p-5 bg-white rounded-2xl border-2 border-[#B83227]/40 shadow-sm space-y-4 relative flex flex-col justify-between">
              
              {/* Header Cột B */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#B83227]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#B83227]">
                      MOCKUP B · {garmentB.name.toUpperCase()}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-white bg-[#B83227] px-2 py-0.5 rounded-md">
                    {garmentB.eraName}
                  </span>
                </div>

                {/* Garment Selector Pills for Column B */}
                <div>
                  <span className="text-[11px] text-[#7A6E5F] font-semibold block mb-1">
                    Chọn loại cổ phục cho Mockup B:
                  </span>
                  <div className="grid grid-cols-3 gap-1.5">
                    {GARMENT_OPTIONS.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setOutfitB((prev) => ({ ...prev, garmentId: opt.id }))}
                        className={`px-2 py-1.5 rounded-lg text-[11px] font-medium transition-all text-center truncate cursor-pointer ${
                          outfitB.garmentId === opt.id
                            ? 'bg-[#B83227] text-white shadow-xs font-bold'
                            : 'bg-[#FAF7F2] text-[#5C5346] border border-[#EDE7DC] hover:border-[#B83227]'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color swatches for Outfit B */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-[#7A6E5F]">Đổi màu áo:</span>
                  <div className="flex items-center gap-1.5">
                    {COLOR_PALETTE.slice(0, 6).map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setOutfitB((prev) => ({ ...prev, mainColor: c }))}
                        style={{ backgroundColor: c.hex }}
                        title={`${c.name} (${c.fiveElements})`}
                        className={`w-5 h-5 rounded-full border border-black/20 transition-transform cursor-pointer ${
                          outfitB.mainColor.id === c.id ? 'ring-2 ring-[#B83227] scale-110' : 'hover:scale-105'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* DYNAMIC SVG MOCKUP B CANVAS */}
              <div className="w-full h-[320px] sm:h-[350px] bg-gradient-to-b from-[#F7F4EE] to-[#EAE3D4] rounded-2xl border border-[#D6CEBE] p-2 flex items-center justify-center relative overflow-hidden shadow-inner">
                {/* Visualizer SVG Render */}
                <CostumeSvgView outfit={outfitB} className="w-full h-full max-h-[340px]" />

                {/* Badge Overlay */}
                <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-md border border-[#D6CEBE] text-[10px] font-semibold text-[#B83227]">
                  {garmentB.name}
                </div>
                {outfitB.selectedOuterwear === 'blazer_oversize' && (
                  <div className="absolute bottom-2 left-2 bg-[#2A2A2E] text-white px-2 py-0.5 rounded-md text-[9px] font-medium shadow-xs">
                    + Blazer Oversize
                  </div>
                )}
                {violationsB.length > 0 && (
                  <div className="absolute top-2 right-2 bg-[#B83227] text-white px-2 py-0.5 rounded-md text-[10px] font-bold">
                    ⚠️ {violationsB.length} Cảnh Báo
                  </div>
                )}
              </div>

              {/* Scores & Key Breakdown */}
              <div className="space-y-3 pt-1">
                {/* Score Indicators */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 bg-[#FAF7F2] rounded-xl border border-[#EDE7DC]">
                    <span className="text-[10px] text-[#7A6E5F] block uppercase tracking-wider">
                      Độ Trang Nghiêm
                    </span>
                    <span className="text-base font-bold text-[#1B3B6F] font-serif">
                      {outfitB.garmentId === 'ao_tac' ? '100 / 100' : outfitB.garmentId === 'ao_chen' ? '85 / 100' : '80 / 100'}
                    </span>
                  </div>
                  <div className="p-2 bg-[#FAF7F2] rounded-xl border border-[#EDE7DC]">
                    <span className="text-[10px] text-[#7A6E5F] block uppercase tracking-wider">
                      Hòa Sắc Ngũ Hành
                    </span>
                    <span className="text-base font-bold text-emerald-700 font-serif">
                      {harmonyB.score} / 100
                    </span>
                  </div>
                </div>

                {/* Specifications Checklist */}
                <div className="space-y-1 text-[11px] text-[#4A4036] border-t border-[#EDE7DC] pt-2.5">
                  <div className="flex justify-between">
                    <span className="text-[#7A6E5F]">Áo chính:</span>
                    <span className="font-semibold text-[#2C241D]">{outfitB.mainColor.name} ({outfitB.mainColor.fiveElements})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7A6E5F]">Phom dáng:</span>
                    <span className="font-medium text-[#2C241D]">
                      {garmentB.sleeveType === 'chen' ? 'Tay Chẽn (Tiện Dụng)' : garmentB.sleeveType === 'thung' ? 'Tay Thụng (Trang Nghiêm)' : 'Tay Suông Phóng Khoáng'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7A6E5F]">Vạt áo:</span>
                    <span className="font-semibold text-emerald-800">
                      {outfitB.lapelDirection === 'huu_nham' ? 'Hữu Nhậm (Chuẩn lễ nhạc)' : 'Tả Nhậm (Tang phục)'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7A6E5F]">Trang phục dưới:</span>
                    <span className="font-medium text-[#2C241D]">{getAccessoryName(outfitB.selectedBottom)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7A6E5F]">Tương sinh / khắc:</span>
                    <span className="font-semibold text-[#B83227]">{harmonyB.scheme}</span>
                  </div>
                </div>
              </div>

              {/* 1-Click Apply Button B */}
              <button
                onClick={() => {
                  onApplyPreset(outfitB);
                  onClose();
                }}
                className="w-full py-2.5 text-xs font-bold text-white bg-[#B83227] hover:bg-[#99261c] rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer mt-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Áp Dụng Mockup B Vào Studio
              </button>
            </div>

          </div>

          {/* DETAILED PARAMETER MATRIX TABLE */}
          <div className="bg-white rounded-2xl border border-[#D6CEBE] overflow-hidden shadow-xs">
            <div className="px-5 py-3 border-b border-[#EDE7DC] bg-[#FAF7F2] flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2C241D]">
                Bảng Đối Chiếu Thông Số Toàn Diện Giữa Hai Dòng Cổ Phục
              </span>
              <span className="text-[11px] text-[#7A6E5F] font-semibold">
                {garmentA.name} VS {garmentB.name}
              </span>
            </div>

            <div className="divide-y divide-[#EDE7DC] text-xs">
              <div className="grid grid-cols-12 p-3.5 gap-3">
                <span className="col-span-3 font-semibold text-[#7A6E5F]">Cổ Áo & Cấu Trúc:</span>
                <span className="col-span-4 text-[#2C241D] font-medium">
                  {garmentA.lapelType === 'lap_linh' ? 'Cổ đứng Lập lĩnh 5 khuy' : garmentA.lapelType === 'giao_linh' ? 'Cổ Giao lĩnh chéo vạt' : 'Cổ tròn khép kín'} · {garmentA.sleeveType === 'thung' ? 'Tay thụng rộng' : 'Tay chẽn'}
                </span>
                <span className="col-span-5 text-[#2C241D] font-medium">
                  {garmentB.lapelType === 'lap_linh' ? 'Cổ đứng Lập lĩnh 5 khuy' : garmentB.lapelType === 'giao_linh' ? 'Cổ Giao lĩnh chéo vạt' : 'Cổ tròn khép kín'} · {garmentB.sleeveType === 'thung' ? 'Tay thụng rộng' : 'Tay chẽn'}
                </span>
              </div>

              <div className="grid grid-cols-12 p-3.5 gap-3 bg-[#FAF7F2]/50">
                <span className="col-span-3 font-semibold text-[#7A6E5F]">Mô Tả Phom Dáng:</span>
                <span className="col-span-4 text-[#5C5346] leading-relaxed">{garmentA.silhouetteDescription}</span>
                <span className="col-span-5 text-[#5C5346] leading-relaxed">{garmentB.silhouetteDescription}</span>
              </div>

              <div className="grid grid-cols-12 p-3.5 gap-3">
                <span className="col-span-3 font-semibold text-[#7A6E5F]">Ý Nghĩa Triết Lý:</span>
                <span className="col-span-4 text-[#1B3B6F] font-semibold">{garmentA.culturalPhilosophy.title}: <span className="font-normal text-[#5C5346]">{garmentA.culturalPhilosophy.detail}</span></span>
                <span className="col-span-5 text-[#B83227] font-semibold">{garmentB.culturalPhilosophy.title}: <span className="font-normal text-[#5C5346]">{garmentB.culturalPhilosophy.detail}</span></span>
              </div>

              <div className="grid grid-cols-12 p-3.5 gap-3 bg-[#FAF7F2]/50">
                <span className="col-span-3 font-semibold text-[#7A6E5F]">Đặc Trưng Nổi Bật:</span>
                <span className="col-span-4 text-[#2C241D]">{garmentA.keyFeatures.slice(0, 2).join(' · ')}</span>
                <span className="col-span-5 text-[#2C241D]">{garmentB.keyFeatures.slice(0, 2).join(' · ')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-white border-t border-[#E3DAC9] flex items-center justify-between text-xs text-[#7A6E5F]">
          <span>So sánh trực quan song song giúp người dùng dễ dàng cảm nhận sự chuyển mình của cổ phục Việt.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 font-medium text-[#2C241D] bg-[#FAF7F2] hover:bg-[#EDE7DC] border border-[#D6CEBE] rounded-xl transition-colors"
          >
            Đóng Bảng So Sánh
          </button>
        </div>
      </div>
    </div>
  );
};
