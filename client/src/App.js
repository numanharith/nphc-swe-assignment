import React, { useState } from 'react';
import Papa from 'papaparse';
import './App.css';

const allowedExtensions = ["csv"];

const App = () => {

  // store parsed data
  const [data, setData ] = useState([]);

  // contain the error for wrong file format
  const [error, setError] = useState("");

  // store the file uploaded by user
  const [file, setFile] = useState("");

  const handleFileChange = (e) => {
    setError("");

    // checks if user has entered the file
    if (e.target.files.length) {
      const inputFile = e.target.files[0];

      // check file extension
      const fileExtension = inputFile?.type.split("/")[1];
      if (!allowedExtensions.includes(fileExtension)) {
        setError("Please input a csv file!");
        return;
      }

      // set the state if input type is valid
      setFile(inputFile);
    }
  }

  const handleParse = () => {
    // show an error if user clicks parse button without a file
    if (!file) return setError("Enter a valid file.");

    // initialize a reader which allows user to read any file
    const reader = new FileReader();

    // event listener on reader when the file loads, we parse it and set the data
    reader.onload = async ({ target }) => {
      const csv = Papa.parse(target.result, { header: true });
      const parsedData = csv?.data;
      console.log(parsedData)
      const columns = Object.keys(parsedData[0]);
      setData(columns);
    };
    reader.readAsText(file);
  }

  return (
    <div>
      <label htmlFor='csvInput' style={{ display: 'block' }}>Enter CSV file</label>
      <input 
        onChange={handleFileChange}
        id='csvInput'
        name='file'
        type='File'
      />
      <div>
        <button onClick={handleParse}>Parse</button>
      </div>
      <div style={{ marginTop: '3rem'}}>
        {error ? error : data.map((col, idx) => <div key={idx}>{col}</div>)}
      </div>
    </div>
  );
}

export default App;