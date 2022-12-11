import React, { Suspense, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './App.scss'

import { Header } from './components/Header';

const Skeleton = () => {
  return (
    <div>
      Loading...
    </div>
  );
}

const queryClient = new QueryClient();

const MuiTheme = createTheme({
  palette: {
    primary: {
      main: '#59A1D6'
    },
    secondary: {
      main: '#59A1D6'
    }
  },
  typography: {
    "fontFamily": "Montserrat"
  },
  components: {
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          "&.Mui-focused .MuiInputLabel-outlined": {
            color: "#59A1D6"
          },
          "&.MuiAutocomplete-root": {
            backgroundColor: '#E8E8E8'
          }
        },
        inputRoot: {
          "& .MuiOutlinedInput-notchedOutline": {
            border: 'none',
            borderRadius: '0px'
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            border: 'none',
            borderRadius: '0px'
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: 'none',
            borderRadius: '0px'
          }
        }
      }
    }
  }
});

const LandingPage = React.lazy(() => import('./routes/LandingPage'));
const DownloadPage = React.lazy(() => import('./routes/download/DownloadPage'));
const VisualizerPage = React.lazy(() => import('./routes/VisualizerPage'));
const DocumentationPage = React.lazy(() => import('./routes/DocumentationPage'));

const App: React.FC = () => {

  return (
    <ThemeProvider theme={MuiTheme}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Header />
          <div className='main-content'>
            <Suspense fallback={<Skeleton />}>
              <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route path='/download' element={<DownloadPage />} />
                <Route path='/visualize' element={<VisualizerPage />} />
                <Route path='/documentation' element={<DocumentationPage />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </Suspense>
          </div>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider >
  )
}

export default App
