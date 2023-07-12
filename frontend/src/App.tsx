import React, { Suspense, createContext, useState, Dispatch, SetStateAction } from 'react'
import { Navigate, createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from '@mui/material/styles';
import { MuiTheme } from './MuiTheme';
import ErrorBoundary from './components/ErrorBoundary';
import './App.scss';

import { Header } from './components/Header';
import { DataFormat } from './common/visualize.interface';

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
const VisualizerPage = React.lazy(() => import('./routes/visualizer/VisualizerPage'));
const DocumentationPage = React.lazy(() => import('./routes/documentation/DocumentationPage'));
const AboutDocsSubPage = React.lazy(() => import('./routes/documentation/sections/AboutDocs'));
const ParamsDocsSubPage = React.lazy(() => import('./routes/documentation/sections/DownloadParamsDocs'));
const FormatDocsSubPage = React.lazy(() => import('./routes/documentation/sections/DownloadFormatDocs'));
const ApiDocsSubPage = React.lazy(() => import('./routes/documentation/sections/ApiDocs'));
const ApiPage = React.lazy(() => import('./routes/api/ApiPage'));

const SiteLayout = () => (
  <>
    <Header />
    <div className='main-content'>
      <Suspense fallback={<Skeleton />}>
        <Outlet />
      </Suspense>
    </div>
  </>
);

const router = createBrowserRouter([
  {
    element: <SiteLayout />,
    children: [
      {
        path: '/',
        element: <LandingPage />,
        errorElement: <ErrorBoundary />
      }, {
        path: 'download',
        element: <DownloadPage />,
        errorElement: <ErrorBoundary />
      }, {
        path: 'visualize',
        element: <VisualizerPage />
      }, {
        path: 'documentation',
        element: <DocumentationPage />,
        children: [
          {
            path: 'about',
            element: <AboutDocsSubPage />,
            index: true
          }, {
            path: 'params',
            element: <ParamsDocsSubPage />
          }, {
            path: 'format',
            element: <FormatDocsSubPage />
          }, {
            path: 'api',
            element: <ApiDocsSubPage />
          }
        ]
      }, {
        path: 'api',
        element: <ApiPage />,
        errorElement: <ErrorBoundary />
      }, {
        path: '*',
        element: <Navigate to="/" />
      }
    ]
  }
]);

interface IDataContext {
  data: any,
  setData: Dispatch<SetStateAction<any>>;
  dataFormat: DataFormat,
  setDataFormat: Dispatch<SetStateAction<DataFormat>>;
}

export const DataContext = createContext<IDataContext>({ 
  data: undefined, 
  setData: () => {},
  dataFormat: 'none',
  setDataFormat: () => {} 
});

const App: React.FC = () => {

  const [data, setData] = useState<any>(undefined);
  const [dataFormat, setDataFormat] = useState<DataFormat>('none');

  return (
    <ThemeProvider theme={MuiTheme}>
      <QueryClientProvider client={queryClient}>
        <DataContext.Provider value={{ data, setData, dataFormat, setDataFormat }}>
          <RouterProvider router={router} />
        </DataContext.Provider>
      </QueryClientProvider>
    </ThemeProvider >
  )
}

export default App
