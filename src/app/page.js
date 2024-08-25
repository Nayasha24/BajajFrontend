"use client";

import { useState } from "react";
import axios from "axios";
import Select from "react-select";
export default function Home() {
    const [jsonInput, setJsonInput] = useState('');
    const [responseData, setResponseData] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const options = [
      { value: 'alphabets', label: 'Alphabets' },
      { value: 'numbers', label: 'Numbers' },
      { value: 'highest_lowercase_alphabet', label: 'Highest lowercase alphabet' }
    ];
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const parsedInput = JSON.parse(jsonInput);
        const response = await axios.post('https://your-backend-url/bfhl', parsedInput);
        setResponseData(response.data);
      } catch (error) {
        console.error("Invalid JSON or API error", error);
      }
    };
    const renderResponse = () => {
      if (!responseData) return null;

      return (
        <div className="filtered-response">
          {selectedOptions.includes('alphabets') && (
            <p>Alphabets: {responseData.alphabets.join(', ')}</p>
          )}
          {selectedOptions.includes('numbers') && (
            <p>Numbers: {responseData.numbers.join(', ')}</p>
          )}
          {selectedOptions.includes('highest_lowercase_alphabet') && (
            <p>
              Highest lowercase alphabet: {responseData.highest_lowercase_alphabet.join(', ')}
            </p>
          )}
        </div>
      );
    };
  return (
    <div className="container">
      <h1 className="border-white text-sm">API Input</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          className="textarea"
          rows="2"
          cols="70"
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
        />
        <button type="submit" className="submit-button rounded-lg bg-[#181451] w-full p-2 text-white">Submit</button>
      </form>
      <div className="filter-section">
        <h2>Multi Filter</h2>
        <Select
          isMulti
          options={options}
          className="select-dropdown"
          onChange={(selected) => setSelectedOptions(selected.map((option) => option.value))}
        />
      </div>
      {renderResponse()}
    </div>
  );
}
