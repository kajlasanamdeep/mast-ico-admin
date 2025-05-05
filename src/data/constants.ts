import preSale from './Abis/preSale.json';
import token from './Abis/token.json';
export const Addresses = {
    preSale: '0x5f39137F0fFf2726180B4BD5567288ee0647cec4',
    token: '0xA2CCc82Da9C676E22568C8cfAa2B071F8Eb1db83'
}

export const Abis = {
    preSaleAbi: preSale,
    tokenAbi: token
}

export const chainDetails = {
    chainId: '0xaa36a7',
    chainName: 'Sepolia Test Network',
    rpcUrls: ['https://go.getblock.io/4ae154ba7579449b83bb124da18fee86'], // or other public RPCs
    nativeCurrency: {
        name: 'SepoliaETH',
        symbol: 'ETH',
        decimals: 18,
    },
    blockExplorerUrls: ['https://sepolia.etherscan.io'],
}

