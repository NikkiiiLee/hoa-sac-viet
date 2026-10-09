import React from 'react';
import { OutfitConfig } from '../types/costume';
import { HeritageSandboxChallenge } from '../data/costumeData';
import { ShieldCheck, AlertTriangle, X, ArrowRight, BookOpen, Sparkles, RotateCcw } from 'lucide-react';

interface HeritageChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  challenge: HeritageSandboxChallenge | null;
  onRestoreCompliant: () => void;
}

export const HeritageChallengeModal: React.FC<HeritageChallengeModalProps> = ({
  isOpen,
  onClose,
  challenge,
  onRestoreCompliant,
}) => {
  if (!isOpen || !challenge) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#FAF7F2] rounded-3xl border-2 border-[#B83227] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[92vh]">
        {/* Red Alarm Header */}
        <div className="bg-gradient-to-r from-[#B83227] to-[#8A1C14] text-white p-5 flex items-start justify-between relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 opacity-15 pointer-events-none">
            <AlertTriangle className="w-32 h-32" />
          </div>

          <div className="flex items-center gap-3 relative z-10">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0 border border-white/30 animate-bounce">
              <AlertTriangle className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-widest bg-white/20 px-2 py-0.5 rounded-md border border-white/20 text-amber-200">
                  {challenge.badge}
                </span>
                <span className="text-[11px] text-white/80">AI Bắt Lỗi Di Sản</span>
              </div>
              <h3 className="text-lg font-serif font-bold text-white mt-1">
                {challenge.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer relative z-10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          {/* Situation Preview */}
          <div className="p-3 bg-red-50/80 rounded-2xl border border-red-200 text-red-950 flex items-start gap-2.5">
            <span className="text-base shrink-0">⚠️</span>
            <div>
              <strong className="block text-red-900 font-bold mb-0.5">Tình huống thử nghiệm:</strong>
              <p className="leading-relaxed">{challenge.subtitle}</p>
            </div>
          </div>

          {/* Historical Context */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-[#1B3B6F] font-bold text-xs uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Nguồn Cội Lịch Sử & Lễ Nhạc</span>
            </div>
            <p className="text-[#5C5346] leading-relaxed bg-white p-3 rounded-2xl border border-[#EDE7DC]">
              {challenge.historicalContext}
            </p>
          </div>

          {/* Why Forbidden in Culture */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-[#B83227] font-bold text-xs uppercase tracking-wider">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Tại Sao Cổ Nhân Nghiêm Cấm Điều Này?</span>
            </div>
            <p className="text-[#4A201C] leading-relaxed bg-[#FFF8F6] p-3.5 rounded-2xl border border-red-200 font-medium">
              {challenge.whyForbidden}
            </p>
          </div>

          {/* Cultural Solution Advice */}
          <div className="p-3.5 bg-emerald-50/80 rounded-2xl border border-emerald-200 text-emerald-950 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-emerald-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Giải Pháp Bảo Tồn Bản Sắc Chuẩn Xác:</span>
            </div>
            <p className="leading-relaxed text-[11px] text-emerald-900">
              {challenge.solution}
            </p>
          </div>
        </div>

        {/* Modal Footer with Actions */}
        <div className="p-4 bg-white border-t border-[#E3DAC9] flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2.5 text-xs font-medium text-[#5C5346] hover:text-[#2C241D] bg-[#FAF7F2] hover:bg-[#EDE7DC] border border-[#D6CEBE] rounded-xl transition-colors cursor-pointer"
          >
            Đóng & Xem Trên Mô Hình
          </button>

          <button
            onClick={() => {
              onRestoreCompliant();
              onClose();
            }}
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-emerald-700 to-[#1B3B6F] hover:brightness-110 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            <span>🛡️ Trả Về Chuẩn Mực Ngay</span>
          </button>
        </div>
      </div>
    </div>
  );
};
