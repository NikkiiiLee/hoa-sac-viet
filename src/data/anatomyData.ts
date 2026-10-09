import { OutfitConfig } from '../types/costume';

export interface AnatomyHotspotInfo {
  id: 'buttons' | 'lapel' | 'collar' | 'sleeves' | 'body';
  label: string;
  icon: string;
  coords: { x: number; y: number };
  badge: string;
  title: string;
  content: string;
}

export function getAnatomyHotspots(outfit: OutfitConfig): AnatomyHotspotInfo[] {
  const isTaNham = outfit.lapelDirection === 'ta_nham';
  const garmentId = outfit.garmentId;

  // 1. CỔ ÁO (COLLAR)
  let collarTitle = 'Cổ Lập Lĩnh (Cổ Đứng Tròn)';
  let collarContent =
    'Cổ Lập Lĩnh: Dựng thẳng tròn khít 2–3 cm, biểu trưng cho sự đoan chính, nghiêm cẩn và gìn giữ phong cương gia giáo.';
  let collarBadge = 'Lập Lĩnh · Nghiêm Cẩn';

  if (garmentId === 'ao_giao_linh') {
    collarTitle = 'Cổ Giao Lĩnh (Cổ Chéo Chữ V)';
    collarContent =
      'Cổ Giao Lĩnh: Hai vạt đan chéo chữ V, biểu trưng cho triết lý Âm – Dương giao hòa và sự khiêm cung Nho gia thời Lý – Trần – Lê.';
    collarBadge = 'Giao Lĩnh · Âm Dương';
  } else if (garmentId === 'ao_tu_than') {
    collarTitle = 'Cổ Áo Cánh & Yếm Đào';
    collarContent =
      'Cổ Áo Cánh Mở Khéo: Để lộ chiếc yếm đào duyên dáng bên trong, tôn vinh vẻ đẹp kín đáo mà ý nhị của phụ nữ đồng bằng Bắc Bộ.';
    collarBadge = 'Kinh Bắc · Duyên Thầm';
  }

  // 2. ỐNG TAY ÁO (SLEEVES)
  let sleevesTitle = 'Ống Tay Áo';
  let sleevesContent =
    'Tay Chẽn: Cắt ôm gọn sát cổ tay, biểu trưng cho tính năng động, hoạt bát trong đời sống lao động phố thị thường nhật.';
  let sleevesBadge = 'Tay Chẽn · Năng Động';

  if (garmentId === 'ao_tac') {
    sleevesTitle = 'Tay Thụng Hoàng Triều (Áo Tấc)';
    sleevesContent =
      'Tay Thụng (30–40 cm): Buông dài quá ngón tay, biểu trưng cho cốt cách an nhàn, ung dung và kính cẩn khi hành đại lễ.';
    sleevesBadge = 'Tay Thụng · Đại Lễ';
  } else if (garmentId === 'ao_chen') {
    sleevesTitle = 'Tay Chẽn Thường Phục';
    sleevesContent =
      'Tay Chẽn: Cắt ôm gọn sát cổ tay, biểu trưng cho tính năng động, hoạt bát trong đời sống lao động phố thị thường nhật.';
    sleevesBadge = 'Tay Chẽn · Hoạt Bát';
  } else if (garmentId === 'ao_giao_linh') {
    sleevesTitle = 'Tay Áo Giao Lĩnh Đại Việt';
    sleevesContent =
      'Tay thụng buông rủ tự nhiên, đường may nối sống lưng và mép vải thể hiện phong thái thanh tao của sĩ phu ngàn năm.';
    sleevesBadge = 'Đại Việt · Phong Thái';
  } else if (garmentId === 'ao_tu_than') {
    sleevesTitle = 'Tay Áo Tứ Thân';
    sleevesContent =
      'Tay áo may gọn gàng giúp người phụ nữ Kinh Bắc uyển chuyển trong các làn điệu dân ca và lao động hằng ngày.';
    sleevesBadge = 'Dân Gian · Thoải Mái';
  } else {
    sleevesTitle = 'Tay Áo Dài Thanh Thoát';
    sleevesContent =
      'Đường ráp raglan ôm nhẹ thân người, kết hợp giữa tay áo truyền thống và thẩm mỹ tạo hình tân thời.';
    sleevesBadge = 'Tân Thời · Thanh Tao';
  }

  // 3. HÀNG CÚC ÁO (BUTTONS)
  const buttonsTitle = '5 Chiếc Khuy Ngũ Thường';
  const buttonsContent =
    '5 Chiếc Khuy Ngũ Thường: Tượng trưng cho 5 phẩm hạnh cốt lõi của người quân tử: Nhân – Lễ – Nghĩa – Trí – Tín.';
  const buttonsBadge = 'Ngũ Thường · Nhân Lễ Nghĩa Trí Tín';

  // 4. NẸP CỔ & VẠT ÁO (LAPEL / CLOSURE)
  const lapelTitle = isTaNham ? 'Cảnh Báo Vạt Tả Nhận (Tang Phục)' : 'Quy cách Hữu Nhậm (Đạo Dương)';
  const lapelContent = isTaNham
    ? '⚠️ Cài vạt Tả Nhận (trái đè phải) là đại kỵ vì đây là quy cách chỉ dùng cho người đã khuất trong nghi lễ tang ma khâm liệm. Cần đổi ngay sang Hữu Nhậm!'
    : 'Quy cách Hữu Nhậm: Vạt áo bên phải cài đè lên vạt bên trái, thuận theo đạo Dương của người sống (Tuyệt đối không cài Tả nhậm của tang phục).';
  const lapelBadge = isTaNham ? '⚠️ Tả Nhậm · Đại Kỵ' : 'Hữu Nhậm · Thuận Lễ';

  // 5. THÂN ÁO (GARMENT BODY)
  const bodyTitle = 'Kết Cấu Ngũ Thân & Đạo Hiếu';
  const bodyContent =
    "Kết cấu Ngũ Thân: Bốn thân ngoài tượng trưng cho 'Tứ thân phụ mẫu' (cha mẹ đẻ và cha mẹ chồng/vợ); Thân con thứ năm bên trong ngực chở che cho người mặc, biểu thị chữ Hiếu tròn đạo.";
  const bodyBadge = 'Ngũ Thân · Đạo Hiếu';

  return [
    {
      id: 'collar',
      label: 'Cổ Áo',
      icon: '🥋',
      coords: { x: 150, y: 110 },
      badge: collarBadge,
      title: collarTitle,
      content: collarContent,
    },
    {
      id: 'buttons',
      label: 'Hàng Cúc',
      icon: '🔘',
      coords: isTaNham ? { x: 134, y: 145 } : { x: 168, y: 145 },
      badge: buttonsBadge,
      title: buttonsTitle,
      content: buttonsContent,
    },
    {
      id: 'lapel',
      label: 'Mép Vạt',
      icon: '📐',
      coords: isTaNham ? { x: 124, y: 175 } : { x: 176, y: 175 },
      badge: lapelBadge,
      title: lapelTitle,
      content: lapelContent,
    },
    {
      id: 'sleeves',
      label: 'Ống Tay',
      icon: '👘',
      coords: { x: 80, y: 220 },
      badge: sleevesBadge,
      title: sleevesTitle,
      content: sleevesContent,
    },
    {
      id: 'body',
      label: 'Thân Áo',
      icon: '🪡',
      coords: { x: 150, y: 260 },
      badge: bodyBadge,
      title: bodyTitle,
      content: bodyContent,
    },
  ];
}
