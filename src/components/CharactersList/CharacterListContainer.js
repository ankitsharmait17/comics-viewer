import PropTypes from 'prop-types';
import CharacterListItem from './CharacterListItem';

export default function CharacterListContainer({
    parentRef,
    columnVirtualizer,
    hasNextPage,
    allRows,
    setSelectedCharacter,
    selectedCharacters,
}) {
    return (
        <div
            ref={parentRef}
            className='List'
            style={{
                width: `100vw`,
                height: `100px`,
                overflow: 'auto',
            }}
        >
            <div
                style={{
                    width: `${columnVirtualizer.getTotalSize()}px`,
                    height: '100%',
                    position: 'relative',
                }}
            >
                {columnVirtualizer.getVirtualItems().map((virtualColumn) => {
                    const isLoaderRow = virtualColumn.index > allRows.length - 1;
                    const character = allRows[virtualColumn.index];
                    const isCharacterSelected = selectedCharacters.includes(character?.id);
                    return (
                        <CharacterListItem
                            key={character?.id + virtualColumn.index}
                            start={virtualColumn.start}
                            size={virtualColumn.size}
                            character={character}
                            isLoader={isLoaderRow}
                            hasNextPage={hasNextPage}
                            isCharacterSelected={isCharacterSelected}
                            setSelectedCharacter={setSelectedCharacter}
                        />
                    );
                })}
            </div>
        </div>
    );
}

CharacterListContainer.propTypes = {
    parentRef: PropTypes.object.isRequired,
    columnVirtualizer: PropTypes.object.isRequired,
    hasNextPage: PropTypes.bool,
    allRows: PropTypes.array.isRequired,
    setSelectedCharacter: PropTypes.func.isRequired,
    selectedCharacters: PropTypes.array.isRequired,
};
