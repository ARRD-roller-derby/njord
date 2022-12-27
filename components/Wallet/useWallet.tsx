import { TriggerEvents } from "../../types/trigger-events.enum";
import useNotificationWithFetch from "../_hooks/useNotificationWithFetch";

export default function useWallet() {
  const wallet = useNotificationWithFetch<number>(TriggerEvents.wallet, 'users/wallet');
  return wallet
}