import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Country from './Country';

const App = () => {

  const [countries, setCountries] = useState([]);
  const [matchingCountriesArray, setMatchingCountriesArray] = useState([]);

  const onCountriesSearch = (event) => {
    const searchString = event.target.value;
    console.log('searchSring', searchString );
    //console.log('countries', countries);
    const matchingCountriesArray = countries.filter((country) => {
      //console.log('country name', country.name.common);
      return country.name.common.toLowerCase().includes(searchString);
    })
    console.log('matchingcountriesArray', matchingCountriesArray);
    setMatchingCountriesArray(matchingCountriesArray);
  };

  const onShowCountry = (country) => {
    console.log("onShowCountry", country);
    setMatchingCountriesArray([country]);
  };
   

  useEffect (() => {
    axios({
      method: 'get',
      url: 'https://restcountries.com/v3.1/all'
    })
    .then((response) => {
      console.log(response.data);
      setCountries(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Countries</h2>
      <p>find countries <input onChange={onCountriesSearch}></input></p>
       {(matchingCountriesArray.length  > 0) && 
          ((matchingCountriesArray.length > 10 )
            ? 
            (<p>Too many matches, specify another filter</p>)
            : 
            ((matchingCountriesArray.length === 1)
              ?
              (<div>
                <p>Single country</p>
                <Country countryObj={matchingCountriesArray[0]}/>
                </div>)
              :
              ( <ul style={{'listStyleType':'none'}}>
                 { matchingCountriesArray.map((country) => {
                  return( 
                  <li key={country.population}>
                      {country.name.common}<button onClick={()=> onShowCountry(country)}>show</button>
                  </li>)})}
                </ul>
              )   
            )
          )
       }
    </div>
  );
};

export default App;
