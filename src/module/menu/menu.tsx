import React, { useRef } from "react";
import { Button, Menu, MenuItem } from "@mui/material";

interface FileMenuProps {
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleExport: () => void; // New prop for handling image export
}

const FileMenu: React.FC<FileMenuProps> = ({ handleImageUpload, handleExport }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        aria-controls="file-menu"
        aria-haspopup="true"
        color="inherit"
        onClick={handleMenuClick}
      >
        File
      </Button>
      <Menu
        id="file-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            inputRef.current?.click();
            handleMenuClose();
          }}
        >
          Upload Image
        </MenuItem>
        {/* Export Image option */}
        <MenuItem
          onClick={() => {
            handleExport();
            handleMenuClose();
          }}
        >
          Export Image
        </MenuItem>
      </Menu>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        ref={inputRef}
        style={{ display: "none" }}
      />
    </>
  );
};

export default FileMenu;
