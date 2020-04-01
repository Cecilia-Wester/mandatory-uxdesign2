import React from 'react';
import reactDOM from 'react-dom';

export default function Dialog (score){
    return(
        <div className="mdc-dialog">
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
                        <button type="button" className="mdc-button mdc-dialog__button" data-mdc-dialog-action="no">
                            <div className="mdc-button__ripple"></div>
                            <span className="mdc-button__label">No</span>
                        </button>
                        <button type="button" className="mdc-button mdc-dialog__button" data-mdc-dialog-action="yes">
                            <div className="mdc-button__ripple"></div>
                            <span className="mdc-button__label">Yes</span>
                        </button>
                    </footer>
                </div>
            </div>
            <div className="mdc-dialog__scrim"></div>
        </div>
    )
}