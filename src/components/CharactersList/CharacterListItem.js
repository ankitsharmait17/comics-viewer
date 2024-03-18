import PropTypes from 'prop-types';

export default function CharacterListItem({ start, size, character, isLoader, hasNextPage }) {
    let content;
    if (isLoader) {
        content = hasNextPage ? 'Loading more...' : 'Nothing more to load';
    } else {
        content = character ? (
            <img
                src={`${character?.thumbnail?.path}.${character?.thumbnail?.extension}`}
                alt={character?.name}
                style={{ width: '100px', height: '100px', borderRadius: '50%' }}
            ></img>
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
};
