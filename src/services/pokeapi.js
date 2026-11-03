const BASE_URL = "https://pokeapi.co/api/v2";

export class PokemonNoEncontradoError extends Error {}

export async function obtenerPokemon(identificador) {
  const respuesta = await fetch(
    `${BASE_URL}/pokemon/${encodeURIComponent(identificador)}`
  );
  if (!respuesta.ok) {
    throw new PokemonNoEncontradoError("Pokémon no encontrado");
  }
  return respuesta.json();
}

export async function obtenerTipos(types) {
  return Promise.all(
    types.map(async type => {
      const respuesta = await fetch(`${BASE_URL}/type/${type}`);
      if (!respuesta.ok) {
        throw new Error("No se pudieron cargar las efectividades");
      }
      return respuesta.json();
    })
  );
}