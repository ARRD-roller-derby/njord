import classes from "./MyAvatar.module.css";
import { useSession } from "next-auth/react";
import Image from "next/image";

interface props {
    readonly size?:number
}

export default function MyAvatar({size=30}:props) {
  const { data: session } = useSession();
  
  return (
    <Image
      src={session?.user.avatar || "/static/images/profile.webp"}
      width={size}
      height={size}
      alt={session?.user.name || "profil"}
    />
  );
}

