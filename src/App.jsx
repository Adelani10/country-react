import { useEffect } from 'react'
import { useState } from 'react'
import Country from './country'
import { nanoid } from 'nanoid'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [countriesData, setCountriesData] = useState([])
  const [name, setName] = useState("")
  const [displayTheRest, setDisplayTheRest] = useState(true)

  useEffect(()=> {
                fetch( name ? `https://restcountries.com/v3.1/name/${name}` : 'https://restcountries.com/v3.1/all')
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
}, [name])

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

      <section className='px-4 flex flex-col space-y-6 pb-4 relative'>
        <form className='w-full md:w-[50%] flex items-center rounded-md shadow-md'>
            <input 
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}   
                placeholder='Search for a Country'
                className={`text-lightModeInput tracking-widest w-full ${darkMode && 'bg-darkModeElements'}  px-2 ${!darkMode && 'border-2'} rounded-md h-12`} />

        </form>
            <main className="md:grid grid-cols-4 gap-6 rounded-md space-y-8 md:space-y-0">
              {elements}
            </main>
      </section>
    </div>
  )
}

export default App
