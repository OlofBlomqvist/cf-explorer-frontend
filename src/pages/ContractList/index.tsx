import React from "react";
import { useLocation } from "react-router-dom";
import { parse } from "qs";

import useFetchList from "../../commons/hooks/useFetchList";
import ContractList from '../../components/ContractList';
import { Container } from "@mui/material";

interface Props {}

const Transactions: React.FC<Props> = () => {
  const { search } = useLocation();
  const query = parse(search.split("?")[1]);

  const {
    data: transactions,
    loading: transactionsLoading,
    initialized,
    total,
    totalPage,
    currentPage,
  } = useFetchList<Transactions>("tx/list", {
    page: query.page ? +query.page - 1 : 0,
    size: query.size ? (query.size as string) : 10,
  });

  return (
    <Container>
      <ContractList
        currentPage={currentPage}
        loading={transactionsLoading}
        initialized={initialized}
        transactions={transactions}
        total={total}
        totalPage={totalPage}
      />
    </Container>
  );
};

export default Transactions;
