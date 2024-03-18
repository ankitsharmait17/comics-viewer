import React, { useState, Fragment, useEffect } from 'react';
import NavBar from '../Navbar';
import ComicGrid from '../ComicGrid';
import { comicsServiceManager } from '../../services';
import { useQuery, keepPreviousData } from 'react-query';
import Spinner from '../Spinner';
import CharactersList from '../CharactersList';

function useDebounce(inputValue, delay) {
    const [debouncedValue, setDebouncedValue] = useState(inputValue);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(inputValue);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [inputValue, delay]);

    return debouncedValue;
}

const HomePage = () => {
    const [searchText, setSearchText] = useState('');
    const [offset, setOffset] = useState(1);
    const [characters, setCharacters] = useState('');
    const debouncedSearchTerm = useDebounce(searchText, 500);
    const [titleQuery, setTitleQuery] = useState('');

    // const { data: comics, isLoading } = useQuery({
    //     queryKey: ['comics', offset, characters, titleQuery],
    //     queryFn: () => comicsServiceManager.getComics({ offset, characters, titleStartsWith: titleQuery }),
    //     placeholderData: keepPreviousData,
    //     refetchOnWindowFocus: false,
    //     refetchOnReconnect: false,
    // });

    // useEffect(() => {
    //     setTitleQuery(debouncedSearchTerm);
    // }, [debouncedSearchTerm]);

    // return (
    //     <Fragment>
    //         <NavBar searchText={searchText} onChange={setSearchText} />
    //         {!isLoading && comics ? <ComicGrid comics={comics} fetchComics={setOffset} offset={offset} /> : <Spinner />}
    //     </Fragment>
    // );

    return <CharactersList />;
};

export default HomePage;
