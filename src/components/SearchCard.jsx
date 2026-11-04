import SearchForm from "./SearchForm";
import PokemonResult from "./PokemonResult";
import StatusMessage from "./StatusMessage";

export default function SearchCard({ pokemon, cargando, error, onBuscar }) {
  return (
    <section className="search-card" aria-labelledby="search-title">
      <h2 id="search-title">Busca tu Pokémon</h2>
      <p className="description">
        Escribe su nombre o número de Pokédex para consultar sus datos.
      </p>

      <SearchForm
        nombreActual={pokemon?.name}
        onBuscar={onBuscar}
      />

      <section
        aria-label="Resultado de la búsqueda"
        aria-live="polite"
        aria-busy={cargando}
      >
        {cargando && <StatusMessage mensaje="Buscando Pokémon..." />}
        {!cargando && error && <StatusMessage mensaje={error} esError />}
        {!cargando && !error && pokemon && (
          <PokemonResult
            pokemon={pokemon}
            cargando={cargando}
            onNavegar={id => onBuscar(String(id))}
          />
        )}
      </section>
    </section>
  );
}   