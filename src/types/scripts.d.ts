interface NativeScripts {
  scriptHash: string;
  numberOfTokens: number;
  numberOfAssetHolders: number;
}

type NativeScriptsList = {
  before: string;
  isMultiSig: boolean;
  numberOfAssetHolders: number;
  numberOfTokens: number;
  scriptHash: string;
  tokens: {
    displayName: string;
    fingerprint: string;
    name: string;
    policy: string;
    policyIsNativeScript: boolean;
  }[];
};

interface ScriptSmartContracts {
  scriptHash: string;
  scriptVersion: "MULTISIG" | "TIMELOCK" | "PLUTUSV2" | "PLUTUSV1";
  txCount: number;
  txPurposes: ["SPEND" | "MINT" | "CERT" | " REWARD"];
}

interface ScriptAssociatedAddress {
  scriptHash: string;
  scriptType: string;
  associatedAddresses: string[];
}

interface ScriptContractTransactions {
  hash: string;
  time: string;
  blockNo: number;
  epochNo: number;
  epochSlotNo: number;
  absoluteSlot: number;
  addresses: string[];
  scriptPurposeTypes: string[];
}
