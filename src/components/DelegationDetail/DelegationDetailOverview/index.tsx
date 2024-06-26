import { Box, Grid, useTheme, alpha } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

import { CheckLightGreen, WarningLight } from "src/commons/resources";
import { formatADAFull, formatPercent, numberWithCommas } from "src/commons/utils/helper";
import ADAicon from "src/components/commons/ADAIcon";
import { CommonSkeleton } from "src/components/commons/CustomSkeleton";
import CustomTooltip from "src/components/commons/CustomTooltip";

import { FixedCostBox, Item, StyledContainer, Title, Value } from "./styles";

interface IDelegationDetailOverview {
  data: DelegationOverview | null;
  loading: boolean;
}

const DelegationDetailOverview: React.FC<IDelegationDetailOverview> = ({ data, loading }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const overviewData = [
    {
      title: (
        <Box data-testid="delegationDetailOverview.fixedCostTitle" component="span" sx={{ textWrap: "nowrap" }}>
          {t("glossary.fixedCost")} (<ADAicon />)
        </Box>
      ),
      value: <Box data-testid="delegationDetailOverview.fixedCostValue">{formatADAFull(data?.cost)}</Box>,
      tooltip: ""
    },
    {
      title: <Box data-testid="delegationDetailOverview.marginTitle">{t("margin")}</Box>,
      value: <Box data-testid="delegationDetailOverview.marginValue">{formatPercent(data?.margin)}</Box>,
      tooltip: ""
    },

    {
      title: (
        <Box
          data-testid="delegationDetailOverview.declaredPledgeTitle"
          component="span"
          display="flex"
          gap="4px"
          flexWrap="wrap"
          justifyContent="center"
        >
          {t("declaredPledge")}{" "}
          <FixedCostBox>
            (<ADAicon />)
          </FixedCostBox>
        </Box>
      ),
      value: (
        <Box data-testid="delegationDetailOverview.declaredPledgeValue" display={"flex"} alignItems={"center"} gap={1}>
          {formatADAFull(data?.pledge)}
          <CustomTooltip
            wOpacity={false}
            componentsProps={{
              transition: {
                style: {
                  backgroundColor: theme.isDark ? "black" : "white",
                  boxShadow: `0px 0px 10px ${alpha(theme.palette.common.white, 0.25)}`,
                  padding: "10px",
                  borderRadius: "8px",
                  border: `1px solid ${theme.palette.primary[200]}`
                }
              },
              arrow: {
                style: {
                  color: theme.isDark ? "black" : "white"
                },
                sx: {
                  "&:before": { border: `1px solid ${theme.palette.primary[200]}` }
                }
              }
            }}
            title={
              <Box px={"4px"}>
                <Box
                  data-testid="delegationDetailOverview.actualPledgeTitle"
                  fontSize="12px"
                  color={({ palette }) => palette.secondary.light}
                >
                  {t("glossary.actualPledge")}
                </Box>
                {data?.totalBalanceOfPoolOwners === null ? (
                  <Box color={({ palette }) => palette.secondary.light}>{t("common.N/A")}</Box>
                ) : (
                  <Box
                    data-testid="delegationDetailOverview.actualPledgeValue"
                    fontSize="14px"
                    color={({ palette }) => palette.secondary.light}
                  >
                    {formatADAFull(data?.totalBalanceOfPoolOwners)} (<ADAicon />)
                  </Box>
                )}
              </Box>
            }
          >
            {data && data.pledge > data.totalBalanceOfPoolOwners ? (
              <WarningLight data-testid="warning-light" />
            ) : (
              <CheckLightGreen data-testid="checking-green" />
            )}
          </CustomTooltip>
        </Box>
      ),
      tooltip: ""
    },
    {
      title: <Box data-testid="delegationDetailOverview.epochBlocksTitle">{t("epochBlocks")}</Box>,
      value: <Box data-testid="delegationDetailOverview.epochBlocksValue">{data?.epochBlock || 0}</Box>,
      tooltip: ""
    },
    {
      title: <Box data-testid="delegationDetailOverview.lifetimeBlocksTitle">{t("lifetimeBlocks")}</Box>,
      value: (
        <Box data-testid="delegationDetailOverview.lifetimeBlocksValue">{numberWithCommas(data?.lifetimeBlock)}</Box>
      ),
      tooltip: ""
    }
  ];

  if (loading) {
    return (
      <StyledContainer>
        <Grid container columns={24} spacing={2}>
          {overviewData.map((i, ii) => {
            return (
              <Grid item xs={24} sm={12} md={8} key={ii} xl={6}>
                <Box borderRadius={10} overflow="hidden">
                  <CommonSkeleton variant="rectangular" height={115} />
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </StyledContainer>
    );
  }
  return (
    <StyledContainer>
      <Grid container columns={60} spacing={2}>
        {overviewData.map((item, ii) => {
          return (
            <Grid item xs={30} sm={20} md={15} xl={12} key={ii}>
              <Item>
                <CustomTooltip title={item.tooltip}>
                  <Title>{item.title}</Title>
                </CustomTooltip>
                <Value
                  sx={{
                    color: (theme) => theme.palette.secondary.main
                  }}
                >
                  {item.value}
                </Value>
              </Item>
            </Grid>
          );
        })}
      </Grid>
    </StyledContainer>
  );
};

export default DelegationDetailOverview;
