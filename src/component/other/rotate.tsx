import React from "react";
import { Grid, IconButton, Typography, Box } from "@mui/material";
import { RotateLeft, RotateRight } from "@mui/icons-material";

interface RotateControlsProps {
  onRotateLeft: () => void;
  onRotateRight: () => void;
}

const RotateControls: React.FC<RotateControlsProps> = ({
  onRotateLeft,
  onRotateRight,
}) => {
  return (
    <Box sx={{ mt: 4 }}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item>
          <IconButton onClick={onRotateLeft} color="primary">
            <RotateLeft />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton onClick={onRotateRight} color="primary">
            <RotateRight />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RotateControls;
