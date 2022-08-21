import { useState, useEffect } from "react";

export default function useIsOnline():boolean {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    window.addEventListener("offline", () => {setIsOnline(false)});
    window.addEventListener("online", () => {setIsOnline(true)});
  }, []);

  return isOnline;
}
