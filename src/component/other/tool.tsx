import React from "react";
import { Drawer, Grid, IconButton } from "@mui/material"; // Import Grid and IconButton
import Brightness4Icon from "@mui/icons-material/Brightness4"; // Import the icon for brightness
import RotateRightIcon from "@mui/icons-material/RotateRight"; // Import the icon for rotate

interface ToolDrawerProps {
  onSelectTool: (tool: string) => void;
}

const ToolDrawer: React.FC<ToolDrawerProps> = ({ onSelectTool }) => {
  return (
    <Drawer
      variant="permanent"
      anchor="right"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box", marginTop: '64px' }, // Adjust for AppBar height
      }}
    >
      <Grid container spacing={2} sx={{ padding: 2 }}> {/* Use Grid container */}
        <Grid item xs={4}> {/* Each item takes up 4 columns (3 items per row) */}
          <IconButton onClick={() => onSelectTool("brightness")}>
            <Brightness4Icon />
          </IconButton>
        </Grid>
        <Grid item xs={4}>
          <IconButton onClick={() => onSelectTool("rotate")}>
            <RotateRightIcon />
          </IconButton>
        </Grid>
        {/* Add more tools here, ensuring they stay within the 3 items per row limit */}
      </Grid>
    </Drawer>
  );
};

export default ToolDrawer;
