import AuthentificatedLayout from "../../_layouts/Authentificated/Authentificated";
import classes from "./Membre.module.css";

export default function Membre({id}) {
  
  /**
   * Profil est différent car on update seulement nos prefs. 
   */

  /**
   * Fetch, pas de cache en base ? ou on cherche d'abord dans la base, pareil pour les events
   * cherche par ID dans la DB, 
   * puis pareil que sur membre.
   * on pourra ajouter une clé à update pour relancer une update qui n'a pas eu de réseau ? 
   */
  return (
    <AuthentificatedLayout>
      <div className={classes.container}>
        <h1 className={classes.title}>Membre</h1>
        {id}
      </div>
    </AuthentificatedLayout>
  );
}
