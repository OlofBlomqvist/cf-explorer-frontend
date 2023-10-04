import { Grid } from "@mui/material";
import React from "react";

import CustomModal from "src/components/commons/CustomModal";

import { ModalContent } from "./styles";
import ExplanDropdown from "../common/ExplanDropdown";
import DataCard from "../common/DataCard";

type Data = { title: string; value?: string | number };
export interface DatumModalProps {
  open?: boolean;
  onClose?: () => void;
  data?: Data[];
}
const DatumModal: React.FC<DatumModalProps> = ({ open = false, onClose, data }) => {
  const handleCloseModal = () => onClose?.();
  return (
    <CustomModal
      modalProps={{ style: { zIndex: 1302 } }}
      open={open}
      onClose={handleCloseModal}
      title="Datum"
      width={550}
      modalContainerProps={{ px: "20px" }}
    >
      <ModalContent>
        <ExplanDropdown title="What is the datum?">
          Datum is a piece of information that can be associated with a UTXO and is used to carry script state
          information such as its owner or the timing details which define when the UTXO can be spent. When a script is
          executed in a spending scenario, it receives not only the transaction as context but also the datum associated
          with the output being spent.
        </ExplanDropdown>
        <Grid container spacing={2}>
          {data &&
            data.length > 0 &&
            data.map((item) => (
              <Grid item xs={12} md={6} key={item.title}>
                <DataCard title={item.title} value={item.value} />
              </Grid>
            ))}
        </Grid>
      </ModalContent>
    </CustomModal>
  );
};

export default DatumModal;