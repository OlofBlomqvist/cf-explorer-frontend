import React from "react";
import { CgArrowsExchange, CgClose } from "react-icons/cg";
import { MAX_SLOT_EPOCH } from "../../../commons/utils/constants";
import { CubeIcon, RocketIcon } from "../../../commons/resources";
import ProgressCircle from "../ProgressCircle";
import {
  CloseButton,
  EpochNumber,
  EpochText,
  HeaderContainer,
  ViewDetailContainer,
  DetailsInfoItem,
  DetailLabel,
  DetailValue,
  Icon,
  BlockDefault,
  InfoIcon,
  DetailLabelSkeleton,
  DetailValueSkeleton,
  IconSkeleton,
  ProgressSkeleton,
  ViewDetailDrawer,
  Item,
  ItemName,
  ItemValue,
  ListItem,
  Group,
  DetailLink,
  DetailLinkIcon,
  DetailLinkRight,
  StyledLink,
  DetailCopy,
  DetailLinkName,
  SeemoreBox,
  SeemoreButton,
  SeemoreText,
} from "./styles";
import { ADAToken } from "../Token";
import useFetch from "../../../commons/hooks/useFetch";
import { BiChevronRight } from "react-icons/bi";
import { routers } from "../../../commons/routers";
import { formatADA, getShortHash } from "../../../commons/utils/helper";
import { Tooltip } from "@mui/material";
import { FaAngleDoubleRight } from "react-icons/fa";

type DetailViewBlockProps = {
  blockNo: number;
  handleClose: () => void;
};

const DetailViewBlock: React.FC<DetailViewBlockProps> = props => {
  const { blockNo, handleClose } = props;
  const { data } = useFetch<BlockDetail>(blockNo ? `block/${blockNo}` : ``);

  if (!data)
    return (
      <ViewDetailDrawer anchor="right" open={!!blockNo} hideBackdrop variant="permanent">
        <ViewDetailContainer>
          <CloseButton onClick={handleClose}>
            <CgClose />
          </CloseButton>
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
              <Group>
                <DetailsInfoItem key={index}>
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
        </ViewDetailContainer>
      </ViewDetailDrawer>
    );

  return (
    <ViewDetailDrawer anchor="right" open={!!blockNo} hideBackdrop variant="permanent">
      <ViewDetailContainer>
        <CloseButton onClick={handleClose}>
          <CgClose />
        </CloseButton>
        <HeaderContainer>
          <ProgressCircle
            size={150}
            pathLineCap="butt"
            pathWidth={4}
            trailWidth={2}
            percent={((data.epochSlotNo || 0) / (data.totalSlot || MAX_SLOT_EPOCH)) * 100}
            trailOpacity={1}
          >
            <EpochNumber>{data.epochNo}</EpochNumber>
            <EpochText>Epoch</EpochText>
          </ProgressCircle>
        </HeaderContainer>
        <ListItem>
          <Item>
            <Icon src={CubeIcon} alt="socket" />
            <ItemName>Block</ItemName>
            <ItemValue>{data.epochNo}</ItemValue>
          </Item>
          <Item>
            <Icon src={RocketIcon} alt="socket" />
            <ItemName>slot</ItemName>
            <ItemValue>
              {data.epochSlotNo}
              <BlockDefault>/{data.totalSlot || MAX_SLOT_EPOCH}</BlockDefault>
            </ItemValue>
          </Item>
        </ListItem>
        <Group>
          <DetailsInfoItem>
            <DetailLabel>
              <InfoIcon />
              Block ID
            </DetailLabel>
            <DetailValue>
              <Tooltip placement="top" title={data.hash}>
                <StyledLink to={routers.BLOCK_DETAIL.replace(":blockId", `${data.hash}`)}>
                  {getShortHash(data.hash)}
                </StyledLink>
              </Tooltip>
              <DetailCopy text={data.hash} />
            </DetailValue>
          </DetailsInfoItem>
          <DetailsInfoItem>
            <DetailLabel>
              <InfoIcon />
              Created at
            </DetailLabel>
            <DetailValue>{data.blockNo}</DetailValue>
          </DetailsInfoItem>
          <DetailsInfoItem>
            <DetailLabel>
              <InfoIcon />
              Transaction
            </DetailLabel>
            <DetailValue>{data.blockNo}</DetailValue>
          </DetailsInfoItem>
          <DetailsInfoItem>
            <DetailLabel>
              <InfoIcon />
              Transaction Fees
            </DetailLabel>
            <DetailValue>
              {formatADA(data.totalFees) || 0}
              <ADAToken color="black" size={"var(--font-size-text-x-small)"} />
            </DetailValue>
          </DetailsInfoItem>
          <DetailsInfoItem>
            <DetailLabel>
              <InfoIcon />
              Total Output
            </DetailLabel>
            <DetailValue>
              {formatADA(data.totalOutput) || 0}
              <ADAToken color="black" size={"var(--font-size-text-x-small)"} />
            </DetailValue>
          </DetailsInfoItem>
          <DetailsInfoItem>
            <DetailLabel>
              <InfoIcon />
              Slot leader
            </DetailLabel>
            <DetailValue>
              <Tooltip placement="top" title={data.slotLeader}>
                <StyledLink to={routers.BLOCK_DETAIL.replace(":blockId", `${data.blockNo}`)}>
                  {getShortHash(data.slotLeader)}
                </StyledLink>
              </Tooltip>
              <DetailCopy text={data.slotLeader} />
            </DetailValue>
          </DetailsInfoItem>
        </Group>
        <Group>
          <DetailLink to={routers.BLOCK_DETAIL.replace(":blockId", `${data.blockNo}`)}>
            <DetailLabel>
              <DetailLinkIcon>
                <CgArrowsExchange />
              </DetailLinkIcon>
              <DetailLinkName>Transactions</DetailLinkName>
            </DetailLabel>
            <DetailValue>
              <DetailLinkRight>
                <BiChevronRight size={24} />
              </DetailLinkRight>
            </DetailValue>
          </DetailLink>
        </Group>
        <SeemoreBox>
          <SeemoreButton to={routers.BLOCK_DETAIL.replace(":blockId", `${data.blockNo}`)}>
            <SeemoreText>View more</SeemoreText> <FaAngleDoubleRight size={12} />
          </SeemoreButton>
        </SeemoreBox>
      </ViewDetailContainer>
    </ViewDetailDrawer>
  );
};

export default DetailViewBlock;
