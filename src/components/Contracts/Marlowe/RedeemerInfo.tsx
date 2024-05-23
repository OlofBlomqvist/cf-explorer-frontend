import { Container, Typography } from "@mui/material";
import React from "react";

interface Props {
  bytes: string;
  scriptHash: string;
}

const MarloweRedeemerInfo: React.FC<Props> = ({ bytes, scriptHash }) => {
  const marloweValidatorV5 = "377325ad84a55ba0282d844dff2d5f0f18c33fd4a28a0a9d73c6f60d";
  const marloweValidatorV4 = "6027a8010c555a4dd6b08882b899f4b3167c6e4524047132202dd984";
  const marloweValidatorV3 = "d85fa9bc2bdfd97d5ebdbc5e3fc66f7476213c40c21b73b41257f09d";
  const marloweValidatorV2 = "2ed2631dbb277c84334453c5c437b86325d371f0835a28b910a91a6e";
  const marloweValidatorV1 = "6a9391d6aa51af28dd876ebb5565b69d1e83e5ac7861506bd29b56b0";

  if (
    ![marloweValidatorV5, marloweValidatorV4, marloweValidatorV3, marloweValidatorV2, marloweValidatorV1].includes(
      scriptHash
    )
  ) {
    return <></>;
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const decode: any = (window as any).marlowe_rs?.decode_marlowe_input_cbor_hex;
    if (decode === undefined) {
      return <></>;
    }
    const decoded: string = decode(`${bytes}`);
    return (
      <Container>
        <Typography variant="subtitle1">Decoded Marlowe Redeemer:</Typography>
        <br />
        <pre>{decoded}</pre>
      </Container>
    );
  } catch {
    return <></>;
  }
};

export default MarloweRedeemerInfo;
