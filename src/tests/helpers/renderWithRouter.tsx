import { ReactNode } from "react";
import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

export const renderWithRouter = (component: JSX.Element) => {
    type Props = {
        children: ReactNode;
    };

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });

    const wrapper = ({ children }: Props) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    return render(<MemoryRouter>{component}</MemoryRouter>, { wrapper });
};
