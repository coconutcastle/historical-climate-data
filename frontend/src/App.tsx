import React, { Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from '@mui/material/styles';
import { MuiTheme } from './MuiTheme';
import ErrorBoundary from './components/ErrorBoundary';
import './App.scss';

import { Header } from './components/Header';

const Skeleton = () => {
  return (
    <div>
      Loading...
    </div>
  );
}

const queryClient = new QueryClient();

const LandingPage = React.lazy(() => import('./routes/LandingPage'));
const DownloadPage = React.lazy(() => import('./routes/download/DownloadPage'));
const VisualizerPage = React.lazy(() => import('./routes/VisualizerPage'));
const DocumentationPage = React.lazy(() => import('./routes/documentation/DocumentationPage'));
const AboutDocsSubPage = React.lazy(() => import('./routes/documentation/sections/AboutDocs'));
const ParamsDocsSubPage = React.lazy(() => import('./routes/documentation/sections/DownloadParamsDocs'));
const FormatDocsSubPage = React.lazy(() => import('./routes/documentation/sections/DownloadFormatDocs'));
const ApiDocsSubPage = React.lazy(() => import('./routes/documentation/sections/ApiDocs'));
const ApiPage = React.lazy(() => import('./routes/api/ApiPage'));

const App: React.FC = () => {

  return (
    <ThemeProvider theme={MuiTheme}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Header />
          <div className='main-content'>
            <Suspense fallback={<Skeleton />}>
              <Routes>
                <Route path='/' element={<LandingPage />} errorElement={<ErrorBoundary />}/>
                <Route path='download' element={<DownloadPage />} />
                <Route path='visualize' element={<VisualizerPage />} />
                <Route path='documentation' element={<DocumentationPage />}>
                  <Route index element={<AboutDocsSubPage />}/>
                  <Route path='about' element={<AboutDocsSubPage />}/>
                  <Route path='params' element={<ParamsDocsSubPage />}/>
                  <Route path='format' element={<FormatDocsSubPage />}/>
                  <Route path='api' element={<ApiDocsSubPage />}/>
                </Route>
                <Route path='api' element={<ApiPage />} errorElement={<ErrorBoundary />}/>
                <Route path="*" element={<Navigate to="/" />} errorElement={<ErrorBoundary />}/>
              </Routes>
            </Suspense>
          </div>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider >
  )
}

export default App
