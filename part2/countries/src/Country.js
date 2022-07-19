import axios from 'axios';
import React, { useEffect } from 'react';


const Country = (props) => {
    console.log('props country Object from Country', props.countryObj);
    console.log('object values', Object.values(props.countryObj.languages));
    const langArray = Object.values(props.countryObj.languages);
    const capitalName = props.countryObj.capital[0];
    const API_KEY = process.env.REACT_APP_API_KEY;
    useEffect(() => {
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${capitalName}&appid=${API_KEY}`)
            .then((response) => {
                console.log('weather from country component', response);
            })
    }, []);
    return (
        <div>
            <h1>{props.countryObj.name.common}</h1>
            <>capital {props.countryObj.capital[0]}</><br />
            <>population {props.countryObj.population}</>
            <h2>languages</h2>
            <ul>
                {langArray.map((lang) => {
                    return <li key={lang}>{lang}</li>
                })}
            </ul>
            <img src={props.countryObj.flags.png} />
            <h2>Weather in {props.countryObj.capital[0]}</h2>
            <p><b>tmep:</b> 5 Clesius</p>
            <img src='https://openweathermap.org/img/wn/10d@2x.png' />
            <p>wind</p>
        </div>
    );
};

export default Country;