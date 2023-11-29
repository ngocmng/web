import { createContext, useState } from "react";

export const NavbarContext = createContext();

export const NavbarProvider = ({ children }) => {
  const [open, setOpen] = useState(false);

  const changeOpen = () => setOpen(!open);

  const value = {
    open,
    changeOpen,
  };

  return <NavbarContext.Provider value={value}>{children}</NavbarContext.Provider>;
};
