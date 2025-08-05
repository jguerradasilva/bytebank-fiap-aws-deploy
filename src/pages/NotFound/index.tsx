import { Box, Button, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import './style.css';
import img from '@assets/palha-white.png'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
export default function PageNotFound() {

  useEffect(() => {
    const element = document.querySelector('.bounce') as HTMLElement;
    if (element) {
      element.style.backgroundImage = `url(${img})`
    }
  }, [])


  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '50vh',
        textAlign: 'center',
      }}
    >
      <Typography
        component={motion.h1}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 100 }}
        sx={{
          fontSize: '4rem',
          fontWeight: 'bold',
          mb: 2,
          color: '#fff',
          fontFamily: 'Varela Round, sans-serif',
        }}
      >
        404
      </Typography>

      <Box
        sx={{
          m: '1em auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            display: 'block',
            textAlign: 'center',
            height: '100px',
            width: '100px',
            borderBottom: 'solid 2px #333',
            overflow: 'hidden',
          }}
        >
          <Box
            className="bounce"
            sx={{
              display: 'inline-block',
              position: 'absolute',
              bottom: 0,
              left: '50%',
              width: '40px',
              height: '40px',
              marginLeft: '-20px',
              backgroundSize: 'contain',
              animation:
                'bounceAnim 1s cubic-bezier(0.63, 0.09, 0.75, 0.46) infinite alternate, spinAnim 3s linear infinite',
            }}
          ></Box>

          <Box
            sx={{
              position: 'absolute',
              top: '95%',
              backgroundColor: '#333',
              width: '10px',
              height: '10px',
              borderRadius: '20px 20px 0px 0px',
              animation: 'pebblesAnim 1s linear infinite',
            }}
          ></Box>
          <Box
            sx={{
              position: 'absolute',
              top: '97%',
              backgroundColor: '#333',
              width: '5px',
              height: '5px',
              borderRadius: '10px 10px 0px 0px',
              animation: 'pebblesAnim 2s linear infinite',
            }}
          ></Box>
          <Box
            sx={{
              position: 'absolute',
              top: '98%',
              backgroundColor: '#333',
              width: '3px',
              height: '3px',
              borderRadius: '20px 20px 0px 0px',
              animation: 'pebblesAnim 3s linear infinite',
            }}
          ></Box>
        </Box>

        <Box>
          <Typography
            variant="h3"
            fontSize="24px"
            fontWeight="400"
            lineHeight="35px"
            textAlign="center"
            sx={{
              color: '#fff',
              mt: 2,
              fontFamily: 'Varela Round, sans-serif',
            }}
          >
            Página não encontrada
          </Typography>
          <Typography
            sx={{
              color: (theme) =>
                theme.palette.mode === 'dark' ? '#A0A0A0' : '#666',
              fontFamily: 'Varela Round, sans-serif',
            }}
            textAlign="center"
            fontSize="0.950rem"
          >
            A página que você está tentando acessar não existe ou foi movida.
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>

            <Link to='/dashboard'>
              <Button
                color="primary"
                variant="contained"
                sx={{ fontFamily: 'Varela Round, sans-serif' }}
              >
                Ir para página principal
              </Button>
            </Link>

          </Box>
        </Box>
      </Box>
    </Box>
  );
}
