import { Box, IconButton, useTheme } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useFetchList from "../../../commons/hooks/useFetchList";
import { EyeIcon } from "../../../commons/resources";
import { details } from "../../../commons/routers";
import { API } from "../../../commons/utils/api";
import { formatHash } from "../../../commons/utils/helper";
import { DeregistrationCertificateModal } from "../../StakingLifeCycle/SPOLifecycle/Deregistration";
import { AdaValue } from "../../TabularView/StakeTab/Tabs/StakeRegistrationTab";
import { TableSubTitle } from "../../TabularView/StakeTab/styles";
import CustomTooltip from "../../commons/CustomTooltip";
import Table, { Column } from "../../commons/Table";
import { StyledLink } from "../../share/styled";

const DeregsitrationTab = () => {
  const theme = useTheme();
  const { reportId = "" } = useParams<{ reportId: string }>();
  const [params, setParams] = useState({
    page: 0,
    size: 10,
  });
  const [selected, setSelected] = useState<SPODeregistration | null>(null);
  const [sort, setSort] = useState<string>("");

  const columns: Column<SPODeregistrationTabpular>[] = [
    {
      key: "txHash",
      title: "Transaction hash",
      render(data) {
        return (
          <CustomTooltip title={data.txHash}>
            <StyledLink to={details.transaction(data.txHash)}>{formatHash(data.txHash)}</StyledLink>
          </CustomTooltip>
        );
      },
    },
    {
      key: "time",
      title: "Timestamp",
      sort({ columnKey, sortValue }) {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      },
      render(data) {
        return data.time;
      },
    },
    {
      key: "fee",
      title: "ADA Value",
      render(data) {
        return (
          <TableSubTitle>
            <Box display="flex" mt={1} alignItems="center" lineHeight="1">
              <AdaValue color={theme.palette.grey[400]} value={data.poolHold} gap="3px" fontSize="12px" />
              <Box mx="3px">/</Box>
              <AdaValue color={theme.palette.grey[400]} value={data.fee} gap="3px" fontSize="12px" />
            </Box>
          </TableSubTitle>
        );
      },
    },
    {
      key: "Certificate",
      title: "Certificate",
      render: data => (
        <IconButton onClick={() => setSelected(data)}>
          <EyeIcon style={{ transform: "scale(.8)" }} />
        </IconButton>
      ),
    },
  ];

  const fetchData = useFetchList<SPODeregistrationTabpular>(
    reportId ? API.REPORT.PREPORT_DEREGSITRATION(reportId) : "",
    {
      ...params,
      sort,
    }
  );

  return (
    <Box>
      <Table
        {...fetchData}
        columns={columns}
        total={{
          title: "Pool Registration",
          count: fetchData.total,
        }}
        pagination={{
          ...params,
          total: fetchData.total,
          onChange: (page, size) => setParams({ page: page - 1, size }),
        }}
      />
       <DeregistrationCertificateModal data={selected} open={!!selected} handleCloseModal={() => setSelected(null)} />
    </Box>
  );
};

export default DeregsitrationTab;
