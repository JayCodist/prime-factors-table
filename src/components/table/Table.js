import React from "react";
import Proptypes from "prop-types";


const Table = props =>
{
    const { primes } = props;
    return (
    <table>
        <thead>
            <tr>
                <th key="self"></th>
                {
                    primes.map((prime, i) => <th key={i}>{prime}</th>)
                }
            </tr>
        </thead>
        <tbody>
            {
                primes.map(prime => (
                <tr key={prime}>
                    <td key="self">{prime}</td>
                    {
                        primes.map((primeFactor, i) => <td key={i}>{prime * primeFactor}</td>)
                    }
                </tr>))
            }
        </tbody>
    </table>
    )
}

Table.propTypes =
{
    primes: Proptypes.arrayOf(Proptypes.number)
}

export default Table;