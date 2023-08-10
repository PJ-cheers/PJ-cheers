import './App.css';
import Router from './shared/Router';
import { QueryClient, QueryClientProvider } from 'react-query';

// reset CSS
import * as React from 'react';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

// 전역으로 reset CSS

const GlobalStyle = createGlobalStyle`
  ${reset}
body{
  font-family: 'Noto Sans KR', sans-serif;
}
`;
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 30, // 30분
      cacheTime: 1000 * 60 * 60 // 1시간
    }
  }
});

function App() {
  return (
    <QueryClientProvider
      client={queryClient}
      defaultQueryObserverOptions={{
        notifyOnChangeProps: 'tracked'
      }}
    >
      <GlobalStyle />
      <Router />
    </QueryClientProvider>
  );
}

export default App;
