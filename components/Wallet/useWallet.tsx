import useNotificationWithFetch from "../_hooks/useNotificationWithFetch";

export default function useWallet(){
  const wallet = useNotificationWithFetch<number>('wallet','users/wallet');
  return wallet
}