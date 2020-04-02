import React from 'react';
import { BrowserRouter as Router, Link} from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import Header from '../Header/Header';
import './Main.css';

export default function Main (){
    return(
        <div className='main'>
            <Helmet>
                <title>Main</title>
            </Helmet>
            <Header /> 
            <Link to='/quiz'>   
                <button className="mdc-button">
                    <div className="mdc-button__ripple"></div>
                    <span className="mdc-button__label" >Start Quiz</span>
                </button>
            </Link>
        </div>
    )
}