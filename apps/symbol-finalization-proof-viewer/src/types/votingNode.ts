export type VotingPublicKeyInfo = {
  votingPublicKey?: string;
  startEpoch?: number;
  endEpoch?: number;
  progress?: number;
  stage0Signature?: string;
  stage1Signature?: string;
};

export type VotingNodeInfoData = {
  host: string;
  publicKey: string;
  address: string;
  amount: string;
  isVoting: boolean;
  votingPublicKeys?: VotingPublicKeyInfo[];
};
