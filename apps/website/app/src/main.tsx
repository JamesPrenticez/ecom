import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AppLayoutWebsite } from './layout/app';
import './styles/styles.css';
import '@shared/assets/styles/styles.css';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60_000 } },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AppLayoutWebsite />
    </QueryClientProvider>
  </BrowserRouter>
);
