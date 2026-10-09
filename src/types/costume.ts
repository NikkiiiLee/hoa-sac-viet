export type EraId = 'nguyen' | 'bac_bo' | 'dai_viet' | 'tan_thoi';

export interface CulturalEra {
  id: EraId;
  name: string;
  period: string;
  tagline: string;
  description: string;
}

export type OccasionId = 'tot_nghiep' | 'dao_pho' | 'tet_dam_ngo' | 'trinh_dien';

export interface Occasion {
  id: OccasionId;
  name: string;
  iconName: string;
  description: string;
  recommendedFormality: 'cao' | 'trung_binh' | 'linh_hoat';
}

export type GarmentId =
  | 'ao_chen'
  | 'ao_tac'
  | 'ao_tu_than'
  | 'ao_giao_linh'
  | 'ao_dai_truyen_thong'
  | 'ao_dai_cach_tan';

export interface GarmentInfo {
  id: GarmentId;
  name: string;
  era: EraId;
  eraName: string;
  category: 'ThuongPhuc' | 'LePhuc' | 'DanGian' | 'CungDinh' | 'TanThoi';
  silhouetteDescription: string;
  keyFeatures: string[];
  lapelType: 'huu_nham' | 'giao_linh' | 'lap_linh';
  sleeveType: 'chen' | 'thung' | 'suong';
  allowedLapelDirections: ('huu_nham' | 'ta_nham')[];
  defaultLapel: 'huu_nham';
  canRollSleeves: boolean;
  canWearStandalone: boolean;
  culturalPhilosophy: {
    title: string;
    summary: string;
    detail: string;
    significance: string;
  };
  recommendedPairings: string[];
}

export interface ColorItem {
  id: string;
  name: string;
  hex: string;
  type: 'traditional' | 'remix';
  vietnameseName: string;
  fiveElements: 'Kim' | 'Mộc' | 'Thủy' | 'Hỏa' | 'Thổ';
  culturalMeaning: string;
}

export interface AccessoryItem {
  id: string;
  name: string;
  type: 'headwear' | 'shoes' | 'handheld' | 'bottom' | 'outerwear';
  origin: 'Nguyen' | 'BacBo' | 'DaiViet' | 'Modern' | 'Foreign';
  description: string;
  recommendedGarments: GarmentId[];
  isExoticOrMisaligned?: boolean;
}

export type LandmarkId =
  | 'van_mieu'
  | 'hoang_thanh_hue'
  | 'pho_co_hoi_an'
  | 'cafe_indochine'
  | 'studio_neutral';

export interface LandmarkScenery {
  id: LandmarkId;
  name: string;
  region: string;
  tag: string;
  icon: string;
  shortDesc: string;
  recommendedGarments: GarmentId[];
  defaultLighting: LightingMoodId;
}

export type LightingMoodId =
  | 'nang_am'
  | 'chieu_thu'
  | 'dem_hoa_dang'
  | 'sang_som';

export interface LightingMood {
  id: LightingMoodId;
  name: string;
  icon: string;
  timeTag: string;
  shortDesc: string;
  weatherKey: string;
}

export interface OutfitConfig {
  id: string;
  title: string;
  gender: 'male' | 'female';
  garmentId: GarmentId;
  mainColor: ColorItem;
  innerColor: ColorItem;
  bottomColor: ColorItem;
  lapelDirection: 'huu_nham' | 'ta_nham';
  isSleeveRolled: boolean;
  isSoloYem?: boolean;
  selectedBottom: string;
  selectedHeadwear: string;
  selectedGlasses?: string;
  selectedShoes: string;
  selectedHandheld: string;
  selectedOuterwear: string;
  backdropId?: LandmarkId;
  lightingId?: LightingMoodId;
  avatarType: 'male' | 'female' | 'stylist';
  customFacePhotoUrl?: string;
  heightCm?: number;
  weightKg?: number;
  isFavorite?: boolean;
  occasionId: OccasionId;
  createdAt: number;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  role: 'guest' | 'member';
}

export interface RuleViolation {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  historicalContext: string;
  solution: string;
}
