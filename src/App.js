import React from 'react';
import Homepage from './components/Homepage';
import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Homepage />
        </QueryClientProvider>
    );
}

export default App;
