import { createTheme } from "@mui/material";

import { createContext,useState,useMemo } from "react";

export const tokens = (mode)=>({
    ...(mode==='dark'?
    {
        grey:{
             50: '#B0B0B0',
             100:'#A0A0A0',
             200:'#909090',
             300:'#808080',
             400:'#707070',
             500:'#606060',
             600:'#505050',
             700:'#404040',
             800:'#303030',
             900:'#202020',
        },
        purple:{
            50:  '#E0B4FF', 
            100: '#D08AFF',
            200: '#C170FF',
            300: '#B056FF',
            400: '#A03CFF',
            500: '#9022FF',
            600: '#8018DB',
            700: '#7014A8',
            800: '#601075',
            900: '#500741', 
        },
        yellowSea:{
             50: '#FFFACD',
             100:'#FFF493',
             200:'#FFEA5A',
             300:'#FFE120',
             400:'#FFD900',
             500:'#E2BB00',
             600:'#B58E00',
             700:'#887100',
             800:'#5A5400',
             900:'#2D2700', 
        },
        redAccent: {
            100: "#f8dcdb",
            200: "#f1b9b7",
            300: "#e99592",
            400: "#e2726e",
            500: "#db4f4a",
            600: "#af3f3b",
            700: "#832f2c",
            800: "#58201e",
            900: "#2c100f"
        },
        blueAccent: {
            100: "#e1e2fe",
            200: "#c3c6fd",
            300: "#a4a9fc",
            400: "#868dfb",
            500: "#6870fa",
            600: "#535ac8",
            700: "#3e4396",
            800: "#2a2d64",
            900: "#151632"
        },
        white:{
             50: '#FAFAFA',
             100:'#F5F5F5',
             200:'#F0F0F0',
             300:'#E5E5E5',
             400:'#DCDCDC',
             500:'#D3D3D3',
             600:'#BEBEBE',
             700:'#A9A9A9',
             800:'#949494',
             900:'#808080', 

        },
        blue:{
            50:'#E3F2FD', 
            100:'#BBDEFB',
            200:'#90CAF9',
            300:'#64B5F6',
            400:'#42A5F5',
            500:'#2196F3',
            600:'#1E88E5',
            700:'#1976D2',
            800:'#1565C0',
            900:'#0D47A1', 
                      
        }

    }:{
        grey:{
            
            50:'#202020',
            100:'#303030',
            200:'#404040',
            300:'#505050',
            400:'#606060',
            500:'#707070',
            600:'#808080',
            700:'#909090',
            800:'#A0A0A0',
            900: '#B0B0B0',
       },
       purple:{
            50: '#500741',
            100: '#601075',
            200: '#7014A8',
            300: '#8018DB',
            400: '#9022FF',
            500: '#A03CFF',
            600: '#B056FF',
            700: '#C170FF',
            800: '#D08AFF',
            900:  '#E0B4FF', 
       },
       yellowSea:{
            50:'#2D2700', 
            100:'#5A5400',
            200:'#887100',
            300:'#B58E00',
            400:'#E2BB00',
            500:'#FFD900',
            600:'#FFE120',
            700:'#FFEA5A',
            800:'#FFF493',
            900: '#FFFACD',
             
       },
       redAccent: {
           100: "#2c100f",
           200: "#58201e",
           300: "#832f2c",
           400: "#af3f3b",
           500: "#db4f4a",
           600: "#e2726e",
           700: "#e99592",
           800: "#f1b9b7",
           900: "#f8dcdb",
       },
       blueAccent: {
           100: "#151632",
           200: "#2a2d64",
           300: "#3e4396",
           400: "#535ac8",
           500: "#6870fa",
           600: "#868dfb",
           700: "#a4a9fc",
           800: "#c3c6fd",
           900: "#e1e2fe",
       },
       white:{
         50:'#808080', 
        100:'#949494',
        200:'#A9A9A9',
        300:'#BEBEBE',
        400:'#D3D3D3',
        500:'#DCDCDC',
        600:'#E5E5E5',
        700:'#F0F0F0',
        800:'#F5F5F5',
        900: '#FAFAFA',

        },
        blue:{
            50:'#0D47A1', 
        100:'#1565C0',
        200:'#E5F0FF',
        300:'#006AFF',
        400:'#2196F3',
        500:'#42A5F5',
        600:'#64B5F6',
        700:'#90CAF9',
        800:'#BBDEFB',
            900:'#E3F2FD', 
}
    })
});
// theme settings

export const themeSettings = (mode)=>{
    const colors = tokens(mode);

    return {
        palette:{
            mode:mode,
            ...(mode==='dark'?
            {
                primary:{
                    main:colors.white[100]
                },
                secondary:{
                    main:colors.yellowSea[500]
                },
                neutral:{
                    dark:colors.grey[700],
                    main:colors.grey[300],
                    light:colors.white[100]
                },
                background:{
                    default:colors.grey[900]
                }

            }:{
                primary:{
                    main:colors.blue[300]
                },
                secondary:{
                    main:colors.white[400]
                },
                neutral:{
                    dark:colors.grey[100],
                    main:colors.blue[400],
                    white:colors.white[900]
                },
                background:{
                    default:colors.white[400]
                }

            })
        },
        typography:{
            fontFamily:["Source Sans Pro","sans-serif"].join(","),
            fontSize:12,
            h1:{
                fontFamily:["Source Sans Pro","sans-serif"].join(","),
                fontSize:40
            },
            h2:{
                fontFamily:["Source Sans Pro","sans-serif"].join(","),
                fontSize:32
            },
            h3:{
                fontFamily:["Source Sans Pro","sans-serif"].join(","),
                fontSize:24
            },
            h4:{
                fontFamily:["Source Sans Pro","sans-serif"].join(","),
                fontSize:20
            },
            h5:{
                fontFamily:["Source Sans Pro","sans-serif"].join(","),
                fontSize:16
            },
            h6:{
                fontFamily:["Source Sans Pro","sans-serif"].join(","),
                fontSize:14
            },
        }
    }
}



export const colorModeContext = createContext({
    toggleColorMode:()=>{

    }
})

export const useMode = ()=>{
    const [mode,setMode] = useState('light')
    const colorMode = useMemo(
        ()=>({
            toggleColorMode:()=>
            setMode((prev)=>(prev==='light'?'dark':'light'))
        }),[]
    )
   
    const theme = useMemo(()=> createTheme(themeSettings(mode)),[mode]);
    return [theme,colorMode]
}