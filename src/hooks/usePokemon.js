import { useEffect, useRef, useState } from "react";
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

  // La solicitud cambia solamente cuando el usuario inicia una búsqueda.
  const [solicitud, setSolicitud] = useState(null);
  const numeroSolicitud = useRef(0);

  // El botón llama esta función; useEffect realiza la petición.
  function cargarPokemon(identificador) {
    numeroSolicitud.current += 1;

    setSolicitud({
      identificador: String(identificador).trim().toLowerCase(),
      numero: numeroSolicitud.current
    });
  }

  useEffect(() => {
    if (!solicitud?.identificador) return;

    const controller = new AbortController();

    async function ejecutarBusqueda() {
      setCargando(true);
      setError(null);
      setPokemon(null);
      setGrupos(null);

      try {
        const data = await obtenerPokemon(
          solicitud.identificador,
          controller.signal
        );

        const types = data.types.map(({ type }) => type.name);
        const respuestas = await obtenerTipos(types, controller.signal);

        // No actualizar la interfaz si esta solicitud ya fue cancelada.
        if (controller.signal.aborted) return;

        setPokemon(data);
        setGrupos(calcularEfectividades(respuestas));
      } catch (e) {
        // AbortError es esperado cuando comienza una búsqueda más reciente.
        if (controller.signal.aborted) return;

        setPokemon(null);
        setGrupos(null);
        setError(
          e instanceof PokemonNoEncontradoError
            ? "No se encontró el Pokémon. Intenta nuevamente."
            : "No se pudieron cargar los datos. Revisa tu conexión e intenta nuevamente."
        );
      } finally {
        // Una petición cancelada no debe apagar el indicador de la nueva.
        if (!controller.signal.aborted) {
          setCargando(false);
        }
      }
    }

    ejecutarBusqueda();

    // Se ejecuta al iniciar otra búsqueda o desmontar el componente.
    return () => {
      controller.abort();
    };
  }, [solicitud]);

  return { pokemon, grupos, cargando, error, cargarPokemon };
}
