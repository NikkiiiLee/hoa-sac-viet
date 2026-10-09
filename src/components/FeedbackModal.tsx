import React, { useState } from 'react';
import {
  X,
  Send,
  Loader2,
  Sparkles,
  MessageSquare,
  AlertCircle,
  Check,
} from 'lucide-react';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessSubmit: () => void;
}

const FEEDBACK_TOPICS = [
  {
    id: 'chuan_muc_co_phuc',
    icon: '👘',
    label: 'Góp ý về tính chuẩn mực cổ phục (Hữu nhậm, màu sắc, phom dáng)',
    shortTag: 'Chuẩn mực cổ phục',
  },
  {
    id: 'phu_kien_dong_ao',
    icon: '🪡',
    label: 'Đề xuất thêm phụ kiện / dòng áo mới',
    shortTag: 'Phụ kiện / Dòng áo mới',
  },
  {
    id: 'giao_dien_ai',
    icon: '💻',
    label: 'Báo lỗi giao diện hoặc gợi ý tính năng AI',
    shortTag: 'Giao diện & Tính năng AI',
  },
];

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  onClose,
  onSuccessSubmit,
}) => {
  const [selectedTopic, setSelectedTopic] = useState<string>(
    FEEDBACK_TOPICS[0].id
  );
  const [message, setMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = message.trim();
    if (trimmed.length < 5) {
      setErrorMessage(
        trimmed.length === 0
          ? 'Vui lòng nhập nội dung góp ý trước khi gửi'
          : 'Vui lòng nhập nội dung góp ý tối thiểu 5 ký tự'
      );
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);

    // Mock 0.5s loading spinner, save to localStorage, close & trigger Emerald Toast
    setTimeout(() => {
      try {
        const existingRaw = localStorage.getItem('hoasacviet_feedbacks');
        const existing = existingRaw ? JSON.parse(existingRaw) : [];
        const newFeedback = {
          id: `fb-${Date.now()}`,
          topicId: selectedTopic,
          topicLabel:
            FEEDBACK_TOPICS.find((t) => t.id === selectedTopic)?.label ||
            selectedTopic,
          message: trimmed,
          createdAt: new Date().toISOString(),
        };
        localStorage.setItem(
          'hoasacviet_feedbacks',
          JSON.stringify([newFeedback, ...(Array.isArray(existing) ? existing : [])])
        );
      } catch (err) {
        // Ignore storage errors
      }

      setIsSubmitting(false);
      setMessage('');
      onClose();
      onSuccessSubmit();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-[#FFFDF9] via-[#FAF7F2] to-[#F4EFE6] rounded-3xl border-2 border-[#D4AF37] shadow-2xl overflow-hidden ring-4 ring-[#D4AF37]/20 animate-in zoom-in-95 duration-200">
        {/* Top Ornamental Gold Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#B83227] via-[#D4AF37] to-[#1B3B6F]" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          disabled={isSubmitting}
          className="absolute top-4 right-4 p-1.5 text-[#7A6E5F] hover:text-[#2C241D] hover:bg-black/5 rounded-xl transition-colors cursor-pointer"
          title="Đóng cửa sổ"
        >
          <X className="w-5 h-5" />
        </button>

        <form onSubmit={handleSubmit} className="p-6 sm:p-7 space-y-5">
          {/* Modal Header */}
          <div className="space-y-2 pr-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 border border-[#D4AF37]/50 text-[#8A5A19] text-[10.5px] font-bold uppercase tracking-wider">
              <MessageSquare className="w-3 h-3 text-[#B83227]" />
              <span>Hòm Thư Tri Thức & Góp Ý Di Sản</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-black text-[#2C241D] leading-snug">
              Đồng Hành Gìn Giữ Hồn Cốt Dân Tộc
            </h2>
            <p className="text-xs text-[#5C5346] leading-relaxed">
              Họa Sắc Việt luôn trân trọng mọi đóng góp về tính chuẩn xác của trang phục truyền thống và trải nghiệm người dùng từ cộng đồng và các chuyên gia.
            </p>
          </div>

          {/* 1. Feedback Topic Selector (3 Pill Option Cards) */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#2C241D] flex items-center gap-1.5">
              <span>🏷️ Chọn Chủ Đề Góp Ý:</span>
            </label>
            <div className="space-y-2">
              {FEEDBACK_TOPICS.map((topic) => {
                const isSelected = selectedTopic === topic.id;
                return (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => setSelectedTopic(topic.id)}
                    className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center justify-between gap-2.5 cursor-pointer ${
                      isSelected
                        ? 'bg-amber-50/90 border-[#D4AF37] ring-2 ring-[#D4AF37]/30 text-[#2C241D] shadow-2xs'
                        : 'bg-white/90 border-[#E3DAC9] hover:border-[#D4AF37]/70 text-[#5C5346]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-base shrink-0">{topic.icon}</span>
                      <span
                        className={`text-xs leading-snug ${
                          isSelected ? 'font-bold text-[#2C241D]' : 'font-medium'
                        }`}
                      >
                        {topic.label}
                      </span>
                    </div>
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-[#B83227] border-[#B83227] text-white'
                          : 'border-[#D6CEBE] bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Message Textarea */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#2C241D]">
                📝 Lời Nhắn & Đóng Góp Của Bạn:
              </label>
              <span className="text-[10.5px] text-[#7A6E5F]">
                Tối thiểu 5 ký tự ({message.trim().length} ký tự)
              </span>
            </div>
            <div className={isShaking ? 'animate-shake' : ''}>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (errorMessage) setErrorMessage(null);
                }}
                placeholder="Nhập lời nhắn, góp ý văn hóa hoặc nhận xét của bạn tại đây..."
                className={`w-full p-3.5 text-xs bg-white rounded-2xl border text-[#2C241D] placeholder-[#9E9282] leading-relaxed transition-all focus:outline-hidden ${
                  errorMessage
                    ? 'border-[#B83227] ring-2 ring-[#B83227]/20 bg-red-50/30'
                    : 'border-[#D6CEBE] focus:border-amber-500 focus:ring-1 focus:ring-amber-500'
                }`}
              />
            </div>
            {errorMessage && (
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#B83227] pt-0.5 animate-in fade-in duration-150">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}
          </div>

          {/* 3. Action Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-[#E3DAC9]">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2.5 text-xs font-bold text-[#5C5346] hover:text-[#2C241D] bg-white hover:bg-[#EDE7DC] border border-[#D6CEBE] rounded-xl transition-colors cursor-pointer disabled:opacity-50"
            >
              Để Sau
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 text-xs font-bold text-white bg-[#B83227] hover:bg-[#99261c] rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer active:scale-98 disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-200" />
                  <span>Đang gửi phản hồi...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                  <span>✨ Gửi Góp Ý</span>
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
