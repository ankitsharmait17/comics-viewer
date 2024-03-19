import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import ComicCard from '../ComicCard';
import PropTypes from 'prop-types';
import PaginationControl from '../PaginationControl';

const ComicGrid = ({ comics, offset, fetchComics }) => {
    return (
        <Container style={{ marginLeft: '225px', marginRight: '225px', width: 'calc(100vw - 450px)' }}>
            <Row
                style={{
                    height: 'calc(100vh - 375px)',

                    overflowY: 'scroll',
                    marginTop: '75px',
                    marginBottom: '50px',
                }}
            >
                {comics.data.results.map((element, index) => (
                    <Col lg='3' className='show-grid-col' key={element.id}>
                        <ComicCard comic={element} key={element.id} />
                    </Col>
                ))}
            </Row>
            <Row>
                <Col />
                <Col>
                    <PaginationControl
                        currentPage={offset}
                        totalPages={Math.ceil(comics.data.total / 20)}
                        onPageChange={fetchComics}
                    />
                </Col>
                <Col />
            </Row>
        </Container>
    );
};

ComicGrid.propTypes = {
    comics: PropTypes.object.isRequired,
    offset: PropTypes.number.isRequired,
    fetchComics: PropTypes.func.isRequired,
};

export default ComicGrid;
