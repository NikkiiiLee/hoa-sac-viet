import React, { useState, useRef } from 'react';
import { X, Upload, Check, Trash2, Camera, Sparkles } from 'lucide-react';

interface FaceSwapModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPhotoUrl?: string;
  onApplyPhoto: (photoUrl: string | undefined) => void;
}

export const FaceSwapModal: React.FC<FaceSwapModalProps> = ({
  isOpen,
  onClose,
  currentPhotoUrl,
  onApplyPhoto,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(currentPhotoUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onApplyPhoto(previewUrl);
    onClose();
  };

  const handleRemove = () => {
    setPreviewUrl(undefined);
    onApplyPhoto(undefined);
    if (fileInputRef.current) fileInputRef.current.value = '';
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-[#FAF7F2] rounded-2xl border border-[#D6CEBE] shadow-2xl overflow-hidden p-6 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E3DAC9] pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#B83227]/10 text-[#B83227] flex items-center justify-center">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-serif font-bold text-[#2C241D]">
                Thử Gương Mặt Vào Cổ Phục
              </h3>
              <p className="text-[11px] text-[#7A6E5F]">
                Tải ảnh chân dung để hóa thân thành nhân vật mặc trang phục
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#7A6E5F] hover:text-[#2C241D] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Upload & Preview Area */}
        <div className="flex flex-col items-center justify-center space-y-4">
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          {/* Oval Crop Preview */}
          <div className="relative w-36 h-44 rounded-[50%] border-2 border-dashed border-[#B83227] p-1 bg-white flex items-center justify-center overflow-hidden shadow-inner group">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Preview Gương Mặt"
                className="w-full h-full object-cover rounded-[50%]"
              />
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-full flex flex-col items-center justify-center text-center p-3 cursor-pointer hover:bg-[#FAF7F2] transition-colors"
              >
                <Upload className="w-6 h-6 text-[#B83227] mb-1" />
                <span className="text-xs font-medium text-[#2C241D]">
                  Bấm để tải ảnh selfie / chân dung
                </span>
                <span className="text-[10px] text-[#7A6E5F] mt-1">
                  Khuyến nghị ảnh góc thẳng rõ mặt
                </span>
              </div>
            )}
          </div>

          {previewUrl && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 text-xs font-medium text-[#1B3B6F] bg-white border border-[#D6CEBE] rounded-xl hover:bg-[#FAF7F2] transition-colors"
              >
                Đổi Ảnh Khác
              </button>
              <button
                onClick={() => setPreviewUrl(undefined)}
                className="px-3 py-1.5 text-xs font-medium text-[#B83227] bg-[#B83227]/10 hover:bg-[#B83227]/20 rounded-xl transition-colors flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Xóa Ảnh
              </button>
            </div>
          )}
        </div>

        {/* Tip Box */}
        <div className="p-3 bg-white rounded-xl border border-[#EDE7DC] text-[11px] text-[#5C5346] flex items-start gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
          <span>
            Ảnh chân dung sẽ được tự động bo góc oval và lồng ghép chính xác vào tỷ lệ khung đầu nhân vật cổ phục.
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-[#E3DAC9]">
          <button
            onClick={handleRemove}
            className="px-3 py-2 text-xs font-medium text-[#7A6E5F] hover:text-[#2C241D] transition-colors"
          >
            Dùng Mặt Mặc Định
          </button>

          <button
            onClick={handleSave}
            disabled={!previewUrl}
            className="px-5 py-2 text-xs font-medium text-white bg-[#B83227] hover:bg-[#99261c] disabled:opacity-50 disabled:pointer-events-none rounded-xl transition-all shadow-xs flex items-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5" />
            Áp Dụng Vào Nhân Vật
          </button>
        </div>
      </div>
    </div>
  );
};
