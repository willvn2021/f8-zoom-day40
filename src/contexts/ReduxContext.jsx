import { createContext } from "react";

const Context = createContext();

const Provider = ({ store, children }) => {
    return <Context.Provider value={store}>{children}</Context.Provider>;
};

export { Context, Provider };
