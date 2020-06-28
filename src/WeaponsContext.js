import React, { createContext, useContext, useMemo } from "react";
import { useSkillsContext } from "./SkillsContext";
import defaultWeapons from "./weapons.json";

export const WeaponsContext = createContext(null);

export const useWeaponsContext = () => useContext(WeaponsContext);

export const WeaponsContextProvider = ({ children }) => {
  const { skills } = useSkillsContext();

  const weapons = useMemo(
    () =>
      defaultWeapons
        .map(w => {
          const names = Object.keys(w.skills);
          const requiredSkills = skills
            .flat()
            .filter(s => names.indexOf(s.name) !== -1);

          return {
            ...w,
            available: requiredSkills.every(s => s.count >= w.skills[s.name])
          };
        })
        .sort((a, b) => {
          if (a.available === b.available) return 0;
          if (a.available) return -1;
          return 1;
        }),
    [skills]
  );

  const value = useMemo(() => ({ weapons }), [weapons]);

  return (
    <WeaponsContext.Provider value={value}>{children}</WeaponsContext.Provider>
  );
};
