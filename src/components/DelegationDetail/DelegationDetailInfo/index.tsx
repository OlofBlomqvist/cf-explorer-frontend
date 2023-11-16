import { Box, useTheme } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { HiArrowLongLeft } from "react-icons/hi2";
import { Link, useHistory } from "react-router-dom";

import { useScreen } from "src/commons/hooks/useScreen";
import {
  CalendarIconComponent,
  DelegatorIconComponent,
  DropIconComponent,
  HighestIconComponent,
  RewardIconComponent,
  TickerIconComponent,
  UserIconComponent
} from "src/commons/resources";
import { details } from "src/commons/routers";
import { formatADAFull, formatDateTimeLocal, formatPercent, truncateCustom } from "src/commons/utils/helper";
import ADAicon from "src/components/commons/ADAIcon";
import BookmarkButton from "src/components/commons/BookmarkIcon";
import CustomIcon from "src/components/commons/CustomIcon";
import { CommonSkeleton } from "src/components/commons/CustomSkeleton";
import CustomTooltip from "src/components/commons/CustomTooltip";
import DropdownDetail from "src/components/commons/DropdownDetail";
import FormNowMessage from "src/components/commons/FormNowMessage";
import DynamicEllipsisText from "src/components/DynamicEllipsisText";
import { TruncateSubTitleContainer } from "src/components/share/styled";

import {
  BackButton,
  BackText,
  ButtonViewAll,
  DataContainer,
  FlexGap10,
  HeaderContainer,
  HeaderDetailContainer,
  HeaderTitle,
  HeaderTitleSkeleton,
  InfoTitle,
  InfoValue,
  Item,
  PoolDescription,
  PoolDescriptionWrapper,
  PoolHomepage,
  PoolId,
  PoolIdLabel,
  PoolIdSkeleton,
  PoolIdValue,
  StyledGrid,
  StyledLinearProgress,
  StyledTitle,
  TimeDuration
} from "./styles";

export interface IDelegationDetailInfo {
  data: DelegationOverview | null;
  loading: boolean;
  poolId: string;
  lastUpdated?: number;
}

const DelegationDetailInfo: React.FC<IDelegationDetailInfo> = ({ data, loading, poolId, lastUpdated }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { width } = useScreen();
  const history = useHistory();
  const [isErrorImage, setIsErrorImage] = useState(false);
  const [isOpenReward, setOpenReward] = useState<boolean>(false);
  const [isOpenOwner, setOpenOwner] = useState<boolean>(false);
  const { isGalaxyFoldSmall } = useScreen();

  if (loading) {
    return (
      <HeaderDetailContainer>
        <BackButton onClick={history.goBack}>
          <HiArrowLongLeft color={theme.palette.secondary.light} />
          <BackText>{t("common.back")}</BackText>
        </BackButton>
        <HeaderContainer>
          <HeaderTitle>
            <HeaderTitleSkeleton variant="rectangular" />
          </HeaderTitle>
        </HeaderContainer>
        <PoolId>
          <PoolIdSkeleton variant="rectangular" />
        </PoolId>
        <Box borderRadius={10} overflow="hidden">
          <CommonSkeleton variant="rectangular" height={250} width="100%" />
        </Box>
      </HeaderDetailContainer>
    );
  }

  const isPoolName = !!data?.poolName;

  return (
    <HeaderDetailContainer>
      <BackButton onClick={history.goBack}>
        <HiArrowLongLeft color={theme.palette.secondary.light} />
        <BackText>{t("common.back")}</BackText>
      </BackButton>
      <HeaderContainer>
        <Box display={"flex"} alignItems={"center"}>
          <CustomTooltip title={data?.poolName || poolId}>
            <HeaderTitle>
              {isPoolName ? (
                data?.poolName
              ) : width < 400 ? (
                truncateCustom(poolId, 4, 4)
              ) : (
                <TruncateSubTitleContainer>
                  <DynamicEllipsisText value={poolId} sxFirstPart={{ maxWidth: "calc(100% - 165px)" }} />
                </TruncateSubTitleContainer>
              )}
            </HeaderTitle>
          </CustomTooltip>
          <Box marginLeft={isPoolName ? 0 : 3}>
            <BookmarkButton keyword={poolId} type="POOL" />
          </Box>
        </Box>
        {data?.logoUrl && !isErrorImage && (
          <Box
            bgcolor={theme.palette.common.white}
            border={`1px solid ${theme.isDark ? theme.palette.secondary[700] : theme.palette.primary[200]}`}
            borderRadius={1}
            component={"img"}
            src={data?.logoUrl || ""}
            width={"64px"}
            onError={(e) => {
              if (e.type === "error") setIsErrorImage(true);
            }}
          />
        )}
      </HeaderContainer>
      <PoolId>
        <PoolIdLabel>{t("common.poolId")}: </PoolIdLabel>
        <Link to={details.delegation(data?.poolView)}>
          <PoolIdValue>
            <TruncateSubTitleContainer>
              <DynamicEllipsisText value={data?.poolView || ""} isCopy isTooltip />
            </TruncateSubTitleContainer>
          </PoolIdValue>
        </Link>
      </PoolId>
      {data?.hashView && (
        <PoolId>
          <PoolIdLabel>{t("common.poolhash")}: </PoolIdLabel>
          <Link to={details.delegation(data?.hashView)}>
            <PoolIdValue>
              <TruncateSubTitleContainer>
                <DynamicEllipsisText value={data?.hashView || ""} isCopy isTooltip />
              </TruncateSubTitleContainer>
            </PoolIdValue>
          </Link>
        </PoolId>
      )}
      {data?.homepage && (
        <PoolId>
          <PoolIdLabel>{t("common.poolHomepage")}: </PoolIdLabel>
          <PoolHomepage href={data?.homepage} target="_blank" rel="noreferrer">
            {data?.homepage}
          </PoolHomepage>
        </PoolId>
      )}
      {data?.description && (
        <PoolDescriptionWrapper>
          <PoolIdLabel>{t("common.poolDescription")}: </PoolIdLabel>
          <PoolDescription>{data?.description}</PoolDescription>
        </PoolDescriptionWrapper>
      )}
      <TimeDuration>
        <FormNowMessage time={lastUpdated} />
      </TimeDuration>
      <DataContainer>
        <StyledGrid container>
          <Item item xs={6} md={3} top={1}>
            <CustomIcon fill={theme.palette.secondary.light} icon={TickerIconComponent} height={22} />
            <InfoTitle>
              <StyledTitle>{t("common.ticker")}</StyledTitle>
            </InfoTitle>
            <InfoValue>{data?.tickerName || ""}</InfoValue>
          </Item>
          <Item item xs={6} md={3} top={1}>
            <CustomIcon fill={theme.palette.secondary.light} height={22} icon={CalendarIconComponent} />
            <InfoTitle>
              <StyledTitle>{t("createdAt")}</StyledTitle>
            </InfoTitle>
            <InfoValue>{data?.createDate && formatDateTimeLocal(data.createDate || "")}</InfoValue>
          </Item>
          <Item item xs={6} md={3} top={1} sx={{ position: "relative" }}>
            <CustomIcon fill={theme.palette.secondary.light} height={22} icon={RewardIconComponent} />
            <InfoTitle>
              <StyledTitle>{t("rewardAccount")}</StyledTitle>
              <InfoValue mt={"4px"}>
                {data?.rewardAccounts ? (
                  <>
                    <Box
                      component={Link}
                      to={details.stake(data?.rewardAccounts[0] || "")}
                      style={{ fontFamily: "var(--font-family-text)" }}
                      color={(theme) => `${theme.palette.primary.main} !important`}
                    >
                      <DynamicEllipsisText value={data?.rewardAccounts[0] || ""} isCopy isTooltip />
                    </Box>
                  </>
                ) : (
                  ""
                )}
              </InfoValue>
              {data?.rewardAccounts && data.rewardAccounts.length > 1 && (
                <ButtonViewAll
                  sx={{ color: (theme) => theme.palette.common.black }}
                  onClick={() => {
                    setOpenReward(!isOpenReward);
                    setOpenOwner(false);
                  }}
                >
                  {t("common.viewAll")}
                </ButtonViewAll>
              )}
            </InfoTitle>

            {isOpenReward && (
              <DropdownDetail
                title={t("glossary.rewardAccountList")}
                value={data?.rewardAccounts || []}
                close={() => setOpenReward(false)}
              />
            )}
          </Item>
          <Item item xs={6} md={3} top={1} sx={{ position: "relative" }} width={"100%"}>
            <CustomIcon fill={theme.palette.secondary.light} height={22} icon={UserIconComponent} />
            <InfoTitle>
              <Box width={"100%"}>
                <StyledTitle>{t("ownerAccount")}</StyledTitle>{" "}
                <InfoValue mt={"4px"}>
                  {data?.ownerAccounts ? (
                    <Box
                      component={Link}
                      color={(theme) => `${theme.palette.primary.main} !important`}
                      to={details.stake(data?.ownerAccounts[0] || "")}
                      style={{ fontFamily: "var(--font-family-text)" }}
                    >
                      <DynamicEllipsisText value={data?.ownerAccounts[0] || ""} isCopy isTooltip />
                    </Box>
                  ) : (
                    ""
                  )}
                </InfoValue>
              </Box>
              {data?.ownerAccounts && data.ownerAccounts.length > 1 && (
                <ButtonViewAll
                  sx={{
                    color: (theme) => theme.palette.secondary[0],
                    background: (theme) => theme.palette.primary.main,
                    border: (theme) => `1px solid ${theme.palette.primary[200]}`
                  }}
                  onClick={() => {
                    setOpenOwner(!isOpenOwner);
                    setOpenReward(false);
                  }}
                >
                  {t("common.viewAll")}
                </ButtonViewAll>
              )}
            </InfoTitle>

            {isOpenOwner && (
              <DropdownDetail
                title={t("glossary.ownerAddressList")}
                value={data?.ownerAccounts || []}
                close={() => setOpenOwner(false)}
                isStakeDetail={true}
              />
            )}
          </Item>
          <Item item xs={6} md={3}>
            <CustomIcon fill={theme.palette.secondary.light} height={22} icon={DropIconComponent} />
            <InfoTitle>
              <StyledTitle>{t("glossary.poolSize")}</StyledTitle>
            </InfoTitle>
            <InfoValue sx={{ wordBreak: "break-word" }}>
              <FlexGap10>
                {data?.poolSize != null ? formatADAFull(data?.poolSize) : t("common.notAvailable")}
                {data?.poolSize != null ? <ADAicon /> : ""}
              </FlexGap10>
            </InfoValue>
          </Item>
          <Item item xs={6} md={3}>
            <CustomIcon fill={theme.palette.secondary.light} height={24} icon={HighestIconComponent} />
            <InfoTitle>
              <StyledTitle>{t("stakeLimit")}</StyledTitle>
            </InfoTitle>
            <InfoValue>
              {data?.stakeLimit != null ? (
                <FlexGap10>
                  {formatADAFull(data?.stakeLimit)}
                  <ADAicon />
                </FlexGap10>
              ) : (
                t("common.notAvailable")
              )}
            </InfoValue>
          </Item>
          <Item item xs={6} md={3}>
            <CustomIcon fill={theme.palette.secondary.light} height={22} icon={DelegatorIconComponent} />
            <InfoTitle>
              <StyledTitle>{t("delegators")}</StyledTitle>
            </InfoTitle>
            <InfoValue>{data?.delegators || ""}</InfoValue>
          </Item>
          <Item item xs={6} md={3}>
            <InfoValue>
              <StyledLinearProgress
                variant="determinate"
                saturation={data?.saturation || 0}
                value={data?.saturation ? (data?.saturation > 100 ? 100 : data?.saturation) : 0}
              />
              <Box
                display="flex"
                flexDirection={isGalaxyFoldSmall ? "column" : "row"}
                justifyContent="space-between"
                alignItems={isGalaxyFoldSmall ? "flex-start" : "flex-end"}
                marginTop="9px"
              >
                <Box
                  component={"span"}
                  mt={1}
                  color={({ palette }) => palette.secondary.light}
                  style={{ fontSize: "14px", fontWeight: "400" }}
                >
                  {t("saturation")}
                </Box>
                {data?.saturation != null ? (
                  <Box fontSize={16}>{formatPercent(data?.saturation ? data?.saturation / 100 : 0)}</Box>
                ) : (
                  t("common.notAvailable")
                )}
              </Box>
            </InfoValue>
          </Item>
        </StyledGrid>
      </DataContainer>
    </HeaderDetailContainer>
  );
};

export default DelegationDetailInfo;
