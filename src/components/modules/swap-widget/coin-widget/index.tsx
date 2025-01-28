"use client";

// TODO: REMOVE

interface SwapProps {
  onSwap?: (fromAmount: number, toAmount: number) => void;
  loading?: boolean;
}

const CoinWidget = ({ onSwap, loading = false }: SwapProps) => {


  // TODO: Fetch balance
  // useEffect(() => {
  //   const loadBalance = async () => {
  //     if (account?.address && activeToken.tokenAddress) {
  //       try {
  //         const newBalance = await fetchBalance(account.address, activeToken.tokenAddress);
  //         setBalance(prev => ({
  //           ...prev,
  //           [activeToken.tokenAddress]: newBalance
  //         }));
  //       } catch (error) {
  //         console.error('Error fetching balance:', error);
  //       }
  //     }
  //   };

  //   loadBalance();
  // }, [account?.address, activeToken.tokenAddress]);

  return (
<></>
  );
};

export default CoinWidget;
