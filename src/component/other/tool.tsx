import React from "react";
import { Drawer, Grid, IconButton, Tooltip } from "@mui/material"; 
import Brightness4Icon from "@mui/icons-material/Brightness4"; 
import RotateRightIcon from "@mui/icons-material/RotateRight"; 
import FilterVintageIcon from "@mui/icons-material/FilterVintage";

interface ToolDrawerProps {
  onSelectTool: (tool: string) => void;
  isGreyscale: boolean; 
  toggleGreyscale: () => void; 
}

const ToolDrawer: React.FC<ToolDrawerProps> = ({ onSelectTool, isGreyscale, toggleGreyscale }) => {
  return (
    <Drawer
      variant="permanent"
      anchor="right"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box", marginTop: '64px' }, 
      }}
    >
      <Grid container spacing={2} sx={{ padding: 2 }}>
        <Grid item xs={4}> 
          <Tooltip title="Adjust Brightness" arrow>
            <IconButton onClick={() => onSelectTool("brightness")}>
              <Brightness4Icon />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item xs={4}>
          <Tooltip title="Rotate Image" arrow>
            <IconButton onClick={() => onSelectTool("rotate")}>
              <RotateRightIcon />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item xs={4}>
          <Tooltip title={isGreyscale ? "Disable Greyscale" : "Enable Greyscale"} arrow>
            <IconButton onClick={toggleGreyscale}>
              <FilterVintageIcon color={isGreyscale ? "primary" : "inherit"} /> 
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Drawer>
  );
};

export default ToolDrawer;
