import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  CULTURAL_ERAS,
  OCCASIONS,
  GARMENTS,
  COLOR_PALETTE,
  PALETTE_PRESETS,
  ACCESSORIES,
  HERITAGE_SANDBOX_CHALLENGES,
  HeritageSandboxChallenge,
  checkHeritageRules,
  calculateColorHarmony,
} from './data/costumeData';
import {
  EraId,
  OccasionId,
  GarmentId,
  OutfitConfig,
  ColorItem,
  UserProfile,
} from './types/costume';
import { OutfitVisualizer } from './components/OutfitVisualizer';
import { HeritageWarningBanner } from './components/HeritageWarningBanner';
import { CulturalCard } from './components/CulturalCard';
import { LookbookModal } from './components/LookbookModal';
import { AuthModal } from './components/AuthModal';
import { FeedbackModal } from './components/FeedbackModal';
import { QuickGuideModal } from './components/QuickGuideModal';
import { StudioGuidedTour } from './components/StudioGuidedTour';
import { StudioQuickPresetsBar } from './components/StudioQuickPresetsBar';
import { CompareModal } from './components/CompareModal';
import { QuickStylistWizard } from './components/QuickStylistWizard';
import { HeritageChallengeModal } from './components/HeritageChallengeModal';
import { HeritageSandbox } from './components/HeritageSandbox';
import { AiPromptingBar } from './components/AiPromptingBar';
import { GeminiStylistChatBubble } from './components/GeminiStylistChatBubble';
import { LandingPage } from './components/LandingPage';
import { HeritageRepository } from './components/HeritageRepository';
import { HeritageRulesGuide } from './components/HeritageRulesGuide';
import { analyzeUserIntent, AiStylistConsultationResult } from './services/aiStylistBrain';
import {
  getSmartContext,
  getLightingByWeather,
  getWeatherByLighting,
  LANDMARKS,
  LIGHTING_MOODS,
} from './data/landmarksData';
import {
  Sparkles,
  CloudSun,
  Scale,
  Share2,
  Palette,
  Check,
  Shirt,
  Info,
  Sliders,
  Award,
  AlertTriangle,
  Loader2,
  X,
  BookOpen,
  Flame,
  ShieldCheck,
  ShieldAlert,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  KeyRound,
  LogOut,
  User,
  MessageSquare,
  CheckCircle2,
  Lightbulb,
  Compass,
  Menu,
} from 'lucide-react';

const MEMBER_CLOUD_OUTFITS: OutfitConfig[] = [
  {
    id: 'cloud-member-1',
    title: 'Kỷ Yếu Dinh Độc Lập (Áo Tấc x Sneaker Retro)',
    gender: 'female',
    garmentId: 'ao_tac',
    mainColor: COLOR_PALETTE[2], // Tía Cung Đình #7A1C28
    innerColor: COLOR_PALETTE[12],
    bottomColor: COLOR_PALETTE[12],
    lapelDirection: 'huu_nham',
    isSleeveRolled: false,
    selectedBottom: 'quan_lua_ong_suong',
    selectedHeadwear: 'khan_dong',
    selectedShoes: 'sneaker_retro',
    selectedHandheld: 'quat_xep_giay_do',
    selectedOuterwear: 'none',
    backdropId: 'van_mieu',
    lightingId: 'nang_am',
    avatarType: 'female',
    heightCm: 165,
    weightKg: 52,
    isFavorite: true,
    occasionId: 'tot_nghiep',
    createdAt: Date.now() - 3600000 * 3, // Hôm nay
  },
  {
    id: 'cloud-member-2',
    title: 'Phố Thị Trí Thức (Áo Chẽn x Blazer Oversize)',
    gender: 'female',
    garmentId: 'ao_chen',
    mainColor: COLOR_PALETTE[3], // Xanh Chàm Đại Việt
    innerColor: COLOR_PALETTE[12],
    bottomColor: COLOR_PALETTE[12],
    lapelDirection: 'huu_nham',
    isSleeveRolled: false,
    selectedBottom: 'quan_lua_ong_suong',
    selectedHeadwear: 'kep_cang_cua',
    selectedGlasses: 'kinh_kim_loai',
    selectedShoes: 'loafer_da',
    selectedHandheld: 'tui_tote_canvas',
    selectedOuterwear: 'blazer_oversize',
    backdropId: 'pho_co_hoi_an',
    lightingId: 'chieu_thu',
    avatarType: 'female',
    heightCm: 165,
    weightKg: 52,
    isFavorite: true,
    occasionId: 'dao_pho',
    createdAt: Date.now() - 3600000 * 28, // Tuần này
  },
  {
    id: 'cloud-member-3',
    title: 'Bắc Bộ Kinh Kỳ (Áo Tứ Thân Hội Lim)',
    gender: 'female',
    garmentId: 'ao_tu_than',
    mainColor: COLOR_PALETTE[1], // Đỏ Chu Sa
    innerColor: COLOR_PALETTE[5], // Vàng Hoàng Yến
    bottomColor: COLOR_PALETTE[11], // Đen Huyền
    lapelDirection: 'huu_nham',
    isSleeveRolled: false,
    selectedBottom: 'vay_dup_tham',
    selectedHeadwear: 'non_quai_thao',
    selectedShoes: 'guoc_moc_son_mai',
    selectedHandheld: 'quat_xep_giay_do',
    selectedOuterwear: 'none',
    backdropId: 'van_mieu',
    lightingId: 'nang_am',
    avatarType: 'female',
    heightCm: 162,
    weightKg: 50,
    isFavorite: false,
    occasionId: 'trinh_dien',
    createdAt: Date.now() - 3600000 * 24 * 5, // Tuần này
  },
  {
    id: 'cloud-member-4',
    title: 'Gia Phong Đại Lễ (Áo Giao Lĩnh Minh Viên)',
    gender: 'male',
    garmentId: 'ao_giao_linh',
    mainColor: COLOR_PALETTE[0], // Đỏ Tía Cung Đình
    innerColor: COLOR_PALETTE[12],
    bottomColor: COLOR_PALETTE[12],
    lapelDirection: 'huu_nham',
    isSleeveRolled: false,
    selectedBottom: 'quan_lua_ong_suong',
    selectedHeadwear: 'khan_dong',
    selectedShoes: 'hai_theu_cung_dinh',
    selectedHandheld: 'quat_xep_giay_do',
    selectedOuterwear: 'none',
    backdropId: 'hoang_thanh_hue',
    lightingId: 'sang_som',
    avatarType: 'male',
    heightCm: 174,
    weightKg: 66,
    isFavorite: true,
    occasionId: 'tet_dam_ngo',
    createdAt: Date.now() - 3600000 * 24 * 18, // Tháng này
  },
];

export default function App() {
  // Navigation & Modal States (Default: 'home')
  const [activeTab, setActiveTab] = useState<'home' | 'studio' | 'heritage' | 'rules'>('home');
  const [experienceMode, setExperienceMode] = useState<'wizard' | 'studio'>('wizard');
  const [selectedEra, setSelectedEra] = useState<EraId>('nguyen');
  const [selectedOccasion, setSelectedOccasion] = useState<OccasionId>('dao_pho');
  const [selectedWeather, setSelectedWeather] = useState<string>('nang_am');
  const [isLookbookOpen, setIsLookbookOpen] = useState(false);
  const [lookbookInitialTab, setLookbookInitialTab] = useState<'current' | 'saved'>('current');
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  // USER STATE MANAGEMENT: Guest Mode (null) vs Member Mode (UserProfile)
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // IN-APP FEEDBACK MODAL & EMERALD TOAST STATE
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);

  // QUICK GUIDE 30S MODAL & INTERACTIVE GUIDED TOUR SPOTLIGHT STATE
  const [isQuickGuideOpen, setIsQuickGuideOpen] = useState(false);
  const [tourStep, setTourStep] = useState<number | null>(null);

  // Auto-trigger Guided Tour when user switches to 'studio' tab for the first time
  useEffect(() => {
    if (activeTab === 'studio') {
      try {
        const hasSeen = localStorage.getItem('has_seen_studio_tour');
        if (!hasSeen) {
          localStorage.setItem('has_seen_studio_tour', 'true');
          setTourStep(1);
        }
      } catch (e) {}
    } else {
      setTourStep(null);
    }
  }, [activeTab]);

  const handleNextTourStep = () => {
    if (!tourStep) return;
    if (tourStep < 4) {
      setTourStep(tourStep + 1);
    } else {
      setTourStep(null);
    }
  };

  const handlePrevTourStep = () => {
    if (!tourStep) return;
    if (tourStep > 1) {
      setTourStep(tourStep - 1);
    }
  };

  const handleSkipTour = () => {
    try {
      localStorage.setItem('has_seen_studio_tour', 'true');
    } catch (e) {}
    setTourStep(null);
  };

  const handleApplyQuickPreset = (
    updates: Partial<OutfitConfig>,
    presetLabel: string
  ) => {
    handleUpdateOutfit(updates);
    if (updates.occasionId) {
      setSelectedOccasion(updates.occasionId);
    }
    if (updates.lightingId) {
      setSelectedWeather(getWeatherByLighting(updates.lightingId));
    }
    setSuccessToast(`✨ Đã kích hoạt "${presetLabel}" 1-chạm chuẩn mực!`);
    setTimeout(() => setSuccessToast(null), 2600);
  };

  const handleFeedbackSuccess = () => {
    setFeedbackToast(
      '✨ Cảm ơn bạn! Đội ngũ Họa Sắc Việt (UEH) đã ghi nhận phản hồi để hoàn thiện sản phẩm.'
    );
    setTimeout(() => {
      setFeedbackToast(null);
    }, 3500);
  };

  // Saved Lookbook Collection State with LocalStorage Persistence (Guest max 3, Member unlimited Cloud Sync)
  const [savedLookbook, setSavedLookbook] = useState<OutfitConfig[]>(() => {
    try {
      const raw = localStorage.getItem('hoasacviet_saved_lookbook');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed.slice(0, 3);
      }
    } catch (e) {}
    return MEMBER_CLOUD_OUTFITS.slice(0, 2);
  });

  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    setIsUserMenuOpen(false);
    // Merge Guest outfits with Member Cloud Database outfits
    setSavedLookbook((prev) => {
      const existingIds = new Set(prev.map((item) => item.id));
      const merged = [
        ...prev,
        ...MEMBER_CLOUD_OUTFITS.filter((c) => !existingIds.has(c.id)),
      ];
      try {
        localStorage.setItem('hoasacviet_member_cloud_lookbook', JSON.stringify(merged));
      } catch (e) {}
      return merged;
    });
    setSuccessToast(`☁️ Cloud Sync: Chào mừng ${user.name}! Đã đồng bộ tủ đồ di sản.`);
    setTimeout(() => setSuccessToast(null), 3200);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsUserMenuOpen(false);
    setSavedLookbook((prev) => prev.slice(0, 3));
    setSuccessToast('Đã đăng xuất về Chế độ Khách (Lưu tạm tối đa 3 bộ).');
    setTimeout(() => setSuccessToast(null), 2800);
  };

  const handleSaveLookbook = (newOutfit: OutfitConfig) => {
    // Guest Mode Limit Check (Max 3 outfits in localStorage)
    if (!currentUser && savedLookbook.length >= 3) {
      setIsAuthModalOpen(true);
      return;
    }

    const item: OutfitConfig = {
      ...newOutfit,
      id: `lookbook-${Date.now()}`,
      isFavorite: false,
      createdAt: Date.now(),
    };
    const updated = [item, ...savedLookbook];
    setSavedLookbook(updated);
    try {
      const storageKey = currentUser
        ? 'hoasacviet_member_cloud_lookbook'
        : 'hoasacviet_saved_lookbook';
      localStorage.setItem(storageKey, JSON.stringify(updated));
    } catch (e) {}
  };

  const handleDeleteSavedLookbook = (id: string) => {
    const updated = savedLookbook.filter((item) => item.id !== id);
    setSavedLookbook(updated);
    try {
      const storageKey = currentUser
        ? 'hoasacviet_member_cloud_lookbook'
        : 'hoasacviet_saved_lookbook';
      localStorage.setItem(storageKey, JSON.stringify(updated));
    } catch (e) {}
  };

  const handleToggleFavoriteOutfit = (id: string) => {
    const updated = savedLookbook.map((item) =>
      item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
    );
    setSavedLookbook(updated);
    try {
      const storageKey = currentUser
        ? 'hoasacviet_member_cloud_lookbook'
        : 'hoasacviet_saved_lookbook';
      localStorage.setItem(storageKey, JSON.stringify(updated));
    } catch (e) {}
  };

  const handleLoadSavedOutfit = (saved: OutfitConfig) => {
    setCurrentOutfit(saved);
    setActiveTab('studio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleApplyConceptFromLanding = (updates: Partial<OutfitConfig>) => {
    handleUpdateOutfit(updates);
    setActiveTab('studio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Gemini AI Stylist Simulation & Real-time Consultation States
  const [isAiMatching, setIsAiMatching] = useState(false);
  const [aiStepMessage, setAiStepMessage] = useState<string>('');
  const [geminiCommentary, setGeminiCommentary] = useState<string | null>(null);
  const [activeConsultation, setActiveConsultation] = useState<AiStylistConsultationResult | null>(null);
  const [variantIndex, setVariantIndex] = useState(0);
  const [lastPrompt, setLastPrompt] = useState<string>('');

  // Heritage Sandbox & Challenge States
  const [selectedChallenge, setSelectedChallenge] = useState<HeritageSandboxChallenge | null>(null);
  const [isChallengeModalOpen, setIsChallengeModalOpen] = useState(false);
  const [shakeKey, setShakeKey] = useState<number>(0);

  // Heritage Taboo Auto-Popup State (Cảnh báo góc dưới bên phải)
  const [activeTabooPopup, setActiveTabooPopup] = useState<string | null>(null);
  // Thông báo chúc mừng khi chỉnh sửa lại đúng chuẩn (tự biến mất sau 2.5s)
  const [successToast, setSuccessToast] = useState<string | null>(null);
  const prevViolationsCountRef = useRef<number>(0);

  // Active Outfit Configuration
  const [currentOutfit, setCurrentOutfit] = useState<OutfitConfig>({
    id: 'outfit-default',
    title: 'Thanh Nhã Cố Đô (Remix Hiện Đại)',
    gender: 'female',
    garmentId: 'ao_chen',
    mainColor: COLOR_PALETTE[3], // Xanh Chàm Đại Việt
    innerColor: COLOR_PALETTE[12], // Trắng Ngà / Bạch Tuyết
    bottomColor: COLOR_PALETTE[12],
    lapelDirection: 'huu_nham',
    isSleeveRolled: false,
    selectedBottom: 'quan_lua_ong_suong',
    selectedHeadwear: 'khan_dong',
    selectedGlasses: 'none',
    selectedShoes: 'loafer_da',
    selectedHandheld: 'quat_xep_giay_do',
    selectedOuterwear: 'none',
    backdropId: 'pho_co_hoi_an',
    lightingId: 'nang_am',
    avatarType: 'female',
    heightCm: 165,
    weightKg: 52,
    occasionId: 'dao_pho',
    createdAt: Date.now(),
  });

  // Real-time Heritage Scanner
  const violations = useMemo(() => {
    return checkHeritageRules(currentOutfit);
  }, [currentOutfit]);

  // Tự động kiểm tra: khi chỉnh sửa lại đúng quy chuẩn di sản (violations.length === 0)
  // thì cảnh báo ở góc dưới phải TỰ ĐỘNG BIẾN MẤT ngay lập tức!
  useEffect(() => {
    if (violations.length === 0) {
      setActiveTabooPopup(null);
      // Nếu vừa chuyển từ trạng thái vi phạm sang đúng chuẩn -> hiện toast chúc mừng 2.5 giây
      if (prevViolationsCountRef.current > 0) {
        setSuccessToast('Đã phục hồi 100% chuẩn mực di sản Việt!');
        const timer = setTimeout(() => {
          setSuccessToast(null);
        }, 2500);
        return () => clearTimeout(timer);
      }
    } else {
      setActiveTabooPopup(violations[0].description);
    }
    prevViolationsCountRef.current = violations.length;
  }, [violations]);

  // Real-time Color Harmony Engine with Ngũ Hành
  const colorHarmony = useMemo(() => {
    return calculateColorHarmony(
      currentOutfit.mainColor,
      currentOutfit.innerColor,
      currentOutfit.bottomColor
    );
  }, [currentOutfit.mainColor, currentOutfit.innerColor, currentOutfit.bottomColor, currentOutfit.selectedBottom]);

  // Update outfit handler with automatic taboo detection popup
  const handleUpdateOutfit = (updates: Partial<OutfitConfig>) => {
    const nextOutfit = { ...currentOutfit, ...updates };

    // 1. Logic ẩn/hiện triệt để các lớp khi đổi dáng áo (Outfit State Toggle)
    if (updates.garmentId && updates.garmentId !== currentOutfit.garmentId) {
      // Ẩn toàn bộ các chi tiết của dòng áo khác trước khi vẽ dòng áo mới
      nextOutfit.isSoloYem = false;
      if (updates.garmentId !== 'ao_tac') {
        nextOutfit.isSleeveRolled = false;
      }
    }

    // QUY TẮC: Khi chọn nhân vật nam thì không thể cho mặc các loại váy
    if (nextOutfit.gender === 'male') {
      if (
        nextOutfit.selectedBottom === 'vay_dup_tham' ||
        nextOutfit.selectedBottom === 'chan_vay_midi_xep_ly' ||
        nextOutfit.selectedBottom.includes('vay')
      ) {
        nextOutfit.selectedBottom = 'quan_lua_ong_suong';
      }
    }
    setCurrentOutfit(nextOutfit);

    const nextViolations = checkHeritageRules(nextOutfit);
    if (nextViolations.length > 0) {
      setActiveTabooPopup(nextViolations[0].description);
    } else {
      // Khi đã chỉnh sửa lại đúng quy chuẩn -> cảnh báo tự động biến mất
      setActiveTabooPopup(null);
    }
  };

  // 1-Click Fix for violations
  const handleFixViolation = (violationId: string) => {
    switch (violationId) {
      case 'ta_nham_grave':
        handleUpdateOutfit({ lapelDirection: 'huu_nham' });
        break;
      case 'cross_region_mismatch':
        handleUpdateOutfit({ selectedHeadwear: 'khan_dong' });
        break;
      case 'indecent_bottom_hazard':
        handleUpdateOutfit({ selectedBottom: 'quan_lua_ong_suong' });
        break;
      case 'bare_yem_exposure':
        handleUpdateOutfit({ selectedOuterwear: 'none' });
        break;
      case 'rolled_sleeves_ao_tac':
        handleUpdateOutfit({ isSleeveRolled: false });
        break;
      case 'exotic_manchu_hairpin':
        handleUpdateOutfit({ selectedHeadwear: 'khan_dong' });
        break;
      case 'exotic_obi_belt':
        handleUpdateOutfit({ selectedOuterwear: 'none' });
        break;
      default:
        break;
    }
    setActiveTabooPopup(null);
    setShakeKey((prev) => prev + 1);
  };

  // Trigger Heritage Sandbox Taboo Challenge
  const handleTriggerChallenge = (challenge: HeritageSandboxChallenge) => {
    const updates = challenge.applyUpdates(currentOutfit);
    handleUpdateOutfit(updates);
    setSelectedChallenge(challenge);
    setIsChallengeModalOpen(true);
    setShakeKey((prev) => prev + 1);
  };

  // Full Cultural Restoration (100% Compliant)
  const handleRestoreCompliant = () => {
    handleUpdateOutfit({
      lapelDirection: 'huu_nham',
      isSleeveRolled: false,
      selectedBottom:
        currentOutfit.selectedBottom === 'quan_short_rach'
          ? 'quan_lua_ong_suong'
          : currentOutfit.selectedBottom,
      selectedHeadwear:
        currentOutfit.selectedHeadwear === 'tram_cai_thanh_trieu' ||
        (currentOutfit.selectedHeadwear === 'non_quai_thao' &&
          (currentOutfit.garmentId === 'ao_tac' || currentOutfit.garmentId === 'ao_chen'))
          ? 'khan_dong'
          : currentOutfit.selectedHeadwear,
      selectedOuterwear:
        currentOutfit.selectedOuterwear === 'dai_that_obi' ||
        currentOutfit.selectedOuterwear === 'none_bare'
          ? 'none'
          : currentOutfit.selectedOuterwear,
      isSoloYem: false,
    });
    setShakeKey((prev) => prev + 1);
    setActiveTabooPopup(null);
  };

  // 3. APPLY PALETTE PRESETS (Hoàng Gia Huế, Hội Lim Kinh Bắc, Pastel Đô Thị)
  const handleApplyPreset = (presetId: string) => {
    const preset = PALETTE_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;

    const main = COLOR_PALETTE.find((c) => c.id === preset.mainColorId) || COLOR_PALETTE[0];
    const inner = COLOR_PALETTE.find((c) => c.id === preset.innerColorId) || COLOR_PALETTE[12];
    const bottom = COLOR_PALETTE.find((c) => c.id === preset.bottomColorId) || COLOR_PALETTE[12];

    const isMale = currentOutfit.gender === 'male';
    let chosenBottom = preset.recommendedBottom;
    if (isMale && (chosenBottom === 'vay_dup_tham' || chosenBottom === 'chan_vay_midi_xep_ly' || chosenBottom.includes('vay'))) {
      chosenBottom = 'quan_lua_ong_suong';
    }

    handleUpdateOutfit({
      mainColor: main,
      innerColor: inner,
      bottomColor: bottom,
      selectedBottom: chosenBottom,
      selectedHeadwear: preset.recommendedHeadwear,
      selectedShoes: preset.recommendedShoes,
      selectedOuterwear: preset.recommendedOuterwear,
    });
  };

  // AI SMART COLOR AUTO-FIX: Cân bằng Ngũ Hành Tương Sinh (Feature #3)
  const handleAiAutoFixColor = () => {
    const mainElem = currentOutfit.mainColor.fiveElements;
    // Tìm hành tương sinh bổ trợ cho áo chính:
    // Kim sinh Thủy, Thủy sinh Mộc, Mộc sinh Hỏa, Hỏa sinh Thổ, Thổ sinh Kim
    const generatingMap: Record<string, { targetElement: string; preferredColorId: string; phrase: string }> = {
      Thủy: { targetElement: 'Kim', preferredColorId: 'bach_ngoc', phrase: 'Kim sinh Thủy' },
      Mộc: { targetElement: 'Thủy', preferredColorId: 'xanh_cham', phrase: 'Thủy sinh Mộc' },
      Hỏa: { targetElement: 'Mộc', preferredColorId: 'xanh_luc_bao', phrase: 'Mộc sinh Hỏa' },
      Thổ: { targetElement: 'Hỏa', preferredColorId: 'do_chu_sa', phrase: 'Hỏa sinh Thổ' },
      Kim: { targetElement: 'Thổ', preferredColorId: 'vang_hoang_yen', phrase: 'Thổ sinh Kim' },
    };

    const config = generatingMap[mainElem] || {
      targetElement: 'Kim',
      preferredColorId: 'bach_ngoc',
      phrase: 'Kim sinh Thủy',
    };

    const matchingInner =
      COLOR_PALETTE.find((c) => c.id === config.preferredColorId) ||
      COLOR_PALETTE.find(
        (c) => c.fiveElements === config.targetElement && c.type === 'traditional'
      ) ||
      COLOR_PALETTE[12]; // Fallback Trắng ngà (Bạch ngọc - Kim)

    const silkTrousersColor =
      COLOR_PALETTE.find((c) => c.id === 'bach_ngoc') ||
      COLOR_PALETTE.find((c) => c.id === 'trang_nga') ||
      COLOR_PALETTE[12];

    const updates: Partial<OutfitConfig> = {
      innerColor: matchingInner,
    };

    // If bottom is banned or clashing, normalize to traditional white silk trousers
    if (
      currentOutfit.selectedBottom === 'quan_short_rach' ||
      currentOutfit.bottomColor.fiveElements === 'Hỏa' && mainElem === 'Thủy'
    ) {
      updates.selectedBottom = 'quan_lua_ong_suong';
      updates.bottomColor = silkTrousersColor;
    }

    handleUpdateOutfit(updates);
    setSuccessToast(`✨ AI Gemini đã cân bằng ngũ hành: ${config.phrase} – Sinh khí & Rạng rỡ trường tồn!`);
    const timer = setTimeout(() => {
      setSuccessToast(null);
    }, 4000);
  };

  // 5. GEMINI AI REAL-TIME CONSULTATION ENGINE (NATURAL LANGUAGE & VOICE)
  const handleConsultGemini = (promptText: string, vIndex = 0) => {
    setIsAiMatching(true);
    setLastPrompt(promptText);
    setVariantIndex(vIndex);

    // Multi-step progress radar scanner in 1.5 seconds
    setAiStepMessage('Gemini đang phân tích ngữ cảnh sự kiện, thời gian và địa điểm...');

    setTimeout(() => {
      setAiStepMessage('Trích xuất yếu tố phong thủy ngũ hành & độ chuẩn mực di sản...');
    }, 550);

    setTimeout(() => {
      setAiStepMessage('Thiết lập outfit tối ưu cho người mặc...');
    }, 1050);

    setTimeout(() => {
      const consultation = analyzeUserIntent(promptText, currentOutfit, vIndex);
      handleUpdateOutfit(consultation.outfitUpdates);
      setActiveConsultation(consultation);
      setGeminiCommentary(consultation.reasoning);
      if (consultation.outfitUpdates.lightingId) {
        setSelectedWeather(getWeatherByLighting(consultation.outfitUpdates.lightingId));
      }
      setIsAiMatching(false);
      setAiStepMessage('');
    }, 1500);
  };

  const handleTryAnotherVariant = () => {
    const nextVariant = variantIndex + 1;
    handleConsultGemini(lastPrompt || 'Kỷ yếu Dinh Độc Lập năng động', nextVariant);
  };

  const handleAiAutoMatch = () => {
    handleConsultGemini('Nữ sinh chụp kỷ yếu Dinh Độc Lập năng động với sneaker', 0);
  };

  // Garments of selected era
  const currentGarmentList = useMemo(() => {
    return Object.values(GARMENTS).filter((g) => g.era === selectedEra);
  }, [selectedEra]);

  return (
    <div className="min-h-screen bg-giay-do flex flex-col font-sans">
      {/* THANH HEADER CHUẨN THỜI TRANG CÔNG NGHỆ 3 CỤM PHÂN MINH */}
      <header className="sticky top-0 z-50 bg-[#FDFAF5]/95 backdrop-blur-md border-b border-amber-200/50 shadow-xs px-4 sm:px-6 md:px-8 py-3 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* 1. CỤM TRÁI: LOGO & SLOGAN (CÓ KHOẢNG ĐỆM TRÁI) */}
          <div 
            className="flex flex-col cursor-pointer select-none pl-2 sm:pl-4 group text-left"
            onClick={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <span className="font-display font-bold text-xl leading-none text-slate-900 tracking-wide group-hover:text-[#A82824] transition-colors">
              HỌA SẮC VIỆT
            </span>
            <span className="text-[10px] tracking-widest text-amber-800/80 uppercase font-medium mt-1 whitespace-nowrap block">
              Dệt Tương Lai Từ Nét Xưa
            </span>
          </div>

          {/* 2. CỤM GIỮA: 4 TAB ĐIỀU HƯỚNG NỘI DUNG LỚN (TYPOGRAPHY THUẦN CHẤT) */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-8">
            {[
              { id: 'home', label: 'Trang Chủ' },
              { id: 'studio', label: 'Studio Phối Đồ' },
              { id: 'heritage', label: 'Kho Tàng Di Sản' },
              { id: 'rules', label: 'Quy Chuẩn Cổ Phục' },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.id as 'home' | 'studio' | 'heritage' | 'rules');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`relative py-1 text-[15px] font-display transition-all cursor-pointer ${
                    isActive
                      ? 'text-[#A82824] font-bold'
                      : 'text-[#444444] hover:text-[#A82824] font-medium'
                  }`}
                >
                  {tab.label}
                  {isActive && (
                    <span className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-[#A82824] rounded-full animate-fadeIn" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* 3. CỤM PHẢI: 3 TIỆN ÍCH TINH GỌN */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Thành phần 1: Nút tròn Hướng Dẫn 30s */}
            <button
              type="button"
              onClick={() => setIsQuickGuideOpen(true)}
              className="w-8 h-8 rounded-full flex items-center justify-center bg-white/80 hover:bg-amber-100/70 border border-amber-200/80 text-amber-900 text-xs shadow-2xs transition-all hover:scale-105 cursor-pointer"
              title="Hướng dẫn phối đồ 30s"
            >
              💡
            </button>

            {/* Thành phần 2: Nút Lookbook Outline với Badge đỏ son */}
            <button
              type="button"
              onClick={() => {
                setLookbookInitialTab(activeTab === 'studio' ? 'current' : 'saved');
                setIsLookbookOpen(true);
              }}
              className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-amber-300/80 hover:bg-amber-50/70 text-xs font-semibold text-slate-800 transition-all shadow-2xs cursor-pointer"
            >
              <span>📖 Lookbook</span>
              <span className="px-1.5 py-0.2 rounded-full bg-[#A82824] text-white text-[10px] font-bold">
                {savedLookbook.length}
              </span>
            </button>

            {/* Thành phần 3: Cụm Tài Khoản Thống Nhất */}
            {currentUser ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white hover:bg-amber-50/80 border border-amber-300/80 text-xs font-semibold text-slate-900 transition-all shadow-2xs cursor-pointer"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="max-w-[120px] truncate">👤 {currentUser.name}</span>
                </button>
                {/* User Dropdown */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-[#FFFDF9] rounded-2xl border-2 border-[#D4AF37] shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-3.5 py-2 border-b border-[#EDE7DC]">
                      <div className="text-xs font-serif font-bold text-[#2C241D]">
                        {currentUser.name}
                      </div>
                      <div className="text-[10.5px] text-[#7A6E5F] truncate">
                        {currentUser.email}
                      </div>
                      <div className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-bold text-emerald-800">
                        <span>🟢 Cloud Sync: Đã đồng bộ</span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        setLookbookInitialTab('saved');
                        setIsLookbookOpen(true);
                      }}
                      className="w-full px-3.5 py-2 text-left text-xs font-medium text-[#2C241D] hover:bg-[#FAF7F2] flex items-center gap-2 cursor-pointer"
                    >
                      <User className="w-3.5 h-3.5 text-[#1B3B6F]" />
                      <span>Hồ sơ cá nhân & Tủ đồ</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        setLookbookInitialTab('saved');
                        setIsLookbookOpen(true);
                      }}
                      className="w-full px-3.5 py-2 text-left text-xs font-medium text-[#2C241D] hover:bg-[#FAF7F2] flex items-center gap-2 cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-[#B83227]" />
                      <span>Lookbook của tôi ({savedLookbook.length})</span>
                    </button>
                    <div className="border-t border-[#EDE7DC] my-1" />
                    <button
                      onClick={handleLogout}
                      className="w-full px-3.5 py-2 text-left text-xs font-bold text-[#B83227] hover:bg-red-50 flex items-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Đăng xuất (Về Guest Mode)</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50/80 hover:bg-amber-100 border border-amber-300 text-xs font-semibold text-amber-900 transition-all shadow-2xs cursor-pointer"
              >
                <span>🔑</span>
                <span>Đăng Nhập (Khách: {savedLookbook.length}/3)</span>
              </button>
            )}

            {/* Mobile Navigation Toggle (md:hidden) */}
            <button
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              className="md:hidden flex items-center justify-center p-2 rounded-xl text-[#5C5346] hover:bg-[#EAE2D2] border border-[#D6CEBE] cursor-pointer"
              title="Menu điều hướng"
            >
              {isMobileNavOpen ? <X className="w-4 h-4 text-[#B83227]" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </header>

      {/* MOBILE NAV DROPDOWN (md:hidden) */}
      {isMobileNavOpen && (
        <div className="md:hidden sticky top-[57px] z-30 bg-[#FAF7F2]/98 backdrop-blur-md border-b border-[#E3DAC9] px-4 py-3 shadow-md animate-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col gap-2 text-xs uppercase tracking-wider font-semibold text-[#5C5346]">
            <button
              onClick={() => {
                setActiveTab('home');
                setIsMobileNavOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`p-2 rounded-lg flex items-center gap-2 cursor-pointer ${
                activeTab === 'home' ? 'bg-[#B83227]/10 text-[#B83227] font-bold' : 'hover:bg-amber-100/50'
              }`}
            >
              <span>🏠</span>
              <span>Trang Chủ</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('studio');
                setIsMobileNavOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`p-2 rounded-lg flex items-center gap-2 cursor-pointer ${
                activeTab === 'studio' ? 'bg-[#B83227]/10 text-[#B83227] font-bold' : 'hover:bg-amber-100/50'
              }`}
            >
              <span>🎨</span>
              <span>Studio Phối Đồ</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('heritage');
                setIsMobileNavOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`p-2 rounded-lg flex items-center gap-2 cursor-pointer ${
                activeTab === 'heritage' ? 'bg-[#B83227]/10 text-[#B83227] font-bold' : 'hover:bg-amber-100/50'
              }`}
            >
              <span>📜</span>
              <span>Kho Tàng Di Sản</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('rules');
                setIsMobileNavOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`p-2 rounded-lg flex items-center gap-2 cursor-pointer ${
                activeTab === 'rules' ? 'bg-[#B83227]/10 text-[#B83227] font-bold' : 'hover:bg-amber-100/50'
              }`}
            >
              <span>⚖️</span>
              <span>Quy Chuẩn Cổ Phục</span>
            </button>
            <button
              onClick={() => {
                setIsCompareOpen(true);
                setIsMobileNavOpen(false);
              }}
              className="p-2 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-amber-100/50 text-[#1B3B6F] font-bold"
            >
              <Scale className="w-4 h-4 text-[#1B3B6F]" />
              <span>⚖️ So Sánh Mockup (A/B)</span>
            </button>
            <div className="border-t border-[#E3DAC9] pt-2 flex items-center justify-between">
              <button
                onClick={() => {
                  setIsQuickGuideOpen(true);
                  setIsMobileNavOpen(false);
                }}
                className="text-xs font-bold text-[#8A5A19] flex items-center gap-1.5"
              >
                <Lightbulb className="w-3.5 h-3.5 text-[#B83227]" />
                <span>💡 Hướng Dẫn 30s</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. AI LOADING PROGRESS OVERLAY */}
      {isAiMatching && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="p-6 bg-white rounded-2xl border border-[#D4AF37] shadow-2xl flex flex-col items-center max-w-sm text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#7C3AED] to-[#D4AF37] flex items-center justify-center text-white shadow-md animate-pulse">
              <Sparkles className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-[#2C241D]">
              Gemini AI Stylist Đang Phối Đồ...
            </h4>
            <p className="text-xs text-[#5C5346] leading-relaxed">
              {aiStepMessage}
            </p>
          </div>
        </div>
      )}

      {/* 4. HERITAGE TABOO CITATION POPUP (CẢNH BÁO GÓC PHẢI DƯỚI - TỰ ĐỘNG BIẾN MẤT KHI CHỈNH SỬA ĐÚNG QUY CHUẨN) */}
      {activeTabooPopup && violations.length > 0 && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md w-[92%] sm:w-auto p-4 bg-[#FFFDF9] rounded-2xl border-2 border-[#B83227] shadow-2xl animate-in slide-in-from-bottom-5 duration-300 ring-4 ring-[#B83227]/20">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#B83227] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <h5 className="text-xs font-bold text-[#B83227] uppercase tracking-wider">
                    Cảnh Báo Lệch Chuẩn Di Sản
                  </h5>
                  <span className="text-[10px] bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded-full border border-red-200">
                    {violations.length} lỗi cần sửa
                  </span>
                </div>
                <p className="text-xs text-[#2C241D] leading-relaxed">
                  {activeTabooPopup}
                </p>
                <div className="pt-1 flex items-center gap-2 flex-wrap">
                  <button
                    onClick={handleRestoreCompliant}
                    className="px-3 py-1.5 bg-[#B83227] hover:bg-[#99261c] text-white text-[11px] font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>✦ Khắc Phục Chuẩn Ngay</span>
                  </button>
                  <span className="text-[10.5px] text-[#7A6E5F] italic">
                    (Sẽ tự biến mất khi sửa đúng)
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setActiveTabooPopup(null)}
              className="p-1 text-[#7A6E5F] hover:text-[#2C241D] rounded-lg hover:bg-black/5 transition-colors cursor-pointer shrink-0"
              title="Đóng cảnh báo"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* THÔNG BÁO THÀNH CÔNG GÓC PHẢI DƯỚI (TỰ BIẾN MẤT SAU 2.5S KHI ĐÃ SỬA ĐÚNG QUY CHUẨN) */}
      {successToast && violations.length === 0 && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm p-3.5 bg-emerald-50 text-emerald-950 rounded-2xl border-2 border-emerald-500 shadow-xl animate-in slide-in-from-bottom-3 duration-200 flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Check className="w-4 h-4" />
          </div>
          <div className="text-xs font-medium">
            <strong className="block text-emerald-900 font-bold">Chuẩn Mực Di Sản: 100%</strong>
            <span className="text-[11px] text-emerald-800">{successToast}</span>
          </div>
        </div>
      )}

      {/* MAIN VIEWPORT */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-5 space-y-6">

        {/* TAB 1: TRANG CHỦ (LANDING PAGE - 4 PHÂN ĐOẠN) */}
        {activeTab === 'home' && (
          <LandingPage
            onNavigate={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onApplyConcept={handleApplyConceptFromLanding}
            savedLookbookCount={savedLookbook.length}
          />
        )}

        {/* 1. THANH TÌM KIẾM HỘI THOẠI THÔNG MINH (AI PROMPTING BAR & VOICE ASSISTANT) - TOUR ĐIỂM 1 */}
        {activeTab === 'studio' && (
          <div
            className={`space-y-4 rounded-2xl transition-all duration-300 ${
              tourStep === 1
                ? 'relative z-50 ring-4 ring-[#D4AF37] shadow-[0_0_35px_rgba(212,175,55,0.85)] bg-[#FAF7F2] p-2'
                : ''
            }`}
          >
            <AiPromptingBar
              onConsultGemini={(prompt) => handleConsultGemini(prompt, 0)}
              isLoading={isAiMatching}
              loadingStepText={aiStepMessage}
            />

            {/* BONG BÓNG TƯ VẤN CÁ NHÂN HÓA (GEMINI STYLIST CHAT BUBBLE) */}
            {activeConsultation && (
              <GeminiStylistChatBubble
                consultation={activeConsultation}
                onOpenLookbook={() => {
                  setLookbookInitialTab('current');
                  setIsLookbookOpen(true);
                }}
                onTryAnotherVariant={handleTryAnotherVariant}
                onClose={() => setActiveConsultation(null)}
              />
            )}
          </div>
        )}

        {/* THANH ĐIỀU HƯỚNG CHẾ ĐỘ STUDIO & TOUR (TINH GỌN, TIẾT KIỆM 150PX CHIỀU DỌC) */}
        {activeTab === 'studio' && (
          <div className="flex items-center justify-between gap-3 px-1 py-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-serif font-bold text-[#2C241D]">
                ✦ Studio Phối Đồ Cổ Phục
              </span>
            </div>

            <div className="flex items-center gap-2 justify-end">
              {/* Nút gạt trượt mini (Segmented Control) */}
              <div className="flex items-center gap-1 p-0.5 bg-white/90 backdrop-blur-md rounded-xl border border-[#EDE7DC] shadow-2xs">
                <button
                  type="button"
                  onClick={() => setExperienceMode('wizard')}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                    experienceMode === 'wizard'
                      ? 'bg-gradient-to-r from-[#B83227] to-[#D4AF37] text-white shadow-2xs'
                      : 'text-[#5C5346] hover:text-[#B83227]'
                  }`}
                >
                  <span>⚡ Gợi Ý Nhanh</span>
                </button>
                <button
                  type="button"
                  onClick={() => setExperienceMode('studio')}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                    experienceMode === 'studio'
                      ? 'bg-[#1B3B6F] text-white shadow-2xs'
                      : 'text-[#5C5346] hover:text-[#1B3B6F]'
                  }`}
                >
                  <span>🎨 Chuyên Sâu</span>
                </button>
              </div>

              {/* Nút Tour Giới Thiệu mini */}
              <button
                type="button"
                onClick={() => setTourStep(1)}
                className="px-2.5 py-1 text-xs font-semibold text-[#8A5A19] bg-amber-50 hover:bg-amber-100 border border-[#D4AF37] rounded-xl transition-all flex items-center gap-1 cursor-pointer shadow-2xs"
                title="Chạy lại Tour hướng dẫn 4 điểm trong Studio"
              >
                <Compass className="w-3.5 h-3.5 text-[#B83227]" />
                <span className="hidden sm:inline">🧭 Xem Tour</span>
              </button>
            </div>
          </div>
        )}

        {/* SECTION 1: STUDIO PHỐI ĐỒ (CORE WORKBENCH) */}
        {activeTab === 'studio' && (
          <div className="space-y-4">
            {/* IF EXPERIENCE MODE IS WIZARD 3 BƯỚC */}
            {experienceMode === 'wizard' ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start animate-in fade-in duration-300">
                {/* Visualizer Column (5 cols - Sticky Viewport) - TOUR ĐIỂM 3 */}
                <div
                  className={`lg:col-span-5 self-start sticky top-14 sm:top-16 md:top-20 max-h-[calc(100dvh-4.25rem)] sm:max-h-[calc(100dvh-4.75rem)] md:max-h-[calc(100dvh-5.5rem)] flex flex-col justify-start items-center space-y-4 overflow-y-auto overflow-x-hidden overscroll-contain pr-1 w-full rounded-3xl transition-all duration-300 z-20 ${
                    tourStep === 3
                      ? 'relative z-50 ring-4 ring-[#D4AF37] shadow-[0_0_35px_rgba(212,175,55,0.85)] bg-[#FAF7F2] p-2'
                      : ''
                  }`}
                >
                  <div className="w-full">
                    <OutfitVisualizer
                      outfit={currentOutfit}
                      violations={violations}
                      onUpdateOutfit={handleUpdateOutfit}
                      onRestoreCompliant={handleRestoreCompliant}
                      onOpenCompare={() => setIsCompareOpen(true)}
                      shakeKey={shakeKey}
                    />
                  </div>
                  <div className="w-full">
                    <CulturalCard garment={GARMENTS[currentOutfit.garmentId]} />
                  </div>
                </div>

                {/* Wizard Workflow (7 cols) - TOUR ĐIỂM 2 */}
                <div
                  className={`lg:col-span-7 space-y-4 rounded-3xl transition-all duration-300 ${
                    tourStep === 2
                      ? 'relative z-50 ring-4 ring-[#D4AF37] shadow-[0_0_35px_rgba(212,175,55,0.85)] bg-[#FAF7F2] p-2'
                      : ''
                  }`}
                >
                  {/* CỤM GỢI Ý MẪU 1-CHẠM (1-CLICK QUICK PRESETS TRÊN ĐẦU STUDIO) */}
                  <StudioQuickPresetsBar
                    currentOutfit={currentOutfit}
                    onApplyPreset={handleApplyQuickPreset}
                  />

                  <QuickStylistWizard
                    outfit={currentOutfit}
                    onUpdateOutfit={handleUpdateOutfit}
                    onSwitchToStudio={() => setExperienceMode('studio')}
                    onOpenLookbook={() => {
                      setLookbookInitialTab('current');
                      setIsLookbookOpen(true);
                    }}
                  />
                </div>
              </div>
            ) : (
              /* IF EXPERIENCE MODE IS STUDIO CHUYÊN SÂU */
              <div className="space-y-5 animate-in fade-in duration-300">
                {/* 5. STYLIST GEMINI NHẬN XÉT BOX (REVEALED AFTER AI AUTO-MATCH) */}
                {geminiCommentary && !activeConsultation && (
                  <div className="p-4 bg-gradient-to-r from-[#FAF5FF] to-[#FFFBEB] rounded-2xl border border-[#D4AF37]/60 shadow-xs flex items-start gap-3 animate-in fade-in duration-300">
                    <div className="w-8 h-8 rounded-xl bg-[#7C3AED]/15 text-[#7C3AED] flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#7C3AED]">
                          Stylist Gemini Nhận Xét Set Đồ
                        </span>
                        <button
                          onClick={() => setGeminiCommentary(null)}
                          className="text-[#7A6E5F] hover:text-[#2C241D] text-xs cursor-pointer"
                        >
                          ✕
                        </button>
                      </div>
                      <p className="text-xs text-[#4C1D95] mt-1 leading-relaxed">
                        {geminiCommentary}
                      </p>
                    </div>
                  </div>
                )}

            {/* Smart Context Filters Bar: Era + Occasion + Weather (Highlighted in Tour Step 1) */}
            <div
              className={`p-3.5 bg-white rounded-2xl border border-[#D6CEBE] shadow-xs space-y-3 transition-all duration-300 ${
                tourStep === 1
                  ? 'relative z-50 ring-4 ring-[#D4AF37] shadow-[0_0_35px_rgba(212,175,55,0.85)]'
                  : ''
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                {/* Era Selector */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
                  <span className="text-[11px] uppercase tracking-wider text-[#7A6E5F] font-semibold mr-1 shrink-0">
                    Thời Kỳ:
                  </span>
                  {CULTURAL_ERAS.map((era) => (
                    <button
                      key={era.id}
                      onClick={() => {
                        setSelectedEra(era.id);
                        const first = Object.values(GARMENTS).find((g) => g.era === era.id);
                        if (first) handleUpdateOutfit({ garmentId: first.id });
                      }}
                      className={`px-3 py-1.5 text-xs font-medium rounded-xl border transition-colors whitespace-nowrap ${
                        selectedEra === era.id
                          ? 'bg-[#1B3B6F] text-white border-[#1B3B6F] shadow-xs'
                          : 'bg-[#FAF7F2] text-[#5C5346] border-[#EDE7DC] hover:border-[#D6CEBE]'
                      }`}
                    >
                      {era.name}
                    </button>
                  ))}
                </div>

                {/* Weather & Occasion Selectors */}
                <div className="flex items-center gap-2 overflow-x-auto">
                  <div className="flex items-center gap-1 bg-[#FAF7F2] p-1 rounded-xl border border-[#EDE7DC] shrink-0">
                    <CloudSun className="w-3.5 h-3.5 text-[#D4AF37] ml-1.5" />
                    <select
                      value={selectedWeather}
                      onChange={(e) => {
                        const val = e.target.value;
                        setSelectedWeather(val);
                        handleUpdateOutfit({ lightingId: getLightingByWeather(val) });
                      }}
                      className="text-xs bg-transparent text-[#2C241D] font-medium pr-2 focus:outline-hidden cursor-pointer"
                    >
                      <option value="nang_am">☀️ Nắng ấm (Golden Hour)</option>
                      <option value="thu_ha_noi">🍂 Chiều thu se lạnh</option>
                      <option value="se_lanh">🏮 Đêm hội hoa đăng</option>
                      <option value="mua_chuyen_mua">🌸 Sáng sớm tinh mơ</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-1 bg-[#FAF7F2] p-1 rounded-xl border border-[#EDE7DC] shrink-0">
                    <Award className="w-3.5 h-3.5 text-[#B83227] ml-1.5" />
                    <select
                      value={selectedOccasion}
                      onChange={(e) => {
                        const val = e.target.value as OccasionId;
                        setSelectedOccasion(val);
                        const smartCtx = getSmartContext(val);
                        handleUpdateOutfit({
                          occasionId: val,
                          backdropId: smartCtx.landmarkId,
                          lightingId: smartCtx.lightingId,
                        });
                        setSelectedWeather(getWeatherByLighting(smartCtx.lightingId));
                      }}
                      className="text-xs bg-transparent text-[#2C241D] font-medium pr-2 focus:outline-hidden cursor-pointer"
                    >
                      {OCCASIONS.map((occ) => (
                        <option key={occ.id} value={occ.id}>
                          {occ.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* TWO-COLUMN WORKBENCH: VISUALIZER (LEFT) + CONFIGURATION ENGINE (RIGHT) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
              
              {/* LEFT COLUMN: Sticky Visualizer & Cultural Insights (5 cols) - TOUR ĐIỂM 3 */}
              <div
                className={`lg:col-span-5 self-start sticky top-14 sm:top-16 md:top-20 max-h-[calc(100dvh-4.25rem)] sm:max-h-[calc(100dvh-4.75rem)] md:max-h-[calc(100dvh-5.5rem)] flex flex-col justify-start items-center space-y-4 overflow-y-auto overflow-x-hidden overscroll-contain pr-1 w-full rounded-3xl transition-all duration-300 z-20 ${
                  tourStep === 3
                    ? 'relative z-50 ring-4 ring-[#D4AF37] shadow-[0_0_35px_rgba(212,175,55,0.85)] bg-[#FAF7F2] p-2'
                    : ''
                }`}
              >
                {/* THANH CÔNG CỤ STUDIO: MÔ HÌNH AVATAR & SO SÁNH (A/B) */}
                <div className="w-full flex items-center justify-between px-3.5 py-2 bg-white/95 backdrop-blur-md rounded-2xl border border-amber-200/80 shadow-xs">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                    <span className="w-2 h-2 rounded-full bg-[#A82824]" />
                    <span className="font-display tracking-wide uppercase text-[11px]">Mô Hình 2D Cổ Phục</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsCompareOpen(true)}
                    className="px-3 py-1 bg-amber-50 hover:bg-amber-100 border border-amber-300 text-xs font-bold text-[#A82824] rounded-xl transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer active:scale-95"
                    title="Mở Bảng So Sánh Đối Sánh (A/B Split View) – Nhân Đôi Mockup Trực Quan"
                  >
                    <Scale className="w-3.5 h-3.5 text-[#A82824]" />
                    <span>⚖️ So Sánh (A/B)</span>
                  </button>
                </div>

                <div className="w-full">
                  <OutfitVisualizer
                    outfit={currentOutfit}
                    violations={violations}
                    onUpdateOutfit={handleUpdateOutfit}
                    onRestoreCompliant={handleRestoreCompliant}
                    onOpenCompare={() => setIsCompareOpen(true)}
                    shakeKey={shakeKey}
                  />
                </div>

                <div className="w-full">
                  <CulturalCard garment={GARMENTS[currentOutfit.garmentId]} />
                </div>
              </div>

              {/* RIGHT COLUMN: Mix & Match Configuration Engine (7 cols) - TOUR ĐIỂM 2 */}
              <div
                className={`lg:col-span-7 space-y-4 rounded-3xl transition-all duration-300 ${
                  tourStep === 2
                    ? 'relative z-50 ring-4 ring-[#D4AF37] shadow-[0_0_35px_rgba(212,175,55,0.85)] bg-[#FAF7F2] p-2'
                    : ''
                }`}
              >
                {/* CỤM GỢI Ý MẪU 1-CHẠM (1-CLICK QUICK PRESETS TRÊN ĐẦU STUDIO) */}
                <StudioQuickPresetsBar
                  currentOutfit={currentOutfit}
                  onApplyPreset={handleApplyQuickPreset}
                  onOpenCompare={() => setIsCompareOpen(true)}
                />

                {/* 1. SELECT GARMENT TYPE */}
                <div className="p-4 bg-white rounded-2xl border border-[#D6CEBE] shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#7A6E5F] flex items-center gap-1.5">
                      <Shirt className="w-3.5 h-3.5 text-[#1B3B6F]" />
                      Chọn Dòng Cổ Phục ({currentGarmentList.length} Kiểu Dáng)
                    </span>
                    <span className="text-[11px] text-[#1B3B6F] font-medium">
                      Bấm để đổi phom áo
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {Object.values(GARMENTS).map((g) => {
                      const isSelected = currentOutfit.garmentId === g.id;
                      return (
                        <button
                          key={g.id}
                          onClick={() => handleUpdateOutfit({ garmentId: g.id })}
                          className={`p-2.5 rounded-xl border text-left transition-all relative ${
                            isSelected
                              ? 'bg-[#1B3B6F]/5 border-[#1B3B6F] ring-1 ring-[#1B3B6F]'
                              : 'bg-[#FAF7F2] border-[#EDE7DC] hover:border-[#D6CEBE]'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <span className="text-xs font-semibold text-[#2C241D] block">
                              {g.name}
                            </span>
                            {isSelected && (
                              <span className="w-2 h-2 rounded-full bg-[#1B3B6F]" />
                            )}
                          </div>
                          <span className="text-[10px] text-[#7A6E5F] block mt-1 line-clamp-1">
                            {g.eraName}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. COLOR PALETTE & NGŨ HÀNH (COLOR HARMONY ENGINE WITH GLOW EFFECT) */}
                <div
                  className={`p-4 bg-white rounded-2xl border transition-all duration-300 shadow-xs space-y-4 ${
                    colorHarmony.isTuongSinh
                      ? 'border-emerald-500 glow-tuong-sinh'
                      : colorHarmony.isTuongKhac
                      ? 'border-red-400 glow-tuong-khac'
                      : 'border-[#D6CEBE]'
                  }`}
                >
                  <div className="flex items-center justify-between border-b border-[#EDE7DC] pb-2.5">
                    <div className="flex items-center gap-2">
                      <Palette className="w-4 h-4 text-[#B83227]" />
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#2C241D]">
                          Động Cơ Ngũ Hành & Hòa Sắc (Color Harmony Engine)
                        </h4>
                        <span className="text-[11px] text-[#7A6E5F]">
                          {colorHarmony.scheme}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* BỔ SUNG TÍNH NĂNG "✨ AI TỰ SỬA MÀU" CHO ĐỘNG CƠ NGŨ HÀNH */}
                      <button
                        type="button"
                        onClick={handleAiAutoFixColor}
                        className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full shadow-sm cursor-pointer transition-all active:scale-95 shrink-0 ${
                          colorHarmony.score < 85 || colorHarmony.isTuongKhac
                            ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white animate-pulse ring-2 ring-amber-300 shadow-md'
                            : 'bg-amber-50 hover:bg-amber-100 text-[#8A5A19] border border-[#D4AF37]/70'
                        }`}
                        title="Tự động phân tích ngũ hành của Áo chính và đổi màu lót trong sang hành tương sinh"
                      >
                        <Sparkles className={`w-3.5 h-3.5 ${colorHarmony.score < 85 || colorHarmony.isTuongKhac ? 'text-amber-200' : 'text-[#8A5A19]'}`} />
                        <span>✨ AI Tự Sửa Màu</span>
                      </button>

                      <div className="text-right">
                        <span
                          className={`text-sm font-bold font-serif ${
                            colorHarmony.isTuongSinh
                              ? 'text-emerald-700'
                              : colorHarmony.isTuongKhac
                              ? 'text-[#B83227]'
                              : 'text-[#1B3B6F]'
                          }`}
                        >
                          {colorHarmony.score}/100
                        </span>
                        <span className="block text-[10px] text-[#7A6E5F]">
                          {colorHarmony.label}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 3 QUICK PALETTE PRESETS BUTTONS */}
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#7A6E5F] font-semibold block mb-1.5">
                      Bảng Màu Nhanh (1-Click Palette Presets):
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {PALETTE_PRESETS.map((preset) => (
                        <button
                          key={preset.id}
                          onClick={() => handleApplyPreset(preset.id)}
                          className="p-2 bg-[#FAF7F2] hover:bg-[#EDE7DC] border border-[#D6CEBE] rounded-xl text-left transition-all flex items-center gap-2"
                        >
                          <span className="text-base">{preset.icon}</span>
                          <div>
                            <span className="text-xs font-bold text-[#2C241D] block">
                              {preset.name}
                            </span>
                            <span className="text-[9px] text-[#7A6E5F] block truncate">
                              Đổi màu đồng loạt
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Main Robe Color Swatches */}
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#7A6E5F] font-medium block mb-1.5">
                      Màu Áo Chính: <strong className="text-[#2C241D]">{currentOutfit.mainColor.name}</strong> (Mệnh {currentOutfit.mainColor.fiveElements})
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {COLOR_PALETTE.map((color) => {
                        const isSelected = currentOutfit.mainColor.id === color.id;
                        return (
                          <button
                            key={color.id}
                            onClick={() => handleUpdateOutfit({ mainColor: color })}
                            className={`w-7 h-7 rounded-full transition-transform relative border ${
                              isSelected ? 'scale-110 ring-2 ring-[#B83227] ring-offset-2' : 'hover:scale-105'
                            }`}
                            style={{ backgroundColor: color.hex }}
                            title={`${color.name} (Mệnh ${color.fiveElements})`}
                          >
                            {isSelected && (
                              <Check className="w-3.5 h-3.5 text-white absolute inset-0 m-auto drop-shadow-xs" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Inner Robe / Yếm Color Swatches */}
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#7A6E5F] font-medium block mb-1.5">
                      Màu Lót Trong / Yếm: <strong className="text-[#2C241D]">{currentOutfit.innerColor.name}</strong> (Mệnh {currentOutfit.innerColor.fiveElements})
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {COLOR_PALETTE.map((color) => {
                        const isSelected = currentOutfit.innerColor.id === color.id;
                        return (
                          <button
                            key={color.id}
                            onClick={() => handleUpdateOutfit({ innerColor: color })}
                            className={`w-7 h-7 rounded-full transition-transform relative border ${
                              isSelected ? 'scale-110 ring-2 ring-[#1B3B6F] ring-offset-2' : 'hover:scale-105'
                            }`}
                            style={{ backgroundColor: color.hex }}
                            title={`${color.name} (Mệnh ${color.fiveElements})`}
                          >
                            {isSelected && (
                              <Check className="w-3.5 h-3.5 text-white absolute inset-0 m-auto drop-shadow-xs" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Harmony Advice Box */}
                  <div
                    className={`p-2.5 rounded-xl border text-[11px] flex items-start gap-2 ${
                      colorHarmony.isTuongSinh
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                        : colorHarmony.isTuongKhac
                        ? 'bg-red-50 border-red-200 text-red-900'
                        : 'bg-[#FAF7F2] border-[#EDE7DC] text-[#5C5346]'
                    }`}
                  >
                    <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span>{colorHarmony.advice}</span>
                  </div>
                </div>

                {/* ACCESSORIES, LAYERS & BOTTOMS (EVERYDAY CLEAN CATALOG) */}
                <div className="p-4 bg-white rounded-2xl border border-[#D6CEBE] shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-[#EDE7DC] pb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#7A6E5F] flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5 text-[#B83227]" />
                      Phụ Kiện, Trang Phục Dưới & Remix Hiện Đại
                    </span>
                    <span className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full font-medium border border-emerald-200">
                      ✓ Đã làm sạch chuẩn mực
                    </span>
                  </div>

                  {/* Bottom selection (Clean items only, male cannot wear skirts) */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] uppercase tracking-wider text-[#7A6E5F] font-medium block">
                        {currentOutfit.gender === 'male'
                          ? 'Trang Phục Dưới (Quần Nam Chuẩn Mực):'
                          : 'Trang Phục Dưới (Quần / Váy Chuẩn Mực):'}
                      </span>
                      {currentOutfit.gender === 'male' && (
                        <span className="text-[10px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full font-medium border border-amber-200">
                          Nam mặc quần suông, không mặc váy
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {ACCESSORIES.filter((a) => {
                        if (a.type !== 'bottom' || a.isExoticOrMisaligned) return false;
                        if (currentOutfit.gender === 'male') {
                          // Khi chọn nhân vật nam thì không thể cho mặc các loại váy
                          return !a.id.includes('vay') && !a.name.toLowerCase().includes('váy');
                        }
                        return true;
                      }).map((item) => {
                        const isSelected = currentOutfit.selectedBottom === item.id;
                        return (
                          <button
                            key={item.id}
                            onClick={() => handleUpdateOutfit({ selectedBottom: item.id })}
                            className={`p-2 rounded-xl border text-left text-xs transition-colors flex items-center justify-between cursor-pointer ${
                              isSelected
                                ? 'bg-[#1B3B6F]/5 border-[#1B3B6F] font-semibold text-[#1B3B6F]'
                                : 'bg-[#FAF7F2] border-[#EDE7DC] text-[#2C241D] hover:border-[#D6CEBE]'
                            }`}
                          >
                            <span className="truncate">{item.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Headwear selection (Clean items only) */}
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#7A6E5F] font-medium block mb-1.5">
                      Phụ Kiện Đầu (Khăn / Bờm / Nón Chuẩn Mực):
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {ACCESSORIES.filter((a) => a.type === 'headwear' && !a.isExoticOrMisaligned).map((item) => {
                        const isSelected = currentOutfit.selectedHeadwear === item.id;
                        return (
                          <button
                            key={item.id}
                            onClick={() => {
                              handleUpdateOutfit({ selectedHeadwear: item.id });
                              if (item.id === 'kep_cang_cua') {
                                setTimeout(() => {
                                  const el = document.getElementById('accessory-kep-cang-cua');
                                  if (el) el.style.display = 'block';
                                }, 0);
                              }
                            }}
                            className={`p-2 rounded-xl border text-left text-xs transition-colors flex items-center justify-between cursor-pointer ${
                              isSelected
                                ? 'bg-[#1B3B6F]/5 border-[#1B3B6F] font-semibold text-[#1B3B6F]'
                                : 'bg-[#FAF7F2] border-[#EDE7DC] text-[#2C241D] hover:border-[#D6CEBE]'
                            }`}
                          >
                            <span className="truncate">{item.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Footwear & Handheld */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-[#7A6E5F] font-medium block mb-1.5">
                        Giày Dép Phối Kèm:
                      </span>
                      <select
                        value={currentOutfit.selectedShoes}
                        onChange={(e) => handleUpdateOutfit({ selectedShoes: e.target.value })}
                        className="w-full text-xs bg-[#FAF7F2] px-3 py-2 rounded-xl border border-[#EDE7DC] text-[#2C241D] focus:outline-hidden focus:border-[#1B3B6F] cursor-pointer"
                      >
                        {ACCESSORIES.filter((a) => a.type === 'shoes').map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-[#7A6E5F] font-medium block mb-1.5">
                        Đồ Cầm Tay:
                      </span>
                      <select
                        value={currentOutfit.selectedHandheld}
                        onChange={(e) => handleUpdateOutfit({ selectedHandheld: e.target.value })}
                        className="w-full text-xs bg-[#FAF7F2] px-3 py-2 rounded-xl border border-[#EDE7DC] text-[#2C241D] focus:outline-hidden focus:border-[#1B3B6F] cursor-pointer"
                      >
                        <option value="none">Không dùng phụ kiện tay</option>
                        {ACCESSORIES.filter((a) => a.type === 'handheld').map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Outerwear Layer (Blazer oversize) */}
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#7A6E5F] font-medium block mb-1.5">
                      Lớp Khoác Ngoài:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleUpdateOutfit({ selectedOuterwear: 'none' })}
                        className={`px-3 py-1.5 text-xs rounded-xl border transition-colors cursor-pointer ${
                          currentOutfit.selectedOuterwear === 'none'
                            ? 'bg-[#1B3B6F] text-white border-[#1B3B6F]'
                            : 'bg-[#FAF7F2] text-[#2C241D] border-[#EDE7DC]'
                        }`}
                      >
                        Để Buông Nguyên Bản
                      </button>

                      <button
                        onClick={() => handleUpdateOutfit({ selectedOuterwear: 'blazer_oversize' })}
                        className={`px-3 py-1.5 text-xs rounded-xl border transition-colors cursor-pointer ${
                          currentOutfit.selectedOuterwear === 'blazer_oversize'
                            ? 'bg-[#1B3B6F] text-white border-[#1B3B6F]'
                            : 'bg-[#FAF7F2] text-[#2C241D] border-[#EDE7DC]'
                        }`}
                      >
                        Blazer Oversize (Remix Menswear)
                      </button>
                    </div>
                  </div>
                </div>

                {/* 4. GÓC THỬ THÁCH DI SẢN (HERITAGE TABOO CHALLENGE / SANDBOX) */}
                <HeritageSandbox
                  currentOutfit={currentOutfit}
                  violations={violations}
                  onTriggerChallenge={handleTriggerChallenge}
                  onRestoreCompliant={handleRestoreCompliant}
                  onViewDeepContext={(challenge) => {
                    setSelectedChallenge(challenge);
                    setIsChallengeModalOpen(true);
                  }}
                />

                {/* 5. NÚT XUẤT THẺ LOOKBOOK 9:16 & MỞ PERSONAL LOOKBOOK HUB */}
                <div className="p-4 bg-gradient-to-r from-[#FFFDF9] to-[#F3EDE0] rounded-2xl border-2 border-[#D4AF37]/60 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div>
                    <h4 className="text-sm font-serif font-bold text-[#2C241D]">
                      Hoàn Tất Bản Phối Của Bạn?
                    </h4>
                    <p className="text-xs text-[#5C5346]">
                      Xuất thẻ Story 9:16 chất lượng cao kèm hình nhân vật mặc cổ phục hoặc lưu vào Tủ đồ cá nhân.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
                    <button
                      onClick={() => {
                        setLookbookInitialTab('current');
                        setIsLookbookOpen(true);
                      }}
                      className="flex-1 sm:flex-initial px-4 py-2.5 bg-[#B83227] hover:bg-[#99261c] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>📸 Xuất Thẻ Lookbook 9:16</span>
                    </button>
                    <button
                      onClick={() => {
                        setLookbookInitialTab('saved');
                        setIsLookbookOpen(true);
                      }}
                      className="px-3.5 py-2.5 bg-[#1B3B6F] hover:bg-[#152e57] text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Tủ Đồ ({savedLookbook.length})</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )}

        {/* TAB 3: KHO TÀNG DI SẢN */}
        {activeTab === 'heritage' && (
          <HeritageRepository
            onSelectGarmentForStudio={(garmentId) => {
              handleUpdateOutfit({ garmentId });
              setActiveTab('studio');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* TAB 4: QUY CHUẨN CỔ PHỤC */}
        {activeTab === 'rules' && (
          <HeritageRulesGuide
            onGoToStudio={() => {
              setActiveTab('studio');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* FOOTER - ĐƠN VỊ PHÁT TRIỂN UEH & DỰ ÁN DỰ THI AI ARENA 2026 */}
      <footer className="border-t border-[#D4AF37]/40 bg-[#F4EFE6] py-8 px-4 lg:px-8 mt-12 text-xs text-[#5C5346] relative overflow-hidden">
        {/* Subtle Gold Royal Top Line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />

        <div className="max-w-7xl mx-auto space-y-6">
          {/* Top Row: Brand & Quick Navigation + Feedback Call-to-Action */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 pb-5 border-b border-[#D4AF37]/25">
            <div className="flex items-center gap-2.5">
              <span className="font-serif font-black text-[#B83227] text-lg tracking-wide">
                HỌA SẮC VIỆT
              </span>
              <span className="text-[#D4AF37]">✦</span>
              <span className="font-semibold text-[#2C241D]">
                Nét Cổ Truyền, Dáng Thời Nay
              </span>
            </div>

            <div className="flex items-center gap-3 text-[11.5px] font-medium flex-wrap justify-center">
              <button
                onClick={() => {
                  setActiveTab('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-[#B83227] transition-colors cursor-pointer"
              >
                Trang Chủ
              </button>
              <span className="text-[#D4AF37]">·</span>
              <button
                onClick={() => {
                  setActiveTab('studio');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-[#B83227] transition-colors cursor-pointer"
              >
                Studio Phối Đồ
              </button>
              <span className="text-[#D4AF37]">·</span>
              <button
                onClick={() => {
                  setActiveTab('heritage');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-[#B83227] transition-colors cursor-pointer"
              >
                Kho Tàng Di Sản
              </button>
              <span className="text-[#D4AF37]">·</span>
              <button
                onClick={() => {
                  setActiveTab('rules');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-[#B83227] transition-colors cursor-pointer"
              >
                Quy Chuẩn Cổ Phục
              </button>
            </div>

            {/* Call-to-Action Button: Góp Ý & Phản Hồi Về Di Sản */}
            <button
              onClick={() => setIsFeedbackModalOpen(true)}
              className="px-4 py-2 rounded-2xl bg-white/80 hover:bg-white backdrop-blur-md border border-[#D4AF37] text-[#B83227] hover:text-[#99261c] font-bold text-xs shadow-sm hover:shadow-[0_0_15px_rgba(212,175,55,0.45)] transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#B83227]" />
              <span>💬 Góp Ý & Phản Hồi Về Di Sản</span>
            </button>
          </div>

          {/* Bottom Row: Development Unit & AI Arena 2026 Competition Info */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left text-xs">
            <div className="space-y-1">
              <div className="text-[#2C241D]">
                🏛️ <strong className="font-bold">Đơn vị phát triển:</strong>{' '}
                <span className="font-medium">
                  Nhóm sinh viên Đại học Kinh tế TP.HCM (UEH)
                </span>
              </div>
              <div className="text-[#2C241D]">
                🏆 <strong className="font-bold">Dự án dự thi:</strong>{' '}
                <span className="font-medium">
                  Vòng Audition — Cuộc thi AI Arena Viet Nam 2026 (Đại học Quốc gia Hà Nội – Trường ĐH Công nghệ tổ chức)
                </span>
              </div>
            </div>

            <div className="text-[11px] text-[#7A6E5F] md:text-right">
              <div>Nền tảng Định hình & Lan tỏa Cổ phục Việt Đương đại</div>
              <div className="text-[10.5px] text-[#8A5A19] font-semibold mt-0.5">
                © 2026 Họa Sắc Việt · Giữ trọn chuẩn mực – Tự hào vươn xa
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* EMERALD TOAST NOTIFICATION FOR IN-APP FEEDBACK */}
      {feedbackToast && (
        <div className="fixed top-20 right-4 sm:right-6 z-50 max-w-md w-[92%] sm:w-auto p-4 rounded-2xl bg-emerald-800 text-white shadow-xl border border-emerald-500 flex items-center justify-between gap-3 animate-in slide-in-from-top-4 fade-in duration-200">
          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium leading-snug">
            <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />
            <span>{feedbackToast}</span>
          </div>
          <button
            onClick={() => setFeedbackToast(null)}
            className="p-1 text-emerald-200 hover:text-white rounded-lg transition-colors cursor-pointer shrink-0"
            title="Đóng thông báo"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* IN-APP FEEDBACK MODAL */}
      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
        onSuccessSubmit={handleFeedbackSuccess}
      />

      {/* QUICK GUIDE 30S MODAL */}
      <QuickGuideModal
        isOpen={isQuickGuideOpen}
        onClose={() => setIsQuickGuideOpen(false)}
        onStartStudio={() => {
          setActiveTab('studio');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onStartGuidedTour={() => {
          setActiveTab('studio');
          setTourStep(1);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* INTERACTIVE 4-STEP GUIDED TOUR SPOTLIGHT */}
      {activeTab === 'studio' && (
        <StudioGuidedTour
          tourStep={tourStep}
          onNext={handleNextTourStep}
          onPrev={handlePrevTourStep}
          onSkip={handleSkipTour}
        />
      )}

      {/* MOBILE FLOATING MINI-AVATAR (FOR SCROLLED VIEWPORTS) */}
      <div className="lg:hidden fixed bottom-5 right-4 z-40 animate-in slide-in-from-bottom-4 duration-300">
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex items-center gap-2.5 p-2 pr-3.5 rounded-2xl shadow-xl border backdrop-blur-md transition-all active:scale-95 cursor-pointer ${
            violations.length > 0
              ? 'bg-red-50/95 border-[#B83227] ring-2 ring-[#B83227]/40 animate-pulse'
              : 'bg-white/95 border-[#D6CEBE]'
          }`}
          title="Bấm để cuộn xem nhân vật"
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-xs shadow-inner relative border border-black/10"
            style={{ backgroundColor: currentOutfit.mainColor.hex }}
          >
            {currentOutfit.gender === 'male' ? '👨' : '👩'}
            {violations.length > 0 && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#B83227] border-2 border-white rounded-full animate-ping" />
            )}
          </div>
          <div className="text-left">
            <span className="text-[10px] uppercase font-bold text-[#7A6E5F] block leading-normal">
              {violations.length > 0 ? '⚠️ Lệch Chuẩn' : 'Mô Hình 2D'}
            </span>
            <span className="text-xs font-serif font-bold text-[#2C241D] block leading-normal truncate max-w-[110px]">
              {GARMENTS[currentOutfit.garmentId]?.name}
            </span>
          </div>
        </button>
      </div>

      {/* LOOKBOOK 9:16 MODAL & PERSONAL LOOKBOOK HUB */}
      <LookbookModal
        isOpen={isLookbookOpen}
        onClose={() => setIsLookbookOpen(false)}
        outfit={currentOutfit}
        savedOutfits={savedLookbook}
        onSaveCurrentOutfit={handleSaveLookbook}
        onLoadSavedOutfit={handleLoadSavedOutfit}
        onDeleteSavedOutfit={handleDeleteSavedLookbook}
        onToggleFavoriteOutfit={handleToggleFavoriteOutfit}
        currentUser={currentUser}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        initialTab={lookbookInitialTab}
      />

      {/* MOCK AUTHENTICATION MODAL (GUEST -> MEMBER) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* A/B SPLIT VIEW COMPARE MODAL */}
      <CompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        currentOutfit={currentOutfit}
        onApplyPreset={(updates) => handleUpdateOutfit(updates)}
      />

      {/* HERITAGE TABOO CHALLENGE EDUCATIONAL MODAL */}
      <HeritageChallengeModal
        isOpen={isChallengeModalOpen}
        onClose={() => setIsChallengeModalOpen(false)}
        challenge={selectedChallenge}
        onRestoreCompliant={handleRestoreCompliant}
      />
    </div>
  );
}
