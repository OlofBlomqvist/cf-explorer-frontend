import { styled, Box, IconButton } from "@mui/material";

export const ModalContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "min(80vw, 500px)",
  backgroundColor: theme.boxBackgroundColor,
  padding: "30px 40px 48px",
  borderRadius: 20,
  textAlign: "left",
}));

export const CloseButton = styled(IconButton)<{ saving: boolean }>`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  padding: 0;
  border: 1px solid ${props => props.theme.gray_9};
  cursor: ${props => (props.saving ? `wait` : `pointer`)};
  &:hover {
    ${props => (props.saving ? `background: none;` : ``)}
  }
`;
