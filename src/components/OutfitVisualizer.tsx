import React, { useState, useRef } from 'react';
import { OutfitConfig, RuleViolation, LandmarkId, LightingMoodId } from '../types/costume';
import { GARMENTS, ACCESSORIES } from '../data/costumeData';
import { LANDMARKS, LIGHTING_MOODS } from '../data/landmarksData';
import { calculateHeritageAuthenticity } from '../data/heritageGauge';
import { getAnatomyHotspots, AnatomyHotspotInfo } from '../data/anatomyData';
import { LandmarkBackdrop } from './LandmarkBackdrop';
import { FaceSwapModal } from './FaceSwapModal';
import { AnatomyModal } from './AnatomyModal';
import { RealGarmentModal } from './RealGarmentModal';
import { HeritageAuthenticityGauge } from './HeritageAuthenticityGauge';
import {
  Upload,
  AlertTriangle,
  CheckCircle2,
  X,
  Glasses,
  Sparkles,
  Camera,
  MapPin,
  Sun,
  BookOpen,
  Info,
  Ruler,
  Minus,
  Plus,
  RotateCcw,
  Scale,
  Download,
} from 'lucide-react';
import html2canvas from 'html2canvas-pro';

interface OutfitVisualizerProps {
  outfit: OutfitConfig;
  violations: RuleViolation[];
  onUpdateOutfit: (updates: Partial<OutfitConfig>) => void;
  onRestoreCompliant?: () => void;
  onOpenCompare?: () => void;
  shakeKey?: number;
}

export const OutfitVisualizer: React.FC<OutfitVisualizerProps> = ({
  outfit,
  violations,
  onUpdateOutfit,
  onRestoreCompliant,
  onOpenCompare,
  shakeKey,
}) => {
  const visualizerCanvasRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccessMessage, setExportSuccessMessage] = useState<string | null>(null);
  const [isFaceModalOpen, setIsFaceModalOpen] = useState(false);
  const [isAnatomyModalOpen, setIsAnatomyModalOpen] = useState(false);
  const [isBodyFormOpen, setIsBodyFormOpen] = useState(false);
  const [isRealGarmentModalOpen, setIsRealGarmentModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'2d' | 'real'>('2d');
  const [showHotspots, setShowHotspots] = useState(true);
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);
  const [hoveredHotspotId, setHoveredHotspotId] = useState<string | null>(null);

  // HIỆU ỨNG XOAY 3D TƯƠNG TÁC THEO CHUỘT
  const [is3DEnabled, setIs3DEnabled] = useState(true);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHoveringCanvas, setIsHoveringCanvas] = useState(false);

  const garment = GARMENTS[outfit.garmentId];
  const hasViolations = violations.length > 0;
  const isMale = outfit.gender === 'male';

  // Body Dimensions & Proportion Calculations
  const height = outfit.heightCm ?? (isMale ? 172 : 162);
  const weight = outfit.weightKg ?? (isMale ? 65 : 52);

  // Xử lý góc xoay 3D khi di chuyển chuột trên canvas
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!is3DEnabled || isExporting || !visualizerCanvasRef.current) return;
    const rect = visualizerCanvasRef.current.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Tọa độ chuẩn hóa từ -1 (trái/trên) đến +1 (phải/dưới)
    const normX = ((x / rect.width) - 0.5) * 2;
    const normY = ((y / rect.height) - 0.5) * 2;

    // Góc nghiêng 3D nhẹ nhàng, thanh lịch và giữ nét chuẩn mực:
    // Yaw (xoay Y): từ -7.5° đến +7.5°
    // Pitch (xoay X): từ -4.5° đến +4.5°
    const targetY = Math.max(-7.5, Math.min(7.5, normX * 7.5));
    const targetX = Math.max(-4.5, Math.min(4.5, -normY * 4.5));

    setRotateY(targetY);
    setRotateX(targetX);
    setIsHoveringCanvas(true);
  };

  const handlePointerLeave = () => {
    setIsHoveringCanvas(false);
    setRotateX(0);
    setRotateY(0);
  };

  // XUẤT VÀ TẢI XUỐNG ẢNH BẢN PHỐI ĐỒ (PNG) CHẤT LƯỢNG CAO
  const handleDownloadImage = async () => {
    if (!visualizerCanvasRef.current || isExporting) return;
    setIsExporting(true);
    // Tạm thời cân chỉnh lại góc xoay 3D về chính diện trước khi chụp ảnh
    setRotateX(0);
    setRotateY(0);
    setIsHoveringCanvas(false);
    await new Promise((resolve) => setTimeout(resolve, 60));

    try {
      if (document.fonts?.ready) {
        await document.fonts.ready;
      }

      const canvasEl = visualizerCanvasRef.current;
      const canvas = await html2canvas(canvasEl, {
        scale: 2, // Độ phân giải cao gấp đôi (Retina 2x)
        useCORS: true,
        allowTaint: false,
        backgroundColor: '#FAF7F2',
        logging: false,
        ignoreElements: (element) => {
          return (
            element.getAttribute('data-html2canvas-ignore') === 'true' ||
            element.classList.contains('no-export')
          );
        },
        onclone: (clonedDoc) => {
          const tempCanvas = document.createElement('canvas');
          const tempCtx = tempCanvas.getContext('2d');
          const convertColorToStandard = (colorVal: string | null | undefined): string => {
            if (!colorVal) return '';
            const trimmed = colorVal.trim();
            if (!trimmed || trimmed === 'transparent' || trimmed === 'inherit' || trimmed === 'initial' || trimmed === 'none') {
              return trimmed;
            }
            if (!trimmed.includes('oklab') && !trimmed.includes('oklch')) {
              return trimmed;
            }
            if (tempCtx) {
              try {
                tempCtx.fillStyle = 'rgba(1, 2, 3, 0.5)';
                tempCtx.fillStyle = trimmed;
                if (tempCtx.fillStyle && tempCtx.fillStyle !== 'rgba(1, 2, 3, 0.5)') {
                  return tempCtx.fillStyle;
                }
              } catch {}
            }
            return '#2C241D';
          };

          try {
            const styleTags = clonedDoc.querySelectorAll('style');
            styleTags.forEach((styleEl) => {
              if (styleEl.textContent && (styleEl.textContent.includes('oklab') || styleEl.textContent.includes('oklch'))) {
                styleEl.textContent = styleEl.textContent
                  .replace(/oklab\([^)]+\)/gi, (match) => convertColorToStandard(match))
                  .replace(/oklch\([^)]+\)/gi, (match) => convertColorToStandard(match));
              }
            });
          } catch {}

          try {
            const allElements = Array.from(clonedDoc.querySelectorAll('*')) as HTMLElement[];
            const defaultView = clonedDoc.defaultView || window;
            allElements.forEach((el) => {
              try {
                const comp = defaultView.getComputedStyle(el);
                if (comp) {
                  if (comp.color && (comp.color.includes('oklab') || comp.color.includes('oklch'))) {
                    el.style.color = convertColorToStandard(comp.color);
                  }
                  if (comp.backgroundColor && (comp.backgroundColor.includes('oklab') || comp.backgroundColor.includes('oklch'))) {
                    el.style.backgroundColor = convertColorToStandard(comp.backgroundColor);
                  }
                  if (comp.borderColor && (comp.borderColor.includes('oklab') || comp.borderColor.includes('oklch'))) {
                    el.style.borderColor = convertColorToStandard(comp.borderColor);
                  }
                }
                const fill = el.getAttribute('fill');
                if (fill && (fill.includes('oklab') || fill.includes('oklch'))) {
                  el.setAttribute('fill', convertColorToStandard(fill));
                }
                const stroke = el.getAttribute('stroke');
                if (stroke && (stroke.includes('oklab') || stroke.includes('oklch'))) {
                  el.setAttribute('stroke', convertColorToStandard(stroke));
                }
              } catch {}
            });
          } catch {}
        },
      });

      const imageData = canvas.toDataURL('image/png');
      const safeTitle = (garment?.name || 'co-phuc')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      const dateTag = new Date().toISOString().slice(0, 10);
      const fileName = `hoasacviet-${safeTitle}-${dateTag}.png`;

      const downloadLink = document.createElement('a');
      downloadLink.href = imageData;
      downloadLink.download = fileName;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      setExportSuccessMessage('Đã tải xuống ảnh bản phối PNG thành công!');
      setTimeout(() => setExportSuccessMessage(null), 3500);
    } catch (err) {
      console.error('Lỗi xuất ảnh visualizer bằng html2canvas:', err);
      // Fallback: Chụp trực tiếp SVG nếu html2canvas gặp sự cố
      try {
        const svgEl = visualizerCanvasRef.current?.querySelector('svg');
        if (svgEl) {
          const svgData = new XMLSerializer().serializeToString(svgEl);
          const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
          const URLObj = window.URL || window.webkitURL || window;
          const blobUrl = URLObj.createObjectURL(svgBlob);
          const img = new Image();
          img.onload = () => {
            const fallbackCanvas = document.createElement('canvas');
            fallbackCanvas.width = 640;
            fallbackCanvas.height = 896;
            const ctx = fallbackCanvas.getContext('2d');
            if (ctx) {
              ctx.fillStyle = '#FAF7F2';
              ctx.fillRect(0, 0, fallbackCanvas.width, fallbackCanvas.height);
              ctx.drawImage(img, 40, 30, 560, 784);
              
              // Watermark
              ctx.font = 'bold 16px "Be Vietnam Pro", sans-serif';
              ctx.fillStyle = '#A82824';
              ctx.fillText('HỌA SẮC VIỆT • Dệt Tương Lai Từ Nét Xưa', 40, 850);
              ctx.font = '13px "Be Vietnam Pro", sans-serif';
              ctx.fillStyle = '#7A6E5F';
              ctx.fillText(`${garment?.name || 'Cổ Phục'} • Chuẩn Mực Văn Hóa`, 40, 874);

              const pngUrl = fallbackCanvas.toDataURL('image/png');
              const link = document.createElement('a');
              link.href = pngUrl;
              link.download = `hoasacviet-${garment?.id || 'ban-phoi'}.png`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              setExportSuccessMessage('Đã tải xuống ảnh bản phối PNG thành công!');
              setTimeout(() => setExportSuccessMessage(null), 3500);
            }
            URLObj.revokeObjectURL(blobUrl);
          };
          img.src = blobUrl;
        }
      } catch (fbErr) {
        console.error('Lỗi khi fallback xuất ảnh:', fbErr);
      }
    } finally {
      setIsExporting(false);
    }
  };

  // BMI Calculation
  const heightM = height / 100;
  const bmi = +(weight / (heightM * heightM)).toFixed(1);

  // Body Proportion Category & Heritage Tailoring Advice
  let bodyCategory = 'Cân Đối';
  let bodyColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';
  let tailoringAdvice =
    'Vóc dáng cân đối rất dễ tôn vinh đường nét suông chữ A tao nhã và nẹp cổ đứng của áo ngũ thân.';

  if (bmi < 18.5) {
    bodyCategory = 'Mảnh Mai';
    bodyColor = 'text-blue-700 bg-blue-50 border-blue-200';
    tailoringAdvice =
      'Áo ngũ thân nhiều lớp lót ngực và tà xòe rộng khéo léo tạo cảm giác đầy đặn, ung dung cho dáng mảnh.';
  } else if (bmi <= 24.9) {
    bodyCategory = 'Cân Đối Chuẩn Mực';
    bodyColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';
    tailoringAdvice =
      'Tỷ lệ vàng cho cổ phục! Vạt áo buông rủ thanh thoát, tôn trọn phong thái thư thái của người mặc.';
  } else if (bmi <= 28.5) {
    bodyCategory = 'Đầy Đặn / Đậm Người';
    bodyColor = 'text-amber-800 bg-amber-50 border-amber-200';
    tailoringAdvice =
      'Kết cấu 5 thân ghép sống đứng và tà rộng giúp kéo dài thân hình, giấu nhẹm vòng eo hiệu quả.';
  } else {
    bodyCategory = 'Vạm Vỡ / Phì Nhiêu';
    bodyColor = 'text-purple-800 bg-purple-50 border-purple-200';
    tailoringAdvice =
      'Ưu tiên chất vải buông rủ tự nhiên, tay áo chẽn nới lỏng nhẹ để cử động lễ nghi thoải mái nhất.';
  }

  // SKELETAL RIGGING & ANATOMICAL PROPORTION ENGINE (TỶ LỆ KHUNG XƯƠNG THEO CHIỀU CAO & CÂN NẶNG)
  // Reference baseline: Male = 172cm / 65kg, Female = 162cm / 52kg
  const refHeight = isMale ? 172 : 162;
  const refWeight = isMale ? 65 : 52;
  const deltaH = height - refHeight;
  const deltaW = weight - refWeight;

  // Horizontal Rig Scale (Bề ngang vai, ngực, eo theo cân nặng và giới tính)
  const scaleX = Math.max(0.85, Math.min(1.22, 1 + deltaW * (isMale ? 0.0044 : 0.0038)));
  // Vertical Rig Scale (Chiều cao thân và chân theo chiều cao)
  const scaleY = Math.max(0.88, Math.min(1.15, 1 + deltaH * 0.0034));

  // Cranial Rig Compensation (Giữ tỷ lệ đầu, khuôn mặt & phụ kiện đội đầu thanh tú, chống biến dạng)
  const headCompX = Math.max(0.92, Math.min(1.08, Math.pow(scaleX, -0.38)));
  const headCompY = Math.max(0.92, Math.min(1.08, Math.pow(scaleY, -0.42)));

  const authenticity = calculateHeritageAuthenticity(outfit);
  const hotspots = getAnatomyHotspots(outfit);
  const activeHotspot = hotspots.find((h) => h.id === (hoveredHotspotId || activeHotspotId));

  const getAccessoryName = (id: string) => {
    return ACCESSORIES.find((a) => a.id === id)?.name || id;
  };

  // Xác định người dùng có đang phối Chân váy midi xếp ly hoặc Váy đụp (Nữ) hay không
  const isSkirtActive = !isMale && (outfit.selectedBottom === 'chan_vay_midi_xep_ly' || outfit.selectedBottom === 'vay_dup_tham');

  return (
    <div className="flex flex-col h-full select-none">
      {/* Visual Canvas Container with CSS Shake on Violation */}
      <div
        ref={visualizerCanvasRef}
        key={shakeKey ?? (hasViolations ? 'violating' : 'compliant')}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className={`relative flex-1 h-[56vh] sm:h-[62vh] md:h-[68vh] min-h-[400px] sm:min-h-[460px] md:min-h-[520px] max-h-[680px] rounded-2xl bg-gradient-to-b from-[#F7F3EB] to-[#EDE7DC] border p-0 flex flex-col items-center justify-end overflow-hidden transition-all duration-300 ${
          hasViolations
            ? 'animate-shake border-[#B83227] ring-4 ring-[#B83227]/30 animate-pulse-alert shadow-lg shadow-red-900/10'
            : 'border-[#E3DAC9] shadow-md shadow-stone-900/5'
        }`}
      >
        {/* 1. TOP CONTROLS BAR: TÁCH RỜI 2 KHỐI VỚI KHOẢNG THỞ GAP 12PX (CHỐNG CHỒNG CHÉO) */}
        <div
          data-html2canvas-ignore="true"
          className="absolute top-3 inset-x-3 z-30 flex items-center justify-between gap-3 pointer-events-none"
        >
          {/* KHỐI 1: HUY HIỆU XANH ✓ 100% CHUẨN MỰC (ĐỘC LẬP, NHỎ GỌN Ở GÓC TRÊN BÊN TRÁI) */}
          <div className="pointer-events-auto shrink-0 flex items-center gap-1.5">
            {!hasViolations ? (
              <div className="backdrop-blur-md bg-emerald-800/90 text-white border border-emerald-400 text-[11px] px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                <span className="whitespace-nowrap">✓ 100% Chuẩn Mực</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={onRestoreCompliant}
                className="backdrop-blur-md bg-red-800/90 hover:bg-red-700 text-white border border-red-400 text-[11px] px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-md animate-pulse cursor-pointer font-bold transition-all"
                title="Phát hiện yếu tố lệch chuẩn - Bấm để tự động sửa ngay"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                <span className="whitespace-nowrap">⚠️ Lệch Chuẩn</span>
                <span className="text-[9.5px] bg-white/20 px-1.5 py-0.2 rounded-md font-semibold">
                  Sửa ngay
                </span>
              </button>
            )}

            {/* Lapel status pill if Ta Nham */}
            {outfit.lapelDirection === 'ta_nham' && (
              <span className="backdrop-blur-md bg-black/75 text-red-300 border border-red-500 text-[10.5px] px-2 py-0.5 rounded-full font-bold whitespace-nowrap">
                Tả Nhậm (Đồ Tang)
              </span>
            )}
          </div>

          {/* KHỐI 2: DẢI THÔNG SỐ NHÂN VẬT & TINH GỌN DÃY ICON (NHỎ GỌN, ĐỒNG BỘ KÍCH THƯỚC BẰNG VỚI THANH BẢN VẼ 2D) */}
          <div className="pointer-events-auto flex items-center justify-between bg-white/95 backdrop-blur-md p-0.5 rounded-full border border-[#D4AF37]/80 shadow-md ring-1 ring-black/5 text-[10.5px] ml-auto w-[216px] h-[30px]">
            {/* Dải thông số nhân vật: [ 👨 Nam ], [ 165·52kg ] */}
            <div className="flex items-center gap-1 pl-0.5">
              {/* Nút chuyển [ 👨 Nam ] / [ 👩 Nữ ] */}
              <button
                type="button"
                onClick={() => {
                  const nextGender = isMale ? 'female' : 'male';
                  const updates: Partial<OutfitConfig> = { gender: nextGender };
                  if (nextGender === 'male') {
                    updates.heightCm = 172;
                    updates.weightKg = 65;
                    if (
                      outfit.selectedBottom === 'vay_dup_tham' ||
                      outfit.selectedBottom === 'chan_vay_midi_xep_ly' ||
                      outfit.selectedBottom.includes('vay')
                    ) {
                      updates.selectedBottom = 'quan_lua_ong_suong';
                    }
                  } else {
                    updates.heightCm = 162;
                    updates.weightKg = 52;
                  }
                  onUpdateOutfit(updates);
                }}
                className="px-1.5 py-0.5 rounded-full font-bold transition-all text-[10px] bg-amber-100/90 hover:bg-amber-200 text-[#2C241D] flex items-center gap-0.5 cursor-pointer shadow-2xs"
                title="Đổi giới tính Nam / Nữ"
              >
                <span>{isMale ? '👨' : '👩'}</span>
                <span className="font-semibold">{isMale ? 'Nam' : 'Nữ'}</span>
              </button>

              {/* Badge [ 165·52kg ] */}
              <button
                type="button"
                onClick={() => setIsBodyFormOpen(!isBodyFormOpen)}
                className={`px-1.5 py-0.5 rounded-full font-semibold text-[9.5px] transition-colors cursor-pointer flex items-center gap-0.5 ${
                  isBodyFormOpen
                    ? 'bg-[#1B3B6F] text-white shadow-2xs'
                    : 'bg-stone-100 hover:bg-stone-200 text-[#2C241D]'
                }`}
                title="Tùy chỉnh chiều cao và cân nặng may đo"
              >
                <Ruler className="w-2.5 h-2.5 text-amber-600" />
                <span className="whitespace-nowrap">{height}·{weight}kg</span>
              </button>
            </div>

            {/* Vạch ngăn cách trang nhã */}
            <span className="w-px h-3.5 bg-[#D4AF37]/50 shrink-0" />

            {/* Dãy icon tinh gọn: [ 3D ], [ 📷 ], [ ⚖️ ] */}
            <div className="flex items-center gap-0.5 pr-0.5">
              {/* 1. Nút icon [ 3D ] */}
              <button
                type="button"
                onClick={() => {
                  const next = !is3DEnabled;
                  setIs3DEnabled(next);
                  if (!next) {
                    setRotateX(0);
                    setRotateY(0);
                  }
                }}
                className={`w-5 h-5 rounded-full transition-colors cursor-pointer text-[9px] font-bold flex items-center justify-center ${
                  is3DEnabled
                    ? 'bg-[#1B3B6F] text-white shadow-2xs ring-1 ring-blue-400'
                    : 'text-[#5C5346] hover:bg-amber-100/70 bg-stone-50'
                }`}
                title={
                  is3DEnabled
                    ? 'Đang bật hiệu ứng Xoay 3D (Bấm để tắt)'
                    : 'Bật xoay 3D tương tác theo di chuyển chuột'
                }
              >
                <span>3D</span>
              </button>

              {/* 2. Nút icon [ 📷 ] */}
              <button
                type="button"
                onClick={handleDownloadImage}
                disabled={isExporting}
                className="w-5 h-5 rounded-full transition-all cursor-pointer text-[#A82824] hover:bg-amber-100/80 bg-stone-50 flex items-center justify-center active:scale-95 disabled:opacity-60"
                title="Chụp ảnh / Tải ảnh PNG Avatar"
              >
                {isExporting ? (
                  <div className="w-3 h-3 border-2 border-[#A82824] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Camera className="w-3 h-3 text-[#A82824]" />
                )}
              </button>

              {/* 3. Nút icon [ ⚖️ ] */}
              {onOpenCompare && (
                <button
                  type="button"
                  onClick={onOpenCompare}
                  className="w-5 h-5 rounded-full transition-all cursor-pointer text-[#1B3B6F] hover:bg-blue-100/80 bg-stone-50 flex items-center justify-center active:scale-95"
                  title="So Sánh Đối Sánh A/B Mockup"
                >
                  <Scale className="w-3 h-3 text-[#1B3B6F]" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* CỤM TOGGLE CHIP [ 🎨 Bản Vẽ 2D | 👁️ Xem Ảnh Thực Tế ] - VỊ TRÍ GÓC TRÊN BÊN PHẢI KHUNG TRANH (ĐỒNG BỘ KÍCH THƯỚC W-216PX H-30PX) */}
        <div
          data-html2canvas-ignore="true"
          className="absolute top-11.5 sm:top-12 right-3 z-30 flex items-center justify-between bg-white/95 backdrop-blur-md p-0.5 rounded-full border border-[#D4AF37]/80 shadow-md ring-1 ring-black/5 w-[216px] h-[30px]"
        >
          <button
            type="button"
            onClick={() => {
              setViewMode('2d');
              setIsRealGarmentModalOpen(false);
            }}
            className={`flex-1 h-full text-[11px] font-semibold rounded-full transition-all flex items-center justify-center gap-1 cursor-pointer ${
              !isRealGarmentModalOpen && viewMode === '2d'
                ? 'bg-[#1B3B6F] text-white shadow-xs'
                : 'text-[#6B5E4F] hover:text-[#2C241D] hover:bg-stone-100'
            }`}
            title="Xem mô hình bản vẽ tương tác 2D"
          >
            <span>🎨</span>
            <span>Bản Vẽ 2D</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setViewMode('real');
              setIsRealGarmentModalOpen(true);
            }}
            className={`flex-1 h-full text-[11px] font-semibold rounded-full transition-all flex items-center justify-center gap-1 cursor-pointer ${
              isRealGarmentModalOpen || viewMode === 'real'
                ? 'bg-[#B83227] text-white shadow-xs'
                : 'text-[#6B5E4F] hover:text-[#2C241D] hover:bg-stone-100'
            }`}
            title="Xem trang phục thật ngoài đời & thông số may đo chi tiết"
          >
            <span>👁️</span>
            <span className="text-[11px] leading-[15.5px]">Ảnh thực tế</span>
          </button>
        </div>

        {/* FLOATING BODY FORM POPOVER (KHÔNG ĐẨY DỌC MÀN HÌNH NỮA) */}
        {isBodyFormOpen && (
          <div data-html2canvas-ignore="true" className="absolute top-[82px] right-3 z-40 max-w-sm w-[92%] sm:w-80 p-3 bg-white/95 backdrop-blur-md rounded-2xl border-2 border-[#1B3B6F]/25 shadow-2xl space-y-2.5 animate-in slide-in-from-top-2 duration-150">
            <div className="flex items-center justify-between pb-1.5 border-b border-[#EDE7DC]">
              <div className="flex items-center gap-1.5">
                <Ruler className="w-4 h-4 text-[#1B3B6F]" />
                <h4 className="text-xs font-serif font-bold text-[#2C241D]">
                  May Đo Thước Tấc Cổ Phục
                </h4>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() =>
                    onUpdateOutfit({
                      heightCm: isMale ? 172 : 162,
                      weightKg: isMale ? 65 : 52,
                    })
                  }
                  className="px-1.5 py-0.5 text-[9.5px] font-medium text-[#7A6E5F] hover:text-[#1B3B6F] bg-[#FAF7F2] rounded border border-[#EDE7DC]"
                >
                  <RotateCcw className="w-2.5 h-2.5 inline mr-0.5" /> Mặc định
                </button>
                <button
                  type="button"
                  onClick={() => setIsBodyFormOpen(false)}
                  className="p-1 text-[#7A6E5F] hover:text-[#2C241D] rounded-lg"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Chiều cao Slider */}
            <div className="space-y-1 p-2 bg-[#FAF7F2] rounded-xl border border-[#EDE7DC]">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#2C241D]">📏 Chiều Cao:</span>
                <span className="font-bold text-[#1B3B6F]">{height} cm</span>
              </div>
              <input
                type="range"
                min={145}
                max={195}
                value={height}
                onChange={(e) => onUpdateOutfit({ heightCm: parseInt(e.target.value, 10) })}
                className="w-full accent-[#1B3B6F] cursor-pointer"
              />
            </div>

            {/* Cân nặng Slider */}
            <div className="space-y-1 p-2 bg-[#FAF7F2] rounded-xl border border-[#EDE7DC]">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#2C241D]">⚖️ Cân Nặng:</span>
                <span className="font-bold text-[#B83227]">{weight} kg</span>
              </div>
              <input
                type="range"
                min={38}
                max={105}
                value={weight}
                onChange={(e) => onUpdateOutfit({ weightKg: parseInt(e.target.value, 10) })}
                className="w-full accent-[#B83227] cursor-pointer"
              />
            </div>

            <div className="text-[10px] text-[#5C5346] leading-snug bg-amber-50/80 p-2 rounded-xl border border-amber-200/60">
              Vóc dáng: <strong>{bodyCategory}</strong> (BMI: {bmi}). {tailoringAdvice}
            </div>

            {/* Ghép mặt chân dung */}
            <div className="pt-1.5 border-t border-[#EDE7DC] flex items-center justify-between">
              <span className="text-[10.5px] text-[#7A6E5F]">Chân dung Avatar:</span>
              <button
                type="button"
                onClick={() => {
                  setIsBodyFormOpen(false);
                  setIsFaceModalOpen(true);
                }}
                className="text-[11px] font-semibold text-[#1B3B6F] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Camera className="w-3 h-3 text-[#B83227]" />
                <span>{outfit.customFacePhotoUrl ? 'Đổi ảnh khuôn mặt' : 'Thử ghép mặt của bạn'}</span>
              </button>
            </div>
          </div>
        )}

        {/* 4. HERITAGE TABOO SEAL STAMP (LỆCH CHUẨN DI SẢN) OVERLAY */}
        {hasViolations && (
          <div data-html2canvas-ignore="true" className="absolute top-26 right-3 sm:right-5 z-30 pointer-events-none transform rotate-[-14deg] animate-in zoom-in-75 duration-300">
            <div className="border-4 border-double border-[#B83227] bg-[#B83227]/20 backdrop-blur-xs px-3.5 py-2 rounded-lg shadow-2xl flex flex-col items-center justify-center ring-2 ring-[#B83227]/40">
              <span className="text-xs sm:text-sm font-black tracking-widest text-[#B83227] uppercase flex items-center gap-1.5 drop-shadow-xs">
                <span>⚠️</span> LỆCH CHUẨN DI SẢN
              </span>
              <span className="text-[8.5px] font-bold text-[#8A1C14] tracking-widest uppercase mt-0.5">
                ẤN TRIỆN MỘC ĐỎ · AI BẮT LỖI
              </span>
            </div>
          </div>
        )}

        {/* 1. STYLIZED LANDMARK VECTOR SCENERY & LIGHTING SHADER */}
        <LandmarkBackdrop
          landmarkId={outfit.backdropId || 'van_mieu'}
          lightingId={outfit.lightingId || 'nang_am'}
        />

        {/* CENTRAL DYNAMIC SVG VECTOR LAYERING (Z-INDEX ORDERED) - GROUNDED & HEAD-TO-TOE FULL BODY VIEW WITH 3D PERSPECTIVE */}
        <div
          className="relative z-10 w-full h-full flex items-end justify-center pb-3 sm:pb-4 pointer-events-none"
          style={{
            perspective: 900,
            perspectiveOrigin: '50% 65%',
          }}
        >
          <div
            className="pointer-events-auto flex items-end justify-center h-full w-full will-change-transform"
            style={{
              transform: !is3DEnabled || isExporting
                ? 'none'
                : `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`,
              transformOrigin: '50% 88%',
              transition: isHoveringCanvas
                ? 'transform 0.12s ease-out, filter 0.12s ease-out'
                : 'transform 0.65s cubic-bezier(0.22, 1, 0.36, 1), filter 0.65s cubic-bezier(0.22, 1, 0.36, 1)',
              transformStyle: 'preserve-3d',
              filter: is3DEnabled && (Math.abs(rotateX) > 0.2 || Math.abs(rotateY) > 0.2)
                ? `drop-shadow(${(-rotateY * 1.2).toFixed(1)}px ${(6 + Math.abs(rotateX) * 0.8).toFixed(1)}px 12px rgba(0,0,0,0.15))`
                : undefined,
            }}
          >
            <svg
              viewBox="0 0 300 420"
              preserveAspectRatio="xMidYMax meet"
              className="h-full w-auto max-h-[56vh] sm:max-h-[62vh] md:max-h-[68vh] drop-shadow-md select-none transition-all duration-300"
            >
              <defs>
                {/* Pattern for Silk Weave */}
                <pattern id="silkTexture" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 0 5 L 10 5 M 5 0 L 5 10" stroke="#000000" strokeWidth="0.3" strokeOpacity="0.08" />
                </pattern>
                {/* Shading */}
                <linearGradient id="robeShade" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#000000" stopOpacity="0.12" />
                  <stop offset="50%" stopColor="#ffffff" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0.18" />
                </linearGradient>
                {/* Natural Skin Tones Gradient for Character Body */}
                <linearGradient id="bodySkinShade" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#E4BAA1" />
                  <stop offset="30%" stopColor="#F4CFBA" />
                  <stop offset="70%" stopColor="#F9DDD0" />
                  <stop offset="100%" stopColor="#DEAE95" />
                </linearGradient>
                <linearGradient id="legSkinShade" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#E2B79F" />
                  <stop offset="50%" stopColor="#F4CFBA" />
                  <stop offset="100%" stopColor="#DEAE95" />
                </linearGradient>
                {/* Oval ClipPath for Face Swap */}
                <clipPath id="userFaceClip">
                  <ellipse cx="150" cy="72" rx="20" ry="24" />
                </clipPath>
              </defs>

              {/* CHARACTER LAYERS SCALED DYNAMICALLY BY BODY PROPORTIONS (CHIỀU CAO & CÂN NẶNG) */}
              {/* TỶ LỆ MOCKUP TỔNG THỂ: THU NHỎ 85% VÀ NÂNG CAO ĐỂ LỘ RÕ TOÀN BỘ ỐNG QUẦN VÀ ĐÔI GIÀY/GUỐC TRÊN NỀN GẠCH */}
              <g
                id="svg-character-body-scaled"
                transform={`translate(0, -10) scale(0.85) translate(150, 384) scale(${scaleX.toFixed(3)}, ${scaleY.toFixed(3)}) translate(-150, -384)`}
                style={{ transformOrigin: '150px 384px' }}
                className="transition-transform duration-300"
              >
                {/* LAYER 0: REALISTIC CONTACT GROUND SHADOW (CHỐNG LƠ LỬNG) */}
                <g id="ground-contact-shadow" className="transition-opacity duration-300">
                  {/* Wide soft ambient shadow on courtyard floor */}
                  <ellipse cx="150" cy="386" rx={isMale ? "76" : "64"} ry="9" fill="#1C1917" opacity="0.22" />
                  {/* Occlusion shadow beneath robe hem and feet */}
                  <ellipse cx="150" cy="385" rx={isMale ? "56" : "46"} ry="6" fill="#1C1917" opacity="0.36" />
                  {/* Left & Right shoe direct ground contact (thế chân khép V nữ vs mở rộng bằng vai nam) */}
                  {isMale ? (
                    <>
                      <ellipse cx="118" cy="384" rx="20" ry="4" fill="#0C0A09" opacity="0.65" />
                      <ellipse cx="182" cy="384" rx="20" ry="4" fill="#0C0A09" opacity="0.65" />
                    </>
                  ) : (
                    <>
                      <ellipse cx="138" cy="384" rx="14" ry="3.5" fill="#0C0A09" opacity="0.6" />
                      <ellipse cx="162" cy="384" rx="14" ry="3.5" fill="#0C0A09" opacity="0.6" />
                    </>
                  )}
                </g>

                {/* LAYER 1: LOWER BODY, SILK PANTS/SKIRT & FOOTWEAR (THEO GIỚI TÍNH) */}
                <g id="lower-body-and-footwear" className="transition-all duration-300">
                  {/* BOTTOMS */}
                  {outfit.selectedBottom === 'quan_short_rach' ? (
                    // BANNED: Quần short rách phản cảm
                    <g>
                      <rect x={isMale ? "120" : "130"} y="290" width="16" height="80" rx="4" fill={isMale ? "#E8C3AB" : "#FCEFE7"} />
                      <rect x={isMale ? "164" : "154"} y="290" width="16" height="80" rx="4" fill={isMale ? "#E8C3AB" : "#FCEFE7"} />
                      <path
                        d={isMale ? "M114 260 L186 260 L184 292 L158 292 L154 276 L146 276 L142 292 L116 292 Z" : "M124 260 L176 260 L174 292 L156 292 L153 278 L147 278 L144 292 L126 292 Z"}
                        fill="#5B7C99"
                        stroke="#385470"
                        strokeWidth="1.5"
                      />
                    </g>
                  ) : outfit.selectedBottom === 'vay_dup_tham' ? (
                    // Váy đụp thâm lụa Bắc Bộ: Hình thang xòe rộng ngang bắp chân tôn nét đằm thắm dân gian
                    isMale ? (
                      <g>
                        <path d="M114 228 L148 228 L144 372 L106 372 Z" fill="#1C1B1F" stroke="#121214" strokeWidth="0.5" />
                        <path d="M152 228 L186 228 L194 372 L156 372 Z" fill="#1C1B1F" stroke="#121214" strokeWidth="0.5" />
                      </g>
                    ) : (
                      <g id="skirt-vay-dup">
                        {/* Thân váy đụp lụa thâm hình thang xòe rộng sang hai bên hông */}
                        <path
                          d="M134 218 L166 218 L202 364 Q150 371 98 364 Z"
                          fill="#1A181C"
                          stroke="#121114"
                          strokeWidth="0.8"
                        />
                        {/* Các nếp vải lụa thâm buông rủ mềm mại */}
                        <path d="M137 220 Q125 290 114 364" stroke="#2D2B30" strokeWidth="0.9" fill="none" opacity="0.6" />
                        <path d="M144 220 Q138 290 132 366" stroke="#2D2B30" strokeWidth="0.9" fill="none" opacity="0.6" />
                        <path d="M150 220 Q150 295 150 368" stroke="#38363C" strokeWidth="1.1" fill="none" opacity="0.5" />
                        <path d="M156 220 Q162 290 168 366" stroke="#2D2B30" strokeWidth="0.9" fill="none" opacity="0.6" />
                        <path d="M163 220 Q175 290 186 364" stroke="#2D2B30" strokeWidth="0.9" fill="none" opacity="0.6" />
                      </g>
                    )
                  ) : outfit.selectedBottom === 'chan_vay_midi_xep_ly' ? (
                    // Chân váy midi xếp ly (Remix): Hình thang xòe rộng ngang bắp chân với các nếp dập ly nan quạt
                    isMale ? (
                      <g>
                        <path d="M114 228 L148 228 L144 372 L106 372 Z" fill={outfit.bottomColor.hex} stroke="#5C5346" strokeWidth="0.5" />
                        <path d="M152 228 L186 228 L194 372 L156 372 Z" fill={outfit.bottomColor.hex} stroke="#5C5346" strokeWidth="0.5" />
                      </g>
                    ) : (
                      <g id="skirt-chan-vay-midi">
                        {/* Hai bắp chân thanh mảnh lộ ra dưới gấu váy */}
                        <rect x="136" y="348" width="8" height="25" rx="3" fill="#FCEFE7" stroke="#DEAE95" strokeWidth="0.4" />
                        <rect x="156" y="348" width="8" height="25" rx="3" fill="#FCEFE7" stroke="#DEAE95" strokeWidth="0.4" />

                        {/* Thân chân váy midi xếp ly: hình thang xòe rộng từ cạp xuống bắp chân */}
                        <path
                          d="M134 218 L166 218 L198 356 Q150 363 102 356 Z"
                          fill={outfit.bottomColor.hex}
                          stroke="#4A4036"
                          strokeWidth="0.6"
                        />
                        {/* Các nếp dập ly Accordion Pleats thẳng tắp tỏa hình nan quạt */}
                        {[
                          { x1: 135, x2: 104 },
                          { x1: 137, x2: 110 },
                          { x1: 139, x2: 117 },
                          { x1: 142, x2: 124 },
                          { x1: 144, x2: 131 },
                          { x1: 147, x2: 138 },
                          { x1: 149, x2: 145 },
                          { x1: 151, x2: 152 },
                          { x1: 153, x2: 159 },
                          { x1: 156, x2: 166 },
                          { x1: 158, x2: 173 },
                          { x1: 161, x2: 180 },
                          { x1: 163, x2: 187 },
                          { x1: 165, x2: 194 },
                        ].map((pleat, idx) => (
                          <g key={idx}>
                            <line
                              x1={pleat.x1}
                              y1={219}
                              x2={pleat.x2}
                              y2={356}
                              stroke="#000000"
                              strokeOpacity="0.14"
                              strokeWidth="0.9"
                            />
                            <line
                              x1={pleat.x1 + 0.8}
                              y1={219}
                              x2={pleat.x2 + 0.8}
                              y2={356}
                              stroke="#FFFFFF"
                              strokeOpacity="0.22"
                              strokeWidth="0.6"
                            />
                          </g>
                        ))}
                      </g>
                    )
                  ) : outfit.selectedBottom === 'culottes_linen' ? (
                    // Quần Culottes Linen ống rộng lửng
                    <g>
                      <rect x={isMale ? "120" : "132"} y="348" width="10" height="24" rx="2" fill={isMale ? "#E8C3AB" : "#FCEFE7"} />
                      <rect x={isMale ? "170" : "158"} y="348" width="10" height="24" rx="2" fill={isMale ? "#E8C3AB" : "#FCEFE7"} />
                      <path
                        d={isMale ? "M112 230 L146 230 L142 352 L106 352 Z" : "M124 226 L148 226 L145 352 L120 352 Z"}
                        fill={outfit.bottomColor.hex}
                        stroke="#5C5346"
                        strokeWidth="0.5"
                      />
                      <path
                        d={isMale ? "M154 230 L188 230 L194 352 L158 352 Z" : "M152 226 L176 226 L180 352 L155 352 Z"}
                        fill={outfit.bottomColor.hex}
                        stroke="#5C5346"
                        strokeWidth="0.5"
                      />
                    </g>
                  ) : (
                    // Quần lụa truyền thống: Nữ buông rủ e ấp chân khép sát vs Nam ống suông đứng chữ H mở rộng bằng vai
                    <g>
                      {isMale ? (
                        <>
                          {/* Quần nam ống suông chữ H rộng rãi đĩnh đạc */}
                          <path
                            d="M114 228 L148 228 L144 372 L106 372 Z"
                            fill={outfit.bottomColor.hex}
                            stroke="#5C5346"
                            strokeWidth="0.5"
                          />
                          <path
                            d="M152 228 L186 228 L194 372 L156 372 Z"
                            fill={outfit.bottomColor.hex}
                            stroke="#5C5346"
                            strokeWidth="0.5"
                          />
                          <path d="M125 240 L122 368" stroke="#000000" strokeWidth="0.5" strokeOpacity="0.12" fill="none" />
                          <path d="M175 240 L178 368" stroke="#000000" strokeWidth="0.5" strokeOpacity="0.12" fill="none" />
                        </>
                      ) : (
                        <>
                          {/* Quần nữ lụa mềm mại, hai chân khép chữ V kín đáo */}
                          <path
                            d="M126 224 L149 224 L146 372 L124 372 Z"
                            fill={outfit.bottomColor.hex}
                            stroke="#5C5346"
                            strokeWidth="0.5"
                          />
                          <path
                            d="M151 224 L174 224 L176 372 L154 372 Z"
                            fill={outfit.bottomColor.hex}
                            stroke="#5C5346"
                            strokeWidth="0.5"
                          />
                          <path d="M136 235 Q134 300 132 370" stroke="#000000" strokeWidth="0.4" strokeOpacity="0.1" fill="none" />
                          <path d="M164 235 Q166 300 168 370" stroke="#000000" strokeWidth="0.4" strokeOpacity="0.1" fill="none" />
                        </>
                      )}
                    </g>
                  )}

                  {/* GIÀY / HÀI / GUỐC THEO GIỚI TÍNH */}
                  <g id="footwear-shoes">
                    {outfit.selectedShoes === 'hai_theu_cung_dinh' ? (
                      isMale ? (
                        // Hài quan triều đình nam (mũi vuông vắn uy nghi)
                        <g>
                          <path d="M106 372 Q118 368 130 372 L128 383 L106 383 Z" fill="#7A1C28" stroke="#4A1018" strokeWidth="0.6" />
                          <path d="M170 372 Q182 368 194 372 L194 383 L172 383 Z" fill="#7A1C28" stroke="#4A1018" strokeWidth="0.6" />
                          <line x1="110" y1="375" x2="126" y2="375" stroke="#D4AF37" strokeWidth="1" />
                          <line x1="174" y1="375" x2="190" y2="375" stroke="#D4AF37" strokeWidth="1" />
                        </g>
                      ) : (
                        // Hài cong thêu hoa nữ (mũi hài hếch cong lên kiêu sa, hoa thêu nhụy vàng cung đình)
                        <g>
                          <path d="M128 375 Q135 369 146 373 L145 382 Q136 383 129 380 Q127 377 128 375 Z" fill="#881B28" stroke="#4A1018" strokeWidth="0.5" />
                          <path d="M154 373 Q165 369 172 375 Q173 377 171 380 Q164 383 155 382 Z" fill="#881B28" stroke="#4A1018" strokeWidth="0.5" />
                          <circle cx="135" cy="377" r="1.5" fill="#D4AF37" />
                          <circle cx="165" cy="377" r="1.5" fill="#D4AF37" />
                          <path d="M132 377 Q135 375 138 377" stroke="#FFF" strokeWidth="0.6" fill="none" />
                          <path d="M162 377 Q165 375 168 377" stroke="#FFF" strokeWidth="0.6" fill="none" />
                        </g>
                      )
                    ) : outfit.selectedShoes === 'guoc_moc_son_mai' ? (
                      isMale ? (
                        // Guốc mộc quai da đen nam (bản to vững chãi)
                        <g>
                          <path d="M106 376 L130 376 L128 384 L108 384 Z" fill="#7C503C" />
                          <rect x="110" y="372" width="16" height="5" fill="#1C1917" rx="1" />
                          <path d="M170 376 L194 376 L192 384 L172 384 Z" fill="#7C503C" />
                          <rect x="174" y="372" width="16" height="5" fill="#1C1917" rx="1" />
                        </g>
                      ) : (
                        // Guốc mộc thanh mảnh nữ (quai nhung đỏ son ôm chân)
                        <g>
                          <path d="M129 376 L147 376 L145 383 L131 383 Z" fill="#8D5B4C" />
                          <rect x="133" y="373" width="11" height="4" fill="#B83227" rx="1" />
                          <path d="M153 376 L171 376 L169 383 L155 383 Z" fill="#8D5B4C" />
                          <rect x="157" y="373" width="11" height="4" fill="#B83227" rx="1" />
                        </g>
                      )
                    ) : outfit.selectedShoes === 'mary_jane' ? (
                      // Giày búp bê Mary Jane nữ
                      <g>
                        <rect x={isMale ? "106" : "130"} y="372" width={isMale ? "24" : "18"} height="11" rx="4" fill="#1C1917" />
                        <line x1={isMale ? "108" : "131"} y1="375" x2={isMale ? "128" : "147"} y2="375" stroke="#D4AF37" strokeWidth="1" />
                        <rect x={isMale ? "170" : "152"} y="372" width={isMale ? "24" : "18"} height="11" rx="4" fill="#1C1917" />
                        <line x1={isMale ? "172" : "153"} y1="375" x2={isMale ? "192" : "169"} y2="375" stroke="#D4AF37" strokeWidth="1" />
                      </g>
                    ) : outfit.selectedShoes === 'sneaker_retro' ? (
                      // Sneaker Retro Samba / Stan Smith
                      <g>
                        <rect x={isMale ? "104" : "128"} y="370" width={isMale ? "28" : "20"} height="12" rx="4" fill="#FFFFFF" stroke="#D1D5DB" />
                        <rect x={isMale ? "102" : "127"} y="380" width={isMale ? "32" : "22"} height="4" rx="2" fill="#C5A059" />
                        <rect x={isMale ? "168" : "152"} y="370" width={isMale ? "28" : "20"} height="12" rx="4" fill="#FFFFFF" stroke="#D1D5DB" />
                        <rect x={isMale ? "166" : "151"} y="380" width={isMale ? "32" : "22"} height="4" rx="2" fill="#C5A059" />
                      </g>
                    ) : outfit.selectedShoes === 'sandal_quai_manh' ? (
                      // Sandal quai mảnh tối giản
                      <g>
                        <path d={isMale ? "M108 379 L128 379" : "M130 380 L146 380"} stroke="#8D5B4C" strokeWidth="2.5" />
                        <line x1={isMale ? "112" : "133"} y1="374" x2={isMale ? "124" : "143"} y2="374" stroke="#D4AF37" strokeWidth="1.2" />
                        <path d={isMale ? "M172 379 L192 379" : "M154 380 L170 380"} stroke="#8D5B4C" strokeWidth="2.5" />
                        <line x1={isMale ? "176" : "157"} y1="374" x2={isMale ? "188" : "167"} y2="374" stroke="#D4AF37" strokeWidth="1.2" />
                      </g>
                    ) : (
                      // Loafer da / Giày tối giản mặc định
                      isMale ? (
                        <g>
                          <path d="M106 372 Q118 368 130 372 L128 383 L106 383 Z" fill="#291811" />
                          <path d="M170 372 Q182 368 194 372 L194 383 L172 383 Z" fill="#291811" />
                        </g>
                      ) : (
                        <g>
                          <path d="M129 373 Q137 369 146 373 L145 382 L130 382 Z" fill="#291811" />
                          <path d="M154 373 Q163 369 171 373 L170 382 L155 382 Z" fill="#291811" />
                        </g>
                      )
                    )}
                  </g>
                </g>

                {/* LAYER 1.5: BASE ANATOMY NECK & CLAVICLE (DRAWN BEFORE ROBE SO COLLAR CLEANLY OVERLAYS) */}
                <g id="base-anatomy-neck" className="transition-all duration-300">
                  <path
                    d={
                      isMale
                        ? "M139 90 L135 116 L165 116 L161 90 Z"
                        : "M141 94 L138 112 L162 112 L159 94 Z"
                    }
                    fill={isMale ? "#E8C3AB" : "#FCEFE7"}
                  />
                  {!isMale ? (
                    <path d="M144 98 Q150 100 156 98" stroke="#E6C8B8" strokeWidth="0.6" fill="none" opacity="0.6" />
                  ) : (
                    <path d="M142 102 Q150 105 158 102" stroke="#D9A88F" strokeWidth="0.8" fill="none" opacity="0.6" />
                  )}
                </g>

                {/* LAYER 2: INNER ROBE / YẾM (Fills with innerColor.hex) */}
                {outfit.garmentId === 'ao_tu_than' ? (
                  isMale ? (
                    // Nam: Áo cánh lụa mỏng bên trong
                    <g id="inner-shirt-male">
                      <path
                        d="M134 116 L166 116 L170 190 L130 190 Z"
                        fill={outfit.innerColor.hex}
                        stroke="#5C5346"
                        strokeWidth="0.5"
                      />
                      <line x1="150" y1="116" x2="150" y2="190" stroke="#8D5B4C" strokeWidth="1" strokeDasharray="3,3" />
                    </g>
                  ) : null
                ) : outfit.garmentId === 'ao_giao_linh' ? null : (
                  <path
                    d="M138 108 L162 108 L160 120 L140 120 Z"
                    fill={outfit.innerColor.hex}
                    stroke="#5C5346"
                    strokeWidth="0.5"
                  />
                )}

                {/* LAYER 3: MAIN ROBE (PHOM QUẢ CHUÔNG CHỮ A NỮ VS CHỮ H THẲNG ĐỨNG NAM) */}
                {outfit.isSoloYem ? (
                  <g id="solo-yem-banned" className="transition-all duration-300">
                    {/* Bare Shoulders & Torso under Solo Yem */}
                    <path
                      d={isMale ? "M136 114 L114 126 C110 136 112 165 116 195 L124 234 L176 234 L184 195 C188 165 190 136 186 126 L164 114 Z" : "M136 116 L122 126 C118 136 120 165 124 195 L128 234 L172 234 L176 195 C180 165 182 136 178 126 L164 116 Z"}
                      fill={isMale ? "#E8C3AB" : "#FCEFE7"}
                      stroke="#E2B79F"
                      strokeWidth="0.5"
                    />
                    <path d={isMale ? "M116 126 C104 150 98 185 100 226" : "M122 126 C112 150 108 185 112 226"} stroke={isMale ? "#E8C3AB" : "#FCEFE7"} strokeWidth="10" strokeLinecap="round" fill="none" />
                    <path d={isMale ? "M184 126 C196 150 202 185 200 226" : "M178 126 C188 150 192 185 188 226"} stroke={isMale ? "#E8C3AB" : "#FCEFE7"} strokeWidth="10" strokeLinecap="round" fill="none" />

                    {/* The Silk Yếm */}
                    <path
                      d="M136 118 L164 118 L176 185 L150 215 L124 185 Z"
                      fill={outfit.innerColor.hex}
                      stroke="#B83227"
                      strokeWidth="1.5"
                    />
                    <line x1="138" y1="118" x2="148" y2="100" stroke="#B83227" strokeWidth="2" />
                    <line x1="162" y1="118" x2="152" y2="100" stroke="#B83227" strokeWidth="2" />
                  </g>
                ) : (
                  <g id="main-garment-body" className="transition-all duration-300">
                    {outfit.garmentId === 'ao_tu_than' ? (
                      <g id="garment-ao-tu-than">
                        {/* Vạt sau lưng may liền buông lơi */}
                        <path
                          d={isMale ? "M134 116 L166 116 L174 240 L126 240 Z" : "M136 116 L164 116 L172 260 L128 260 Z"}
                          fill={outfit.mainColor.hex}
                          opacity="0.88"
                        />
                        {/* Áo cánh lụa mỏng trắng lót trong */}
                        <path
                          d="M136 116 L120 126 L124 186 L176 186 L180 126 L164 116 Z"
                          fill="#F7F3EB"
                          stroke="#E3DAC9"
                          strokeWidth="0.5"
                        />
                        {/* Yếm đào lụa thắm quả trám che ngực (cho nữ) */}
                        {!isMale && (
                          <g id="tu-than-yem-dao">
                            <path
                              d="M136 122 L164 122 L172 170 L150 192 L128 170 Z"
                              fill={outfit.innerColor.hex}
                              stroke="#5C5346"
                              strokeWidth="0.5"
                            />
                            <line x1="138" y1="122" x2="148" y2="108" stroke="#B83227" strokeWidth="1.5" />
                            <line x1="162" y1="122" x2="152" y2="108" stroke="#B83227" strokeWidth="1.5" />
                            {/* Dải thắt lưng ruột tượng thắt ngang cạp váy */}
                            <path
                              d="M116 200 Q150 205 184 200 L182 212 Q150 216 118 212 Z"
                              fill="#D4AF37"
                              stroke="#8D5B4C"
                              strokeWidth="0.5"
                            />
                            <path d="M146 210 Q142 245 138 275" stroke="#D4AF37" strokeWidth="3" fill="none" />
                            <path d="M152 210 Q154 250 156 280" stroke="#B83227" strokeWidth="2.5" fill="none" />
                          </g>
                        )}
                        {/* HAI VẠT TRƯỚC ÁO TỨ THÂN BUÔNG RỜI HAI BÊN - ĐỂ LỘ RÕ 100% PHOM DÁNG CHÂN VÁY ĐỤP / MIDI Ở GIỮA */}
                        <path
                          d="M136 118 L92 160 L102 320 L124 320 L128 220 L136 180 Z"
                          fill={outfit.mainColor.hex}
                          stroke="#5C5346"
                          strokeWidth="0.5"
                        />
                        <path
                          d="M164 118 L208 160 L198 320 L176 320 L172 220 L164 180 Z"
                          fill={outfit.mainColor.hex}
                          stroke="#5C5346"
                          strokeWidth="0.5"
                        />
                      </g>
                    ) : outfit.garmentId === 'ao_giao_linh' ? (
                      <g id="garment-ao-giao-linh">
                        {/* Inner robe showing at V-neck */}
                        <path
                          d="M134 116 L175 165 L180 230 L120 230 Z"
                          fill={outfit.innerColor.hex}
                          opacity="0.9"
                        />
                        {/* Outer Giao Linh flap with authentic lapel direction */}
                        <path
                          d={
                            outfit.lapelDirection === 'ta_nham'
                              ? isMale
                                ? 'M126 112 L192 185 L188 322 Q150 326 112 322 L118 175 Z'
                                : 'M136 116 L192 185 L192 322 Q150 326 108 322 C115 280 126 230 136 180 Z'
                              : isMale
                              ? 'M174 112 L108 185 L112 322 Q150 326 188 322 L182 175 Z'
                              : 'M164 116 L108 185 L108 322 Q150 326 192 322 C185 280 174 230 164 180 Z'
                          }
                          fill={outfit.mainColor.hex}
                          stroke="#5C5346"
                          strokeWidth="0.5"
                        />
                        {/* Bạch Cổ - Nẹp lót trắng song song dưới mép cổ giao lĩnh */}
                        <path
                          d={
                            outfit.lapelDirection === 'ta_nham'
                              ? 'M124 114 L190 187'
                              : 'M176 114 L110 187'
                          }
                          stroke="#FFFFFF"
                          strokeWidth="3.5"
                          strokeOpacity="0.85"
                          fill="none"
                        />
                        {/* Nẹp cổ chính Giao Lĩnh nổi bật */}
                        <path
                          d={
                            outfit.lapelDirection === 'ta_nham'
                              ? 'M126 112 L192 185'
                              : 'M174 112 L108 185'
                          }
                          stroke={outfit.innerColor.hex}
                          strokeWidth="3.2"
                          fill="none"
                        />
                        {/* Đai lưng Đại đới thắt ngang eo & dải lụa buông dài */}
                        <path d="M112 196 Q150 200 188 196 L186 210 Q150 214 114 210 Z" fill="#C08457" />
                        <path d="M142 208 L138 290 L146 290 L150 208 Z" fill="#C08457" />
                        <path d="M152 208 L156 280 L162 280 L158 208 Z" fill="#8D5B4C" />
                      </g>
                    ) : (
                      <g id="garment-main-robes">
                        {/* THÂN ÁO CHÍNH (TỰ ĐỘNG RÚT NGẮN LÊN NGANG GỐI KHI PHỐI CHÂN VÁY MIDI / VÁY ĐỤP ĐỂ LỘ RÕ PHOM VÁY) */}
                        <path
                          d={
                            isMale
                              ? outfit.garmentId === 'ao_dai_cach_tan'
                                ? 'M126 112 L174 112 L182 170 L190 286 Q150 293 110 286 L118 170 Z'
                                : outfit.garmentId === 'ao_dai_truyen_thong'
                                ? 'M126 112 L174 112 L180 170 L196 358 Q150 363 104 358 L120 170 Z'
                                : 'M126 112 L174 112 L182 170 L191 318 Q150 324 109 318 L118 170 Z'
                              : isSkirtActive && (outfit.garmentId === 'ao_dai_cach_tan' || outfit.garmentId === 'ao_chen' || outfit.garmentId === 'ao_tac')
                              ? 'M134 110 L166 110 C167 140 169 170 172 200 C175 220 177 240 180 258 Q150 264 120 258 C123 240 125 220 128 200 C131 170 133 140 134 110 Z'
                              : outfit.garmentId === 'ao_dai_cach_tan'
                              ? 'M134 110 L166 110 C167 140 169 170 172 200 C175 230 180 260 186 286 Q150 293 114 286 C120 260 125 230 128 200 C131 170 133 140 134 110 Z'
                              : outfit.garmentId === 'ao_dai_truyen_thong'
                              ? 'M134 110 L166 110 C167 140 169 175 172 205 C176 245 183 305 191 358 Q150 363 109 358 C117 305 124 245 128 205 C131 175 133 140 134 110 Z'
                              : 'M134 110 L166 110 C167 140 169 175 172 205 C176 240 181 275 188 318 Q150 324 112 318 C119 275 124 240 128 205 C131 175 133 140 134 110 Z'
                          }
                          fill={outfit.mainColor.hex}
                          stroke="#5C5346"
                          strokeWidth="0.5"
                        />
                        {/* Silk weave & soft shading */}
                        <path
                          d={
                            isMale
                              ? outfit.garmentId === 'ao_dai_cach_tan'
                                ? 'M126 112 L174 112 L182 170 L190 286 Q150 293 110 286 L118 170 Z'
                                : outfit.garmentId === 'ao_dai_truyen_thong'
                                ? 'M126 112 L174 112 L180 170 L196 358 Q150 363 104 358 L120 170 Z'
                                : 'M126 112 L174 112 L182 170 L191 318 Q150 324 109 318 L118 170 Z'
                              : isSkirtActive && (outfit.garmentId === 'ao_dai_cach_tan' || outfit.garmentId === 'ao_chen' || outfit.garmentId === 'ao_tac')
                              ? 'M134 110 L166 110 C167 140 169 170 172 200 C175 220 177 240 180 258 Q150 264 120 258 C123 240 125 220 128 200 C131 170 133 140 134 110 Z'
                              : outfit.garmentId === 'ao_dai_cach_tan'
                              ? 'M134 110 L166 110 C167 140 169 170 172 200 C175 230 180 260 186 286 Q150 293 114 286 C120 260 125 230 128 200 C131 170 133 140 134 110 Z'
                              : outfit.garmentId === 'ao_dai_truyen_thong'
                              ? 'M134 110 L166 110 C167 140 169 175 172 205 C176 245 183 305 191 358 Q150 363 109 358 C117 305 124 245 128 205 C131 175 133 140 134 110 Z'
                              : 'M134 110 L166 110 C167 140 169 175 172 205 C176 240 181 275 188 318 Q150 324 112 318 C119 275 124 240 128 205 C131 175 133 140 134 110 Z'
                          }
                          fill="url(#robeShade)"
                        />
                        <path
                          d={
                            isMale
                              ? outfit.garmentId === 'ao_dai_cach_tan'
                                ? 'M126 112 L174 112 L182 170 L190 286 Q150 293 110 286 L118 170 Z'
                                : outfit.garmentId === 'ao_dai_truyen_thong'
                                ? 'M126 112 L174 112 L180 170 L196 358 Q150 363 104 358 L120 170 Z'
                                : 'M126 112 L174 112 L182 170 L191 318 Q150 324 109 318 L118 170 Z'
                              : isSkirtActive && (outfit.garmentId === 'ao_dai_cach_tan' || outfit.garmentId === 'ao_chen' || outfit.garmentId === 'ao_tac')
                              ? 'M134 110 L166 110 C167 140 169 170 172 200 C175 220 177 240 180 258 Q150 264 120 258 C123 240 125 220 128 200 C131 170 133 140 134 110 Z'
                              : outfit.garmentId === 'ao_dai_cach_tan'
                              ? 'M134 110 L166 110 C167 140 169 170 172 200 C175 230 180 260 186 286 Q150 293 114 286 C120 260 125 230 128 200 C131 170 133 140 134 110 Z'
                              : outfit.garmentId === 'ao_dai_truyen_thong'
                              ? 'M134 110 L166 110 C167 140 169 175 172 205 C176 245 183 305 191 358 Q150 363 109 358 C117 305 124 245 128 205 C131 175 133 140 134 110 Z'
                              : 'M134 110 L166 110 C167 140 169 175 172 205 C176 240 181 275 188 318 Q150 324 112 318 C119 275 124 240 128 205 C131 175 133 140 134 110 Z'
                          }
                          fill="url(#silkTexture)"
                        />

                        {/* CỔ ÁO THEO TỪNG DÒNG CỔ PHỤC */}
                        {outfit.garmentId !== 'ao_dai_cach_tan' ? (
                          // Cổ lập lĩnh truyền thống cho Áo Chẽn, Áo Tấc, Áo Dài Truyền Thống
                          <path
                            d={
                              isMale
                                ? "M132 104 Q150 108 168 104 L166 118 Q150 122 134 118 Z"
                                : "M136 98 Q150 102 164 98 L162 112 Q150 116 138 112 Z"
                            }
                            fill={outfit.mainColor.hex}
                            stroke="#5C5346"
                            strokeWidth="0.5"
                          />
                        ) : (
                          // Cổ áo dài cách tân Gen Z: Cổ tròn lượn mềm thanh thoát
                          <path
                            d={
                              isMale
                                ? "M134 108 Q150 112 166 108 L165 116 Q150 119 135 116 Z"
                                : "M138 102 Q150 106 162 102 L160 110 Q150 113 140 110 Z"
                            }
                            fill={outfit.mainColor.hex}
                            stroke="#5C5346"
                            strokeWidth="0.5"
                          />
                        )}

                        {/* NẸP ÁO HỮU NHẬM HOẶC TẢ NHẬM */}
                        <path
                          d={
                            outfit.lapelDirection === 'ta_nham'
                              ? (isMale ? 'M146 114 Q134 135 124 165 L122 250' : 'M146 108 Q134 135 124 165 L122 250')
                              : (isMale ? 'M154 114 Q166 135 176 165 L178 250' : 'M154 108 Q166 135 176 165 L178 250')
                          }
                          stroke={outfit.lapelDirection === 'ta_nham' ? '#B83227' : '#D4AF37'}
                          strokeWidth="1.8"
                          strokeDasharray={outfit.lapelDirection === 'ta_nham' ? '3,2' : 'none'}
                          fill="none"
                        />

                        {/* 5 KHUY NGŨ THƯỜNG (CHỈ XUẤT HIỆN TRÊN ÁO CHẼN VÀ ÁO TẤC THEO ĐÚNG CỔ CHẾ TRIỀU NGUYỄN) */}
                        {(outfit.garmentId === 'ao_chen' || outfit.garmentId === 'ao_tac') && (
                          outfit.lapelDirection === 'ta_nham' ? (
                            <g fill="#D4AF37" stroke="#2C241D" strokeWidth="0.5">
                              <circle cx="150" cy={isMale ? "118" : "110"} r="2.2" />
                              <circle cx="140" cy={isMale ? "128" : "124"} r="2.2" />
                              <circle cx="132" cy={isMale ? "144" : "142"} r="2.2" />
                              <circle cx="126" cy={isMale ? "162" : "162"} r="2.2" />
                              <circle cx="123" cy={isMale ? "184" : "184"} r="2.2" />
                            </g>
                          ) : (
                            <g fill="#D4AF37" stroke="#2C241D" strokeWidth="0.5">
                              <circle cx="150" cy={isMale ? "118" : "110"} r="2.2" />
                              <circle cx="160" cy={isMale ? "128" : "124"} r="2.2" />
                              <circle cx="168" cy={isMale ? "144" : "142"} r="2.2" />
                              <circle cx="174" cy={isMale ? "162" : "162"} r="2.2" />
                              <circle cx="177" cy={isMale ? "184" : "184"} r="2.2" />
                            </g>
                          )
                        )}
                      </g>
                    )}
                  </g>
                )}

                {/* LAYER 4: SLEEVES & ARMS (TAY THỤNG ĐẠI LỄ / TAY CHẼN THƯỜNG PHỤC) */}
                {!outfit.isSoloYem && (
                  <g id="garment-sleeves" className="transition-all duration-300">
                    {outfit.garmentId === 'ao_tac' ? (
                      outfit.isSleeveRolled ? (
                        // Xắn tay áo tấc (Cảnh báo sai quy cách lễ nghi)
                        <g>
                          <path d={isMale ? "M126 112 L86 150 L92 190 L120 170 Z" : "M136 116 L98 150 L102 190 L132 170 Z"} fill={outfit.mainColor.hex} stroke="#B83227" strokeWidth="1.5" />
                          <path d={isMale ? "M174 112 L214 150 L208 190 L180 170 Z" : "M164 116 L202 150 L198 190 L168 170 Z"} fill={outfit.mainColor.hex} stroke="#B83227" strokeWidth="1.5" />
                          <rect x={isMale ? "86" : "98"} y="180" width="12" height="15" fill="#D6CEBE" rx="2" />
                          <rect x={isMale ? "202" : "190"} y="180" width="12" height="15" fill="#D6CEBE" rx="2" />
                          {/* Exposed arms */}
                          <rect x={isMale ? "88" : "100"} y="195" width="8" height="30" rx="3" fill={isMale ? "#E8C3AB" : "#FCEFE7"} />
                          <rect x={isMale ? "204" : "192"} y="195" width="8" height="30" rx="3" fill={isMale ? "#E8C3AB" : "#FCEFE7"} />
                        </g>
                      ) : (
                        // Áo Tấc tay thụng 30-40cm buông dài trang nghiêm
                        <g>
                          <path
                            d={isMale ? "M126 112 L68 160 L54 280 L104 280 L118 170 Z" : "M136 118 L80 160 L68 280 L118 280 L130 170 Z"}
                            fill={outfit.mainColor.hex}
                            stroke="#5C5346"
                            strokeWidth="0.5"
                          />
                          <path
                            d={isMale ? "M174 112 L232 160 L246 280 L196 280 L182 170 Z" : "M164 118 L220 160 L232 280 L182 280 L170 170 Z"}
                            fill={outfit.mainColor.hex}
                            stroke="#5C5346"
                            strokeWidth="0.5"
                          />
                          <ellipse cx={isMale ? "79" : "93"} cy="280" rx="25" ry="5" fill={outfit.innerColor.hex} opacity="0.8" />
                          <ellipse cx={isMale ? "221" : "207"} cy="280" rx="25" ry="5" fill={outfit.innerColor.hex} opacity="0.8" />

                          {/* Bàn tay búp măng e ấp (nữ) vs đĩnh đạc (nam) lấp ló nơi cửa tay thụng */}
                          <g id="cuff-hands">
                            {isMale ? (
                              <>
                                <path d="M75 277 C74 275 79 274 83 276 L84 285 C84 288 80 289 78 288 Z" fill="#E8C3AB" />
                                <path d="M217 277 C217 275 221 274 225 276 L225 285 C225 288 222 289 219 288 Z" fill="#E8C3AB" />
                              </>
                            ) : (
                              <>
                                <path d="M90 277 C89 275 94 274 98 276 L98 285 C98 288 94 289 92 288 Z" fill="#FCEFE7" stroke="#DEAE95" strokeWidth="0.4" />
                                <path d="M202 277 C202 275 206 274 210 276 L210 285 C210 288 207 289 204 288 Z" fill="#FCEFE7" stroke="#DEAE95" strokeWidth="0.4" />
                              </>
                            )}
                          </g>
                        </g>
                      )
                    ) : (
                      // Áo Chẽn / Áo Dài tay chẽn ôm sát cổ tay
                      <g>
                        {isMale ? (
                          // Nam: Tay phải buông tự nhiên bên thân, tay trái gập nhẹ ngang ngực cầm thư tịch
                          <>
                            {/* Tay phải buông thẳng */}
                            <path d="M174 112 L206 150 L202 230 L190 230 L180 170 Z" fill={outfit.mainColor.hex} stroke="#5C5346" strokeWidth="0.5" />
                            <path d="M202 226 C204 228 204 238 201 241 C198 243 194 242 193 237 L193 226 Z" fill="#E8C3AB" />

                            {/* Tay trái gập nhẹ cầm sách */}
                            <path d="M126 112 L94 150 L110 215 L124 210 L118 170 Z" fill={outfit.mainColor.hex} stroke="#5C5346" strokeWidth="0.5" />
                            <path d="M110 210 C108 212 110 220 114 222 C118 222 120 218 119 212 Z" fill="#E8C3AB" />
                          </>
                        ) : (
                          // Nữ: Hai cánh tay khép e ấp trước bụng, bàn tay búp măng nâng quạt lụa
                          <>
                            <path d="M136 118 L104 155 L124 218 L138 214 L128 170 Z" fill={outfit.mainColor.hex} stroke="#5C5346" strokeWidth="0.5" />
                            <path d="M164 118 L196 155 L176 218 L162 214 L172 170 Z" fill={outfit.mainColor.hex} stroke="#5C5346" strokeWidth="0.5" />
                            {/* Bàn tay búp măng ngọc ngà khép e ấp */}
                            <path d="M124 214 C123 216 128 224 133 223 C137 222 138 216 136 212 Z" fill="#FCEFE7" stroke="#DEAE95" strokeWidth="0.4" />
                            <path d="M176 214 C177 216 172 224 167 223 C163 222 162 216 164 212 Z" fill="#FCEFE7" stroke="#DEAE95" strokeWidth="0.4" />
                          </>
                        )}
                      </g>
                    )}
                  </g>
                )}

                {/* LAYER 5: OUTERWEAR (BLAZER OVERSIZE Draped on Shoulders) */}
                {outfit.selectedOuterwear === 'blazer_oversize' && (
                  <g id="outer-blazer" className="transition-all duration-300">
                    <path
                      d={isMale ? "M118 108 L64 145 L70 265 L100 255 L114 160 Z" : "M124 112 L78 145 L84 265 L108 255 L120 160 Z"}
                      fill="#2A2A2E"
                      opacity="0.96"
                    />
                    <path
                      d={isMale ? "M182 108 L236 145 L230 265 L200 255 L186 160 Z" : "M176 112 L222 145 L216 265 L192 255 L180 160 Z"}
                      fill="#2A2A2E"
                      opacity="0.96"
                    />
                    <path d={isMale ? "M118 108 L182 108 L170 135 L130 135 Z" : "M124 112 L176 112 L166 135 L134 135 Z"} fill="#2A2A2E" />
                    <line x1={isMale ? "86" : "96"} y1="145" x2={isMale ? "100" : "106"} y2="215" stroke="#4B4B52" strokeWidth="1" />
                    <line x1={isMale ? "214" : "204"} y1="145" x2={isMale ? "200" : "194"} y2="215" stroke="#4B4B52" strokeWidth="1" />
                  </g>
                )}

                {/* BANNED: Japanese Obi Belt */}
                {outfit.selectedOuterwear === 'dai_that_obi' && (
                  <g id="obi-banned">
                    <rect x="110" y="180" width="80" height="34" fill="#E11D48" rx="2" stroke="#B83227" strokeWidth="1" />
                    <rect x="130" y="184" width="40" height="26" fill="#FDE047" rx="1" />
                    <line x1="110" y1="197" x2="190" y2="197" stroke="#ffffff" strokeWidth="1.5" />
                  </g>
                )}

                {/* LAYER 6: RIGGED HEAD, HAIR & FACIAL FEATURES (CHUẨN MỰC NAM NỮ CUNG ĐÌNH) */}
                <g
                  id="head-face-hair"
                  transform={
                    isMale
                      ? `translate(150, 73.5) scale(${headCompX.toFixed(4)}, ${headCompY.toFixed(4)}) translate(-150, -70)`
                      : `translate(150, 78.5) scale(${(headCompX * 0.94).toFixed(4)}, ${(headCompY * 0.94).toFixed(4)}) translate(-150, -70)`
                  }
                  className="transition-all duration-300"
                >
                  {/* KHUÔN MẶT: TRÁI XOAN THANH TÚ NỮ VS GÓC CẠNH VUÔNG VỨC NAM */}
                  <path
                    d={
                      isMale
                        ? "M132 58 C132 46 139 42 150 42 C161 42 168 46 168 58 C168 76 163 88 150 89 C137 88 132 76 132 58 Z"
                        : "M134 60 C134 46 141 42 150 42 C159 42 166 46 166 60 C166 78 159 88 150 88 C141 88 134 78 134 60 Z"
                    }
                    fill={isMale ? "#F4CFBA" : "#FCEFE7"}
                    stroke={isMale ? "#D9A88F" : "#E6C8B8"}
                    strokeWidth="0.6"
                  />

                  {/* TAI NAM / NỮ */}
                  {isMale && (
                    <>
                      <path d="M132 63 C130 63 129 73 132 75 Z" fill="#E8C3AB" />
                      <path d="M168 63 C170 63 171 73 168 75 Z" fill="#E8C3AB" />
                    </>
                  )}

                  {/* KHUYÊN TAI NGỌC TRAI TRẮNG NGÀ NỮ (ĐUNG ĐƯA SÁT CỔ) */}
                  {!isMale && (
                    <g id="female-pearl-earrings">
                      <line x1="133.5" y1="72" x2="133.5" y2="76" stroke="#D4AF37" strokeWidth="0.8" />
                      <circle cx="133.5" cy="78.5" r="2.5" fill="#FFFDF0" stroke="#E3DAC9" strokeWidth="0.5" />
                      <line x1="166.5" y1="72" x2="166.5" y2="76" stroke="#D4AF37" strokeWidth="0.8" />
                      <circle cx="166.5" cy="78.5" r="2.5" fill="#FFFDF0" stroke="#E3DAC9" strokeWidth="0.5" />
                    </g>
                  )}

                  {/* FACE SWAP PHOTO OR ILLUSTRATED FEATURES */}
                  {outfit.customFacePhotoUrl ? (
                    <image
                      href={outfit.customFacePhotoUrl}
                      x="125"
                      y="46"
                      width="50"
                      height="52"
                      preserveAspectRatio="xMidYMid slice"
                      clipPath="url(#userFaceClip)"
                    />
                  ) : (
                    <g id="illustrated-facial-features">
                      {isMale ? (
                        // NÉT MẶT NAM: Chân mày rậm ngang, ánh mắt kiên định, môi tự nhiên cương nghị
                        <>
                          {/* Chân mày rậm ngang hơi xếch */}
                          <path d="M137 63 L146 62.5" stroke="#1F1E22" strokeWidth="2.2" strokeLinecap="round" fill="none" />
                          <path d="M154 62.5 L163 63" stroke="#1F1E22" strokeWidth="2.2" strokeLinecap="round" fill="none" />
                          {/* Mắt đĩnh đạc */}
                          <path d="M138 68 Q142 66 146 68" stroke="#221F1E" strokeWidth="1.2" fill="none" />
                          <ellipse cx="142" cy="69" rx="1.8" ry="1.4" fill="#221F1E" />
                          <path d="M154 68 Q158 66 162 68" stroke="#221F1E" strokeWidth="1.2" fill="none" />
                          <ellipse cx="158" cy="69" rx="1.8" ry="1.4" fill="#221F1E" />
                          {/* Sống mũi cao */}
                          <path d="M150 66 L149 74 Q150.5 75.5 152 74" stroke="#C28B72" strokeWidth="0.9" fill="none" />
                          {/* Môi cương nghị */}
                          <path d="M145 80 Q150 81.5 155 80" stroke="#A8624C" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                        </>
                      ) : (
                        // NÉT MẶT NỮ: Mày lá liễu thanh mảnh Á Đông, khoảng cách 2 mắt cân đối chuẩn 1 con mắt, môi chúm chím e ấp hình cánh cung
                        <>
                          {/* Đôi mày lá liễu cong nhẹ thanh mảnh */}
                          <path d="M138.5 63.5 Q142.5 61 146.5 63.5" stroke="#3A2E2B" strokeWidth="0.9" strokeLinecap="round" fill="none" />
                          <path d="M153.5 63.5 Q157.5 61 161.5 63.5" stroke="#3A2E2B" strokeWidth="0.9" strokeLinecap="round" fill="none" />

                          {/* Mắt bồ câu to tròn, khoảng cách giữa 2 mắt bằng chiều dài 1 con mắt (7.5px) */}
                          <path d="M139 67.5 Q142.5 65.2 146.2 67.5" stroke="#3A2E2B" strokeWidth="0.95" fill="none" />
                          <ellipse cx="142.5" cy="68.2" rx="2.3" ry="1.7" fill="#1C1A19" />
                          <circle cx="143" cy="67.7" r="0.65" fill="#FFFFFF" />
                          <path d="M139 67.5 Q137.5 67 137 66.5" stroke="#3A2E2B" strokeWidth="0.6" fill="none" />
                          <path d="M140 69 Q142.5 70 145.5 69" stroke="#D8A890" strokeWidth="0.4" fill="none" />

                          <path d="M153.8 67.5 Q157.5 65.2 161 67.5" stroke="#3A2E2B" strokeWidth="0.95" fill="none" />
                          <ellipse cx="157.5" cy="68.2" rx="2.3" ry="1.7" fill="#1C1A19" />
                          <circle cx="158" cy="67.7" r="0.65" fill="#FFFFFF" />
                          <path d="M161 67.5 Q162.5 67 163 66.5" stroke="#3A2E2B" strokeWidth="0.6" fill="none" />
                          <path d="M154.5 69 Q157.5 70 160 69" stroke="#D8A890" strokeWidth="0.4" fill="none" />

                          {/* Gò má phớt hồng đào e ấp */}
                          <ellipse cx="137" cy="73" rx="3.5" ry="2" fill="#E08B7A" opacity="0.32" />
                          <ellipse cx="163" cy="73" rx="3.5" ry="2" fill="#E08B7A" opacity="0.32" />

                          {/* Sống mũi thanh tú Á Đông */}
                          <path d="M150 67 L149.6 73.5 Q150.5 75 151.6 73.8" stroke="#D8A890" strokeWidth="0.65" fill="none" />

                          {/* Đôi môi chúm chím viền môi trên cong nhẹ hình cánh cung (Cupid's bow) e ấp duyên dáng */}
                          <path d="M146 79.5 Q148 78 150 78.8 Q152 78 154 79.5 Q150 80.8 146 79.5 Z" fill="#E25C6E" />
                          <path d="M146.5 79.5 Q150 80.2 153.5 79.5 Q150 83.2 146.5 79.5 Z" fill="#D94B5E" />
                          <path d="M146 79.5 Q150 80.4 154 79.5" stroke="#B32D42" strokeWidth="0.5" fill="none" />
                          <ellipse cx="150" cy="81" rx="1.8" ry="0.7" fill="#FFA5B5" opacity="0.6" />
                        </>
                      )}
                    </g>
                  )}

                  {/* KÍNH MẮT KIM LOẠI TRÍ THỨC (CHÍNH XÁC VỚI CẢ NAM VÀ NỮ) */}
                  {outfit.selectedGlasses === 'kinh_kim_loai' && (
                    <g id="scholar-glasses" className="transition-all duration-300">
                      <ellipse cx={isMale ? "142" : "143.5"} cy="68.5" rx="4.5" ry="4.5" fill="none" stroke="#D4AF37" strokeWidth="0.8" />
                      <ellipse cx={isMale ? "158" : "156.5"} cy="68.5" rx="4.5" ry="4.5" fill="none" stroke="#D4AF37" strokeWidth="0.8" />
                      <path d={isMale ? "M146.5 68.5 Q150 66.5 153.5 68.5" : "M148 68.5 Q150 66.5 152 68.5"} stroke="#D4AF37" strokeWidth="0.8" fill="none" />
                      <line x1={isMale ? "137.5" : "139"} y1="68.5" x2="133" y2="67" stroke="#D4AF37" strokeWidth="0.8" />
                      <line x1={isMale ? "162.5" : "161"} y1="68.5" x2="167" y2="67" stroke="#D4AF37" strokeWidth="0.8" />
                    </g>
                  )}

                  {/* KIỂU TÓC & PHỤ KIỆN ĐỘI ĐẦU THEO GIỚI TÍNH (KHÔNG XUNG ĐỘT) */}
                  {isMale ? (
                    // NAM:
                    outfit.selectedHeadwear === 'khan_dong' ? (
                      // Khăn Đóng Chữ Nhất nếp gấp xếp lớp ngang trán
                      <g id="male-khan-dong-hair">
                        <ellipse cx="150" cy="50" rx="25" ry="12" fill="#18181B" stroke="#27272A" strokeWidth="0.8" />
                        <path d="M127 52 Q150 59 173 52" stroke="#45454D" strokeWidth="1.4" fill="none" />
                        <path d="M129 48 Q150 55 171 48" stroke="#45454D" strokeWidth="1.4" fill="none" />
                        <path d="M132 44 Q150 51 168 44" stroke="#45454D" strokeWidth="1.4" fill="none" />
                        <path d="M135 40 Q150 47 165 40" stroke="#45454D" strokeWidth="1.2" fill="none" />
                      </g>
                    ) : outfit.selectedHeadwear === 'non_la_hue' ? (
                      // Tóc nam gọn gàng + Nón Lá (Nâng cao 28px để đỉnh đầu vừa vặn lòng nón và lộ trọn vẹn đôi mắt cùng chân mày)
                      <g id="male-non-la" transform="translate(0, -28)">
                        <path d="M130 54 Q150 44 170 54 L168 62 Q150 50 132 62 Z" fill="#1E1E22" />
                        <path d="M150 16 L106 56 L194 56 Z" fill="#EADBC8" stroke="#B8A892" strokeWidth="1" />
                        <ellipse cx="150" cy="56" rx="44" ry="8" fill="#E0CEB7" />
                        <path d="M122 56 Q150 118 178 56" stroke="#4A3B32" strokeWidth="1.5" fill="none" />
                      </g>
                    ) : (
                      // Tóc chải ngôi cổ điển nam tính, vầng trán cao sáng sủa
                      <g id="male-classic-hair">
                        <path
                          d="M132 62 C130 46 142 42 150 42 C158 42 170 46 168 62 C164 54 158 50 150 50 C142 50 136 54 132 62 Z"
                          fill="#1C1B1F"
                        />
                      </g>
                    )
                  ) : (
                    // NỮ:
                    <g id="female-hair-and-headwear">
                      {/* Tóc rẽ ngôi giữa (ngôi trâu) thanh tân */}
                      <path
                        d="M150 48 Q140 52 134 62 L134 46 Q142 42 150 42 Q158 42 166 46 L166 62 Q160 52 150 48 Z"
                        fill="#161517"
                      />

                      {/* Hai lọn tóc mai lơi nhẹ buông thái dương */}
                      <path d="M134 62 Q131 72 133 80" stroke="#161517" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                      <path d="M166 62 Q169 72 167 80" stroke="#161517" strokeWidth="1.5" strokeLinecap="round" fill="none" />

                      {/* Phụ kiện đội đầu riêng biệt, không chồng chéo */}
                      {outfit.selectedHeadwear === 'khan_dong' ? (
                        // Khăn Vấn Nhung phồng tròn quý phái bao quanh đầu
                        <g id="female-khan-van">
                          <path
                            d="M125 54 C122 34 136 30 150 30 C164 30 178 34 175 54 C172 44 162 38 150 38 C138 38 128 44 125 54 Z"
                            fill="#141316"
                            stroke="#2B2832"
                            strokeWidth="0.8"
                          />
                          <path d="M130 46 Q150 40 170 46" stroke="#3D3A47" strokeWidth="1.2" fill="none" opacity="0.6" />
                        </g>
                      ) : outfit.selectedHeadwear === 'bom_nhung' ? (
                        // Bờm Nhung Quý Phái ôm vòng đầu
                        <g id="female-bom-nhung">
                          <path d="M130 60 C130 38 140 34 150 34 C160 34 170 38 170 60" stroke="#7A1C28" strokeWidth="5.5" fill="none" strokeLinecap="round" />
                          <path d="M130 60 C130 38 140 34 150 34 C160 34 170 38 170 60" stroke="#D4AF37" strokeWidth="0.8" fill="none" strokeLinecap="round" strokeDasharray="3,3" />
                        </g>
                      ) : outfit.selectedHeadwear === 'non_quai_thao' ? (
                        // Nón Ba Tầm / Quai Thao phẳng tròn rộng vành
                        <g id="female-non-quai-thao">
                          <ellipse cx="150" cy="42" rx="46" ry="12" fill="#DFC9A8" stroke="#8D5B4C" strokeWidth="1" />
                          <ellipse cx="150" cy="41" rx="42" ry="10" fill="#E8D7BE" />
                          <path d="M110 48 Q105 130 115 220" stroke="#8D5B4C" strokeWidth="1.5" fill="none" />
                          <path d="M190 48 Q195 130 185 220" stroke="#8D5B4C" strokeWidth="1.5" fill="none" />
                          <circle cx="115" cy="222" r="3" fill="#D4AF37" />
                          <circle cx="185" cy="222" r="3" fill="#D4AF37" />
                        </g>
                      ) : outfit.selectedHeadwear === 'non_la_hue' ? (
                        // Nón Lá Bài Thơ Xứ Huế - Nâng cao 28px để đỉnh đầu vừa vặn lòng nón và lộ trọn vẹn đôi mắt cùng chân mày
                        <g id="female-non-la" transform="translate(0, -28)">
                          <path d="M150 16 L106 56 L194 56 Z" fill="#EADBC8" stroke="#B8A892" strokeWidth="1" />
                          <ellipse cx="150" cy="56" rx="44" ry="8" fill="#E0CEB7" />
                          <path d="M122 56 Q150 118 178 56" stroke="#7A3E65" strokeWidth="1.5" fill="none" />
                        </g>
                      ) : outfit.selectedHeadwear === 'khan_mo_qua' ? (
                        // Khăn Mỏ Quạ Đen Kinh Bắc
                        <g id="female-khan-mo-qua">
                          <path d="M126 60 Q150 34 174 60 L164 78 L150 76 L136 78 Z" fill="#18181A" />
                          <path d="M145 56 L150 63 L155 56 Z" fill="#18181A" />
                        </g>
                      ) : outfit.selectedHeadwear === 'tram_cai_thanh_trieu' ? (
                        // Trâm Cài Thanh Triều
                        <g transform="translate(150, 32)">
                          <rect x="-35" y="-12" width="70" height="14" rx="4" fill="#0F172A" />
                          <circle cx="0" cy="-6" r="14" fill="#E11D48" stroke="#BE123C" strokeWidth="1" />
                          <circle cx="0" cy="-6" r="6" fill="#FDE047" />
                          <line x1="-28" y1="2" x2="-28" y2="35" stroke="#E11D48" strokeWidth="2" />
                          <line x1="28" y1="2" x2="28" y2="35" stroke="#E11D48" strokeWidth="2" />
                        </g>
                      ) : outfit.selectedHeadwear === 'kep_cang_cua' ? (
                        null
                      ) : (
                        // Mặc định tóc vấn trần thanh tú
                        <path
                          d="M130 52 C126 40 136 36 150 36 C164 36 174 40 170 52 C166 44 158 40 150 40 C142 40 134 44 130 52 Z"
                          fill="#1C1B1F"
                        />
                      )}

                      {/* BỔ SUNG CỤM SVG KẸP CÀNG CUA NGỌC TRAI (REMIX) VỚI ID #accessory-kep-cang-cua */}
                      <g
                        id="accessory-kep-cang-cua"
                        style={{ display: outfit.selectedHeadwear === 'kep_cang_cua' ? 'block' : 'none' }}
                        className="transition-all duration-300"
                      >
                        {/* Búi tóc củ tỏi Gen Z đỉnh đầu */}
                        <ellipse cx="158" cy="38" rx="9" ry="7" fill="#161517" />
                        <path d="M152 42 Q158 34 165 40" stroke="#2B2832" strokeWidth="1" fill="none" />
                        
                        {/* Càng kẹp kim loại mạ vàng hoàng gia 18K */}
                        <path
                          d="M152 35 C154 30 162 30 165 34 C167 37 165 41 161 41 C157 41 151 38 152 35 Z"
                          fill="#F4D03F"
                          stroke="#B8860B"
                          strokeWidth="0.8"
                        />
                        <path d="M155 33 L155 39 M158 32 L158 40 M161 33 L161 39" stroke="#B8860B" strokeWidth="0.8" strokeLinecap="round" />

                        {/* Chuỗi 5 hạt ngọc trai tự nhiên cao cấp đính trên lưng kẹp */}
                        <g id="claw-clip-pearls">
                          <circle cx="153" cy="36" r="1.8" fill="#FFFDF8" stroke="#E5C368" strokeWidth="0.4" />
                          <circle cx="156.5" cy="34.2" r="2.3" fill="#FFFDF8" stroke="#E5C368" strokeWidth="0.4" />
                          <circle cx="160.5" cy="33.5" r="2.8" fill="#FFFFFF" stroke="#E5C368" strokeWidth="0.5" />
                          <circle cx="161.2" cy="32.7" r="0.8" fill="#FFFFFF" />
                          <circle cx="164.5" cy="34.5" r="2.3" fill="#FFFDF8" stroke="#E5C368" strokeWidth="0.4" />
                          <circle cx="168" cy="36.5" r="1.8" fill="#FFFDF8" stroke="#E5C368" strokeWidth="0.4" />
                        </g>

                        {/* Lọn tóc mai buông lơi tự nhiên */}
                        <path d="M166 40 Q171 52 168 64" stroke="#161517" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                      </g>
                    </g>
                  )}
                </g>

                {/* LAYER 7: HANDHELD ACCESSORIES (CHỈ VẼ KHI ĐƯỢC CHỌN, KHÔNG ÉP CẦM) */}
                <g id="handheld-accessories" className="transition-all duration-300">
                  {outfit.selectedHandheld === 'quat_xep_giay_do' ? (
                    isMale ? (
                      // Quạt nan giấy dó xếp gọn nam tính kèm tua rua vàng
                      <g transform="translate(108, 202) rotate(-22)">
                        <rect x="0" y="0" width="8" height="42" rx="2" fill="#8D5B4C" stroke="#5C3B0E" strokeWidth="0.8" />
                        <line x1="4" y1="0" x2="4" y2="42" stroke="#D4AF37" strokeWidth="0.8" />
                        <circle cx="4" cy="40" r="1.5" fill="#D4AF37" />
                        <line x1="4" y1="42" x2="2" y2="52" stroke="#B83227" strokeWidth="1.2" />
                      </g>
                    ) : (
                      // Quạt lụa tròn cung đình (đoàn phiến) thêu hoa sen đào kèm ngón tay búp măng đặt nhẹ mép quạt
                      <g transform="translate(150, 214)">
                        {/* Mặt quạt lụa tròn thêu hoa sen đào */}
                        <circle cx="0" cy="0" r="20" fill="#FAF7F2" stroke="#D4AF37" strokeWidth="1.2" />
                        <path d="M-6 4 Q0 -4 6 -2" stroke="#8D5B4C" strokeWidth="0.8" fill="none" />
                        <circle cx="-1" cy="-2" r="2.5" fill="#E05A6D" />
                        <circle cx="4" cy="-4" r="2" fill="#E05A6D" />
                        <circle cx="0" cy="2" r="1.5" fill="#D4AF37" />
                        <line x1="0" y1="20" x2="0" y2="38" stroke="#8D5B4C" strokeWidth="1.8" strokeLinecap="round" />
                        <line x1="0" y1="38" x2="-2" y2="52" stroke="#D4AF37" strokeWidth="1.2" />
                        <circle cx="-2" cy="52" r="1.2" fill="#D4AF37" />

                        {/* BÀN TAY NGỌC NGÀ: CÁC NGÓN TAY BÚP MĂNG THON NHỎ ĐẶT NHẸ LÊN MÉP QUẠT */}
                        {/* Ngón trỏ búp măng thon nhỏ tựa nhẹ lên vành quạt */}
                        <path
                          d="M-17 14 C-14 13 -8 17 -6 20 C-6.5 21.5 -8 22 -10 20 C-13 18 -16 17 -17 15 Z"
                          fill="#FCEFE7"
                          stroke="#DEAE95"
                          strokeWidth="0.45"
                        />
                        {/* Ngón giữa búp măng ôm nhẹ mép quạt */}
                        <path
                          d="M-16 17 C-12 16 -5 21 -4 24 C-4.5 25.5 -6 26 -8 24 C-11 22 -14 20 -16 18 Z"
                          fill="#FCEFE7"
                          stroke="#DEAE95"
                          strokeWidth="0.45"
                        />
                        {/* Ngón áp út e ấp */}
                        <path
                          d="M-14 21 C-11 20 -5 24 -4 27 C-4.5 28.5 -6 29 -7 27 C-10 25 -12 23 -14 22 Z"
                          fill="#FCEFE7"
                          stroke="#DEAE95"
                          strokeWidth="0.45"
                        />
                        {/* Ngón út thon dài duyên dáng */}
                        <path
                          d="M-12 25 C-10 24 -6 27 -6 29 C-6.5 30.5 -8 30.5 -9 29 C-11 27 -12 26 -12 25 Z"
                          fill="#FCEFE7"
                          stroke="#DEAE95"
                          strokeWidth="0.4"
                        />
                        {/* Tay phải khẽ đỡ mép đối xứng / cán quạt */}
                        <path
                          d="M12 16 C8 15 3 19 2 22 C2.5 23.5 4 24 6 22 C9 20 11 18 12 17 Z"
                          fill="#FCEFE7"
                          stroke="#DEAE95"
                          strokeWidth="0.45"
                        />
                        <path
                          d="M10 20 C7 19 2 23 2 25 C2.5 26.5 4 27 5 25 C8 23 10 21 10 20 Z"
                          fill="#FCEFE7"
                          stroke="#DEAE95"
                          strokeWidth="0.45"
                        />
                      </g>
                    )
                  ) : outfit.selectedHandheld === 'tui_tote_canvas' ? (
                    isMale ? (
                      // Túi tote nam vải canvas đen/be tối giản
                      <g transform="translate(86, 204)">
                        <path d="M7 0 L7 -16 L23 -16 L23 0" fill="none" stroke="#2C241D" strokeWidth="1.4" />
                        <rect x="0" y="0" width="30" height="36" rx="2" fill="#FAF7F2" stroke="#6B5E51" strokeWidth="0.8" />
                        <circle cx="15" cy="18" r="5" fill="#1B3B6F" opacity="0.8" />
                      </g>
                    ) : (
                      // Túi tote nữ in họa tiết cổ truyền xinh xắn
                      <g transform="translate(122, 215)">
                        <path d="M8 0 L8 -14 L22 -14 L22 0" fill="none" stroke="#5C5346" strokeWidth="1.2" />
                        <rect x="0" y="0" width="28" height="34" rx="2" fill="#FAF7F2" stroke="#8D5B4C" strokeWidth="0.8" />
                        <circle cx="14" cy="15" r="4.5" fill="#B83227" opacity="0.7" />
                      </g>
                    )
                  ) : outfit.selectedHandheld === 'clutch_vintage' ? (
                    isMale ? (
                      // Clutch da bò lịch lãm nam tính
                      <g transform="translate(94, 212)">
                        <rect x="0" y="0" width="28" height="18" rx="2" fill="#4E342E" stroke="#3E2723" strokeWidth="1" />
                        <line x1="0" y1="7" x2="28" y2="7" stroke="#D4AF37" strokeWidth="0.8" />
                        <rect x="12" y="5" width="4" height="4" fill="#D4AF37" rx="0.5" />
                      </g>
                    ) : (
                      // Clutch nữ vintage da mềm khóa vàng
                      <g transform="translate(138, 214)">
                        <rect x="0" y="0" width="26" height="16" rx="2" fill="#5D4037" stroke="#3E2723" strokeWidth="1" />
                        <path d="M0 0 L13 8 L26 0" fill="none" stroke="#D4AF37" strokeWidth="0.8" />
                      </g>
                    )
                  ) : null}
                </g>

            {/* CÀNH HOA ĐÀO PHAI & ẤN TRIỆN SON ĐỎ HỌA SẮC VIỆT (HẠ THẤP TỌA ĐỘ DƯỚI THANH CÔNG CỤ 38PX, LỘ DIỆN TRỌN VẸN RÕ NÉT) */}
            <g id="peach-branch-and-seal" className="pointer-events-none select-none">
              {/* Nhánh cành đào uốn lượn phong vị tranh thủy mặc */}
              <g opacity="0.9">
                {/* Thân cành đào chính */}
                <path
                  d="M 302 28 Q 275 38 256 58 Q 244 72 238 90"
                  fill="none"
                  stroke="#543828"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                {/* Nhánh phụ nhỏ */}
                <path
                  d="M 270 45 Q 252 42 242 48"
                  fill="none"
                  stroke="#543828"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
                <path
                  d="M 248 68 Q 235 68 226 76"
                  fill="none"
                  stroke="#543828"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />

                {/* Các nốt nụ và đóa hoa đào xuân phớt hồng thanh nhã */}
                {/* Đóa hoa đào 1 (gần ngọn nhánh phụ trên) */}
                <g transform="translate(242, 47)">
                  <circle cx="0" cy="0" r="4.2" fill="#FDA4AF" opacity="0.95" />
                  <circle cx="-2.5" cy="-2.5" r="3.2" fill="#FB7185" opacity="0.85" />
                  <circle cx="2.5" cy="-2" r="3.2" fill="#FB7185" opacity="0.85" />
                  <circle cx="-2" cy="2.5" r="3.2" fill="#F43F5E" opacity="0.8" />
                  <circle cx="2" cy="2.5" r="3.2" fill="#FB7185" opacity="0.85" />
                  <circle cx="0" cy="0" r="1.5" fill="#FEF08A" />
                </g>

                {/* Đóa hoa đào 2 (bên cạnh nhánh dưới) */}
                <g transform="translate(228, 77)">
                  <circle cx="0" cy="0" r="4" fill="#FDA4AF" opacity="0.95" />
                  <circle cx="-2.2" cy="-2.2" r="3" fill="#FB7185" opacity="0.85" />
                  <circle cx="2.2" cy="-1.8" r="3" fill="#FB7185" opacity="0.85" />
                  <circle cx="-1.8" cy="2.2" r="3" fill="#F43F5E" opacity="0.8" />
                  <circle cx="1.8" cy="2.2" r="3" fill="#FB7185" opacity="0.85" />
                  <circle cx="0" cy="0" r="1.4" fill="#FEF08A" />
                </g>

                {/* Nụ đào chúm chím */}
                <ellipse cx="282" cy="36" rx="2.2" ry="3.2" fill="#FB7185" transform="rotate(-30 282 36)" />
                <ellipse cx="236" cy="92" rx="2" ry="2.8" fill="#F43F5E" transform="rotate(20 236 92)" />
                {/* Lộc biếc non đầu cành */}
                <path d="M 276 38 Q 272 34 270 37 Q 272 40 276 38 Z" fill="#65A30D" />
                <path d="M 244 65 Q 240 62 238 65 Q 241 67 244 65 Z" fill="#65A30D" />
              </g>

              {/* CON DẤU ĐỎ TRIỆN SON "HỌA SẮC VIỆT" - HẠ TỌA ĐỘ XUỐNG DƯỚI THANH CÔNG CỤ (Y=62) LỘ DIỆN RÕ NÉT */}
              <g transform="translate(242, 62)">
                <rect
                  x="0"
                  y="0"
                  width="36"
                  height="36"
                  rx="6"
                  fill="#B83227"
                  fillOpacity="0.92"
                  stroke="#8A1C14"
                  strokeWidth="1.5"
                />
                {/* Viền chỉ vàng mảnh phong cách ấn triện hoàng gia */}
                <rect
                  x="2.5"
                  y="2.5"
                  width="31"
                  height="31"
                  rx="4"
                  fill="none"
                  stroke="#FDE047"
                  strokeWidth="0.6"
                  strokeOpacity="0.5"
                />
                <text
                  x="18"
                  y="15"
                  fill="#FFFFFF"
                  fontSize="7.5"
                  fontFamily="'Playfair Display', 'Lora', 'Be Vietnam Pro', Georgia, serif"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  HỌA SẮC
                </text>
                <text
                  x="18"
                  y="26"
                  fill="#FFFFFF"
                  fontSize="7.5"
                  fontFamily="'Playfair Display', 'Lora', 'Be Vietnam Pro', Georgia, serif"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  VIỆT
                </text>
              </g>
            </g>

            {/* HERITAGE ANATOMY HOTSPOTS (FEATURE #1: TRA CỨU CỔ TỪ - NÚT LUÔN NHẤP NHÁY, CHỈ HIỆN THÔNG TIN KHI RÊ CHUỘT / CHẠM) */}
            {showHotspots && !isExporting && (
              <g className="anatomy-hotspots-layer select-none">
                {hotspots.map((spot) => {
                  const isHovered = (hoveredHotspotId === spot.id) || (activeHotspotId === spot.id);

                  return (
                    <g
                      key={spot.id}
                      transform={`translate(${spot.coords.x}, ${spot.coords.y})`}
                      className="cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Hỗ trợ tap trên mobile: bấm để bật / tắt thông tin
                        const nextId = activeHotspotId === spot.id ? null : spot.id;
                        setActiveHotspotId(nextId);
                        setHoveredHotspotId(nextId);
                      }}
                      onMouseEnter={() => setHoveredHotspotId(spot.id)}
                      onMouseLeave={() => {
                        setHoveredHotspotId(null);
                        setActiveHotspotId(null);
                      }}
                    >
                      {/* Vùng cảm ứng vô hình (bán kính 26px) bắt trọn rê chuột / chạm trên mọi trình duyệt */}
                      <circle
                        r="26"
                        fill="#000000"
                        fillOpacity="0"
                        style={{ cursor: 'pointer', pointerEvents: 'all' }}
                      />

                      {/* CÁC NÚT VẪN LUÔN HIỆN & NHẤP NHÁY ĐỂ NGƯỜI DÙNG BIẾT ĐIỂM CHẠM */}
                      <g className="pointer-events-none select-none transition-all duration-200">
                        {/* Outer pulsing ring - luôn nhấp nháy phát sáng nhẹ nhàng */}
                        <circle
                          r={isHovered ? 14 : 11}
                          fill="#D4AF37"
                          opacity={isHovered ? '0.75' : '0.35'}
                          className="animate-ping"
                        />
                        {/* Secondary glowing ring */}
                        <circle
                          r={isHovered ? 9.5 : 7.5}
                          fill={isHovered ? '#B83227' : '#D4AF37'}
                          opacity={isHovered ? '0.6' : '0.4'}
                        />
                        {/* Center pin circle */}
                        <circle
                          r={isHovered ? 6.5 : 5}
                          fill={isHovered ? '#B83227' : '#C59B27'}
                          stroke="#FFFFFF"
                          strokeWidth="1.5"
                          className="drop-shadow-xs transition-transform"
                        />
                        {/* Inner gold center dot */}
                        <circle r={isHovered ? 2.2 : 1.6} fill="#FFFFFF" />

                        {/* Floating tooltip badge: CHỈ HIỆN KHI RÊ CHUỘT TỚI NÚT ĐÓ */}
                        {isHovered && (
                          <g transform="translate(0, -18)">
                            <rect
                              x="-36"
                              y="-11"
                              width="72"
                              height="16"
                              rx="8"
                              fill="#2C241D"
                              fillOpacity="0.94"
                              stroke="#D4AF37"
                              strokeWidth="0.8"
                            />
                            <text
                              x="0"
                              y="0"
                              fill="#FFFDF9"
                              fontSize="8.5"
                              fontFamily="'Be Vietnam Pro', sans-serif"
                              fontWeight="bold"
                              textAnchor="middle"
                            >
                              {spot.label}
                            </text>
                          </g>
                        )}
                      </g>
                    </g>
                  );
                })}
              </g>
            )}
            </g>
          </svg>

          {/* THÔNG TIN TRA CỨU CỔ TỪ: CHỈ HIỆN KHI DI CHUỘT TỚI NÚT NÀO, RỜI RA THÌ BIẾN MẤT */}
          {activeHotspot && showHotspots && !isExporting && (
            <div
              data-html2canvas-ignore="true"
              className="absolute z-40 max-w-[280px] sm:max-w-[320px] bg-[#FFFDF9]/95 backdrop-blur-md border-2 border-[#D4AF37] rounded-2xl shadow-2xl p-3 text-xs text-[#2C241D] animate-in zoom-in-95 fade-in duration-150 ring-4 ring-[#D4AF37]/15 pointer-events-none"
              style={{
                top: activeHotspot.coords.y > 180 ? '16%' : '52%',
                left: '50%',
                transform: 'translateX(-50%)',
              }}
            >
              {/* Popover Header */}
              <div className="flex items-center gap-2 pb-2 border-b border-[#EDE7DC]">
                <span className="text-base p-1 rounded-lg bg-amber-500/10 border border-amber-300 shrink-0">
                  {activeHotspot.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[9px] uppercase font-bold tracking-wider text-[#B83227] bg-[#B83227]/10 px-2 py-0.5 rounded-md border border-[#B83227]/20 inline-block mb-0.5">
                      {activeHotspot.badge}
                    </span>
                    <span className="text-[10px] text-amber-700 font-semibold">
                      {activeHotspot.label}
                    </span>
                  </div>
                  <h4 className="text-xs font-serif font-bold text-[#1B3B6F] truncate leading-snug">
                    {activeHotspot.title}
                  </h4>
                </div>
              </div>

              {/* Popover Body Content */}
              <p className="mt-2 text-[11.5px] text-[#4A3E31] leading-relaxed font-normal">
                {activeHotspot.content}
              </p>

              {/* Popover Footer Guidance */}
              <div className="mt-2 pt-1 border-t border-[#EDE7DC]/70 flex items-center justify-between text-[10px] text-[#7A6E5F]">
                <span className="italic flex items-center gap-1">
                  <span>💡</span> Rê chuột sang vị trí khác để xem từ cổ
                </span>
              </div>
            </div>
          )}
          </div>
        </div>

        {/* HERITAGE WATERMARK BẢN QUYỀN NGHỆ THUẬT KHI XUẤT ẢNH HOẶC XEM CANVAS */}
        <div className="absolute bottom-2.5 left-2 sm:left-3.5 z-20 pointer-events-none hidden sm:flex items-center gap-1.5 opacity-80 select-none">
          <div className="w-4 h-4 bg-[#8A1C14] border border-[#F4D03F]/90 rounded-xs flex items-center justify-center text-[6.5px] font-bold text-amber-100 font-serif rotate-3 shadow-2xs">
            Họa Sắc
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-black text-[9.5px] text-[#2C241D] tracking-widest uppercase leading-none">
              HỌA SẮC VIỆT
            </span>
            <span className="text-[8px] text-[#7A6E5F] font-medium leading-tight mt-0.5">
              {garment.name} • {isMale ? 'Nam Phục' : 'Nữ Phục'}
            </span>
          </div>
        </div>

        {/* CHỈ DẪN XOAY 3D TƯƠNG TÁC KHI RÊ CHUỘT */}
        {is3DEnabled && (
          <div
            data-html2canvas-ignore="true"
            className={`absolute bottom-2.5 right-2 sm:right-3.5 z-20 pointer-events-none hidden sm:flex items-center gap-1 text-[9px] px-2 py-0.5 rounded-full border transition-all duration-300 select-none ${
              isHoveringCanvas
                ? 'bg-[#1B3B6F]/85 text-white border-blue-300/40 shadow-xs'
                : 'bg-white/70 text-[#7A6E5F] border-[#E3DAC9]'
            }`}
          >
            <span className="text-[10px]">✨</span>
            <span className="font-medium">
              {isHoveringCanvas
                ? `Xoay 3D (${rotateY > 0 ? '+' : ''}${rotateY.toFixed(0)}°)`
                : 'Di chuột để xoay 3D'}
            </span>
          </div>
        )}
      </div>

      {/* 2. INTERACTIVE LANDMARK & LIGHTING CONTROL STRIP (DOCK BÊN DƯỚI CANVAS) */}
      <div className="w-full space-y-1.5 mt-2.5 z-20">
        {/* Landmark Selector Bar */}
        <div className="p-1.5 bg-white/95 backdrop-blur-md rounded-2xl border border-[#D6CEBE]/90 shadow-xs flex items-center justify-between gap-1 overflow-x-auto">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A6E5F] flex items-center gap-1 pl-1.5 shrink-0">
            <MapPin className="w-3.5 h-3.5 text-[#B83227]" />
            <span className="hidden sm:inline">Bối cảnh:</span>
          </span>

          <div className="flex items-center gap-1 overflow-x-auto">
            {LANDMARKS.map((landmark) => {
              const isSelected = (outfit.backdropId || 'van_mieu') === landmark.id;
              return (
                <button
                  key={landmark.id}
                  onClick={() =>
                    onUpdateOutfit({
                      backdropId: landmark.id,
                      lightingId:
                        landmark.id !== 'studio_neutral'
                          ? landmark.defaultLighting
                          : outfit.lightingId || 'nang_am',
                    })
                  }
                  className={`px-2.5 py-1 text-[11px] rounded-xl font-medium transition-all shrink-0 flex items-center gap-1 cursor-pointer ${
                    isSelected
                      ? 'bg-[#1B3B6F] text-white shadow-xs font-semibold'
                      : 'bg-[#FAF7F2] text-[#4A4036] hover:bg-[#EDE7DC] border border-black/5'
                  }`}
                  title={landmark.shortDesc}
                >
                  <span>{landmark.icon}</span>
                  <span className="whitespace-nowrap">{landmark.tag}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Lighting Mood / Weather Shader Bar */}
        <div className="px-2.5 py-1.5 bg-white/90 backdrop-blur-md rounded-2xl border border-[#D6CEBE]/80 shadow-xs flex items-center justify-between gap-1 text-[11px]">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A6E5F] flex items-center gap-1 shrink-0">
            <Sun className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="hidden sm:inline">Ánh sáng:</span>
          </span>

          <div className="flex items-center gap-1 overflow-x-auto">
            {LIGHTING_MOODS.map((mood) => {
              const isSelected = (outfit.lightingId || 'nang_am') === mood.id;
              return (
                <button
                  key={mood.id}
                  onClick={() => onUpdateOutfit({ lightingId: mood.id })}
                  className={`px-2 py-0.5 rounded-lg font-medium transition-all shrink-0 flex items-center gap-1 cursor-pointer ${
                    isSelected
                      ? 'bg-[#B83227] text-white shadow-xs font-semibold'
                      : 'text-[#5C5346] hover:text-[#2C241D] hover:bg-black/5'
                  }`}
                  title={`${mood.name} (${mood.timeTag}) - ${mood.shortDesc}`}
                >
                  <span>{mood.icon}</span>
                  <span className="whitespace-nowrap">{mood.name.split(' (')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. HERITAGE AUTHENTICITY GAUGE & ONE-CLICK FIXER (FEATURE #2) */}
      <div className="mt-2.5">
        <HeritageAuthenticityGauge
          authenticity={authenticity}
          onRestoreCompliant={onRestoreCompliant || (() => {})}
        />
      </div>

      {/* Thông báo Tải Ảnh Thành Công Toast */}
      {exportSuccessMessage && (
        <div className="mt-2 p-2.5 bg-emerald-800 text-white text-xs font-semibold rounded-xl flex items-center justify-between shadow-md animate-in fade-in slide-in-from-top-1">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
            <span>{exportSuccessMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setExportSuccessMessage(null)}
            className="p-0.5 hover:bg-white/20 rounded-md cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Outfit Breakdown Details Strip */}
      <div className="mt-2.5 p-3 bg-white rounded-xl border border-[#D6CEBE] shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#7A6E5F]">
            Cấu Trúc Phối Đồ Hiện Tại
          </span>
          <span className="text-xs text-[#1B3B6F] font-medium">
            Phom: {isMale ? 'Nam giới (Thẳng bệ vệ)' : 'Nữ giới (Duyên thầm)'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="p-2 bg-[#FAF7F2] rounded-lg border border-[#EDE7DC]">
            <span className="text-[10px] text-[#7A6E5F] block">Áo chính</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span
                className="w-3 h-3 rounded-full shrink-0 border border-black/10"
                style={{ backgroundColor: outfit.mainColor.hex }}
              />
              <span className="font-medium text-[#2C241D] truncate">
                {outfit.mainColor.name}
              </span>
            </div>
          </div>

          <div className="p-2 bg-[#FAF7F2] rounded-lg border border-[#EDE7DC]">
            <span className="text-[10px] text-[#7A6E5F] block">Lót / Yếm</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span
                className="w-3 h-3 rounded-full shrink-0 border border-black/10"
                style={{ backgroundColor: outfit.innerColor.hex }}
              />
              <span className="font-medium text-[#2C241D] truncate">
                {outfit.innerColor.name}
              </span>
            </div>
          </div>

          <div className="p-2 bg-[#FAF7F2] rounded-lg border border-[#EDE7DC]">
            <span className="text-[10px] text-[#7A6E5F] block">Trang phục dưới</span>
            <span className="font-medium text-[#2C241D] truncate block mt-0.5">
              {getAccessoryName(outfit.selectedBottom)}
            </span>
          </div>

          <div className="p-2 bg-[#FAF7F2] rounded-lg border border-[#EDE7DC]">
            <span className="text-[10px] text-[#7A6E5F] block">Giày & Phụ kiện</span>
            <span className="font-medium text-[#2C241D] truncate block mt-0.5">
              {getAccessoryName(outfit.selectedShoes)}
            </span>
          </div>
        </div>
      </div>

      {/* Face Swap Modal */}
      <FaceSwapModal
        isOpen={isFaceModalOpen}
        onClose={() => setIsFaceModalOpen(false)}
        currentPhotoUrl={outfit.customFacePhotoUrl}
        onApplyPhoto={(photoUrl) => onUpdateOutfit({ customFacePhotoUrl: photoUrl })}
      />

      {/* Heritage Anatomy Full 5-Point Cultural Modal (Feature #1) */}
      <AnatomyModal
        isOpen={isAnatomyModalOpen}
        onClose={() => setIsAnatomyModalOpen(false)}
        outfit={outfit}
      />

      {/* Real Garment Detail Modal (Feature: Xem trang phục thật ngoài đời & thông số thực tế) */}
      <RealGarmentModal
        isOpen={isRealGarmentModalOpen}
        onClose={() => {
          setIsRealGarmentModalOpen(false);
          setViewMode('2d');
        }}
        outfit={outfit}
        onSelectGarment={(garmentId) => onUpdateOutfit({ garmentId })}
      />
    </div>
  );
};
