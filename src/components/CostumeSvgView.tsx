import React from 'react';
import { OutfitConfig } from '../types/costume';
import { OutfitCharacterSVG } from './OutfitCharacterSVG';

interface CostumeSvgViewProps {
  outfit: OutfitConfig;
  className?: string;
  showSeal?: boolean;
}

export const CostumeSvgView: React.FC<CostumeSvgViewProps> = ({
  outfit,
  className = 'w-full h-full',
  showSeal = true,
}) => {
  return (
    <OutfitCharacterSVG
      outfit={outfit}
      className={className}
      showSeal={showSeal}
    />
  );
};
