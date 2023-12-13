import {createContext} from 'react'

export const initialState = {
    comments:{
       
    },
    headIds:[]

  };
  
  export const ThemeContext = createContext(
    initialState
  );