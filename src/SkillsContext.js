import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useMemo
} from "react";

const defaultSkills = [
  [{ name: "Точность" }, { name: "Уклонение" }, { name: "Наведение" }],
  [
    { name: "Механика" },
    { name: "Биохимия" },
    { name: "Кибернетика" },
    { name: "Электроника" }
  ],
  [
    { name: "Пилотирование" },
    { name: "Добыча" },
    { name: "Торговля" },
    { name: "Ремонт" }
  ],
  [{ name: "Кинетическое" }, { name: "Энергетическое" }, { name: "Ракетное" }],
  [{ name: "Тактика" }, { name: "Контроль" }]
];

export const SkillsContext = createContext(null);

export const SkillsContextProvider = ({ children }) => {
  const [skills, setSkills] = useState(defaultSkills);
  const setSkill = useCallback(
    (i, j, count) =>
      setSkills([
        ...skills.slice(0, i),
        [
          ...skills[i].slice(0, j),
          { ...skills[i][j], count: count > 12 ? 12 : count < 0 ? 0 : count },
          ...skills[i].slice(j + 1)
        ],
        ...skills.slice(i + 1)
      ]),
    [skills, setSkills]
  );

  const incrementSkill = useCallback(
    (i, j) => setSkill(i, j, (skills[i][j].count || 0) + 1),
    [setSkill, skills]
  );

  const decrementSkill = useCallback(
    (i, j) => setSkill(i, j, (skills[i][j].count || 0) - 1),
    [setSkill, skills]
  );

  const sum = useMemo(
    () =>
      skills.reduce(
        (acc, c) => acc + c.reduce((acc, s) => acc + (s.count || 0), 0),
        0
      ),
    [skills]
  );

  const reset = useCallback(() => setSkills(defaultSkills), [setSkills]);

  const value = {
    skills,
    setSkills,
    setSkill,
    incrementSkill,
    decrementSkill,
    sum,
    reset
  };

  return (
    <SkillsContext.Provider value={value}>{children}</SkillsContext.Provider>
  );
};

export const useSkillsContext = () => useContext(SkillsContext);
