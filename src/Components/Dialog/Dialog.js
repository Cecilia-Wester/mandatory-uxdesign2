import React from 'react';
import ReactDOM from 'react-dom';
import './Dialog.css';
import FocusTrap from 'focus-trap-react';
import { BrowserRouter as Router, Link} from "react-router-dom";

export default function Dialog ({score, setDialog, fetch, setScore}){
    return ReactDOM.createPortal((
        <FocusTrap>
            <div className="mdc-dialog" >
                <div className="mdc-dialog__container">
                    <div className="mdc-dialog__surface"
                        role="alertdialog"
                        aria-modal="true"
                        aria-labelledby="my-dialog-title"
                        aria-describedby="my-dialog-content">
                        <h2 className="mdc-dialog__title" id="my-dialog-title">
                            Well played
                        </h2>
                        <div className="mdc-dialog__content" id="my-dialog-content">
                            Your score is {score}/10
                        </div>
                        <footer className="mdc-dialog__actions">
                            <Link to='/' >
                            <button 
                                type="button" 
                                className="mdc-button mdc-dialog__button" 
                                data-mdc-dialog-action="close" 
                                onClick={() => setDialog(false)}
                            >
                                <div className="mdc-button__ripple"></div>
                                <span className="mdc-button__label">Close</span>
                            </button>
                            </Link>
                            <button 
                                type="button" 
                                className="mdc-button mdc-dialog__button" 
                                data-mdc-dialog-action="play again"
                                onClick={() => setDialog(false) + fetch() + setScore(0)}
                                
                            >
                                <div className="mdc-button__ripple"></div>
                                <span className="mdc-button__label">Play again</span>
                            </button>
                        </footer>
                    </div>
                </div>
                <div className="mdc-dialog__scrim"></div>
            </div>
        </FocusTrap>
    ), document.body);
}