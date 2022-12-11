import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
export default function useMenuMobile() {
  const
    [isOpen, setIsOpen] = useState<boolean>(false),
    { data: session } = useSession(),
    router = useRouter();

  function goToPage(url: string) {
    setIsOpen(false);
    router.push(url);
  }

  function getAuth(profileName: string): boolean {
    if (session) {
      return !!session.user.profiles.find((o: string) => o === profileName)
    } else {
      return false
    }
  }

  return {
    isOpen, setIsOpen: () => setIsOpen(!isOpen),
    goToPage,
    isAdmin: session ? !!session.isAdmin : false,
    isAdmin_game: session ? !!session.admin_game : false,
    bureau: getAuth('bureau'),
    coach: getAuth('coach'),
    com: getAuth('com'),
  }
}