import { useSelector } from "react-redux";
import { useEffect, useState, useRef, MouseEvent } from "react";
import { stringify } from "qs";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Column } from "src/types/table";
import CustomTooltip from "src/components/commons/CustomTooltip";
import { details } from "src/commons/routers";
import { formatADAFull, formatDateTimeLocal, formatNameBlockNo, getShortHash } from "src/commons/utils/helper";
import { setOnDetailView } from "src/stores/user";
import DetailViewBlock from "src/components/commons/DetailView/DetailViewBlock";
import Card from "src/components/commons/Card";
import Table from "src/components/commons/Table";
import { API } from "src/commons/utils/api";
import SelectedIcon from "src/components/commons/SelectedIcon";
import Link from "src/components/commons/Link";
import ADAicon from "src/components/commons/ADAIcon";
import useFetchList from "src/commons/hooks/useFetchList";
import { Capitalize } from "src/components/commons/CustomText/styles";
import FormNowMessage from "src/components/commons/FormNowMessage";
import usePageInfo from "src/commons/hooks/usePageInfo";
import DatetimeTypeTooltip from "src/components/commons/DatetimeTypeTooltip";

import { PriceWrapper, BlueText, StyledContainer, StyledLink, Actions, TimeDuration } from "./styles";

const BlockList = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { onDetailView } = useSelector(({ user }: RootState) => user);
  const blockNo = useSelector(({ system }: RootState) => system.blockNo);
  const { pageInfo, setSort } = usePageInfo();
  const [selected, setSelected] = useState<number | string | null>(null);

  const fetchData = useFetchList<Block>(API.BLOCK.LIST, { ...pageInfo }, false, blockNo);
  const mainRef = useRef(document.querySelector("#main"));

  useEffect(() => {
    document.title = `Blocks List | Cardano Blockchain Explorer`;
  }, []);

  const columns: Column<Block>[] = [
    {
      title: <Capitalize>{t("glossary.block")}</Capitalize>,
      key: "blockNo",
      minWidth: "50px",
      render: (r) => {
        const { blockName, tooltip } = formatNameBlockNo(r.blockNo, r.epochNo);
        return (
          <Link to={details.block(r.blockNo || r.hash)}>
            <CustomTooltip title={tooltip}>
              <span>{blockName}</span>
            </CustomTooltip>
          </Link>
        );
      }
    },
    {
      title: <Capitalize>{t("glossary.blockID")}</Capitalize>,
      key: "blockId",
      minWidth: "50px",
      render: (r) => (
        <CustomTooltip title={r.hash}>
          <StyledLink to={details.block(r.blockNo || r.hash)}>{getShortHash(`${r.hash}`)}</StyledLink>
        </CustomTooltip>
      )
    },
    {
      title: <Capitalize>{t("glossary.epoch")}</Capitalize>,
      key: "epochNo",
      minWidth: "50px",
      render: (r) => <StyledLink to={details.epoch(r.epochNo)}>{r.epochNo}</StyledLink>
    },
    {
      title: <Capitalize>{t("glossary.slot")}</Capitalize>,
      key: "epochSlotNo",
      minWidth: "100px"
    },
    {
      title: <Capitalize>{t("glossary.absoluteSlot")}</Capitalize>,
      key: "slotNo",
      minWidth: "100px"
    },
    {
      title: <Capitalize>{t("createdAt")}</Capitalize>,
      key: "time",
      minWidth: "100px",
      render: (r) => (
        <DatetimeTypeTooltip>
          <PriceWrapper>{formatDateTimeLocal(r.time)}</PriceWrapper>
        </DatetimeTypeTooltip>
      ),
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      }
    },
    {
      title: <Capitalize>{t("glossary.transactions")}</Capitalize>,
      key: "txCount",
      minWidth: "50px",
      render: (r) => <BlueText>{r.txCount}</BlueText>,
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      }
    },
    {
      title: <Capitalize>{t("common.fees")}</Capitalize>,
      key: "fees",
      render: (r) => (
        <PriceWrapper>
          {formatADAFull(r.totalFees)}
          <ADAicon />
        </PriceWrapper>
      )
    },
    {
      title: <Capitalize>{t("glossary.output")}</Capitalize>,
      key: "output",
      minWidth: "100px",
      render: (r) => (
        <PriceWrapper>
          {formatADAFull(r.totalOutput)}
          <ADAicon />
          {selected === (r.blockNo || r.hash) && <SelectedIcon />}
        </PriceWrapper>
      )
    }
  ];

  const openDetail = (_: MouseEvent<Element, globalThis.MouseEvent>, r: Block) => {
    setOnDetailView(true);
    setSelected(r.blockNo || r.hash);
  };

  const handleClose = () => {
    setOnDetailView(false);
    setSelected(null);
  };

  useEffect(() => {
    if (!onDetailView) handleClose();
  }, [onDetailView]);

  return (
    <StyledContainer>
      <Card data-testid="blocks-card" title={t("head.page.blocks")}>
        <Actions>
          <TimeDuration>
            <FormNowMessage time={fetchData.lastUpdated} />
          </TimeDuration>
        </Actions>
        <Table
          {...fetchData}
          columns={columns}
          total={{ title: t("common.totalBlocks"), count: fetchData.total }}
          pagination={{
            ...pageInfo,
            total: fetchData.total,
            onChange: (page, size) => {
              history.replace({ search: stringify({ ...pageInfo, page, size }) });
              mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
            },
            handleCloseDetailView: handleClose
          }}
          onClickRow={openDetail}
          rowKey={(r: Block) => r.blockNo || r.hash}
          selected={selected}
          showTabView
          tableWrapperProps={{ sx: (theme) => ({ [theme.breakpoints.between("sm", "md")]: { minHeight: "60vh" } }) }}
        />
      </Card>
      <DetailViewBlock blockNo={selected || 0} open={onDetailView} handleClose={handleClose} />
    </StyledContainer>
  );
};

export default BlockList;
