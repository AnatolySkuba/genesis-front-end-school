import React from "react";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "react-query";

import AppRouter from "./router/AppRouter";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            keepPreviousData: true,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            refetchOnReconnect: true,
            cacheTime: Infinity,
        },
    },
});

function App() {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <AppRouter />
            </QueryClientProvider>
            <ToastContainer autoClose={2000} />
        </>
    );
}

export default App;
