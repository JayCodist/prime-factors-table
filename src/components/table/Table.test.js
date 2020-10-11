import React from 'react';
import { render, waitFor } from '@testing-library/react';
import Table from "./Table";

test('should render table on Component', () =>
{
  const { getByRole } = render(<Table primes={[]} />);
  const tableElement = getByRole("table");
  expect(tableElement).toBeInTheDocument();
});

test('should render table with n columns when passed array of n numbers', async () =>
{
    const n = Math.floor(Math.random() * 100) + 1;
    const { getByRole } = render(<Table primes={Array(n).fill("").map((_, i) => i)} />);
    const tableElement = getByRole("table");
    const tableColumnCount = tableElement.rows[0].cells.length;
    await waitFor(() => expect(n).toBe(tableColumnCount - 1));
});

test('each cell be product of corresponding row/column headers', () =>
{
    const { getByRole } = render(<Table primes={Array(100).fill("").map((_, i) => i)} />);
    const tableElement = getByRole("table");
    const colIndex = Math.floor(Math.random() * 50) + 10;
    const rowIndex = Math.floor(Math.random() * 10);
    const intersectCell = tableElement.rows[rowIndex + 1].cells[colIndex + 1];
    expect(parseInt(intersectCell.textContent)).toBe(colIndex * rowIndex);
})

test('rows should be paginated', () =>
{
    const { getAllByTestId, rerender } = render(<Table primes={Array(1).fill("").map((_, i) => i)} />);
    let pageControls = getAllByTestId("pageControl");
    expect(pageControls.length).toBe(1);

    rerender(<Table primes={Array(100).fill("").map((_, i) => i)} />);
    pageControls = getAllByTestId("pageControl");
    expect(pageControls.length).toBe(10);
})