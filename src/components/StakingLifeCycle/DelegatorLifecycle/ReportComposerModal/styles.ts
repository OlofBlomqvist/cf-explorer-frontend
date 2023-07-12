import { styled, Stack, Box, Button, TextField, Slider, FormLabel, alpha } from "@mui/material";

import CustomSelect from "src/components/commons/CustomSelect";

export const Container = styled(Box)(({ theme }) => ({
  maxHeight: "calc(100vh - 120px)",
  [theme.breakpoints.down("sm")]: {
    label: {
      "*": {
        fontSize: 14,
        lineHeight: "16px"
      }
    }
  }
}));

export const StyledLabel = styled("div")`
  font-weight: 400;
  color: ${(props) => props.theme.palette.grey[400]};
  font-size: 14px;
  line-height: 16px;
  margin: 6px 0px;
`;

export const StyledSelect = styled(CustomSelect)(() => ({
  borderRadius: "4px",
  fontSize: 14,
  minWidth: 50,
  border: "1px solid #E3E5E9",
  width: 200,
  textAlign: "left",
  paddingLeft: 14,
  "& > div": {
    padding: "2.45px 14px"
  },
  "& > fieldset": {
    top: 2
  },
  background: "transparent",
  "& >svg": {
    top: "calc(50% - 9px)"
  },
  ".MuiOutlinedInput-notchedOutline": {
    border: 0,
    borderRadius: 0,
    borderRight: "1px solid #E3E5E9"
  }
}));

export const ModalTitle = styled("div")`
  font-weight: 700;
  color: #13152f;
  margin-bottom: 25px;
`;

export const StyledStack = styled(Stack)`
  margin-bottom: 20px;
`;

export const TextWarning = styled("div")`
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: rgba(0, 0, 0, 0.5);
  margin-bottom: 20px;
`;
export const TextError = styled(TextWarning)`
  color: ${({ theme }) => theme.palette.error.main};
  margin-top: -10px;
  margin-bottom: 20px;
`;

export const StyledAddressSelect = styled(Box)`
  border: 1.5px solid #e3e5e9;
  border-radius: 8px;
  padding: 4px 0px;
  .MuiInputBase-root {
    border-radius: 0;
    border: 0;
  }
`;

export const StyledButton = styled(Button)`
  background: ${(props) => props.theme.palette.grey[400]};
  width: 100%;
  border-radius: 8px;
  height: 44px;
  padding: 10px 20px;
  text-align: center;
  color: #fff;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  text-transform: none;
  &:disabled {
    background: ${(props) => props.theme.palette.grey[400]};
    opacity: 0.3;
    color: #fff;
  }
  &:hover {
    background: ${(props) => props.theme.palette.grey[400]};
    opacity: 0.8;
  }
  ${({ theme }) => theme.breakpoints.down("sm")} {
    font-size: 14px;
    line-height: 16px;
  }
`;
export const StyledBackButton = styled(Button)<{ width?: number | string }>(({ width = 100, theme }) => ({
  width: `${width}%`,
  borderRadius: "8px",
  height: "44px",
  textAlign: "center",
  color: theme.palette.grey[400],
  fontSize: 16,
  lineHeight: "19px",
  fontWeight: 700,
  border: "2px solid #c8cdd8",
  textTransform: "none",
  ":hover": {
    opacity: 0.8
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: 14,
    lineHeight: "16px"
  }
}));

export const SubText = styled("div")`
  color: ${({ theme }) => theme.palette.grey[400]};
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  margin-bottom: 5px;
`;

export const TextRequired = styled("div")`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: ${(props) => props.theme.palette.grey[300]};
  line-height: 22px;
`;

export const ButtonEvent = styled(Button)<{ active: number }>(({ theme, active }) => ({
  background: active ? theme.palette.grey[300] : alpha(theme.palette.grey[400], 0.05),
  color: active ? theme.palette.common.white : theme.palette.grey[300],
  borderRadius: "6px",
  height: "44px",
  alignItems: "center",
  padding: "13px 20px",
  gap: "10px",
  textTransform: "capitalize",
  fontSize: 16,
  lineHeight: "19px",
  fontWeight: 400,
  "&:hover": {
    background: active ? theme.palette.grey[300] : alpha(theme.palette.grey[400], 0.05),
    color: active ? "#fff" : theme.palette.grey[300]
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: 14,
    lineHeight: "16px"
  }
}));

export const OverViewItem = styled(Box)(() => ({
  display: "flex",
  padding: "10px 0px",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  borderBottom: "1px solid #000000",
  "&:last-of-type": {
    borderBottom: "none"
  }
}));

export const OverViewValue = styled(Box)(({ theme }) => ({
  display: "flex",
  flex: 1,
  width: "100%",
  overflow: "hidden",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 5,
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "flex-start"
  }
}));

export const TextLabelReview = styled("div")`
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: ${(props) => props.theme.palette.grey[400]};
  opacity: 0.6;
  white-space: nowrap;
  ${({ theme }) => theme.breakpoints.down("sm")} {
    font-size: 14px;
    line-height: 16px;
  }
`;

export const TextValueReview = styled("div")`
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  max-width: 250px;
  color: #000000;
  ${({ theme }) => theme.breakpoints.down("sm")} {
    font-size: 14px;
    line-height: 16px;
    max-width: 100%;
  }
`;

export const TextOverFlow = styled(Box)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  color: ${(props) => props.theme.palette.grey[400]};
  width: max-content;
  text-align: right;
  margin-left: auto;
  ${({ theme }) => theme.breakpoints.down("sm")} {
    text-align: left;
    margin-left: 0;
  }
`;

export const StyledGroupField = styled(TextField)`
  .MuiInputBase-root {
    padding: 0 9px;
    height: 40px;
    border-radius: 8px;
    width: calc(100% - 23px);
  }
  .MuiFormControl-root {
  }
  .MuiInputBase-input {
    font-size: 14px;
  }
  .MuiOutlinedInput-notchedOutline {
    border: none;
  }
`;
export const StyledSlider = styled(Slider)`
  & .MuiSlider-valueLabel,
  .MuiSlider-valueLabelLabe,
  .MuiSlider-valueLabelOpen {
    transform: translateY(160%) scale(1) !important;
    &::before {
      top: -8px !important;
    }
  }

  margin-bottom: 12px;
`;

export const StyledFormLabel = styled(FormLabel)`
  color: ${(props) => props.theme.palette.grey[400]};
  &.Mui-focused {
    color: ${(props) => props.theme.palette.grey[400]};
  }
`;

export const StyledTextField = styled(TextField)`
  .MuiInputBase-root {
    padding: 0 9px;
    height: 40px;
    border: 1.5px solid ${(props) => props.theme.palette.border.main};
    border-radius: 8px;
  }
  .MuiFormControl-root {
  }
  .MuiInputBase-input {
    font-size: 14px;
  }
  .MuiOutlinedInput-notchedOutline {
    border: none;
  }
`;
