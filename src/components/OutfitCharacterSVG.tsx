import React, { useId } from 'react';
import { OutfitConfig } from '../types/costume';

interface OutfitCharacterSVGProps {
  outfit: OutfitConfig;
  className?: string;
  showSeal?: boolean;
}

export const OutfitCharacterSVG: React.FC<OutfitCharacterSVGProps> = ({
  outfit,
  className = 'w-full h-full drop-shadow-md select-none',
  showSeal = true,
}) => {
  const uid = useId().replace(/:/g, '_');
  const isMale = outfit.gender === 'male';

  // Body Dimensions & Proportion Calculations
  const height = outfit.heightCm ?? (isMale ? 172 : 162);
  const weight = outfit.weightKg ?? (isMale ? 65 : 52);

  // SKELETAL RIGGING & ANATOMICAL PROPORTION ENGINE (TỶ LỆ KHUNG XƯƠNG THEO CHIỀU CAO & CÂN NẶNG)
  const refHeight = isMale ? 172 : 162;
  const refWeight = isMale ? 65 : 52;
  const deltaH = height - refHeight;
  const deltaW = weight - refWeight;

  const scaleX = Math.max(0.85, Math.min(1.22, 1 + deltaW * (isMale ? 0.0044 : 0.0038)));
  const scaleY = Math.max(0.88, Math.min(1.15, 1 + deltaH * 0.0034));

  // Cranial Rig Compensation
  const headCompX = Math.max(0.92, Math.min(1.08, Math.pow(scaleX, -0.38)));
  const headCompY = Math.max(0.92, Math.min(1.08, Math.pow(scaleY, -0.42)));

  const silkTextureId = `silkTexture_${uid}`;
  const robeShadeId = `robeShade_${uid}`;
  const bodySkinShadeId = `bodySkinShade_${uid}`;
  const legSkinShadeId = `legSkinShade_${uid}`;
  const userFaceClipId = `userFaceClip_${uid}`;

  const isSkirtActive = !isMale && (outfit.selectedBottom === 'chan_vay_midi_xep_ly' || outfit.selectedBottom === 'vay_dup_tham');

  return (
    <svg viewBox="0 0 300 420" preserveAspectRatio="xMidYMax meet" className={className}>
      <defs>
        {/* Pattern for Silk Weave */}
        <pattern id={silkTextureId} width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 0 5 L 10 5 M 5 0 L 5 10" stroke="#000000" strokeWidth="0.3" strokeOpacity="0.08" />
        </pattern>
        {/* Shading */}
        <linearGradient id={robeShadeId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.12" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.18" />
        </linearGradient>
        {/* Natural Skin Tones Gradient for Character Body */}
        <linearGradient id={bodySkinShadeId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#E4BAA1" />
          <stop offset="30%" stopColor="#F4CFBA" />
          <stop offset="70%" stopColor="#F9DDD0" />
          <stop offset="100%" stopColor="#DEAE95" />
        </linearGradient>
        <linearGradient id={legSkinShadeId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#E2B79F" />
          <stop offset="50%" stopColor="#F4CFBA" />
          <stop offset="100%" stopColor="#DEAE95" />
        </linearGradient>
        {/* Oval ClipPath for Face Swap */}
        <clipPath id={userFaceClipId}>
          <ellipse cx="150" cy="72" rx="20" ry="24" />
        </clipPath>
      </defs>

      {/* CHARACTER LAYERS SCALED DYNAMICALLY BY BODY PROPORTIONS (CHIỀU CAO & CÂN NẶNG) */}
      {/* TỶ LỆ MOCKUP TỔNG THỂ: THU NHỎ 88% VÀ DỊCH XUỐNG 30PX ĐỂ HẠ TRỌNG TÂM HÀI HÒA */}
      <g
        transform={`translate(0, 30) scale(0.88) translate(150, 384) scale(${scaleX.toFixed(3)}, ${scaleY.toFixed(3)}) translate(-150, -384)`}
        style={{ transformOrigin: '150px 384px' }}
        className="transition-transform duration-300"
      >
        {/* LAYER 0: REALISTIC CONTACT GROUND SHADOW (CHỐNG LƠ LỬNG) */}
        <g id={`ground-shadow_${uid}`} className="transition-opacity duration-300">
          <ellipse cx="150" cy="386" rx={isMale ? "76" : "64"} ry="9" fill="#1C1917" opacity="0.22" />
          <ellipse cx="150" cy="385" rx={isMale ? "56" : "46"} ry="6" fill="#1C1917" opacity="0.36" />
          {isMale ? (
            <>
              <ellipse cx="118" cy="384" rx="20" ry="4" fill="#0C0A09" opacity="0.65" />
              <ellipse cx="182" cy="384" rx="20" ry="4" fill="#0C0A09" opacity="0.65" />
            </>
          ) : (
            <>
              <ellipse cx="138" cy="384" rx="14" ry="3.5" fill="#0C0A09" opacity="0.6" />
              <ellipse cx="162" cy="384" rx="14" ry="3.5" fill="#0C0A09" opacity="0.6" />
            </>
          )}
        </g>

        {/* LAYER 1: LOWER BODY, PANTS/SKIRTS & FOOTWEAR (PHÂN BIỆT GIỚI TÍNH) */}
        <g className="transition-all duration-300">
          {outfit.selectedBottom === 'quan_short_rach' ? (
            <g>
              <rect x={isMale ? "120" : "130"} y="290" width="16" height="80" rx="4" fill={isMale ? "#E8C3AB" : "#FCEFE7"} />
              <rect x={isMale ? "164" : "154"} y="290" width="16" height="80" rx="4" fill={isMale ? "#E8C3AB" : "#FCEFE7"} />
              <path
                d={isMale ? "M114 260 L186 260 L184 292 L158 292 L154 276 L146 276 L142 292 L116 292 Z" : "M124 260 L176 260 L174 292 L156 292 L153 278 L147 278 L144 292 L126 292 Z"}
                fill="#5B7C99"
                stroke="#385470"
                strokeWidth="1.5"
              />
              <path d="M118 292 L120 295 L122 292 L125 295 L128 292 L132 295 L136 292 L142 292" stroke="#8EB1D4" strokeWidth="1" fill="none" />
              <path d="M158 292 L162 295 L166 292 L170 295 L174 292 L178 295 L182 292" stroke="#8EB1D4" strokeWidth="1" fill="none" />
            </g>
          ) : outfit.selectedBottom === 'vay_dup_tham' ? (
            isMale ? (
              // Nam: Quần suông đĩnh đạc (không mặc váy)
              <g>
                <path d="M114 228 L148 228 L144 372 L106 372 Z" fill="#1C1B1F" stroke="#121214" strokeWidth="0.5" />
                <path d="M152 228 L186 228 L194 372 L156 372 Z" fill="#1C1B1F" stroke="#121214" strokeWidth="0.5" />
              </g>
            ) : (
              // Nữ: Váy đụp thâm lụa Bắc Bộ hình thang xòe rộng ngang bắp chân
              <g id="skirt-vay-dup">
                <path
                  d="M134 218 L166 218 L202 364 Q150 371 98 364 Z"
                  fill="#1A181C"
                  stroke="#121114"
                  strokeWidth="0.8"
                />
                <path d="M137 220 Q125 290 114 364" stroke="#2D2B30" strokeWidth="0.9" fill="none" opacity="0.6" />
                <path d="M144 220 Q138 290 132 366" stroke="#2D2B30" strokeWidth="0.9" fill="none" opacity="0.6" />
                <path d="M150 220 Q150 295 150 368" stroke="#38363C" strokeWidth="1.1" fill="none" opacity="0.5" />
                <path d="M156 220 Q162 290 168 366" stroke="#2D2B30" strokeWidth="0.9" fill="none" opacity="0.6" />
                <path d="M163 220 Q175 290 186 364" stroke="#2D2B30" strokeWidth="0.9" fill="none" opacity="0.6" />
              </g>
            )
          ) : outfit.selectedBottom === 'chan_vay_midi_xep_ly' ? (
            isMale ? (
              // Nam: Quần suông đĩnh đạc (không mặc váy)
              <g>
                <path d="M114 228 L148 228 L144 372 L106 372 Z" fill={outfit.bottomColor.hex} stroke="#5C5346" strokeWidth="0.5" />
                <path d="M152 228 L186 228 L194 372 L156 372 Z" fill={outfit.bottomColor.hex} stroke="#5C5346" strokeWidth="0.5" />
              </g>
            ) : (
              // Nữ: Chân váy midi xếp ly (Remix): Hình thang xòe rộng ngang bắp chân với các nếp dập ly nan quạt
              <g id="skirt-chan-vay-midi">
                <rect x="136" y="348" width="8" height="25" rx="3" fill="#FCEFE7" stroke="#DEAE95" strokeWidth="0.4" />
                <rect x="156" y="348" width="8" height="25" rx="3" fill="#FCEFE7" stroke="#DEAE95" strokeWidth="0.4" />
                <path
                  d="M134 218 L166 218 L198 356 Q150 363 102 356 Z"
                  fill={outfit.bottomColor.hex}
                  stroke="#4A4036"
                  strokeWidth="0.6"
                />
                {[
                  { x1: 135, x2: 104 },
                  { x1: 137, x2: 110 },
                  { x1: 139, x2: 117 },
                  { x1: 142, x2: 124 },
                  { x1: 144, x2: 131 },
                  { x1: 147, x2: 138 },
                  { x1: 149, x2: 145 },
                  { x1: 151, x2: 152 },
                  { x1: 153, x2: 159 },
                  { x1: 156, x2: 166 },
                  { x1: 158, x2: 173 },
                  { x1: 161, x2: 180 },
                  { x1: 163, x2: 187 },
                  { x1: 165, x2: 194 },
                ].map((pleat, idx) => (
                  <g key={idx}>
                    <line
                      x1={pleat.x1}
                      y1={219}
                      x2={pleat.x2}
                      y2={356}
                      stroke="#000000"
                      strokeOpacity="0.14"
                      strokeWidth="0.9"
                    />
                    <line
                      x1={pleat.x1 + 0.8}
                      y1={219}
                      x2={pleat.x2 + 0.8}
                      y2={356}
                      stroke="#FFFFFF"
                      strokeOpacity="0.22"
                      strokeWidth="0.6"
                    />
                  </g>
                ))}
              </g>
            )
          ) : (
            // Quần lụa ống suông truyền thống: Nam mở rộng bằng vai vs Nữ khép chữ V đoan trang
            <g>
              {isMale ? (
                <>
                  <path
                    d="M112 220 L146 220 L142 372 L104 372 Z"
                    fill={outfit.bottomColor.hex}
                    stroke="#5C5346"
                    strokeWidth="0.5"
                  />
                  <path
                    d="M154 220 L188 220 L196 372 L158 372 Z"
                    fill={outfit.bottomColor.hex}
                    stroke="#5C5346"
                    strokeWidth="0.5"
                  />
                  <path d="M125 230 Q122 300 120 370" stroke="#000000" strokeWidth="0.5" strokeOpacity="0.12" fill="none" />
                  <path d="M175 230 Q178 300 180 370" stroke="#000000" strokeWidth="0.5" strokeOpacity="0.12" fill="none" />
                </>
              ) : (
                <>
                  <path
                    d="M126 224 L149 224 L146 372 L124 372 Z"
                    fill={outfit.bottomColor.hex}
                    stroke="#5C5346"
                    strokeWidth="0.5"
                  />
                  <path
                    d="M151 224 L174 224 L176 372 L154 372 Z"
                    fill={outfit.bottomColor.hex}
                    stroke="#5C5346"
                    strokeWidth="0.5"
                  />
                  <path d="M136 235 Q134 300 132 370" stroke="#000000" strokeWidth="0.4" strokeOpacity="0.1" fill="none" />
                  <path d="M164 235 Q166 300 168 370" stroke="#000000" strokeWidth="0.4" strokeOpacity="0.1" fill="none" />
                </>
              )}
            </g>
          )}

          {/* GIÀY / HÀI / GUỐC THEO GIỚI TÍNH */}
          <g>
            {outfit.selectedShoes === 'hai_theu_cung_dinh' ? (
              isMale ? (
                // Hài quan triều đình nam (mũi vuông vắn uy nghi)
                <g>
                  <path d="M106 372 Q118 368 130 372 L128 383 L106 383 Z" fill="#7A1C28" stroke="#4A1018" strokeWidth="0.6" />
                  <path d="M170 372 Q182 368 194 372 L194 383 L172 383 Z" fill="#7A1C28" stroke="#4A1018" strokeWidth="0.6" />
                  <line x1="110" y1="375" x2="126" y2="375" stroke="#D4AF37" strokeWidth="1" />
                  <line x1="174" y1="375" x2="190" y2="375" stroke="#D4AF37" strokeWidth="1" />
                </g>
              ) : (
                // Hài cong thêu hoa nữ (mũi hài hếch cong lên kiêu sa, hoa thêu nhụy vàng cung đình)
                <g>
                  <path d="M128 375 Q135 369 146 373 L145 382 Q136 383 129 380 Q127 377 128 375 Z" fill="#881B28" stroke="#4A1018" strokeWidth="0.5" />
                  <path d="M154 373 Q165 369 172 375 Q173 377 171 380 Q164 383 155 382 Z" fill="#881B28" stroke="#4A1018" strokeWidth="0.5" />
                  <circle cx="135" cy="377" r="1.5" fill="#D4AF37" />
                  <circle cx="165" cy="377" r="1.5" fill="#D4AF37" />
                  <path d="M132 377 Q135 375 138 377" stroke="#FFF" strokeWidth="0.6" fill="none" />
                  <path d="M162 377 Q165 375 168 377" stroke="#FFF" strokeWidth="0.6" fill="none" />
                </g>
              )
            ) : outfit.selectedShoes === 'guoc_moc_son_mai' ? (
              isMale ? (
                // Guốc mộc quai da đen nam (bản to vững chãi)
                <g>
                  <path d="M106 376 L130 376 L128 384 L108 384 Z" fill="#7C503C" />
                  <rect x="110" y="372" width="16" height="5" fill="#1C1917" rx="1" />
                  <path d="M170 376 L194 376 L192 384 L172 384 Z" fill="#7C503C" />
                  <rect x="174" y="372" width="16" height="5" fill="#1C1917" rx="1" />
                </g>
              ) : (
                // Guốc mộc thanh mảnh nữ (quai nhung đỏ son ôm chân)
                <g>
                  <path d="M129 376 L147 376 L145 383 L131 383 Z" fill="#8D5B4C" />
                  <rect x="133" y="373" width="11" height="4" fill="#B83227" rx="1" />
                  <path d="M153 376 L171 376 L169 383 L155 383 Z" fill="#8D5B4C" />
                  <rect x="157" y="373" width="11" height="4" fill="#B83227" rx="1" />
                </g>
              )
            ) : outfit.selectedShoes === 'mary_jane' ? (
              <g>
                <rect x={isMale ? "106" : "130"} y="372" width={isMale ? "24" : "18"} height="11" rx="4" fill="#1C1917" />
                <line x1={isMale ? "108" : "131"} y1="375" x2={isMale ? "128" : "147"} y2="375" stroke="#D4AF37" strokeWidth="1" />
                <rect x={isMale ? "170" : "152"} y="372" width={isMale ? "24" : "18"} height="11" rx="4" fill="#1C1917" />
                <line x1={isMale ? "172" : "153"} y1="375" x2={isMale ? "192" : "169"} y2="375" stroke="#D4AF37" strokeWidth="1" />
              </g>
            ) : outfit.selectedShoes === 'sneaker_retro' ? (
              <g>
                <rect x={isMale ? "104" : "128"} y="370" width={isMale ? "28" : "20"} height="12" rx="4" fill="#FFFFFF" stroke="#D1D5DB" />
                <rect x={isMale ? "102" : "127"} y="380" width={isMale ? "32" : "22"} height="4" rx="2" fill="#C5A059" />
                <rect x={isMale ? "168" : "152"} y="370" width={isMale ? "28" : "20"} height="12" rx="4" fill="#FFFFFF" stroke="#D1D5DB" />
                <rect x={isMale ? "166" : "151"} y="380" width={isMale ? "32" : "22"} height="4" rx="2" fill="#C5A059" />
              </g>
            ) : (
              isMale ? (
                <g>
                  <path d="M106 372 Q118 368 130 372 L128 383 L106 383 Z" fill="#291811" />
                  <path d="M170 372 Q182 368 194 372 L194 383 L172 383 Z" fill="#291811" />
                </g>
              ) : (
                <g>
                  <path d="M129 373 Q137 369 146 373 L145 382 L130 382 Z" fill="#291811" />
                  <path d="M154 373 Q163 369 171 373 L170 382 L155 382 Z" fill="#291811" />
                </g>
              )
            )}
          </g>
        </g>

        {/* LAYER 1.5: BASE ANATOMY NECK (DRAWN BEFORE ROBE SO COLLAR CLEANLY OVERLAYS) */}
        <g id={`base-neck_${uid}`} className="transition-all duration-300">
          <path
            d={
              isMale
                ? "M139 90 L135 118 L165 118 L161 90 Z"
                : "M141 94 L138 112 L162 112 L159 94 Z"
            }
            fill={isMale ? "#E8C3AB" : "#FCEFE7"}
          />
          {!isMale ? (
            <path d="M144 98 Q150 100 156 98" stroke="#E6C8B8" strokeWidth="0.6" fill="none" opacity="0.6" />
          ) : (
            <path d="M142 102 Q150 105 158 102" stroke="#D9A88F" strokeWidth="0.8" fill="none" opacity="0.6" />
          )}
        </g>

        {/* LAYER 2: INNER ROBE / YẾM */}
        {outfit.garmentId === 'ao_tu_than' ? (
          isMale ? (
            <g id={`inner-shirt-male_${uid}`}>
              <path
                d="M134 116 L166 116 L170 190 L130 190 Z"
                fill={outfit.innerColor.hex}
                stroke="#5C5346"
                strokeWidth="0.5"
              />
              <line x1="150" y1="116" x2="150" y2="190" stroke="#8D5B4C" strokeWidth="1" strokeDasharray="3,3" />
            </g>
          ) : (
            <g id={`inner-yem-female_${uid}`}>
              <path
                d="M136 122 L164 122 L172 170 L150 190 L128 170 Z"
                fill={outfit.innerColor.hex}
                stroke="#5C5346"
                strokeWidth="0.5"
              />
              <line x1="138" y1="122" x2="148" y2="108" stroke="#B83227" strokeWidth="1.5" />
              <line x1="162" y1="122" x2="152" y2="108" stroke="#B83227" strokeWidth="1.5" />
              <path
                d="M116 200 Q150 205 184 200 L182 212 Q150 216 118 212 Z"
                fill="#D4AF37"
                stroke="#8D5B4C"
                strokeWidth="0.5"
              />
              <path d="M146 210 Q142 245 138 270" stroke="#D4AF37" strokeWidth="3" fill="none" />
              <path d="M152 210 Q154 250 156 275" stroke="#B83227" strokeWidth="2.5" fill="none" />
            </g>
          )
        ) : (
          <path
            d="M138 108 L162 108 L160 120 L140 120 Z"
            fill={outfit.innerColor.hex}
            stroke="#5C5346"
            strokeWidth="0.5"
          />
        )}

        {/* LAYER 3: MAIN ROBE (PHOM QUẢ CHUÔNG CHỮ A NỮ VS CHỮ H THẲNG ĐỨNG NAM) */}
        {outfit.isSoloYem ? (
          <g className="transition-all duration-300">
            {/* Vai & Lưng trần */}
            <path
              d={isMale ? "M136 114 L114 126 C110 136 112 165 116 195 L124 234 L176 234 L184 195 C188 165 190 136 186 126 L164 114 Z" : "M136 116 L122 126 C118 136 120 165 124 195 L128 234 L172 234 L176 195 C180 165 182 136 178 126 L164 116 Z"}
              fill={isMale ? "#E8C3AB" : "#FCEFE7"}
              stroke="#E2B79F"
              strokeWidth="0.5"
            />
            <path d={isMale ? "M116 126 C104 150 98 185 100 226" : "M122 126 C112 150 108 185 112 226"} stroke={isMale ? "#E8C3AB" : "#FCEFE7"} strokeWidth="10" strokeLinecap="round" fill="none" />
            <path d={isMale ? "M184 126 C196 150 202 185 200 226" : "M178 126 C188 150 192 185 188 226"} stroke={isMale ? "#E8C3AB" : "#FCEFE7"} strokeWidth="10" strokeLinecap="round" fill="none" />

            {/* Yếm lụa đào */}
            <path
              d="M136 118 L164 118 L176 185 L150 215 L124 185 Z"
              fill={outfit.innerColor.hex}
              stroke="#B83227"
              strokeWidth="1.5"
            />
            <line x1="138" y1="118" x2="148" y2="100" stroke="#B83227" strokeWidth="2" />
            <line x1="162" y1="118" x2="152" y2="100" stroke="#B83227" strokeWidth="2" />
          </g>
        ) : (
          <g className="transition-all duration-300">
            {outfit.garmentId === 'ao_tu_than' ? (
              <g>
                <path
                  d="M136 116 L120 126 L124 190 L176 190 L180 126 L164 116 Z"
                  fill="#F7F3EB"
                  stroke="#E3DAC9"
                  strokeWidth="0.5"
                />
                <path
                  d="M136 118 L92 160 L102 320 L132 320 L136 190 Z"
                  fill={outfit.mainColor.hex}
                  stroke="#5C5346"
                  strokeWidth="0.5"
                />
                <path
                  d="M164 118 L208 160 L198 320 L168 320 L164 190 Z"
                  fill={outfit.mainColor.hex}
                  stroke="#5C5346"
                  strokeWidth="0.5"
                />
              </g>
            ) : outfit.garmentId === 'ao_giao_linh' ? (
              <g>
                <path
                  d="M134 116 L175 165 L180 230 L120 230 Z"
                  fill={outfit.innerColor.hex}
                  opacity="0.9"
                />
                <path
                  d={
                    outfit.lapelDirection === 'ta_nham'
                      ? isMale
                        ? 'M126 112 L192 185 L188 345 L112 345 L118 175 Z'
                        : 'M136 116 L192 185 L194 345 L106 345 C114 290 126 230 136 180 Z'
                      : isMale
                      ? 'M174 112 L108 185 L112 345 L188 345 L182 175 Z'
                      : 'M164 116 L108 185 L106 345 L194 345 C186 290 174 230 164 180 Z'
                  }
                  fill={outfit.mainColor.hex}
                  stroke="#5C5346"
                  strokeWidth="0.5"
                />
                <path d="M112 196 Q150 200 188 196 L186 210 Q150 214 114 210 Z" fill="#C08457" />
                <path d="M142 208 L138 290 L146 290 L150 208 Z" fill="#C08457" />
                <path d="M152 208 L156 280 L162 280 L158 208 Z" fill="#8D5B4C" />
              </g>
            ) : (
              <g>
                {/* THÂN ÁO (CHỮ A / PHOM SUÔNG LƯỢN NHẸ NỮ VS CHỮ H THẲNG ĐỨNG NAM) */}
                <path
                  d={
                    isMale
                      ? outfit.garmentId === 'ao_dai_cach_tan'
                        ? 'M126 112 L174 112 L182 170 L190 285 L110 285 L118 170 Z'
                        : outfit.garmentId === 'ao_dai_truyen_thong'
                        ? 'M126 112 L174 112 L180 170 L196 365 L104 365 L120 170 Z'
                        : 'M126 112 L174 112 L182 170 L192 345 L108 345 L118 170 Z'
                      : isSkirtActive && (outfit.garmentId === 'ao_dai_cach_tan' || outfit.garmentId === 'ao_chen' || outfit.garmentId === 'ao_tac')
                      ? 'M134 110 L166 110 C167 140 169 170 172 200 C175 220 177 240 180 258 Q150 264 120 258 C123 240 125 220 128 200 C131 170 133 140 134 110 Z'
                      : outfit.garmentId === 'ao_dai_cach_tan'
                      ? 'M134 110 L166 110 C167 140 169 170 172 200 C175 230 180 260 186 286 Q150 293 114 286 C120 260 125 230 128 200 C131 170 133 140 134 110 Z'
                      : outfit.garmentId === 'ao_dai_truyen_thong'
                      ? 'M134 110 L166 110 C167 140 169 175 172 205 C176 245 183 305 191 365 L109 365 C117 305 124 245 128 205 C131 175 133 140 134 110 Z'
                      : 'M134 110 L166 110 C167 140 169 175 172 205 C176 245 182 295 190 345 L110 345 C118 295 124 245 128 205 C131 175 133 140 134 110 Z'
                  }
                  fill={outfit.mainColor.hex}
                  stroke="#5C5346"
                  strokeWidth="0.5"
                />
                <path
                  d={
                    isMale
                      ? 'M126 112 L174 112 L182 170 L192 345 L108 345 L118 170 Z'
                      : 'M134 110 L166 110 C167 140 169 175 172 205 C176 245 182 295 190 345 L110 345 C118 295 124 245 128 205 C131 175 133 140 134 110 Z'
                  }
                  fill={`url(#${robeShadeId})`}
                />
                <path
                  d={
                    isMale
                      ? 'M126 112 L174 112 L182 170 L192 345 L108 345 L118 170 Z'
                      : 'M134 110 L166 110 C167 140 169 175 172 205 C176 245 182 295 190 345 L110 345 C118 295 124 245 128 205 C131 175 133 140 134 110 Z'
                  }
                  fill={`url(#${silkTextureId})`}
                />

                {/* CỔ LẬP LĨNH (CỔ ĐỨNG 2-3CM ÔM NHẸ DƯỚI CẰM, KHÔNG LỘ DA CỔ) */}
                <path
                  d={
                    isMale
                      ? "M132 104 Q150 108 168 104 L166 118 Q150 122 134 118 Z"
                      : "M136 98 Q150 102 164 98 L162 112 Q150 116 138 112 Z"
                  }
                  fill={outfit.mainColor.hex}
                  stroke="#5C5346"
                  strokeWidth="0.5"
                />

                {/* Nẹp vạt Hữu Nhậm / Tả Nhậm */}
                <path
                  d={
                    outfit.lapelDirection === 'ta_nham'
                      ? (isMale ? 'M146 114 Q134 135 124 165 L122 250' : 'M146 108 Q134 135 124 165 L122 250')
                      : (isMale ? 'M154 114 Q166 135 176 165 L178 250' : 'M154 108 Q166 135 176 165 L178 250')
                  }
                  stroke={outfit.lapelDirection === 'ta_nham' ? '#B83227' : '#D4AF37'}
                  strokeWidth="1.8"
                  strokeDasharray={outfit.lapelDirection === 'ta_nham' ? '3,2' : 'none'}
                  fill="none"
                />

                {/* 5 Khuy Ngũ Thường (Chỉ xuất hiện trên Áo Chẽn và Áo Tấc) */}
                {(outfit.garmentId === 'ao_chen' || outfit.garmentId === 'ao_tac') && (
                  outfit.lapelDirection === 'ta_nham' ? (
                    <g fill="#D4AF37" stroke="#2C241D" strokeWidth="0.5">
                      <circle cx="150" cy={isMale ? "118" : "110"} r="2.2" />
                      <circle cx="140" cy={isMale ? "128" : "124"} r="2.2" />
                      <circle cx="132" cy={isMale ? "144" : "142"} r="2.2" />
                      <circle cx="126" cy={isMale ? "162" : "162"} r="2.2" />
                      <circle cx="123" cy={isMale ? "184" : "184"} r="2.2" />
                    </g>
                  ) : (
                    <g fill="#D4AF37" stroke="#2C241D" strokeWidth="0.5">
                      <circle cx="150" cy={isMale ? "118" : "110"} r="2.2" />
                      <circle cx="160" cy={isMale ? "128" : "124"} r="2.2" />
                      <circle cx="168" cy={isMale ? "144" : "142"} r="2.2" />
                      <circle cx="174" cy={isMale ? "162" : "162"} r="2.2" />
                      <circle cx="177" cy={isMale ? "184" : "184"} r="2.2" />
                    </g>
                  )
                )}
              </g>
            )}
          </g>
        )}

        {/* LAYER 4: SLEEVES (TAY ÁO & TƯ THẾ TAY) */}
        {!outfit.isSoloYem && (
          <g className="transition-all duration-300">
            {outfit.garmentId === 'ao_tac' ? (
              outfit.isSleeveRolled ? (
                <g>
                  <path d={isMale ? "M126 112 L86 150 L92 190 L120 170 Z" : "M136 116 L98 150 L102 190 L132 170 Z"} fill={outfit.mainColor.hex} stroke="#B83227" strokeWidth="1.5" />
                  <path d={isMale ? "M174 112 L214 150 L208 190 L180 170 Z" : "M164 116 L202 150 L198 190 L168 170 Z"} fill={outfit.mainColor.hex} stroke="#B83227" strokeWidth="1.5" />
                  <rect x={isMale ? "86" : "98"} y="180" width="12" height="15" fill="#D6CEBE" rx="2" />
                  <rect x={isMale ? "202" : "190"} y="180" width="12" height="15" fill="#D6CEBE" rx="2" />
                  <rect x={isMale ? "88" : "100"} y="195" width="8" height="30" rx="3" fill={isMale ? "#E8C3AB" : "#FCEFE7"} />
                  <rect x={isMale ? "204" : "192"} y="195" width="8" height="30" rx="3" fill={isMale ? "#E8C3AB" : "#FCEFE7"} />
                </g>
              ) : (
                <g>
                  {/* Áo Tấc tay thụng buông dài uy nghi */}
                  <path
                    d={isMale ? "M126 112 L68 160 L54 280 L104 280 L118 170 Z" : "M136 118 L80 160 L68 280 L118 280 L130 170 Z"}
                    fill={outfit.mainColor.hex}
                    stroke="#5C5346"
                    strokeWidth="0.5"
                  />
                  <path
                    d={isMale ? "M174 112 L232 160 L246 280 L196 280 L182 170 Z" : "M164 118 L220 160 L232 280 L182 280 L170 170 Z"}
                    fill={outfit.mainColor.hex}
                    stroke="#5C5346"
                    strokeWidth="0.5"
                  />
                  <ellipse cx={isMale ? "79" : "93"} cy="280" rx="25" ry="5" fill={outfit.innerColor.hex} opacity="0.8" />
                  <ellipse cx={isMale ? "221" : "207"} cy="280" rx="25" ry="5" fill={outfit.innerColor.hex} opacity="0.8" />

                  {/* Bàn tay lấp ló nơi cửa tay thụng */}
                  {isMale ? (
                    <>
                      <path d="M75 277 C74 275 79 274 83 276 L84 285 C84 288 80 289 78 288 Z" fill="#E8C3AB" />
                      <path d="M217 277 C217 275 221 274 225 276 L225 285 C225 288 222 289 219 288 Z" fill="#E8C3AB" />
                    </>
                  ) : (
                    <>
                      <path d="M90 277 C89 275 94 274 98 276 L98 285 C98 288 94 289 92 288 Z" fill="#FCEFE7" stroke="#DEAE95" strokeWidth="0.4" />
                      <path d="M202 277 C202 275 206 274 210 276 L210 285 C210 288 207 289 204 288 Z" fill="#FCEFE7" stroke="#DEAE95" strokeWidth="0.4" />
                    </>
                  )}
                </g>
              )
            ) : (
              // Áo Chẽn / Áo Dài tay chẽn: Nam buông & gập nhẹ vs Nữ khép e ấp trước bụng
              <g>
                {isMale ? (
                  <>
                    <path d="M174 112 L206 150 L202 230 L190 230 L180 170 Z" fill={outfit.mainColor.hex} stroke="#5C5346" strokeWidth="0.5" />
                    <path d="M202 226 C204 228 204 238 201 241 C198 243 194 242 193 237 L193 226 Z" fill="#E8C3AB" />
                    <path d="M126 112 L94 150 L110 215 L124 210 L118 170 Z" fill={outfit.mainColor.hex} stroke="#5C5346" strokeWidth="0.5" />
                    <path d="M110 210 C108 212 110 220 114 222 C118 222 120 218 119 212 Z" fill="#E8C3AB" />
                  </>
                ) : (
                  <>
                    <path d="M136 118 L104 155 L124 218 L138 214 L128 170 Z" fill={outfit.mainColor.hex} stroke="#5C5346" strokeWidth="0.5" />
                    <path d="M164 118 L196 155 L176 218 L162 214 L172 170 Z" fill={outfit.mainColor.hex} stroke="#5C5346" strokeWidth="0.5" />
                    {/* Bàn tay búp măng ngọc ngà e ấp */}
                    <path d="M124 214 C123 216 128 224 133 223 C137 222 138 216 136 212 Z" fill="#FCEFE7" stroke="#DEAE95" strokeWidth="0.4" />
                    <path d="M176 214 C177 216 172 224 167 223 C163 222 162 216 164 212 Z" fill="#FCEFE7" stroke="#DEAE95" strokeWidth="0.4" />
                  </>
                )}
              </g>
            )}
          </g>
        )}

        {/* LAYER 5: OUTERWEAR */}
        {outfit.selectedOuterwear === 'blazer_oversize' && (
          <g className="transition-all duration-300">
            <path
              d={isMale ? "M118 108 L64 145 L70 265 L100 255 L114 160 Z" : "M124 112 L78 145 L84 265 L108 255 L120 160 Z"}
              fill="#2A2A2E"
              opacity="0.96"
            />
            <path
              d={isMale ? "M182 108 L236 145 L230 265 L200 255 L186 160 Z" : "M176 112 L222 145 L216 265 L192 255 L180 160 Z"}
              fill="#2A2A2E"
              opacity="0.96"
            />
            <path d={isMale ? "M118 108 L182 108 L170 135 L130 135 Z" : "M124 112 L176 112 L166 135 L134 135 Z"} fill="#2A2A2E" />
            <line x1={isMale ? "86" : "96"} y1="145" x2={isMale ? "100" : "106"} y2="215" stroke="#4B4B52" strokeWidth="1" />
            <line x1={isMale ? "214" : "204"} y1="145" x2={isMale ? "200" : "194"} y2="215" stroke="#4B4B52" strokeWidth="1" />
          </g>
        )}

        {/* BANNED: Japanese Obi Belt */}
        {outfit.selectedOuterwear === 'dai_that_obi' && (
          <g>
            <rect x="110" y="180" width="80" height="34" fill="#E11D48" rx="2" stroke="#B83227" strokeWidth="1" />
            <rect x="130" y="184" width="40" height="26" fill="#FDE047" rx="1" />
            <line x1="110" y1="197" x2="190" y2="197" stroke="#ffffff" strokeWidth="1.5" />
          </g>
        )}

        {/* LAYER 6: RIGGED HEAD, HAIR & FACIAL FEATURES (CHUẨN MỰC NAM NỮ CUNG ĐÌNH) */}
        <g
          id={`head-face-hair_${uid}`}
          transform={
            isMale
              ? `translate(150, 73.5) scale(${headCompX.toFixed(4)}, ${headCompY.toFixed(4)}) translate(-150, -70)`
              : `translate(150, 78.5) scale(${(headCompX * 0.94).toFixed(4)}, ${(headCompY * 0.94).toFixed(4)}) translate(-150, -70)`
          }
          className="transition-all duration-300"
        >
          {/* KHUÔN MẶT: TRÁI XOAN THANH TÚ NỮ VS CHỮ ĐIỀN VUÔNG VỨC NAM */}
          <path
            d={
              isMale
                ? "M132 58 C132 46 139 42 150 42 C161 42 168 46 168 58 C168 76 163 88 150 89 C137 88 132 76 132 58 Z"
                : "M134 60 C134 46 141 42 150 42 C159 42 166 46 166 60 C166 78 159 88 150 88 C141 88 134 78 134 60 Z"
            }
            fill={isMale ? "#F4CFBA" : "#FCEFE7"}
            stroke={isMale ? "#D9A88F" : "#E6C8B8"}
            strokeWidth="0.6"
          />

          {/* Tai nam */}
          {isMale && (
            <>
              <path d="M132 63 C130 63 129 73 132 75 Z" fill="#E8C3AB" />
              <path d="M168 63 C170 63 171 73 168 75 Z" fill="#E8C3AB" />
            </>
          )}

          {/* Khuyên tai ngọc trai nữ đung đưa sát cổ */}
          {!isMale && (
            <g>
              <line x1="133.5" y1="72" x2="133.5" y2="76" stroke="#D4AF37" strokeWidth="0.8" />
              <circle cx="133.5" cy="78.5" r="2.5" fill="#FFFDF0" stroke="#E3DAC9" strokeWidth="0.5" />
              <line x1="166.5" y1="72" x2="166.5" y2="76" stroke="#D4AF37" strokeWidth="0.8" />
              <circle cx="166.5" cy="78.5" r="2.5" fill="#FFFDF0" stroke="#E3DAC9" strokeWidth="0.5" />
            </g>
          )}

          {/* Face Swap Embedded Image or Illustrated Features */}
          {outfit.customFacePhotoUrl ? (
            <image
              href={outfit.customFacePhotoUrl}
              x="125"
              y="46"
              width="50"
              height="52"
              preserveAspectRatio="xMidYMid slice"
              clipPath={`url(#${userFaceClipId})`}
            />
          ) : (
            <g>
              {isMale ? (
                // NÉT MẶT NAM: Chân mày rậm ngang, mắt kiên định, sống mũi cao, môi cương nghị
                <>
                  <path d="M137 63 L146 62.5" stroke="#1F1E22" strokeWidth="2.2" strokeLinecap="round" fill="none" />
                  <path d="M154 62.5 L163 63" stroke="#1F1E22" strokeWidth="2.2" strokeLinecap="round" fill="none" />
                  <path d="M138 68 Q142 66 146 68" stroke="#221F1E" strokeWidth="1.2" fill="none" />
                  <ellipse cx="142" cy="69" rx="1.8" ry="1.4" fill="#221F1E" />
                  <path d="M154 68 Q158 66 162 68" stroke="#221F1E" strokeWidth="1.2" fill="none" />
                  <ellipse cx="158" cy="69" rx="1.8" ry="1.4" fill="#221F1E" />
                  <path d="M150 66 L149 74 Q150.5 75.5 152 74" stroke="#C28B72" strokeWidth="0.9" fill="none" />
                  <path d="M145 80 Q150 81.5 155 80" stroke="#A8624C" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                </>
              ) : (
                // NÉT MẶT NỮ: Mày lá liễu thanh mảnh Á Đông, khoảng cách 2 mắt cân đối chuẩn 1 con mắt, môi chúm chím e ấp hình cánh cung
                <>
                  {/* Chân mày lá liễu thanh mảnh, uốn lượn mềm mại */}
                  <path d="M138.5 63.5 Q142.5 61 146.5 63.5" stroke="#3A2E2B" strokeWidth="0.9" strokeLinecap="round" fill="none" />
                  <path d="M153.5 63.5 Q157.5 61 161.5 63.5" stroke="#3A2E2B" strokeWidth="0.9" strokeLinecap="round" fill="none" />

                  {/* Mắt bồ câu to tròn, khoảng cách giữa 2 mắt bằng chiều dài 1 con mắt (7.5px) */}
                  <path d="M139 67.5 Q142.5 65.2 146.2 67.5" stroke="#3A2E2B" strokeWidth="0.95" fill="none" />
                  <ellipse cx="142.5" cy="68.2" rx="2.3" ry="1.7" fill="#1C1A19" />
                  <circle cx="143" cy="67.7" r="0.65" fill="#FFFFFF" />
                  <path d="M139 67.5 Q137.5 67 137 66.5" stroke="#3A2E2B" strokeWidth="0.6" fill="none" />
                  <path d="M140 69 Q142.5 70 145.5 69" stroke="#D8A890" strokeWidth="0.4" fill="none" />

                  <path d="M153.8 67.5 Q157.5 65.2 161 67.5" stroke="#3A2E2B" strokeWidth="0.95" fill="none" />
                  <ellipse cx="157.5" cy="68.2" rx="2.3" ry="1.7" fill="#1C1A19" />
                  <circle cx="158" cy="67.7" r="0.65" fill="#FFFFFF" />
                  <path d="M161 67.5 Q162.5 67 163 66.5" stroke="#3A2E2B" strokeWidth="0.6" fill="none" />
                  <path d="M154.5 69 Q157.5 70 160 69" stroke="#D8A890" strokeWidth="0.4" fill="none" />

                  {/* Gò má phớt hồng đào e ấp */}
                  <ellipse cx="137" cy="73" rx="3.5" ry="2" fill="#E08B7A" opacity="0.32" />
                  <ellipse cx="163" cy="73" rx="3.5" ry="2" fill="#E08B7A" opacity="0.32" />

                  {/* Sống mũi thanh tú Á Đông */}
                  <path d="M150 67 L149.6 73.5 Q150.5 75 151.6 73.8" stroke="#D8A890" strokeWidth="0.65" fill="none" />

                  {/* Đôi môi chúm chím viền môi trên cong nhẹ hình cánh cung (Cupid's bow) e ấp duyên dáng */}
                  <path d="M146 79.5 Q148 78 150 78.8 Q152 78 154 79.5 Q150 80.8 146 79.5 Z" fill="#E25C6E" />
                  <path d="M146.5 79.5 Q150 80.2 153.5 79.5 Q150 83.2 146.5 79.5 Z" fill="#D94B5E" />
                  <path d="M146 79.5 Q150 80.4 154 79.5" stroke="#B32D42" strokeWidth="0.5" fill="none" />
                  <ellipse cx="150" cy="81" rx="1.8" ry="0.7" fill="#FFA5B5" opacity="0.6" />
                </>
              )}
            </g>
          )}

          {/* KÍNH MẮT KIM LOẠI */}
          {outfit.selectedGlasses === 'kinh_kim_loai' && (
            <g className="transition-all duration-300">
              <ellipse cx="142" cy="69" rx="4.5" ry="4.5" fill="none" stroke="#D4AF37" strokeWidth="0.8" />
              <ellipse cx="158" cy="69" rx="4.5" ry="4.5" fill="none" stroke="#D4AF37" strokeWidth="0.8" />
              <path d="M146.5 69 Q150 67 153.5 69" stroke="#D4AF37" strokeWidth="0.8" fill="none" />
              <line x1="137.5" y1="69" x2="133" y2="67" stroke="#D4AF37" strokeWidth="0.8" />
              <line x1="162.5" y1="69" x2="167" y2="67" stroke="#D4AF37" strokeWidth="0.8" />
            </g>
          )}

          {/* KIỂU TÓC & KHĂN ĐỘI ĐẦU THEO GIỚI TÍNH */}
          {isMale ? (
            // NAM: Khăn Đóng Chữ Nhất xếp lớp ngang trán
            <g>
              <ellipse cx="150" cy="50" rx="25" ry="12" fill="#18181B" stroke="#27272A" strokeWidth="0.8" />
              <path d="M127 52 Q150 59 173 52" stroke="#45454D" strokeWidth="1.4" fill="none" />
              <path d="M129 48 Q150 55 171 48" stroke="#45454D" strokeWidth="1.4" fill="none" />
              <path d="M132 44 Q150 51 168 44" stroke="#45454D" strokeWidth="1.4" fill="none" />
              <path d="M135 40 Q150 47 165 40" stroke="#45454D" strokeWidth="1.2" fill="none" />
            </g>
          ) : (
            // NỮ: Tóc rẽ ngôi giữa + Khăn Vấn Nhung phồng tròn + 2 lọn tóc mai lơi nhẹ
            <g>
              <path
                d="M150 48 Q140 52 134 62 L134 46 Q142 42 150 42 Q158 42 166 46 L166 62 Q160 52 150 48 Z"
                fill="#161517"
              />
              <path
                d="M125 54 C122 34 136 30 150 30 C164 30 178 34 175 54 C172 44 162 38 150 38 C138 38 128 44 125 54 Z"
                fill="#141316"
                stroke="#2B2832"
                strokeWidth="0.8"
              />
              <path d="M130 46 Q150 40 170 46" stroke="#3D3A47" strokeWidth="1.2" fill="none" opacity="0.6" />
              {/* Hai sợi tóc mai lơi nhẹ */}
              <path d="M134 62 Q131 72 133 80" stroke="#161517" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              <path d="M166 62 Q169 72 167 80" stroke="#161517" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            </g>
          )}

          {/* PHỤ KIỆN ĐỘI ĐẦU BỔ SUNG */}
          {outfit.selectedHeadwear === 'bom_nhung' && (
            <g>
              <path d="M130 60 C130 40 140 36 150 36 C160 36 170 40 170 60" stroke="#7A1C28" strokeWidth="5.5" fill="none" strokeLinecap="round" />
              <path d="M130 60 C130 40 140 36 150 36 C160 36 170 40 170 60" stroke="#D4AF37" strokeWidth="0.8" fill="none" strokeLinecap="round" strokeDasharray="3,3" />
            </g>
          )}

          {outfit.selectedHeadwear === 'non_quai_thao' && (
            <g>
              <ellipse cx="150" cy="42" rx="46" ry="12" fill="#DFC9A8" stroke="#8D5B4C" strokeWidth="1" />
              <ellipse cx="150" cy="41" rx="42" ry="10" fill="#E8D7BE" />
              <path d="M110 48 Q105 130 115 220" stroke="#8D5B4C" strokeWidth="1.5" fill="none" />
              <path d="M190 48 Q195 130 185 220" stroke="#8D5B4C" strokeWidth="1.5" fill="none" />
              <circle cx="115" cy="222" r="3" fill="#D4AF37" />
              <circle cx="185" cy="222" r="3" fill="#D4AF37" />
            </g>
          )}

          {outfit.selectedHeadwear === 'non_la_hue' && (
            <g id={`non-la_${uid}`} transform="translate(0, -28)">
              <path d="M150 16 L106 56 L194 56 Z" fill="#EADBC8" stroke="#B8A892" strokeWidth="1" />
              <ellipse cx="150" cy="56" rx="44" ry="8" fill="#E0CEB7" />
              <path d="M122 56 Q150 118 178 56" stroke={isMale ? "#4A3B32" : "#7A3E65"} strokeWidth="1.5" fill="none" />
            </g>
          )}

          {outfit.selectedHeadwear === 'khan_mo_qua' && (
            <g>
              <path d="M126 60 Q150 34 174 60 L164 78 L150 76 L136 78 Z" fill="#18181A" />
              <path d="M145 56 L150 63 L155 56 Z" fill="#18181A" />
            </g>
          )}

          {outfit.selectedHeadwear === 'kep_cang_cua' && (
            <g id="accessory-kep-cang-cua" className="transition-all duration-300">
              <ellipse cx="158" cy="38" rx="9" ry="7" fill="#161517" />
              <path d="M152 42 Q158 34 165 40" stroke="#2B2832" strokeWidth="1" fill="none" />
              <path
                d="M152 35 C154 30 162 30 165 34 C167 37 165 41 161 41 C157 41 151 38 152 35 Z"
                fill="#F4D03F"
                stroke="#B8860B"
                strokeWidth="0.8"
              />
              <path d="M155 33 L155 39 M158 32 L158 40 M161 33 L161 39" stroke="#B8860B" strokeWidth="0.8" strokeLinecap="round" />
              <g id={`claw-clip-pearls_${uid}`}>
                <circle cx="153" cy="36" r="1.8" fill="#FFFDF8" stroke="#E5C368" strokeWidth="0.4" />
                <circle cx="156.5" cy="34.2" r="2.3" fill="#FFFDF8" stroke="#E5C368" strokeWidth="0.4" />
                <circle cx="160.5" cy="33.5" r="2.8" fill="#FFFFFF" stroke="#E5C368" strokeWidth="0.5" />
                <circle cx="161.2" cy="32.7" r="0.8" fill="#FFFFFF" />
                <circle cx="164.5" cy="34.5" r="2.3" fill="#FFFDF8" stroke="#E5C368" strokeWidth="0.4" />
                <circle cx="168" cy="36.5" r="1.8" fill="#FFFDF8" stroke="#E5C368" strokeWidth="0.4" />
              </g>
              <path d="M166 40 Q171 52 168 64" stroke="#161517" strokeWidth="1.2" strokeLinecap="round" fill="none" />
            </g>
          )}

          {outfit.selectedHeadwear === 'tram_cai_thanh_trieu' && (
            <g transform="translate(150, 32)">
              <rect x="-35" y="-12" width="70" height="14" rx="4" fill="#0F172A" />
              <circle cx="0" cy="-6" r="14" fill="#E11D48" stroke="#BE123C" strokeWidth="1" />
              <circle cx="0" cy="-6" r="6" fill="#FDE047" />
              <line x1="-28" y1="2" x2="-28" y2="35" stroke="#E11D48" strokeWidth="2" />
              <line x1="28" y1="2" x2="28" y2="35" stroke="#E11D48" strokeWidth="2" />
            </g>
          )}
        </g>

        {/* LAYER 7: HANDHELD ACCESSORIES (CHỈ VẼ KHI ĐƯỢC CHỌN, KHÔNG ÉP CẦM) */}
        <g className="transition-all duration-300">
          {outfit.selectedHandheld === 'quat_xep_giay_do' ? (
            isMale ? (
              // NAM: Quạt nan giấy dó xếp gọn nam tính kèm tua rua vàng
              <g transform="translate(108, 202) rotate(-22)">
                <rect x="0" y="0" width="8" height="42" rx="2" fill="#8D5B4C" stroke="#5C3B0E" strokeWidth="0.8" />
                <line x1="4" y1="0" x2="4" y2="42" stroke="#D4AF37" strokeWidth="0.8" />
                <circle cx="4" cy="40" r="1.5" fill="#D4AF37" />
                <line x1="4" y1="42" x2="2" y2="52" stroke="#B83227" strokeWidth="1.2" />
              </g>
            ) : (
              // NỮ: Quạt lụa tròn cung đình (đoàn phiến) thêu hoa sen đào kèm ngón tay búp măng đặt nhẹ mép quạt
              <g transform="translate(150, 214)">
                {/* Mặt quạt lụa tròn thêu hoa sen đào */}
                <circle cx="0" cy="0" r="20" fill="#FAF7F2" stroke="#D4AF37" strokeWidth="1.2" />
                <path d="M-6 4 Q0 -4 6 -2" stroke="#8D5B4C" strokeWidth="0.8" fill="none" />
                <circle cx="-1" cy="-2" r="2.5" fill="#E05A6D" />
                <circle cx="4" cy="-4" r="2" fill="#E05A6D" />
                <circle cx="0" cy="2" r="1.5" fill="#D4AF37" />
                <line x1="0" y1="20" x2="0" y2="38" stroke="#8D5B4C" strokeWidth="1.8" strokeLinecap="round" />
                <line x1="0" y1="38" x2="-2" y2="52" stroke="#D4AF37" strokeWidth="1.2" />
                <circle cx="-2" cy="52" r="1.2" fill="#D4AF37" />

                {/* BÀN TAY NGỌC NGÀ: CÁC NGÓN TAY BÚP MĂNG THON NHỎ ĐẶT NHẸ LÊN MÉP QUẠT */}
                {/* Ngón trỏ búp măng thon nhỏ tựa nhẹ lên vành quạt */}
                <path
                  d="M-17 14 C-14 13 -8 17 -6 20 C-6.5 21.5 -8 22 -10 20 C-13 18 -16 17 -17 15 Z"
                  fill="#FCEFE7"
                  stroke="#DEAE95"
                  strokeWidth="0.45"
                />
                {/* Ngón giữa búp măng ôm nhẹ mép quạt */}
                <path
                  d="M-16 17 C-12 16 -5 21 -4 24 C-4.5 25.5 -6 26 -8 24 C-11 22 -14 20 -16 18 Z"
                  fill="#FCEFE7"
                  stroke="#DEAE95"
                  strokeWidth="0.45"
                />
                {/* Ngón áp út e ấp */}
                <path
                  d="M-14 21 C-11 20 -5 24 -4 27 C-4.5 28.5 -6 29 -7 27 C-10 25 -12 23 -14 22 Z"
                  fill="#FCEFE7"
                  stroke="#DEAE95"
                  strokeWidth="0.45"
                />
                {/* Ngón út thon dài duyên dáng */}
                <path
                  d="M-12 25 C-10 24 -6 27 -6 29 C-6.5 30.5 -8 30.5 -9 29 C-11 27 -12 26 -12 25 Z"
                  fill="#FCEFE7"
                  stroke="#DEAE95"
                  strokeWidth="0.4"
                />
                {/* Tay phải khẽ đỡ mép đối xứng / cán quạt */}
                <path
                  d="M12 16 C8 15 3 19 2 22 C2.5 23.5 4 24 6 22 C9 20 11 18 12 17 Z"
                  fill="#FCEFE7"
                  stroke="#DEAE95"
                  strokeWidth="0.45"
                />
                <path
                  d="M10 20 C7 19 2 23 2 25 C2.5 26.5 4 27 5 25 C8 23 10 21 10 20 Z"
                  fill="#FCEFE7"
                  stroke="#DEAE95"
                  strokeWidth="0.45"
                />
              </g>
            )
          ) : outfit.selectedHandheld === 'tui_tote_canvas' ? (
            isMale ? (
              // NAM: Túi tote vải canvas đen/be nam tính
              <g transform="translate(86, 204)">
                <path d="M7 0 L7 -16 L23 -16 L23 0" fill="none" stroke="#2C241D" strokeWidth="1.4" />
                <rect x="0" y="0" width="30" height="36" rx="2" fill="#FAF7F2" stroke="#6B5E51" strokeWidth="0.8" />
                <circle cx="15" cy="18" r="5" fill="#1B3B6F" opacity="0.8" />
              </g>
            ) : (
              // NỮ: Túi tote nữ in họa tiết cổ truyền
              <g transform="translate(122, 215)">
                <path d="M8 0 L8 -14 L22 -14 L22 0" fill="none" stroke="#5C5346" strokeWidth="1.2" />
                <rect x="0" y="0" width="28" height="34" rx="2" fill="#FAF7F2" stroke="#8D5B4C" strokeWidth="0.8" />
                <circle cx="14" cy="15" r="4.5" fill="#B83227" opacity="0.7" />
              </g>
            )
          ) : outfit.selectedHandheld === 'clutch_vintage' ? (
            isMale ? (
              // NAM: Clutch da bò lịch lãm
              <g transform="translate(94, 212)">
                <rect x="0" y="0" width="28" height="18" rx="2" fill="#4E342E" stroke="#3E2723" strokeWidth="1" />
                <line x1="0" y1="7" x2="28" y2="7" stroke="#D4AF37" strokeWidth="0.8" />
                <rect x="12" y="5" width="4" height="4" fill="#D4AF37" rx="0.5" />
              </g>
            ) : (
              // NỮ: Clutch vintage da mềm khóa vàng
              <g transform="translate(138, 214)">
                <rect x="0" y="0" width="26" height="16" rx="2" fill="#5D4037" stroke="#3E2723" strokeWidth="1" />
                <path d="M0 0 L13 8 L26 0" fill="none" stroke="#D4AF37" strokeWidth="0.8" />
              </g>
            )
          ) : null}
        </g>
      </g>

      {/* CÀNH HOA ĐÀO PHAI & ẤN TRIỆN SON ĐỎ HỌA SẮC VIỆT (HẠ THẤP TỌA ĐỘ DƯỚI THANH CÔNG CỤ 38PX, LỘ DIỆN TRỌN VẸN RÕ NÉT) */}
      {showSeal && (
        <g id={`peach-branch-and-seal_${uid}`} className="pointer-events-none select-none">
          {/* Nhánh cành đào uốn lượn phong vị tranh thủy mặc */}
          <g opacity="0.9">
            {/* Thân cành đào chính */}
            <path
              d="M 302 28 Q 275 38 256 58 Q 244 72 238 90"
              fill="none"
              stroke="#543828"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            {/* Nhánh phụ nhỏ */}
            <path
              d="M 270 45 Q 252 42 242 48"
              fill="none"
              stroke="#543828"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <path
              d="M 248 68 Q 235 68 226 76"
              fill="none"
              stroke="#543828"
              strokeWidth="1.2"
              strokeLinecap="round"
            />

            {/* Các nốt nụ và đóa hoa đào xuân phớt hồng thanh nhã */}
            {/* Đóa hoa đào 1 */}
            <g transform="translate(242, 47)">
              <circle cx="0" cy="0" r="4.2" fill="#FDA4AF" opacity="0.95" />
              <circle cx="-2.5" cy="-2.5" r="3.2" fill="#FB7185" opacity="0.85" />
              <circle cx="2.5" cy="-2" r="3.2" fill="#FB7185" opacity="0.85" />
              <circle cx="-2" cy="2.5" r="3.2" fill="#F43F5E" opacity="0.8" />
              <circle cx="2" cy="2.5" r="3.2" fill="#FB7185" opacity="0.85" />
              <circle cx="0" cy="0" r="1.5" fill="#FEF08A" />
            </g>

            {/* Đóa hoa đào 2 */}
            <g transform="translate(228, 77)">
              <circle cx="0" cy="0" r="4" fill="#FDA4AF" opacity="0.95" />
              <circle cx="-2.2" cy="-2.2" r="3" fill="#FB7185" opacity="0.85" />
              <circle cx="2.2" cy="-1.8" r="3" fill="#FB7185" opacity="0.85" />
              <circle cx="-1.8" cy="2.2" r="3" fill="#F43F5E" opacity="0.8" />
              <circle cx="1.8" cy="2.2" r="3" fill="#FB7185" opacity="0.85" />
              <circle cx="0" cy="0" r="1.4" fill="#FEF08A" />
            </g>

            {/* Nụ đào chúm chím */}
            <ellipse cx="282" cy="36" rx="2.2" ry="3.2" fill="#FB7185" transform="rotate(-30 282 36)" />
            <ellipse cx="236" cy="92" rx="2" ry="2.8" fill="#F43F5E" transform="rotate(20 236 92)" />
            {/* Lộc biếc non đầu cành */}
            <path d="M 276 38 Q 272 34 270 37 Q 272 40 276 38 Z" fill="#65A30D" />
            <path d="M 244 65 Q 240 62 238 65 Q 241 67 244 65 Z" fill="#65A30D" />
          </g>

          {/* CON DẤU ĐỎ TRIỆN SON "HỌA SẮC VIỆT" - HẠ TỌA ĐỘ XUỐNG DƯỚI THANH CÔNG CỤ (Y=62) LỘ DIỆN RÕ NÉT */}
          <g transform="translate(242, 62)">
            <rect
              x="0"
              y="0"
              width="36"
              height="36"
              rx="6"
              fill="#B83227"
              fillOpacity="0.92"
              stroke="#8A1C14"
              strokeWidth="1.5"
            />
            {/* Viền chỉ vàng mảnh phong cách ấn triện hoàng gia */}
            <rect
              x="2.5"
              y="2.5"
              width="31"
              height="31"
              rx="4"
              fill="none"
              stroke="#FDE047"
              strokeWidth="0.6"
              strokeOpacity="0.5"
            />
            <text
              x="18"
              y="15"
              fill="#FFFFFF"
              fontSize="7.5"
              fontFamily="'Playfair Display', 'Lora', 'Be Vietnam Pro', Georgia, serif"
              fontWeight="bold"
              textAnchor="middle"
            >
              HỌA SẮC
            </text>
            <text
              x="18"
              y="26"
              fill="#FFFFFF"
              fontSize="7.5"
              fontFamily="'Playfair Display', 'Lora', 'Be Vietnam Pro', Georgia, serif"
              fontWeight="bold"
              textAnchor="middle"
            >
              VIỆT
            </text>
          </g>
        </g>
      )}
    </svg>
  );
};
