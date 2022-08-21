# Njörd

Application pour gérer son équipe de derby.

## Bifrost

Le bifrost est l'application qui gère les email et les tâches CRON. 
les projet est disponible sur [Github](https://github.com/ARRD-roller-derby/bifrost).

### développement
Pour lancer le projet en mode développement:

```bash
npm run dev
# or
yarn dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) sur votre navigateur. 


## accessibilité du projet et choix technique 

La couche entre la fonction et son appel vonlontairement minimal. 
Il aurait d'en faire une API `GRAPHQL` mais le projet doit rester abordable.

Le projet doit pouvoir être déployé par les membres d'une association les plus simplement possible en réduisant les coûts aux maximum. 

Il doit être privilégié l'écriture "standalone" d'une nouvelle fonctionnalité. 

### Base de données non relationnel

Le choix d'une base non relationnelle garanti une flexibilité de developpement de nouvelle fonctionnalités. 

Le projet initial était en SQL, mais cela demandait d'avoir une vision long terme sur l'ensemble des fonctionnalités. 
Dans les faits, c'était à peut près le cas, mais le temps disponible pour les réalisé l'était beaucoup moins. 

La base peut-être déployé sur [Mongo Atlas](https://cloud.mongodb.com/) avec la version gratuite.
(vous pouvez choisir votre propre fournisseur, ou auto-hébergé)
#### contraintes 

Seul les références à d'autre collection peuvent être utilisées. Il doit y avoir dans les documents intégrant un sous document provenant d'une autre collection, suffisament d'information pour retrouver le document référence mais aussi toutes les informations utile permettant l'affichage de valeur. 

Il faut prendre en compte qu'il doit y avoir coté fonctionnel la vérification des documents références pouur gérer leurs suppression, modification ... 

Exemple: 

```json

"user" {
  "name":"jane",
  "team": [{
    "id":"teamd_id",
    "name":"ma super team"
  }]
}

```

```json

"teams" {
  "id":"teamd_id",
  "name":"ma super team",
  "description":"Un autre champ non importé"
}

```

### Nextjs / React

Solution solide et largement répandu et permettant d'intégrer plus facilement de nouveaux développeurs. 

### Serveless functions

Le backend est composé de plusieurs serveless function. 
Parfois certaines paraissent redondante (modification d'un seul champs...) mais cela permet plusieurs choses : 
- moins de compléxité
- gestion des contraintes plus facile à lire
- temps d'execution plus rapide (indispensable sur déployé sur des solutions serverless)
- proximité avec le composant appelant. 

Comme les composants frontend, la disparition d'une fonction ne doit pas mettre en peril les autres.  


## Design des composants

Les `vues` et la `logique` sont séparées pour optimiser les tests.
Ils sont rassemblées dans un composant `container`.

Bien que plus verbeux, chaque fichiers constituant le composant est bien plus léger et garanti d'avoir **une responsabilité = un composant**.


### architecture d'un composant

```
Component 
  | Component.tsx (container)
  | ComponentView.tsx (vue)
  | useComponent.tsx (logique)
  | Component.module.css (style scopé au composant)
  | Component.spec.tsx (tests unitaire)

```

### Ecriture
il est conseillé d'écrire d'abord le composant `vue` testable directement dans Storybook par exemple. Vous définissez vos interfaces, ce qui sera plus simple pour l'écriture de la `logique`.

Vous pouvez faire le `container` pour importer les deux autres, il sera alors plus facile de gérer les props à passer. 

### exceptions

Les `ref` obtenu avec `useRef` peuvent être intégré directement à la `vue`. 

### interface

les composants ayant des props definissent chacun leurs interfaces nommé `props`;
### convention de nommage. 

*fonction dans le nom indique l'utilité du composant.*

container : `RefModelFonction`
vues: `RefModelFonctionView`
logique: `useRefModelFonction`

#### Exemple

Le composant ci dessous tranforme une chaîne de caractère en tableau;

**Container**

```TSX

interface props {
  readonly fruitsCSV:string
}
export default function FruitsList({fruitsCSV}:props){
  const props = userFruitsList(fruitsCSV);
  return <FruitsListView {...props} />
}

```

**Vue**

```TSX

interface props {
  readonly fruits:Array<string>
}

export default function FruitsList({fruits}:props){
  
  return <div className={classes.container}/>
  {fruits.map((fruit)=> (
    <div key={fruit} className={classes.fruit}>{fruit}</div>
  )}
  </div>
}

```

**Logique**

Il s'agit d'un `hook`.

```TSX

export default function useFruitsList(fruitsCSV:string){
  const fruits = useMemo(()=>{
    return fruitsCSV.split(',');
  }, [fruitsCSV])

  return {fruits}
}

```

## Style
Il n'y a pas de préprocesseur CSS dans l'application. Le style est géré avec des feuilles de styles globales (définitions des variables...). 
Chaque composant peux avoir son style `scopé` via les `modules CSS`. 

### Première classes

La première classe d'une `vue` est généralement `.container`.

### Un seule classe par tag

Il n'y a jamais plus d'une classe dans une `className`. 

Si vous souhaitez ajouter des dérivés à vos `classes` ou changer leur état, utilisez les `attributs`. 

La lecture est plus claire dans la vue. 

### Exemple

Ici, `open` est un `boolean`.

```TSX

<div className={classes.container} data-open={open}/>
  <div className={classes.bar}/>
  <div className={classes.bar}/>
  <div className={classes.bar}/>
</div>

```

```css

.container {
  background: red;
}

.container[data-open='true'] {
  background: black;
}

.bar {
  display: none;
}

.container[data-open='true'] .bar {
  display: block;
}

```
