import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import ComicCard from '../ComicCard';
import PropTypes from 'prop-types';
import PaginationControl from '../PaginationControl';

const ComicGrid = ({ comics, offset, fetchComics }) => {
    return (
        <Container>
            <Row
                style={{ height: 'calc(100vh - 175px)', overflowY: 'scroll', marginTop: '75px', marginBottom: '50px' }}
            >
                {comics.data.results.map((element, index) => (
                    <Col lg='3' className='show-grid-col' key={index}>
                        <ComicCard show={element} key={index} />
                    </Col>
                ))}
            </Row>
            <Row>
                <PaginationControl
                    currentPage={offset}
                    totalPages={Math.ceil(comics.data.total / 20)}
                    onPageChange={fetchComics}
                />
            </Row>
        </Container>
    );
};

ComicGrid.propTypes = {
    comics: PropTypes.array.isRequired,
    searchText: PropTypes.string.isRequired,
};

export default ComicGrid;
