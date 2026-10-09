import React from 'react';
import { OutfitConfig, GarmentId } from '../types/costume';
import { COLOR_PALETTE, GARMENTS } from '../data/costumeData';
import {
  Sparkles,
  BookOpen,
  ShieldCheck,
  ArrowRight,
  GraduationCap,
  Coffee,
  Sun,
  Flame,
  CheckCircle2,
  AlertTriangle,
  Scroll,
  Layers,
  HeartHandshake,
  Compass,
} from 'lucide-react';

import heroImg from '../assets/images/hero_hoasacviet_remix_1790948938640.jpg';
import kyYeuImg from '../assets/images/concept_ky_yeu_1790948951049.jpg';
import phoThiImg from '../assets/images/concept_pho_thi_1790948968078.jpg';
import duXuanImg from '../assets/images/concept_du_xuan_1790948981273.jpg';

interface LandingPageProps {
  onNavigate: (tab: 'home' | 'studio' | 'heritage' | 'rules') => void;
  onApplyConcept: (updates: Partial<OutfitConfig>) => void;
  savedLookbookCount: number;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigate,
  onApplyConcept,
}) => {
  // Preset 1: Concept Kỷ Yếu Bách Niên
  const handleSelectKyYeu = () => {
    onApplyConcept({
      id: `outfit-kyyeu-${Date.now()}`,
      title: 'Kỷ Yếu Bách Niên (Áo Tấc x Sneaker Retro)',
      garmentId: 'ao_tac',
      mainColor: COLOR_PALETTE[2], // Tía Cung Đình (Đỏ Đô) #7A1C28
      innerColor: COLOR_PALETTE[12], // Trắng Ngà #F7F4EE
      bottomColor: COLOR_PALETTE[12], // Trắng Ngà
      selectedBottom: 'quan_lua_ong_suong',
      selectedHeadwear: 'khan_dong',
      selectedShoes: 'sneaker_trang_kem',
      selectedHandheld: 'quat_xep_giay_do',
      selectedOuterwear: 'none',
      backdropId: 'van_mieu',
      lightingId: 'nang_am',
      occasionId: 'tot_nghiep',
      lapelDirection: 'huu_nham',
      isSleeveRolled: false,
    });
  };

  // Preset 2: Concept Phố Thị Trí Thức
  const handleSelectPhoThi = () => {
    onApplyConcept({
      id: `outfit-phothi-${Date.now()}`,
      title: 'Phố Thị Trí Thức (Áo Chẽn x Blazer Oversize)',
      garmentId: 'ao_chen',
      mainColor: COLOR_PALETTE[4], // Xanh Chàm Đại Việt #1B3B6F
      innerColor: COLOR_PALETTE[12], // Trắng Ngà
      bottomColor: COLOR_PALETTE[12], // Trắng Ngà
      selectedBottom: 'quan_lua_ong_suong',
      selectedHeadwear: 'none',
      selectedShoes: 'loafer_da',
      selectedHandheld: 'quat_xep_giay_do',
      selectedOuterwear: 'blazer_oversize',
      backdropId: 'pho_co_hoi_an',
      lightingId: 'chieu_thu',
      occasionId: 'dao_pho',
      lapelDirection: 'huu_nham',
      isSleeveRolled: false,
    });
  };

  // Preset 3: Concept Du Xuân Trẩy Hội
  const handleSelectDuXuan = () => {
    onApplyConcept({
      id: `outfit-duxuan-${Date.now()}`,
      title: 'Du Xuân Trẩy Hội (Áo Tứ Thân x Nón Quai Thao)',
      garmentId: 'ao_tu_than',
      mainColor: COLOR_PALETTE[0], // Đỏ Chu Sa #B83227
      innerColor: COLOR_PALETTE[1], // Hồng Thắm Yếm Đào #D9536F
      bottomColor: COLOR_PALETTE[5], // Đen Thâm Mực Nho #1E1E22
      selectedBottom: 'vay_dup_lua_den',
      selectedHeadwear: 'non_quai_thao',
      selectedShoes: 'guoc_moc_truyen_thong',
      selectedHandheld: 'quat_xep_giay_do',
      selectedOuterwear: 'none',
      backdropId: 'pho_co_hoi_an',
      lightingId: 'nang_am',
      occasionId: 'tet_dam_ngo',
      lapelDirection: 'huu_nham',
      isSleeveRolled: false,
    });
  };

  return (
    <div className="w-full space-y-20 pb-16">
      {/* ========================================================
          PHÂN ĐOẠN 1: HERO SECTION (BÙNG NỔ THỊ GIÁC & SLOGAN)
         ======================================================== */}
      <section className="relative pt-6 sm:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Cột trái: Nội dung tuyên ngôn & Kêu gọi hành động (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Tagline định vị */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#B83227]/10 border border-[#B83227]/25 text-[#B83227] text-xs font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#B83227] animate-pulse" />
              <span>Nền tảng Phối Đồ Cổ Phục Đương Đại cho Thế Hệ Trẻ</span>
            </div>

            {/* Tiêu đề lớn nghệ thuật */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black text-[#2C241D] leading-[1.15] tracking-tight">
              Họa Sắc Việt – <br className="hidden sm:inline" />
              <span className="text-[#B83227] bg-gradient-to-r from-[#B83227] via-[#C93B2B] to-[#D4AF37] bg-clip-text text-transparent">
                Nét Cổ Truyền,
              </span>{' '}
              Dáng Thời Nay
            </h1>

            {/* Phụ đề truyền cảm hứng */}
            <p className="text-base sm:text-lg text-[#5C5346] leading-relaxed max-w-2xl font-normal">
              Trợ lý AI Stylist tiên phong giúp thế hệ trẻ khám phá, tự tay remix
              cổ phục và gìn giữ trọn vẹn hồn cốt dân tộc trong từng nhịp thở
              đương đại. Thượng tôn quy chuẩn, vững bước tương lai.
            </p>

            {/* Cụm 2 nút bấm Call-to-Action */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                onClick={() => onNavigate('studio')}
                className="px-6 py-3.5 text-sm sm:text-base font-bold text-white bg-[#B83227] hover:bg-[#9E2A20] active:scale-95 rounded-2xl shadow-lg shadow-[#B83227]/25 transition-all flex items-center justify-center gap-2.5 cursor-pointer group"
              >
                <Sparkles className="w-4 h-4 text-amber-300 group-hover:rotate-12 transition-transform" />
                <span>Trải Nghiệm Studio Phối Đồ</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate('heritage')}
                className="px-6 py-3.5 text-sm sm:text-base font-semibold text-[#1B3B6F] bg-white hover:bg-[#FAF7F2] active:scale-95 border-2 border-[#D4AF37]/60 hover:border-[#D4AF37] rounded-2xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-[#D4AF37]" />
                <span>Khám Phá Kho Tàng Di Sản</span>
              </button>
            </div>

            {/* Trust points nhỏ dưới CTA */}
            <div className="pt-3 border-t border-[#E3DAC9] flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#7A6E5F]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#B83227]" />
                Hệ Ngũ Sắc Tương Sinh
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#B83227]" />
                Chuẩn Hữu Nhậm 100%
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#B83227]" />
                Xuất Thẻ Tạp Chí 9:16
              </span>
            </div>
          </div>

          {/* Cột phải: Khung ảnh tạp chí nghệ thuật dạng lồng lớp (Layered Collage Card) (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Lớp nền đổ bóng trang trí mỹ cảm Á Đông */}
              <div className="absolute -inset-3 bg-gradient-to-tr from-[#B83227]/20 via-[#D4AF37]/20 to-[#1B3B6F]/20 rounded-3xl blur-xl opacity-70 transform rotate-1" />

              {/* Khung thẻ chính */}
              <div className="relative bg-[#FFFDF9] rounded-3xl border-2 border-[#D6CEBE] p-4 sm:p-5 shadow-2xl space-y-3.5">
                {/* Visual Banner */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#EDE7DC] group">
                  <img
                    src={heroImg}
                    alt="Người trẻ Việt diện Áo Ngũ Thân Chẽn phối Blazer và Sneaker"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                  {/* Nhãn gắn trực tiếp trên ảnh */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] font-mono tracking-wider uppercase bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-md inline-block mb-1">
                      Phong Cách: Neo-Heritage Smart Casual
                    </span>
                    <h4 className="text-base font-serif font-bold text-white drop-shadow-sm">
                      Áo Ngũ Thân Chẽn · Blazer Mỏng · Sneaker Trắng
                    </h4>
                  </div>
                </div>

                {/* Huy hiệu nổi bật cam kết chuẩn mực */}
                <div className="p-3 bg-[#FAF7F2] rounded-2xl border border-[#EDE7DC] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-emerald-700/10 text-emerald-800 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-5 h-5 text-emerald-700" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#2C241D] block">
                        ✓ 100% Chuẩn Mực Văn Hóa
                      </span>
                      <span className="text-[11px] text-[#7A6E5F]">
                        Khuyên dùng cho Học sinh, Sinh viên & Gen Z
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => onNavigate('studio')}
                    className="px-3 py-1.5 text-xs font-bold text-[#B83227] bg-[#B83227]/10 hover:bg-[#B83227] hover:text-white rounded-xl transition-all whitespace-nowrap cursor-pointer"
                  >
                    Xem Chi Tiết ➔
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          PHÂN ĐOẠN 2: VÌ SAO CHỌN CHÚNG TÔI (3 TRỤ CỘT CỐT LÕI)
         ======================================================== */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold tracking-widest uppercase text-[#B83227] block">
            Trụ Cột Cốt Lõi
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#2C241D]">
            Vì Sao Chọn Họa Sắc Việt?
          </h2>
          <p className="text-sm text-[#5C5346] leading-relaxed">
            Sự dung hợp hoàn hảo giữa công nghệ AI tiên phong và tri thức khảo cứu
            cổ phục nghiêm cẩn từ các chuyên gia di sản.
          </p>
        </div>

        {/* Lưới 3 Trụ Cột */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Trụ Cột 1 */}
          <div className="p-6 bg-white rounded-3xl border border-[#D6CEBE] hover:border-[#D4AF37] shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#7C3AED]/10 text-[#7C3AED] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#7A6E5F]">
                  Trụ Cột 01
                </span>
                <h3 className="text-xl font-serif font-bold text-[#2C241D]">
                  AI Stylist Thông Minh Theo Ngữ Cảnh
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#5C5346] leading-relaxed">
                Tự động phân tích thời tiết thực tế, địa điểm check-in và tính chất
                sự kiện (Kỷ yếu, dạo phố cafe, trẩy hội du xuân) để gợi ý set đồ
                vừa tôn dáng, vừa êm ái di chuyển suốt ngày dài.
              </p>
            </div>

            <div className="pt-5 mt-5 border-t border-[#EDE7DC]">
              <button
                onClick={() => onNavigate('studio')}
                className="text-xs font-bold text-[#7C3AED] hover:text-[#5B21B6] inline-flex items-center gap-1.5 cursor-pointer"
              >
                Trải nghiệm Stylist AI ➔
              </button>
            </div>
          </div>

          {/* Trụ Cột 2 */}
          <div className="p-6 bg-white rounded-3xl border border-[#D6CEBE] hover:border-[#D4AF37] shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/15 text-[#B38022] flex items-center justify-center group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#7A6E5F]">
                  Trụ Cột 02
                </span>
                <h3 className="text-xl font-serif font-bold text-[#2C241D]">
                  Thẻ Tri Thức Văn Hóa 30 Giây
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#5C5346] leading-relaxed">
                Giải mã ý nghĩa thâm sâu của tiền nhân chỉ trong một chạm: 5 cúc
                Ngũ Thường (Nhân – Lễ – Nghĩa – Trí – Tín), Đạo cài vạt Hữu Nhậm,
                và triết lý Tứ Thân Phụ Mẫu bao bọc chở che.
              </p>
            </div>

            <div className="pt-5 mt-5 border-t border-[#EDE7DC]">
              <button
                onClick={() => onNavigate('heritage')}
                className="text-xs font-bold text-[#B38022] hover:text-[#8D6114] inline-flex items-center gap-1.5 cursor-pointer"
              >
                Đọc thẻ tri thức ➔
              </button>
            </div>
          </div>

          {/* Trụ Cột 3 */}
          <div className="p-6 bg-white rounded-3xl border border-[#D6CEBE] hover:border-[#B83227] shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#B83227]/10 text-[#B83227] flex items-center justify-center group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#7A6E5F]">
                  Trụ Cột 03
                </span>
                <h3 className="text-xl font-serif font-bold text-[#2C241D]">
                  Bộ Lọc Cảnh Báo Lệch Chuẩn
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#5C5346] leading-relaxed">
                Bộ kiểm duyệt thông minh tự động ngăn chặn các lỗi phối lai căng,
                phản cảm (như cài vạt tả nhậm tang ma, mặc short rách đáy hở hay
                đai thắt Obi Nhật) nhằm bảo vệ tính nguyên bản của di sản.
              </p>
            </div>

            <div className="pt-5 mt-5 border-t border-[#EDE7DC]">
              <button
                onClick={() => onNavigate('rules')}
                className="text-xs font-bold text-[#B83227] hover:text-[#99261c] inline-flex items-center gap-1.5 cursor-pointer"
              >
                Xem quy chuẩn bảo tồn ➔
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          PHÂN ĐOẠN 3: BỘ SƯU TẬP 1-CLICK (QUICK-START PRESETS)
         ======================================================== */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold tracking-widest uppercase text-[#B83227] block">
              Bộ Sưu Tập Khởi Tạo 1 Chạm
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#2C241D]">
              Concept Phối Đồ Sẵn Cho Mọi Dịp
            </h2>
            <p className="text-sm text-[#5C5346]">
              Chọn nhanh một concept dưới đây để đưa ngay vào Canvas nhân vật
              và cá nhân hóa theo phong cách của riêng bạn.
            </p>
          </div>

          <button
            onClick={() => onNavigate('studio')}
            className="text-xs font-bold text-[#B83227] hover:underline self-start sm:self-auto cursor-pointer"
          >
            Mở toàn bộ Studio ➔
          </button>
        </div>

        {/* Lưới 3 Thẻ Concept */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Concept 1: Kỷ Yếu Bách Niên */}
          <div className="bg-white rounded-3xl border border-[#D6CEBE] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={kyYeuImg}
                  alt="Concept Kỷ Yếu Bách Niên"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-[#B83227] text-white text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Kỷ Yếu Tốt Nghiệp</span>
                </div>
              </div>

              <div className="p-5 space-y-3">
                <h3 className="text-xl font-serif font-bold text-[#2C241D] group-hover:text-[#B83227] transition-colors">
                  Concept Kỷ Yếu Bách Niên
                </h3>
                <div className="text-xs text-[#7A6E5F] space-y-1">
                  <p>
                    <strong className="text-[#2C241D]">Dáng áo:</strong> Áo Tấc
                    tay thụng hoàng triều (Triều Nguyễn)
                  </p>
                  <p>
                    <strong className="text-[#2C241D]">Remix:</strong> Sneaker
                    retro kem, Khăn đóng & Quạt xếp
                  </p>
                  <p>
                    <strong className="text-[#2C241D]">Thần thái:</strong> Đĩnh
                    đạc, trang nghiêm cho ngày lễ tốt nghiệp nhưng vẫn năng động,
                    êm chân.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <button
                onClick={handleSelectKyYeu}
                className="w-full py-2.5 px-4 text-xs font-bold text-white bg-[#B83227] hover:bg-[#9E2A20] active:scale-95 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>✦ Phối Set Kỷ Yếu Này</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Concept 2: Phố Thị Trí Thức */}
          <div className="bg-white rounded-3xl border border-[#D6CEBE] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={phoThiImg}
                  alt="Concept Phố Thị Trí Thức"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-[#1B3B6F] text-white text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1.5">
                  <Coffee className="w-3.5 h-3.5" />
                  <span>Dạo Phố & Cafe</span>
                </div>
              </div>

              <div className="p-5 space-y-3">
                <h3 className="text-xl font-serif font-bold text-[#2C241D] group-hover:text-[#1B3B6F] transition-colors">
                  Concept Phố Thị Trí Thức
                </h3>
                <div className="text-xs text-[#7A6E5F] space-y-1">
                  <p>
                    <strong className="text-[#2C241D]">Dáng áo:</strong> Áo Chẽn
                    ngũ thân ôm gọn sắc Xanh Chàm
                  </p>
                  <p>
                    <strong className="text-[#2C241D]">Remix:</strong> Blazer
                    oversize mỏng, Loafer da & Túi canvas
                  </p>
                  <p>
                    <strong className="text-[#2C241D]">Thần thái:</strong> Thanh
                    lịch, hiện đại, chuẩn phong cách Smart Casual dạo phố cuối
                    tuần.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <button
                onClick={handleSelectPhoThi}
                className="w-full py-2.5 px-4 text-xs font-bold text-white bg-[#1B3B6F] hover:bg-[#142d54] active:scale-95 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>✦ Phối Set Phố Thị Này</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Concept 3: Du Xuân Trẩy Hội */}
          <div className="bg-white rounded-3xl border border-[#D6CEBE] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={duXuanImg}
                  alt="Concept Du Xuân Trẩy Hội"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-[#D4AF37] text-white text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1.5">
                  <Sun className="w-3.5 h-3.5" />
                  <span>Du Xuân & Lễ Hội</span>
                </div>
              </div>

              <div className="p-5 space-y-3">
                <h3 className="text-xl font-serif font-bold text-[#2C241D] group-hover:text-[#D4AF37] transition-colors">
                  Concept Du Xuân Trẩy Hội
                </h3>
                <div className="text-xs text-[#7A6E5F] space-y-1">
                  <p>
                    <strong className="text-[#2C241D]">Dáng áo:</strong> Áo Tứ
                    Thân Kinh Bắc / Yếm Hồng Thắm
                  </p>
                  <p>
                    <strong className="text-[#2C241D]">Remix:</strong> Nón quai
                    thao, Váy đụp lụa đen & Quạt lụa đỏ
                  </p>
                  <p>
                    <strong className="text-[#2C241D]">Thần thái:</strong> Duyên
                    dáng, phóng khoáng, nổi bật trong mọi khung hình Tết truyền
                    thống.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <button
                onClick={handleSelectDuXuan}
                className="w-full py-2.5 px-4 text-xs font-bold text-white bg-[#B83227] hover:bg-[#9E2A20] active:scale-95 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>✦ Phối Set Du Xuân Này</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          PHÂN ĐOẠN 4: BANNER CHUYỂN TIẾP (CALL-TO-ACTION BANNER)
         ======================================================== */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#1B3B6F] via-[#244580] to-[#0F2347] text-white p-8 sm:p-12 shadow-2xl border-2 border-[#D4AF37]/50">
        {/* Họa tiết hoa văn mây thủy mặc Á Đông mờ */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-5">
          <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] block font-semibold">
            ✦ Dệt Tương Lai Từ Nét Xưa ✦
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-black text-white leading-tight">
            Bạn đã sẵn sàng tạo nên bản phối di sản của riêng mình?
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-xl mx-auto">
            Hàng ngàn sắc thái cổ truyền, bối cảnh danh thắng di tích và các dáng
            áo ngũ thân, giao lĩnh, tứ thân đang chờ bạn thử nghiệm.
          </p>

          <div className="pt-2">
            <button
              onClick={() => onNavigate('studio')}
              className="px-8 py-3.5 text-sm sm:text-base font-black text-[#1B3B6F] bg-gradient-to-r from-[#FEE180] via-[#D4AF37] to-[#B38022] hover:brightness-110 active:scale-95 rounded-2xl shadow-xl transition-all cursor-pointer inline-flex items-center gap-2.5"
            >
              <span>🚀 Bắt Đầu Phối Đồ Ngay</span>
              <ArrowRight className="w-4 h-4 text-[#1B3B6F]" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
