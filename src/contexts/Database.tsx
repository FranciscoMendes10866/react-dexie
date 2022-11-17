import { createContext, FC, ReactNode, useContext, useMemo } from "react";
import Dexie, { Table } from "dexie";

export interface DogTableStruct {
  id?: number;
  name: string;
  isGoodBoy: boolean;
}

class DexieLocalDatabase extends Dexie {
  dogs!: Table<DogTableStruct>;
  constructor() {
    super("local-database");
    this.version(1).stores({
      dogs: "++id, name, isGoodBoy",
    });
  }
}

type ILocalDatabaseContext = DexieLocalDatabase | null;
const LocalDatabaseContext = createContext<ILocalDatabaseContext>(null);

export const useDB = () => useContext(LocalDatabaseContext);

interface IProviderProps {
  children: ReactNode;
}

export const LocalDatabaseProvider: FC<IProviderProps> = ({ children }) => {
  const databaseInstance = useMemo(() => new DexieLocalDatabase(), []);

  return (
    <LocalDatabaseContext.Provider value={databaseInstance}>
      {children}
    </LocalDatabaseContext.Provider>
  );
};
