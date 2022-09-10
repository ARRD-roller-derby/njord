import Image from "next/image";

interface props {
    readonly size?:number
    readonly url:string
    
}

export default function MyAvatarView({size=30, url}:props) {

  return (
    <Image
      src={url || "/static/images/profile.webp"}
      width={size}
      height={size}
      alt={url || "profil"}
    />
  );
}

