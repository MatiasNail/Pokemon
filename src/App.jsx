import TypeCard from "./components/TypeCard";
import SearchCard from "./components/SearchCard";
import { usePokemon } from "./hooks/usePokemon";

export default function App() {
  const { pokemon, grupos, cargando, error, cargarPokemon } = usePokemon();

  return (
    <main>
      {/* Sin Header, este título oculto mantiene un <h1> para accesibilidad. Bórralo si no lo quieres. */}
      <h1 className="visually-hidden">Pokédex Nacional</h1>

      <TypeCard pokemon={pokemon} grupos={grupos} cargando={cargando} />
      <SearchCard
        pokemon={pokemon}
        cargando={cargando}
        error={error}
        onBuscar={cargarPokemon}
      />
    </main>
  );
}