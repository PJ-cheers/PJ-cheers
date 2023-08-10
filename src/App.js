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
  background-color: #313131;
}
.slick-slide {
    margin-left: 10px;
    margin-right: 10px;
  }
`;
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 30, // 30분마다 호출
      cacheTime: 1000 * 60 * 60 // 1시간마다 호출
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
