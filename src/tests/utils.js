import { render } from '@testing-library/react';
import { rest } from 'msw';
import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import pageData from './mocks/comics';
import characterData from './mocks/characters';

export const handlers = [
    rest.get(`https://gateway.marvel.com:443/v1/public/comics`, (req, res, ctx) => {
        const offset = req.url.searchParams.offset;
        if (offset === 1) return res(ctx.json(pageData()));
        else return pageData(offset);
    }),

    rest.get(`https://gateway.marvel.com:443/v1/public/characters`, (req, res, ctx) => {
        const offset = req.url.searchParams.offset;
        if (offset === 1) return res(ctx.json(characterData()));
        else return characterData(2);
    }),
    rest.get(`https://gateway.marvel.com/v1/public/comics`, (req, res, ctx) => {
        const offset = req.url.searchParams.offset;
        if (offset === 1) return res(ctx.json(pageData()));
        else return pageData(offset);
    }),

    rest.get(`https://gateway.marvel.com/v1/public/characters`, (req, res, ctx) => {
        const offset = req.url.searchParams.offset;
        if (offset === 1) return res(ctx.json(characterData()));
        else return characterData(2);
    }),
];

const createTestQueryClient = () =>
    new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
        logger: {
            log: console.log,
            warn: console.warn,
            error: () => {},
        },
    });

export function renderWithClient(ui: React.ReactElement) {
    const testQueryClient = createTestQueryClient();
    const { rerender, ...result } = render(<QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>);
    return {
        ...result,
        rerender: (rerenderUi: React.ReactElement) =>
            rerender(<QueryClientProvider client={testQueryClient}>{rerenderUi}</QueryClientProvider>),
    };
}

export function createWrapper() {
    const testQueryClient = createTestQueryClient();
    return ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={testQueryClient}>{children}</QueryClientProvider>
    );
}
