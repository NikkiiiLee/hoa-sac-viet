import React from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  CheckCircle,
  XCircle,
  Sparkles,
  ArrowRight,
  BookOpen,
  Info,
  Scale,
} from 'lucide-react';

interface HeritageRulesGuideProps {
  onGoToStudio: () => void;
}

export const HeritageRulesGuide: React.FC<HeritageRulesGuideProps> = ({
  onGoToStudio,
}) => {
  const dos = [
    {
      title: 'Luôn Cài Vạt Hữu Nhậm',
      detail:
        'Vạt bên phải đè lên vạt bên trái khi cài khuy hoặc buộc vạt. Đây là quy chuẩn thượng tôn của người sống (Dương khí), tượng trưng cho sự chính trực và trật tự luân thường.',
      tag: 'Bắt Buộc 100%',
    },
    {
      title: 'Trang Phục Đáy Phải Kín Đáo',
      detail:
        'Khi diện áo tấc, ngũ thân hay áo dài có đường xẻ hông, đáy quần bên trong phải luôn kín đáo. Ưu tiên quần lụa ống suông mềm, quần âu tối giản hoặc chân váy maxi lịch thiệp.',
      tag: 'Chuẩn Mực Phom Dáng',
    },
    {
      title: 'Giữ Tay Áo Tấc Buông Thõng Khi Hành Lễ',
      detail:
        'Áo Tấc là Đại lễ phục tôn nghiêm. Khi tham dự nghi lễ hoặc chụp ảnh kỷ yếu trang trọng, ống tay thụng dài buông tự nhiên thể hiện phong thái ung dung, khoan thai của sĩ phu.',
      tag: 'Lễ Phục Triều Nguyễn',
    },
    {
      title: 'Luôn Khoác Áo Khi Mặc Yếm Ra Phố',
      detail:
        'Yếm đào là đồ lót cổ truyền. Khi dạo phố, hãy luôn kết hợp cùng áo tứ thân mỏng, duster cardigan hoặc áo cánh nhẹ nhàng bên ngoài để tôn vẻ duyên thầm tế nhị.',
      tag: 'Duyên Dáng Dân Gian',
    },
    {
      title: 'Phối Phụ Kiện Đương Đại Có Tiết Chế',
      detail:
        'Hoan nghênh các phụ kiện Gen Z năng động như Sneaker retro trắng, giày Loafer da, túi tote canvas, kính mắt gọng kim loại thanh mảnh làm bật cá tính người mặc.',
      tag: 'Remix Sáng Tạo',
    },
    {
      title: 'Hài Hòa Ngũ Hành Tương Sinh',
      detail:
        'Chọn màu sắc áo chính, lớp lót và quần theo thuyết Ngũ Hành (Kim sinh Thủy, Thủy sinh Mộc, Mộc sinh Hỏa, Hỏa sinh Thổ, Thổ sinh Kim) để tạo luồng khí trường an lành.',
      tag: 'Mỹ Cảm Triết Lý',
    },
  ];

  const donts = [
    {
      title: 'Tuyệt Đối Không Cài Vạt Tả Nhậm',
      detail:
        'Cài vạt trái đè lên vạt phải (Tả nhậm) là đại nghịch văn hóa. Trong truyền thống Việt Nam, kiểu cài này chỉ dành riêng cho người đã khuất khi khâm liệm tang lễ.',
      severity: 'Đại Kỵ Tuyệt Đối',
    },
    {
      title: 'Không Mặc Quần Short Rách, Váy Ngắn Cũn',
      detail:
        'Đường xẻ tà cao của áo dài và áo ngũ thân sẽ làm lộ toàn bộ vùng đùi nếu mặc short rách hoặc váy quá ngắn, gây phản cảm thị giác và làm tổn hại mỹ cảm quốc phục.',
      severity: 'Phản Cảm Thẩm Mỹ',
    },
    {
      title: 'Không Tùy Tiện Xắn Tay Áo Tấc',
      detail:
        'Xắn gập tay thụng của Áo Tấc làm gãy nếp áo đại lễ và làm biến dạng hoàn toàn phom dáng cung đình. Nếu cần vận động linh hoạt, hãy chọn Áo Ngũ Thân Tay Chẽn.',
      severity: 'Sai Phom Dáng',
    },
    {
      title: 'Không Mặc Độc Chiếc Yếm Nơi Công Cộng',
      detail:
        'Việc mặc độc một chiếc yếm hở lưng hoàn toàn đi lại ở đền chùa, di tích lịch sử hoặc trên đường phố bị cộng đồng lên án vì đánh mất sự đoan trang của phụ nữ Việt.',
      severity: 'Lệch Chuẩn Ứng Xử',
    },
    {
      title: 'Không Lai Ghép Phụ Kiện Ngoại Lai',
      detail:
        'Tuyệt đối không thắt đai Obi to bản của Kimono Nhật Bản thay cho đại đái lụa; không cài trâm rủ bản lớn của phi tần Mãn Thanh lên khăn vấn hay tóc Việt Nam.',
      severity: 'Lai Căng Bản Sắc',
    },
    {
      title: 'Tránh Ráp Nối Vùng Miền Lộn Xộn',
      detail:
        'Áo Tấc là biểu tượng cung đình Huế (miền Trung / Nam), không nên kết hợp tùy tiện với Nón Quai Thao của quan họ Bắc Ninh nếu không có ý niệm nghệ thuật chỉn chu.',
      severity: 'Lệch Ngữ Cảnh',
    },
  ];

  return (
    <div className="space-y-12 pb-16">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B83227]/10 text-[#B83227] text-xs font-semibold">
          <Scale className="w-3.5 h-3.5" />
          <span>Cẩm Nang Bảo Tồn & Thượng Tôn Quy Chuẩn</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-black text-[#2C241D] tracking-tight">
          Quy Chuẩn Cổ Phục & Cảnh Giới Cần Tránh
        </h1>
        <p className="text-sm sm:text-base text-[#5C5346] leading-relaxed">
          Sáng tạo đương đại luôn cần đi đôi với sự hiểu biết và kính trọng tiền
          nhân. Dưới đây là bảng đối chiếu trực quan Do's (Nên làm) và Don'ts
          (Cần tránh) đã được lập trình sẵn vào bộ lọc bảo vệ của Họa Sắc Việt.
        </p>
      </div>

      {/* Grid 2 Cột: DO'S vs DON'TS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* CỘT NÊN LÀM (DO'S) */}
        <div className="p-6 sm:p-8 bg-emerald-50/50 rounded-3xl border-2 border-emerald-200 shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-emerald-200/80 pb-4">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-700 font-bold block">
                Khuyến Nghị Chuẩn Mực
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-black text-emerald-950">
                NÊN LÀM (DO'S)
              </h2>
            </div>
          </div>

          <div className="space-y-4">
            {dos.map((item, idx) => (
              <div
                key={idx}
                className="p-4 bg-white/90 rounded-2xl border border-emerald-100 shadow-2xs space-y-1.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 font-serif font-bold text-sm sm:text-base text-emerald-950">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      {idx + 1}. {item.title}
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md shrink-0">
                    {item.tag}
                  </span>
                </div>
                <p className="text-xs text-[#5C5346] leading-relaxed pl-6">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CỘT KHÔNG ĐƯỢC LÀM (DON'TS) */}
        <div className="p-6 sm:p-8 bg-red-50/50 rounded-3xl border-2 border-red-200 shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-red-200/80 pb-4">
            <div className="w-10 h-10 rounded-2xl bg-[#B83227] text-white flex items-center justify-center shrink-0 shadow-xs">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#B83227] font-bold block">
                Cảnh Báo Lệch Chuẩn
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-black text-red-950">
                KHÔNG ĐƯỢC LÀM (DON'TS)
              </h2>
            </div>
          </div>

          <div className="space-y-4">
            {donts.map((item, idx) => (
              <div
                key={idx}
                className="p-4 bg-white/90 rounded-2xl border border-red-100 shadow-2xs space-y-1.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 font-serif font-bold text-sm sm:text-base text-red-950">
                    <XCircle className="w-4 h-4 text-[#B83227] shrink-0" />
                    <span>
                      {idx + 1}. {item.title}
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold text-red-700 bg-red-100 px-2 py-0.5 rounded-md shrink-0">
                    {item.severity}
                  </span>
                </div>
                <p className="text-xs text-[#5C5346] leading-relaxed pl-6">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Deep Dive: Vì sao không Tả Nhậm? */}
      <div className="p-6 sm:p-8 bg-white rounded-3xl border border-[#D6CEBE] shadow-xs space-y-4">
        <div className="flex items-center gap-2.5 text-[#B83227]">
          <BookOpen className="w-5 h-5" />
          <h3 className="text-lg font-serif font-bold text-[#2C241D]">
            Giải Mã Lịch Sử: Vì Sao Tả Nhậm Là Cấm Kỵ Lớn Nhất?
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-[#5C5346] leading-relaxed">
          Trong triết lý Nho giáo và văn hóa Á Đông hàng ngàn năm, bên phải (Hữu)
          thuộc Dương, tượng trưng cho ánh sáng mặt trời, sự phát triển, sinh
          sôi và trật tự của thế giới người sống. Bên trái (Tả) thuộc Âm, tượng
          trưng cho bóng tối, sự kết thúc và thế giới người đã khuất. Khi người
          sống cài vạt Tả nhậm, đó bị xem là biểu hiện của tang ma, điềm xấu và
          nghịch lại quy luật đất trời. Tại triều Nguyễn, quy định phục sức Hữu
          nhậm được ghi chép nghiêm ngặt trong Khâm Định Đại Nam Hội Điển Sự Lệ.
        </p>
      </div>

      {/* Call to Action: Thử phối đồ đúng chuẩn */}
      <div className="p-6 bg-gradient-to-r from-[#FAF7F2] to-[#FFFDF9] rounded-3xl border-2 border-[#D4AF37] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <h4 className="text-base font-serif font-bold text-[#2C241D]">
            Bạn Muốn Kiểm Thử Trang Phục Đang Phối?
          </h4>
          <p className="text-xs text-[#5C5346]">
            Studio của Họa Sắc Việt tích hợp thanh quét vi phạm di sản theo thời
            gian thực cùng nút sửa chữa 1-Click tự động.
          </p>
        </div>
        <button
          onClick={onGoToStudio}
          className="px-6 py-3 text-xs sm:text-sm font-bold text-white bg-[#B83227] hover:bg-[#9E2A20] active:scale-95 rounded-2xl shadow-xs transition-all flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Vào Studio Phối Đồ Ngay</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
