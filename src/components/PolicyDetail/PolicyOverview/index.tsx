import { Box, Modal, useTheme } from "@mui/material";
import { HiArrowLongLeft } from "react-icons/hi2";
import infoIcon from "../../../commons/resources/icons/info.svg";
import policyIcon from "../../../commons/resources/icons/policyIcon.svg";
import closeIcon from "../../../commons/resources/icons/closeIcon.svg";
import { numberWithCommas } from "../../../commons/utils/helper";
import CopyButton from "../../commons/CopyButton";
import {
  BackButton,
  BackText,
  ButtonClose,
  CardInfoOverview,
  CardItem,
  HeaderContainer,
  HeaderTitle,
  ModalContainer,
  SlotLeader,
  SlotLeaderContainer,
  SlotLeaderSkeleton,
  TitleCard,
  ValueCard,
  ViewJson,
} from "./styles";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import { JsonViewer } from "@textea/json-viewer";

import { IconButton } from "@mui/material";
import { ReactComponent as Bookmark } from "../../../commons/resources/icons/Bookmark.svg";

interface Props {
  data: PolicyDetail | null;
  loading: boolean;
}

const PolicyOverview: React.FC<Props> = ({ data, loading }) => {
  const [openModal, setOpenModal] = useState(false);
  const history = useHistory();

  return (
    <Box>
      <Box display={"flex"} justifyContent="space-between" alignItems={"center"}>
        <Box>
          <BackButton onClick={() => history.goBack()}>
            <HiArrowLongLeft />
            <BackText>Back</BackText>
          </BackButton>
          <HeaderContainer>
            <HeaderTitle>Policy Details</HeaderTitle>
          </HeaderContainer>
          <SlotLeaderContainer>
            {loading ? (
              <SlotLeaderSkeleton variant="rectangular" />
            ) : (
              <Box>
                <SlotLeader>
                  <Box fontWeight={400} color={theme => theme.gray_3}>
                    Policy ID:{" "}
                  </Box>{" "}
                  <Box ml={2}>{data?.policyId}</Box> <CopyButton text={data?.policyId} />
                </SlotLeader>
              </Box>
            )}
          </SlotLeaderContainer>
        </Box>
        <CardItem
          color={theme => theme.green_2}
          fontWeight="bold"
          fontFamily={'"Roboto", sans-serif'}
          fontSize={"1.125rem"}
          component="button"
          border={"none"}
          bgcolor="transparent"
          padding={0}
          onClick={() => setOpenModal(true)}
          style={{ cursor: "pointer" }}
        >
          <Box>
            <img src={policyIcon} alt="" width={"40%"} />
          </Box>
          <Box display={"flex"} flexDirection="column" height={"100%"} justifyContent="space-between">
            <Box>Policy Script</Box>
          </Box>
        </CardItem>
      </Box>

      <ScriptModal open={openModal} onClose={() => setOpenModal(false)} script={data?.policyScript} />
    </Box>
  );
};

export default PolicyOverview;

interface ScriptModalProps {
  open: boolean;
  onClose: () => void;
  script?: string;
}
const ScriptModal: React.FC<ScriptModalProps> = ({ script, ...props }) => {
  const theme = useTheme();
  return (
    <Modal {...props}>
      <ModalContainer>
        <ButtonClose onClick={props.onClose}>
          <img src={closeIcon} alt="icon close" />
        </ButtonClose>
        <Box textAlign={"left"} fontSize="1.5rem" fontWeight="bold" fontFamily={'"Roboto", sans-serif'}>
          Policy script
        </Box>
        {script && (
          <ViewJson>
            <JsonViewer
              value={JSON.parse(script || "")}
              displayObjectSize={false}
              displayDataTypes={false}
              enableClipboard={false}
              collapseStringsAfterLength={false}
              style={{ padding: 0, background: "none", color: theme.gray_3 }}
              rootName={false}
            />
          </ViewJson>
        )}
      </ModalContainer>
    </Modal>
  );
};
