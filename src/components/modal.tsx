import '../styles/modal.css'
import {GameStatus} from "../contexts/context";
import React, {Dispatch} from "react";

interface ModalProps {
    type: GameStatus
    completedWords: string[][]
    solution: string[]
    handle: () => void
}

export default function Modal({ type, completedWords, solution, handle}:ModalProps) {

    return <div className="modal-container">
        <div className="modal">
            <h1>You {type === GameStatus.WON ? "won" : "lost"} !</h1>
            <h3>The solution was {solution}.</h3>
            <h3>Score: {(8-(completedWords.length === 1 ? 0 : completedWords.length))/8 * 100}%</h3>
            <button className="button" onClick={handle}>Play again</button>
        </div>
    </div>
}