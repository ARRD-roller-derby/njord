import Members from '../components/Members/Members';
import AuthentificatedLayout from '../Layouts/Authentificated/Authentificated';

export default function Membres() {
  return (
    <AuthentificatedLayout title="membres">
      <Members />
    </AuthentificatedLayout>
  );
}
