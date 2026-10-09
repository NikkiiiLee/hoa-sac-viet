import {
  AccessoryItem,
  ColorItem,
  CulturalEra,
  GarmentId,
  GarmentInfo,
  Occasion,
  OutfitConfig,
  RuleViolation,
} from '../types/costume';

export const CULTURAL_ERAS: CulturalEra[] = [
  {
    id: 'nguyen',
    name: 'Triều Nguyễn',
    period: 'Thế kỷ 19 - 20',
    tagline: 'Quy chuẩn lễ nhạc & trang phục phong kiến đỉnh cao',
    description: 'Thời kỳ định hình áo Ngũ thân tay chẽn và tay thụng (Áo tấc) với ngũ thường nghiêm cẩn.',
  },
  {
    id: 'bac_bo',
    name: 'Dân Gian Bắc Bộ',
    period: 'Thế kỷ 17 - 19',
    tagline: 'Vẻ đẹp mộc mạc, phóng khoáng của cư dân lúa nước',
    description: 'Nổi bật với Áo tứ thân buông vạt, yếm thắm, nón quai thao và dải lụa ruột tượng.',
  },
  {
    id: 'dai_viet',
    name: 'Đại Việt',
    period: 'Thời Lý - Trần - Lê',
    tagline: 'Khí chất hào sảng, phóng khoáng và thượng võ',
    description: 'Áo Giao Lĩnh cổ chéo chữ V kết hợp đại đái lụa và chân váy xếp nếp thanh thoát.',
  },
  {
    id: 'tan_thoi',
    name: 'Đô Thị Tân Thời',
    period: '1930s - Nay',
    tagline: 'Giao thoa mỹ cảm Đông Dương và đời sống hiện đại',
    description: 'Sự ra đời của Áo dài Lemur, Lê Phổ và làn sóng áo dài cách tân trẻ trung của Gen Z.',
  },
];

export const OCCASIONS: Occasion[] = [
  {
    id: 'tot_nghiep',
    name: 'Dự Lễ Tốt Nghiệp / Kỷ Yếu',
    iconName: 'GraduationCap',
    description: 'Trang trọng, ý nghĩa, tôn vinh cột mốc thanh xuân với áo chẽn hoặc áo dài.',
    recommendedFormality: 'cao',
  },
  {
    id: 'dao_pho',
    name: 'Dạo Phố Check-in Cafe',
    iconName: 'Coffee',
    description: 'Trẻ trung, thoải mái, phối cùng sneaker, túi tote canvas và phụ kiện tối giản.',
    recommendedFormality: 'linh_hoat',
  },
  {
    id: 'tet_dam_ngo',
    name: 'Lễ Tết / Dạm Ngõ & Cưới Hỏi',
    iconName: 'Sparkles',
    description: 'Nghiêm trang, phúc lộc, ưu tiên sắc đỏ chu sa, vàng hoàng yến và áo tấc/ngũ thân.',
    recommendedFormality: 'cao',
  },
  {
    id: 'trinh_dien',
    name: 'Trình Diễn / Lookbook Nghệ Thuật',
    iconName: 'Camera',
    description: 'Đầy tính sáng tạo, bay bổng với giao lĩnh hoặc tứ thân nhiều tầng lớp.',
    recommendedFormality: 'trung_binh',
  },
];

export const GARMENTS: Record<GarmentId, GarmentInfo> = {
  ao_chen: {
    id: 'ao_chen',
    name: 'Áo Ngũ Thân Tay Chẽn',
    era: 'nguyen',
    eraName: 'Triều Nguyễn (TK 19 - 20)',
    category: 'ThuongPhuc',
    silhouetteDescription: 'Thường phục năng động, cổ đứng lập lĩnh 2-3cm, tay bó chẽn gọn gàng từ khuỷu tay đến cổ tay, 5 thân áo vạt phải đè vạt trái.',
    keyFeatures: [
      'Cổ đứng (Lập lĩnh) 2 - 3.5cm',
      '5 thân tượng trưng tứ thân phụ mẫu + chính bản thân',
      '5 hạt khuy tượng trưng Ngũ Thường',
      'Tay ôm gọn tiện di chuyển',
    ],
    lapelType: 'huu_nham',
    sleeveType: 'chen',
    allowedLapelDirections: ['huu_nham', 'ta_nham'],
    defaultLapel: 'huu_nham',
    canRollSleeves: true,
    canWearStandalone: true,
    culturalPhilosophy: {
      title: 'Triết Lý Ngũ Thường & Đạo Làm Người',
      summary: '5 cúc áo đại diện cho Nhân - Lễ - Nghĩa - Trí - Tín của Nho gia.',
      detail: 'Áo ngũ thân chẽn phản ánh đạo lý sống đoan trang, tôn ti trật tự thời Nguyễn. Bốn thân ngoài tượng trưng cho tứ thân phụ mẫu (cha mẹ đẻ và cha mẹ chồng/vợ), thân thứ năm ẩn bên trong tượng trưng cho người mặc được chở che.',
      significance: 'Vạt phải đè lên vạt trái (Hữu nhậm) là quy chuẩn văn hóa người sống (Dương). Cài ngược vạt sang trái là tả nhậm dành cho tang lễ.',
    },
    recommendedPairings: ['Sneaker retro trắng', 'Blazer oversize tối giản', 'Loafer da', 'Túi canvas', 'Quạt xếp'],
  },
  ao_tac: {
    id: 'ao_tac',
    name: 'Áo Ngũ Thân Tay Thụng (Áo Tấc)',
    era: 'nguyen',
    eraName: 'Triều Nguyễn (TK 19 - 20)',
    category: 'LePhuc',
    silhouetteDescription: 'Đại lễ phục trang trọng thời Nguyễn, tay thụng rộng 30-40cm, buông thẳng quá ngón tay, phom dáng bệ vệ tôn nghiêm.',
    keyFeatures: [
      'Tay thụng buông dài quá đầu ngón tay',
      'Cổ lập lĩnh thanh nhã',
      '5 khuy cài hữu nhậm',
      'Cần đi kèm khăn vấn hoặc khăn đóng nghiêm chỉnh',
    ],
    lapelType: 'huu_nham',
    sleeveType: 'thung',
    allowedLapelDirections: ['huu_nham', 'ta_nham'],
    defaultLapel: 'huu_nham',
    canRollSleeves: false,
    canWearStandalone: true,
    culturalPhilosophy: {
      title: 'Lễ Phục Quốc Gia & Sự Trang Nghiêm',
      summary: 'Tay thụng quá ngón biểu hiện người trí thức, quân tử khi hành lễ không vội vã.',
      detail: 'Áo tấc được vua quan và thường dân triều Nguyễn mặc trong các dịp đại lễ: Tế miếu, bái yết, hôn lễ, thi cử. Độ dài tay buông thụng nhắc nhở cử chỉ trang nghiêm, khi chào chắp tay chữ V thanh nhã.',
      significance: 'Tuyệt đối KHÔNG được xắn tay áo tấc khi mặc vì sẽ phá vỡ phom dáng lễ phục và bị coi là thất lễ trong không gian văn hóa truyền thống.',
    },
    recommendedPairings: ['Khăn đóng / Khăn vấn', 'Giày Oxford / Loafer', 'Clutch da vintage', 'Quạt giấy trầm tích', 'Sneaker tối giản'],
  },
  ao_tu_than: {
    id: 'ao_tu_than',
    name: 'Áo Tứ Thân',
    era: 'bac_bo',
    eraName: 'Dân Gian Bắc Bộ (TK 17 - 19)',
    category: 'DanGian',
    silhouetteDescription: 'Trang phục mộc mạc bốn vạt buông lơi hoặc buộc trước bụng, kết hợp yếm đào thắm, dải ruột tượng và váy đụp duyên dáng.',
    keyFeatures: [
      '4 vạt áo buông phóng khoáng không khuy cài',
      'Phối cùng Yếm đào / Yếm thắm bên trong',
      'Dây ruột tượng lụa thắt ngang eo tôn vóc dáng',
      'Váy đụp lụa xòe nhẹ tự nhiên',
    ],
    lapelType: 'lap_linh',
    sleeveType: 'suong',
    allowedLapelDirections: ['huu_nham'],
    defaultLapel: 'huu_nham',
    canRollSleeves: true,
    canWearStandalone: false,
    culturalPhilosophy: {
      title: 'Tứ Thân Phụ Mẫu & Tình Nghĩa Quê Hương',
      summary: 'Hai vạt sau may liền, hai vạt trước buộc lại biểu trưng lòng hiếu nghĩa và tình duyên đằm thắm.',
      detail: 'Áo tứ thân gắn liền với hình ảnh người phụ nữ Kinh Bắc đảm đang, dịu dàng. Bốn vạt tượng trưng cho cha mẹ chàng và cha mẹ nàng. Yếm che ngực thắm đượm kín đáo, dải ruột tượng giữ chặt sợi dây kết nối đôi lứa.',
      significance: 'Yếm là nội y truyền thống, khi ra phố bắt buộc phải có áo tứ thân hoặc áo cánh khoác ngoài, mặc độc yếm nơi công cộng là sai lệch thẩm mỹ văn hóa.',
    },
    recommendedPairings: ['Duster Cardigan hiện đại', 'Chân váy midi xếp ly', 'Culottes lụa', 'Sandal quai mảnh', 'Nón quai thao / Khăn mỏ quạ'],
  },
  ao_giao_linh: {
    id: 'ao_giao_linh',
    name: 'Áo Giao Lĩnh (Trực Lĩnh)',
    era: 'dai_viet',
    eraName: 'Đại Việt (Lý - Trần - Lê)',
    category: 'CungDinh',
    silhouetteDescription: 'Cổ chéo chữ V giao nhau trước ngực, vạt phải đè sườn trái, thắt dải đại đái lụa ngang eo, ống tay rộng thoáng mang phong vị cổ xưa.',
    keyFeatures: [
      'Cổ áo giao nhau hình chữ V thanh thoát',
      'Vạt phải gài sang sườn phải (Hữu nhậm)',
      'Đại đái thắt ngang eo buông lơi hai dải',
      'Chân váy dài xếp nếp rộng rãi',
    ],
    lapelType: 'giao_linh',
    sleeveType: 'thung',
    allowedLapelDirections: ['huu_nham', 'ta_nham'],
    defaultLapel: 'huu_nham',
    canRollSleeves: false,
    canWearStandalone: true,
    culturalPhilosophy: {
      title: 'Âm Dương Giao Hòa & Khí Tiết Đại Việt',
      summary: 'Cổ giao chữ V biểu trưng trời tròn đất vuông, âm dương hòa hợp.',
      detail: 'Thịnh hành từ thời Lý - Trần đến Hậu Lê. Cổ giao lĩnh tạo đường nét khoáng đạt, phong lưu. Tà áo dài kết hợp dải đại đái tạo nên dáng đi uyển chuyển như gió cuốn mây trôi.',
      significance: 'Đại đái phải được thắt tỉ mỉ, vạt phải luôn đè vạt trái. Không dùng đai thắt Obi bản to của Kimono hay trâm cài Mãn Thanh lai tạp.',
    },
    recommendedPairings: ['Áo thun mỏng trơn bên trong', 'Duster coat dáng dài', 'Chân váy xếp ly maxi', 'Loafer da', 'Sneaker bệt'],
  },
  ao_dai_truyen_thong: {
    id: 'ao_dai_truyen_thong',
    name: 'Áo Dài Truyền Thống',
    era: 'tan_thoi',
    eraName: 'Đô Thị Tân Thời (1950s - Nay)',
    category: 'TanThoi',
    silhouetteDescription: 'Biểu tượng quốc phục Việt Nam với cổ cao 3-5cm kín đáo, eo thắt gọn, tà dài buông chạm mắt cá chân trên nền quần lụa ống suông mềm.',
    keyFeatures: [
      'Cổ lập lĩnh cao 2.5 - 4cm ôm cổ thanh tú',
      'Hai tà trước sau buông dài thướt tha',
      'Xẻ hông tinh tế vừa chạm thắt lưng',
      'Quần lụa ống rộng tôn dáng',
    ],
    lapelType: 'huu_nham',
    sleeveType: 'chen',
    allowedLapelDirections: ['huu_nham'],
    defaultLapel: 'huu_nham',
    canRollSleeves: false,
    canWearStandalone: true,
    culturalPhilosophy: {
      title: 'Tôn Nét Đẹp Đoan Trang & Nữ Tính Việt',
      summary: 'Kín đáo mà gợi cảm, thanh tao mà trang nghiêm.',
      detail: 'Áo dài truyền thống kế thừa cấu trúc của áo ngũ thân triều Nguyễn qua các cuộc cách tân thập niên 30-50. Tà áo ôm trọn vẻ đẹp người mặc với sự mực thước, tế nhị.',
      significance: 'Phải mặc cùng quần dài ống suông lụa. Phối cùng quần soóc ngắn, quần rách làm lộ đáy quần là phản cảm văn hóa nghiêm trọng.',
    },
    recommendedPairings: ['Blazer nhẹ khoác vai', 'Túi da quai xách cổ điển', 'Giày cao gót mũi nhọn', 'Guốc mộc sơn mài', 'Khăn lụa'],
  },
  ao_dai_cach_tan: {
    id: 'ao_dai_cach_tan',
    name: 'Áo Dài Cách Tân Gen Z',
    era: 'tan_thoi',
    eraName: 'Đương Đại Remix (Gen Z)',
    category: 'TanThoi',
    silhouetteDescription: 'Phom suông lơi trẻ trung, tà ngắn qua gối 10-15cm, cổ tròn/cổ yếm hiện đại, giải phóng sự gò bó cho các hoạt động thường nhật.',
    keyFeatures: [
      'Tà ngắn lửng năng động, thoải mái di chuyển',
      'Cổ tròn, cổ yếm cách điệu thanh thoát',
      'Phom suông rộng oversized dễ chịu',
      'Linh hoạt kết hợp chân váy hoặc quần âu',
    ],
    lapelType: 'huu_nham',
    sleeveType: 'suong',
    allowedLapelDirections: ['huu_nham'],
    defaultLapel: 'huu_nham',
    canRollSleeves: true,
    canWearStandalone: true,
    culturalPhilosophy: {
      title: 'Di Sản Sống Trong Nhịp Đập Đương Đại',
      summary: 'Đưa cổ phục vào đời thường của người trẻ mà vẫn giữ sự chỉn chu.',
      detail: 'Cách tân không phải là lai căng mà là kế thừa tinh thần tự do, thoải mái. Giúp học sinh, sinh viên diện trang phục mang hồn cốt dân tộc mỗi ngày đi học, đi chơi.',
      significance: 'Tuy cách tân nhưng vẫn cần giữ độ kín đáo ở phần cổ và tà, tránh khoét xẻ hở hang vượt quá thuần phong mỹ tục.',
    },
    recommendedPairings: ['Chân váy dập ly midi', 'Giày Mary Jane da bóng', 'Kẹp càng cua ngọc', 'Túi cói vintage', 'Sneaker retro'],
  },
};

export interface PalettePreset {
  id: string;
  name: string;
  icon: string;
  description: string;
  mainColorId: string;
  innerColorId: string;
  bottomColorId: string;
  recommendedBottom: string;
  recommendedHeadwear: string;
  recommendedShoes: string;
  recommendedOuterwear: string;
}

export const COLOR_PALETTE: ColorItem[] = [
  // HỎA
  {
    id: 'do_chu_sa',
    name: 'Đỏ Chu Sa',
    hex: '#B83227',
    type: 'traditional',
    vietnameseName: 'Chu Sa Huỳnh Huyết',
    fiveElements: 'Hỏa',
    culturalMeaning: 'Màu của sự chính thống, phúc lộc, hỷ sự và xua đuổi điều dữ trong cung đình xưa.',
  },
  {
    id: 'hong_tham',
    name: 'Hồng Thắm Yếm Đào',
    hex: '#D9536F',
    type: 'traditional',
    vietnameseName: 'Hồng Đào Kinh Bắc',
    fiveElements: 'Hỏa',
    culturalMeaning: 'Sắc hồng duyên dáng của chiếc yếm thắm thiếu nữ quan họ.',
  },
  {
    id: 'do_tia_cung_dinh',
    name: 'Tía Cung Đình (Đỏ Đô)',
    hex: '#7A1C28',
    type: 'traditional',
    vietnameseName: 'Tử Cấm Chu Tía',
    fiveElements: 'Hỏa',
    culturalMeaning: 'Sắc đỏ tía quý phái của phẩm phục hoàng gia triều Nguyễn.',
  },

  // THỦY
  {
    id: 'xanh_thien_thanh',
    name: 'Xanh Thiên Thanh',
    hex: '#3B82F6',
    type: 'traditional',
    vietnameseName: 'Thiên Thanh Vũ Quá',
    fiveElements: 'Thủy',
    culturalMeaning: 'Sắc xanh da trời sau cơn mưa, biểu trưng cho trí tuệ sáng ngời, thông tuệ và tương lai rộng mở.',
  },
  {
    id: 'xanh_cham',
    name: 'Xanh Chàm Đại Việt',
    hex: '#1B3B6F',
    type: 'traditional',
    vietnameseName: 'Đại Việt Lam Chàm',
    fiveElements: 'Thủy',
    culturalMeaning: 'Sắc chàm nhuộm từ lá chàm tự nhiên, biểu trưng sự trầm tĩnh, trí tuệ và bền bỉ.',
  },
  {
    id: 'den_huyen',
    name: 'Đen Thâm Mực Nho',
    hex: '#1E1E22',
    type: 'traditional',
    vietnameseName: 'Huyền Thiết Tĩnh Mịch',
    fiveElements: 'Thủy',
    culturalMeaning: 'Sắc đen nghiêm cẩn của áo tấc lễ quan và váy đụp lụa thâm Bắc Bộ.',
  },

  // MỘC
  {
    id: 'xanh_luc_bao',
    name: 'Xanh Lục Bảo',
    hex: '#1A6B48',
    type: 'traditional',
    vietnameseName: 'Lục Bảo Hoàng Triều',
    fiveElements: 'Mộc',
    culturalMeaning: 'Sắc ngọc bích của mầm xanh non tơ và sự sinh sôi nảy nở trường cửu.',
  },
  {
    id: 'xanh_thien_ly',
    name: 'Xanh Thiên Lý',
    hex: '#5E8B74',
    type: 'traditional',
    vietnameseName: 'Thiên Lý Phong Sương',
    fiveElements: 'Mộc',
    culturalMeaning: 'Sắc xanh dịu mát tựa đóa thiên lý thanh nhã mùa hè.',
  },
  {
    id: 'xanh_reu',
    name: 'Xanh Rêu Cổ Mộc',
    hex: '#4A5B44',
    type: 'traditional',
    vietnameseName: 'Thành Cổ Rêu Phong',
    fiveElements: 'Mộc',
    culturalMeaning: 'Gợi nhớ màu rêu phong trên mái ngói đình làng cổ Việt Nam.',
  },

  // THỔ
  {
    id: 'vang_hoang_yen',
    name: 'Vàng Hoàng Yến',
    hex: '#D4AF37',
    type: 'traditional',
    vietnameseName: 'Hoàng Yến Quý Phái',
    fiveElements: 'Thổ',
    culturalMeaning: 'Màu của trung tâm vũ trụ, tôn quý, sung túc và trí tuệ khai sáng.',
  },
  {
    id: 'nau_dat_nung',
    name: 'Nâu Đất Nung (Nâu Non)',
    hex: '#8D5B4C',
    type: 'traditional',
    vietnameseName: 'Cổ Đất Phù Sa',
    fiveElements: 'Thổ',
    culturalMeaning: 'Màu mộc mạc của áo tơi nón lá, phù sa sông Hồng và đất gốm Bát Tràng.',
  },
  {
    id: 'vang_nghe',
    name: 'Vàng Nghệ Cố Đô',
    hex: '#E59B2E',
    type: 'traditional',
    vietnameseName: 'Khương Hoàng Tươi Tắn',
    fiveElements: 'Thổ',
    culturalMeaning: 'Sắc vàng nghệ nhuộm thủ công rực rỡ nắng ấm phương Nam.',
  },
  {
    id: 'cam_dat_terracotta',
    name: 'Cam Đất Terracotta (Remix)',
    hex: '#B95D41',
    type: 'remix',
    vietnameseName: 'Gạch Nung Đô Thị',
    fiveElements: 'Thổ',
    culturalMeaning: 'Tone màu ấm áp, thời thượng kết nối phong cách hiện đại và nét mộc.',
  },

  // KIM
  {
    id: 'bach_ngoc',
    name: 'Trắng Ngà / Bạch Tuyết',
    hex: '#F7F4EE',
    type: 'traditional',
    vietnameseName: 'Bạch Ngọc Lụa Tơ',
    fiveElements: 'Kim',
    culturalMeaning: 'Sắc thanh khiết của tơ tằm nguyên bản chưa nhuộm và ngọc trắng cao quý.',
  },
  {
    id: 'anh_bac',
    name: 'Ánh Bạc Tơ Sa',
    hex: '#D8DEE4',
    type: 'traditional',
    vietnameseName: 'Ngân Sa Băng Khiết',
    fiveElements: 'Kim',
    culturalMeaning: 'Màu chỉ bạc thêu kim tuyến lấp lánh trên vạt áo hoàng tộc xưa.',
  },
  {
    id: 'xam_khoi',
    name: 'Xám Khói Trầm (Remix)',
    hex: '#6B7280',
    type: 'remix',
    vietnameseName: 'Khói Sương Lam Chiều',
    fiveElements: 'Kim',
    culturalMeaning: 'Sắc trung tính hiện đại, mang hơi thở trầm mặc của phố cổ Hà Nội.',
  },
  {
    id: 'sage_remix',
    name: 'Xanh Sage Đương Đại',
    hex: '#8FA89B',
    type: 'remix',
    vietnameseName: 'Trà Xanh Dịu Mát',
    fiveElements: 'Mộc',
    culturalMeaning: 'Gam màu pastel xu hướng Gen Z, dịu mắt, mang lại vẻ thanh lịch nhẹ nhàng.',
  },
  {
    id: 'beige_remix',
    name: 'Beige Mộc Sợi Đay',
    hex: '#DECBB6',
    type: 'remix',
    vietnameseName: 'Vải Đũi Mộc Mạc',
    fiveElements: 'Thổ',
    culturalMeaning: 'Tone màu ấm áp phong cách Minimalist dung hợp cùng hồn Việt.',
  },
];

export const PALETTE_PRESETS: PalettePreset[] = [
  {
    id: 'hoang_gia_hue',
    name: 'Hoàng Gia Huế',
    icon: '👑',
    description: 'Vàng Hoàng Yến + Đỏ Đô + Trắng Tuyết: Khí chất cung đình quý phái triều Nguyễn.',
    mainColorId: 'vang_hoang_yen',
    innerColorId: 'do_tia_cung_dinh',
    bottomColorId: 'bach_ngoc',
    recommendedBottom: 'quan_lua_ong_suong',
    recommendedHeadwear: 'khan_dong',
    recommendedShoes: 'hai_theu_cung_dinh',
    recommendedOuterwear: 'none',
  },
  {
    id: 'hoi_lim_kinh_bac',
    name: 'Hội Lim Kinh Bắc',
    icon: '🌸',
    description: 'Nâu Non + Đen Thâm + Yếm Đào Hồng + Dải lụa xanh: Vẻ đẹp đằm thắm dân gian Kinh Bắc.',
    mainColorId: 'nau_dat_nung',
    innerColorId: 'hong_tham',
    bottomColorId: 'den_huyen',
    recommendedBottom: 'vay_dup_tham',
    recommendedHeadwear: 'non_quai_thao',
    recommendedShoes: 'sandal_quai_manh',
    recommendedOuterwear: 'none',
  },
  {
    id: 'pastel_do_thi',
    name: 'Pastel Đô Thị',
    icon: '🏙️',
    description: 'Xanh Sage + Beige Mộc + Cam Đất: Thanh lịch tối giản phong cách Gen Z dạo phố.',
    mainColorId: 'sage_remix',
    innerColorId: 'cam_dat_terracotta',
    bottomColorId: 'beige_remix',
    recommendedBottom: 'chan_vay_midi_xep_ly',
    recommendedHeadwear: 'kep_cang_cua',
    recommendedShoes: 'sneaker_retro',
    recommendedOuterwear: 'blazer_oversize',
  },
];

export const ACCESSORIES: AccessoryItem[] = [
  // Headwear & Face
  {
    id: 'khan_dong',
    name: 'Khăn Đóng / Khăn Vấn Đen',
    type: 'headwear',
    origin: 'Nguyen',
    description: 'Nếp vấn chữ Nhất hoặc chữ Nhân trang nghiêm, đỉnh cao lễ nghi triều Nguyễn.',
    recommendedGarments: ['ao_chen', 'ao_tac'],
  },
  {
    id: 'bom_nhung',
    name: 'Bờm Nhung Đỏ / Đen Quý Phái',
    type: 'headwear',
    origin: 'Modern',
    description: 'Bờm cài tóc bọc nhung tôn nét kiêu kỳ, hòa hợp cùng áo dài cách tân.',
    recommendedGarments: ['ao_dai_cach_tan', 'ao_chen'],
  },
  {
    id: 'non_quai_thao',
    name: 'Nón Quai Thao (Nón Ba Tầm)',
    type: 'headwear',
    origin: 'BacBo',
    description: 'Nón tròn phẳng đường kính lớn, quai thao dệt tơ tằm buông tua dài thướt tha.',
    recommendedGarments: ['ao_tu_than'],
  },
  {
    id: 'khan_mo_qua',
    name: 'Khăn Mỏ Quạ Đen',
    type: 'headwear',
    origin: 'BacBo',
    description: 'Khăn vuông vấn tròn trùm đầu tạo mũi nhọn ngay giữa trán duyên dáng.',
    recommendedGarments: ['ao_tu_than'],
  },
  {
    id: 'non_la_hue',
    name: 'Nón Lá Bài Thơ Xứ Huế',
    type: 'headwear',
    origin: 'Nguyen',
    description: 'Nón lá chóp nhọn đan mỏng soi bóng bài thơ và cảnh vật cố đô.',
    recommendedGarments: ['ao_dai_truyen_thong', 'ao_chen'],
  },
  {
    id: 'kep_cang_cua',
    name: 'Kẹp Càng Cua Ngọc Trai (Remix)',
    type: 'headwear',
    origin: 'Modern',
    description: 'Phụ kiện tóc Gen Z tạo nét bồng bềnh tự nhiên, hợp phong cách cafe.',
    recommendedGarments: ['ao_dai_cach_tan', 'ao_chen'],
  },
  {
    id: 'tram_cai_thanh_trieu',
    name: 'Trâm Cài Tóc Thanh Triều (Sai lệch)',
    type: 'headwear',
    origin: 'Foreign',
    description: 'Trâm hoa mẫu đơn bản lớn phong cách phi tần thời Mãn Thanh (Trung Quốc).',
    recommendedGarments: [],
    isExoticOrMisaligned: true,
  },

  // Bottoms
  {
    id: 'quan_lua_ong_suong',
    name: 'Quần Lụa Trắng Ống Suông',
    type: 'bottom',
    origin: 'Nguyen',
    description: 'Quần lụa mềm mại truyền thống tôn độ rủ của tà áo.',
    recommendedGarments: ['ao_chen', 'ao_tac', 'ao_dai_truyen_thong'],
  },
  {
    id: 'vay_dup_tham',
    name: 'Váy Đụp Thâm Lụa',
    type: 'bottom',
    origin: 'BacBo',
    description: 'Váy đen xòe rộng phủ chân mộc mạc dân tộc đồng bằng Bắc Bộ.',
    recommendedGarments: ['ao_tu_than'],
  },
  {
    id: 'chan_vay_midi_xep_ly',
    name: 'Chân Váy Midi Xếp Ly (Remix)',
    type: 'bottom',
    origin: 'Modern',
    description: 'Chân váy dập ly dáng chữ A buông rủ dài qua bắp chân thanh thoát.',
    recommendedGarments: ['ao_dai_cach_tan', 'ao_giao_linh', 'ao_tu_than'],
  },
  {
    id: 'culottes_linen',
    name: 'Quần Culottes Linen Ống Rộng',
    type: 'bottom',
    origin: 'Modern',
    description: 'Quần lửng ống rộng chất vải đũi/linen tự nhiên thoáng mát.',
    recommendedGarments: ['ao_dai_cach_tan', 'ao_chen'],
  },
  {
    id: 'quan_short_rach',
    name: 'Quần Short Bò Rách Siêu Ngắn (Sai lệch)',
    type: 'bottom',
    origin: 'Foreign',
    description: 'Quần short ngắn cộc để lộ đáy phản cảm dưới tà áo dài truyền thống.',
    recommendedGarments: [],
    isExoticOrMisaligned: true,
  },

  // Outerwear / Layers
  {
    id: 'yem_dao_trong',
    name: 'Yếm Đào Lụa Tơ Thắm',
    type: 'outerwear',
    origin: 'BacBo',
    description: 'Mảnh yếm hình quả trám thêu hoa sen che ngực duyên thầm.',
    recommendedGarments: ['ao_tu_than'],
  },
  {
    id: 'blazer_oversize',
    name: 'Blazer Oversize Tối Giản',
    type: 'outerwear',
    origin: 'Modern',
    description: 'Khoác nhẹ vai tạo phong thái giao thoa menswear hiện đại và cổ điển.',
    recommendedGarments: ['ao_chen', 'ao_dai_truyen_thong', 'ao_dai_cach_tan'],
  },
  {
    id: 'dai_that_obi',
    name: 'Đai Lưng Obi Kimono (Sai lệch)',
    type: 'outerwear',
    origin: 'Foreign',
    description: 'Bản đai thắt to cứng gài sau lưng đặc trưng của trang phục Nhật Bản.',
    recommendedGarments: [],
    isExoticOrMisaligned: true,
  },

  // Shoes
  {
    id: 'hai_theu_cung_dinh',
    name: 'Hài Thêu Cung Đình Triều Nguyễn',
    type: 'shoes',
    origin: 'Nguyen',
    description: 'Đôi hài nhung thêu chỉ vàng phượng múa rồng bay uyển chuyển cung đình.',
    recommendedGarments: ['ao_tac', 'ao_chen', 'ao_dai_truyen_thong'],
  },
  {
    id: 'sneaker_retro',
    name: 'Sneaker Retro (Samba / Stan Smith)',
    type: 'shoes',
    origin: 'Modern',
    description: 'Giày thể thao da đế bệt tối giản tạo độ tương phản năng động cho Gen Z.',
    recommendedGarments: ['ao_chen', 'ao_dai_cach_tan', 'ao_giao_linh'],
  },
  {
    id: 'loafer_da',
    name: 'Giày Loafer Da Cổ Điển',
    type: 'shoes',
    origin: 'Modern',
    description: 'Giày lười da nâu bóng chỉn chu, tôn phom dáng lịch lãm.',
    recommendedGarments: ['ao_chen', 'ao_tac', 'ao_dai_truyen_thong'],
  },
  {
    id: 'mary_jane',
    name: 'Giày Mary Jane Quai Ngang',
    type: 'shoes',
    origin: 'Modern',
    description: 'Giày nữ quai ngang vintage dễ thương hợp cùng áo dài cách tân.',
    recommendedGarments: ['ao_dai_cach_tan'],
  },
  {
    id: 'sandal_quai_manh',
    name: 'Sandal Quai Mảnh Tối Giản',
    type: 'shoes',
    origin: 'Modern',
    description: 'Đôi sandal thanh mảnh gót thấp tạo dáng đi nhẹ tênh.',
    recommendedGarments: ['ao_tu_than', 'ao_dai_cach_tan'],
  },
  {
    id: 'guoc_moc_son_mai',
    name: 'Guốc Mộc Sơn Mài',
    type: 'shoes',
    origin: 'Nguyen',
    description: 'Guốc gỗ gõ nhịp lách cách mộc mạc đặc trưng phong vị xưa.',
    recommendedGarments: ['ao_dai_truyen_thong', 'ao_chen', 'ao_tac'],
  },

  // Handheld
  {
    id: 'quat_xep_giay_do',
    name: 'Quạt Xếp Giấy Dó Trầm Hương',
    type: 'handheld',
    origin: 'Nguyen',
    description: 'Chiếc quạt nan tre nan lụa trang nhã phong lưu cử chỉ.',
    recommendedGarments: ['ao_chen', 'ao_tac', 'ao_giao_linh'],
  },
  {
    id: 'tui_tote_canvas',
    name: 'Túi Tote Canvas In Họa Tiết Cổ',
    type: 'handheld',
    origin: 'Modern',
    description: 'Túi vải tiện dụng cho học sinh, sinh viên mang sách vở, máy tính.',
    recommendedGarments: ['ao_chen', 'ao_dai_cach_tan'],
  },
  {
    id: 'clutch_vintage',
    name: 'Clutch Da Cầm Tay Vintage',
    type: 'handheld',
    origin: 'Modern',
    description: 'Túi cầm tay da bò sang trọng cho các sự kiện trang trọng.',
    recommendedGarments: ['ao_tac', 'ao_dai_truyen_thong'],
  },
];

/**
 * CORE HERITAGE SCANNER ENGINE
 * Detects cultural violations specified in Prompt:
 * - Cài ngược vạt (Tả nhậm) -> Tang phục
 * - Phối nhầm vùng miền -> Áo tấc Huế + Nón quai thao Bắc Bộ
 * - Trang phục đáy phản cảm -> Áo dài/ngũ thân + Quần short rách
 * - Hở yếm -> Mặc độc yếm không áo khoác ngoài
 * - Xắn tay áo tấc -> Mất tính trang nghiêm của đại lễ phục
 * - Phụ kiện lai căng -> Trâm Thanh Triều hoặc đai Obi
 */
export function checkHeritageRules(outfit: OutfitConfig): RuleViolation[] {
  const violations: RuleViolation[] = [];
  const garment = GARMENTS[outfit.garmentId];

  // 1. TẢ NHẬM: Cài ngược vạt trái đè vạt phải
  if (outfit.lapelDirection === 'ta_nham') {
    violations.push({
      id: 'ta_nham_grave',
      severity: 'critical',
      title: 'Cài Ngược Vạt (Tả Nhậm) – Sai Quy Cách Tang Phục',
      description: 'Bạn đang cài vạt trái đè lên vạt phải. Trong quy chế cổ phục Việt Nam và Á Đông, "Tả nhậm" là quy chuẩn chỉ dùng cho tang phục (khâm liệm người đã khuất).',
      historicalContext: 'Cổ nhân quan niệm người sống theo đạo Dương khí phải mặc "Hữu nhậm" (Vạt phải đè lên vạt trái). Tả nhậm biểu thị Âm trạch/người đã khuất.',
      solution: 'Chuyển ngay nút gài sang "Hữu nhậm" (vạt phải đè vạt trái) để đúng chuẩn mực người sống.',
    });
  }

  // 2. PHỐI NHẦM VÙNG MIỀN: Áo Tấc Huế + Nón Quai Thao Bắc Bộ
  if (
    (outfit.garmentId === 'ao_tac' || outfit.garmentId === 'ao_chen') &&
    outfit.selectedHeadwear === 'non_quai_thao'
  ) {
    violations.push({
      id: 'cross_region_mismatch',
      severity: 'warning',
      title: 'Phối Nhầm Vùng Miền: Lễ Phục Triều Nguyễn Với Nón Bắc Bộ',
      description: 'Áo Tấc / Áo Chẽn là quy chế trang phục hoàng triều Huế (miền Trung / Nam), trong khi Nón Quai Thao là biểu trưng dân gian Kinh Bắc (miền Bắc).',
      historicalContext: 'Sự lai ghép này làm đứt gãy tính nguyên bản của không gian văn hóa địa phương.',
      solution: 'Hãy đổi phụ kiện đầu sang "Khăn Đóng / Khăn Vấn Đen" hoặc "Bờm Nhung" để tạo sự đồng nhất.',
    });
  }

  // 3. TRANG PHỤC ĐÁY PHẢN CẢM: Áo Dài / Ngũ Thân + Quần short rách
  if (
    (outfit.garmentId === 'ao_dai_truyen_thong' ||
      outfit.garmentId === 'ao_chen' ||
      outfit.garmentId === 'ao_tac' ||
      outfit.garmentId === 'ao_giao_linh' ||
      outfit.garmentId === 'ao_dai_cach_tan') &&
    outfit.selectedBottom === 'quan_short_rach'
  ) {
    violations.push({
      id: 'indecent_bottom_hazard',
      severity: 'critical',
      title: 'Trang Phục Đáy Phản Cảm Dưới Tà Áo Dài / Ngũ Thân',
      description: 'Phối áo dài hoặc áo ngũ thân với quần short rách để lộ khoảng hở đùi/đáy quần qua đường xẻ tà là sự phản cảm văn hóa nghiêm trọng bị dư luận lên án.',
      historicalContext: 'Đường xẻ tà của cổ phục Việt được tính toán để hé lộ lớp vải quần lụa mềm mại bên trong, tạo dáng đi thanh lịch kín đáo.',
      solution: 'Thay bằng "Quần Lụa Trắng Ống Suông" hoặc "Chân Váy Xếp Ly Dài" để giữ sự thanh tao.',
    });
  }

  // 4. HỞ YẾM: Mặc độc yếm không có áo lót/khoác ngoài ra phố
  if (outfit.isSoloYem || outfit.selectedOuterwear === 'none_bare') {
    violations.push({
      id: 'bare_yem_exposure',
      severity: 'critical',
      title: 'Hở Yếm: Mặc Độc Nhất Chiếc Yếm Trần Lưng Ra Phố',
      description: 'Yếm đào là trang phục lót (nội y) truyền thống của phụ nữ Việt. Mặc độc yếm hở trọn lưng và cánh tay ra nơi công cộng mà không có áo cánh/tứ thân khoác ngoài là hành vi lệch chuẩn văn hóa nghiêm trọng.',
      historicalContext: 'Phụ nữ xưa dù ở chốn thôn quê làm đồng cũng luôn có áo cánh mỏng khoác ngoài hoặc cài vạt kín đáo. Yếm chỉ được phô diễn nét duyên thầm qua cổ áo tứ thân mở hé.',
      solution: 'Khoác thêm áo Tứ Thân, Áo Chẽn hoặc Blazer oversize bên ngoài để giữ trọn sự ý nhị, đoan trang.',
    });
  }

  // 5. XẮN TAY ÁO TẤC: Phá hỏng phom dáng đại lễ phục
  if (outfit.garmentId === 'ao_tac' && outfit.isSleeveRolled) {
    violations.push({
      id: 'rolled_sleeves_ao_tac',
      severity: 'warning',
      title: 'Xắn Tay Áo Tấc – Phá Vỡ Tính Trang Nghiêm Của Lễ Phục',
      description: 'Áo Tấc là Đại lễ phục, đặc trưng cốt lõi là tay thụng buông dài 30-40cm quá ngón tay biểu trưng cho người quân tử/trí thức ung dung khi bái lễ.',
      historicalContext: 'Xắn tay áo thụng làm mất đi phom dáng trang trọng của cổ phục triều đình. Nếu cần vận động năng động, tiền nhân đã chế tác riêng "Áo Chẽn".',
      solution: 'Thả buông tay thụng tự nhiên, hoặc chuyển sang dùng "Áo Ngũ Thân Tay Chẽn" nếu bạn cần sự linh hoạt.',
    });
  }

  // 6. PHỤ KIỆN LAI CĂNG: Trâm Thanh Triều hoặc Đai thắt Obi
  if (outfit.selectedHeadwear === 'tram_cai_thanh_trieu') {
    violations.push({
      id: 'exotic_manchu_hairpin',
      severity: 'critical',
      title: 'Phụ Kiện Lai Căng: Trâm Hoa Phi Tần Thanh Triều',
      description: 'Gắn trâm hoa mẫu đơn bản lớn phong cách phim ảnh cung đấu Mãn Thanh (Trung Quốc) lên cổ phục Việt Nam gây ngộ nhận văn hóa nghiêm trọng.',
      historicalContext: 'Phụ nữ Việt thời xưa vấn khăn trần, đội nón ba tầm, dùng trâm cài ngọc/bạc thanh nhã hình phượng hoặc mầm lá tối giản.',
      solution: 'Đổi sang khăn vấn lụa truyền thống hoặc bờm nhung tối giản hiện đại.',
    });
  }

  if (outfit.selectedOuterwear === 'dai_that_obi') {
    violations.push({
      id: 'exotic_obi_belt',
      severity: 'critical',
      title: 'Phụ Kiện Lai Căng: Đai Thắt Lưng Obi Kimono',
      description: 'Đai Obi bản cứng là chi tiết độc quyền của Kimono Nhật Bản. Giao lĩnh Đại Việt dùng dải "Đại đái" bằng lụa mềm mại buộc thắt rủ hai vạt.',
      historicalContext: 'Việc nhầm lẫn các yếu tố trang phục Đông Á làm mờ nhạt bản sắc độc lập của văn hóa phục sức Đại Việt.',
      solution: 'Dùng dải đại đái lụa mềm hoặc để buông tự nhiên theo phom dáng nguyên bản.',
    });
  }

  return violations;
}

export interface HeritageSandboxChallenge {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  historicalContext: string;
  whyForbidden: string;
  solution: string;
  applyUpdates: (current: OutfitConfig) => Partial<OutfitConfig>;
}

export const HERITAGE_SANDBOX_CHALLENGES: HeritageSandboxChallenge[] = [
  {
    id: 'ta_nham',
    badge: 'Đại Kỵ Tang Phục',
    title: 'Thử Cài Vạt Tả Nhận (Trái đè Phải - Đồ Tang)',
    subtitle: 'Nút gài ngược vạt từ trái sang sườn phải',
    historicalContext: 'Trong triết lý Ngũ Hành và Lễ Nhạc Đại Việt, cõi người sống chuộng khí Dương, y phục bắt buộc phải theo quy cách "Hữu nhậm" (vạt phải đè vạt trái).',
    whyForbidden: '"Tả nhậm" (vạt trái đè vạt phải) từ ngàn đời là quy cách cổ phục chỉ dành riêng cho người đã khuất trong nghi thức khâm liệm tang ma thuộc cõi Âm. Mặc tả nhậm khi còn sống là điều đại kỵ phong thủy và xúc phạm lễ giáo.',
    solution: 'Chuyển về "Hữu nhậm" (vạt phải đè vạt trái) chuẩn mực 100% của người sống.',
    applyUpdates: () => ({
      lapelDirection: 'ta_nham',
    }),
  },
  {
    id: 'quan_short_rach',
    badge: 'Phản Cảm Thẩm Mỹ',
    title: 'Thử Mặc Với Quần Short Bò Rách Gấu Lộ Đùi',
    subtitle: 'Quần short ngắn cộc hở đùi dưới tà áo xẻ cao',
    historicalContext: 'Cổ phục Việt Nam (Áo dài, Áo ngũ thân) có cấu trúc xẻ tà cao đến tận cạp quần để cử động sải bước thoải mái.',
    whyForbidden: 'Khoảng hở hai bên eo sinh ra để tôn lớp vải lụa mềm mại của quần dài ống suông. Khi diện quần short ngắn bò rách, phần đùi và đáy quần bị lộ ra phản cảm, phá vỡ sự kín đáo thanh lịch của cổ phục.',
    solution: 'Khôi phục "Quần Lụa Trắng Ống Suông" hoặc "Chân Váy Xếp Ly Dài" để vạt áo buông rủ kiêu sa.',
    applyUpdates: () => ({
      selectedBottom: 'quan_short_rach',
    }),
  },
  {
    id: 'tram_cai_thanh_trieu',
    badge: 'Lai Căng Ngoại Lai',
    title: 'Thử Cài Trâm Hoa & Móng Vuốt Thanh Triều',
    subtitle: 'Trâm hoa mẫu đơn bản lớn phong cách phim cung đấu Mãn Thanh',
    historicalContext: 'Văn hóa phục sức Việt Nam có hệ mỹ cảm độc lập, coi trọng vẻ đẹp mộc mạc, đoan trang, thuần khiết.',
    whyForbidden: 'Mũ cánh dơi Đại Lạp Dực, trâm hoa mẫu đơn to sặc sỡ và móng vuốt kim loại là phục sức thời Mãn Thanh (Trung Quốc). Đem những yếu tố này gắn lên cổ phục Việt Nam gây ngộ nhận văn hóa nghiêm trọng cho giới trẻ.',
    solution: 'Thay bằng "Khăn Đóng / Khăn Vấn Lụa" hoàng triều hoặc "Bờm Nhung" hiện đại tối giản.',
    applyUpdates: () => ({
      selectedHeadwear: 'tram_cai_thanh_trieu',
    }),
  },
  {
    id: 'dai_that_obi',
    badge: 'Lai Ghép Sai Lệch',
    title: 'Thử Thắt Đai Bản To Kiểu Obi Kimono',
    subtitle: 'Đai thắt lưng bản cứng gài sau lưng kiểu Nhật Bản',
    historicalContext: 'Áo Giao Lĩnh Đại Việt thời Lý - Trần - Lê sử dụng dải "Đại đái" bằng lụa mềm mại buộc thắt rủ hai vạt thanh tao trước ngực.',
    whyForbidden: 'Đai Obi bản to dày là chi tiết văn hóa đặc hữu của Kimono Nhật Bản. Việc lai ghép đai cứng Obi lên áo giao lĩnh làm biến dạng trang phục Đại Việt thành một sản phẩm lai căng, đánh mất bản sắc dân tộc.',
    solution: 'Tháo bỏ đai cứng, để vạt áo buông rủ hoặc dùng dải lụa thắt đại đái mềm mại.',
    applyUpdates: () => ({
      selectedOuterwear: 'dai_that_obi',
    }),
  },
  {
    id: 'yem_tran_lung',
    badge: 'Lệch Chuẩn Thuần Phong',
    title: 'Thử Bỏ Hết Áo Ngoài, Mặc Độc Nhất Chiếc Yếm Trần Lưng Ra Phố',
    subtitle: 'Bỏ hết áo ngoài, để lộ trần lưng và vai',
    historicalContext: 'Yếm đào là trang phục lót (nội y) truyền thống của phụ nữ Việt Nam, gìn giữ nét kín đáo ý nhị.',
    whyForbidden: 'Người phụ nữ xưa dù làm lụng vất vả nơi đồng nội cũng luôn khoác áo cánh mỏng bên ngoài. Mặc trần độc nhất chiếc yếm hở lưng ra phố là hành vi hiểu sai di sản, biến nét duyên thầm thành sự hở hang không phù hợp thuần phong mỹ tục.',
    solution: 'Khoác lại lớp áo Tứ Thân, Áo Ngũ Thân hoặc Blazer oversize để giữ vẻ đẹp thanh nhã.',
    applyUpdates: () => ({
      isSoloYem: true,
      selectedOuterwear: 'none_bare',
    }),
  },
  {
    id: 'xan_tay_ao_tac',
    badge: 'Phá Vỡ Phom Đại Lễ',
    title: 'Thử Xắn Ống Tay Áo Tấc Lễ Phục Lên Cẳng Tay',
    subtitle: 'Gấp cuộn tay thụng 40cm của lễ phục hoàng triều',
    historicalContext: 'Áo Tấc là Đại lễ phục triều Nguyễn, biểu tượng cho uy nghi quốc gia, học thức và phẩm hạnh của người mặc.',
    whyForbidden: 'Đặc trưng cốt lõi của Áo Tấc là tay thụng buông dài 30-40cm qua ngón tay, khi lễ bái hai tay chắp trang nghiêm trong lòng áo. Việc xắn cộc tay thụng làm mất đi phom dáng trang trọng. Nếu cần năng động di chuyển, tổ tiên đã chế tác riêng "Áo Ngũ Thân Tay Chẽn".',
    solution: 'Thả buông tay thụng tự nhiên, hoặc chuyển sang diện "Áo Chẽn" để vận động linh hoạt.',
    applyUpdates: () => ({
      garmentId: 'ao_tac',
      isSleeveRolled: true,
    }),
  },
];

/**
 * CALCULATE COLOR HARMONY SCORE (Feature #3 & #8)
 * Checks contrast, Five Elements cycle (Ngũ Hành Tương Sinh & Tương Khắc),
 * and returns harmony index & tips.
 */
export function calculateColorHarmony(
  mainColor: ColorItem,
  innerColor: ColorItem,
  bottomColor: ColorItem
): {
  score: number;
  label: string;
  scheme: string;
  advice: string;
  fiveElementsRelation: string;
  isTuongSinh: boolean;
  isTuongKhac: boolean;
} {
  // Five elements interaction lookup
  // Tương sinh: Mộc sinh Hỏa, Hỏa sinh Thổ, Thổ sinh Kim, Kim sinh Thủy, Thủy sinh Mộc
  const sinhMap: Record<string, string> = {
    Mộc: 'Hỏa',
    Hỏa: 'Thổ',
    Thổ: 'Kim',
    Kim: 'Thủy',
    Thủy: 'Mộc',
  };

  // Tương khắc: Thủy khắc Hỏa, Hỏa khắc Kim, Kim khắc Mộc, Mộc khắc Thổ, Thổ khắc Thủy
  const khacMap: Record<string, string> = {
    Thủy: 'Hỏa',
    Hỏa: 'Kim',
    Kim: 'Mộc',
    Mộc: 'Thổ',
    Thổ: 'Thủy',
  };

  const isSinh = sinhMap[mainColor.fiveElements] === innerColor.fiveElements || sinhMap[innerColor.fiveElements] === mainColor.fiveElements;
  const isKhac = khacMap[mainColor.fiveElements] === innerColor.fiveElements || khacMap[innerColor.fiveElements] === mainColor.fiveElements;
  const isSameElement = mainColor.fiveElements === innerColor.fiveElements;

  let baseScore = 85;
  let scheme = 'Tương Đồng Nhã Nhặn';
  let advice = 'Sự chuyển dịch sắc độ dịu mắt, mang hơi thở tĩnh tại của tranh thủy mặc Việt.';
  let relation = `${mainColor.fiveElements} (${mainColor.name}) hòa quyện cùng ${innerColor.fiveElements} (${innerColor.name})`;
  let isTuongSinh = false;
  let isTuongKhac = false;

  if (isSinh) {
    baseScore = 98;
    isTuongSinh = true;
    scheme = `Ngũ Hành Tương Sinh (${mainColor.fiveElements} - ${innerColor.fiveElements})`;
    advice = `"${mainColor.fiveElements} sinh ${innerColor.fiveElements} – Sinh khí & Rạng rỡ trường tồn." Hai gam màu bổ trợ năng lượng tích cực theo dịch lý phong thủy.`;
    relation = `${mainColor.fiveElements} sinh ${innerColor.fiveElements} – Đại Cát Di Sản`;
  } else if (isKhac) {
    baseScore = 52;
    isTuongKhac = true;
    scheme = `Ngũ Hành Tương Khắc (${mainColor.fiveElements} khắc ${innerColor.fiveElements})`;
    advice = `"${mainColor.fiveElements} và ${innerColor.fiveElements} tương khắc – Nên chèn thêm màu trung gian (Mộc/Xanh pastel) hoặc hạ tone đất để cân bằng thị giác."`;
    relation = `${mainColor.fiveElements} khắc ${innerColor.fiveElements} – Cần Cân Bằng`;
  } else if (isSameElement) {
    baseScore = 91;
    scheme = 'Đồng Khí Tương Hòa (Monochrome)';
    advice = 'Phối màu đơn sắc tạo vẻ ngoài tinh khôi, sang trọng và thanh nhã cho người mặc.';
    relation = `Lưỡng ${mainColor.fiveElements} – Đồng điệu bền vững`;
  } else if (
    (mainColor.id === 'do_chu_sa' && innerColor.id === 'vang_hoang_yen') ||
    (mainColor.id === 'xanh_cham' && innerColor.id === 'bach_ngoc')
  ) {
    baseScore = 98;
    isTuongSinh = true;
    scheme = 'Cặp Màu Hoàng Gia Cung Đình';
    advice = 'Phối màu kinh điển triều Nguyễn: Sắc chính trầm lắng kết hợp màu lót rực rỡ hé lộ nơi cổ áo và cổ tay.';
    relation = 'Quy chuẩn lễ nhạc cung đình truyền thống';
  }

  // Adjust slightly based on bottom color
  if (bottomColor.id === 'quan_short_rach') {
    baseScore = 28;
    scheme = 'Xung Khắc Thẩm Mỹ Cực Hạn';
    advice = 'Quần short rách phá hủy hoàn toàn sự thanh tao của phục sức truyền thống.';
  }

  return {
    score: baseScore,
    label: baseScore >= 95 ? 'Tuyệt Phẩm Hài Hòa' : baseScore >= 80 ? 'Nhã Nhặn & Cân Bằng' : 'Cần Tinh Chỉnh',
    scheme,
    advice,
    fiveElementsRelation: relation,
    isTuongSinh,
    isTuongKhac,
  };
}
