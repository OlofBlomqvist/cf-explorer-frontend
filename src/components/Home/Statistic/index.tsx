import { Grid } from "@mui/material";
import BigNumber from "bignumber.js";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useFetch from "../../../commons/hooks/useFetch";
import { AdaPriceIcon, CurentEpochIcon, LiveStakeIcon, MarketCapIcon } from "../../../commons/resources";
import { details } from "../../../commons/routers";
import { API } from "../../../commons/utils/api";
import { MAX_SLOT_EPOCH } from "../../../commons/utils/constants";
import { formatADA, formatADAFull, numberWithCommas } from "../../../commons/utils/helper";
import { RootState } from "../../../stores/types";
import CustomTooltip from "../../commons/CustomTooltip";
import RateWithIcon from "../../commons/RateWithIcon";
import {
  Content,
  Item,
  ItemIcon,
  ItemSkeleton,
  Name,
  ProcessActive,
  Progress,
  ProgressPending,
  Small,
  StatisticContainer,
  Title,
  Value,
  XSmall,
  XValue,
} from "./style";

interface Props {}

const SkeletonBox = () => (
  <Item>
    <Content>
      <ItemSkeleton width="50%" />
      <ItemSkeleton width="30%" />
      <ItemSkeleton />
      <ItemSkeleton width="50%" />
      <ItemSkeleton width="80%" />
    </Content>
  </Item>
);

const MILION = 10 ** 6;

const HomeStatistic: React.FC<Props> = () => {
  const { currentEpoch, usdMarket } = useSelector(({ system }: RootState) => system);
  const { data } = useFetch<StakeAnalytics>(API.STAKE.ANALYTICS);
  const { data: btcMarket, refesh } = useFetch<CardanoMarket[]>(`${API.MARKETS}?currency=btc`);

  useEffect(() => {
    const interval = setInterval(() => refesh(), 5000);
    return () => clearInterval(interval);
  }, [refesh]);

  const { circulating_supply, total_supply: total = 1 } = usdMarket || {};
  const { liveStake = 0, activeStake = 1 } = data || {};
  const supply = Number(circulating_supply);
  const liveRate = new BigNumber(liveStake).div(MILION).div(supply).multipliedBy(100);
  const activeRate = activeStake && new BigNumber(liveStake).div(activeStake).minus(1).multipliedBy(100);
  const circulatingSupply = new BigNumber(supply).multipliedBy(MILION);
  const circulatingRate = circulatingSupply.div(total).div(MILION).multipliedBy(100);

  return (
    <StatisticContainer container spacing={2}>
      <Grid item xl lg={3} sm={6} xs={12}>
        {!usdMarket || !btcMarket?.[0] ? (
          <SkeletonBox />
        ) : (
          <Item>
            <ItemIcon src={AdaPriceIcon} alt="Ada Price" />
            <Content>
              <Name>Ada Price</Name>
              <Title>${usdMarket.current_price}</Title>
              <br />
              <RateWithIcon value={usdMarket.price_change_percentage_24h} />
              <Small style={{ marginLeft: 15 }}>{btcMarket[0]?.current_price} BTC</Small>
            </Content>
          </Item>
        )}
      </Grid>
      <Grid item xl lg={3} sm={6} xs={12}>
        {!usdMarket ? (
          <SkeletonBox />
        ) : (
          <Item>
            <ItemIcon src={MarketCapIcon} alt="Market cap" />
            <Content>
              <Name>Market cap</Name>
              <Title>${numberWithCommas(usdMarket.market_cap)}</Title>
            </Content>
          </Item>
        )}
      </Grid>
      <Grid item xl lg={3} sm={6} xs={12}>
        {!currentEpoch ? (
          <SkeletonBox />
        ) : (
          <Link to={details.epoch(currentEpoch?.no)}>
            <Item>
              <Content>
                <ItemIcon src={CurentEpochIcon} alt="Curent Epoch" />
                <Name>Curent Epoch</Name>
                <XSmall>Epoch: </XSmall>
                <XValue>
                  <b>{numberWithCommas(currentEpoch?.no)}</b>
                </XValue>
                <br />
                <XSmall>Slot: </XSmall>
                <XValue>
                  <b>{numberWithCommas(currentEpoch?.slot % MAX_SLOT_EPOCH)}</b>
                </XValue>
                <XSmall> / {numberWithCommas(MAX_SLOT_EPOCH)}</XSmall>
              </Content>
            </Item>
          </Link>
        )}
      </Grid>
      <Grid item xl lg={3} sm={6} xs={12}>
        {!data || !usdMarket ? (
          <SkeletonBox />
        ) : (
          <Item>
            <Content>
              <ItemIcon src={LiveStakeIcon} alt="Total ADA Stake" />
              <Name>Live Stake</Name>
              <CustomTooltip title={formatADAFull(liveStake)}>
                <Title>{formatADA(liveStake)}</Title>
              </CustomTooltip>
              <Progress>
                <CustomTooltip title={liveRate.toFixed(5)}>
                  <ProcessActive rate={liveRate.toNumber()}>{liveRate.toFixed(0, BigNumber.ROUND_DOWN)}%</ProcessActive>
                </CustomTooltip>
                <CustomTooltip title={liveRate.div(-1).plus(100).toFixed(5)}>
                  <ProgressPending rate={liveRate.div(-1).plus(100).toNumber()}>
                    {liveRate.div(-1).plus(100).toFixed(0)}%
                  </ProgressPending>
                </CustomTooltip>
              </Progress>
              <Small>Active Stake: </Small>
              <CustomTooltip title={formatADAFull(activeStake)}>
                <Value>
                  <b>{formatADA(activeStake)} </b>
                </Value>
              </CustomTooltip>
              <CustomTooltip title={`${activeRate.toFixed(5)}%`}>
                <Small>({activeRate.toFixed(1)}%)</Small>
              </CustomTooltip>
              <br />
              <Small>Circulating supply: </Small>
              <Value>
                <CustomTooltip title={numberWithCommas(supply)}>
                  <b>{formatADA(circulatingSupply.toString())} </b>
                </CustomTooltip>
              </Value>
              <CustomTooltip title={`${circulatingRate.toFixed(5)}%`}>
                <Small>({circulatingRate.toFixed(0, BigNumber.ROUND_DOWN)}%)</Small>
              </CustomTooltip>
            </Content>
          </Item>
        )}
      </Grid>
    </StatisticContainer>
  );
};

export default HomeStatistic;