import { Box, useTheme } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BiChevronRight } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import { useSelector } from "react-redux";

import useFetch from "src/commons/hooks/useFetch";
import { BlockIcon, CubeIconComponent, RocketIcon } from "src/commons/resources";
import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import { MAX_SLOT_EPOCH } from "src/commons/utils/constants";
import { formatADAFull, formatDateTimeLocal } from "src/commons/utils/helper";

import ADAicon from "../ADAIcon";
import CustomIcon from "../CustomIcon";
import CustomTooltip from "../CustomTooltip";
import FormNowMessage from "../FormNowMessage";
import ProgressCircle from "../ProgressCircle";
import ViewAllButton from "../ViewAllButton";
import ViewMoreButton from "../ViewMoreButton";
import {
  BlockDefault,
  CloseButton,
  DetailLabel,
  DetailLabelSkeleton,
  DetailLink,
  DetailLinkIcon,
  DetailLinkRight,
  DetailValue,
  DetailValueSkeleton,
  DetailsInfoItem,
  EpochNumber,
  EpochText,
  Group,
  HeaderContainer,
  IconSkeleton,
  Item,
  ItemName,
  ItemValue,
  ListItem,
  ProgressSkeleton,
  TimeDuration,
  ViewDetailContainer,
  ViewDetailDrawer,
  ViewDetailHeader,
  ViewDetailScroll
} from "./styles";

type DetailViewEpochProps = {
  epochNo?: number;
  handleClose: () => void;
  callback: (callback: (data: IDataEpoch[]) => IDataEpoch[]) => void;
  open?: boolean;
};

const DetailViewEpoch: React.FC<DetailViewEpochProps> = ({ epochNo, handleClose, callback, open }) => {
  const { currentEpoch, blockNo } = useSelector(({ system }: RootState) => system);
  const { t } = useTranslation();
  const [key, setKey] = useState(0);
  const [urlFetch, setUrlFetch] = useState("");
  const theme = useTheme();

  const { data, lastUpdated, loading } = useFetch<IDataEpoch>(
    urlFetch,
    undefined,
    false,
    epochNo === currentEpoch?.no ? blockNo : key
  );

  useEffect(() => {
    if (epochNo === undefined || epochNo === null) {
      setUrlFetch("");
    } else {
      setUrlFetch(`${API.EPOCH.DETAIL}/${epochNo}`);
    }
  }, [epochNo]);

  useEffect(() => {
    // Update key if this epoch don't have rewards and when new epoch distributed for api callback
    if (!data?.rewardsDistributed && epochNo !== undefined && data?.no !== undefined && epochNo !== data.no) {
      setKey(epochNo);
    }
  }, [epochNo, data?.no, data?.rewardsDistributed]);

  useEffect(() => {
    if (data) {
      callback((list) => {
        const index = list.findIndex((item) => item.no === data?.no);
        if (index >= 0) list[index] = { ...list[index], ...data };
        return [...list];
      });
    }
  }, [data, callback]);

  const renderContent = () => {
    if (!data || loading) {
      return (
        <>
          <ViewDetailHeader>
            <ViewAllButton tooltipTitle={t("common.viewDetail")} to={details.epoch(epochNo)} />
            <CustomTooltip title={t("common.close")}>
              <CloseButton onClick={handleClose}>
                <CgClose />
              </CloseButton>
            </CustomTooltip>
          </ViewDetailHeader>
          <ViewDetailContainer>
            <ViewDetailScroll>
              <HeaderContainer>
                <ProgressSkeleton variant="circular" />
              </HeaderContainer>
              <ListItem>
                <Item>
                  <IconSkeleton variant="circular" />
                  <ItemName>
                    <DetailValueSkeleton variant="rectangular" />
                  </ItemName>
                  <ItemValue>
                    <DetailLabelSkeleton variant="rectangular" />
                  </ItemValue>
                </Item>
                <Item>
                  <IconSkeleton variant="circular" />
                  <ItemName>
                    <DetailValueSkeleton variant="rectangular" />
                  </ItemName>
                  <ItemValue>
                    <DetailLabelSkeleton variant="rectangular" />
                  </ItemValue>
                </Item>
              </ListItem>
              <Group>
                {new Array(4).fill(0).map((_, index) => {
                  return (
                    <DetailsInfoItem key={index}>
                      <DetailLabel>
                        <DetailValueSkeleton variant="rectangular" />
                      </DetailLabel>
                      <DetailValue>
                        <DetailLabelSkeleton variant="rectangular" />
                      </DetailValue>
                    </DetailsInfoItem>
                  );
                })}
              </Group>
              {new Array(2).fill(0).map((_, index) => {
                return (
                  <Group key={index}>
                    <DetailsInfoItem>
                      <DetailLabel>
                        <DetailValueSkeleton variant="rectangular" />
                      </DetailLabel>
                      <DetailValue>
                        <DetailLabelSkeleton variant="rectangular" />
                      </DetailValue>
                    </DetailsInfoItem>
                  </Group>
                );
              })}
            </ViewDetailScroll>
          </ViewDetailContainer>
          <ViewMoreButton to={details.epoch(epochNo)} />
        </>
      );
    }

    const slot =
      data.no === currentEpoch?.no
        ? moment(formatDateTimeLocal(data.endTime)).diff(moment()) >= 0
          ? currentEpoch.slot
          : data.maxSlot || MAX_SLOT_EPOCH
        : data.maxSlot || MAX_SLOT_EPOCH;

    const progress = +Math.min((slot / data.maxSlot) * 100, 100).toFixed(0);
    return (
      <>
        <ViewDetailHeader>
          <ViewAllButton tooltipTitle={t("common.viewDetail")} to={details.epoch(epochNo)} />
          <TimeDuration>
            <FormNowMessage time={lastUpdated} />
          </TimeDuration>
          <CustomTooltip title={t("common.close")}>
            <CloseButton onClick={handleClose}>
              <CgClose color={theme.palette.secondary.light} />
            </CloseButton>
          </CustomTooltip>
        </ViewDetailHeader>
        <ViewDetailContainer>
          <ViewDetailScroll>
            <HeaderContainer>
              <ProgressCircle
                size={150}
                pathLineCap="butt"
                pathWidth={4}
                trailWidth={2}
                percent={progress}
                trailOpacity={1}
              >
                <EpochNumber>{epochNo}</EpochNumber>
                <EpochText>{t("epoch")}</EpochText>
              </ProgressCircle>
            </HeaderContainer>
            <ListItem>
              <Item>
                <CustomIcon
                  icon={CubeIconComponent}
                  height={30}
                  fill={theme.isDark ? theme.palette.secondary[0] : theme.palette.common.white}
                />
                <ItemName>{t("glossary.blocks")}</ItemName>
                <ItemValue>
                  {currentEpoch?.no === epochNo ? currentEpoch?.blkCount || data.blkCount : data.blkCount}
                </ItemValue>
              </Item>
              <Item>
                <CustomIcon
                  icon={RocketIcon}
                  height={30}
                  fill={theme.isDark ? theme.palette.secondary[0] : theme.palette.common.white}
                />
                <ItemName>{t("common.slot")}</ItemName>
                <ItemValue>
                  {slot}
                  <BlockDefault>/{MAX_SLOT_EPOCH}</BlockDefault>
                </ItemValue>
              </Item>
            </ListItem>
            <Group>
              <DetailsInfoItem>
                <DetailLabel>{t("glossary.startTimestamp")}</DetailLabel>
                <DetailValue>{formatDateTimeLocal(data.startTime || "")}</DetailValue>
              </DetailsInfoItem>
              <DetailsInfoItem>
                <DetailLabel>{t("glossary.endTimestamp")}</DetailLabel>
                <DetailValue>{formatDateTimeLocal(data.endTime || "")}</DetailValue>
              </DetailsInfoItem>
              <DetailsInfoItem>
                <DetailLabel>{t("glossary.blocks")}</DetailLabel>
                <DetailValue>{data.blkCount}</DetailValue>
              </DetailsInfoItem>
              <DetailsInfoItem>
                <DetailLabel>{t("glossary.uniqueAccounts")}</DetailLabel>
                <DetailValue>{data.account}</DetailValue>
              </DetailsInfoItem>
              <DetailsInfoItem>
                <DetailLabel>{t("drawer.txCount")}</DetailLabel>
                <DetailValue>{data.txCount}</DetailValue>
              </DetailsInfoItem>
              <DetailsInfoItem>
                <DetailLabel>{t("glossary.rewardsDistributed")}</DetailLabel>
                <DetailValue>
                  {data?.rewardsDistributed ? (
                    <Box>
                      {formatADAFull(data?.rewardsDistributed)}&nbsp;
                      <ADAicon />
                    </Box>
                  ) : (
                    t("common.notAvailable")
                  )}
                </DetailValue>
              </DetailsInfoItem>
              <DetailsInfoItem>
                <DetailLabel>{t("glossary.totalOutput")}</DetailLabel>
                <DetailValue>
                  {formatADAFull(data.outSum)}
                  <ADAicon />
                </DetailValue>
              </DetailsInfoItem>
            </Group>
            <Group>
              <DetailLink to={details.epoch(epochNo)}>
                <DetailLabel style={{ fontSize: 18 }}>
                  <DetailLinkIcon>
                    <BlockIcon />
                  </DetailLinkIcon>
                  {t("glossary.blocks")}
                </DetailLabel>
                <DetailValue>
                  <DetailLinkRight>
                    <BiChevronRight size={24} />
                  </DetailLinkRight>
                </DetailValue>
              </DetailLink>
            </Group>
          </ViewDetailScroll>
        </ViewDetailContainer>
        <ViewMoreButton to={details.epoch(epochNo)} />
      </>
    );
  };

  return (
    <ViewDetailDrawer anchor="right" open={Boolean(open ?? epochNo)} variant="temporary" onClose={handleClose}>
      {renderContent()}
    </ViewDetailDrawer>
  );
};

export default DetailViewEpoch;
