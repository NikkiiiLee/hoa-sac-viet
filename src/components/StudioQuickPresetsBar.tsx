import React from 'react';
import { OutfitConfig } from '../types/costume';
import { COLOR_PALETTE } from '../data/costumeData';
import { Sparkles, Check, Scale } from 'lucide-react';

interface StudioQuickPresetsBarProps {
  currentOutfit: OutfitConfig;
  onApplyPreset: (
    updates: Partial<OutfitConfig>,
    presetLabel: string
  ) => void;
  onOpenCompare?: () => void;
}

export const StudioQuickPresetsBar: React.FC<StudioQuickPresetsBarProps> = ({
  currentOutfit,
  onApplyPreset,
  onOpenCompare,
}) => {
  const colorXanhThienThanh =
    COLOR_PALETTE.find((c) => c.id === 'xanh_thien_thanh') || COLOR_PALETTE[3];
  const colorXanhCham =
    COLOR_PALETTE.find((c) => c.id === 'xanh_cham') || COLOR_PALETTE[4];
  const colorDoChuSa =
    COLOR_PALETTE.find((c) => c.id === 'do_chu_sa') || COLOR_PALETTE[0];
  const colorVangHoangYen =
    COLOR_PALETTE.find((c) => c.id === 'vang_hoang_yen') || COLOR_PALETTE[9];
  const colorTrangNga =
    COLOR_PALETTE.find((c) => c.id === 'bach_ngoc') || COLOR_PALETTE[12];

  const presets = [
    {
      id: 'preset_ky_yeu',
      icon: '🎓👘',
      title: 'Mẫu Kỷ Yếu (Lễ Phục)',
      subtitle: 'Áo Tấc Xanh Thiên Thanh + Sneaker Trắng + Văn Miếu',
      tag: 'Kỷ yếu học đường',
      isActive:
        currentOutfit.garmentId === 'ao_tac' &&
        currentOutfit.mainColor.id === 'xanh_thien_thanh' &&
        currentOutfit.selectedShoes === 'sneaker_retro',
      updates: {
        garmentId: 'ao_tac' as const,
        mainColor: colorXanhThienThanh,
        innerColor: colorTrangNga,
        bottomColor: colorTrangNga,
        lapelDirection: 'huu_nham' as const,
        isSleeveRolled: false,
        selectedBottom: 'quan_lua_ong_suong',
        selectedHeadwear: 'khan_dong',
        selectedShoes: 'sneaker_retro',
        selectedHandheld: 'quat_xep_giay_do',
        selectedOuterwear: 'none',
        backdropId: 'van_mieu' as const,
        lightingId: 'sang_som' as const,
        occasionId: 'tot_nghiep' as const,
      },
    },
    {
      id: 'preset_dao_pho',
      icon: '☕🧥',
      title: 'Mẫu Dạo Phố (Smart Casual)',
      subtitle: 'Áo Chẽn Xanh Chàm + Blazer Oversize + Túi Tote & Loafer',
      tag: 'Phố Cổ Hội An',
      isActive:
        currentOutfit.garmentId === 'ao_chen' &&
        currentOutfit.mainColor.id === 'xanh_cham' &&
        currentOutfit.selectedOuterwear === 'blazer_oversize',
      updates: {
        garmentId: 'ao_chen' as const,
        mainColor: colorXanhCham,
        innerColor: colorTrangNga,
        bottomColor: colorTrangNga,
        lapelDirection: 'huu_nham' as const,
        isSleeveRolled: false,
        selectedBottom: 'quan_lua_ong_suong',
        selectedHeadwear: 'kep_cang_cua',
        selectedShoes: 'loafer_da',
        selectedHandheld: 'tui_tote_canvas',
        selectedOuterwear: 'blazer_oversize',
        backdropId: 'pho_co_hoi_an' as const,
        lightingId: 'chieu_thu' as const,
        occasionId: 'dao_pho' as const,
      },
    },
    {
      id: 'preset_di_tet',
      icon: '🏮🪭',
      title: 'Mẫu Đi Tết (Du Xuân Rạng Rỡ)',
      subtitle: 'Áo Giao Lĩnh Đỏ Chu Sa x Vàng Hoàng Yến + Quạt Xếp Lụa',
      tag: 'Hoàng Thành Huế',
      isActive:
        currentOutfit.garmentId === 'ao_giao_linh' &&
        currentOutfit.mainColor.id === 'do_chu_sa' &&
        currentOutfit.innerColor.id === 'vang_hoang_yen',
      updates: {
        garmentId: 'ao_giao_linh' as const,
        mainColor: colorDoChuSa,
        innerColor: colorVangHoangYen,
        bottomColor: colorTrangNga,
        lapelDirection: 'huu_nham' as const,
        isSleeveRolled: false,
        selectedBottom: 'quan_lua_ong_suong',
        selectedHeadwear: 'khan_dong',
        selectedShoes: 'hai_theu_cung_dinh',
        selectedHandheld: 'quat_xep_giay_do',
        selectedOuterwear: 'none',
        backdropId: 'hoang_thanh_hue' as const,
        lightingId: 'nang_am' as const,
        occasionId: 'tet_dam_ngo' as const,
      },
    },
  ];

  const handleApplyPreset = (key: 'ky_yeu' | 'pho_co' | 'hoang_thanh') => {
    if (key === 'ky_yeu') {
      onApplyPreset(presets[0].updates, 'Mẫu Kỷ Yếu (Áo Tấc)');
    } else if (key === 'pho_co') {
      onApplyPreset(presets[1].updates, 'Mẫu Phố Cổ (Áo Chẽn)');
    } else if (key === 'hoang_thanh') {
      onApplyPreset(presets[2].updates, 'Mẫu Hoàng Thành (Giao Lĩnh)');
    }
  };

  const isKyYeuActive = presets[0].isActive;
  const isPhoCoActive = presets[1].isActive;
  const isHoangThanhActive = presets[2].isActive;

  return (
    /* KHỐI GỢI Ý MẪU 1-CHẠM (ĐÃ TỐI ƯU LAYOUT & TRÁNH TRÀN CHỮ) */
    <div className="mb-3 p-2.5 rounded-xl bg-white/75 backdrop-blur-sm border border-amber-200/70 shadow-xs">
      {/* Header của khối Preset */}
      <div className="flex items-center justify-between mb-2 px-0.5">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
          <span className="text-amber-500">⚡</span>
          <span className="font-display tracking-wide uppercase text-[11px] md:text-xs">Gợi Ý Mẫu 1-Chạm</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-amber-800/75 font-medium whitespace-nowrap bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/50 hidden sm:inline-block">
            Lên trọn bộ & bối cảnh
          </span>
          {onOpenCompare && (
            <button
              type="button"
              onClick={onOpenCompare}
              className="px-2.5 py-1 text-[11px] font-bold text-[#1B3B6F] bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-all flex items-center gap-1 shadow-2xs cursor-pointer active:scale-95"
              title="Mở Bảng So Sánh Đối Sánh (A/B Split View) – Nhân Đôi Mockup Trực Quan"
            >
              <Scale className="w-3.5 h-3.5 text-[#1B3B6F]" />
              <span>⚖️ So Sánh A/B</span>
            </button>
          )}
        </div>
      </div>

      {/* Lưới 3 thẻ mẫu: Cố định 3 cột đều nhau, chia 2 dòng chữ rõ ràng, KHÔNG CẮT DẤU BA CHẤM */}
      <div className="grid grid-cols-3 gap-1.5 md:gap-2">
        {/* Thẻ 1: Kỷ Yếu (Áo Tấc) */}
        <button
          type="button"
          onClick={() => handleApplyPreset('ky_yeu')}
          className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg border transition-all text-center group shadow-2xs cursor-pointer ${
            isKyYeuActive
              ? 'border-amber-500 ring-2 ring-amber-400/50 bg-amber-100/90'
              : 'border-amber-200/80 bg-amber-50/40 hover:bg-amber-100/70 hover:border-amber-400'
          }`}
          title="Mẫu Kỷ Yếu: Áo Tấc Xanh Thiên Thanh + Sneaker Trắng + Văn Miếu"
        >
          <span className="text-sm md:text-base mb-0.5 group-hover:scale-110 transition-transform">🎓</span>
          <span className="text-[11px] md:text-xs font-bold text-slate-900 group-hover:text-amber-900 leading-tight whitespace-nowrap">
            Kỷ Yếu
          </span>
          <span className="text-[10px] text-slate-500 font-medium leading-tight whitespace-nowrap">
            (Áo Tấc)
          </span>
        </button>

        {/* Thẻ 2: Phố Cổ (Áo Chẽn) */}
        <button
          type="button"
          onClick={() => handleApplyPreset('pho_co')}
          className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg border transition-all text-center group shadow-2xs cursor-pointer ${
            isPhoCoActive
              ? 'border-amber-500 ring-2 ring-amber-400/50 bg-amber-100/90'
              : 'border-amber-200/80 bg-amber-50/40 hover:bg-amber-100/70 hover:border-amber-400'
          }`}
          title="Mẫu Phố Cổ: Áo Chẽn Xanh Chàm + Blazer Oversize + Túi Tote & Hội An"
        >
          <span className="text-sm md:text-base mb-0.5 group-hover:scale-110 transition-transform">☕</span>
          <span className="text-[11px] md:text-xs font-bold text-slate-900 group-hover:text-amber-900 leading-tight whitespace-nowrap">
            Phố Cổ
          </span>
          <span className="text-[10px] text-slate-500 font-medium leading-tight whitespace-nowrap">
            (Áo Chẽn)
          </span>
        </button>

        {/* Thẻ 3: Hoàng Thành (Giao Lĩnh) */}
        <button
          type="button"
          onClick={() => handleApplyPreset('hoang_thanh')}
          className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg border transition-all text-center group shadow-2xs cursor-pointer ${
            isHoangThanhActive
              ? 'border-amber-500 ring-2 ring-amber-400/50 bg-amber-100/90'
              : 'border-amber-200/80 bg-amber-50/40 hover:bg-amber-100/70 hover:border-amber-400'
          }`}
          title="Mẫu Hoàng Thành: Áo Giao Lĩnh Đỏ Chu Sa x Vàng Hoàng Yến + Huế"
        >
          <span className="text-sm md:text-base mb-0.5 group-hover:scale-110 transition-transform">🏛️</span>
          <span className="text-[11px] md:text-xs font-bold text-slate-900 group-hover:text-amber-900 leading-tight whitespace-nowrap">
            Hoàng Thành
          </span>
          <span className="text-[10px] text-slate-500 font-medium leading-tight whitespace-nowrap">
            (Giao Lĩnh)
          </span>
        </button>
      </div>
    </div>
  );
};
