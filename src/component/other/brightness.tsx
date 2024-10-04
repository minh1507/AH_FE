import React from "react";
import { Slider, Box } from "@mui/material";
import { Brightness7, Brightness4 } from "@mui/icons-material";

interface BrightnessSliderProps {
  brightness: number;
  onChange: (event: Event, newValue: number | number[]) => void;
}

const BrightnessSlider: React.FC<BrightnessSliderProps> = ({
  brightness,
  onChange,
}) => {
  return (
    <Box display="flex" alignItems="center" sx={{ mt: 4 }}>
      <Brightness7 sx={{ mr: 2 }} />
      <Slider
        value={brightness}
        min={0}
        max={100}
        step={1}
        onChange={onChange}
        aria-labelledby="brightness-slider"
        sx={{ flexGrow: 1 }}
      />
      <Brightness4 sx={{ ml: 2 }} />
    </Box>
  );
};

export default BrightnessSlider;
