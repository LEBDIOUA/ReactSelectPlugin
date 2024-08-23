# @lebdioua/react-select-plugin
Un composant de liste déroulante personnalisable et simple pour React.

## Installation
Vous pouvez installer le package en utilisant npm :
`npm install @lebdioua/react-select-plugin`

ou en utilisant yarn :
`yarn add @lebdioua/react-select-plugin`

## Utilisation
Voici un exemple basique de l'utilisation du composant **CustomSelect** :

```
import React, { useState } from 'react';
import CustomSelect from '@lebdioua/react-select-plugin';
import '@lebdioua/react-select-plugin/dist/style.css'; // Assurez-vous d'importer le CSS

const App = () => {
  const [selectedItem, setSelectedItem] = useState('');

  const handleSelect = (value) => {
    setSelectedItem(value);
    console.log('Élément sélectionné:', value);
  };

  const data = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2', disabled: true },
    { label: 'Option 3', value: '3' },
  ];

  return (
    <div>
      <h1>Exemple de Select Personnalisé</h1>
      <CustomSelect
        id="example-select"
        data={data}
        defaultValue="Select an option"
        onSelect={handleSelect}
      />
      <p>Élément sélectionné : {selectedItem}</p>
    </div>
  );
};

export default App;
```

## Props
Le composant CustomSelect accepte les props suivantes :
| Prop Name    | Type     | Required | Description                                                                 |
|--------------|----------|----------|-----------------------------------------------------------------------------|
| `id`         | `string` | oui      | L'identifiant unique pour le composant select.                              |
| `data`       | `array`  | oui      | Le tableau d'éléments à afficher dans la liste déroulante. |
| `defaultValue` | `string` | non    | La valeur sélectionnée par défaut.                                          |
| `onSelect`   | `function` | oui   | La fonction de rappel qui est appelée lorsqu'un élément est sélectionné.    |
| `className`	|`string` |	non	| Classe CSS personnalisée à appliquer au composant select.
| `classNameErr` |	`string` |	non	| Classe CSS à appliquer en cas d'erreur.
| `isError`	| `bool` |	non |	Indicateur de l'état d'erreur.
| `reset`	| `bool` |	non |	Réinitialise la valeur sélectionnée à la valeur par défaut.
| `tabIndex`	| `number` | 	non |	Index de tabulation pour l'accessibilité.

## Styles
Assurez-vous d'importer le fichier CSS pour appliquer les styles par défaut :
`import '@lebdioua/react-select-plugin/dist/style.css';`

Vous pouvez personnaliser les styles en surchargant les classes CSS par défaut :

```
.custom-select {
  /* Vos styles personnalisés */
}

.select-selected {
  /* Vos styles personnalisés */
}

.select-items {
  /* Vos styles personnalisés */
}

.select-hide {
  /* Vos styles personnalisés */
}

.select-arrow-active {
  /* Vos styles personnalisés */
}

.select-disabled {
  /* Vos styles personnalisés */
}
```

## Fonctionnalités
- Personnalisable : Ajoutez vos propres classes pour styliser le composant selon vos besoins.
+ Gestion des erreurs : Affichez les états d'erreur avec une classe spécifique.
* Valeurs par défaut : Définissez des valeurs par défaut à afficher initialement.
- Désactivation des options : Désactivez facilement des options spécifiques.
+ Réinitialisation : Remet la zone de sélection à la valeur par défaut si elle est définie, sinon à la première valeur de la liste.

## Contribution
Les contributions sont les bienvenues ! Veuillez ouvrir une issue ou soumettre une pull request pour tout bug ou amélioration.

## Remerciements
Inspiré par le besoin d'un composant de liste déroulante personnalisable et léger dans React.
