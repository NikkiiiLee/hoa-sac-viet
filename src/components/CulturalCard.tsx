import React, { useState } from 'react';
import { GarmentInfo } from '../types/costume';
import { BookOpen, Sparkles, Compass, Feather } from 'lucide-react';

interface CulturalCardProps {
  garment: GarmentInfo;
}

export const CulturalCard: React.FC<CulturalCardProps> = ({ garment }) => {
  const [activeTab, setActiveTab] = useState<'philosophy' | 'structure' | 'pairing'>('philosophy');

  return (
    <div className="bg-white rounded-2xl border border-[#D6CEBE] p-4 lg:p-5 shadow-xs space-y-3.5">
      {/* Card Header */}
      <div className="flex items-center justify-between border-b border-[#EDE7DC] pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] border border-[#D6CEBE] flex items-center justify-center text-[#B83227]">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#7A6E5F] block">
              Góc Di Sản & Triết Lý Nhân Sinh
            </span>
            <h3 className="text-base font-serif font-bold text-[#2C241D]">
              {garment.culturalPhilosophy.title}
            </h3>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 p-1 bg-[#FAF7F2] rounded-xl border border-[#EDE7DC]">
          <button
            onClick={() => setActiveTab('philosophy')}
            className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors ${
              activeTab === 'philosophy'
                ? 'bg-white text-[#1B3B6F] shadow-xs'
                : 'text-[#7A6E5F] hover:text-[#2C241D]'
            }`}
          >
            Ý Nghĩa
          </button>
          <button
            onClick={() => setActiveTab('structure')}
            className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors ${
              activeTab === 'structure'
                ? 'bg-white text-[#1B3B6F] shadow-xs'
                : 'text-[#7A6E5F] hover:text-[#2C241D]'
            }`}
          >
            Cấu Trúc
          </button>
          <button
            onClick={() => setActiveTab('pairing')}
            className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors ${
              activeTab === 'pairing'
                ? 'bg-white text-[#1B3B6F] shadow-xs'
                : 'text-[#7A6E5F] hover:text-[#2C241D]'
            }`}
          >
            Gợi Ý Phối
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'philosophy' && (
        <div className="space-y-2 text-xs leading-relaxed text-[#4A4036]">
          <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EDE7DC]">
            <p className="font-medium text-[#1B3B6F] mb-1">
              "{garment.culturalPhilosophy.summary}"
            </p>
            <p className="text-[#5C5346]">
              {garment.culturalPhilosophy.detail}
            </p>
          </div>

          <div className="flex items-start gap-2 pt-1 text-[11px] text-[#7A6E5F]">
            <Sparkles className="w-3.5 h-3.5 text-[#B83227] shrink-0 mt-0.5" />
            <span>
              <strong>Lưu ý quy chuẩn:</strong> {garment.culturalPhilosophy.significance}
            </span>
          </div>
        </div>
      )}

      {activeTab === 'structure' && (
        <div className="space-y-2 text-xs">
          <p className="text-[#5C5346] leading-relaxed">
            {garment.silhouetteDescription}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            {garment.keyFeatures.map((feat, idx) => (
              <div
                key={idx}
                className="p-2 bg-[#FAF7F2] rounded-lg border border-[#EDE7DC] flex items-center gap-2 text-[#2C241D]"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0" />
                <span className="font-medium text-[11px]">{feat}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'pairing' && (
        <div className="space-y-2 text-xs">
          <span className="text-[#7A6E5F] block">
            Món đồ remix hiện đại đề xuất kết hợp cùng {garment.name}:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {garment.recommendedPairings.map((item, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 bg-[#FAF7F2] text-[#2C241D] rounded-lg border border-[#EDE7DC] text-[11px] font-medium"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
