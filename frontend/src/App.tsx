import React, { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './App.scss'

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
  }
});

const LandingPage = React.lazy(() => import('./routes/LandingPage'));
const DownloadPage = React.lazy(() => import('./routes/DownloadPage'));
const VisualizerPage = React.lazy(() => import('./routes/VisualizerPage'));

const App: React.FC = () => {

  return (
    <ThemeProvider theme={MuiTheme}>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<LandingPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </BrowserRouter>
        </div>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
