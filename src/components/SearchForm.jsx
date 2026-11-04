import { useState } from "react";

export default function SearchForm({ nombreActual, onBuscar }) {
  const [busqueda, setBusqueda] = useState({
    nombreActual,
    valor: nombreActual || "",
  });
  const valorBusqueda =
    nombreActual && busqueda.nombreActual !== nombreActual
      ? nombreActual
      : busqueda.valor;

  function handleSubmit(event) {
    event.preventDefault();
    onBuscar(valorBusqueda.trim().toLowerCase());
  }

  return (
    <form
      className="search-form"
      aria-label="Buscar Pokémon por nombre o número"
      onSubmit={handleSubmit}
    >
      <label className="visually-hidden" htmlFor="nombrePokemon">
        Nombre o número del Pokémon
      </label>
      <input
        type="text"
        id="nombrePokemon"
        name="pokemon"
        placeholder="Ej.: pikachu o 25"
        autoComplete="off"
        required
        value={valorBusqueda}
        onChange={event =>
          setBusqueda({ nombreActual, valor: event.target.value })
        }
      />
      <button type="submit">
        Buscar Pokémon
      </button>
    </form>
  );
}