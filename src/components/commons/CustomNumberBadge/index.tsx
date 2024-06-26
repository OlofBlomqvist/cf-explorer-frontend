import { Box, useTheme } from "@mui/material";

import { CustomBadge } from "./styles";

interface Props {
  value: number | null | undefined;
  ml?: string;
}

export const CustomNumberBadge: React.FC<Props> = ({ value, ml }: Props) => {
  const theme = useTheme();
  if (!value) return null;
  return (
    <Box display={"inline-block"} marginLeft={0.5}>
      <CustomBadge
        bgColor={theme.isDark ? theme.palette.primary.main : ""}
        color={theme.isDark ? theme.palette.secondary[100] : ""}
        ml={ml}
      >
        {value}
      </CustomBadge>
    </Box>
  );
};
