import { ClickAwayListener, Tooltip, TooltipProps, useTheme } from "@mui/material";
import { useRef, useState } from "react";

import { useScreen } from "src/commons/hooks/useScreen";

interface Props extends TooltipProps {
  wOpacity?: boolean;
}

export const CustomTooltip = (props: Props) => {
  const { componentsProps, placement, wOpacity = true, open, onClose, children, onOpen, ...otherProps } = props;
  const [openTooltip, setOpenTooltip] = useState(false);

  const theme = useTheme();
  const { isMobile } = useScreen();
  const tooltipRef = useRef<HTMLDivElement>(null);

  const handleOpenTooltip = () => {
    setOpenTooltip(true);
  };

  const handleCloseTooltip = () => {
    setOpenTooltip(false);
  };

  return (
    <ClickAwayListener
      onClickAway={(e) => {
        if (onClose) {
          onClose(e);
        } else {
          setOpenTooltip(false);
        }
      }}
    >
      <Tooltip
        open={open || openTooltip}
        onClose={onClose || handleCloseTooltip}
        onOpen={onOpen || handleOpenTooltip}
        ref={tooltipRef}
        arrow
        placement={placement || "top"}
        componentsProps={{
          ...(componentsProps || {}),
          arrow: {
            ...(componentsProps?.arrow || {}),
            style: {
              fontSize: "var(--font-size-text-small)",
              color: theme.palette.common.black,
              ...(componentsProps?.arrow?.style || {})
            }
          },
          transition: {
            ...(componentsProps?.transition || {}),
            style: {
              maxWidth: isMobile ? "calc(100vw - 20px)" : 400,
              fontSize: "var(--font-size-text-small)",
              padding: "6px 8px",
              lineHeight: 1.5,
              backgroundColor: theme.palette.common.black,
              opacity: wOpacity ? 0.78 : 1,
              borderRadius: 2,
              ...(componentsProps?.transition?.style || {})
            }
          }
        }}
        {...otherProps}
      >
        {children}
      </Tooltip>
    </ClickAwayListener>
  );
};

export default CustomTooltip;
