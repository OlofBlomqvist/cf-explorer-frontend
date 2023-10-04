import React from "react";
import { Link } from "react-router-dom";
import { CgClose } from "react-icons/cg";
import { useTranslation } from "react-i18next";

import { details } from "src/commons/routers";

import ContractDetail from "./ContractDetail";
import { ContractSideViewContainer, ContractSideViewContent, ContractSideViewHeader } from "./styles";
import { CloseButton, ContractAddress, ContractHeader, ContractText, TxHash } from "../ContractDiagrams/styles";
import CustomTooltip from "../commons/CustomTooltip";

export interface ContractSideView {
  data?: IContractItemTx;
  txHash?: string;
  handleClose?: () => void;
}

const ContractSideView: React.FC<ContractSideView> = ({ data, txHash, handleClose }) => {
  const { t } = useTranslation();

  const linkToPage = () => {
    if (txHash) return details.transaction(txHash);
    return data?.address ? details.contract(data.address) : details.policyDetail(data?.scriptHash);
  };
  return (
    <ContractSideViewContainer>
      <ContractSideViewHeader>
        <ContractHeader>
          <ContractText>{txHash ? t("glossary.transactions") : t("glossary.contract")}</ContractText>
          {handleClose ? (
            <CustomTooltip title={t("common.close")}>
              <CloseButton onClick={handleClose}>
                <CgClose />
              </CloseButton>
            </CustomTooltip>
          ) : null}
        </ContractHeader>
        <TxHash>
          <Link to={linkToPage()}>
            <ContractAddress data-testid={`contract-hash-${txHash || data?.address || data?.scriptHash}`}>
              {txHash || data?.address || data?.scriptHash}
            </ContractAddress>
          </Link>
        </TxHash>
      </ContractSideViewHeader>
      <ContractSideViewContent>
        <ContractDetail isMobile={true} data={data} />
      </ContractSideViewContent>
    </ContractSideViewContainer>
  );
};

export default ContractSideView;
