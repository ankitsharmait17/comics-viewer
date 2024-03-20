import { screen } from '@testing-library/react';
import { waitFor } from '@testing-library/dom';
import Homepage from '../components/Homepage';
import React from 'react';
import '@testing-library/jest-dom/extend-expect'; // For toBeInTheDocument
import { server } from './setupTest';
import { renderWithClient } from './utils';

describe('Homepage', () => {
    test('renders homepage', async () => {
        const result = renderWithClient(<Homepage />);

        expect(screen.queryAllByTestId('spinner')).toHaveLength(2);

        // // Wait for the API request to be complete
        await waitFor(() => expect(screen.queryAllByTestId('spinner')).toHaveLength(0));
        const textElement = screen.getByText('Comic1');
        expect(textElement).toBeInTheDocument();
    });

    test('renders navigation bar and character list', () => {
        render(component);
        expect(screen.getByRole('textbox', { name: /search/i })).toBeInTheDocument();
        expect(screen.getByRole('list', { name: /characters/i })).toBeInTheDocument();
    });

    test('search functionality works', async () => {
        render(component);
        const searchInput = screen.getByRole('textbox', { name: /search/i });
        fireEvent.change(searchInput, { target: { value: 'Spider-Man' } });
        await waitFor(() => {
            expect(searchInput).toHaveValue('Spider-Man');
        });
    });

    test('renders comics grid after data loading', async () => {
        render(component);
        await waitFor(() => {
            expect(screen.getByTestId('spinner')).toBeInTheDocument(); // Assuming Spinner component has a test id
        });
        // Mock successful data fetching
        fireEvent.load(window);
        await waitFor(() => {
            expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
            expect(screen.getByText('Comic1')).toBeInTheDocument();
            expect(screen.getByText('Comic1')).toBeInTheDocument();
        });
    });

    test('renders error message if data fetching fails', async () => {
        server.use(
            rest.get(`https://gateway.marvel.com/v1/public/comics`, async (req, res, ctx) => {
                return res(ctx.status(500, 'Internal Server Error'));
            })
        );
        render(component);
        await waitFor(() => {
            expect(screen.getByTestId('spinner')).toBeInTheDocument(); // Assuming Spinner component has a test id
        });
        // Mock failed data fetching
        fireEvent.load(window);
        await waitFor(() => {
            expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
            expect(screen.getByText('An error occurred!')).toBeInTheDocument();
        });
    });
});
