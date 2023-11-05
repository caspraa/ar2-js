import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import ViewInArOutlinedIcon from '@mui/icons-material/ViewInArOutlined';
import { Box,IconButton, Typography,Button } from '@mui/material';
import { useContext } from 'react';
import { colorModeContext,tokens } from '../../themes';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useTheme,useMediaQuery } from '@mui/material';


const Topbar = ()=>{
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)
    const colorMode = useContext(colorModeContext);
    const isMatch = useMediaQuery(theme.breakpoints.down('md'))
    // console.log(isMatch);

    return !isMatch?(
        <Box display={'flex'}   padding={'15px 25px'} justifyContent={'space-between'} sx={{
            backgroundColor:`${colors.white[900]}`,
            borderRadius:'0px'
        }} >
            <Box display={'flex'} gap={'1px'} alignItems={'center'}>
                <Typography
                variant='h3'
                fontWeight={'bold'}
                color={theme.palette.mode==='light'?colors.blue[300]:colors.blueAccent[800]}
                
                >
                    AR
                </Typography>
                <Typography
                variant='h3'
                fontWeight={'light'}
                color={theme.palette.mode==='light'?colors.blue[300]:colors.blueAccent[800]}
                
                >
                    Tag
                </Typography>
                <Box sx={{
                     '& .MuiButtonBase-root:hover':{
                        backgroundColor:`${colors.blue[200]}`,
                        "& .MuiSvgIcon-root":{
                            color: `${colors.blue[300]}`,
                            backgroundColor:`${colors.blue[200]}`
                        },
                     },
                
                   
                }}>
                </Box>
            </Box>
            
                <Box display={'flex'} gap={'5px'} sx={{
                      "& .MuiSvgIcon-root:hover":{
                        color: `${colors.blue[300]}`
                    },
                   
                }}> 
                </Box>
        </Box>
    ):(
        <>
    <Box display={'flex'}   padding={'10px 25px'} justifyContent={'space-between'} sx={{
            backgroundColor:`${colors.white[900]}`,
            borderRadius:'10px'
    }} >
            <Box display={'flex'} gap={'15px'} alignItems={'center'} sx={{
                
            }}>
                <Typography
                variant='h3'
                fontWeight={'bold'}
                color={theme.palette.mode==='light'?colors.blue[300]:colors.blueAccent[800]}
                >
                    ARTag
                </Typography>
                
            </Box>
        </Box>
        </>
    )
}


export default Topbar;