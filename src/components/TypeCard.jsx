import MatchupGroup from "./MatchupGroup";
import { matchupCategories } from "../data/types";
import { traducirTipo } from "../utils/effectiveness";

export default function TypeCard({ pokemon, grupos, cargando }) {
  const gruposAMostrar =
    grupos ?? matchupCategories.map(categoria => ({ ...categoria, types: [] }));
  const textoVacio = grupos ? "Ninguno" : "—";

  let intro = "Busca un Pokémon para ver cómo le afectan los tipos.";
  if (cargando) {
    intro = "Calculando las efectividades de sus tipos...";
  } else if (pokemon && grupos) {
    const nombres = pokemon.types.map(({ type }) => traducirTipo(type.name));
    intro = `Efectividades contra ${nombres.join(" / ")}.`;
  }

  return (
    <section className="type-card" aria-labelledby="type-card-title">
      <h2 id="type-card-title">Debilidades y resistencias</h2>
      <p className="type-intro">{intro}</p>
      <div
        className="matchups"
        role="group"
        aria-label="Tabla de efectividades por tipo"
        aria-live="polite"
        aria-busy={cargando}
      >
        {gruposAMostrar.map(({ title, types }) => (
          <MatchupGroup
            key={title}
            title={title}
            types={types}
            textoVacio={textoVacio}
          />
        ))}
      </div>
    </section>
  );
}