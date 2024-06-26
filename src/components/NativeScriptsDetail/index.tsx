import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { Box, useTheme } from "@mui/material";
import { HiArrowLongLeft } from "react-icons/hi2";

import CustomAccordion, { TTab } from "src/components/commons/CustomAccordion";
import AssociatedAddress from "src/components/NativeScriptsDetail/Tabs/AssociatedAddress";
import {
  AssetHoldersIcon,
  AssociatedAddressesIcon,
  MintingBurningPolicyIcon,
  ScriptTabIcon,
  TokenTabIcon
} from "src/commons/resources";
import HeaderOverview from "src/components/NativeScriptsDetail/HeaderOverview";
import MinttingBurningPolicy from "src/components/NativeScriptsDetail/Tabs/MinttingBurningPolicy";
import Script from "src/components/NativeScriptsDetail/Tabs/Script";
import Token from "src/components/NativeScriptsDetail/Tabs/Token";
import AssetHolders from "src/components/NativeScriptsDetail/Tabs/AssetHolders";
import { details } from "src/commons/routers";

import { StyledContainer } from "./styles";
import { useNativeScriptDetail } from "./Tabs";
import { BackButton, BackText } from "../AddressDetail/AddressHeader/styles";
import VerifyFormModal from "./Modals/VerifyFormModal";

const NativeScriptsDetail = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const { associatedAddress, loading, keyHashes, refresh } = useNativeScriptDetail();
  const { t } = useTranslation();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const smartcontractTabs: TTab[] = [
    {
      key: "mintingBurningPolicy",
      icon: MintingBurningPolicyIcon,
      children: <MinttingBurningPolicy />,
      label: <Box data-testid="ns.mintBurnPolicy">{t("nativeScript.policy")}</Box>
    },
    {
      key: "script",
      icon: ScriptTabIcon,
      children: <Script onVerifyScriptOpen={() => setOpen(true)} />,
      label: <Box data-testid="ns.script">{t("nativeScript.script")}</Box>
    },
    {
      key: "token",
      icon: TokenTabIcon,
      children: <Token />,
      label: <Box data-testid="ns.token">{t("nativeScript.token")}</Box>
    },
    {
      key: "assetHolders",
      icon: AssetHoldersIcon,
      children: <AssetHolders />,
      label: <Box data-testid="ns.assetHolders">{t("nativeScript.assetHolders")}</Box>
    },
    {
      key: "associatedAddresses",
      icon: AssociatedAddressesIcon,
      children: <AssociatedAddress />,
      label: <Box data-testid="ns.AssociatedAddresses">{t("common.associatedAddresses")}</Box>
    }
  ];

  const hiddenKeys = useMemo(() => {
    const keys: string[] = [];
    if (!keyHashes?.length) keys.push("mintingBurningPolicy");
    return keys;
  }, [associatedAddress, keyHashes]);

  const onTabChange = (tab: string) => {
    history.replace(details.nativeScriptDetail(id, tab));
  };

  return (
    <StyledContainer>
      <Box display="flex" justifyContent="flex-start">
        <BackButton onClick={history.goBack}>
          <HiArrowLongLeft color={theme.palette.secondary.light} />
          <BackText>{t("common.back")}</BackText>
        </BackButton>
      </Box>
      <VerifyFormModal
        open={open}
        onClose={() => setOpen(false)}
        onReload={() => {
          setOpen(false);
          refresh?.();
        }}
      />
      <HeaderOverview data={{ scriptHash: id }} />
      <Box sx={{ [theme.breakpoints.down("sm")]: { px: 2 } }}>
        <CustomAccordion loading={loading} tabs={smartcontractTabs} hiddenKeys={hiddenKeys} onTabChange={onTabChange} />
      </Box>
    </StyledContainer>
  );
};

export default NativeScriptsDetail;
