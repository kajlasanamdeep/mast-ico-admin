import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ethers } from "ethers";
import { Abis, Addresses, chainDetails } from "@/data/constants";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
declare global {
  interface Window {
    ethereum?: ethers.Eip1193Provider;
  }
}
const fetchTokenDetails = async () => {
  const provider = new ethers.JsonRpcProvider(
    "https://go.getblock.io/4ae154ba7579449b83bb124da18fee86"
  );

  const preSaleContract = new ethers.Contract(
    Addresses.preSale,
    Abis.preSaleAbi,
    provider
  );
  const tokenContract = new ethers.Contract(
    Addresses.token,
    Abis.tokenAbi,
    provider
  );

  // Execute all contract calls in parallel using Promise.all
  const [
    tokenPrice,
    tokenName,
    tokenSymbol,
    tokenDecimals,
    tokenTotalSupply
  ] = await Promise.all([
    preSaleContract.tokenPrice(),
    tokenContract.name(),
    tokenContract.symbol(),
    tokenContract.decimals(),
    tokenContract.totalSupply()
  ]);

  const formattedPrice = ethers.formatEther(tokenPrice);
  const formattedTotalSupply = ethers.formatEther(tokenTotalSupply);

  return {
    tokenTotalSupply: +formattedTotalSupply,
    tokenPrice: +formattedPrice,
    tokenDecimals: tokenDecimals.toString(),
    tokenSymbol,
    tokenName,
  };
};

const TokenManagement = () => {
  const queryClient = useQueryClient();
  
  // Use React Query for fetching token details
  const { data: tokenData, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['tokenDetails'],
    queryFn: fetchTokenDetails
  });
  
  const [priceConfig, setPriceConfig] = useState({
    tokenPrice: 1,
    minPurchase: 100,
    maxPurchase: 100000
  });
  // Mutation for updating price (placeholder for actual implementation)
  const updatePriceMutation = useMutation({
    mutationFn: async (newPrice: number) => {
      // Simulate API call
      await updateTokenPrice();
    },
    onSuccess: () => {
      // Invalidate and refetch token details after successful update
      queryClient.invalidateQueries({ queryKey: ['tokenDetails'] });
    }
  });

  const handlePriceConfigChange = (e) => {
    setPriceConfig({
      ...priceConfig,
      [e.target.name]: parseFloat(e.target.value)
    });
  };

  const handleUpdatePrice = () => {
    updatePriceMutation.mutate(priceConfig.tokenPrice);
  };
  const updateTokenPrice = async () => {
    if (!window.ethereum) {
      throw new Error('Ethereum Wallet Not Installed!');
    }
    try {
      // Request wallet connection
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send('eth_requestAccounts', []);

      // Ensure user is connected to required chain
      const currentChainId = await provider.send('eth_chainId', []);
      if (currentChainId !== chainDetails.chainId) {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: chainDetails.chainId }],
          });
        } catch (switchError) {
          // If the chain is not added to MetaMask, request to add it
          if (switchError.code === 4902) {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                chainDetails
              ],
            });
          } else {
            throw switchError;
          }
        }
      }

      const signer = await provider.getSigner();
      console.log('Connected signer:', await signer.getAddress());
      const contract = new ethers.Contract(Addresses.preSale, Abis.preSaleAbi, signer);
      const ownerAddress = await contract.owner();
      const connectedAddress = await signer.getAddress()
      if (ownerAddress !== connectedAddress) {
        throw new Error("Only the contract owner can update the token price.");
      }
      const tx = await contract.setTokenPrice(
        ethers.parseEther(`${priceConfig?.tokenPrice}`),
        {
          gasLimit: 60000
        }
      );
      await tx.wait();
      refetch();
    } catch (error) {
      console.error('Error connecting to Sepolia:', error);
      throw error;
    }
  };
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading token data...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
        <h3 className="text-lg font-medium">Error loading token data</h3>
        <p>{error?.message || "An unknown error occurred. Please try again."}</p>
        <Button onClick={() => refetch()} className="mt-2">Retry</Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Token Management</h1>
          <p className="text-muted-foreground">Manage your MAST token details and distribution</p>
        </div>
        <div>
          <Button onClick={() => refetch()} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Refreshing...
              </>
            ) : (
              "Refresh Token Data"
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Token Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{tokenData?.tokenName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Symbol</p>
                  <p className="font-medium">{tokenData?.tokenSymbol}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Decimals</p>
                  <p className="font-medium">{tokenData?.tokenDecimals}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Supply</p>
                  <p className="font-medium">{tokenData?.tokenTotalSupply} {tokenData?.tokenSymbol}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Contract Address</p>
                  <p className="font-medium truncate">{Addresses.token}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Current Price</p>
                  <p className="font-medium">${tokenData?.tokenPrice}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Price Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Token Price (USD)</label>
                <Input
                  type="number"
                  name="tokenPrice"
                  defaultValue={tokenData?.tokenPrice}
                  onChange={handlePriceConfigChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Min Purchase</label>
                  <Input
                    type="number"
                    name="minPurchase"
                    value={priceConfig.minPurchase}
                    onChange={handlePriceConfigChange}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Max Purchase</label>
                  <Input
                    type="number"
                    name="maxPurchase"
                    value={priceConfig.maxPurchase}
                    onChange={handlePriceConfigChange}
                  />
                </div>
              </div>
              <Button
                className="w-full"
                onClick={handleUpdatePrice}
                disabled={updatePriceMutation.isPending}
              >
                {updatePriceMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Price"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>Distribution Control</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Use this panel to distribute tokens to investors after the ICO ends</p>
          <Button disabled>Start Distribution</Button>
          <p className="mt-2 text-sm text-muted-foreground">Distribution will be available after ICO ends on May 14, 2025</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TokenManagement;