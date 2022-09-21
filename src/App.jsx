import { useEffect } from 'react'
import { useState } from 'react'
import Country from './country'
import { nanoid } from 'nanoid'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [countriesData, setCountriesData] = useState([])
  const [formData, setFormData] = useState({country: '', region:''})
  const [displayTheRest, setDisplayTheRest] = useState(true)

  useEffect(()=> {
                fetch( !formData.country && !formData.region ? 'https://restcountries.com/v3.1/all' : 
                !formData.region && formData.country ? `https://restcountries.com/v3.1/name/${formData.country}` : 
                formData.region && !formData.country ? `https://restcountries.com/v3.1/region/${formData.region}` : '')
                  .then(res=> res.json())
                  .then(data => setCountriesData(data.map(item=> {
                    return {
                      id: nanoid(),
                      name: item.name.common,
                      nativeName: item.name.official,
                      population: item.population,
                      region: item.region,
                      capital: item.capital,
                      subregion: item.subregion,
                      flag: item.flags.svg,
                      topLevel: item.tld,
                      borderCountries: item.borders,
                      isInfoShown: false
      }
    })))
}, [formData])

  const elements = countriesData.map((item, index) => {
    return <Country id={item.id}
                    key={index}
                    name={item.name}
                    nativeName={item.nativeName}
                    population={item.population}
                    region={item.region} 
                    subregion={item.subregion}
                    flag={item.flag}
                    capital={item.capital}
                    topLevel={item.topLevel}
                    borderCountries={item.borderCountries}
                    isInfoShown={item.isInfoShown}
                    isClicked={isClicked}
                    darkMode={darkMode}
                    reset={reset}
                    displayTheRest={displayTheRest}
                    />
  })

  function isClicked (id) {
    setDisplayTheRest(false)
    const newArr = countriesData.map(item => {
        if(id === item.id){
          return {
            ...item, isInfoShown: true
          }
        }
        return item
    })
    setCountriesData(newArr)
  }

  function reset(id) {
    setDisplayTheRest(true)
      const countryReset = countriesData.map(item => {
            if(item.id === id){
                return {
                    ...item, isInfoShown: !item.isInfoShown
                }
            }
            else {
              return item
            }
        })
      setCountriesData(countryReset)
    }

  function handleChange(event) {
    const {name, value} = event.target
    setFormData(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  return (
    <div className={`App 
    ${darkMode ? 'bg-darkModeBackground text-darkModeTextAndLightModeElements' 
                : 'text-lightModeText bg-lightModeBackground border-2' }
                    space-y-4 container mx-auto min-h-screen`}>

      <nav className={`flex px-4
                  ${darkMode ? 'bg-darkModeElements' : 'bg-darkModeTextAndLightModeElements' } 
                  justify-between items-center shadow-md h-20`} >
            <h1 className="font-bold">
                Where in the world? 
            </h1>
            <button 
              onClick={()=> setDarkMode(prev => !prev)} 
              className='flex space-x-1 items-center py-1'>
                  <i className='fa-solid fa-moon'></i>
                  <p>{darkMode ? 'Light Mode' : 'Dark Mode'}</p>
            </button>
        </nav>

      <section className='px-4 flex flex-col h-full space-y-6 pb-4 relative'>
        <form className='w-full h-12 flex justify-between items-center rounded-md'>
            <input 
                type="text"
                name='country'
                value={formData.country}
                onChange={handleChange}   
                placeholder='Search a Country'
                className={`text-lightModeInput tracking-tight w-[60%] md:w-1/2 ${darkMode && 'bg-darkModeElements'}  px-2 ${!darkMode && 'border-2'} rounded-md h-full`} />

          <select 
                  name="region" 
                  onChange={handleChange} 
                  className={`h-full w-[30%] md:w-[15%] px-1 text-center font-bold rounded-md ${darkMode && 'bg-darkModeElements'} ${!darkMode && 'border-2'} `}>
                        <option value="Africa">--Region--</option>
                        <option value="Africa">Africa</option>
                        <option value="America">America</option>
                        <option value="Asia">Asia</option>
                        <option value="Europe">Europe</option>
                        <option value="Oceania">Oceania</option>
          </select>

        </form>
            <main className="md:grid grid-cols-4 gap-6 rounded-md space-y-8 md:space-y-0">
              {elements}
            </main>
      </section>
    </div>
  )
}

export default App
