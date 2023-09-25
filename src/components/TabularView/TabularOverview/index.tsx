import { Grid, Icon } from "@mui/material";
import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import DelegatorDetailContext from "src/components/StakingLifeCycle/DelegatorLifecycle/DelegatorDetailContext";
import CustomTooltip from "src/components/commons/CustomTooltip";

import {
  DelegationToIconUrl,
  PaymentWalletUrl,
  GiftIcon,
  RewardWithdrawnIconUrl,
  TransactionIcon
} from "../../../commons/resources/index";
import { details } from "../../../commons/routers";
import { formatADAFull, getShortHash } from "../../../commons/utils/helper";
import ADATransferModal from "../../StakingLifeCycle/DelegatorLifecycle/ADATransferModal";
import {
  CardContent,
  CardInfo,
  CardItem,
  CardTitle,
  CardValue,
  ItemIcon,
  StyledAdaLogoIcon,
  TransferButton,
  NoDelegatedStakePool,
  CardValueDelegating,
  BoxStyled,
  StyledBoxDelegating,
  BoxValue
} from "./styles";

type TCardAmount = {
  amount?: number;
};

const CardAmount = ({ amount }: TCardAmount) => {
  return (
    <CardValue>
      <CustomTooltip title={formatADAFull(amount)}>
        <BoxValue>{formatADAFull(amount)}</BoxValue>
      </CustomTooltip>
      <StyledAdaLogoIcon />
    </CardValue>
  );
};

type TGridItem = {
  action?: React.ReactNode;
  title: string;
  value: React.ReactNode;
  iconUrl: string;
  iconSize?: { width?: string | number; height?: string | number };
};

const GridItem = ({ title, action, value, iconUrl, iconSize }: TGridItem) => {
  const { sidebar } = useSelector(({ user }: RootState) => user);

  return (
    <CardItem sidebar={+sidebar}>
      <ItemIcon src={iconUrl} alt="title" style={{ ...iconSize }} />
      <CardContent>
        <CardInfo>
          <CardTitle>{title}</CardTitle>
          {value}
        </CardInfo>
        {action}
      </CardContent>
    </CardItem>
  );
};

const TabularOverview: React.FC = () => {
  const { t } = useTranslation();
  const data = useContext(DelegatorDetailContext);
  const { totalStake, rewardAvailable, rewardWithdrawn, pool } = data ?? {};
  const { tickerName, poolName, poolId, iconUrl } = pool ?? {};
  const delegatingToValue =
    tickerName || poolName ? `${tickerName && tickerName + " -"}  ${poolName && poolName}` : getShortHash(poolId || "");
  const delegatingTovalueTooltip =
    tickerName || poolName ? `${tickerName && tickerName + " -"}  ${poolName && poolName}` : poolId;
  const [open, setOpen] = useState(false);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <GridItem
          title={t("common.paymentWallet")}
          iconUrl={PaymentWalletUrl}
          value={<CardAmount amount={Math.max(totalStake || 0, 0)} />}
          action={
            <TransferButton
              onClick={() => setOpen(true)}
              variant="contained"
              startIcon={<Icon fill="white" component={TransactionIcon} />}
            >
              {t("common.adaTransfers")}
            </TransferButton>
          }
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <GridItem
          title={t("rewardAccount")}
          iconSize={{ width: "74px", height: "80px" }}
          iconUrl={GiftIcon}
          value={<CardAmount amount={Math.max(rewardAvailable || 0, 0)} />}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <GridItem
          title={t("slc.rewardsWithdrawn")}
          iconUrl={RewardWithdrawnIconUrl}
          value={<CardAmount amount={rewardWithdrawn} />}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <GridItem
          title={t("slc.delegatingTo")}
          iconUrl={iconUrl || DelegationToIconUrl}
          value={
            pool?.poolId ? (
              <StyledBoxDelegating to={details.delegation(pool?.poolId)}>
                <CardValueDelegating>
                  <CustomTooltip title={delegatingTovalueTooltip}>
                    <BoxStyled>{delegatingToValue}</BoxStyled>
                  </CustomTooltip>
                </CardValueDelegating>
              </StyledBoxDelegating>
            ) : (
              <NoDelegatedStakePool>{t("drawer.notDelegatedToAnyPool")}</NoDelegatedStakePool>
            )
          }
        />
      </Grid>
      <ADATransferModal open={open} handleCloseModal={() => setOpen(false)} />
    </Grid>
  );
};

export default TabularOverview;
