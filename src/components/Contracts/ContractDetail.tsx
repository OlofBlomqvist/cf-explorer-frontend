import React, { useState } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

import { BackIcon } from "src/commons/resources";
import { details as routerDetals } from "src/commons/routers";
import { getShortHash } from "src/commons/utils/helper";
import { NETWORK } from "src/commons/utils/constants";

import Mintviews from "./Mintviews";
import Certviews from "./Certviews";
import Rewardviews from "./Rewardviews";
import { DetailContainer, DetailContent, DetailHeader, ReferenceButton, ReferenceCount } from "./styles";
import { StyledLink } from "../share/styled";
import CustomTooltip from "../commons/CustomTooltip";
import Spendviews from "./SpendViews";
import ReferenceInputModal from "./modals/ReferenceInputModal";

export interface ContractDetailProps {
  view?: "SPEND" | "MINT" | "CERT" | "REWARD";
  data?: IContractItemTx;
  onGoBack?: (data?: IContractItemTx) => void;
  isMobile?: boolean;
}

interface ScriptInfoProps {
  scriptHash?: string;
  utxoHash?: string;
  outputIdx?: number;
}

type MarloweInfoProps = {
  version: string;
  utxoHash: string;
  outputIdx: number;
};
const MarloweInfo: React.FC<MarloweInfoProps> = ({ version, utxoHash, outputIdx }) => {
  const hashPart = encodeURIComponent(`#${outputIdx}`);
  const url = `https://${NETWORK}.marlowescan.com/contractView?tab=info&contractId=${utxoHash}${hashPart}`;
  return (
    <DetailContent margin={2}>
      <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
        <p>Marlowe Validator Script {version}</p>
        <Button variant="outlined" href={url}>
          View details on marlowescan.io
        </Button>
      </Box>
    </DetailContent>
  );
};

const isMarlowe = (scriptHash: string | undefined) => {
  if (scriptHash === undefined) {
    return null;
  }
  if ("377325ad84a55ba0282d844dff2d5f0f18c33fd4a28a0a9d73c6f60d" === scriptHash) {
    return "v5";
  } else if ("6027a8010c555a4dd6b08882b899f4b3167c6e4524047132202dd984" === scriptHash) {
    return "v4";
  } else if ("d85fa9bc2bdfd97d5ebdbc5e3fc66f7476213c40c21b73b41257f09d" === scriptHash) {
    return "v3";
  } else if ("2ed2631dbb277c84334453c5c437b86325d371f0835a28b910a91a6e" === scriptHash) {
    return "v2";
  } else if ("6a9391d6aa51af28dd876ebb5565b69d1e83e5ac7861506bd29b56b0" === scriptHash) {
    return "v1";
  } else {
    return null;
  }
};

const ScriptInfo: React.FC<ScriptInfoProps> = ({ scriptHash, utxoHash, outputIdx }) => {
  if (utxoHash === undefined || outputIdx === undefined) return <></>;
  const marloweVersion = isMarlowe(scriptHash);
  if (marloweVersion !== null)
    return <MarloweInfo version={marloweVersion} utxoHash={utxoHash} outputIdx={outputIdx} />;

  return <></>;
};

const ContractDetail: React.FC<ContractDetailProps> = ({ data, onGoBack, isMobile }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [openReferenceInputModal, setOpenReferenceInputModal] = useState(false);
  const details = {
    CERT: {
      component: <Certviews data={data} isMobile={isMobile} />,
      contract: data?.scriptHash,
      detail: routerDetals.smartContract
    },
    MINT: {
      component: <Mintviews data={data} isBurned={!!data?.burningTokens?.length} isMobile={isMobile} />,
      contract: data?.scriptHash,
      detail: routerDetals.smartContract
    },
    REWARD: {
      component: <Rewardviews data={data} isMobile={isMobile} />,
      contract: data?.scriptHash,
      detail: routerDetals.smartContract
    },
    SPEND: {
      component: <Spendviews data={data} isMobile={isMobile} />,
      contract: data?.scriptHash,
      detail: routerDetals.smartContract
    }
  };
  const { component, contract, detail } = details[(data?.purpose as ContractDetailProps["view"]) || "SPEND"];
  return (
    <DetailContainer isMobile={+!!isMobile}>
      <DetailHeader>
        <Box flex={1} display="flex" justifyContent="flex-start" marginRight={"12px"}>
          {!isMobile && (
            <BackIcon data-testid="goback-button" style={{ cursor: "pointer" }} onClick={() => onGoBack?.(data)} />
          )}
        </Box>
        <Typography fontWeight="500" color={theme.palette.secondary.light}>
          {t("contract.title")}:{" "}
          <CustomTooltip title={contract}>
            <StyledLink style={{ fontWeight: "500", textDecoration: "underline" }} to={detail(contract || "")}>
              {getShortHash(contract || "")}
            </StyledLink>
          </CustomTooltip>
        </Typography>
      </DetailHeader>
      <DetailContent>{component}</DetailContent>

      {data?.referenceInputs && data?.referenceInputs.length > 0 && (
        <Box component={ReferenceButton} mt={3} onClick={() => setOpenReferenceInputModal(true)}>
          {t("trx.referenceInput")} <Box component={ReferenceCount}>{(data?.referenceInputs || [])?.length}</Box>
        </Box>
      )}
      <ReferenceInputModal
        data={data}
        open={openReferenceInputModal}
        onClose={() => setOpenReferenceInputModal(false)}
      />

      <ScriptInfo scriptHash={data?.scriptHash} utxoHash={data?.utxoHash} outputIdx={data?.utxoIndex} />
    </DetailContainer>
  );
};

export default ContractDetail;
