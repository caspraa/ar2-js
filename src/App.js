import { useMode } from "./themes";
import { colorModeContext } from "./themes";
import { CssBaseline,ThemeProvider } from "@mui/material";
import Topbar from './components/global/Topbar'
import Form from "./scenes/form";
import { useMemo, useState,useEffect, useRef } from "react";
function App() {
  const [theme,colorMode] = useMode()
 
  return (
    <colorModeContext.Provider value={colorMode} >
      <ThemeProvider theme={theme}>
      <CssBaseline />
       <div className="app">
          <Topbar/>
          <Form/>
      </div>
      </ThemeProvider>
    </colorModeContext.Provider>
    
  );
}

export default App;