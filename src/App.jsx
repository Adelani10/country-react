import { useEffect } from 'react'
import { useState } from 'react'
import Country from './country'
import { nanoid } from 'nanoid'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [countriesData, setCountriesData] = useState([])
  const [name, setName] = useState("")
  const [restart, setRestart] = useState(false)

  useEffect(()=> {
    if(!restart){fetch('https://restcountries.com/v3.1/all')
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
  }}, [restart])

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
                    />
  })

  function isClicked (id) {
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


  function searchCountry (event) {
    event.preventDefault()
    setRestart(true)
      const newData = countriesData.filter(item => {
      if(item.name == name){
        return item
      }
    })
    setCountriesData(newData)
  }

  console.log(name)

  return (
    <div className={`App 
    ${darkMode ? 'bg-darkModeBackground text-darkModeTextAndLightModeElements' 
                : 'text-lightModeText bg-lightModeBackground' }
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
        <form 
            onSubmit={searchCountry}
            className='w-full md:w-[50%] flex items-center rounded-md shadow-md'>


             {restart && <button 
                  onClick={()=> {setRestart(false)
                                    setName('')}} 
                  className={`w-[10%] ${!darkMode && 'border-y-2 border-r-2'} h-12 rounded-l-md bg-red-600`}>
                    <i className="fa-solid fa-angle-left"></i>
            </button> }


            <input 
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}   
                placeholder='Search (Capitalize first letter)'
                className={`text-lightModeInput ${restart ? 'w-[70%]' : 'w-[80%]'} ${darkMode && 'bg-darkModeElements'} capitalize px-2 ${!darkMode && 'border-y-2 border-l-2'} ${!restart && 'rounded-l-md'} h-12`} />

            <button type="submit" className={`w-[20%] ${!darkMode && 'border-y-2 border-r-2'} h-12 rounded-r-md bg-sky-300`}>Enter</button>
        </form>
            <main className="md:grid grid-cols-4 gap-6 rounded-md space-y-6 md:space-y-0">
              {elements}
            </main>
      </section>
    </div>
  )
}

export default App
