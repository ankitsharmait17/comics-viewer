import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

export default function CharacterListItem({
    start,
    size,
    character,
    isLoader,
    hasNextPage,
    setSelectedCharacter,
    isCharacterSelected,
}) {
    const [isSelected, setIsSelected] = useState(false);

    const toggleSelected = () => {
        setIsSelected(!isSelected);
        setSelectedCharacter({ isSelected: !isSelected, id: character.id, name: character.name });
    };

    useEffect(() => {
        setIsSelected(isCharacterSelected);
    }, [isCharacterSelected]);

    let content;
    if (isLoader) {
        content = hasNextPage ? 'Loading more...' : 'Nothing more to load';
    } else {
        content = character ? (
            <div style={{ position: 'relative' }}>
                <img
                    src={`${character?.thumbnail?.path}.${character?.thumbnail?.extension}`}
                    alt={character?.name}
                    style={{ width: '100px', height: '100px', borderRadius: '50%', cursor: 'pointer' }}
                    onClick={toggleSelected}
                />
                {isSelected && (
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            borderRadius: '50%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer',
                        }}
                        onClick={toggleSelected}
                    >
                        <svg xmlns='http://www.w3.org/2000/svg' fill='white' width='24' height='24' viewBox='0 0 24 24'>
                            <path d='M0 0h24v24H0V0z' fill='none' />
                            <path d='M9 16.2l-3.5-3.5c-.39-.39-.39-1.02 0-1.41s1.02-.39 1.41 0L9 13.38l7.88-7.88c.39-.39 1.02-.39 1.41 0s.39 1.02 0 1.41L9.41 16.21c-.19.19-.44.29-.71.29z' />
                        </svg>
                    </div>
                )}
            </div>
        ) : (
            ''
        );
    }

    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: `${size}px`,
                transform: `translateX(${start}px)`,
            }}
        >
            {content}
        </div>
    );
}

CharacterListItem.propTypes = {
    start: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    character: PropTypes.object,
    isLoader: PropTypes.bool.isRequired,
    hasNextPage: PropTypes.bool.isRequired,
    setSelectedCharacter: PropTypes.func.isRequired,
    isCharacterSelected: PropTypes.bool.isRequired,
};
