import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

function CustomSelect({ id, data, defaultValue, onSelect, className, classNameErr, isError, reset, tabIndex }) {
  const itemSelected = useRef(null);
  const selectItems = useRef(null);
  const [selectedValue, setSelectedValue] = useState(defaultValue ?? data[0].value ?? data[0]);

  // Gère la réinitialisation de la sélection et l'affichage des erreurs
  useEffect(() => {
    if (reset) {
      setSelectedValue(defaultValue ?? data[0].value ?? data[0]);
    }

    if (isError) {
      itemSelected.current.classList.add(`${classNameErr}`);
    } else {
      itemSelected.current.classList.remove(`${classNameErr}`);
    }

    if (itemSelected.current) {
      if (!selectedValue || (defaultValue && selectedValue === defaultValue)) {
        itemSelected.current.classList.add("placeHolder");
      } else {
        itemSelected.current.classList.remove("placeHolder");
      }
    }
  }, [reset, isError, defaultValue, classNameErr, data, selectedValue]);

  // Ferme la liste déroulante si un clic est effectué en dehors du sélecteur
  const handleClickOutside = (event) => {
    if (
      selectItems.current &&
      !selectItems.current.contains(event.target) &&
      itemSelected.current &&
      !itemSelected.current.contains(event.target)
    ) {
      selectItems.current.classList.add("select-hide");
      itemSelected.current.classList.remove("select-arrow-active");
    }
  };

  // Ajoute et enlève l'écouteur d'événements pour détecter les clics en dehors du sélecteur
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Gère l'ouverture et la fermeture de la liste déroulante et ajuste sa position
  const controlSelect = () => {
    if (selectItems.current && itemSelected.current) {
      const { top, bottom, height } = itemSelected.current.getBoundingClientRect(); // Récupère les positions de l'élément sélectionné par rapport à la fenêtre
      const windowHeight = window.innerHeight; // Récupère la hauteur de la fenêtre visible

      // Calcule l'espace disponible en dessous et au-dessus de l'élément sélectionné
      const spaceBelow = windowHeight - bottom;
      const spaceAbove = top;

      // Si l'espace en dessous est insuffisant (moins de 150px) et que l'espace au-dessus est plus grand,
      // place la liste d'options au-dessus de l'élément sélectionné
      if (spaceBelow < 150 && spaceAbove > spaceBelow) {
        selectItems.current.style.bottom = `${height}px`; // Positionne la liste en haut de l'élément sélectionné
        selectItems.current.style.top = "auto"; // Désactive le positionnement en bas
      } else {
        // Sinon, place la liste d'options en dessous de l'élément sélectionné
        selectItems.current.style.top = `${height}px`; // Positionne la liste en bas de l'élément sélectionné
        selectItems.current.style.bottom = "auto"; // Désactive le positionnement en haut
      }

      // Bascule la visibilité de la liste d'options (affiche/masque)
      selectItems.current.classList.toggle("select-hide");

      // Ajoute ou supprime la classe qui indique que la flèche est active (ouverte)
      itemSelected.current.classList.toggle("select-arrow-active");
    }
  };

  // Met à jour la valeur sélectionnée et appelle la fonction onSelect
  const itemSelectedChange = (value) => {
    setSelectedValue(value);
    if (value) {
      onSelect(value);
    }
    controlSelect(); // Permettre de fermer la liste
  };

  return (
    <div id={id} className={`custom-select ${className}`}>
      <div className="select-selected" ref={itemSelected} onClick={controlSelect} tabIndex={tabIndex ?? 0}>
        {selectedValue}
      </div>
      <div className="select-items select-hide" ref={selectItems}>
        {data.map((item, index) => {
          return (
            <div
              key={index}
              className={item.disabled ? "select-disabled" : ""}
              onClick={() => {
                if (!item.disabled) {
                  itemSelectedChange(item.label ?? item.value ?? item);
                }
              }}
              tabIndex={item.disabled ? -1 : tabIndex || 0}
            >
              {item.label ? item.label : item.value ? item.value : item}
            </div>
          );
        })}
      </div>
    </div>
  );
}
CustomSelect.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  defaultValue: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  className: PropTypes.string,
  classNameErr: PropTypes.string,
  isError: PropTypes.bool,
  reset: PropTypes.bool,
  tabIndex: PropTypes.number,
};
export default CustomSelect;
