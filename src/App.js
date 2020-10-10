import React, { useState, useEffect } from 'react';
import Table from "./components/table/Table";
import './App.css';

let foundPrimes = [];

export default () =>
{
  const [status, setStatus] = useState("");
  const [inputValue, setInputValue] = useState(10);
  const [primes, setPrimes] = useState([]);

  // This creates a Promise-based version of the `setTimeout` API
  const waitOut = (delay = 0) =>
  {
    return new Promise(resolve =>
    {
      setTimeout(resolve, delay);
    })
  }

  // This breaks JS event loop, making it possible for the DOM to get updated ahead of 
  // expensive synchronous tasks/processes (like finding very many primes, populating very large table, etc)
  // inside the same function
  const breakEventLoop = async () =>
  {
    await waitOut(0);
  }

  const getPrimeNumbers = (numberOfPrimes = 10) =>
  {
    // Use saved existing results of primes whenever possible
    if (numberOfPrimes <= foundPrimes.length)
    {
      console.log("cached")
      return foundPrimes.slice(0, numberOfPrimes);
    }
    // Look only for primes that havent been found yet and combine with saved results
    let current = foundPrimes.length ? foundPrimes.slice(-1)[0] : 1;
    while (foundPrimes.length < numberOfPrimes)
    {
      let isPrime = true;
      current += 2;
      for (let i = 0; i < foundPrimes.length && isPrime; i++)
      {
        if (current % foundPrimes[i] === 0)
          isPrime = false;
      }
      if (isPrime)
        foundPrimes.push(current);
    }
    return [ ...foundPrimes ];
  }

  const getPrimesAndUpdateTable = async () =>
  {
    let primeNumbers, givenMax = parseInt(inputValue);
      
    setStatus("Running. . .");
    // The following allows the intermediate "Running. . ." value to
    // actually show while primes are being found
    await breakEventLoop();

    const timeStart = performance.now()
    primeNumbers = getPrimeNumbers(givenMax)
    const timeStop = performance.now();
    setStatus(`Found ${givenMax} primes in ${Math.round(timeStop - timeStart).toLocaleString()}ms`);
    await breakEventLoop();

    setPrimes(primeNumbers);
  }

  useEffect(() =>
  {
    getPrimesAndUpdateTable();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleKeyDown = async e =>
  {
    if (e.key === "Enter")
    {
      await getPrimesAndUpdateTable();
    }
  }

  const handleInputChange = e =>
  {
    const str = e.target.value;
    setInputValue(str.replace(/\D/, ""))
  }

  return (
    <main className="container">
      <div className="top-row">
        <span className="input-flex">
          <label className="label">Enter number of primes</label>
          <input
            className="input"
            value={inputValue}
            placeholder="Enter positive integer"
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        </span>
        <span className="results-flex">
          <button className="button" onClick={getPrimesAndUpdateTable}>Run!</button>
          <span className="status">{status}</span>
        </span>
      </div>
      <section className="table-wrapper">
        <Table primes={primes} />
      </section>
	  </main>
  );
}
