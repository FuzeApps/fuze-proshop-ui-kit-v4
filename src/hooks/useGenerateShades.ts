import { hslToColorString, lighten, parseToHsl } from 'polished';

export const useGenerateShades = () => {
  const SHADE_PERCENTAGES = [0.25, 0.4, 0.45, 0.6];

  const generateShades = (hexColor?: string): string[] => {
    if (!hexColor) return Array(SHADE_PERCENTAGES.length).fill('');
    const hslColor = parseToHsl(hexColor);
    const shades = SHADE_PERCENTAGES.map((percentage) => {
      return lighten(percentage, hslToColorString(hslColor));
    });
    return shades;
  };

  return generateShades;
};
