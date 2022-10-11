import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function Detail (props) {
    const {countryId} = useParams()
    const mainCountry = props.countriesData.find(item=> item.id === countryId)

    console.log(mainCountry)

        return (
            <div className={`w-full min-h-auto space-y-12 p-4 md:p-20`}>
                <Link
                    to="/"
                    onClick={props.toggleForm}
                    className="py-1 space-x-2 w-1/3 md:w-1/6 flex items-center justify-center border-2 hover:bg-sky-200">
                    <i className="fa-solid fa-arrow-left-long"></i>
                    <p>Back</p>
                </Link>

                <section className="flex flex-col md:items-center md:flex-row md:space-x-8 space-y-10 md:space-y-0">
                    <img src={mainCountry.flag} alt="" className="md:w-1/2 w-full h-64 md:h-72 object-cover shadow-md" />
                    <div className="text-sm md:w-1/2 w-full space-y-6 py-2">
                        <h1 className="font-bold text-2xl md:text-4xl">
                            {mainCountry.nativeName}
                        </h1>
                        <article className="flex flex-col md:flex-row md:justify-between space-y-4 md:space-y-0">
                            <div className="space-y-1">
                                <h3>Native Name : 
                                    <span className={`${props.darkMode ? 'text-darkModeTextAndLightModeElements' : 'text-lightModeInput'} ml-3 font-bold`}>{mainCountry.name}
                                    </span>
                                </h3>

                                <h3>Population : 
                                    <span className={`${props.darkMode ? 'text-darkModeTextAndLightModeElements' : 'text-lightModeInput'} ml-3 font-bold`}>
                                        {mainCountry.population}
                                    </span>
                                </h3>

                                <h3>Region : 
                                    <span className={`${props.darkMode ? 'text-darkModeTextAndLightModeElements' : 'text-lightModeInput'} ml-3 font-bold`}>
                                        {mainCountry.region}
                                    </span>
                                </h3>

                                <h3>Sub Region : 
                                    <span className={`${props.darkMode ? 'text-darkModeTextAndLightModeElements' : 'text-lightModeInput'} ml-3 font-bold`}>
                                        {mainCountry.subregion}
                                    </span>
                                </h3>

                                <h3>Capital : 
                                    <span className={`${props.darkMode ? 'text-darkModeTextAndLightModeElements' : 'text-lightModeInput'} ml-3 font-bold`}>
                                        {mainCountry.capital}
                                    </span>
                                </h3>
                            </div>

                            <div className="space-y-1">
                                <h3>Top Level Domain : 
                                    <span className={`${props.darkMode ? 'text-darkModeTextAndLightModeElements' : 'text-lightModeInput'} ml-3 font-bold`}>
                                        {mainCountry.tld}
                                    </span>
                                </h3>
                                <h3>Currency : 
                                    <span className={`${props.darkMode ? 'text-darkModeTextAndLightModeElements' : 'text-lightModeInput'} ml-3 font-bold`}>
                                        {mainCountry.currencies}
                                    </span>
                                </h3>
                                <h3>Languages : 
                                    <span className={`${props.darkMode ? 'text-darkModeTextAndLightModeElements' : 'text-lightModeInput'} ml-3 font-bold`}>{
                                    mainCountry.languages}
                                    </span>
                                </h3>
                            </div>
                        </article>

                        <h3 className="w-full capitalize py-1"> Border Countries :
                            <span className={`${props.darkMode ? 'text-darkModeTextAndLightModeElements' : 'text-lightModeInput'} ml-3 capitalize font-bold`}>
                                {mainCountry.bc}
                            </span> 
                        </h3>
                    </div>
                </section>
            </div>
    )
}