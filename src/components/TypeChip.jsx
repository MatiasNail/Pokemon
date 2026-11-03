import { typeIcons, typeColors } from "../data/types";
import { traducirTipo } from "../utils/effectiveness";

export default function TypeChip({ tipo }) {
  return (
    <span className="type-chip" style={{ backgroundColor: typeColors[tipo] }}>
      <span aria-hidden="true">{typeIcons[tipo]}</span> {traducirTipo(tipo)}
    </span>
  );
}