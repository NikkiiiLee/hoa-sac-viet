import React from 'react';
import { OutfitConfig, RuleViolation } from '../types/costume';
import { HERITAGE_SANDBOX_CHALLENGES, HeritageSandboxChallenge } from '../data/costumeData';

interface HeritageSandboxProps {
  currentOutfit: OutfitConfig;
  violations: RuleViolation[];
  onTriggerChallenge: (challenge: HeritageSandboxChallenge) => void;
  onRestoreCompliant: () => void;
  onUpdateOutfit?: (updates: Partial<OutfitConfig>) => void;
  onViewDeepContext?: (challenge: HeritageSandboxChallenge) => void;
}

export const HeritageSandbox: React.FC<HeritageSandboxProps> = ({
  currentOutfit,
  violations,
  onTriggerChallenge,
  onRestoreCompliant,
  onUpdateOutfit,
}) => {
  const challengeKeyMap: Record<string, string> = {
    ta_nham: 'ta_nham',
    short_rach: 'quan_short_rach',
    tram_thanh: 'tram_cai_thanh_trieu',
    dai_obi: 'dai_that_obi',
    yem_tran: 'yem_tran_lung',
    xan_tay: 'xan_tay_ao_tac',
  };

  const isItemTriggered = (id: string) => {
    switch (id) {
      case 'ta_nham':
        return currentOutfit.lapelDirection === 'ta_nham';
      case 'short_rach':
        return currentOutfit.selectedBottom === 'quan_short_rach';
      case 'tram_thanh':
        return currentOutfit.selectedHeadwear === 'tram_cai_thanh_trieu';
      case 'dai_obi':
        return currentOutfit.selectedOuterwear === 'dai_that_obi';
      case 'yem_tran':
        return Boolean(currentOutfit.isSoloYem) || currentOutfit.selectedOuterwear === 'none_bare';
      case 'xan_tay':
        return currentOutfit.garmentId === 'ao_tac' && Boolean(currentOutfit.isSleeveRolled);
      default:
        return false;
    }
  };

  const handleTriggerTaboo = (id: string) => {
    const key = challengeKeyMap[id] || id;
    const challenge = HERITAGE_SANDBOX_CHALLENGES.find((c) => c.id === key);
    if (challenge) {
      onTriggerChallenge(challenge);
    }
  };

  const handleRevertHeritage = (id: string) => {
    if (onUpdateOutfit) {
      switch (id) {
        case 'ta_nham':
          onUpdateOutfit({ lapelDirection: 'huu_nham' });
          break;
        case 'short_rach':
          onUpdateOutfit({ selectedBottom: 'quan_lua_ong_suong' });
          break;
        case 'tram_thanh':
          onUpdateOutfit({ selectedHeadwear: 'khan_dong' });
          break;
        case 'dai_obi':
          onUpdateOutfit({ selectedOuterwear: 'none' });
          break;
        case 'yem_tran':
          onUpdateOutfit({ isSoloYem: false, selectedOuterwear: 'none' });
          break;
        case 'xan_tay':
          onUpdateOutfit({ isSleeveRolled: false });
          break;
        default:
          onRestoreCompliant();
          break;
      }
    } else {
      onRestoreCompliant();
    }
  };

  return (
    /* KHỐI GÓC THỬ THÁCH DI SẢN (COMPACT 2x3 GRID) */
    <div className="mt-3 p-3 rounded-xl bg-amber-50/40 border border-dashed border-amber-300 shadow-2xs">
      {/* Header của khối Sandbox */}
      <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-amber-200/50">
        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-950">
          <span className="text-amber-600 animate-pulse">🔥</span>
          <span className="font-display tracking-wide uppercase text-[11px] md:text-xs">
            Góc Thử Thách Di Sản
          </span>
          <span className="text-[10px] font-normal text-amber-700 bg-amber-100/80 px-1.5 py-0.2 rounded border border-amber-300/60">
            Thử sai để AI bắt lỗi
          </span>
        </div>
        <span className="text-[10px] text-slate-500 italic hidden sm:inline">
          Khám phá các quy tắc cấm kỵ
        </span>
      </div>

      {/* Lưới 2 Hàng x 3 Cột (2x3 Grid) Siêu Tinh Gọn */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 md:gap-2">
        {/* Danh sách 6 tình huống cấm kỵ */}
        {[
          { id: 'ta_nham', title: 'Vạt Tả Nhận', desc: 'Trái đè phải (đồ tang)', fixText: 'Đổi Hữu Nhậm' },
          { id: 'short_rach', title: 'Quần Short Bò', desc: 'Rách gấu hở đùi', fixText: 'Quần lụa dài' },
          { id: 'tram_thanh', title: 'Trâm Mãn Thanh', desc: 'Móng giả & trâm bẹt', fixText: 'Khăn vấn / Trâm Việt' },
          { id: 'dai_obi', title: 'Đai Bản To Obi', desc: 'Lai căng Kimono', fixText: 'Đại đái lụa' },
          { id: 'yem_tran', title: 'Độc Yếm Ra Phố', desc: 'Hở trần không áo ngoài', fixText: 'Mặc áo cánh / tứ thân' },
          { id: 'xan_tay', title: 'Xắn Tay Áo Tấc', desc: 'Mất vẻ trang nghiêm lễ', fixText: 'Thõng tay tự nhiên' },
        ].map((item) => {
          const isTriggered = isItemTriggered(item.id);
          return (
            <div
              key={item.id}
              className={`p-2 rounded-lg border transition-all flex flex-col justify-between ${
                isTriggered
                  ? 'bg-rose-50/90 border-rose-300 ring-1 ring-rose-400'
                  : 'bg-white/80 border-amber-200/60 hover:border-amber-300'
              }`}
            >
              {/* Tiêu đề & mô tả ngắn */}
              <div className="mb-1.5">
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <span className="text-[11px] font-bold text-slate-900 leading-tight truncate">
                    ❌ {item.title}
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 leading-tight line-clamp-1">
                  {item.desc}
                </p>
              </div>

              {/* Cặp nút hành động đối ứng: [ ✕ Thử Lỗi ] và [ ↺ Chuẩn Mực ] */}
              <div className="grid grid-cols-2 gap-1 pt-1.5 border-t border-amber-200/40">
                {/* Nút Thử Nghiệm Lỗi */}
                <button
                  type="button"
                  onClick={() => handleTriggerTaboo(item.id)}
                  className={`py-1 px-1 rounded text-[10px] font-semibold text-center transition-all cursor-pointer ${
                    isTriggered
                      ? 'bg-rose-600 text-white shadow-2xs'
                      : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200/70'
                  }`}
                >
                  ✕ Thử Lỗi
                </button>

                {/* Nút Trả Về Chuẩn Mực Đối Ứng */}
                <button
                  type="button"
                  onClick={() => handleRevertHeritage(item.id)}
                  className="py-1 px-1 rounded text-[10px] font-semibold text-center bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200/70 transition-all flex items-center justify-center gap-0.5 cursor-pointer"
                  title={`Khôi phục: ${item.fixText}`}
                >
                  <span>↺</span> Chuẩn Mực
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
