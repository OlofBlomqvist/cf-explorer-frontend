import { Box } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { ReactComponent as delegatedIcon } from "src/commons/resources/icons/delegated.svg";
import { ReactComponent as rewardIcon } from "src/commons/resources/icons/reward.svg";
import { ReactComponent as rewardWithdrawIcon } from "src/commons/resources/icons/rewardWithdraw.svg";
import { ReactComponent as totalStakeIcon } from "src/commons/resources/icons/totalStake.svg";
import { details } from "src/commons/routers";
import { formatADAFull, getShortHash } from "src/commons/utils/helper";
import ADAicon from "src/components/commons/ADAIcon";
import CustomTooltip from "src/components/commons/CustomTooltip";
import DetailHeader from "src/components/commons/DetailHeader";
import InfoSolidIcon from "src/components/commons/InfoSolidIcon";
import { NETWORK, NETWORKS } from "src/commons/utils/constants";

import ModalAllAddress from "../ModalAllAddress";
import { ButtonModal, StyledFlexValue, StyledLinkTo, TitleCard, TitleNoPool, TitleValue } from "./styles";

interface Props {
  data: IStakeKeyDetail | null;
  loading: boolean;
  lastUpdated?: number;
}
const StakeOverview: React.FC<Props> = ({ data, loading, lastUpdated }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { stakeId } = useParams<{ stakeId: string }>();

  const poolName = data?.pool?.poolName || "";
  const tickerName = data?.pool?.tickerName || "";
  const poolId = data?.pool?.poolId || "";
  const hasTicketOrPoolName = tickerName || poolName;

  const delegateTooltip = data?.pool
    ? hasTicketOrPoolName
      ? `${tickerName}${tickerName && poolName ? " - " : ""}${poolName}`
      : poolId
    : t("drawer.notDelegatedToAnyPool");

  const delegateTo = data?.pool
    ? hasTicketOrPoolName
      ? `${tickerName}${tickerName && poolName ? " - " : ""}${poolName}`
      : getShortHash(poolId)
    : t("drawer.notDelegatedToAnyPool");
  const listOverview = [
    {
      icon: delegatedIcon,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>{t("glossary.delegatedTo")} </TitleCard>
        </Box>
      ),
      value: (
        <CustomTooltip sx={{ width: "unset" }} title={delegateTooltip}>
          <StyledLinkTo isTo={!!data?.pool} to={data?.pool?.poolId ? details.delegation(data?.pool?.poolId) : "#"}>
            {!hasTicketOrPoolName ? <TitleNoPool>{delegateTo}</TitleNoPool> : <TitleValue>{delegateTo}</TitleValue>}
          </StyledLinkTo>
        </CustomTooltip>
      )
    },
    {
      icon: totalStakeIcon,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>{t("glossary.totalStake")}</TitleCard>
        </Box>
      ),
      value: (
        <Box>
          <StyledFlexValue>
            <Box component={"span"}>{formatADAFull(data?.totalStake)}</Box>
            <ADAicon />
            {NETWORK === NETWORKS.sanchonet && (
              <CustomTooltip title={t("sanchonet.toltipTotalStake")}>
                <Box display={"inline-block"}>
                  <InfoSolidIcon />
                </Box>
              </CustomTooltip>
            )}
          </StyledFlexValue>
          <Box sx={{ color: "blue" }}>
            <ButtonModal onClick={() => setOpen(true)}>{t("drawer.viewAllAddresses")}</ButtonModal>
          </Box>
          <ModalAllAddress open={open} onClose={() => setOpen(false)} stake={stakeId} />
        </Box>
      )
    },
    {
      icon: rewardIcon,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>{t("glossary.rewardsAvailable")} </TitleCard>
        </Box>
      ),
      value: (
        <StyledFlexValue>
          {data?.rewardAvailable != null ? (
            <>
              <Box component={"span"}>{formatADAFull(data?.rewardAvailable)}</Box>
              <ADAicon />
            </>
          ) : (
            t("common.N/A")
          )}
        </StyledFlexValue>
      )
    },
    {
      icon: rewardWithdrawIcon,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}> {t("glossary.rewardsWithdrawn")} </TitleCard>
        </Box>
      ),
      value: (
        <StyledFlexValue>
          {data?.rewardWithdrawn != null ? (
            <>
              {formatADAFull(data?.rewardWithdrawn)}
              <ADAicon />
            </>
          ) : (
            t("common.N/A")
          )}
        </StyledFlexValue>
      )
    }
  ];

  return (
    <DetailHeader
      type="STAKE_KEY"
      bookmarkData={data?.stakeAddress || ""}
      title={t("head.page.stakeAddressDetail")}
      hash={data?.stakeAddress}
      stakeKeyStatus={data?.status}
      listItem={listOverview}
      loading={loading}
      lastUpdated={lastUpdated}
    />
  );
};

export default StakeOverview;
