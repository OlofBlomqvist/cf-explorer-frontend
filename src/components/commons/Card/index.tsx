import { Box, styled, BoxProps, SxProps } from "@mui/material";
import React, { ReactNode } from "react";

const CardContainer = styled(Box)`
  background-color: transparent;
  border-radius: var(--border-radius);
  position: relative;
`;

const Header = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${({ theme }) => theme.breakpoints.down("md")} {
    flex-direction: column;
    align-items: baseline;
  }
`;

export const Title = styled("h2")<{ underline: number }>`
  line-height: 0;
  margin-top: 48px;
  ${(props) => props.theme.breakpoints.down("md")} {
    margin-top: 32px;
  }
  text-align: left;
  padding-bottom: 8px;
  margin-bottom: 0px;
  position: relative;
  width: max-content;
  color: ${(props) => props.theme.palette.secondary.main};
  ${(props) => (props.underline ? `font-size: 1.25rem;` : "")};
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 4px;
    background-color: ${(props) => (props.underline ? props.theme.palette.primary[200] : "unset")};
    left: 0;
    bottom: 0;
  }
  ${({ theme }) => theme.breakpoints.down("sm")} {
    font-size: 24px !important;
  }
`;

interface CardProps extends Omit<BoxProps, "title"> {
  title?: React.ReactNode;
  children?: ReactNode;
  underline?: boolean;
  extra?: React.ReactNode;
  titleSx?: SxProps;
}

const Card: React.FC<CardProps> = ({ title, children, underline = false, extra, titleSx, ...props }) => {
  return (
    <CardContainer {...props}>
      <Header>
        {title ? (
          <Title underline={underline ? 1 : 0} sx={titleSx}>
            {title}
          </Title>
        ) : null}
        {extra}
      </Header>
      {children}
    </CardContainer>
  );
};

export default Card;
