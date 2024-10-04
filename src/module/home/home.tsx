import React, { useState } from "react";
import { AppBar, Toolbar, Container, Box } from "@mui/material";
import { useTitle } from "../../hook/title/title";
import { saveAs } from "file-saver";
import BrightnessSlider from "../../component/other/brightness";
import RotateControls from "../../component/other/rotate";
import Canvas from "../../component/other/canva";
import ToolDrawer from "../../component/other/tool";
import FileMenu from "../menu/menu";

const Home = () => {
  useTitle("home");

  // State management
  const [image, setImage] = useState<string | null>(null);
  const [brightness, setBrightness] = useState<number>(50);
  const [rotation, setRotation] = useState<number>(0);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [isGreyscale, setIsGreyscale] = useState<boolean>(false); // New state for greyscale

  // Handlers for image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handlers for brightness change
  const handleBrightnessChange = (event: Event, newValue: number | number[]) => {
    setBrightness(newValue as number);
  };

  // Handlers for rotation controls
  const handleRotate = (direction: 'left' | 'right') => {
    setRotation((prev) => prev + (direction === 'left' ? -90 : 90));
  };

  // Greyscale toggle function
  const toggleGreyscale = () => {
    setIsGreyscale((prev) => !prev);
  };

  // Export functionality
  const handleExport = () => {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      canvas.toBlob((blob) => {
        if (blob) {
          saveAs(blob, "edited-image.png");
        }
      });
    }
  };

  return (
    <div>
      <AppBar sx={{ zIndex: 1200 }}>
        <Toolbar sx={{ zIndex: 1201 }}>
          <FileMenu handleImageUpload={handleImageUpload} handleExport={handleExport} />
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4, display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <Box>
          {image && <Canvas image={image} rotation={rotation} brightness={brightness} isGreyscale={isGreyscale} />}
        </Box>

        {image && (
          <Box>
            <ToolDrawer
              onSelectTool={setSelectedTool}
              isGreyscale={isGreyscale}
              toggleGreyscale={toggleGreyscale}
            />
          </Box>
        )}

        {selectedTool === "brightness" && image && (
          <BrightnessSlider brightness={brightness} onChange={handleBrightnessChange} />
        )}

        {selectedTool === "rotate" && image && (
          <RotateControls onRotateLeft={() => handleRotate('left')} onRotateRight={() => handleRotate('right')} />
        )}
      </Container>
    </div>
  );
};

export default Home;
