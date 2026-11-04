const BASE_URL = "https://pokeapi.co/api/v2";

export class PokemonNoEncontradoError extends Error {
  constructor(message = "Pokémon no encontrado") {
    super(message);
    this.name = "PokemonNoEncontradoError";
  }
}

export async function obtenerPokemon(identificador, signal) {
  const respuesta = await fetch(
    `${BASE_URL}/pokemon/${encodeURIComponent(identificador)}`,
    { signal }
  );

  if (respuesta.status === 404) {
    throw new PokemonNoEncontradoError();
  }

  if (!respuesta.ok) {
    throw new Error("Error al consultar los datos del Pokémon");
  }

  return respuesta.json();
}

export async function obtenerTipos(types, signal) {
  return Promise.all(
    types.map(async type => {
      const respuesta = await fetch(`${BASE_URL}/type/${type}`, { signal });

      if (!respuesta.ok) {
        throw new Error("No se pudieron cargar las efectividades");
      }

      return respuesta.json();
    })
  );
}
