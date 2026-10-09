import React, { useState } from 'react';
import { GarmentId, OutfitConfig } from '../types/costume';
import { GARMENTS, COLOR_PALETTE } from '../data/costumeData';
import {
  BookOpen,
  ArrowRight,
  Sparkles,
  Layers,
  History,
  ShieldCheck,
  Compass,
  CheckCircle2,
} from 'lucide-react';

interface HeritageRepositoryProps {
  onSelectGarmentForStudio: (garmentId: GarmentId) => void;
}

type GarmentFamily = 'ngu_than' | 'ao_dai' | 'tu_than' | 'giao_linh';

export const HeritageRepository: React.FC<HeritageRepositoryProps> = ({
  onSelectGarmentForStudio,
}) => {
  const [activeFamily, setActiveFamily] = useState<GarmentFamily>('ngu_than');

  const families = [
    {
      id: 'ngu_than' as GarmentFamily,
      name: 'Họ Áo Ngũ Thân',
      tag: 'Triều Nguyễn (TK 19 - 20)',
      count: 'Áo Tấc & Áo Chẽn',
      desc: 'Quy chuẩn lễ nhạc và trang phục Nho gia đỉnh cao thời Nguyễn với 5 hạt khuy Ngũ Thường.',
      accent: 'border-[#B83227] text-[#B83227]',
    },
    {
      id: 'ao_dai' as GarmentFamily,
      name: 'Dòng Áo Dài',
      tag: 'Đô Thị Tân Thời - Nay',
      count: 'Truyền Thống & Cách Tân',
      desc: 'Biểu tượng quốc phục Việt Nam, dung hòa vẻ đẹp đoan trang cùng tinh thần phóng khoáng đương đại.',
      accent: 'border-[#1B3B6F] text-[#1B3B6F]',
    },
    {
      id: 'tu_than' as GarmentFamily,
      name: 'Dòng Áo Tứ Thân',
      tag: 'Dân Gian Bắc Bộ',
      count: 'Tứ Thân, Yếm & Nón Thao',
      desc: 'Vẻ đẹp mộc mạc, hiếu thảo và tình tứ của cư dân lúa nước châu thổ sông Hồng.',
      accent: 'border-[#D4AF37] text-[#B38022]',
    },
    {
      id: 'giao_linh' as GarmentFamily,
      name: 'Dòng Áo Giao Lĩnh',
      tag: 'Đại Việt (Lý - Trần - Lê)',
      count: 'Cổ Chéo Chữ V & Đại Đái',
      desc: 'Khí chất hào sảng, phóng khoáng và thượng võ của các triều đại hoàng kim nghìn năm văn hiến.',
      accent: 'border-[#2C5E43] text-[#2C5E43]',
    },
  ];

  // Mapping garments to families
  const familyGarments: Record<GarmentFamily, GarmentId[]> = {
    ngu_than: ['ao_tac', 'ao_chen'],
    ao_dai: ['ao_dai_truyen_thong', 'ao_dai_cach_tan'],
    tu_than: ['ao_tu_than'],
    giao_linh: ['ao_giao_linh'],
  };

  const currentGarments = familyGarments[activeFamily].map((id) => GARMENTS[id]);

  return (
    <div className="space-y-10 pb-16">
      {/* Header section */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B3B6F]/10 text-[#1B3B6F] text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Kho Tàng Thư Mục Tri Thức Cổ Phục</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-black text-[#2C241D] tracking-tight">
          Kho Tàng Di Sản & Triết Lý Dân Tộc
        </h1>
        <p className="text-sm sm:text-base text-[#5C5346] leading-relaxed">
          Tìm hiểu cội nguồn lịch sử, cấu trúc hình thể và ý nghĩa nhân sinh thâm
          sâu của 4 dòng cổ phục tiêu biểu từ thời Đại Việt đến đời sống Gen Z hôm
          nay.
        </p>
      </div>

      {/* 4 Family Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {families.map((f) => {
          const isActive = activeFamily === f.id;
          return (
            <button
              key={f.id}
              onClick={() => setActiveFamily(f.id)}
              className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                isActive
                  ? 'bg-white border-2 shadow-md ' + f.accent
                  : 'bg-white/70 border-[#EDE7DC] hover:border-[#D6CEBE] text-[#5C5346]'
              }`}
            >
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider block opacity-80">
                  {f.tag}
                </span>
                <h3 className="text-base sm:text-lg font-serif font-bold text-[#2C241D]">
                  {f.name}
                </h3>
              </div>
              <span className="text-[11px] font-medium mt-2 pt-2 border-t border-black/5 block opacity-90">
                {f.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Family Overview Banner */}
      <div className="p-6 bg-white rounded-3xl border border-[#D6CEBE] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-xl font-serif font-bold text-[#2C241D]">
            {families.find((f) => f.id === activeFamily)?.name}
          </h2>
          <p className="text-xs sm:text-sm text-[#5C5346]">
            {families.find((f) => f.id === activeFamily)?.desc}
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-[#1B3B6F] bg-[#FAF7F2] px-3.5 py-2 rounded-xl border border-[#EDE7DC] shrink-0">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Quy Chuẩn Hữu Nhậm Bảo Tồn</span>
        </div>
      </div>

      {/* Garments Detail Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {currentGarments.map((g) => (
          <div
            key={g.id}
            className="bg-white rounded-3xl border border-[#D6CEBE] shadow-sm hover:shadow-lg transition-all p-6 sm:p-8 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-6">
              {/* Header card */}
              <div className="flex items-start justify-between gap-3 border-b border-[#EDE7DC] pb-4">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#B83227] font-semibold block">
                    {g.eraName}
                  </span>
                  <h3 className="text-2xl font-serif font-black text-[#2C241D] mt-1">
                    {g.name}
                  </h3>
                </div>
                <span className="px-2.5 py-1 bg-[#FAF7F2] text-[#1B3B6F] text-xs font-medium rounded-lg border border-[#EDE7DC] shrink-0">
                  {g.category}
                </span>
              </div>

              {/* Silhouette description */}
              <div className="space-y-2">
                <span className="text-xs uppercase font-bold text-[#7A6E5F] tracking-wide block">
                  Đặc Điểm Hình Thể & Phom Dáng
                </span>
                <p className="text-xs sm:text-sm text-[#2C241D] leading-relaxed">
                  {g.silhouetteDescription}
                </p>
              </div>

              {/* Key Features Bullet List */}
              <div className="space-y-2 bg-[#FAF7F2] p-4 rounded-2xl border border-[#EDE7DC]">
                <span className="text-xs uppercase font-bold text-[#1B3B6F] tracking-wide block">
                  Đặc Trưng Kết Cấu:
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#5C5346]">
                  {g.keyFeatures.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cultural Philosophy */}
              <div className="space-y-2">
                <span className="text-xs uppercase font-bold text-[#B83227] tracking-wide flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5" />
                  <span>{g.culturalPhilosophy.title}</span>
                </span>
                <p className="text-xs sm:text-sm text-[#5C5346] leading-relaxed">
                  {g.culturalPhilosophy.detail}
                </p>
                <div className="p-3 bg-amber-50/70 border border-amber-200/70 rounded-xl text-xs text-amber-900 leading-relaxed font-medium">
                  <strong>Ý nghĩa bảo tồn:</strong> {g.culturalPhilosophy.significance}
                </div>
              </div>

              {/* Recommended Pairings */}
              <div className="space-y-1.5 pt-2">
                <span className="text-xs font-semibold text-[#7A6E5F] block">
                  Gợi Ý Phối Remix Gen Z:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {g.recommendedPairings.map((p, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-white border border-[#D6CEBE] text-[#2C241D] text-[11px] rounded-lg shadow-2xs"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Button: Load into Studio */}
            <div className="pt-4 border-t border-[#EDE7DC]">
              <button
                onClick={() => onSelectGarmentForStudio(g.id)}
                className="w-full py-3 px-4 text-xs sm:text-sm font-bold text-white bg-[#1B3B6F] hover:bg-[#142d54] active:scale-98 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Đưa {g.name} Vào Studio Phối Đồ Ngay</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
