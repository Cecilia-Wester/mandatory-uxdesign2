import React, {useState, useEffect}from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import './Quiz.css';
import html from 'react-inner-html';

export default function Quiz (){
    const [answers, setAnswers] = useState(new Array(10).fill(true));
    const [questions, setQuestions] = useState(null);
    const [score, setScore] = useState(null);
    const [correctAnswers, setCorrectAnswers] = useState([]);
    
    useEffect(() => {
        axios.get('https://opentdb.com/api.php?amount=10&type=boolean')
        .then((response) => {
            console.log(response.data.results)
            setQuestions(response.data.results)
            console.log(questions);
            correctAnswer(response.data.results);
        })
        .catch(error => {
            console.log(error)
        })
    },[]);

    function correctAnswer(questionsData){
        questionsData.map((question, index) => {
            console.log(question.correct_answer)
            return(
                setCorrectAnswers(correctAnswers.push(question.correct_answer))
            )
        })
        console.log(correctAnswers)
    }
    
    function onChange(e){
        e.preventDefault()
        setAnswers(value)
    }
    
    function onSubmit(index){
        for(let i = 0; i <10; i++)
            if(correctAnswers === answers){
                setScore(score += 1)
            }
        
    }


    function MyComponent( question ) {
        return <div {...html(question.question)} />;
    }

    return(
        <div className='quiz'>
            <Helmet>
                <title>Quiz</title>
            </Helmet>
            {!questions ? <p>Loading...</p> : 
            <form onSubmit={onSubmit}>
                <ul className='mdc-list'>
                    {questions.map((question, index) =>{
                        return(
                            <li key={question.question} className="mdc-list-item" tabIndex="0" >
                                <span className="mdc-list-item__text">Q{index+1}</span>
                                <span className="mds-list-item__text">{question.category}</span>
                                <span className="mdc-list-item__text">{MyComponent(question)}</span>
                                <ul>
                                    <li>
                                        <div className="mdc-form-field">
                                            <div className="mdc-radio">
                                                <input 
                                                    className="mdc-radio__native-control" 
                                                    type="radio" 
                                                    id="radio-2" 
                                                    name={`radio-${index}`} 
                                                    checked={answers[index]}
                                                    onChange={onChange}
                                                    value='true'
                                                />
                                                <div className="mdc-radio__background">
                                                    <div className="mdc-radio__outer-circle"></div>
                                                    <div className="mdc-radio__inner-circle"></div>
                                                </div>
                                                <div className="mdc-radio__ripple"></div>
                                            </div>
                                            <label htmlFor="radio-2">True</label>
                                        </div>
                                        <div className="mdc-form-field">
                                            <div className="mdc-radio">
                                                <input 
                                                    className="mdc-radio__native-control" 
                                                    type="radio" 
                                                    id="radio-1" 
                                                    name={`radio-${index}`} 
                                                    checked={answers[index]}
                                                    onChange={onChange}
                                                    value='false'
                                                />
                                                <div className="mdc-radio__background">
                                                    <div className="mdc-radio__outer-circle"></div>
                                                    <div className="mdc-radio__inner-circle"></div>
                                                </div>
                                                <div className="mdc-radio__ripple"></div>
                                            </div>
                                            <label htmlFor="radio-1">False</label>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                        )
                    })}
                </ul>
                <button className="mdc-button" type='submit'>
                    <div className="mdc-button__ripple"></div>
                    <span className="mdc-button__label">Button</span>
                </button>
            </form>
            }
        </div>
    )
}