import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, UncontrolledTooltip } from 'reactstrap';
import PropTypes from 'prop-types';
import { truncateText } from '../../common/utils';

const ComicCard = ({ comic }) => {
    return (
        <Card style={{ color: 'white' }}>
            <CardImg
                top
                src={`${comic?.thumbnail?.path}.${comic?.thumbnail?.extension}`}
                alt='Card image cap'
                style={{ height: '300px' }}
            />

            <CardBody>
                <CardTitle id={`comic-card-title-${comic.id}`}>{truncateText(comic.title)}</CardTitle>
                <CardSubtitle>#{comic.issueNumber}</CardSubtitle>
                {comic.title.length > 30 && (
                    <UncontrolledTooltip placement='right' target={`comic-card-title-${comic.id}`}>
                        {comic.title}
                    </UncontrolledTooltip>
                )}
            </CardBody>
        </Card>
    );
};

ComicCard.propTypes = {
    comic: PropTypes.object.isRequired,
};

export default ComicCard;
