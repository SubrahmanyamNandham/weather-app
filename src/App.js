import {useState} from 'react'
import "./App.css"

const App = () => {
  const [city, setCity] = useState('')
  const [result, setResult] = useState('')
  const changeHandler = e => {
    setCity(e.target.value)
  }
  const submitHandler = e => {
    e.preventDefault()
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=14b3967b7732587198444e5e441ffea6`,
    )
      .then(response => response.json())
      .then(data => {
        console.log(data)

        const kelvin = data.main.temp
      
        const celsius = kelvin - 273.15
        setResult('Temperature at  ' + city + "\n" + Math.round(celsius) + '°C  humidity :  ' + data.main.humidity+' \n'+data.weather[0].description)
        
      })
      .catch(error => console.log(error))
    setCity('')
  }

  return (
    <div className="container">
      <center>
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Weather App</h4>
            <form onSubmit={submitHandler}>
              <input
                className="input"
                type="text"
                placeholder="Enter the location here"
                name="city"
                onChange={changeHandler}
                value={city}
              />{' '}
              <br />
              <br />
              <input className="temp" type="submit" value="Get Temperature" />
            </form>
            <br /> <br />
            <div className="output">
              <h1 className="title">{result}</h1>
            </div>
          </div>
        </div>
      </center>
    </div>
  )
}

export default App
