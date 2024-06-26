import { Typography, styled } from "@mui/material";

import { AdaLogoIcon } from "../ADAIcon";

export const AdaHolderImage = styled("img")(() => ({
  width: 100,
  height: 100
}));

export const AdaHolderValue = styled(Typography)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  color: theme.palette.secondary.main,
  fontSize: 14,
  gap: 5,
  marginTop: 3
}));

export const StyledAdaLogoIcon = styled(AdaLogoIcon)(({ theme }) => ({
  fontSize: 11,
  fill: theme.palette.secondary.main,
  marginBottom: ".125em"
}));
