import useWallet from './useWallet';
import WalletView from './WalletView';

export default function Wallet() {
  const wallet = useWallet();
  return <WalletView wallet={wallet}/>
}
