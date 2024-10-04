import React from "react";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";

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
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box" },
      }}
    >
      <List>
        <ListItem button onClick={() => onSelectTool("brightness")}>
          <ListItemText primary="Brightness" />
        </ListItem>
        <ListItem button onClick={() => onSelectTool("rotate")}>
          <ListItemText primary="Rotate" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default ToolDrawer;
