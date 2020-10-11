import React, { useState, useEffect, Fragment } from "react";
import Proptypes from "prop-types";
import "./Table.css";


const pageSize = 10;
const Table = props =>
{
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    const primes = props.primes.slice((page - 1) * pageSize, (pageSize * (page - 1)) + pageSize);

    useEffect(() =>
    {
        setPage(1);
        setLastPage(Math.ceil(props.primes.length / pageSize));
    }, [props.primes])

    const handlePaginationClick = _page =>
    {
        if (_page !== page && _page <= lastPage && _page >= 1)
        {
            setPage(_page)
        }
    }

    return (
    <Fragment>
        <table>
            <thead>
                <tr>
                    <th key="self"></th>
                    {
                        props.primes.map((prime, i) => <th key={i}>{prime}</th>)
                    }
                </tr>
            </thead>
            <tbody>
                {
                    primes.map(prime => (
                    <tr key={prime}>
                        <td key="self">{prime}</td>
                        {
                            props.primes.map((primeFactor, i) => <td key={i}>{prime * primeFactor}</td>)
                        }
                    </tr>))
                }
            </tbody>
        </table>
        <div className="pagination-wrapper">
            <div className="pagination">
                <span
                    className={'page-arrow' + (page > 1 ? ' active' : '')}
                    onClick={() => handlePaginationClick(page - 1)}
                >
                    <i className="fas fa-angle-left"></i>
                </span>
                {
                    Array(lastPage).fill("").map((_, i) => (
                        <span
                            key={i}
                            onClick={() => handlePaginationClick(i + 1)}
                            className={'page' + ((page === i + 1) ? ' active' : '')}
                            data-testid="pageControl"
                        >
                            {i + 1}
                        </span>))
                }
                <span
                    className={'page-arrow' + (page < lastPage ? ' active' : '')}
                    onClick={() => handlePaginationClick(page + 1)}
                >
                    <i className="fas fa-angle-right"></i>
                </span>
            </div>
        </div>
    </Fragment>
    )
}

Table.propTypes =
{
    primes: Proptypes.arrayOf(Proptypes.number)
}

export default Table;