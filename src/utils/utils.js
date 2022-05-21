export const toHex = (num) => {
  const val = Number(num);
  return "0x" + val.toString(16);
};
/**
 * Returns a string of form "abc...xyz"
 * @param {string} str string to string
 * @param {number} n number of chars to keep at front/end
 * @returns {string}
 */
export const getEllipsisTxt = (str, n = 6) => {
  if (str) {
    return `${str.slice(0, n)}...${str.slice(str.length - n)}`;
  }
  return "";
};

export const redirect = (url) => {
  window.open(url, "_blank");
};

export const truncateAddress = (address) => {
  if (!address) return "No Account";
  const match = address.match(
    /^(0x[a-zA-Z0-9]{2})[a-zA-Z0-9]+([a-zA-Z0-9]{2})$/
  );
  if (!match) return address;
  return `${match[1]}…${match[2]}`;
};

export const FractxTokenAddress = "0xbcC35477b5b360713C8CE874EE936a0FB14b5E3c";
export const FractTokenAddress = "0x953f88014255241332d8841C34921572db112D65";
export const FractionlessAddress = "0x147Aef142CCebf9902ec57A369D4aB1B6126Fc69";
export const FractionlessWrapperAddress =
  "0xb68dF2721e747a30A611D9279169d36E448C600C";
export const FractionNFTAddress = "0x8b78A188f3941BdF5BcDE61A0c32C68A4044fdbB";
export const NFTRegistryAddress = "0x34c93Cf06bADc3c64c18d02DD2dFb5f43a32C472";
