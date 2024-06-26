import { Box, IconButton, useTheme } from "@mui/material";
import { stringify } from "qs";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router-dom";

import useFetchList from "src/commons/hooks/useFetchList";
import usePageInfo from "src/commons/hooks/usePageInfo";
import { EyeIcon } from "src/commons/resources";
import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import { formatDateTimeLocal, getShortHash } from "src/commons/utils/helper";
import { DeregistrationCertificateModal } from "src/components/StakingLifeCycle/SPOLifecycle/Deregistration";
import { TableSubTitle } from "src/components/TabularView/StakeTab/styles";
import { AdaValue } from "src/components/commons/ADAValue";
import CustomIcon from "src/components/commons/CustomIcon";
import CustomTooltip from "src/components/commons/CustomTooltip";
import DatetimeTypeTooltip from "src/components/commons/DatetimeTypeTooltip";
import Table, { Column } from "src/components/commons/Table";
import { StyledLink } from "src/components/share/styled";

const DeregsitrationTab = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { reportId = "" } = useParams<{ reportId: string }>();
  const history = useHistory();
  const { pageInfo, setSort } = usePageInfo();
  const [selected, setSelected] = useState<SPODeregistration | null>(null);

  const columns: Column<SPODeregistrationTabpular>[] = [
    {
      key: "txHash",
      title: t("glossary.txHash"),
      render(data) {
        return (
          <CustomTooltip title={data.txHash}>
            <StyledLink to={details.transaction(data.txHash)}>{getShortHash(data.txHash)}</StyledLink>
          </CustomTooltip>
        );
      }
    },
    {
      key: "time",
      title: t("createdAt"),
      sort({ columnKey, sortValue }) {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      },
      render(data) {
        return <DatetimeTypeTooltip>{formatDateTimeLocal(data.time)}</DatetimeTypeTooltip>;
      }
    },
    {
      key: "fee",
      title: t("common.adaValue"),
      render(data) {
        return (
          <TableSubTitle>
            <Box display="flex" mt={1} alignItems="center" lineHeight="1">
              <AdaValue color={theme.palette.secondary.main} value={data.poolHold} gap="3px" fontSize="12px" />
              <Box mx="3px">/</Box>
              <AdaValue color={theme.palette.secondary.main} value={data.fee} gap="3px" fontSize="12px" />
            </Box>
          </TableSubTitle>
        );
      }
    },
    {
      key: "Certificate",
      title: t("common.certificate"),
      render: (data) => (
        <IconButton onClick={() => setSelected(data)}>
          <CustomIcon data-testid="eye-icon" icon={EyeIcon} stroke={theme.palette.secondary.light} width={20} />
        </IconButton>
      )
    }
  ];

  const fetchData = useFetchList<SPODeregistrationTabpular>(
    reportId ? API.REPORT.PREPORT_DEREGSITRATION(reportId) : "",
    {
      ...pageInfo
    }
  );

  return (
    <Box>
      <Table
        {...fetchData}
        columns={columns}
        total={{
          title: t("common.poolRegistration"),
          count: fetchData.total
        }}
        pagination={{
          ...pageInfo,
          page: pageInfo.page,
          total: fetchData.total,
          onChange: (page, size) => history.replace({ search: stringify({ ...pageInfo, page, size }) })
        }}
      />
      <DeregistrationCertificateModal data={selected} open={!!selected} handleCloseModal={() => setSelected(null)} />
    </Box>
  );
};

export default DeregsitrationTab;
