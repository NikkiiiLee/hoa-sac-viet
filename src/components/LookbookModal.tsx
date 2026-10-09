import React, { useState, useRef, useEffect, useMemo } from 'react';
import { OutfitConfig, UserProfile } from '../types/costume';
import { GARMENTS, OCCASIONS, calculateColorHarmony } from '../data/costumeData';
import { calculateHeritageAuthenticity } from '../data/heritageGauge';
import { LANDMARKS, LIGHTING_MOODS } from '../data/landmarksData';
import { LandmarkBackdrop } from './LandmarkBackdrop';
import { OutfitCharacterSVG } from './OutfitCharacterSVG';
import {
  X,
  Download,
  Share2,
  Check,
  Sparkles,
  Award,
  AlertTriangle,
  MapPin,
  Sun,
  Bookmark,
  Trash2,
  RotateCcw,
  Star,
  Globe,
  KeyRound,
  Cloud,
  QrCode,
  Copy,
  Filter,
  Calendar,
} from 'lucide-react';
import html2canvas from 'html2canvas-pro';

interface LookbookModalProps {
  isOpen: boolean;
  onClose: () => void;
  outfit: OutfitConfig;
  savedOutfits?: OutfitConfig[];
  onSaveCurrentOutfit?: (outfit: OutfitConfig) => void;
  onLoadSavedOutfit?: (outfit: OutfitConfig) => void;
  onDeleteSavedOutfit?: (id: string) => void;
  onToggleFavoriteOutfit?: (id: string) => void;
  currentUser?: UserProfile | null;
  onOpenAuthModal?: () => void;
  initialTab?: 'current' | 'saved';
}

export const LookbookModal: React.FC<LookbookModalProps> = ({
  isOpen,
  onClose,
  outfit,
  savedOutfits = [],
  onSaveCurrentOutfit,
  onLoadSavedOutfit,
  onDeleteSavedOutfit,
  onToggleFavoriteOutfit,
  currentUser,
  onOpenAuthModal,
  initialTab = 'current',
}) => {
  const [modalTab, setModalTab] = useState<'current' | 'saved'>(initialTab);
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [justSaved, setJustSaved] = useState(false);
  const [authorName, setAuthorName] = useState(
    currentUser?.name || 'Nhà Thiết Kế Trẻ'
  );
  const cardRef = useRef<HTMLDivElement>(null);

  // Sync initialTab & authorName when opened or user logs in
  useEffect(() => {
    if (isOpen) {
      setModalTab(initialTab);
    }
  }, [isOpen, initialTab]);

  useEffect(() => {
    if (currentUser?.name) {
      setAuthorName(currentUser.name);
    }
  }, [currentUser]);

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

  // --- PERSONAL LOOKBOOK HUB FILTERS STATE ---
  const [timelineFilter, setTimelineFilter] = useState<
    'all' | 'today' | 'week' | 'month'
  >('all');
  const [garmentFilter, setGarmentFilter] = useState<string>('all');
  const [occasionFilter, setOccasionFilter] = useState<string>('all');
  const [onlyFavorites, setOnlyFavorites] = useState<boolean>(false);

  // --- PUBLIC GROUP ALBUM CREATOR STATE ---
  const [isAlbumCreatorOpen, setIsAlbumCreatorOpen] = useState(false);
  const [selectedAlbumOutfitIds, setSelectedAlbumOutfitIds] = useState<string[]>(
    []
  );
  const [albumName, setAlbumName] = useState(
    'Bộ Sưu Tập Kỷ Yếu Dinh Độc Lập - Nhóm UEH 2026'
  );
  const [generatedAlbumLink, setGeneratedAlbumLink] = useState<string | null>(
    null
  );
  const [albumToastMessage, setAlbumToastMessage] = useState<string | null>(
    null
  );

  // Filter savedOutfits based on Multi-dimensional filters
  const filteredOutfits = useMemo(() => {
    const now = Date.now();
    const oneDayMs = 24 * 3600 * 1000;

    return savedOutfits.filter((item) => {
      // 1. Timeline filter
      const ageMs = now - (item.createdAt || now);
      if (timelineFilter === 'today' && ageMs > oneDayMs) return false;
      if (timelineFilter === 'week' && ageMs > oneDayMs * 7) return false;
      if (timelineFilter === 'month' && ageMs > oneDayMs * 30) return false;

      // 2. Garment Type filter
      if (garmentFilter !== 'all') {
        if (garmentFilter === 'ao_dai') {
          if (
            item.garmentId !== 'ao_dai_truyen_thong' &&
            item.garmentId !== 'ao_dai_cach_tan'
          ) {
            return false;
          }
        } else if (item.garmentId !== garmentFilter) {
          return false;
        }
      }

      // 3. Occasion filter
      if (occasionFilter !== 'all' && item.occasionId !== occasionFilter) {
        return false;
      }

      // 4. Favorites filter
      if (onlyFavorites && !item.isFavorite) {
        return false;
      }

      return true;
    });
  }, [
    savedOutfits,
    timelineFilter,
    garmentFilter,
    occasionFilter,
    onlyFavorites,
  ]);

  if (!isOpen) return null;

  const garment = GARMENTS[outfit.garmentId];
  const harmony = calculateColorHarmony(
    outfit.mainColor,
    outfit.innerColor,
    outfit.bottomColor
  );
  const authenticity = calculateHeritageAuthenticity(outfit);
  const isHeritageValid = authenticity.score === 100;

  const currentLandmark = LANDMARKS.find(
    (l) => l.id === (outfit.backdropId || 'van_mieu')
  );
  const currentLighting = LIGHTING_MOODS.find(
    (m) => m.id === (outfit.lightingId || 'nang_am')
  );

  // AI-inspired collection names
  const getCollectionTitle = () => {
    if (
      outfit.mainColor.id === 'do_chu_sa' ||
      outfit.mainColor.id === 'do_tia_cung_dinh'
    ) {
      return 'Chu Sa Hoàng Hỷ';
    }
    if (outfit.mainColor.id === 'xanh_cham') {
      return 'Chàm Phong Niên Hoa';
    }
    if (
      outfit.mainColor.id === 'vang_hoang_yen' ||
      outfit.mainColor.id === 'vang_nghe'
    ) {
      return 'Hoàng Cúc Triều Dương';
    }
    if (outfit.garmentId === 'ao_tu_than') {
      return 'Bắc Bộ Kinh Kỳ';
    }
    if (outfit.mainColor.id === 'sage_remix') {
      return 'Thanh Sương Đô Thị';
    }
    return 'Dệt Sắc Thanh Xuân';
  };

  const collectionTitle = getCollectionTitle();

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSaveToLookbook = () => {
    if (onSaveCurrentOutfit) {
      onSaveCurrentOutfit(outfit);
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 2200);
    }
  };

  // Toggle outfit selection for Group Album (2 to 4 outfits)
  const handleToggleSelectAlbumOutfit = (id: string) => {
    setSelectedAlbumOutfitIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= 4) {
        return prev;
      }
      return [...prev, id];
    });
  };

  // Generate Public Group Album Link & QR Code
  const handleCreatePublicAlbum = () => {
    const slug = albumName
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 28);

    const finalSlug = slug || 'nhom-ky-yeu-ueh';
    setGeneratedAlbumLink(`https://hoasacviet.vn/lookbook/${finalSlug}`);
  };

  const handleCopyAlbumLink = () => {
    if (!generatedAlbumLink) return;
    navigator.clipboard?.writeText(generatedAlbumLink);
    setAlbumToastMessage(
      'Đã sao chép liên kết Album nhóm! Hãy gửi vào nhóm Zalo/Messenger để bạn bè cùng bình chọn!'
    );
    setTimeout(() => setAlbumToastMessage(null), 4000);
  };

  // Mathematical color converters from OKLCH and OKLab to standard RGB/RGBA for html2canvas
  const parseHue = (val: string): number => {
    if (!val || val === 'none') return 0;
    if (val.endsWith('deg')) return parseFloat(val);
    if (val.endsWith('rad')) return (parseFloat(val) * 180) / Math.PI;
    if (val.endsWith('turn')) return parseFloat(val) * 360;
    return parseFloat(val) || 0;
  };

  const oklchToRgb = (str: string): string | null => {
    const m = str.match(
      /oklch\(\s*([\d.]+%?)\s+([\d.]+)\s+([^\s/)]+)(?:\s*\/\s*([\d.]+%?))?\s*\)/i
    );
    if (!m) return null;
    const L = m[1].endsWith('%') ? parseFloat(m[1]) / 100 : parseFloat(m[1]);
    const C = parseFloat(m[2]);
    const H = parseHue(m[3]);
    const a_val = C * Math.cos((H * Math.PI) / 180);
    const b_val = C * Math.sin((H * Math.PI) / 180);
    const l_ = L + 0.3963377774 * a_val + 0.2158037573 * b_val;
    const m_ = L - 0.1055613458 * a_val - 0.0638541728 * b_val;
    const s_ = L - 0.0894841775 * a_val - 1.291485548 * b_val;
    const l = l_ * l_ * l_;
    const m__ = m_ * m_ * m_;
    const s = s_ * s_ * s_;
    const r_lin = 4.0767416621 * l - 3.3077115913 * m__ + 0.2309699292 * s;
    const g_lin = -1.2684380046 * l + 2.6097574011 * m__ - 0.3413193965 * s;
    const b_lin = -0.0041960863 * l - 0.7034186147 * m__ + 1.707614701 * s;
    const transfer = (c: number) => {
      const clamped = Math.max(0, Math.min(1, c));
      return clamped <= 0.0031308
        ? 12.92 * clamped
        : 1.055 * Math.pow(clamped, 1 / 2.4) - 0.055;
    };
    const r = Math.round(transfer(r_lin) * 255);
    const g = Math.round(transfer(g_lin) * 255);
    const b = Math.round(transfer(b_lin) * 255);
    if (m[4]) {
      const alpha = m[4].endsWith('%')
        ? parseFloat(m[4]) / 100
        : parseFloat(m[4]);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    return `rgb(${r}, ${g}, ${b})`;
  };

  const oklabToRgb = (str: string): string | null => {
    const m = str.match(
      /oklab\(\s*([\d.]+%?)\s+([-\d.]+)\s+([-\d.]+)(?:\s*\/\s*([\d.]+%?))?\s*\)/i
    );
    if (!m) return null;
    const L = m[1].endsWith('%') ? parseFloat(m[1]) / 100 : parseFloat(m[1]);
    const a_val = parseFloat(m[2]);
    const b_val = parseFloat(m[3]);
    const l_ = L + 0.3963377774 * a_val + 0.2158037573 * b_val;
    const m_ = L - 0.1055613458 * a_val - 0.0638541728 * b_val;
    const s_ = L - 0.0894841775 * a_val - 1.291485548 * b_val;
    const l = l_ * l_ * l_;
    const m__ = m_ * m_ * m_;
    const s = s_ * s_ * s_;
    const r_lin = 4.0767416621 * l - 3.3077115913 * m__ + 0.2309699292 * s;
    const g_lin = -1.2684380046 * l + 2.6097574011 * m__ - 0.3413193965 * s;
    const b_lin = -0.0041960863 * l - 0.7034186147 * m__ + 1.707614701 * s;
    const transfer = (c: number) => {
      const clamped = Math.max(0, Math.min(1, c));
      return clamped <= 0.0031308
        ? 12.92 * clamped
        : 1.055 * Math.pow(clamped, 1 / 2.4) - 0.055;
    };
    const r = Math.round(transfer(r_lin) * 255);
    const g = Math.round(transfer(g_lin) * 255);
    const b = Math.round(transfer(b_lin) * 255);
    if (m[4]) {
      const alpha = m[4].endsWith('%')
        ? parseFloat(m[4]) / 100
        : parseFloat(m[4]);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    return `rgb(${r}, ${g}, ${b})`;
  };

  const sanitizeAllOklabStrings = (text: string): string => {
    if (!text || (!text.includes('oklch') && !text.includes('oklab'))) return text;
    return text
      .replace(
        /oklch\(\s*[\d.]+%?\s+[\d.]+\s+[^\s/)]+(?:\s*\/\s*[\d.]+%?)?\s*\)/gi,
        (match) => oklchToRgb(match) || 'rgb(44, 36, 29)'
      )
      .replace(
        /oklab\(\s*[\d.]+%?\s+[-\d.]+\s+[-\d.]+(?:\s*\/\s*[\d.]+%?)?\s*\)/gi,
        (match) => oklabToRgb(match) || 'rgb(44, 36, 29)'
      )
      .replace(/oklch\([^)]+\)/gi, 'rgb(44, 36, 29)')
      .replace(/oklab\([^)]+\)/gi, 'rgb(44, 36, 29)');
  };

  // Helper thực hiện tải file ảnh xuống máy tính người dùng
  const triggerFileDownload = (dataUrl: string, fileName: string) => {
    const link = document.createElement('a');
    link.download = fileName;
    link.href = dataUrl;
    link.rel = 'noopener';
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      if (document.body.contains(link)) {
        document.body.removeChild(link);
      }
    }, 300);
  };

  // TRUE PNG EXPORT USING HTML2CANVAS - CÔ LẬP VÙNG CHỤP (SANDBOX) TRONG CLONED DOC
  const handleDownloadLookbook = async () => {
    // Nếu người dùng đang ở tab 'saved', tự động chuyển sang tab 'current' để hiển thị khung thẻ lookbook-story-card
    if (modalTab !== 'current') {
      setModalTab('current');
      await new Promise((resolve) => setTimeout(resolve, 150));
    }

    const cardEl = document.getElementById('lookbook-story-card') || cardRef.current;
    if (!cardEl) {
      console.error('Không tìm thấy khung thẻ Lookbook (id="lookbook-story-card")');
      return;
    }
    setIsExporting(true);

    // CÔ LẬP VÙNG CHỤP (SANDBOX): Chỉ thao tác trên bản sao ảo clonedDoc trong bộ nhớ, hoàn toàn không chạm đến giao diện thật
    const sanitizeOklabSandboxClone = (clonedDoc: Document, clonedEl?: HTMLElement) => {
      // 1. Quét và ép toàn bộ hàm màu oklab/oklch trong tất cả thẻ <style> của bản sao ảo sang RGB tiêu chuẩn
      try {
        const styleTags = clonedDoc.querySelectorAll('style');
        styleTags.forEach((styleEl) => {
          if (
            styleEl.textContent &&
            (styleEl.textContent.includes('oklab') || styleEl.textContent.includes('oklch'))
          ) {
            styleEl.textContent = sanitizeAllOklabStrings(styleEl.textContent);
          }
        });
      } catch (e) {
        console.warn('Lỗi khi chuẩn hóa thẻ style trong clone sandbox:', e);
      }

      // 2. Duyệt qua khung thẻ Story và toàn bộ phần tử con trong bản sao ảo để ép màu về mã Hex/RGB chuẩn
      try {
        const targetNode = clonedEl || clonedDoc.getElementById('lookbook-story-card') || clonedDoc.body;
        if (targetNode) {
          const allElements = [targetNode, ...Array.from(targetNode.querySelectorAll('*'))] as HTMLElement[];
          const defaultView = clonedDoc.defaultView || window;

          allElements.forEach((el) => {
            try {
              const computed = defaultView.getComputedStyle(el);
              if (computed) {
                const colorProps = [
                  'color',
                  'backgroundColor',
                  'borderColor',
                  'borderTopColor',
                  'borderRightColor',
                  'borderBottomColor',
                  'borderLeftColor',
                  'outlineColor',
                ];
                colorProps.forEach((prop) => {
                  const val = computed.getPropertyValue(prop) || (computed as any)[prop];
                  if (val && typeof val === 'string' && (val.includes('oklab') || val.includes('oklch'))) {
                    el.style.setProperty(prop, sanitizeAllOklabStrings(val), 'important');
                  }
                });
              }

              // Ép màu thuộc tính SVG fill & stroke
              const fill = el.getAttribute('fill');
              if (fill && (fill.includes('oklab') || fill.includes('oklch'))) {
                el.setAttribute('fill', sanitizeAllOklabStrings(fill));
              }
              const stroke = el.getAttribute('stroke');
              if (stroke && (stroke.includes('oklab') || stroke.includes('oklch'))) {
                el.setAttribute('stroke', sanitizeAllOklabStrings(stroke));
              }

              // Ép inline styles nếu có
              const inlineStyle = el.getAttribute('style');
              if (inlineStyle && (inlineStyle.includes('oklab') || inlineStyle.includes('oklch'))) {
                el.setAttribute('style', sanitizeAllOklabStrings(inlineStyle));
              }
            } catch {
              // Bỏ qua lỗi từng phần tử
            }
          });
        }
      } catch (e) {
        console.warn('Lỗi khi chuẩn hóa phần tử clone sandbox:', e);
      }
    };

    try {
      if (document.fonts?.ready) {
        await document.fonts.ready;
      }

      // Đợi layout ổn định
      await new Promise((resolve) => setTimeout(resolve, 80));

      const canvas = await html2canvas(cardEl, {
        scale: 2, // Độ phân giải 2x sắc nét chuẩn Retina
        useCORS: true,
        allowTaint: false,
        backgroundColor: '#FFFDF8',
        logging: false,
        onclone: (clonedDoc, clonedEl) => sanitizeOklabSandboxClone(clonedDoc, clonedEl),
      });

      const safeTitle = (outfit.title || collectionTitle || 'lookbook-story')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      const dateTag = new Date().toISOString().slice(0, 10);
      const fileName = `lookbook-${safeTitle}-${dateTag}.png`;

      // Chuyển trực tiếp thành Data URL để tải ngay lập tức, không phụ thuộc cơ chế blob bất đồng bộ
      const dataUrl = canvas.toDataURL('image/png');
      triggerFileDownload(dataUrl, fileName);

      setAlbumToastMessage('Đã tải xuống ảnh Lookbook thành công!');
      setTimeout(() => setAlbumToastMessage(null), 3500);
    } catch (err) {
      console.error('Lỗi khi xuất ảnh Lookbook:', err);
      // Fallback nếu xảy ra trục trặc
      try {
        const fallbackEl = document.getElementById('lookbook-story-card') || cardRef.current;
        if (fallbackEl) {
          const fallbackCanvas = await html2canvas(fallbackEl, {
            scale: 2,
            useCORS: true,
            allowTaint: false,
            backgroundColor: '#FFFDF8',
            logging: false,
            onclone: (clonedDoc, clonedEl) => sanitizeOklabSandboxClone(clonedDoc, clonedEl),
          });
          const fallbackDataUrl = fallbackCanvas.toDataURL('image/png');
          triggerFileDownload(fallbackDataUrl, `lookbook-${Date.now()}.png`);
          setAlbumToastMessage('Đã tải xuống ảnh Lookbook thành công!');
          setTimeout(() => setAlbumToastMessage(null), 3500);
        }
      } catch (fallbackErr) {
        console.error('Lỗi fallback khi xuất ảnh Lookbook:', fallbackErr);
      }
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadPNG = handleDownloadLookbook;

  const getOccasionLabel = (occId: string) => {
    const map: Record<string, string> = {
      tot_nghiep: 'Kỷ yếu học đường',
      dao_pho: 'Dạo phố check-in',
      tet_dam_ngo: 'Nghi lễ gia đình',
      trinh_dien: 'Lễ hội di sản',
      le_tet: 'Nghi lễ gia đình',
      chup_anh: 'Lễ hội di sản',
    };
    return (
      map[occId] || OCCASIONS.find((o) => o.id === occId)?.name || 'Sự kiện di sản'
    );
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[1100] flex justify-center items-center p-2 sm:p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        className={`relative w-full ${
          modalTab === 'saved' ? 'max-w-4xl' : 'max-w-xl'
        } h-[92vh] max-h-[820px] bg-[#FAF7F2] rounded-3xl border border-[#D6CEBE] shadow-2xl overflow-hidden flex flex-col transition-all duration-300`}
      >
        {/* VÙNG 1: HEADER GHIM TRÊN CÙNG (CỐ ĐỊNH, SHRINK-0) */}
        <div className="shrink-0 flex items-center justify-between px-3.5 sm:px-5 py-2.5 border-b border-[#E3DAC9] bg-white gap-2 z-10">
          {/* Hàng 2 Tab Điều Hướng */}
          <div className="flex items-center gap-1 bg-[#FAF7F2] p-1 rounded-xl border border-[#EDE7DC]">
            <button
              onClick={() => setModalTab('current')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                modalTab === 'current'
                  ? 'bg-[#B83227] text-white shadow-2xs'
                  : 'text-[#5C5346] hover:text-[#2C241D]'
              }`}
            >
              Thẻ Story 9:16 (Hiện Tại)
            </button>
            <button
              onClick={() => setModalTab('saved')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                modalTab === 'saved'
                  ? 'bg-[#1B3B6F] text-white shadow-2xs'
                  : 'text-[#5C5346] hover:text-[#2C241D]'
              }`}
            >
              <span>Personal Lookbook Hub ({savedOutfits.length})</span>
            </button>
          </div>

          {/* Biểu tượng nút tròn ✕ duy nhất ở góc trên cùng bên phải */}
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F2EFE9] hover:bg-rose-100 border border-stone-300 text-stone-700 hover:text-[#A82824] flex items-center justify-center text-sm font-bold transition-all shadow-2xs hover:scale-105 cursor-pointer shrink-0"
            title="Đóng cửa sổ Lookbook (Esc)"
            aria-label="Đóng Lookbook"
          >
            ✕
          </button>
        </div>

        {/* CẢNH BÁO CHẾ ĐỘ KHÁCH (SHRINK-0 NẾU CÓ) */}
        {!currentUser && (
          <div className="shrink-0 px-3.5 sm:px-5 py-1.5 bg-amber-50 border-b border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-[11px] text-amber-950 z-10">
            <div className="flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>
                <strong>⚠️ Chế độ Khách:</strong> Lưu tạm tối đa 3 bộ. Đăng nhập để lưu vĩnh viễn trên đám mây!
              </span>
            </div>
            {onOpenAuthModal && (
              <button
                onClick={() => {
                  onOpenAuthModal();
                }}
                className="px-2.5 py-0.5 bg-[#B83227] hover:bg-[#99261c] text-white font-bold text-[10.5px] rounded-lg transition-all flex items-center gap-1 shrink-0 self-start sm:self-auto cursor-pointer shadow-2xs"
              >
                <KeyRound className="w-3 h-3" />
                <span>🔑 Đăng Nhập</span>
              </button>
            )}
          </div>
        )}

        {/* VÙNG 2: THÂN THẺ CUỘN Ở GIỮA (FLEX-1 MIN-H-0 OVERFLOW-Y-AUTO) */}
        {modalTab === 'current' ? (
          <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-4 sm:p-5 flex flex-col items-center">
            {/* Stylist Name input */}
            <div className="w-full max-w-[360px] mb-3 flex items-center gap-2 text-xs shrink-0">
              <span className="text-[#7A6E5F] whitespace-nowrap">Tên tác giả:</span>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="flex-1 px-3 py-1 bg-white rounded-lg border border-[#D6CEBE] text-[#2C241D] font-medium focus:outline-hidden"
                placeholder="Nhập tên của bạn"
              />
            </div>

            {/* THE 9:16 POLAROID STORY CARD (GIỮ NGUYÊN KÍCH THƯỚC NÉT ĐẸP TỰ NHIÊN) */}
            {(() => {
              const currentGarmentName = garment?.name || 'Áo Ngũ Thân Tay Chẽn';
              const currentLandmarkName = currentLandmark?.name || 'Phố Cổ Hội An';
              const currentLightingName = currentLighting?.name || 'Nắng Ấm Du Xuân';

              // Hàm chuẩn hóa tên màu tiếng Việt có dấu chuẩn mực, không cắt cụt từ
              const formatColorName = (name: string, role: string) => {
                if (!name) return '';
                // Bỏ phần trong ngoặc như (Remix), (Đỏ Đô), (Nâu Non)...
                let clean = name.replace(/\s*\(.*?\)/g, '').replace(/Terracotta/i, '').trim();

                // Chuẩn hóa đúng tiếng Việt có dấu chuẩn mực theo yêu cầu
                if (clean.includes('Thiên Thanh')) return 'Xanh Thiên Thanh';
                if (clean.includes('Cam Đất')) return 'Cam Đất';
                if (clean.includes('Nâu Đất')) {
                  return role.includes('Quần') ? 'Quần Nâu Đất' : (role.includes('Váy') ? 'Váy Nâu Đất' : 'Nâu Đất');
                }
                if (clean.includes('Hoàng Yến')) return 'Vàng Hoàng Yến';
                if (clean.includes('Bạch Ngọc')) return role.includes('Quần') ? 'Quần Bạch Ngọc' : 'Bạch Ngọc';
                if (clean.includes('Mực Nho') || clean.includes('Đen')) return role.includes('Váy') ? 'Váy Mực Nho' : 'Mực Nho';
                if (clean.includes('Chu Sa')) return 'Đỏ Chu Sa';
                if (clean.includes('Cung Đình')) return 'Tía Cung Đình';
                if (clean.includes('Lục Bảo')) return 'Xanh Lục Bảo';
                if (clean.includes('Chàm')) return 'Xanh Chàm';
                return clean;
              };

              const bottomRole = outfit.selectedBottom?.includes('vay') ? 'Váy Lụa' : 'Quần Lụa';
              const silkSwatches = [
                {
                  name: formatColorName(outfit.mainColor.name, 'Áo Chính') || 'Xanh Thiên Thanh',
                  role: 'Áo Chính',
                  color: outfit.mainColor.hex,
                  elem: outfit.mainColor.fiveElements || 'Thủy',
                },
                {
                  name: formatColorName(outfit.innerColor.name, 'Vạt Lót') || 'Cam Đất',
                  role: 'Vạt Lót',
                  color: outfit.innerColor.hex,
                  elem: outfit.innerColor.fiveElements || 'Thổ',
                },
                {
                  name: formatColorName(outfit.bottomColor.name, bottomRole) || (outfit.selectedBottom?.includes('vay') ? 'Váy Nâu Đất' : 'Quần Nâu Đất'),
                  role: bottomRole,
                  color: outfit.bottomColor.hex,
                  elem: outfit.bottomColor.fiveElements || 'Kim',
                },
                {
                  name: outfit.selectedOuterwear === 'blazer_oversize' ? 'Hắc Dạ' : 'Vàng Hoàng Yến',
                  role: 'Phụ Kiện',
                  color: outfit.selectedOuterwear === 'blazer_oversize' ? '#2A2A2E' : '#D4AF37',
                  elem: outfit.selectedOuterwear === 'blazer_oversize' ? 'Thủy' : 'Kim',
                },
              ];

              const isHarmonious = harmony.isTuongSinh || !harmony.isTuongKhac;
              const harmonySubline = harmony.isTuongSinh
                ? `${outfit.mainColor.fiveElements} Sinh ${outfit.innerColor.fiveElements} • Rạng rỡ trường tồn`
                : harmony.isTuongKhac
                ? `${outfit.mainColor.fiveElements} Khắc ${outfit.innerColor.fiveElements} • Phá cách hiện đại`
                : `${outfit.mainColor.fiveElements} Hòa Hợp • Nhã nhặn thanh tao`;

              // TÁCH BIỆT "TÊN NGHỆ THUẬT" VÀ "DÒNG CỔ PHỤC" THÀNH 2 DÒNG RIÊNG BIỆT
              const rawTitle = outfit.title || collectionTitle || 'Dệt Sắc Thanh Xuân';
              let artTitle = rawTitle;
              let garmentSubtitle = '';

              const parenMatch = rawTitle.match(/^(.*?)\s*\((.*?)\)$/);
              if (parenMatch) {
                artTitle = parenMatch[1].trim();
                garmentSubtitle = parenMatch[2].trim();
              }

              // Chuẩn hóa dòng áo phụ viết chữ thường thanh lịch
              if (!garmentSubtitle || garmentSubtitle.includes('Áo Tứ Thân') || outfit.garmentId === 'ao_tu_than') {
                if (outfit.garmentId === 'ao_tu_than') {
                  garmentSubtitle = 'Áo Tứ Thân Dân Gian • Bắc Bộ';
                }
              }

              if (!garmentSubtitle) {
                if (outfit.garmentId === 'ao_chen') {
                  garmentSubtitle = 'Áo Ngũ Thân Tay Chẽn • Triều Nguyễn';
                } else if (outfit.garmentId === 'ao_tac') {
                  garmentSubtitle = 'Áo Ngũ Thân Tay Thụng (Áo Tấc) • Triều Nguyễn';
                } else if (outfit.garmentId === 'ao_giao_linh') {
                  garmentSubtitle = 'Áo Giao Lĩnh Cung Đình • Đại Việt';
                } else if (outfit.garmentId === 'ao_dai_truyen_thong') {
                  garmentSubtitle = 'Áo Dài Truyền Thống • Tân Thời';
                } else if (outfit.garmentId === 'ao_dai_cach_tan') {
                  garmentSubtitle = 'Áo Dài Cách Tân • Đô Thị Hiện Đại';
                } else {
                  garmentSubtitle = `${garment?.name || 'Cổ Phục Việt'} • Di Sản Dân Tộc`;
                }
              }

              return (
                /* THẺ LOOKBOOK POLAROID 9:16 (CHUẨN BẢNG IN ART CARD GIẤY DÓ - KÍCH THƯỚC NGUYÊN BẢN ĐẸP TỰ NHIÊN) */
                <div
                  id="lookbook-story-card"
                  ref={cardRef}
                  className="relative w-[340px] sm:w-[360px] h-[600px] sm:h-[640px] shrink-0 mx-auto rounded-3xl overflow-hidden p-3.5 sm:p-4 flex flex-col justify-between shadow-2xl select-none"
                  style={{
                    background: 'radial-gradient(circle at 50% 30%, #FFFDF8 0%, #F9F4E8 60%, #F1E9D2 100%)',
                    fontFamily: '"Be Vietnam Pro", sans-serif',
                  }}
                >
                  {/* ĐƯỜNG VIỀN HỒI VĂN VÀNG KIM INSET 12PX */}
                  <div className="absolute inset-3 border border-amber-400/60 rounded-2xl pointer-events-none ring-1 ring-amber-300/30">
                    <div className="absolute top-1 left-1 text-[8px] text-amber-500/70">❖</div>
                    <div className="absolute top-1 right-1 text-[8px] text-amber-500/70">❖</div>
                    <div className="absolute bottom-1 left-1 text-[8px] text-amber-500/70">❖</div>
                    <div className="absolute bottom-1 right-1 text-[8px] text-amber-500/70">❖</div>
                  </div>

                  {/* 1. HEADER & TIÊU ĐỀ NGHỆ THUẬT */}
                  <div className="text-center z-10 pt-1 px-3">
                    <div className="text-[12px] font-bold text-amber-950 tracking-[0.25em] font-display uppercase">
                      HỌA SẮC VIỆT
                    </div>
                    <div className="text-[8px] tracking-[0.25em] text-amber-800/75 uppercase font-accent -mt-0.5 mb-1">
                      ─── Dệt Tương Lai Từ Nét Xưa ───
                    </div>

                    {/* DÒNG 1 (Tiêu đề lớn, viết hoa nghệ thuật): BẮC BỘ KINH KỲ */}
                    <div className="font-display font-bold text-[17px] text-slate-900 tracking-wide uppercase leading-tight truncate px-1">
                      {artTitle}
                    </div>

                    {/* DÒNG 2 (Nhãn dòng áo phụ, viết chữ thường thanh lịch): Áo Tứ Thân Dân Gian • Bắc Bộ */}
                    <div className="text-[11px] text-amber-900/85 font-serif italic mt-0.5 tracking-normal truncate px-1">
                      {garmentSubtitle}
                    </div>

                    <div className="inline-flex items-center justify-center gap-1.5 mt-0.5">
                      <span className="text-[10.5px] text-amber-900/85 font-medium leading-none">
                        Thiết kế: {currentUser?.name || authorName || 'Nhà Thiết Kế Trẻ'}
                      </span>
                      {/* Con Dấu Triện Son Đỏ - Căn chỉnh ngang hàng với đuôi chữ, chếch góc tự nhiên như vết đóng triện mực thật */}
                      <div
                        className="w-[18px] h-[18px] bg-rose-700 border border-rose-900 text-amber-100 font-serif text-[6.5px] font-bold flex items-center justify-center rounded-xs shadow-2xs rotate-12 shrink-0 translate-y-[0.5px]"
                        title="Dấu ấn Họa Sắc Việt"
                      >
                        Họa Sắc
                      </div>
                    </div>
                  </div>

                  {/* 2. VISUAL HERO: KHUNG CỬA VÒM TOÀN THÂN */}
                  <div className="z-10 flex flex-col items-center">
                    <div className="w-[88%] h-[260px] sm:h-[270px] rounded-t-full rounded-b-xl overflow-hidden border border-amber-300/70 shadow-inner bg-amber-50/30 relative flex items-center justify-center">
                      {/* Landmark Backdrop Ambiance */}
                      <LandmarkBackdrop
                        landmarkId={outfit.backdropId || 'van_mieu'}
                        lightingId={outfit.lightingId || 'nang_am'}
                        className="absolute inset-0 w-full h-full object-cover"
                      />

                      {/* Styled Character Wearing The Styled Outfit */}
                      <div className="relative z-10 w-full h-full max-w-[210px] flex items-center justify-center drop-shadow-2xl">
                        <OutfitCharacterSVG
                          outfit={outfit}
                          className="w-full h-full drop-shadow-xl"
                        />
                      </div>
                    </div>
                    <div className="text-[10px] text-amber-950/80 font-serif italic mt-1 text-center truncate px-2">
                      {currentGarmentName} • {currentLandmarkName} • {currentLightingName}
                    </div>
                  </div>

                  {/* 3. DẢI THÔNG TIN VĂN HÓA & NGŨ HÀNH */}
                  <div className="z-10 grid grid-cols-2 gap-2 px-3 py-1.5 mx-2 rounded-xl bg-white/70 border border-amber-200/60 backdrop-blur-2xs">
                    <div className="flex flex-col border-r border-amber-200/60 pr-1.5 justify-center">
                      <span className="font-bold text-emerald-800 flex items-center gap-1 text-[10.5px] leading-tight">
                        <span>🏵️</span> {authenticity.score}% Chuẩn Di Sản
                      </span>
                      <span className="text-[10px] sm:text-[10.5px] text-slate-600 leading-tight mt-0.5 whitespace-normal break-words">
                        {outfit.lapelDirection === 'ta_nham'
                          ? 'Tang phục Tả Nhậm • Trọng thể.'
                          : 'Quy cách Hữu Nhậm • Chuẩn mực.'}
                      </span>
                    </div>
                    <div className="flex flex-col pl-1.5 justify-center">
                      <span className="font-bold text-amber-900 flex items-center gap-1 text-[10.5px] leading-tight">
                        <span>☯️</span> {isHarmonious ? 'Hòa Sắc: Tuyệt Phẩm' : 'Hòa Sắc: Tương Phản'}
                      </span>
                      <span className="text-[10px] sm:text-[10.5px] text-slate-600 leading-tight mt-0.5 whitespace-normal break-words">
                        {harmonySubline}.
                      </span>
                    </div>
                  </div>

                  {/* 4. DẢI LỤA SẮC TỘC NGŨ HÀNH */}
                  <div className="z-10 px-3">
                    <div className="text-[9px] uppercase tracking-wider text-amber-900/80 font-bold text-center mb-1">
                      Dải Lụa Sắc Tộc Ngũ Hành
                    </div>
                    {/* Dải 4 màu xếp liền nhau */}
                    <div className="grid grid-cols-4 rounded-lg overflow-hidden border border-amber-200 shadow-2xs">
                      {silkSwatches.map((swatch, idx) => (
                        <div key={idx} className="flex flex-col">
                          <div className="h-3.5 w-full shadow-inner" style={{ backgroundColor: swatch.color }} />
                          <div className="bg-white/90 py-1 text-center flex flex-col items-center justify-center min-h-[36px] px-0.5">
                            <div className="text-[8.5px] font-bold text-slate-800 leading-tight text-center">
                              {swatch.name}
                            </div>
                            <div className="text-[7.5px] font-medium text-amber-900/70 leading-tight mt-0.5">
                              ({swatch.elem})
                            </div>
                            <div className="text-[7px] text-slate-500 leading-tight mt-0.5">
                              {swatch.role}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 5. FOOTER & MÃ QR TƯƠNG TÁC */}
                  <div className="z-10 px-3 pb-1.5 flex items-center justify-between gap-2 border-t border-amber-200/50 pt-1.5">
                    <div className="flex flex-col text-left">
                      <span className="text-[8.5px] text-amber-950/80 font-semibold leading-tight">
                        Quét mã để thử phối lại outfit này
                      </span>
                      <span className="text-[8px] text-slate-500 leading-tight mt-0.5">
                        hoasacviet.heritage.vn
                      </span>
                      <div className="flex gap-1 text-[7.5px] text-amber-800/70 mt-0.5 font-medium">
                        <span>#HoaSacViet</span>
                        <span>#VietPhucGenZ</span>
                      </div>
                    </div>

                    {/* Mã QR viền vàng vector tự thân (chống lỗi mạng / tainted canvas) - có khoảng thở 4px (mb-1) cân đối với viền vàng kim */}
                    <div className="w-11 h-11 p-0.5 bg-white border border-amber-300 rounded-md shadow-2xs shrink-0 flex items-center justify-center mb-1">
                      <svg viewBox="0 0 25 25" className="w-full h-full text-stone-900" shapeRendering="crispEdges">
                        <rect width="25" height="25" fill="#FFFFFF" />
                        {/* 3 góc định vị chuẩn QR code */}
                        <rect x="2" y="2" width="7" height="7" fill="currentColor" />
                        <rect x="3" y="3" width="5" height="5" fill="#FFFFFF" />
                        <rect x="4" y="4" width="3" height="3" fill="currentColor" />
                        <rect x="16" y="2" width="7" height="7" fill="currentColor" />
                        <rect x="17" y="3" width="5" height="5" fill="#FFFFFF" />
                        <rect x="18" y="4" width="3" height="3" fill="currentColor" />
                        <rect x="2" y="16" width="7" height="7" fill="currentColor" />
                        <rect x="3" y="17" width="5" height="5" fill="#FFFFFF" />
                        <rect x="4" y="18" width="3" height="3" fill="currentColor" />
                        {/* Các điểm dữ liệu hoa văn di sản số */}
                        <rect x="10" y="3" width="1" height="1" fill="currentColor" />
                        <rect x="12" y="3" width="1" height="1" fill="currentColor" />
                        <rect x="14" y="3" width="1" height="1" fill="currentColor" />
                        <rect x="10" y="5" width="2" height="1" fill="currentColor" />
                        <rect x="13" y="5" width="1" height="1" fill="currentColor" />
                        <rect x="3" y="10" width="1" height="1" fill="currentColor" />
                        <rect x="5" y="10" width="1" height="1" fill="currentColor" />
                        <rect x="7" y="10" width="1" height="1" fill="currentColor" />
                        <rect x="10" y="10" width="2" height="2" fill="currentColor" />
                        <rect x="13" y="11" width="2" height="1" fill="currentColor" />
                        <rect x="16" y="10" width="1" height="2" fill="currentColor" />
                        <rect x="19" y="11" width="2" height="1" fill="currentColor" />
                        <rect x="22" y="10" width="1" height="2" fill="currentColor" />
                        <rect x="10" y="14" width="1" height="2" fill="currentColor" />
                        <rect x="12" y="13" width="2" height="1" fill="currentColor" />
                        <rect x="15" y="14" width="1" height="1" fill="currentColor" />
                        <rect x="17" y="13" width="2" height="2" fill="currentColor" />
                        <rect x="20" y="14" width="1" height="1" fill="currentColor" />
                        <rect x="22" y="14" width="1" height="2" fill="currentColor" />
                        <rect x="10" y="17" width="2" height="1" fill="currentColor" />
                        <rect x="13" y="18" width="1" height="2" fill="currentColor" />
                        <rect x="15" y="17" width="2" height="1" fill="currentColor" />
                        <rect x="19" y="17" width="1" height="1" fill="currentColor" />
                        <rect x="21" y="18" width="2" height="2" fill="currentColor" />
                        <rect x="10" y="21" width="1" height="2" fill="currentColor" />
                        <rect x="12" y="20" width="2" height="1" fill="currentColor" />
                        <rect x="15" y="21" width="2" height="2" fill="currentColor" />
                        <rect x="18" y="20" width="1" height="1" fill="currentColor" />
                        <rect x="20" y="21" width="1" height="2" fill="currentColor" />
                      </svg>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        ) : (
          /* ================================================================
             MODAL TAB CONTENT 2: PERSONAL LOOKBOOK HUB (WARDROBE MANAGEMENT)
             ================================================================ */
          <div className="p-4 sm:p-6 overflow-y-auto flex-1 min-h-0 space-y-4 overscroll-contain">
            {/* Top Hub Header + Public Group Album Trigger */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-[#E3DAC9]">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-lg font-serif font-black text-[#2C241D]">
                    Personal Lookbook Hub – Tủ Đồ Di Sản Số
                  </h4>
                  <span className="text-xs font-bold px-2.5 py-0.5 bg-[#1B3B6F]/10 text-[#1B3B6F] rounded-full">
                    {filteredOutfits.length}/{savedOutfits.length} Bộ Phối
                  </span>
                </div>
                <p className="text-xs text-[#7A6E5F] mt-0.5">
                  {currentUser
                    ? `Xin chào ${currentUser.name}! Tủ đồ của bạn đã được đồng bộ vĩnh viễn trên Cloud.`
                    : 'Lưu trữ, lọc đa chiều theo dòng áo & sự kiện, gắn sao yêu thích và tạo Album kỷ yếu nhóm.'}
                </p>
              </div>

              <button
                onClick={() => {
                  setIsAlbumCreatorOpen(!isAlbumCreatorOpen);
                  if (
                    !isAlbumCreatorOpen &&
                    selectedAlbumOutfitIds.length === 0 &&
                    savedOutfits.length > 0
                  ) {
                    setSelectedAlbumOutfitIds(
                      savedOutfits.slice(0, Math.min(3, savedOutfits.length)).map((o) => o.id)
                    );
                  }
                }}
                className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-sm cursor-pointer shrink-0 ${
                  isAlbumCreatorOpen
                    ? 'bg-[#2C241D] text-amber-300 border border-[#D4AF37]'
                    : 'bg-gradient-to-r from-[#1B3B6F] to-[#28559A] hover:brightness-110 text-white'
                }`}
              >
                <Globe className="w-3.5 h-3.5 text-amber-300" />
                <span>🌐 Tạo Album Chia Sẻ Nhóm</span>
              </button>
            </div>

            {/* PUBLIC GROUP ALBUM CREATOR PANEL */}
            {isAlbumCreatorOpen && (
              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#FFFDF9] to-[#F3EDE0] border-2 border-[#D4AF37] shadow-lg space-y-3.5 animate-in slide-in-from-top-2 duration-200">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#B83227] bg-red-50 px-2 py-0.5 rounded-md border border-red-200">
                      Chia Sẻ Công Khai & Bình Chọn Nhóm
                    </span>
                    <h5 className="text-sm font-serif font-bold text-[#2C241D] mt-1">
                      Khởi Tạo Album Lookbook Chung Cho Lớp / Nhóm Chụp Ảnh
                    </h5>
                    <p className="text-[11px] text-[#5C5346]">
                      Bước 1: Tick chọn từ <strong>2 đến 4 bộ đồ</strong> đắc ý nhất bên dưới (Đang chọn:{' '}
                      <strong className="text-[#B83227]">
                        {selectedAlbumOutfitIds.length}/4
                      </strong>
                      ) · Bước 2: Đặt tên Album và tạo mã QR.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsAlbumCreatorOpen(false)}
                    className="p-1 text-[#7A6E5F] hover:text-[#2C241D] rounded-lg cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5">
                  <input
                    type="text"
                    value={albumName}
                    onChange={(e) => setAlbumName(e.target.value)}
                    placeholder="Nhập tên Album (VD: Bộ Sưu Tập Kỷ Yếu Dinh Độc Lập - Nhóm UEH 2026)"
                    className="flex-1 px-3.5 py-2 text-xs bg-white rounded-xl border border-[#D6CEBE] text-[#2C241D] font-medium focus:outline-hidden focus:border-[#1B3B6F]"
                  />
                  <button
                    onClick={handleCreatePublicAlbum}
                    disabled={selectedAlbumOutfitIds.length < 1}
                    className="px-4 py-2 bg-[#B83227] hover:bg-[#99261c] disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>Khởi Tạo Album Công Khai</span>
                  </button>
                </div>

                {/* Generated Link + Dynamic QR Code Popup Box */}
                {generatedAlbumLink && (
                  <div className="p-3.5 bg-white rounded-2xl border border-[#E3DAC9] flex flex-col sm:flex-row items-center gap-4 shadow-xs animate-in zoom-in-95 duration-200">
                    {/* Dynamic Crisp SVG QR Code */}
                    <div className="p-2 bg-white rounded-xl border-2 border-[#2C241D] shrink-0 shadow-xs">
                      <svg
                        viewBox="0 0 100 100"
                        className="w-24 h-24"
                        aria-label="QR Code Album Họa Sắc Việt"
                      >
                        <rect width="100" height="100" fill="#FFFFFF" />
                        {/* Top-left finder */}
                        <rect x="6" y="6" width="24" height="24" fill="none" stroke="#2C241D" strokeWidth="4" />
                        <rect x="12" y="12" width="12" height="12" fill="#B83227" />
                        {/* Top-right finder */}
                        <rect x="70" y="6" width="24" height="24" fill="none" stroke="#2C241D" strokeWidth="4" />
                        <rect x="76" y="12" width="12" height="12" fill="#1B3B6F" />
                        {/* Bottom-left finder */}
                        <rect x="6" y="70" width="24" height="24" fill="none" stroke="#2C241D" strokeWidth="4" />
                        <rect x="12" y="76" width="12" height="12" fill="#1B3B6F" />
                        {/* Data matrix modules */}
                        {[
                          [36, 8], [44, 8], [56, 8], [36, 16], [48, 16], [60, 16],
                          [36, 24], [44, 24], [52, 24], [8, 36], [16, 36], [28, 36],
                          [64, 36], [76, 36], [88, 36], [12, 44], [24, 44], [68, 44],
                          [84, 44], [8, 52], [20, 52], [72, 52], [88, 52], [16, 60],
                          [28, 60], [64, 60], [80, 60], [36, 68], [48, 68], [60, 68],
                          [72, 68], [84, 68], [36, 76], [44, 76], [56, 76], [68, 76],
                          [88, 76], [36, 86], [52, 86], [64, 86], [76, 86], [86, 86],
                        ].map(([x, y], i) => (
                          <rect
                            key={i}
                            x={x}
                            y={y}
                            width="6"
                            height="6"
                            rx="1"
                            fill="#2C241D"
                          />
                        ))}
                        {/* Center Heritage Emblem */}
                        <rect x="37" y="37" width="26" height="26" rx="4" fill="#B83227" stroke="#D4AF37" strokeWidth="1.5" />
                        <text
                          x="50"
                          y="53"
                          fill="#FFFFFF"
                          fontSize="8"
                          fontWeight="bold"
                          textAnchor="middle"
                          fontFamily="serif"
                        >
                          HSV
                        </text>
                      </svg>
                    </div>

                    <div className="flex-1 space-y-2 text-center sm:text-left min-w-0 w-full">
                      <div className="text-xs font-serif font-bold text-[#2C241D] truncate">
                        ✦ {albumName}
                      </div>
                      <div className="text-[11px] text-[#5C5346]">
                        Gồm <strong>{selectedAlbumOutfitIds.length} thiết kế</strong> cổ phục được chọn lọc bởi{' '}
                        <strong>{authorName}</strong>.
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-[#FAF7F2] rounded-xl border border-[#D6CEBE] text-xs font-mono text-[#1B3B6F] truncate">
                        <Globe className="w-3.5 h-3.5 shrink-0 text-[#B83227]" />
                        <span className="truncate">{generatedAlbumLink}</span>
                      </div>
                      <div className="pt-0.5">
                        <button
                          onClick={handleCopyAlbumLink}
                          className="w-full sm:w-auto px-4 py-2 bg-[#1B3B6F] hover:bg-[#152e57] text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <Copy className="w-3.5 h-3.5 text-amber-300" />
                          <span>🔗 Sao Chép Liên Kết Gửi Bạn Bè</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {albumToastMessage && (
                  <div className="p-2.5 rounded-xl bg-emerald-600 text-white text-xs font-medium flex items-center gap-2 shadow-md animate-in fade-in duration-200">
                    <Check className="w-4 h-4 shrink-0" />
                    <span>{albumToastMessage}</span>
                  </div>
                )}
              </div>
            )}

            {/* MULTI-DIMENSIONAL FILTERS TOOLBAR */}
            <div className="p-3.5 bg-white rounded-2xl border border-[#E3DAC9] shadow-2xs space-y-3">
              {/* Row 1: Timeline Chips + Favorite Quick Toggle */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[11px] font-bold text-[#7A6E5F] flex items-center gap-1 mr-1">
                    <Calendar className="w-3.5 h-3.5 text-[#B83227]" />
                    <span>Mốc thời gian:</span>
                  </span>
                  {[
                    { id: 'all', label: 'Tất Cả' },
                    { id: 'today', label: 'Hôm Nay' },
                    { id: 'week', label: 'Tuần Này' },
                    { id: 'month', label: 'Tháng Này' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() =>
                        setTimelineFilter(t.id as 'all' | 'today' | 'week' | 'month')
                      }
                      className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
                        timelineFilter === t.id
                          ? 'bg-[#B83227] text-white shadow-2xs'
                          : 'bg-[#FAF7F2] text-[#5C5346] hover:bg-[#EDE7DC] border border-[#E3DAC9]'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                {/* Filter Favorites Button */}
                <button
                  onClick={() => setOnlyFavorites(!onlyFavorites)}
                  className={`px-3 py-1 text-xs font-bold rounded-xl border transition-all flex items-center gap-1.5 cursor-pointer ${
                    onlyFavorites
                      ? 'bg-amber-400/20 border-amber-500 text-amber-900 shadow-2xs ring-2 ring-amber-400/30'
                      : 'bg-[#FAF7F2] border-[#D6CEBE] text-[#5C5346] hover:text-[#2C241D]'
                  }`}
                >
                  <Star
                    className={`w-3.5 h-3.5 ${
                      onlyFavorites
                        ? 'fill-amber-500 text-amber-500'
                        : 'text-amber-500'
                    }`}
                  />
                  <span>⭐ Đã Lưu Yêu Thích</span>
                </button>
              </div>

              {/* Row 2: Garment Type Dropdown & Occasion Dropdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-[#F2ECE1]">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-[#5C5346] whitespace-nowrap flex items-center gap-1">
                    <Filter className="w-3 h-3 text-[#1B3B6F]" />
                    <span>Dòng áo:</span>
                  </span>
                  <select
                    value={garmentFilter}
                    onChange={(e) => setGarmentFilter(e.target.value)}
                    className="flex-1 px-2.5 py-1.5 text-xs bg-[#FAF7F2] rounded-xl border border-[#D6CEBE] text-[#2C241D] font-semibold focus:outline-hidden focus:border-[#1B3B6F] cursor-pointer"
                  >
                    <option value="all">Tất cả áo cổ phục</option>
                    <option value="ao_tac">Áo Tấc (Ngũ Thân Tay Thụng)</option>
                    <option value="ao_chen">Áo Chẽn (Ngũ Thân Tay Chẽn)</option>
                    <option value="ao_dai">Áo Dài (Truyền Thống & Cách Tân)</option>
                    <option value="ao_giao_linh">Áo Giao Lĩnh</option>
                    <option value="ao_tu_than">Áo Tứ Thân</option>
                    <option value="ao_nhat_binh">Áo Nhật Bình</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-[#5C5346] whitespace-nowrap">
                    Sự kiện:
                  </span>
                  <select
                    value={occasionFilter}
                    onChange={(e) => setOccasionFilter(e.target.value)}
                    className="flex-1 px-2.5 py-1.5 text-xs bg-[#FAF7F2] rounded-xl border border-[#D6CEBE] text-[#2C241D] font-semibold focus:outline-hidden focus:border-[#1B3B6F] cursor-pointer"
                  >
                    <option value="all">Tất cả sự kiện</option>
                    <option value="tot_nghiep">Kỷ yếu học đường</option>
                    <option value="dao_pho">Dạo phố check-in</option>
                    <option value="tet_dam_ngo">Nghi lễ gia đình</option>
                    <option value="trinh_dien">Lễ hội di sản</option>
                  </select>
                </div>
              </div>
            </div>

            {/* OUTFIT CARDS GRID */}
            {filteredOutfits.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-dashed border-[#D6CEBE] space-y-3">
                <Bookmark className="w-8 h-8 text-[#A89F91] mx-auto" />
                <p className="text-sm font-medium text-[#5C5346]">
                  Không tìm thấy bản phối nào khớp với bộ lọc hiện tại.
                </p>
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => {
                      setTimelineFilter('all');
                      setGarmentFilter('all');
                      setOccasionFilter('all');
                      setOnlyFavorites(false);
                    }}
                    className="px-3.5 py-1.5 text-xs font-bold text-[#1B3B6F] bg-[#1B3B6F]/10 rounded-xl hover:bg-[#1B3B6F] hover:text-white transition-colors cursor-pointer"
                  >
                    Đặt Lại Bộ Lọc
                  </button>
                  <button
                    onClick={() => setModalTab('current')}
                    className="px-3.5 py-1.5 text-xs font-bold text-[#B83227] bg-[#B83227]/10 rounded-xl hover:bg-[#B83227] hover:text-white transition-colors cursor-pointer"
                  >
                    Lưu Bộ Trang Phục Hiện Tại ➔
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredOutfits.map((saved, idx) => {
                  const gInfo = GARMENTS[saved.garmentId];
                  const savedAuth = calculateHeritageAuthenticity(saved);
                  const isSelectedForAlbum = selectedAlbumOutfitIds.includes(
                    saved.id
                  );

                  return (
                    <div
                      key={saved.id || idx}
                      className={`p-3.5 bg-white rounded-2xl border-2 transition-all flex flex-col justify-between space-y-3 relative ${
                        isSelectedForAlbum && isAlbumCreatorOpen
                          ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/30 bg-amber-50/20'
                          : 'border-[#D6CEBE] hover:border-[#1B3B6F] shadow-xs hover:shadow-md'
                      }`}
                    >
                      <div className="flex gap-3.5 items-stretch">
                        {/* Full Character Thumbnail with Backdrop & Lighting */}
                        <div className="w-24 h-32 rounded-xl overflow-hidden border border-[#D6CEBE] bg-[#FAF7F2] relative shrink-0 flex items-center justify-center shadow-inner">
                          <LandmarkBackdrop
                            landmarkId={saved.backdropId || 'van_mieu'}
                            lightingId={saved.lightingId || 'nang_am'}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                          <div className="relative z-10 w-full h-full flex items-center justify-center p-1">
                            <OutfitCharacterSVG outfit={saved} showSeal={false} />
                          </div>

                          {/* Group Album Selection Checkbox if Album Creator is open */}
                          {isAlbumCreatorOpen && (
                            <button
                              onClick={() => handleToggleSelectAlbumOutfit(saved.id)}
                              className={`absolute top-1.5 left-1.5 z-20 w-5 h-5 rounded-md border flex items-center justify-center text-[11px] font-bold cursor-pointer ${
                                isSelectedForAlbum
                                  ? 'bg-[#B83227] border-white text-white shadow-sm'
                                  : 'bg-white/90 border-[#2C241D] text-transparent'
                              }`}
                              title="Chọn vào Album nhóm"
                            >
                              ✓
                            </button>
                          )}
                        </div>

                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center justify-between gap-1">
                              <span className="text-[10px] uppercase font-bold text-[#B83227] truncate">
                                {gInfo?.name || 'Cổ Phục Việt'}
                              </span>
                              <div className="flex items-center gap-1 shrink-0">
                                <span className="text-[10px] text-[#7A6E5F]">
                                  {new Date(
                                    saved.createdAt || Date.now()
                                  ).toLocaleDateString('vi-VN')}
                                </span>
                                {/* Star Favorite Toggle Button */}
                                {onToggleFavoriteOutfit && (
                                  <button
                                    onClick={() => onToggleFavoriteOutfit(saved.id)}
                                    className={`p-1 rounded-lg transition-transform active:scale-125 cursor-pointer ${
                                      saved.isFavorite
                                        ? 'text-amber-500 bg-amber-50'
                                        : 'text-[#A89F91] hover:text-amber-500 hover:bg-stone-50'
                                    }`}
                                    title={
                                      saved.isFavorite
                                        ? 'Bỏ đánh dấu yêu thích'
                                        : 'Đánh dấu ⭐ Yêu thích'
                                    }
                                  >
                                    <Star
                                      className={`w-4 h-4 ${
                                        saved.isFavorite ? 'fill-amber-400 text-amber-500' : ''
                                      }`}
                                    />
                                  </button>
                                )}
                              </div>
                            </div>

                            <h5 className="text-sm font-serif font-bold text-[#2C241D] line-clamp-1">
                              {saved.title}
                            </h5>

                            {/* Heritage Score & Occasion */}
                            <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                                  savedAuth.score === 100
                                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                    : 'bg-amber-50 text-amber-800 border-amber-200'
                                }`}
                              >
                                ✓ {savedAuth.score}% Chuẩn Mực
                              </span>
                              <span className="text-[10px] text-[#5C5346] bg-[#FAF7F2] px-2 py-0.5 rounded-full border border-[#EDE7DC]">
                                {getOccasionLabel(saved.occasionId)}
                              </span>
                            </div>
                          </div>

                          {/* Colors swatch */}
                          <div className="flex items-center gap-1.5 pt-1.5">
                            <span
                              className="w-3.5 h-3.5 rounded-full border border-black/15 shrink-0"
                              style={{ backgroundColor: saved.mainColor.hex }}
                              title="Áo chính"
                            />
                            <span
                              className="w-3.5 h-3.5 rounded-full border border-black/15 shrink-0"
                              style={{ backgroundColor: saved.innerColor.hex }}
                              title="Lót trong"
                            />
                            <span
                              className="w-3.5 h-3.5 rounded-full border border-black/15 shrink-0"
                              style={{ backgroundColor: saved.bottomColor.hex }}
                              title="Quần/Váy"
                            />
                            <span className="text-[10px] text-[#7A6E5F] truncate ml-0.5">
                              {saved.mainColor.name}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Card Footer Actions */}
                      <div className="flex items-center justify-between gap-2 pt-2.5 border-t border-[#EDE7DC]">
                        <button
                          onClick={() => {
                            if (onLoadSavedOutfit) {
                              onLoadSavedOutfit(saved);
                              onClose();
                            }
                          }}
                          className="flex-1 py-1.5 px-3 text-xs font-bold text-[#1B3B6F] bg-[#1B3B6F]/10 hover:bg-[#1B3B6F] hover:text-white rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>🔄 Mặc Lại Bản Phối Này</span>
                        </button>

                        {onDeleteSavedOutfit && (
                          <button
                            onClick={() => onDeleteSavedOutfit(saved.id)}
                            className="px-2.5 py-1.5 text-xs font-semibold text-[#7A6E5F] hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
                            title="Xóa khỏi bộ sưu tập"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Xóa</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Modal Action Buttons (Cố định ở đáy, không bao giờ bị đẩy ra ngoài) */}
        <div className="shrink-0 flex items-center justify-between px-3.5 sm:px-5 py-2.5 bg-white border-t border-[#E3DAC9] gap-2 flex-wrap">
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleSaveToLookbook}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all flex items-center gap-1.5 cursor-pointer ${
                justSaved
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-[#FAF7F2] hover:bg-[#EDE7DC] text-[#1B3B6F] border-[#D6CEBE]'
              }`}
            >
              {justSaved ? (
                <Check className="w-3.5 h-3.5" />
              ) : (
                <Bookmark className="w-3.5 h-3.5" />
              )}
              <span>{justSaved ? 'Đã Lưu Vào Tủ Đồ!' : 'Lưu Vào Lookbook'}</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="px-3 py-1.5 text-xs font-medium text-[#2C241D] bg-[#FAF7F2] hover:bg-[#EDE7DC] border border-[#D6CEBE] rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <Share2 className="w-3.5 h-3.5" />
              )}
              <span>{copied ? 'Đã Chép Link!' : 'Chia Sẻ'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="btn-download-lookbook"
              onClick={handleDownloadLookbook}
              disabled={isExporting}
              className="px-4 py-1.5 text-xs font-semibold text-white bg-[#B83227] hover:bg-[#99261c] disabled:opacity-50 rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isExporting ? 'Đang Xuất Ảnh...' : '📥 Tải Thẻ PNG'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
