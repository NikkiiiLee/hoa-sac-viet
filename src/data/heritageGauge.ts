import { OutfitConfig } from '../types/costume';

export interface HeritagePenalty {
  id: string;
  label: string;
  penalty: number;
  reason: string;
  solution: string;
}

export interface HeritageAuthenticityResult {
  score: number;
  level: 'perfect' | 'good' | 'warning' | 'critical';
  statusText: string;
  badge: string;
  colorClass: string;
  barColor: string;
  isPerfect: boolean;
  penalties: HeritagePenalty[];
}

export function calculateHeritageAuthenticity(outfit: OutfitConfig): HeritageAuthenticityResult {
  const penalties: HeritagePenalty[] = [];

  // 1. Cài vạt Tả Nhận: -40% (Vi phạm cấm kỵ tang phục)
  if (outfit.lapelDirection === 'ta_nham') {
    penalties.push({
      id: 'ta_nham',
      label: 'Cài Vạt Tả Nhậm',
      penalty: 40,
      reason: 'Cài vạt Tả Nhậm (trái đè phải) là đại kỵ vì đây là quy chế chỉ dành riêng cho tang ma cõi Âm.',
      solution: 'Đổi sang cài Hữu Nhậm (phải đè trái) theo đạo Dương của người sống.',
    });
  }

  // 2. Quần short rách lộ đùi: -35% (Vi phạm phép tắc trang phục đoan trang)
  if (outfit.selectedBottom === 'quan_short_rach') {
    penalties.push({
      id: 'quan_short_rach',
      label: 'Quần Short Bò Rách',
      penalty: 35,
      reason: 'Đường xẻ tà cao của cổ phục để lộ quần short rách và đùi, phá vỡ sự đoan trang thanh lịch.',
      solution: 'Thay bằng Quần Lụa Trắng Ống Suông hoặc Chân Váy Xếp Ly dài kín đáo.',
    });
  }

  // 3. Phối trâm Thanh Triều / đai Obi Nhật: -30% (Lai căng văn hóa)
  if (outfit.selectedHeadwear === 'tram_cai_thanh_trieu') {
    penalties.push({
      id: 'tram_cai_thanh_trieu',
      label: 'Trâm Cài Mãn Thanh',
      penalty: 30,
      reason: 'Gắn trâm hoa bản lớn và móng vuốt triều Mãn Thanh (Trung Quốc) gây ngộ nhận văn hóa nghiêm trọng.',
      solution: 'Thay bằng Khăn Đóng Lụa hoàng triều hoặc Bờm Nhung hiện đại tối giản.',
    });
  }

  if (outfit.selectedOuterwear === 'dai_that_obi') {
    penalties.push({
      id: 'dai_that_obi',
      label: 'Đai Bản To Obi Kimono',
      penalty: 30,
      reason: 'Đai cứng Obi là đặc trưng của Kimono Nhật Bản, lai ghép làm méo mó dải đại đái lụa Đại Việt.',
      solution: 'Tháo bỏ đai cứng, để buông nguyên bản hoặc thắt dải lụa mềm mại.',
    });
  }

  // 4. Mặc độc yếm không áo khoác ra phố: -30% (Phản cảm)
  if (outfit.isSoloYem || outfit.selectedOuterwear === 'none_bare') {
    penalties.push({
      id: 'yem_tran_lung',
      label: 'Mặc Độc Yếm Trần Lưng',
      penalty: 30,
      reason: 'Yếm đào là nội y lót, phụ nữ xưa không bao giờ mặc độc yếm trần lưng ra nơi công cộng.',
      solution: 'Khoác thêm Áo Tứ Thân, Áo Ngũ Thân hoặc Blazer oversize ra bên ngoài.',
    });
  }

  // 5. Xắn tay áo Tấc lễ phục lên cẳng tay: -25% (Phá vỡ tính tôn nghiêm lễ nghi)
  if (outfit.garmentId === 'ao_tac' && outfit.isSleeveRolled) {
    penalties.push({
      id: 'xan_tay_ao_tac',
      label: 'Xắn Tay Áo Tấc Lễ Phục',
      penalty: 25,
      reason: 'Áo Tấc là Đại lễ phục uy nghiêm với tay thụng dài 30-40cm; xắn tay làm phá hỏng hoàn toàn phom dáng.',
      solution: 'Thả buông tay thụng tự nhiên, hoặc chuyển sang mặc Áo Ngũ Thân Tay Chẽn.',
    });
  }

  // 6. Phối Áo Tấc Huế với Nón Quai Thao Bắc Bộ: -20% (Lệch chuẩn thời kỳ & vùng miền)
  if (
    (outfit.garmentId === 'ao_tac' || outfit.garmentId === 'ao_chen') &&
    outfit.selectedHeadwear === 'non_quai_thao'
  ) {
    penalties.push({
      id: 'cross_region',
      label: 'Áo Tấc Huế + Nón Quai Thao',
      penalty: 20,
      reason: 'Lai ghép lễ phục hoàng triều Huế với nón quai thao của dân ca quan họ Kinh Bắc.',
      solution: 'Đổi phụ kiện đầu sang Khăn Đóng Huế để giữ trọn vẹn bản sắc vùng miền.',
    });
  }

  const totalDeductions = penalties.reduce((acc, p) => acc + p.penalty, 0);
  const score = Math.max(0, Math.min(100, 100 - totalDeductions));

  if (score === 100) {
    return {
      score: 100,
      level: 'perfect',
      statusText: 'Bảo tồn di sản vẹn nguyên',
      badge: '✓ Chuẩn Mực Tuyệt Đối',
      colorClass: 'text-emerald-700 bg-emerald-50 border-emerald-300',
      barColor: 'bg-emerald-500',
      isPerfect: true,
      penalties: [],
    };
  }

  if (score >= 90) {
    return {
      score,
      level: 'good',
      statusText: 'Bảo tồn di sản vẹn nguyên',
      badge: '✓ Chuẩn Mực Tuyệt Đối',
      colorClass: 'text-amber-800 bg-amber-50 border-amber-300',
      barColor: 'bg-amber-400',
      isPerfect: false,
      penalties,
    };
  }

  if (score >= 70) {
    return {
      score,
      level: 'warning',
      statusText: 'Cần cân nhắc phụ kiện vùng miền',
      badge: 'Lệch Nhẹ Vùng Miền',
      colorClass: 'text-yellow-800 bg-yellow-50 border-yellow-300',
      barColor: 'bg-yellow-500',
      isPerfect: false,
      penalties,
    };
  }

  return {
    score,
    level: 'critical',
    statusText: '⚠️ Phát hiện vi phạm quy chuẩn văn hóa',
    badge: '⚠️ Lệch Chuẩn Di Sản',
    colorClass: 'text-rose-800 bg-rose-50 border-rose-400',
    barColor: 'bg-rose-600 animate-pulse',
    isPerfect: false,
    penalties,
  };
}
