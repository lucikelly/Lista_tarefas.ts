import {  createContext, ReactNode, useContext, useState } from "react";

interface ThemeContetxType {
  theme: 'light' | 'dark',
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContetxType | undefined> (undefined)

export const ThemeProvier =( {children} : {children: ReactNode}) => {
 
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  const toggleTheme = () => {
    setTheme((previousTheme) => (previousTheme === 'light' ? 'dark' : 'light' ))
  }

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  )


}

export const useTheme = () => {
  const context = useContext(ThemeContext)

  if(!context){
    throw new Error("useTheme deve ser usado com um themeProvaider")
  }

  return context
}