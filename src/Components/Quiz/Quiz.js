import React, {useState, useEffect}from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import './Quiz.css';
import html from 'react-inner-html';
import Dialog from '../Dialog/Dialog';

export default function Quiz (){
    const [answers, setAnswers] = useState(new Array(10).fill(true));
    const [questions, setQuestions] = useState(null);
    const [correctAnswers, setCorrectAnswers] = useState([]);
    const [dialog, setDialog] = useState(false);
    let [score, setScore] = useState(null);

    function fetch(){
        axios.get('https://opentdb.com/api.php?amount=10&type=boolean')
        .then((response) => {
            setQuestions(response.data.results)
            correctAnswer(response.data.results);
        })
        .catch(error => {
            console.log(error)
        });
    }  

    useEffect(() => {
        fetch()
    },[]);

    function correctAnswer(questionsData){
        setCorrectAnswers(questionsData.map(x => x.correct_answer === 'True'));
    }

    function onChange(index, newValue) {
        const newAnswers = [...answers];
        newAnswers[index] = newValue;
        setAnswers(newAnswers);
    }
    
    function onSubmit (e){
        e.preventDefault();
        for(let i = 0; i <10; i++){
            if(correctAnswers[i] === answers[i]){
                setScore(score += 1)
            }
        }
        setDialog(true);
        return score;
    }

    function MyComponent( question ) {
        return <div {...html(question.question)} />;
    }

    return(
        <div className='quiz'>
            <Helmet>
                <title>Quiz</title>
            </Helmet>
            {!questions ? <h1 className='loadingText' aria-label='loading'>Loading...</h1> :  
                <form onSubmit={onSubmit}>
                    <ul className='mdc-list'>
                        {questions.map((question, index) =>{
                            return(
                                <li key={question.question} className="mdc-list-item" tabIndex="0" >
                                    <span className="mdc-list-item__text">Q{index+1}</span>
                                    <span className="mds-list-item__text">{question.category}</span>
                                    <span className="mdc-list-item__text">{MyComponent(question)}</span>
                                    <div className="mdc-form-field">
                                        <div className="mdc-radio">
                                            <input 
                                                className="mdc-radio__native-control" 
                                                type="radio" 
                                                id="radio-1" 
                                                name={`radio-${index}`} 
                                                onChange={() => onChange(index, true)}
                                                defaultChecked
                                            />
                                            <div className="mdc-radio__background">
                                                <div className="mdc-radio__outer-circle"></div>
                                                <div className="mdc-radio__inner-circle"></div>
                                            </div>
                                            <div className="mdc-radio__ripple"></div>
                                        </div>
                                        <label htmlFor="radio-1">True</label>

                                        <div className="mdc-radio">
                                            <input 
                                                className="mdc-radio__native-control" 
                                                type="radio" 
                                                id="radio-2" 
                                                name={`radio-${index}`}
                                                onChange={() => onChange(index, false)}
                                            />
                                            <div className="mdc-radio__background">
                                                <div className="mdc-radio__outer-circle"></div>
                                                <div className="mdc-radio__inner-circle"></div>
                                            </div>
                                            <div className="mdc-radio__ripple"></div>
                                        </div>
                                        <label htmlFor="radio-2">False</label>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                    <button className="mdc-button" type='submit'>
                        <div className="mdc-button__ripple"></div>
                        <span className="mdc-button__label">Submit</span>
                    </button>
                </form>
            }
            {dialog && <Dialog score={score} setDialog={setDialog} fetch={fetch} setScore={setScore}/>}
        </div>
    )
}