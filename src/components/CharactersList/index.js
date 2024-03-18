import { useRef, useEffect } from 'react';
import './index.css';
import { useVirtualizer } from '@tanstack/react-virtual';
import { comicsServiceManager } from '../../services';
import { useInfiniteQuery } from 'react-query';
import Spinner from '../Spinner';
import CharacterListContainer from './CharacterListContainer';

async function fetchServerPage(limit, offset) {
    if (offset) {
        const res = await comicsServiceManager.getCharacters({ offset });
        return { rows: res.data.results, nextOffset: offset + 1 };
    } else {
        return { rows: [], nextOffset: 1 };
    }
}

const content = (status, error, CharacterListContainer) => {
    if (status === 'loading') {
        return <Spinner />;
    } else if (status === 'error') {
        return <span>Error: {error?.message}</span>;
    } else {
        return CharacterListContainer;
    }
};

export default function CharactersList() {
    const {
        status,
        data: charactersList,
        error,
        isFetching,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery('characters', (ctx) => fetchServerPage(20, ctx.pageParam), {
        getNextPageParam: (_lastGroup, groups) => groups.length,
        refetchOnWindowFocus: false,
    });

    const parentRef = useRef(null);
    const allRows = charactersList ? charactersList.pages.flatMap((d) => d.rows) : [];

    const columnVirtualizer = useVirtualizer({
        horizontal: true,
        count: hasNextPage ? allRows.length + 1 : allRows.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 100,
        overscan: 5,
        gap: 20,
    });

    useEffect(() => {
        const [lastItem] = [...columnVirtualizer.getVirtualItems()].reverse();
        if (!lastItem) {
            return;
        }
        if (lastItem.index >= allRows.length - 1 && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [hasNextPage, fetchNextPage, allRows.length, isFetchingNextPage, columnVirtualizer.getVirtualItems()]);

    return (
        <div>
            {content(
                status,
                error,
                <CharacterListContainer
                    parentRef={parentRef}
                    columnVirtualizer={columnVirtualizer}
                    allRows={allRows}
                    hasNextPage={hasNextPage}
                />
            )}
            <div>{isFetching && !isFetchingNextPage ? 'Background Updating...' : null}</div>
        </div>
    );
}
