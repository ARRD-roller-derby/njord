import { profile, ProfilesName } from '../types/Profile.interface';

export function ProfilAccess(
  authorizedProfiles: Array<ProfilesName>,
  profiles: Array<{profile:profile}>
): boolean {
  const numAuthProfile = profiles.filter((o) =>
    authorizedProfiles.find((profileName) => profileName === o.profile.name)
  );
  return numAuthProfile.length > 0;
}
