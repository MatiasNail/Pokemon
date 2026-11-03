import { useState } from "react";
import {
  obtenerPokemon,
  obtenerTipos,
  PokemonNoEncontradoError
} from "../services/pokeapi";
import { calcularEfectividades } from "../utils/effectiveness";

export function usePokemon() {
  const [pokemon, setPokemon] = useState(null);
  const [grupos, setGrupos] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  async function cargarPokemon(identificador) {
    setCargando(true);
    setError(null);

    try {
      const data = await obtenerPokemon(identificador);
      const types = data.types.map(({ type }) => type.name);
      const respuestas = await obtenerTipos(types);

      // Se guardan juntos para que nunca queden datos de dos Pokémon mezclados
      setPokemon(data);
      setGrupos(calcularEfectividades(respuestas));
    } catch (e) {
      setPokemon(null);
      setGrupos(null);
      setError(
        e instanceof PokemonNoEncontradoError
          ? "No se encontró el Pokémon. Intenta nuevamente."
          : "No se pudieron cargar los datos. Intenta nuevamente."
      );
    } finally {
      setCargando(false);
    }
  }

  return { pokemon, grupos, cargando, error, cargarPokemon };
}