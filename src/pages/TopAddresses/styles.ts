import { Container, Box, styled } from "@mui/material";

export const TabTitle = styled(Box)`
  margin-bottom: 0px;
  padding-left: 8px;
  color: ${({ theme }) => theme.palette.secondary.light};
  text-align: left;
  text-transform: capitalize !important;
  font-size: 18px;
  line-height: 21px;
  ${({ theme }) => theme.breakpoints.down("sm")} {
    font-size: 14px;
    line-height: 16px;
  }
  &.active {
    color: ${({ theme }) => theme.palette.primary.main};
  }
`;

export const StyledContainer = styled(Container)`
  .MuiSelect-select.MuiSelect-outlined {
    padding-top: 10px;
    padding-bottom: 10px;
  }

  @media screen and (max-width: ${(props) => props.theme.breakpoints.values.sm}px) {
    margin-top: 0px !important;
  }
`;
