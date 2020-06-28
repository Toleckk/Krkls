import React from "react";
import { useWeaponsContext } from "./WeaponsContext";

export const Weapons = () => {
  const { weapons } = useWeaponsContext();

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {weapons.map(w => (
        <span key={w.name} style={{ color: w.available ? "green" : "red" }}>
          {w.name}
        </span>
      ))}
    </div>
  );
};
