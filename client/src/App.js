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
      console.log("event: " + e);
      const inputFile = e.target.files[0];
      console.log("Input file: " + inputFile);

      // check file extension
      const fileExtension = inputFile?.type.split("/")[1];
      if (!allowedExtensions.includes(fileExtension)) {
        setError("Please input a csv file!");
        return;
      }

      // check file size
      console.log("Input size: " + inputFile.size / 1024);
      if (inputFile.size / 1024 > 2) {
        setError("Please input a file of size 2MB or less!");
      }
      
      // set the state if input type is valid
      setFile(inputFile);
    }
  }

  const checkForDuplicates = (arr) => {
    if (arr.length !== new Set(arr).size) {
      return true;
    }

    return false;
  }

  const checkForMissingValues = (arr) => {
    // iterate array of objects
    arr.forEach(employee => {
      // convert object to array
      const values = Object.values(employee);
      if (values.length !== 4) {
        setError("Row contains missing value!");
        return;
      } 
      values.forEach(value => {
        if (value.length === 0) {
          setError("Row contains missing value!");
          return;
        }
      })
    });
  }

  const handleParse = () => {
    // show an error if user clicks parse button without a file
    if (!file) return setError("Enter a valid file.");

    // initialize a reader which allows user to read any file
    const reader = new FileReader();

    // event listener on reader when the file loads, we parse it and set the data
    reader.onload = async ({ target }) => {
      // console.log("target: ", target);
      // console.log("target res: ", target.result);
      const csv = Papa.parse(target.result, { header: true });
      // console.log("csv: ", csv);
      const parsedData = csv?.data;
      const ids = parsedData.map(({id}) => id);
      if (checkForDuplicates(ids)) {
        setError("There are duplicated IDs in the CSV file!");
        return;
      }
      const logins = parsedData.map(({login}) => login);
      if (checkForDuplicates(logins)) {
        setError("There are duplicated logins in the CSV file!");
        return;
      }
      checkForMissingValues(parsedData);
      console.log("parsedData: ", parsedData);
      const columns = Object.keys(parsedData[0]);
      setData(columns);

      if (error === "") {
        const formData = new FormData();
        formData.append('file', file);
        console.log("FormData: ", formData);
        fetch('http://localhost:8070/users/upload', {
            method: 'POST',
            body: formData
          }
        )
        .then((resp) => console.log('Result: ', resp))
        .catch((err) => console.log('Error: ', err));
      }
    };

    reader.readAsText(file);
  }

  return (
    <form encType='multipart/form-data' action=''>
      <label htmlFor='csvInput' style={{ display: 'block' }}>Attach CSV file</label>
      <input 
        onChange={handleFileChange}
        id='csvInput'
        name='file'
        type='file'
      />
      <div>
        <button onClick={handleParse}>Parse</button>
      </div>
      <div style={{ marginTop: '3rem'}}>
        {error ? error : data.map((col, idx) => <div key={idx}>{col}</div>)}
      </div>
    </form>
  );
}

export default App;