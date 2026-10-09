import { GarmentId, ColorItem } from '../types/costume';

import phoThiImg from '../assets/images/concept_pho_thi_1790948968078.jpg';
import kyYeuImg from '../assets/images/concept_ky_yeu_1790948951049.jpg';
import duXuanImg from '../assets/images/concept_du_xuan_1790948981273.jpg';
import heroImg from '../assets/images/hero_hoasacviet_remix_1790948938640.jpg';

import aoChenRealImg from '../assets/images/ao-chen-that.jpg';

export interface TuThanPart {
  number: number;
  name: string;
  subName?: string;
  description: string;
  icon: string;
  traditionalRole: string;
}

export const TU_THAN_PARTS: TuThanPart[] = [
  {
    number: 1,
    name: 'Yếm',
    subName: 'Yếm thắm / Yếm đào',
    description: 'Mặc bên trong áo, quấn nút sau gáy, buộc dây dưới lưng.',
    icon: '🎽',
    traditionalRole: 'Nội y truyền thống đoan trang, kín đáo mà quyến rũ của phụ nữ Việt.'
  },
  {
    number: 2,
    name: 'Áo tứ thân',
    subName: 'Áo khoác 4 tà',
    description: 'Gồm 4 tà (2 tà trước, 2 tà sau), khoác ngoài, hai tà trước khép lại tạo chữ V.',
    icon: '👘',
    traditionalRole: 'Biểu trưng tứ thân phụ mẫu (cha mẹ chàng và cha mẹ nàng bao bọc).'
  },
  {
    number: 3,
    name: 'Váy đụp',
    subName: 'Chân váy lụa đen',
    description: 'Xếp ly nhỏ quanh eo, ôm nhẹ, độ dài chạm mắt cá hoặc dài hơn 1–2 cm.',
    icon: '👗',
    traditionalRole: 'Dáng váy xòe chữ A uyển chuyển, tiện lao động gặt hái và trẩy hội.'
  },
  {
    number: 4,
    name: 'Nịt lưng',
    subName: 'Dải thắt lưng lụa',
    description: 'Dải lụa mềm, quấn quanh eo 2 vòng, buộc nút trước hoặc bên hông.',
    icon: '🎗️',
    traditionalRole: 'Giữ chặt tà áo và tôn lên vòng eo con kiến thắt đáy lưng ong.'
  },
  {
    number: 5,
    name: 'Khăn mỏ quạ',
    subName: 'Khăn vuông vấn đầu',
    description: 'Khăn vuông, cuộn một đầu khoảng 3 cm, đội lên đầu, buộc nhẹ sau gáy.',
    icon: '🧕',
    traditionalRole: 'Khung khăn chóp nhọn tôn khuôn mặt trái xoan thanh tú của thiếu nữ Bắc Bộ.'
  },
  {
    number: 6,
    name: 'Nón quai thao',
    subName: 'Nón thúng quai lụa',
    description: 'Nón truyền thống, quai lụa buộc hoặc thả hai bên, tạo nét duyên dáng.',
    icon: '👒',
    traditionalRole: 'Vành nón rộng che nghiêng nụ cười chúm chím e ấp trong làn điệu Quan họ.'
  },
  {
    number: 7,
    name: 'Giày dép',
    subName: 'Guốc mộc / Dép bẹt',
    description: 'Guốc mộc hoặc dép bẹt, phù hợp đi lại, biểu diễn.',
    icon: '👡',
    traditionalRole: 'Tiếng guốc mộc gõ lách cách trên đường làng mang âm hưởng thanh bình thôn dã.'
  },
  {
    number: 8,
    name: 'Dải sợi lụa',
    subName: 'Phụ kiện dải ruột tượng',
    description: 'Dải lụa màu sắc, thả lơi từ nịt lưng, tạo điểm nhấn mềm mại, duyên dáng.',
    icon: '🎀',
    traditionalRole: 'Sợi tơ hồng duyên nợ, sắc màu ngũ hành rực rỡ lay động theo từng nhịp bước.'
  }
];

export interface TailorShop {
  name: string;
  city: string;
  specialty: string;
  contactNote: string;
  isVerifiedHeritage?: boolean;
}

export interface GarmentRealDetail {
  garmentId: GarmentId;
  name: string;
  eraName: string;
  tagline: string;
  photoIndexLabel: string;
  photoUrl: string;
  secondaryPhotoUrl?: string;
  photoCaption: string;
  modelInfo: string;
  heritageRating: string;
  // Thông số thực tế theo yêu cầu người dùng
  fabricSpec: {
    materialName: string;
    weaveType: string;
    weightMomme: string;
    feelDescription: string;
    origin: string;
  };
  buttonSpec: {
    name: string;
    quantity: number;
    material: string;
    meaning: string;
    placement: string;
  };
  silhouetteSpec: {
    hemLength: string;
    collarHeight: string;
    sleeveWidth: string;
    hemWidth: string;
    drapeBehavior: string;
    slitHeight: string;
  };
  tailoringNotes: string[];
  stylingAdvice: string;
  recommendedTailors: TailorShop[];
}

export const REAL_GARMENT_REGISTRY: Record<GarmentId, GarmentRealDetail> = {
  ao_chen: {
    garmentId: 'ao_chen',
    name: 'Áo Ngũ Thân Tay Chẽn',
    eraName: 'Triều Nguyễn (Thế kỷ 19 - 20)',
    tagline: 'Thường phục thanh lịch, đoan trang và năng động của người Việt xưa',
    photoIndexLabel: 'Áo Ngũ Thân Tay Chẽn Cổ Phong',
    photoUrl: ao-chen-that.png,
    photoCaption: 'Mẫu thực tế: Cặp đôi mặc Áo Ngũ Thân Tay Chẽn (V\'Style - Đại Việt Cổ Phong). Chàng diện áo ngũ thân xanh lam đậm che dù giấy dầu, Nàng diện áo ngũ thân hồng phấn xách giỏ mây tre truyền thống.',
    modelInfo: 'Concept: Phố Thị Trí Thức • Chàng: Áo chẽn xanh lam • Nàng: Áo chẽn hồng phấn • May đo theo lối cổ Triều Nguyễn',
    heritageRating: '100% Chuẩn Di Sản Triều Nguyễn (Ngũ Thân Tay Chẽn)',
    fabricSpec: {
      materialName: 'Lụa Tơ Tằm Vạn Phúc / Sa Nam Thượng Hạng',
      weaveType: 'Dệt gấm vân chìm hoa cúc hoặc chữ Thọ (Jacquard Silk)',
      weightMomme: '22 - 24 Momme (Độ dày vừa vặn, không lộ lót)',
      feelDescription: 'Bề mặt óng nhẹ tự nhiên dưới ánh nắng, mềm mại, thoáng khí 4 mùa và có độ buông rủ êm ái.',
      origin: 'Làng lụa Vạn Phúc (Hà Đông) & Lụa tơ tằm Bảo Lộc',
    },
    buttonSpec: {
      name: 'Khuy Ngũ Thường (5 Hạt Cúc)',
      quantity: 5,
      material: 'Đồng đúc thếp vàng / Ngọc cẩm thạch bọc chỉ gấm thủ công',
      meaning: '5 hạt khuy đại diện cho Nhân - Lễ - Nghĩa - Trí - Tín của đạo làm người.',
      placement: '1 khuy khóa chân cổ lập lĩnh, 1 khuy hõm xương quai xanh (nách phải), 3 khuy sườn phải xuống quá hông.',
    },
    silhouetteSpec: {
      hemLength: '118 - 124 cm (Chạm bắp chân, cách mặt sàn 20 - 25cm)',
      collarHeight: '2.5 - 3.2 cm (Cổ lập lĩnh đứng vừa ôm nhẹ chân cổ, không cấn họng)',
      sleeveWidth: 'Cửa tay chẽn 13 - 15 cm ôm thon gọn cổ tay, nách lượn cong thoải mái',
      hemWidth: 'Độ xòe chữ A nhẹ nhàng (~72 - 78 cm ngang tà gấu), uốn cong cánh cung (đá vạt)',
      drapeBehavior: 'Tà áo buông thẳng tự nhiên, sóng nhẹ theo từng bước chân uyển chuyển',
      slitHeight: 'Xẻ tà từ ngang hông (ngang thắt lưng) giữ kín đáo đoan chính',
    },
    tailoringNotes: [
      'May can sống giữa lưng (lưng ghép từ 2 khổ vải hẹp tượng trưng sự ngay thẳng, chính trực).',
      'Vạt phải đè vạt trái (Hữu nhậm) chuẩn dương khí cho người sống.',
      'Cổ áo có nẹp dựng bằng vải bồi tự nhiên, dựng thẳng đứng thanh nhã.',
      'Đường may viền tà giấu chỉ tỉ mỉ, gấu áo cuộn mép 0.5cm sắc sảo.',
    ],
    stylingAdvice: 'Phối cùng quần lụa trắng hoặc nâu đất ống suông, che dù giấy dầu cổ truyền, cầm giỏ mây tre và đi guốc mộc/hài nhung.',
    recommendedTailors: [
      {
        name: "V'Style - Chuyên Cổ Phục Việt",
        city: 'Hà Nội & TP. Hồ Chí Minh',
        specialty: 'Chuyên đo may phục dựng Áo Ngũ Thân chuẩn thước tấc lối cổ',
        contactNote: 'Tư vấn phom dáng theo tỷ lệ cơ thể và chọn màu ngũ hành tương sinh',
        isVerifiedHeritage: true,
      },
      {
        name: 'Đông Phong Cổ Phục',
        city: 'Hà Nội',
        specialty: 'May can sống lưng thủ công, cổ lập lĩnh đứng ôm khít',
        contactNote: 'Sẵn vải Sa Nam, Gấm Vạn Phúc dệt tay thượng hạng',
        isVerifiedHeritage: true,
      },
      {
        name: 'Nhà May Nghệ Nhân Làng Lụa Vạn Phúc',
        city: 'Hà Đông, Hà Nội',
        specialty: 'May đo trực tiếp tại làng nghề tơ lụa nghìn năm tuổi',
        contactNote: 'Vải lụa mộc dệt vân chìm hoa cúc chữ Thọ nguyên bản',
        isVerifiedHeritage: true,
      },
    ],
  },

  ao_tac: {
    garmentId: 'ao_tac',
    name: 'Áo Ngũ Thân Tay Thụng (Áo Tấc)',
    eraName: 'Lễ Phục Quốc Gia Triều Nguyễn',
    tagline: 'Đại lễ phục trang trọng, bệ vệ với tay thụng buông dài quá ngón',
    photoIndexLabel: 'Áo Tấc Hoàng Gia Tại Ngọ Môn Huế',
    photoUrl: kyYeuImg,
    photoCaption: 'Mẫu thực tế: Cặp đôi mặc Áo Tấc hoàng gia trước cổng Ngọ Môn (Đại Nội Huế). Cô dâu diện Áo Tấc đỏ chu sa hoa văn Nhật Bình cung đình kèm khăn vấn xanh lam ngũ sắc, Chú rể mặc Áo Tấc trắng ngà thêu rồng triều Nguyễn.',
    modelInfo: 'Concept: Kỷ Yếu Hoàng Gia • Bối cảnh: Ngọ Môn Huế • Lễ phục cưới cung đình triều Nguyễn • Tay thụng 40cm',
    heritageRating: '100% Chuẩn Đại Lễ Phục Cung Đình Triều Nguyễn',
    fabricSpec: {
      materialName: 'Gấm Tơ Tằm Sa Nam / Gấm Vân Cung Đình Thượng Hạng',
      weaveType: 'Dệt nổi hoa văn Bát Bửu / Mây Cuộn Sóng Thủy Ba (Brocade)',
      weightMomme: '26 - 28 Momme (Chất vải đầm tay, nếp gấp trang nghiêm)',
      feelDescription: 'Mình vải cứng cáp vừa đủ để giữ phom bệ vệ, óng ả sang trọng dưới ánh nắng Đại Nội.',
      origin: 'Kinh đô Huế & Xưởng dệt cổ truyền Bảo Lộc',
    },
    buttonSpec: {
      name: 'Khuy Ngũ Thường Cung Đình',
      quantity: 5,
      material: 'Đồng đúc hoa văn chữ Thọ / Khuy ngọc bọc bạc',
      meaning: 'Ngũ Thường + Tứ Thân Phụ Mẫu bao bọc con cháu đoan trang.',
      placement: 'Cài chuẩn Hữu Nhậm từ cổ đứng sang sườn phải, nẹp cài giấu mép khéo léo.',
    },
    silhouetteSpec: {
      hemLength: '122 - 128 cm (Phủ dài trang trọng, che kín đầu gối xuống ngang bắp chân)',
      collarHeight: '3.0 - 3.5 cm (Cổ đứng lập lĩnh lót nẹp cứng giữ khí chất)',
      sleeveWidth: 'Ống tay thụng rộng 36 - 44 cm, buông thẳng dài quá đầu ngón tay 10-15cm',
      hemWidth: 'Tà xòe rộng 80 - 88 cm tạo dáng đi uy nghi, trang trọng',
      drapeBehavior: 'Độ rủ dày, tay áo khi buông thõng vuông vắn, khi chắp tay tạo hình khối chữ V tôn kính',
      slitHeight: 'Xẻ tà ngang thắt lưng, 5 thân áo buông phủ kín đáo',
    },
    tailoringNotes: [
      'Tuyệt đối không may xắn ống tay áo tấc (phá vỡ quy cách đại lễ phục).',
      'Đường sống lưng may kép thẳng tắp biểu thị tinh thần quân tử.',
      'Cần đi kèm khăn đóng bọc lụa hoặc khăn vấn nhung 7 vòng để hoàn thiện lễ phục.',
    ],
    stylingAdvice: 'Kết hợp cùng khăn vấn hoàng gia xanh lam, quạt giấy xếp vẽ hoa, giày Oxford da cổ điển hoặc hài cung đình thêu chỉ vàng.',
    recommendedTailors: [
      {
        name: 'Huế Cổ Phục Cung Đình',
        city: 'TP. Huế',
        specialty: 'Chuyên đại lễ phục Áo Tấc hoàng gia, hoa văn Thủy Ba sóng nước',
        contactNote: 'Phục dựng chuẩn mực theo tư liệu Châu bản triều Nguyễn',
        isVerifiedHeritage: true,
      },
      {
        name: 'Ỷ Vân Hiên',
        city: 'Hà Nội & TP. Hồ Chí Minh',
        specialty: 'Thương hiệu phục dựng cổ phục hàng đầu, lễ phục cưới Áo Tấc',
        contactNote: 'Chất liệu gấm tơ tằm dệt thủ công theo mẫu tiến vua',
        isVerifiedHeritage: true,
      },
      {
        name: 'Hoa Niên - Năm Tháng Tươi Đẹp',
        city: 'TP. Hồ Chí Minh',
        specialty: 'May đo Áo Tấc chụp ảnh kỷ yếu, lễ cưới và sự kiện văn hóa',
        contactNote: 'Có đầy đủ phụ kiện khăn đóng bọc lụa và hài thêu đi kèm',
        isVerifiedHeritage: true,
      },
    ],
  },

  ao_tu_than: {
    garmentId: 'ao_tu_than',
    name: 'Áo Tứ Thân Dân Gian Bắc Bộ',
    eraName: 'Dân Gian Bắc Bộ (Thế kỷ 17 - 19)',
    tagline: 'Vẻ đẹp mộc mạc, duyên dáng và rực rỡ sắc xuân của thiếu nữ Kinh Bắc',
    photoIndexLabel: 'Áo Tứ Thân Du Xuân Ngày Tết',
    photoUrl: duXuanImg,
    photoCaption: 'Mẫu thực tế: Thiếu nữ diện Áo Tứ Thân màu đỏ son thêu hoa văn viền vạt, phối cùng yếm lụa hồng phấn dịu dàng, dải thắt lưng xanh ngọc & dải lụa ruột tượng hồng thắt nơ buông rủ, chân váy đụp lụa đen tuyền; tay cầm quạt xếp nan gỗ đỏ hoa đào giữa không gian phố cổ ngập tràn đèn lồng và sắc xuân rực rỡ.',
    modelInfo: 'Concept: Du Xuân Phố Cổ Đón Tết • Yếm lụa hồng phấn x Áo tứ thân đỏ son • Quạt xếp hoa đào x Đèn lồng truyền thống',
    heritageRating: '100% Chuẩn Dân Gian Đồng Bằng Bắc Bộ',
    fabricSpec: {
      materialName: 'Đũi Tơ Tằm Tự Nhiên / Lụa Thô Nhuộm Thảo Mộc',
      weaveType: 'Dệt đũi thủ công mộc mạc (Raw Silk Dupioni)',
      weightMomme: '18 - 22 Momme (Mềm rủ, bay bổng theo làn gió xuân)',
      feelDescription: 'Thấm hút mồ hôi cực tốt, bề mặt có nốt sợi đũi tự nhiên gần gũi, tạo cảm giác mộc mạc hoài cổ.',
      origin: 'Làng đũi Nam Cao (Thái Bình) & Vạn Phúc',
    },
    buttonSpec: {
      name: 'Không Dùng Khuy (Cột Dải Lụa Ruột Tượng)',
      quantity: 0,
      material: 'Dải lụa ruột tượng thắt eo thay cúc kim loại',
      meaning: 'Sợi tơ hồng gắn kết duyên đôi lứa, bốn thân áo ôm trọn tứ thân phụ mẫu.',
      placement: 'Hai vạt trước buông lơi hoặc buộc nhẹ trước bụng trên dải thắt lưng xanh/hồng đào.',
    },
    silhouetteSpec: {
      hemLength: '112 - 118 cm (Vạt áo vừa phủ qua bắp chân, tôn dáng người bước đi)',
      collarHeight: 'Cổ lá sen thấp hoặc viền cổ mềm không có lập lĩnh cứng',
      sleeveWidth: 'Tay áo suông rộng vừa phải 16 - 18 cm, có thể xắn gấu thoải mái',
      hemWidth: 'Bốn vạt tách biệt: 2 vạt sau ghép liền sống, 2 vạt trước bay bổng phóng khoáng',
      drapeBehavior: 'Vạt áo mềm rủ, lay nhẹ theo nhịp bước chân gánh gồng chèo đò trẩy hội',
      slitHeight: 'Mở trọn từ chân ngực xuống, khoe dải yếm thắm và ruột tượng lụa bên trong',
    },
    tailoringNotes: [
      'Bắt buộc phối cùng áo cánh hoặc yếm đào bên trong, không mặc độc yếm.',
      'Dải ruột tượng làm từ lụa nõn dệt chéo dùng đựng tiền xu và cau trầu.',
      'Chân váy đụp lụa đen/đỏ chấm gót xòe rộng tiện lao động và dự hội lim.',
      'Khăn mỏ quạ gấp chóp nhọn tạo nét thắt duyên cho gương mặt.',
    ],
    stylingAdvice: 'Phối cùng quạt xếp nan gỗ màu đỏ hoa đào (như trong ảnh mẫu) hoặc nón quai thao quai lụa hồng, dải ruột tượng hồng phấn thắt nơ mềm mại, guốc mộc truyền thống và kiềng bạc thanh mảnh.',
    recommendedTailors: [
      {
        name: 'Tiệm Cổ Phục Kinh Bắc',
        city: 'Bắc Ninh & Hà Nội',
        specialty: 'May trọn bộ 8 chi tiết áo tứ thân, yếm thắm dệt đũi nhuộm củ nâu',
        contactNote: 'Tặng kèm khăn mỏ quạ và dải ruột tượng ngũ sắc thủ công',
        isVerifiedHeritage: true,
      },
      {
        name: 'Hợp Tác Xã Đũi Nam Cao',
        city: 'Thái Bình',
        specialty: 'Cung cấp vải đũi tơ tằm thủ công và nhận may đo theo số đo',
        contactNote: 'Vải nhuộm thảo mộc tự nhiên không kích ứng da',
        isVerifiedHeritage: true,
      },
      {
        name: 'Hoa Niên Cổ Trang',
        city: 'TP. Hồ Chí Minh',
        specialty: 'May phục trang Áo Tứ Thân biểu diễn nghệ thuật Quan Họ',
        contactNote: 'Kèm nón quai thao đan tre lụa tơ tằm cao cấp',
        isVerifiedHeritage: true,
      },
    ],
  },

  ao_giao_linh: {
    garmentId: 'ao_giao_linh',
    name: 'Áo Giao Lĩnh (Trực Lĩnh)',
    eraName: 'Đại Việt Thời Lý - Trần - Hậu Lê',
    tagline: 'Khí chất hào sảng, cổ điển và phong lưu của quý tộc Đại Việt',
    photoIndexLabel: 'Áo Giao Lĩnh Cổ Chéo Đại Việt',
    photoUrl: heroImg,
    photoCaption: 'Mẫu thực tế: Chàng mặc Áo Giao Lĩnh cổ chéo chữ V màu vàng kim champagne cầm quạt xếp, Nàng mặc Áo Giao Lĩnh màu tím tía gấm hoa chìm đeo chuỗi ngọc trai bên hồ sen Đại Việt.',
    modelInfo: 'Concept: Phong Hoa Đại Việt • Chàng: Giao lĩnh vàng champagne • Nàng: Giao lĩnh tím tía • Vạt chéo chữ V thời Lê',
    heritageRating: '100% Chuẩn Khí Tiết Cổ Trang Đại Việt',
    fabricSpec: {
      materialName: 'Gấm Vân Tơ Tằm Họa Tiết Mây Cuộn Thời Lê',
      weaveType: 'Dệt gấm vân đôi hai mặt (Brocade Damask)',
      weightMomme: '24 - 26 Momme (Dày dặn, giữ form cổ áo chữ V sắc sảo)',
      feelDescription: 'Mịn màng mát lạnh, bề mặt dệt họa tiết hoa sen tây và mây sóng mềm mại.',
      origin: 'Xưởng phục chế cổ trang phục Đại Việt & Lụa tơ Bảo Lộc',
    },
    buttonSpec: {
      name: 'Dây Thắt Đại Đái / Dây Buộc Lụa Bản To',
      quantity: 1,
      material: 'Lụa tơ dệt dải thắt thêu hoa văn lưỡng long/hoa sen',
      meaning: 'Âm Dương giao hòa (Trời tròn đất vuông, cổ chéo hình chữ V).',
      placement: 'Vạt phải đè vạt trái (Hữu nhậm), đại đái thắt ngang eo buông lơi 2 dải dài.',
    },
    silhouetteSpec: {
      hemLength: '124 - 130 cm (Quét ngang mắt cá chân hoặc chạm gót)',
      collarHeight: 'Cổ chéo giao lĩnh không có chân cổ đứng, nẹp cổ rộng 4 - 5 cm',
      sleeveWidth: 'Tay áo rộng phóng khoáng 28 - 34 cm mang phong vị tiên phong đạo cốt',
      hemWidth: 'Tà áo may rộng 85 - 95 cm kết hợp chân váy xếp nếp bên trong',
      drapeBehavior: 'Độ rủ lớn, vạt áo và dải thắt bay bổng khi chuyển động',
      slitHeight: 'Xẻ tà hai bên hông hoặc tà liền phối chân váy dài',
    },
    tailoringNotes: [
      'Nẹp cổ áo vắt chéo chữ V phải phẳng phiu, không bị nhăn dúm.',
      'Đại đái thắt ở eo phải chắc chắn, đầu dải buông đều hai bên vạt.',
      'Tuyệt đối không thay thế bằng đai Obi to bản của Kimono Nhật Bản.',
    ],
    stylingAdvice: 'Kết hợp cùng chuỗi ngọc trai trắng, quạt xếp giấy vẽ thủy mặc, giày hài mũi cong thêu hoa sen.',
    recommendedTailors: [
      {
        name: 'Đại Việt Cổ Phong Studio',
        city: 'Hà Nội',
        specialty: 'Phục dựng trang phục Giao Lĩnh thời Lý, Trần, Lê sơ chuẩn sử sách',
        contactNote: 'Nẹp cổ chữ V may giấu đường chỉ, vải dệt hoa văn thời Lý - Trần',
        isVerifiedHeritage: true,
      },
      {
        name: 'Ỷ Vân Hiên Xưởng May',
        city: 'Hà Nội',
        specialty: 'Chuyên đo may áo Trực Lĩnh và Giao Lĩnh cổ phục quý tộc',
        contactNote: 'Có chuyên gia cố vấn lịch sử hướng dẫn cách thắt đại đái',
        isVerifiedHeritage: true,
      },
    ],
  },

  ao_dai_truyen_thong: {
    garmentId: 'ao_dai_truyen_thong',
    name: 'Áo Dài Truyền Thống Việt Nam',
    eraName: 'Đô Thị Tân Thời (1950s - Nay)',
    tagline: 'Quốc phục tôn vinh đường cong thanh lịch và vẻ đẹp kín đáo của phụ nữ Việt',
    photoIndexLabel: 'Áo Dài Truyền Thống Phố Cổ',
    photoUrl: heroImg,
    photoCaption: 'Mẫu thực tế: Cặp đôi mặc Áo Dài truyền thống màu trắng tinh khôi gấm hoa sen chìm trên phố cổ Hà Nội / Hội An. Nàng thướt tha đoan trang, Chàng lịch lãm thêu họa tiết chiếc quạt trước ngực.',
    modelInfo: 'Concept: Phố Cổ Tinh Khôi • Cặp đôi: Áo Dài trắng gấm hoa sen • Bối cảnh: Phố cổ tường vàng cờ đỏ',
    heritageRating: '100% Biểu Tượng Quốc Phục Việt Nam',
    fabricSpec: {
      materialName: 'Lụa Hà Đông Dệt Hoa Chìm / Chiffon Tơ Tằm',
      weaveType: 'Dệt trơn hoặc gấm tơ tằm co giãn nhẹ 4 chiều',
      weightMomme: '18 - 20 Momme (Mỏng nhẹ bay bổng mà không mỏng dính)',
      feelDescription: 'Mềm mướt như làn mây, trượt êm ái trên da, tôn đường cong mà vẫn kín đáo thanh tao.',
      origin: 'Làng lụa Vạn Phúc (Hà Đông)',
    },
    buttonSpec: {
      name: 'Cúc Bấm Hông / Khóa Kéo Giọt Nước Ẩn',
      quantity: 5,
      material: 'Cúc bấm kim loại bọc vải hoặc khóa kéo ẩn tinh tế bên sườn',
      meaning: 'Kế thừa từ quy cách cài khuy hữu nhậm của áo ngũ thân.',
      placement: 'Cài dọc từ chân cổ sang vai phải rồi chạy xuống nách và eo.',
    },
    silhouetteSpec: {
      hemLength: '128 - 135 cm (Chạm mu bàn chân hoặc cách sàn 10 - 15 cm)',
      collarHeight: '3.0 - 4.5 cm (Cổ lập lĩnh cao thanh thoát, khoét giọt lệ nhẹ nhàng)',
      sleeveWidth: 'Tay raglan ôm sát cánh tay mềm mại, cổ tay vừa khít 13 - 14 cm',
      hemWidth: 'Hai tà trước sau buông thướt tha, xòe rộng 65 - 72 cm',
      drapeBehavior: 'Độ bay bổng tuyệt đối khi có gió, tà áo lướt nhẹ theo gót ngà',
      slitHeight: 'Xẻ tà chạm sát cạp quần lụa, khoe nhẹ eo thon một cách tế nhị',
    },
    tailoringNotes: [
      'Cắt may raglan nghiêng góc 45 độ giúp vai không bị nhăn nhúm.',
      'Tà áo sau dài hơn tà trước 1 - 1.5 cm để khi bước đi tà áo không bị hớt ngắn.',
      'Bắt buộc mặc cùng quần dài lụa ống suông rộng 28 - 34 cm.',
    ],
    stylingAdvice: 'Đi cùng giày cao gót hoặc giày tây trắng, tóc búi trâm thanh nhã, nụ cười rạng rỡ trên nền phố cổ.',
    recommendedTailors: [
      {
        name: 'Nhà May Áo Dài Lan Hương',
        city: 'Hà Nội',
        specialty: 'Thương hiệu Áo Dài di sản thêu tay hoa sen tinh xảo',
        contactNote: 'Phom dáng chuẩn người Tràng An, lụa Vạn Phúc cao cấp',
        isVerifiedHeritage: true,
      },
      {
        name: 'Áo Dài Cẩm Tú',
        city: 'TP. Hồ Chí Minh',
        specialty: 'May đo áo dài truyền thống cưới hỏi và lễ hội trên 30 năm uy tín',
        contactNote: 'Kỹ thuật may tà bay không lộ đường vắt gấu',
        isVerifiedHeritage: true,
      },
      {
        name: 'Áo Dài Ngân An',
        city: 'Hà Nội',
        specialty: 'May đo áo dài cặp đôi tân thời cho nam và nữ',
        contactNote: 'Áo nam phom đứng đắn thêu họa tiết chim hạc / chiếc quạt cổ',
        isVerifiedHeritage: true,
      },
    ],
  },

  ao_dai_cach_tan: {
    garmentId: 'ao_dai_cach_tan',
    name: 'Áo Dài Cách Tân Hiện Đại',
    eraName: 'Đương Đại Gen Z & Thời Trang Ứng Dụng',
    tagline: 'Năng động, trẻ trung, kết nối di sản ngàn năm với nhịp sống đô thị',
    photoIndexLabel: 'Áo Dài Cách Tân Hiện Đại Song Phụng',
    photoUrl: phoThiImg,
    photoCaption: 'Mẫu thực tế: Áo đôi Song Phụng màu vàng cam đất nổi bật với họa tiết chim công / khổng tước thêu mosaic xanh sapphire trước ngực, tay lỡ 3/4, tà lửng qua gối phối sneaker trắng năng động.',
    modelInfo: 'Concept: Song Phụng Đương Đại • Bộ sưu tập: Áo Đôi Song Phụng • Tay lỡ 3/4 • Quần trắng x Giày sneaker',
    heritageRating: '95% Di Sản Thích Nghi Hiện Đại (Văn Minh & Lịch Sự)',
    fabricSpec: {
      materialName: 'Gấm Lụa Dệt Vân Cát / Taffeta Vàng Cam Đất',
      weaveType: 'Dệt Jacquard hoa nổi kết hợp thêu đính đá mosaic',
      weightMomme: '22 - 26 Momme (Giữ phom tốt, nếp đứng đắn sắc nét)',
      feelDescription: 'Bề mặt óng ánh ánh kim sa, họa tiết chim công thêu nổi tạo hiệu ứng thị giác sang trọng.',
      origin: 'Hàng dệt thủ công Việt Nam đương đại',
    },
    buttonSpec: {
      name: 'Khóa Kéo Lưng / Cúc Bấm Ẩn Tinh Gọn',
      quantity: 1,
      material: 'Khóa kéo giọt nước ẩn sau lưng tiện dụng',
      meaning: 'Tinh giản hiện đại giúp người mặc tự mặc dễ dàng trong 10 giây.',
      placement: 'Dọc sống lưng hoặc cài nút ngọc điểm xuyết cổ áo.',
    },
    silhouetteSpec: {
      hemLength: '95 - 105 cm (Tà lửng qua gối, cực kỳ thuận tiện đi lại)',
      collarHeight: '2.0 - 2.5 cm (Cổ trụ thấp thanh lịch, thoải mái không gò bó)',
      sleeveWidth: 'Tay lỡ 3/4 qua khuỷu tay thoáng mát, cử động thoải mái',
      hemWidth: 'Tà áo chữ A thoải mái, xẻ tà vừa phải',
      drapeBehavior: 'Độ đầm tốt, năng động, không vướng víu',
      slitHeight: 'Xẻ tà ngang hông phối cùng quần âu trắng ống đứng hoặc quần lụa suông',
    },
    tailoringNotes: [
      'Phom áo suông thoải mái giấu khuyết điểm vòng hai cực tốt.',
      'Họa tiết Song Phụng đối xứng mang ý nghĩa hôn nhân viên mãn, hạnh phúc lứa đôi.',
      'Chất vải không nhăn nhàu, giữ form chuẩn sau cả ngày dự tiệc.',
    ],
    stylingAdvice: 'Phối cực chất cùng giày sneaker retro trắng, quạt nan gỗ cầm tay, phù hợp diện dịp Tết, lễ cưới hoặc dạo phố đón xuân.',
    recommendedTailors: [
      {
        name: 'Họa Sắc Atelier',
        city: 'Hà Nội & TP. Hồ Chí Minh',
        specialty: 'Thiết kế áo dài cách tân phom suông phối sneaker Gen Z',
        contactNote: 'Đồng bộ trực tiếp các bảng phối màu ngũ hành trên Studio',
        isVerifiedHeritage: true,
      },
      {
        name: 'Thủy Design House',
        city: 'TP. Hồ Chí Minh & Hà Nội',
        specialty: 'Áo dài gấm cách tân ứng dụng cao cấp, phong cách hội họa dân gian',
        contactNote: 'Chất liệu gấm dệt độc quyền họa tiết rồng phượng đương đại',
        isVerifiedHeritage: true,
      },
      {
        name: 'Tiệm May Cô Ba',
        city: 'Hà Nội',
        specialty: 'May đo áo dài cách tân dáng lửng đón Tết và dạo phố',
        contactNote: 'Thời gian hoàn thiện nhanh 3-5 ngày, nhận chỉnh sửa chuẩn số đo',
        isVerifiedHeritage: true,
      },
    ],
  },
};

// Hàm lấy thông tin trang phục thật kèm ánh xạ màu sắc người dùng chọn
export function getRealGarmentDetail(garmentId: GarmentId, _currentColor?: ColorItem): GarmentRealDetail {
  const baseDetail = REAL_GARMENT_REGISTRY[garmentId] || REAL_GARMENT_REGISTRY.ao_chen;
  return baseDetail;
}
