import { Box, Grid, alpha, styled } from "@mui/material";

export const EpochCard = styled(Box)(({ theme }) => ({
  display: "flex",
  backgroundColor: theme.palette.common.white,
  borderRadius: 12,
  padding: 24,
  marginBottom: 24,
  flexDirection: "column",
  alignItems: "flex-start",
  overflowX: "scroll",
}));

export const EpochNumber = styled(Box)(({ theme }) => ({
  fontWeight: 600,
  fontSize: 16,
  marginBottom: 8,
}));

export const TitleCard = styled(Box)(({ theme }) => ({
  color: alpha(theme.palette.common.black, 0.5),
  fontSize: "0.875rem",
}));

export const EpochText = styled("span")`
  color: ${props => props.theme.palette.grey[400]};
  text-transform: uppercase;
`;

export const EpochProgress = styled("h3")(({ theme }) => ({
  color: theme.palette.primary.main,
  margin: 0,
  [theme.breakpoints.down(theme.breakpoints.values.md)]: {
    fontSize: 14,
  }
}));


export const EpochValue = styled(Box)(({ theme }) => ({
  color: theme.palette.common.black,
  fontSize: 25,
  fontWeight: 600,
  marginTop: 12,
}));

export const CardItem = styled(Grid)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  paddingLeft: 16,
  borderLeft: `1px solid ${theme.palette.grey[200]}`,
  minWidth: 250,
  margin: "8px 0",
}));

export const CardItemTitle = styled(Box)(({ theme }) => ({
  color: theme.palette.grey[400],
  marginLeft: 8,
}));

export const MaxSlot = styled("span")`
  color: ${props => props.theme.palette.grey[400]};
  font-size: 20px;
`

export const Date = styled("div")`
  font-size: 1.25rem;
  margin-top: 8px;
  font-weight: 600;
`

export const Time = styled("div")`
  font-size: 1.25rem;
  color: ${props => props.theme.palette.grey[400]};
`
