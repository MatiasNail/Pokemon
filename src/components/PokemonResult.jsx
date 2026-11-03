import TypeChip from "./TypeChip";

export default function PokemonResult({ pokemon, cargando, onNavegar }) {
  const sprite =
    pokemon.sprites.front_default ||
    pokemon.sprites.other?.["official-artwork"]?.front_default;

  return (
    <>
      <article className="pokemon">
        <h3>{pokemon.name.toUpperCase()}</h3>
        {sprite && <img src={sprite} alt={`Imagen de ${pokemon.name}`} />}
        <dl className="pokemon-data">
          <div>
            <dt>N.º</dt>
            <dd>#{pokemon.id}</dd>
          </div>
          <div>
            <dt>Tipo</dt>
            <dd>
              {pokemon.types.map(({ type }) => (
                <TypeChip key={type.name} tipo={type.name} />
              ))}
            </dd>
          </div>
          <div>
            <dt>Altura</dt>
            <dd>{pokemon.height / 10} m</dd>
          </div>
          <div>
            <dt>Peso</dt>
            <dd>{pokemon.weight / 10} kg</dd>
          </div>
        </dl>
      </article>

      <div className="pokemon-navigation" aria-label="Navegar por la Pokédex">
        <button
          type="button"
          aria-label="Ver el Pokémon anterior"
          disabled={pokemon.id <= 1 || cargando}
          onClick={() => onNavegar(pokemon.id - 1)}
        >
          ← Anterior
        </button>
        <button
          type="button"
          aria-label="Ver el Pokémon siguiente"
          disabled={cargando}
          onClick={() => onNavegar(pokemon.id + 1)}
        >
          Siguiente →
        </button>
      </div>
    </>
  );
}