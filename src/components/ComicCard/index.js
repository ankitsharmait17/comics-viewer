import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, UncontrolledTooltip } from 'reactstrap';
import PropTypes from 'prop-types';
import { truncateText } from '../../common/utils';

const ComicCard = ({ show }) => {
    return (
        <Card style={{ color: 'white' }}>
            <CardImg
                top
                src={`${show?.thumbnail?.path}.${show?.thumbnail?.extension}`}
                alt='Card image cap'
                style={{ height: '300px' }}
            />

            <CardBody>
                <CardTitle id={`comic-card-title-${show.id}`}>{truncateText(show.title)}</CardTitle>
                <CardSubtitle>#{show.issueNumber}</CardSubtitle>
                {show.title.length > 30 && (
                    <UncontrolledTooltip placement='right' target={`comic-card-title-${show.id}`}>
                        {show.title}
                    </UncontrolledTooltip>
                )}
            </CardBody>
        </Card>
    );
};

ComicCard.propTypes = {
    show: PropTypes.object.isRequired,
};

export default ComicCard;
