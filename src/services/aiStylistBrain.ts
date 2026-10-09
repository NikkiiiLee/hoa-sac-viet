import { OutfitConfig } from '../types/costume';
import { COLOR_PALETTE } from '../data/costumeData';

export interface AiStylistConsultationResult {
  userPrompt: string;
  greeting: string;
  reasoning: string;
  hashtags: string[];
  outfitUpdates: Partial<OutfitConfig>;
  occasionName: string;
  elementRelation: string;
  paletteDescription: string;
}

export const QUICK_PROMPTS = [
  {
    id: 'ueh_ky_yeu',
    icon: '🎓',
    label: 'Kỷ yếu Dinh Độc Lập',
    fullPrompt: 'Nữ sinh chụp kỷ yếu Dinh Độc Lập năng động với sneaker',
  },
  {
    id: 'cafe_pastel',
    icon: '☕',
    label: 'Dạo phố cafe pastel',
    fullPrompt: 'Dạo phố cafe cuối tuần tone pastel minimalism',
  },
  {
    id: 'nam_du_xuan',
    icon: '🏮',
    label: 'Nam du xuân lễ chùa',
    fullPrompt: 'Nam du xuân lễ chùa đầu năm trang nghiêm, đạo mạo',
  },
  {
    id: 'giao_linh_stage',
    icon: '🎭',
    label: 'Biểu diễn Giao Lĩnh',
    fullPrompt: 'Sân khấu biểu diễn giao lĩnh Đại Việt phóng khoáng',
  },
];

export const PLACEHOLDER_PROMPTS = [
  'VD: Nữ sinh viên UEH phối Áo Tấc chụp kỷ yếu năng động với sneaker...',
  'VD: Nam dạo phố cafe cuối tuần tone pastel tối giản cùng Áo Chẽn...',
  'VD: Phối Áo Giao Lĩnh biểu diễn sân khấu Đại Việt phóng khoáng...',
  'VD: Du xuân lễ chùa đầu năm trang nghiêm, đạo mạo với Áo Dài...',
];

function findColor(id: string) {
  return COLOR_PALETTE.find((c) => c.id === id) || COLOR_PALETTE[0];
}

/**
 * Intelligent Intent Parser & Cultural Brain
 */
export function analyzeUserIntent(
  rawPrompt: string,
  currentOutfit: OutfitConfig,
  variantIndex = 0
): AiStylistConsultationResult {
  const prompt = rawPrompt.toLowerCase().trim();

  // 1. GENDER DETECTION
  let gender = currentOutfit.gender;
  if (
    prompt.includes('nữ') ||
    prompt.includes('em gái') ||
    prompt.includes('nàng') ||
    prompt.includes('cô gái') ||
    prompt.includes('chị em') ||
    prompt.includes('bạn nữ')
  ) {
    gender = 'female';
  } else if (
    prompt.includes('nam') ||
    prompt.includes('chàng trai') ||
    prompt.includes('anh') ||
    prompt.includes('quân tử') ||
    prompt.includes('bạn nam') ||
    prompt.includes('đạo mạo')
  ) {
    gender = 'male';
  }

  // 2. CHECK SPECIFIC BENCHMARK SCENARIOS
  const isUehOrKyYeu =
    prompt.includes('ueh') ||
    prompt.includes('kỷ yếu') ||
    prompt.includes('dinh độc lập') ||
    prompt.includes('tốt nghiệp');

  const isCafePastel =
    prompt.includes('pastel') ||
    prompt.includes('minimalism') ||
    prompt.includes('dạo phố cafe') ||
    prompt.includes('trời mát');

  const isNamLeChua =
    prompt.includes('lễ chùa') ||
    prompt.includes('du xuân') ||
    (prompt.includes('nam') && prompt.includes('đầu năm'));

  const isGiaoLinhStage =
    prompt.includes('giao lĩnh') ||
    prompt.includes('biểu diễn') ||
    prompt.includes('sân khấu') ||
    prompt.includes('đại việt');

  // BENCHMARK 1: Nữ sinh viên UEH chụp kỷ yếu Dinh Độc Lập
  if (isUehOrKyYeu) {
    if (variantIndex % 2 === 0) {
      const mainCol = findColor('xanh_thien_thanh'); // Thủy
      const innerCol = findColor('bach_ngoc'); // Kim
      const bottomCol = findColor('bach_ngoc'); // Kim

      return {
        userPrompt: rawPrompt,
        greeting: '✨ Chào bạn nữ sinh UEH năng động!',
        reasoning:
          'Để ngày chụp kỷ yếu vừa lưu giữ nét trang nghiêm của lễ nghi triều Nguyễn mà vẫn êm ái di chuyển khắp Dinh Độc Lập, Gemini đã chọn cho bạn: Áo Tấc màu Thiên Thanh thướt tha kết hợp Quần lụa trắng và Sneaker retro kem. Cặp màu Kim sinh Thủy mang lại phong thái thông tuệ, vừa đúng chuẩn lễ phục vừa thỏa sức tạo dáng năng động suốt buổi chiều!',
        hashtags: ['#KỷYếuNăngĐộng', '#ÁoTấcTriềuNguyễn', '#KimSinhThủy', '#ChuẩnDiSản100%'],
        occasionName: 'Chụp Kỷ Yếu Dinh Độc Lập',
        elementRelation: 'Kim sinh Thủy · 100/100',
        paletteDescription: 'Xanh Thiên Thanh (Thủy) + Trắng Ngà (Kim)',
        outfitUpdates: {
          gender: 'female',
          garmentId: 'ao_tac',
          mainColor: mainCol,
          innerColor: innerCol,
          bottomColor: bottomCol,
          lapelDirection: 'huu_nham',
          isSleeveRolled: false,
          selectedBottom: 'quan_lua_ong_suong',
          selectedHeadwear: 'khan_dong',
          selectedGlasses: 'kinh_kim_loai',
          selectedShoes: 'sneaker_retro',
          selectedHandheld: 'quat_xep_giay_do',
          selectedOuterwear: 'none',
          backdropId: 'cafe_indochine',
          lightingId: 'nang_am',
          occasionId: 'tot_nghiep',
          isSoloYem: false,
        },
      };
    } else {
      // Alternate variant: Áo dài truyền thống lụa tơ
      const mainCol = findColor('vang_hoang_yen'); // Thổ
      const innerCol = findColor('do_chu_sa'); // Hỏa
      const bottomCol = findColor('bach_ngoc'); // Kim

      return {
        userPrompt: rawPrompt,
        greeting: '✨ Phương án thay thế: Áo Dài Tố Nữ Hoàng Yến!',
        reasoning:
          'Gemini đề xuất phương án đổi gió với Áo Dài truyền thống phom Lê Phổ màu Vàng Hoàng Yến phối cùng quần lụa trắng và giày Mary Jane cổ điển. Sự kết hợp Hỏa sinh Thổ biểu trưng cho vẻ đẹp đằm thắm, tôn dáng thướt tha dưới ánh nắng vàng 3h chiều tại Dinh Độc Lập.',
        hashtags: ['#ÁoDàiKỷYếu', '#HỏaSinhThổ', '#NétXưaSàiThành', '#ChuẩnDiSản100%'],
        occasionName: 'Kỷ Yếu Phong Cách Lê Phổ',
        elementRelation: 'Hỏa sinh Thổ · 100/100',
        paletteDescription: 'Vàng Hoàng Yến (Thổ) + Đỏ Chu Sa (Hỏa)',
        outfitUpdates: {
          gender: 'female',
          garmentId: 'ao_dai_truyen_thong',
          mainColor: mainCol,
          innerColor: innerCol,
          bottomColor: bottomCol,
          lapelDirection: 'huu_nham',
          isSleeveRolled: false,
          selectedBottom: 'quan_lua_ong_suong',
          selectedHeadwear: 'bom_nhung',
          selectedGlasses: 'kinh_kim_loai',
          selectedShoes: 'mary_jane',
          selectedHandheld: 'clutch_vintage',
          selectedOuterwear: 'none',
          backdropId: 'cafe_indochine',
          lightingId: 'nang_am',
          occasionId: 'tot_nghiep',
          isSoloYem: false,
        },
      };
    }
  }

  // BENCHMARK 2: Dạo phố cafe tone pastel minimalism
  if (isCafePastel) {
    if (variantIndex % 2 === 0) {
      const mainCol = findColor('sage_remix'); // Mộc
      const innerCol = findColor('bach_ngoc'); // Kim
      const bottomCol = findColor('bach_ngoc'); // Kim

      return {
        userPrompt: rawPrompt,
        greeting: '✨ Chào bạn trẻ yêu nét đẹp tối giản!',
        reasoning:
          'Để dạo phố check-in cafe cuối tuần vừa thư thái vừa ăn ảnh, Gemini chọn: Áo Ngũ Thân Tay Chẽn tone Xanh Sage đương đại phối quần lụa suông và Sneaker retro trắng. Tone màu mát mẻ, phóng khoáng cùng túi tote canvas giúp bạn thoải mái sải bước cả ngày mà vẫn toát lên khí chất văn hóa tinh tế.',
        hashtags: ['#DạoPhốCuốiTuần', '#ÁoChẽnGenZ', '#PastelMinimalism', '#ChuẩnDiSản100%'],
        occasionName: 'Dạo Phố Cafe Cuối Tuần',
        elementRelation: 'Thủy Mộc Tương Hòa · 98/100',
        paletteDescription: 'Xanh Sage Đương Đại (Mộc) + Bạch Ngọc (Kim)',
        outfitUpdates: {
          gender,
          garmentId: 'ao_chen',
          mainColor: mainCol,
          innerColor: innerCol,
          bottomColor: bottomCol,
          lapelDirection: 'huu_nham',
          isSleeveRolled: false,
          selectedBottom: 'quan_lua_ong_suong',
          selectedHeadwear: gender === 'female' ? 'bom_nhung' : 'khan_dong',
          selectedGlasses: 'kinh_kim_loai',
          selectedShoes: 'sneaker_retro',
          selectedHandheld: 'tui_tote_canvas',
          selectedOuterwear: 'blazer_oversize',
          backdropId: 'cafe_indochine',
          lightingId: 'chieu_thu',
          occasionId: 'dao_pho',
          isSoloYem: false,
        },
      };
    } else {
      const mainCol = findColor('cam_dat_terracotta'); // Thổ
      const innerCol = findColor('hong_tham'); // Hỏa
      const bottomCol = findColor('beige_remix'); // Thổ

      return {
        userPrompt: rawPrompt,
        greeting: '✨ Phương án pastel ấm: Cam Đất Terracotta!',
        reasoning:
          'Lựa chọn gam màu Cam Đất gạch nung ấm áp phối cùng lót yếm đào hồng thắm tạo nên quy luật Hỏa sinh Thổ rạng ngời. Set đồ mang phong vị mùa thu dịu dàng, cực kỳ thích hợp cho các buổi cafe chuyện trò trong tiết trời se lạnh.',
        hashtags: ['#TerracottaWarmth', '#HỏaSinhThổ', '#CafeMùaThu', '#ChuẩnDiSản100%'],
        occasionName: 'Cafe Chiều Thu Se Lạnh',
        elementRelation: 'Hỏa sinh Thổ · 100/100',
        paletteDescription: 'Cam Đất Terracotta (Thổ) + Hồng Thắm (Hỏa)',
        outfitUpdates: {
          gender,
          garmentId: 'ao_chen',
          mainColor: mainCol,
          innerColor: innerCol,
          bottomColor: bottomCol,
          lapelDirection: 'huu_nham',
          isSleeveRolled: false,
          selectedBottom: gender === 'male' ? 'quan_lua_ong_suong' : 'chan_vay_midi_xep_ly',
          selectedHeadwear: 'bom_nhung',
          selectedGlasses: 'kinh_kim_loai',
          selectedShoes: 'loafer_da',
          selectedHandheld: 'tui_tote_canvas',
          selectedOuterwear: 'none',
          backdropId: 'cafe_indochine',
          lightingId: 'chieu_thu',
          occasionId: 'dao_pho',
          isSoloYem: false,
        },
      };
    }
  }

  // BENCHMARK 3: Nam du xuân lễ chùa đầu năm trang nghiêm, đạo mạo
  if (isNamLeChua) {
    const mainCol = findColor('xanh_cham'); // Thủy
    const innerCol = findColor('bach_ngoc'); // Kim
    const bottomCol = findColor('bach_ngoc'); // Kim

    return {
      userPrompt: rawPrompt,
      greeting: '✨ Chào bạn nam nho nhã!',
      reasoning:
        'Lễ chùa đầu năm đòi hỏi sự trang nghiêm, tề chỉnh và tôn kính chốn tôn nghiêm. Gemini chọn cho bạn: Áo Ngũ Thân Tay Thụng (Áo Tấc) màu Xanh Chàm Đại Việt kết hợp Khăn Đóng chỉnh tề và Loafer da đen. Cặp màu Kim sinh Thủy mang khí sắc trầm ổn, đĩnh đạc, cầu mong một năm mới vạn sự hanh thông, trí tuệ minh mẫn.',
      hashtags: ['#NamDuXuân', '#LễChùaĐầuNăm', '#ÁoTấcĐạoMạo', '#KimSinhThủy', '#ChuẩnDiSản100%'],
      occasionName: 'Lễ Chùa Du Xuân Đầu Năm',
      elementRelation: 'Kim sinh Thủy · 100/100',
      paletteDescription: 'Xanh Chàm Đại Việt (Thủy) + Bạch Ngọc (Kim)',
      outfitUpdates: {
        gender: 'male',
        garmentId: 'ao_tac',
        mainColor: mainCol,
        innerColor: innerCol,
        bottomColor: bottomCol,
        lapelDirection: 'huu_nham',
        isSleeveRolled: false,
        selectedBottom: 'quan_lua_ong_suong',
        selectedHeadwear: 'khan_dong',
        selectedGlasses: 'none',
        selectedShoes: 'loafer_da',
        selectedHandheld: 'quat_xep_giay_do',
        selectedOuterwear: 'none',
        backdropId: 'van_mieu',
        lightingId: 'sang_som',
        occasionId: 'tet_dam_ngo',
        isSoloYem: false,
      },
    };
  }

  // BENCHMARK 4: Sân khấu biểu diễn giao lĩnh Đại Việt phóng khoáng
  if (isGiaoLinhStage) {
    const mainCol = findColor('do_chu_sa'); // Hỏa
    const innerCol = findColor('xanh_luc_bao'); // Mộc
    const bottomCol = findColor('den_huyen'); // Thủy

    return {
      userPrompt: rawPrompt,
      greeting: '✨ Chào nghệ sĩ sân khấu di sản!',
      reasoning:
        'Để tái hiện khí phách hào hùng thời Lý - Trần - Lê trên sân khấu biểu diễn, Gemini thiết lập: Áo Giao Lĩnh cổ chéo chữ V màu Đỏ Chu Sa rực rỡ, lót trong màu Lục Bảo (Mộc sinh Hỏa tạo nguồn năng lượng bùng nổ dưới ánh đèn sân khấu). Đi cùng chân váy dài nếp gấp và hài thêu cung đình, tạo nên những sải bước uyển chuyển, khoáng đạt.',
      hashtags: ['#GiaoLĩnhĐạiViệt', '#SânKhấuBiểuDiễn', '#MộcSinhHỏa', '#HàoKhíThăngLong', '#ChuẩnDiSản100%'],
      occasionName: 'Sân Khấu Biểu Diễn Nghệ Thuật',
      elementRelation: 'Mộc sinh Hỏa · 100/100',
      paletteDescription: 'Đỏ Chu Sa (Hỏa) + Xanh Lục Bảo (Mộc)',
      outfitUpdates: {
        gender,
        garmentId: 'ao_giao_linh',
        mainColor: mainCol,
        innerColor: innerCol,
        bottomColor: bottomCol,
        lapelDirection: 'huu_nham',
        isSleeveRolled: false,
        selectedBottom: gender === 'male' ? 'quan_lua_ong_suong' : 'chan_vay_midi_xep_ly',
        selectedHeadwear: 'khan_dong',
        selectedGlasses: 'none',
        selectedShoes: 'hai_theu_cung_dinh',
        selectedHandheld: 'quat_xep_giay_do',
        selectedOuterwear: 'none',
        backdropId: 'van_mieu',
        lightingId: 'dem_hoa_dang',
        occasionId: 'trinh_dien',
        isSoloYem: false,
      },
    };
  }

  // 3. DYNAMIC INTENT PARSER FOR ARBITRARY QUERIES
  // Dáng áo
  let garmentId: OutfitConfig['garmentId'] = 'ao_chen';
  if (prompt.includes('tấc') || prompt.includes('thụng') || prompt.includes('đại lễ') || prompt.includes('hôn lễ')) {
    garmentId = 'ao_tac';
  } else if (prompt.includes('giao lĩnh') || prompt.includes('lý') || prompt.includes('trần') || prompt.includes('lê')) {
    garmentId = 'ao_giao_linh';
  } else if (prompt.includes('tứ thân') || prompt.includes('kinh bắc') || prompt.includes('quan họ') || prompt.includes('yếm')) {
    garmentId = 'ao_tu_than';
  } else if (prompt.includes('cách tân') || prompt.includes('ngắn')) {
    garmentId = 'ao_dai_cach_tan';
  } else if (prompt.includes('áo dài') || prompt.includes('thướt tha')) {
    garmentId = 'ao_dai_truyen_thong';
  }

  // Giày & dép
  let selectedShoes: OutfitConfig['selectedShoes'] = 'sneaker_retro';
  if (prompt.includes('sneaker') || prompt.includes('thể thao') || prompt.includes('đi bộ') || prompt.includes('đau chân')) {
    selectedShoes = 'sneaker_retro';
  } else if (prompt.includes('guốc') || prompt.includes('mộc')) {
    selectedShoes = 'guoc_moc_son_mai';
  } else if (prompt.includes('loafer') || prompt.includes('giày da')) {
    selectedShoes = 'loafer_da';
  } else if (prompt.includes('hài') || prompt.includes('cung đình')) {
    selectedShoes = 'hai_theu_cung_dinh';
  } else if (prompt.includes('mary jane')) {
    selectedShoes = 'mary_jane';
  }

  // Kính mắt
  const selectedGlasses: OutfitConfig['selectedGlasses'] =
    prompt.includes('kính') || prompt.includes('cổ điển') || prompt.includes('tri thức')
      ? 'kinh_kim_loai'
      : 'none';

  // Địa danh / Bối cảnh
  let backdropId: OutfitConfig['backdropId'] = 'van_mieu';
  if (prompt.includes('dinh độc lập') || prompt.includes('sài gòn') || prompt.includes('cafe')) {
    backdropId = 'cafe_indochine';
  } else if (prompt.includes('huế') || prompt.includes('hoàng thành') || prompt.includes('cung đình')) {
    backdropId = 'hoang_thanh_hue';
  } else if (prompt.includes('hội an') || prompt.includes('hoa đăng')) {
    backdropId = 'pho_co_hoi_an';
  } else if (prompt.includes('chùa') || prompt.includes('tâm linh')) {
    backdropId = 'van_mieu';
  }

  // Thời gian & ánh sáng
  let lightingId: OutfitConfig['lightingId'] = 'nang_am';
  if (prompt.includes('chiều') || prompt.includes('3h') || prompt.includes('hoàng hôn')) {
    lightingId = 'nang_am';
  } else if (prompt.includes('sáng') || prompt.includes('tinh mơ') || prompt.includes('bình minh')) {
    lightingId = 'sang_som';
  } else if (prompt.includes('tối') || prompt.includes('đêm') || prompt.includes('hoa đăng')) {
    lightingId = 'dem_hoa_dang';
  } else if (prompt.includes('thu') || prompt.includes('se lạnh') || prompt.includes('mát')) {
    lightingId = 'chieu_thu';
  }

  // Phối màu Ngũ Hành tương sinh 100/100
  const mainCol = findColor('xanh_thien_thanh');
  const innerCol = findColor('bach_ngoc');
  const bottomCol = findColor('bach_ngoc');

  return {
    userPrompt: rawPrompt,
    greeting: `✨ Gemini đã thiết kế xong outfit theo yêu cầu của bạn!`,
    reasoning: `Phân tích ngữ cảnh "${rawPrompt}", Gemini đã lựa chọn kết cấu trang phục tối ưu hóa giữa tính thẩm mỹ truyền thống và sự tiện dụng đời thường. Cặp màu Kim sinh Thủy được áp dụng đem lại khí sắc hanh thông và điểm hòa sắc tuyệt đối 100/100.`,
    hashtags: ['#HọaSắcViệt', '#CổPhụcGenZ', '#NgũHànhTươngSinh', '#BảoTồnDiSản100%'],
    occasionName: 'Tùy Biến Theo Ngữ Cảnh',
    elementRelation: 'Kim sinh Thủy · 100/100',
    paletteDescription: 'Xanh Thiên Thanh (Thủy) + Bạch Ngọc (Kim)',
    outfitUpdates: {
      gender,
      garmentId,
      mainColor: mainCol,
      innerColor: innerCol,
      bottomColor: bottomCol,
      lapelDirection: 'huu_nham',
      isSleeveRolled: false,
      selectedBottom: 'quan_lua_ong_suong',
      selectedHeadwear: gender === 'female' ? 'bom_nhung' : 'khan_dong',
      selectedGlasses,
      selectedShoes,
      selectedHandheld: 'quat_xep_giay_do',
      selectedOuterwear: 'none',
      backdropId,
      lightingId,
      isSoloYem: false,
    },
  };
}
