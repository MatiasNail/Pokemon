import { matchupCategories, typeNames } from "../data/types";

export function traducirTipo(tipo) {
  return typeNames[tipo] ?? tipo;
}

export function calcularEfectividades(typeResponses) {
  const multipliers = new Map();

  for (const { damage_relations: relations } of typeResponses) {
    for (const type of relations.double_damage_from) {
      multipliers.set(type.name, (multipliers.get(type.name) ?? 1) * 2);
    }
    for (const type of relations.half_damage_from) {
      multipliers.set(type.name, (multipliers.get(type.name) ?? 1) * 0.5);
    }
    for (const type of relations.no_damage_from) {
      multipliers.set(type.name, 0);
    }
  }

  return matchupCategories.map(category => ({
    ...category,
    types: [...multipliers.entries()]
      .filter(([, multiplier]) => multiplier === category.multiplier)
      .map(([type]) => type)
      .sort((a, b) => traducirTipo(a).localeCompare(traducirTipo(b), "es"))
  }));
}