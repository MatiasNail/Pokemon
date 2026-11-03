import TypeChip from "./TypeChip";

export default function MatchupGroup({ title, types, textoVacio }) {
  return (
    <section className="matchup">
      <h3>{title}</h3>
      <ul className="type-list">
        {types.length > 0 ? (
          types.map(type => (
            <li key={type}>
              <TypeChip tipo={type} />
            </li>
          ))
        ) : (
          <li className="empty-types">{textoVacio}</li>
        )}
      </ul>
    </section>
  );
}