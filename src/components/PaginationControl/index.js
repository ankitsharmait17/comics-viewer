import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import React, { useState } from 'react';

const PaginationControl = ({ currentPage, totalPages, onPageChange }) => {
    const maxLimit = totalPages;
    // const [currentPage, set_Curr] = useState(1);
    const pageChangeFunction = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= maxLimit) {
            // set_Curr(pageNumber);
            onPageChange(pageNumber);
        }
    };
    const showPageItemsFunction = () => {
        const data = [];
        const numPage = 5;
        if (maxLimit <= numPage) {
            for (let i = 1; i <= maxLimit; i++) {
                data.push(
                    <PaginationItem key={i} active={i === currentPage}>
                        <PaginationLink key={i} onClick={() => pageChangeFunction(i)}>
                            {i}
                        </PaginationLink>
                    </PaginationItem>
                );
            }
        } else {
            const leftside = currentPage - numPage / 2 > 1;
            const rightside = currentPage + numPage / 2 < maxLimit;
            data.push(<PaginationLink first onClick={() => pageChangeFunction(1)} />);
            data.push(<PaginationLink previous onClick={() => pageChangeFunction(currentPage - 1)} />);
            if (leftside) {
                data.push(
                    <PaginationItem disabled>
                        <PaginationLink>...</PaginationLink>{' '}
                    </PaginationItem>
                );
            }
            const str = Math.max(1, Math.round(currentPage - numPage / 2));
            const end = Math.min(maxLimit, Math.round(currentPage + numPage / 2));
            for (let i = str; i <= end; i++) {
                data.push(
                    <PaginationItem key={i} active={i === currentPage}>
                        <PaginationLink key={i} onClick={() => pageChangeFunction(i)}>
                            {i}
                        </PaginationLink>
                    </PaginationItem>
                );
            }
            if (rightside) {
                data.push(
                    <PaginationItem disabled>
                        <PaginationLink>...</PaginationLink>{' '}
                    </PaginationItem>
                );
            }
            data.push(<PaginationLink next onClick={() => pageChangeFunction(currentPage + 1)} />);
            data.push(<PaginationLink last onClick={() => pageChangeFunction(maxLimit)} />);
        }
        return data;
    };
    return <Pagination>{showPageItemsFunction()}</Pagination>;
};

export default PaginationControl;
