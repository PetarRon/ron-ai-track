import { createContext, useContext } from "react";

export const ContactContext = createContext<{ openContact: () => void }>({
  openContact: () => {},
});

export const useContact = () => useContext(ContactContext);
