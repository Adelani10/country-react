import React from "react";
import { Link } from "react-router-dom";



export default function Country(props) {

         return (
             <Link to={`/${props.id}`} 
                    onClick={props.toggleForm}
                    className={` shadow-md w-full ${!props.darkMode && 'border'} ${props.darkMode && 'bg-darkModeElements'}`}>
                        <div className="w-full ">
                            <img src={props.flag} alt="flag" className="w-full object-fill " />
                        </div>
                    
                    <div className="py-4 space-y-2 h-auto flex flex-col px-2 relative justify-center">
                        <h1 className="font-bold text-sm">
                            {props.name}
                        </h1>
                        <section className="text-xs md:text-sm space-y-1">
                            <h2 className="">
                                Population :<span className="text-lightModeInput"> {props.population}</span>
                            </h2>
                            <h2 className="">
                                Region : <span className="text-lightModeInput"> {props.region}</span>
                            </h2>
                            <h2 className="">
                                Capital : <span className="text-lightModeInput"> {props.capital}</span>
                            </h2>
                        </section>
                        <button className=" absolute bottom-1/2 translate-y-1/2 right-3 text-zinc-400 font-semibold text-xs md:text-sm">
                            <i className="fa-solid fa-angles-right"></i>
                        </button>
                        
                    </div>
                </Link>
                
    )
}