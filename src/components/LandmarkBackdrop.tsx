import React from 'react';
import { LandmarkId, LightingMoodId } from '../types/costume';

interface LandmarkBackdropProps {
  landmarkId?: LandmarkId;
  lightingId?: LightingMoodId;
  className?: string;
  isMiniPreview?: boolean;
}

export const LandmarkBackdrop: React.FC<LandmarkBackdropProps> = ({
  landmarkId = 'van_mieu',
  lightingId = 'nang_am',
  className = '',
  isMiniPreview = false,
}) => {
  // Lighting Color Overlays & Shader Gradients
  const getLightingOverlay = () => {
    switch (lightingId) {
      case 'nang_am':
        // Golden Hour: Amber-gold sunburst with warm soft-light blend
        return (
          <div
            className="absolute inset-0 pointer-events-none mix-blend-soft-light transition-all duration-700"
            style={{
              background:
                'linear-gradient(135deg, rgba(245, 158, 11, 0.28) 0%, rgba(251, 191, 36, 0.15) 45%, rgba(217, 119, 6, 0.25) 100%)',
            }}
          >
            {/* Subtle Diagonal Sunbeam Light Streak */}
            <div
              className="absolute -top-12 -left-12 w-64 h-64 opacity-40 blur-xl pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle, rgba(254, 240, 138, 0.8) 0%, rgba(245, 158, 11, 0) 70%)',
              }}
            />
          </div>
        );

      case 'chieu_thu':
        // Cool Autumn Breeze: Slate cyan ambient tone
        return (
          <div
            className="absolute inset-0 pointer-events-none mix-blend-soft-light transition-all duration-700"
            style={{
              background:
                'linear-gradient(180deg, rgba(148, 163, 184, 0.25) 0%, rgba(100, 116, 139, 0.2) 100%)',
            }}
          >
            <div
              className="absolute top-0 right-0 w-full h-32 opacity-30 blur-2xl pointer-events-none"
              style={{
                background:
                  'linear-gradient(to bottom, rgba(203, 213, 225, 0.6), transparent)',
              }}
            />
          </div>
        );

      case 'dem_hoa_dang':
        // Lantern Night Glow: Twilight indigo with radial lantern glow & dark vignette
        return (
          <div className="absolute inset-0 pointer-events-none transition-all duration-700">
            {/* Dark Vignette Edges */}
            <div
              className="absolute inset-0 opacity-75 mix-blend-multiply pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 50%, rgba(30, 27, 75, 0.15) 30%, rgba(15, 23, 42, 0.65) 100%)',
              }}
            />
            {/* Warm Lantern Halos Glowing from sides */}
            <div
              className="absolute top-10 left-4 w-32 h-32 rounded-full opacity-60 blur-xl pointer-events-none mix-blend-screen"
              style={{
                background:
                  'radial-gradient(circle, rgba(251, 146, 60, 0.8) 0%, rgba(245, 158, 11, 0) 75%)',
              }}
            />
            <div
              className="absolute top-12 right-6 w-36 h-36 rounded-full opacity-65 blur-xl pointer-events-none mix-blend-screen"
              style={{
                background:
                  'radial-gradient(circle, rgba(244, 63, 94, 0.7) 0%, rgba(234, 88, 12, 0) 75%)',
              }}
            />
          </div>
        );

      case 'sang_som':
        // Fresh Morning Mist: Blush pink & ivory morning glow
        return (
          <div
            className="absolute inset-0 pointer-events-none mix-blend-soft-light transition-all duration-700"
            style={{
              background:
                'linear-gradient(to top, rgba(255, 255, 255, 0.35) 0%, rgba(254, 205, 211, 0.22) 50%, rgba(241, 245, 249, 0.1) 100%)',
            }}
          >
            {/* Morning Mist Overlay */}
            <div
              className="absolute bottom-0 inset-x-0 h-32 opacity-40 blur-lg pointer-events-none"
              style={{
                background:
                  'linear-gradient(to top, rgba(255, 255, 255, 0.9), transparent)',
              }}
            />
          </div>
        );

      default:
        return null;
    }
  };

  // Sky Gradient Palette by Lighting Mood
  const getSkyGradient = () => {
    switch (lightingId) {
      case 'nang_am':
        return {
          top: '#FFF4E5',
          middle: '#FFE6CC',
          bottom: '#FCE0C6',
        };
      case 'chieu_thu':
        return {
          top: '#E2E8F0',
          middle: '#D6DFE8',
          bottom: '#CBD5E1',
        };
      case 'dem_hoa_dang':
        return {
          top: '#0F172A',
          middle: '#1E1B4B',
          bottom: '#312E81',
        };
      case 'sang_som':
        return {
          top: '#FFF0F5',
          middle: '#FCE7F3',
          bottom: '#F1F5F9',
        };
      default:
        return {
          top: '#F7F3EB',
          middle: '#F0E9DC',
          bottom: '#EDE7DC',
        };
    }
  };

  const sky = getSkyGradient();

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none transition-all duration-700 select-none ${className}`}
    >
      {/* 1. ATMOSPHERIC SKY BASE */}
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 400 600"
      >
        <defs>
          <linearGradient id={`skyGrad-${landmarkId}-${lightingId}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={sky.top} />
            <stop offset="55%" stopColor={sky.middle} />
            <stop offset="100%" stopColor={sky.bottom} />
          </linearGradient>

          {/* Pattern for Encaustic Cement Tile in Cafe Indochine */}
          <pattern id="indochineTiles" width="24" height="24" patternUnits="userSpaceOnUse">
            <rect width="24" height="24" fill="#E2D9CC" />
            <circle cx="12" cy="12" r="7" fill="none" stroke="#2C3E35" strokeWidth="1" />
            <path d="M 0 0 L 24 24 M 24 0 L 0 24" stroke="#5A6D63" strokeWidth="0.75" />
            <rect x="9" y="9" width="6" height="6" fill="#8B4513" opacity="0.4" />
          </pattern>
        </defs>

        <rect width="400" height="600" fill={`url(#skyGrad-${landmarkId}-${lightingId})`} />
      </svg>

      {/* 2. ARTISTIC VECTOR SCENERY BY LANDMARK */}
      <div className="absolute inset-0 w-full h-full opacity-90 transition-opacity duration-500">
        {/* ================= LANDMARK 1: VĂN MIẾU - KHUÊ VĂN CÁC ================= */}
        {landmarkId === 'van_mieu' && (
          <svg
            className="w-full h-full"
            viewBox="0 0 400 600"
            preserveAspectRatio="xMidYMax slice"
          >
            {/* Distant Poetic Clouds & Pagoda Silhouette */}
            <g opacity="0.35">
              <path
                d="M 20 80 Q 70 60 120 85 Q 160 75 190 90 Q 150 105 100 100 Z"
                fill="#C4B7A6"
              />
              <path
                d="M 230 90 Q 280 75 330 95 Q 360 85 390 100 Q 340 115 290 105 Z"
                fill="#C4B7A6"
              />
            </g>

            {/* Banyan & Ancient Foliage Silhouettes on Flanks (Parallax Background) */}
            <g opacity={lightingId === 'dem_hoa_dang' ? '0.5' : '0.45'}>
              {/* Left Foliage */}
              <circle cx="35" cy="180" r="75" fill="#3D5A45" />
              <circle cx="65" cy="140" r="55" fill="#4B6E55" />
              <circle cx="15" cy="120" r="45" fill="#2E4835" />
              {/* Right Foliage */}
              <circle cx="365" cy="170" r="70" fill="#3D5A45" />
              <circle cx="335" cy="130" r="50" fill="#4B6E55" />
              <circle cx="385" cy="110" r="40" fill="#2E4835" />
            </g>

            {/* GÁC KHUÊ VĂN CÁC (CENTRAL ICONIC ARCHITECTURE - ELEVATED BACKGROUND) */}
            <g transform="translate(0, -35)">
              {/* Lower Brick & Stone Base Platform */}
              <path
                d="M 115 350 L 285 350 L 275 425 L 125 425 Z"
                fill="#94483B"
                opacity="0.9"
              />
              {/* Arched Passageway Cutout in Base */}
              <path
                d="M 175 425 L 175 385 Q 200 365 225 385 L 225 425 Z"
                fill="#4A1E17"
              />

              {/* 4 Wooden Columns of Upper Pavilion */}
              <rect x="135" y="240" width="12" height="110" rx="2" fill="#7A2E22" />
              <rect x="165" y="240" width="10" height="110" rx="2" fill="#5E1D13" />
              <rect x="225" y="240" width="10" height="110" rx="2" fill="#5E1D13" />
              <rect x="253" y="240" width="12" height="110" rx="2" fill="#7A2E22" />

              {/* Balustrade railing */}
              <rect x="130" y="340" width="140" height="14" rx="2" fill="#8C3528" />
              <line x1="130" y1="347" x2="270" y2="347" stroke="#D4AF37" strokeWidth="1.5" />

              {/* UPPER TIMBER PAVILION WITH CIRCULAR SUN WINDOW */}
              <rect x="145" y="240" width="110" height="92" rx="3" fill="#A83E2D" />

              {/* The Iconic Khuê Star Circular Window (Cửa Tròn Sao Khuê) */}
              <circle cx="200" cy="286" r="28" fill="#FCEAD0" stroke="#7A2518" strokeWidth="4" />
              {/* Sunbeam spokes inside circular window */}
              <g stroke="#7A2518" strokeWidth="2.5">
                <line x1="200" y1="258" x2="200" y2="314" />
                <line x1="172" y1="286" x2="228" y2="286" />
                <line x1="180" y1="266" x2="220" y2="306" />
                <line x1="180" y1="306" x2="220" y2="266" />
              </g>
              <circle cx="200" cy="286" r="9" fill="#7A2518" />

              {/* LOWER CURVED TILE ROOF */}
              <path
                d="M 105 245 Q 120 240 145 242 L 255 242 Q 280 240 295 245 Q 285 230 250 222 L 150 222 Q 115 230 105 245 Z"
                fill="#54433A"
              />
              {/* Upturned Eave Finials */}
              <path d="M 105 245 Q 98 238 100 228 Q 106 235 110 240 Z" fill="#D4AF37" />
              <path d="M 295 245 Q 302 238 300 228 Q 294 235 290 240 Z" fill="#D4AF37" />

              {/* UPPER TIER SMALL WALL */}
              <rect x="160" y="205" width="80" height="20" fill="#8C3528" />

              {/* TOP CURVED ROOF TIER */}
              <path
                d="M 125 210 Q 140 200 165 202 L 235 202 Q 260 200 275 210 Q 265 185 220 178 L 180 178 Q 135 185 125 210 Z"
                fill="#3E3129"
              />
              {/* Roof Ridge & Gilded Dragon Finial */}
              <rect x="185" y="172" width="30" height="7" rx="2" fill="#D4AF37" />
              <circle cx="200" cy="168" r="4.5" fill="#D4AF37" />

              {/* GIẾNG THIÊN QUANG STONE LOTUS BALUSTRADE (DIVIDING LINE) */}
              <rect x="0" y="420" width="400" height="15" fill="#8C8274" opacity="0.6" />
              <g fill="#A69C8E">
                <rect x="25" y="405" width="10" height="18" rx="1" />
                <circle cx="30" cy="403" r="3.5" />
                <rect x="85" y="405" width="10" height="18" rx="1" />
                <circle cx="90" cy="403" r="3.5" />
                <rect x="305" y="405" width="10" height="18" rx="1" />
                <circle cx="310" cy="403" r="3.5" />
                <rect x="365" y="405" width="10" height="18" rx="1" />
                <circle cx="370" cy="403" r="3.5" />
                <line x1="0" y1="412" x2="400" y2="412" stroke="#756B5D" strokeWidth="2" />
              </g>
            </g>

            {/* SÂN ĐÁ & GẠCH BÁT TRÀNG CỔ KÍNH TIẾP ĐẤT (GROUND PLANE TỪ Y=420 ĐẾN 600) */}
            <g id="van-mieu-ground-courtyard">
              {/* Ancient Stone & Terracotta Courtyard Floor */}
              <path d="M 0 420 L 400 420 L 400 600 L 0 600 Z" fill="#D6C8B8" />
              {/* Perspective Flagstone Paving Lines Converging into Scene */}
              <g stroke="#BAAA96" strokeWidth="1.6" opacity="0.75">
                <line x1="20" y1="420" x2="-60" y2="600" />
                <line x1="80" y1="420" x2="20" y2="600" />
                <line x1="140" y1="420" x2="110" y2="600" />
                <line x1="200" y1="420" x2="200" y2="600" strokeWidth="2" stroke="#A89884" />
                <line x1="260" y1="420" x2="290" y2="600" />
                <line x1="320" y1="420" x2="380" y2="600" />
                <line x1="380" y1="420" x2="460" y2="600" />
              </g>
              {/* Horizontal Flagstone Course Lines with Depth Perspective */}
              <line x1="0" y1="420" x2="400" y2="420" stroke="#7A6D5E" strokeWidth="3" />
              <line x1="0" y1="455" x2="400" y2="455" stroke="#BAAA96" strokeWidth="1.2" opacity="0.6" />
              <line x1="0" y1="500" x2="400" y2="500" stroke="#B09F8A" strokeWidth="1.5" opacity="0.75" />
              <line x1="0" y1="550" x2="400" y2="550" stroke="#A89782" strokeWidth="1.8" opacity="0.85" />
              {/* Subtle moss and stone texture gradient */}
              <rect x="0" y="420" width="400" height="180" fill="url(#stonePavementVanMieu)" opacity="0.2" />
            </g>
          </svg>
        )}

        {/* ================= LANDMARK 2: HOÀNG THÀNH HUẾ (NGỌ MÔN - NGŨ PHỤNG) ================= */}
        {landmarkId === 'hoang_thanh_hue' && (
          <svg
            className="w-full h-full"
            viewBox="0 0 400 600"
            preserveAspectRatio="xMidYMax slice"
          >
            {/* Distant Mountain Ngu Binh (Núi Ngự Bình) */}
            <path
              d="M 50 140 Q 150 105 240 130 Q 320 110 380 150 L 400 200 L 0 200 Z"
              fill={lightingId === 'dem_hoa_dang' ? '#2A2048' : '#B8A89A'}
              opacity="0.35"
            />

            {/* Clouds over Hue Citadel */}
            <g opacity="0.4" fill="#E6D7C8">
              <ellipse cx="90" cy="80" rx="55" ry="14" />
              <ellipse cx="310" cy="90" rx="65" ry="16" />
            </g>

            {/* NGỌ MÔN GATE STRUCTURE (ELEVATED BACKGROUND) */}
            <g transform="translate(0, -35)">
              {/* Massive Stone Thanh Platform */}
              <path
                d="M 20 340 L 380 340 L 365 440 L 35 440 Z"
                fill="#8A8275"
              />
              <line x1="25" y1="375" x2="375" y2="375" stroke="#70685D" strokeWidth="1.5" />
              <line x1="30" y1="410" x2="370" y2="410" stroke="#70685D" strokeWidth="1.5" />

              {/* THREE ARCHED GATEWAYS */}
              <path d="M 80 440 L 80 395 Q 105 375 130 395 L 130 440 Z" fill="#3D342C" />
              <path d="M 170 440 L 170 380 Q 200 355 230 380 L 230 440 Z" fill="#2C231B" />
              <rect x="168" y="375" width="64" height="4" fill="#D4AF37" />
              <path d="M 270 440 L 270 395 Q 295 375 320 395 L 320 440 Z" fill="#3D342C" />

              {/* Upper White Stone Balustrade */}
              <rect x="25" y="330" width="350" height="12" fill="#E8E2D8" />
              <g stroke="#B8B0A2" strokeWidth="1.5">
                {Array.from({ length: 15 }).map((_, i) => (
                  <line key={i} x1={35 + i * 23} y1="330" x2={35 + i * 23} y2="342" />
                ))}
              </g>

              {/* LẦU NGŨ PHỤNG */}
              <g fill="#992A22">
                <rect x="65" y="255" width="8" height="75" />
                <rect x="110" y="255" width="8" height="75" />
                <rect x="155" y="240" width="9" height="90" />
                <rect x="195" y="240" width="10" height="90" />
                <rect x="235" y="240" width="9" height="90" />
                <rect x="280" y="255" width="8" height="75" />
                <rect x="325" y="255" width="8" height="75" />
              </g>

              {/* Roofs */}
              <path
                d="M 130 245 Q 160 235 200 237 Q 240 235 270 245 Q 260 220 230 215 L 170 215 Q 140 220 130 245 Z"
                fill="#E5A93C"
              />
              <path d="M 45 260 Q 80 250 135 255 L 130 238 Q 75 235 50 248 Z" fill="#2E7558" />
              <path d="M 355 260 Q 320 250 265 255 L 270 238 Q 325 235 350 248 Z" fill="#2E7558" />
              <path
                d="M 150 215 Q 175 198 200 200 Q 225 198 250 215 Q 240 188 215 182 L 185 182 Q 160 188 150 215 Z"
                fill="#D4942B"
              />
              <path d="M 185 182 L 215 182 L 200 172 Z" fill="#D4AF37" />
            </g>

            {/* SÂN ĐẠI TRIỀU NGHI & CẦU TRUNG ĐẠO LÁT ĐÁ THANH (GROUND PLANE TỪ Y=420 ĐẾN 600) */}
            <g id="hue-citadel-ground">
              {/* Imperial Courtyard Flagstone Floor */}
              <path d="M 0 420 L 400 420 L 400 600 L 0 600 Z" fill="#BCB3A4" />
              {/* Royal Middle Path (Đường Dũng Đạo lát đá cẩm thạch vàng nhạt dành cho vua) */}
              <path d="M 130 420 L 270 420 L 290 600 L 110 600 Z" fill="#D4CABE" />
              <line x1="130" y1="420" x2="110" y2="600" stroke="#9E9484" strokeWidth="2.5" />
              <line x1="270" y1="420" x2="290" y2="600" stroke="#9E9484" strokeWidth="2.5" />
              {/* Perspective Flagstones */}
              <g stroke="#9E9484" strokeWidth="1.5" opacity="0.7">
                <line x1="50" y1="420" x2="0" y2="600" />
                <line x1="350" y1="420" x2="400" y2="600" />
                <line x1="200" y1="420" x2="200" y2="600" strokeWidth="1.8" stroke="#8C8274" />
              </g>
              {/* Horizontal Stone Joint Lines */}
              <line x1="0" y1="420" x2="400" y2="420" stroke="#665D4F" strokeWidth="3" />
              <line x1="0" y1="455" x2="400" y2="455" stroke="#9E9484" strokeWidth="1.2" />
              <line x1="0" y1="495" x2="400" y2="495" stroke="#948A7A" strokeWidth="1.5" />
              <line x1="0" y1="545" x2="400" y2="545" stroke="#8A8070" strokeWidth="1.8" />
              {/* Lotus Stone Balustrades on Left and Right flanks */}
              <rect x="0" y="420" width="22" height="180" fill="#ABA293" opacity="0.6" />
              <rect x="378" y="420" width="22" height="180" fill="#ABA293" opacity="0.6" />
            </g>
          </svg>
        )}

        {/* ================= LANDMARK 3: PHỐ CỔ HỘI AN (TƯỜNG VÀNG & HOA GIẤY) ================= */}
        {landmarkId === 'pho_co_hoi_an' && (
          <svg
            className="w-full h-full"
            viewBox="0 0 400 600"
            preserveAspectRatio="xMidYMid slice"
          >
            {/* Characteristic Weathered Ochre-Yellow Heritage Wall */}
            <rect x="0" y="140" width="400" height="460" fill="#E8B838" opacity="0.75" />
            {/* Weathered Moss & Stains on the Ancient Wall */}
            <path
              d="M 0 140 Q 60 180 120 150 Q 180 200 240 160 Q 320 210 400 150 L 400 220 Q 300 250 200 220 Q 80 260 0 200 Z"
              fill="#A88225"
              opacity="0.3"
            />
            <path
              d="M 0 350 Q 80 380 150 360 Q 220 400 280 370 Q 350 410 400 380 L 400 480 Q 280 500 160 470 Q 60 510 0 460 Z"
              fill="#7A601E"
              opacity="0.2"
            />

            {/* CURVED YIN-YANG TILE OVERHANG (MÁI NGÓI ÂM DƯƠNG RÊU PHONG) */}
            <g transform="translate(0, 120)">
              <path
                d="M -20 30 Q 100 15 200 18 Q 300 15 420 30 L 420 55 Q 300 35 200 38 Q 100 35 -20 55 Z"
                fill="#423730"
              />
              {/* Fluted roof tile ridges */}
              <g stroke="#261F1A" strokeWidth="2.5" opacity="0.8">
                {Array.from({ length: 22 }).map((_, i) => (
                  <line key={i} x1={i * 20} y1="20" x2={i * 20 - 5} y2="50" />
                ))}
              </g>
              {/* Moss on Eaves */}
              <path
                d="M 30 45 Q 80 38 140 46 Q 220 38 310 48 Q 370 40 410 52"
                stroke="#4E6638"
                strokeWidth="4"
                fill="none"
                opacity="0.7"
              />
            </g>

            {/* TRADITIONAL WOODEN SHUTTER WINDOW (CỬA SỔ GỖ NÂU LÁ SÁCH) */}
            <g transform="translate(50, 210)">
              <rect x="0" y="0" width="70" height="95" rx="3" fill="#3D291C" />
              <rect x="6" y="6" width="26" height="83" fill="#593D2C" stroke="#261A12" strokeWidth="2" />
              <rect x="38" y="6" width="26" height="83" fill="#593D2C" stroke="#261A12" strokeWidth="2" />
              {/* Slats */}
              <g stroke="#261A12" strokeWidth="1.5">
                <line x1="8" y1="25" x2="30" y2="25" />
                <line x1="8" y1="45" x2="30" y2="45" />
                <line x1="8" y1="65" x2="30" y2="65" />
                <line x1="40" y1="25" x2="62" y2="25" />
                <line x1="40" y1="45" x2="62" y2="45" />
                <line x1="40" y1="65" x2="62" y2="65" />
              </g>
            </g>

            {/* CASCADING MAGENTA BOUGAINVILLEA VINES (GIÀN HOA GIẤY RỰC RỠ) */}
            <g transform="translate(0, 80)">
              {/* Dark Twisting Branches */}
              <path
                d="M 260 40 Q 280 80 310 110 Q 340 140 370 200"
                stroke="#3B2E26"
                strokeWidth="4.5"
                fill="none"
              />
              <path
                d="M 310 100 Q 290 140 280 180 Q 275 210 260 230"
                stroke="#3B2E26"
                strokeWidth="3"
                fill="none"
              />
              <path
                d="M 330 130 Q 360 160 380 170"
                stroke="#3B2E26"
                strokeWidth="2.5"
                fill="none"
              />

              {/* Foliage Leaf Clusters */}
              <g fill="#2D5A38">
                <circle cx="280" cy="85" r="16" />
                <circle cx="310" cy="95" r="18" />
                <circle cx="340" cy="115" r="22" />
                <circle cx="320" cy="140" r="20" />
                <circle cx="285" cy="170" r="18" />
                <circle cx="365" cy="165" r="19" />
                <circle cx="270" cy="210" r="15" />
              </g>

              {/* Vibrant Magenta Flower Petals */}
              <g fill="#E11D48">
                <circle cx="275" cy="75" r="7" />
                <circle cx="286" cy="82" r="8" fill="#F43F5E" />
                <circle cx="295" cy="72" r="7.5" />
                <circle cx="305" cy="100" r="9" />
                <circle cx="318" cy="92" r="8" fill="#FB7185" />
                <circle cx="335" cy="110" r="10" />
                <circle cx="350" cy="120" r="9" fill="#F43F5E" />
                <circle cx="315" cy="135" r="9.5" />
                <circle cx="328" cy="145" r="8" fill="#FB7185" />
                <circle cx="280" cy="160" r="8.5" />
                <circle cx="292" cy="170" r="9" fill="#F43F5E" />
                <circle cx="360" cy="160" r="8" />
                <circle cx="372" cy="170" r="8.5" fill="#FB7185" />
                <circle cx="265" cy="205" r="8" fill="#F43F5E" />
                <circle cx="272" cy="220" r="7.5" />
              </g>
            </g>

            {/* HANGING FESTIVE SILK LANTERNS (ĐÈN LỒNG PHỐ HỘI) */}
            <g transform="translate(0, 100)">
              {/* Overhead String */}
              <path d="M 0 55 Q 120 75 250 65 Q 330 60 400 50" stroke="#261A12" strokeWidth="1.5" fill="none" />

              {/* Lantern 1: Ruby Red Pumpkin Lantern (Left) */}
              <g transform="translate(85, 68)">
                <line x1="0" y1="0" x2="0" y2="12" stroke="#B8860B" strokeWidth="1" />
                {/* Glow Halo */}
                <ellipse cx="0" cy="28" rx="20" ry="24" fill="#E11D48" opacity="0.3" filter="blur(6px)" />
                <ellipse cx="0" cy="28" rx="16" ry="18" fill="#DC2626" />
                {/* Ribs */}
                <path d="M -12 28 Q 0 12 12 28 Q 0 44 -12 28 Z" fill="#EF4444" opacity="0.4" />
                {/* Tassel */}
                <rect x="-4" y="44" width="8" height="4" fill="#D4AF37" />
                <line x1="0" y1="48" x2="0" y2="68" stroke="#D4AF37" strokeWidth="2" />
              </g>

              {/* Lantern 2: Imperial Gold Diamond Lantern (Center-Right) */}
              <g transform="translate(240, 62)">
                <line x1="0" y1="0" x2="0" y2="15" stroke="#B8860B" strokeWidth="1" />
                {/* Glow Halo */}
                <ellipse cx="0" cy="35" rx="22" ry="26" fill="#F59E0B" opacity="0.3" filter="blur(6px)" />
                {/* Diamond/Oval shape */}
                <path d="M 0 15 L 16 35 L 0 55 L -16 35 Z" fill="#F59E0B" />
                <path d="M 0 15 L 8 35 L 0 55 L -8 35 Z" fill="#FBBF24" />
                {/* Tassel */}
                <rect x="-4" y="55" width="8" height="4" fill="#B83227" />
                <line x1="0" y1="59" x2="0" y2="78" stroke="#B83227" strokeWidth="2" />
              </g>

              {/* Lantern 3: Turquoise Silk Lantern (Far Right) */}
              <g transform="translate(345, 52)">
                <line x1="0" y1="0" x2="0" y2="10" stroke="#B8860B" strokeWidth="1" />
                <ellipse cx="0" cy="24" rx="13" ry="15" fill="#0D9488" />
                <rect x="-3" y="38" width="6" height="3" fill="#D4AF37" />
                <line x1="0" y1="41" x2="0" y2="58" stroke="#D4AF37" strokeWidth="1.5" />
              </g>
            </g>

            {/* ĐƯỜNG PHỐ CỔ HỘI AN LÁT ĐÁ CỔ KÍNH TIẾP ĐẤT (Y=420 ĐẾN 600) */}
            <g id="hoi-an-street-ground">
              <path d="M 0 420 L 400 420 L 400 600 L 0 600 Z" fill="#6E6252" />
              {/* Sidewalk curb edge */}
              <line x1="0" y1="420" x2="400" y2="420" stroke="#42392E" strokeWidth="4" />
              <rect x="0" y="420" width="400" height="12" fill="#54493D" />
              {/* Cobblestone paving perspective grid */}
              <g stroke="#4A3F33" strokeWidth="1.6" opacity="0.8">
                <line x1="40" y1="432" x2="-30" y2="600" />
                <line x1="120" y1="432" x2="60" y2="600" />
                <line x1="200" y1="432" x2="200" y2="600" strokeWidth="2" />
                <line x1="280" y1="432" x2="340" y2="600" />
                <line x1="360" y1="432" x2="430" y2="600" />
              </g>
              {/* Horizontal cobblestone seams */}
              <line x1="0" y1="465" x2="400" y2="465" stroke="#4A3F33" strokeWidth="1.2" />
              <line x1="0" y1="510" x2="400" y2="510" stroke="#4A3F33" strokeWidth="1.5" />
              <line x1="0" y1="560" x2="400" y2="560" stroke="#4A3F33" strokeWidth="1.8" />
              {/* Warm golden lantern reflection on wet cobblestones */}
              <ellipse cx="200" cy="510" rx="90" ry="35" fill="#F59E0B" opacity="0.15" />
            </g>
          </svg>
        )}

        {/* ================= LANDMARK 4: CAFE INDOCHINE (GIAO THOA ĐÔNG DƯƠNG) ================= */}
        {landmarkId === 'cafe_indochine' && (
          <svg
            className="w-full h-full"
            viewBox="0 0 400 600"
            preserveAspectRatio="xMidYMax slice"
          >
            {/* Interior Pale Olive/Cream Wall */}
            <rect x="0" y="0" width="400" height="430" fill="#E8E4D8" opacity="0.85" />

            {/* Classic Wooden Wall Wainscoting (Ốp gỗ cổ điển nửa dưới tường) */}
            <rect x="0" y="320" width="400" height="105" fill="#422F22" />
            <g stroke="#261B13" strokeWidth="1.5">
              {Array.from({ length: 9 }).map((_, i) => (
                <rect
                  key={i}
                  x={15 + i * 43}
                  y="335"
                  width="33"
                  height="75"
                  fill="#543C2C"
                  rx="1"
                />
              ))}
            </g>
            <rect x="0" y="316" width="400" height="7" fill="#6E4F3A" />

            {/* TALL FRENCH COLONIAL ARCHED WINDOW (CỬA VÒM GỖ ĐÔNG DƯƠNG) */}
            <g transform="translate(100, 25)">
              {/* Outer Dark Wood Arch Frame */}
              <path
                d="M 0 290 L 0 100 Q 100 -20 200 100 L 200 290 Z"
                fill="#2E231C"
              />
              {/* Window Glass Pane Opening (Shows Tropical Garden Outside) */}
              <path
                d="M 12 284 L 12 105 Q 100 0 188 105 L 188 284 Z"
                fill="#D4E4DC"
              />
              {/* Distant Palm Leaves seen through window */}
              <g fill="#4E7858" opacity="0.6">
                <path d="M 40 180 Q 80 130 150 140 Q 110 170 40 180 Z" />
                <path d="M 60 120 Q 120 70 170 100 Q 130 130 60 120 Z" />
                <path d="M 20 230 Q 70 190 120 210 Q 80 235 20 230 Z" />
              </g>

              {/* Wooden Mullions / Window Grids */}
              <line x1="100" y1="10" x2="100" y2="284" stroke="#2E231C" strokeWidth="6" />
              <line x1="12" y1="120" x2="188" y2="120" stroke="#2E231C" strokeWidth="4" />
              <line x1="12" y1="200" x2="188" y2="200" stroke="#2E231C" strokeWidth="4" />
              {/* Radiating Fanlight Arches */}
              <path
                d="M 12 105 Q 100 45 188 105"
                stroke="#2E231C"
                strokeWidth="4"
                fill="none"
              />
              <line x1="100" y1="120" x2="40" y2="60" stroke="#2E231C" strokeWidth="3" />
              <line x1="100" y1="120" x2="160" y2="60" stroke="#2E231C" strokeWidth="3" />
            </g>

            {/* POTTED MONSTERA & TROPICAL INDOOR PLANT (LEFT CORNER) */}
            <g transform="translate(10, 220)">
              {/* Terracotta Plant Pot */}
              <path d="M 20 210 L 25 150 L 65 150 L 70 210 Z" fill="#9C5238" />
              <rect x="22" y="146" width="46" height="6" rx="2" fill="#BA6749" />
              {/* Monstera Leaves with Iconic Slits */}
              <g fill="#1E4D2B">
                <ellipse cx="30" cy="110" rx="28" ry="36" transform="rotate(-25 30 110)" />
                <ellipse cx="65" cy="85" rx="30" ry="38" transform="rotate(15 65 85)" fill="#296639" />
                <ellipse cx="45" cy="50" rx="26" ry="34" transform="rotate(-5 45 50)" fill="#36824B" />
              </g>
            </g>

            {/* VINTAGE RATTAN PENDANT CEILING LAMP (RIGHT) */}
            <g transform="translate(325, 0)">
              <line x1="0" y1="0" x2="0" y2="85" stroke="#2A201A" strokeWidth="2" />
              <path d="M -26 120 L -12 85 L 12 85 L 26 120 Z" fill="#A87A4A" stroke="#7A5630" strokeWidth="1.5" />
              <circle cx="0" cy="118" r="7" fill="#FDE047" />
              <circle cx="0" cy="118" r="28" fill="#F59E0B" opacity="0.25" />
            </g>

            {/* SÀN GẠCH BÔNG ĐÔNG DƯƠNG TIẾP ĐẤT (Y=420 ĐẾN 600) */}
            <g id="indochine-floor-ground">
              <rect x="0" y="420" width="400" height="180" fill="url(#indochineTiles)" />
              {/* Dark mahogany floor skirting trim */}
              <rect x="0" y="416" width="400" height="8" fill="#2E1C12" />
              <line x1="0" y1="416" x2="400" y2="416" stroke="#4A2E1D" strokeWidth="1.5" />
            </g>
          </svg>
        )}

        {/* ================= LANDMARK 5: STUDIO NEUTRAL (BỤC TRƯNG BÀY DI SẢN) ================= */}
        {landmarkId === 'studio_neutral' && (
          <svg
            className="w-full h-full"
            viewBox="0 0 400 600"
            preserveAspectRatio="xMidYMax slice"
          >
            {/* Museum / Studio gallery soft atmospheric backdrop */}
            <defs>
              <radialGradient id="studioSpotlight" cx="50%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.75" />
                <stop offset="60%" stopColor="#F5EFE4" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#E6DCCE" stopOpacity="0.15" />
              </radialGradient>
            </defs>
            <rect width="400" height="600" fill="url(#studioSpotlight)" />

            {/* Subtle Trống Đồng Đông Sơn watermark symbol on wall */}
            <g transform="translate(200, 200)" opacity="0.07">
              <circle cx="0" cy="0" r="110" fill="none" stroke="#2C241D" strokeWidth="3" />
              <circle cx="0" cy="0" r="90" fill="none" stroke="#2C241D" strokeWidth="2" strokeDasharray="6,4" />
              <circle cx="0" cy="0" r="70" fill="none" stroke="#2C241D" strokeWidth="2" />
              <circle cx="0" cy="0" r="30" fill="none" stroke="#2C241D" strokeWidth="3" />
              {Array.from({ length: 12 }).map((_, i) => (
                <line key={i} x1="0" y1="0" x2={90 * Math.cos(i * Math.PI / 6)} y2={90 * Math.sin(i * Math.PI / 6)} stroke="#2C241D" strokeWidth="1.5" />
              ))}
            </g>

            {/* MUSEUM EXHIBITION DAIS / BỤC GỖ TRƯNG BÀY DI SẢN (Y=430 ĐẾN 600) */}
            <g id="studio-pedestal-ground">
              {/* Cast shadow of pedestal */}
              <ellipse cx="200" cy="535" rx="170" ry="38" fill="#1C1917" opacity="0.14" />
              {/* Lower bevel layer */}
              <ellipse cx="200" cy="518" rx="165" ry="36" fill="#D4AF37" opacity="0.35" />
              <ellipse cx="200" cy="514" rx="160" ry="34" fill="#C5B7A2" />
              {/* Upper wood platform */}
              <ellipse cx="200" cy="506" rx="155" ry="32" fill="#EAE2D2" stroke="#D4AF37" strokeWidth="1.8" />
              {/* Inner subtle rim */}
              <ellipse cx="200" cy="506" rx="142" ry="28" fill="none" stroke="#BAAA92" strokeWidth="1" strokeDasharray="4,3" />
            </g>
          </svg>
        )}
      </div>

      {/* 3. SUBTLE DEPTH OF FIELD BOKEH / BLUR OVERLAY */}
      <div
        className={`absolute inset-0 pointer-events-none transition-all duration-500 ${
          isMiniPreview ? 'backdrop-blur-[0.2px]' : 'backdrop-blur-[0.4px]'
        }`}
      />

      {/* 4. WEATHER & LIGHTING SHADER FILTER OVERLAY */}
      {getLightingOverlay()}
    </div>
  );
};
