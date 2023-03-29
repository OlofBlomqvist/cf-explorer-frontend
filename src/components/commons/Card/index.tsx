import { Box, styled } from "@mui/material";
import { BoxProps } from "@mui/system";
import React, { ReactNode } from "react";

const CardContainer = styled(Box)`
  background-color: transparent;
  border-radius: var(--border-radius);
`;

const Header = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled("h2")<{ underline: number }>`
  text-align: left;
  padding-bottom: 8px;
  position: relative;
  ${props => (props.underline ? `font-size: 1.25rem;` : "")}
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 4px;
    background-color: ${props => (props.underline ? props.theme.palette.primary.main : "unset")};
    left: 0;
    bottom: 0;
  }
`;

interface CardProps extends Omit<BoxProps, "title"> {
  title?: React.ReactNode;
  children?: ReactNode;
  underline?: boolean;
  extra?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children, underline = false, extra, ...props }) => {
  return (
    <CardContainer {...props}>
      <Header>
        {title ? <Title underline={underline ? 1 : 0}>{title}</Title> : null}
        {extra}
      </Header>
      {children}
    </CardContainer>
  );
};

export default Card;