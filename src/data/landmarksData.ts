import { LandmarkScenery, LightingMood, LandmarkId, LightingMoodId, OccasionId } from '../types/costume';

export const LANDMARKS: LandmarkScenery[] = [
  {
    id: 'van_mieu',
    name: 'Văn Miếu - Quốc Tử Giám',
    region: 'Hà Nội (Bắc Bộ)',
    tag: 'Gác Khuê Văn Các',
    icon: '🏛️',
    shortDesc: 'Kiến trúc Khuê Văn Các thanh tao, mái ngói rêu phong, bia tiến sĩ nghìn năm văn hiến.',
    recommendedGarments: ['ao_chen', 'ao_dai_truyen_thong', 'ao_giao_linh'],
    defaultLighting: 'sang_som',
  },
  {
    id: 'hoang_thanh_hue',
    name: 'Hoàng Thành Huế',
    region: 'Cố Đô (Miền Trung)',
    tag: 'Ngọ Môn Cung Đình',
    icon: '👑',
    shortDesc: 'Cổng Ngọ Môn uy nghiêm, lầu Ngũ Phụng sơn son thếp vàng, ngói lưu ly hoàng gia soi bóng hồ Thái Dịch.',
    recommendedGarments: ['ao_tac', 'ao_chen', 'ao_dai_truyen_thong'],
    defaultLighting: 'nang_am',
  },
  {
    id: 'pho_co_hoi_an',
    name: 'Phố Cổ Hội An',
    region: 'Xứ Quảng Nam',
    tag: 'Phố Đèn Lồng & Hoa Giấy',
    icon: '🏮',
    shortDesc: 'Tường vàng rêu phong đặc trưng, giàn hoa giấy rủ bóng kiêu kỳ, đèn lồng ngũ sắc lung linh phố Hội.',
    recommendedGarments: ['ao_tu_than', 'ao_dai_cach_tan', 'ao_chen'],
    defaultLighting: 'dem_hoa_dang',
  },
  {
    id: 'cafe_indochine',
    name: 'Cafe Indochine Hiện Đại',
    region: 'Đô Thị Tân Thời',
    tag: 'Giao Thoa Đông Dương',
    icon: '☕',
    shortDesc: 'Nền gạch bông cổ điển, cửa vòm gỗ thanh lịch, nội thất retro kết hợp cây nhiệt đới phong cách Gen Z.',
    recommendedGarments: ['ao_dai_cach_tan', 'ao_chen', 'ao_giao_linh'],
    defaultLighting: 'chieu_thu',
  },
  {
    id: 'studio_neutral',
    name: 'Giấy Dó Mộc Cung Đình',
    region: 'Studio Truyền Thống',
    tag: 'Họa Vân Nguyên Bản',
    icon: '📜',
    shortDesc: 'Nền giấy dó truyền thống tối giản, họa tiết mây lành thời Lê - Nguyễn tôn trọn phom dáng trang phục.',
    recommendedGarments: ['ao_chen', 'ao_tac', 'ao_tu_than', 'ao_giao_linh', 'ao_dai_truyen_thong', 'ao_dai_cach_tan'],
    defaultLighting: 'nang_am',
  },
];

export const LIGHTING_MOODS: LightingMood[] = [
  {
    id: 'nang_am',
    name: 'Nắng Ấm Du Xuân',
    icon: '☀️',
    timeTag: '4:30 Chiều · Golden Hour',
    shortDesc: 'Ánh nắng vàng hổ phách ấm áp ngoài trời, tôn vinh độ bóng mịn của gấm lụa tơ tằm.',
    weatherKey: 'nang_am',
  },
  {
    id: 'chieu_thu',
    name: 'Chiều Thu Se Lạnh',
    icon: '🍂',
    timeTag: '5:15 Chiều · Cool Breeze',
    shortDesc: 'Ánh sáng lam lạnh dịu mắt, tăng độ tương phản thanh nhã của sắc Xanh Chàm Đại Việt.',
    weatherKey: 'thu_ha_noi',
  },
  {
    id: 'dem_hoa_dang',
    name: 'Đêm Hội Hoa Đăng',
    icon: '🏮',
    timeTag: '7:45 Tối · Twilight Indigo',
    shortDesc: 'Nền trời chạng vạng lam thẫm, tỏa luồng sáng ấm áp từ đèn lồng vàng cam lung linh.',
    weatherKey: 'se_lanh',
  },
  {
    id: 'sang_som',
    name: 'Sáng Sớm Tinh Mơ',
    icon: '🌸',
    timeTag: '6:30 Sáng · Morning Mist',
    shortDesc: 'Lớp sương mai ửng hồng phấn và trắng ngà dịu mát, ánh sáng trong trẻo ngày mới.',
    weatherKey: 'mua_chuyen_mua',
  },
];

/**
 * Smart Context Binding between Occasions, Landmarks, and Lighting Moods
 */
export function getSmartContext(occasionId: OccasionId): {
  landmarkId: LandmarkId;
  lightingId: LightingMoodId;
  title: string;
  tip: string;
} {
  switch (occasionId) {
    case 'tet_dam_ngo':
      return {
        landmarkId: 'hoang_thanh_hue',
        lightingId: 'nang_am',
        title: 'Hoàng Thành Huế · Nắng Ấm Du Xuân',
        tip: 'Khung cảnh cố đô uy nghiêm kết hợp nắng vàng hoàng gia tôn vinh nét trang trọng bậc nhất cho Lễ Tết.',
      };
    case 'tot_nghiep':
      return {
        landmarkId: 'van_mieu',
        lightingId: 'sang_som',
        title: 'Văn Miếu - Quốc Tử Giám · Sáng Sớm Tinh Mơ',
        tip: 'Không gian gác Khuê Văn Các buổi sớm trong trẻo, mang lại khí chất hiếu học và trí tuệ cho lễ tốt nghiệp.',
      };
    case 'dao_pho':
      return {
        landmarkId: 'pho_co_hoi_an',
        lightingId: 'nang_am',
        title: 'Phố Cổ Hội An · Nắng Vàng Check-in',
        tip: 'Tường vàng hoa giấy rực rỡ và đèn lồng phố Hội là bối cảnh hoàn hảo cho bức ảnh dạo phố của Gen Z.',
      };
    case 'trinh_dien':
      return {
        landmarkId: 'cafe_indochine',
        lightingId: 'chieu_thu',
        title: 'Cafe Indochine · Chiều Thu Nghệ Thuật',
        tip: 'Không gian giao thoa Đông Dương và đô thị tân thời mang lại chiều sâu nghệ thuật cho lookbook sáng tạo.',
      };
    default:
      return {
        landmarkId: 'van_mieu',
        lightingId: 'nang_am',
        title: 'Văn Miếu · Nắng Ấm',
        tip: 'Bối cảnh văn hóa Việt hài hòa.',
      };
  }
}

export function getLightingByWeather(weatherKey: string): LightingMoodId {
  switch (weatherKey) {
    case 'nang_am':
      return 'nang_am';
    case 'se_lanh':
      return 'dem_hoa_dang';
    case 'thu_ha_noi':
      return 'chieu_thu';
    case 'mua_chuyen_mua':
      return 'sang_som';
    default:
      return 'nang_am';
  }
}

export function getWeatherByLighting(lightingId: LightingMoodId): string {
  const found = LIGHTING_MOODS.find((m) => m.id === lightingId);
  return found ? found.weatherKey : 'nang_am';
}
