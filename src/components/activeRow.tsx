import "../styles/board.css"
import Cell from "./cell";
import Hint from "./hint";
import {HINT} from "../contexts/context";

interface ActiveRowProps {
    guess: string[]
}

export default function ActiveRow({ guess }: ActiveRowProps) {

    const input = guess.map((digit, index) => <Cell key={index} guess={digit} status={0}/>)
    const empty = Array.from(Array(4-guess.length)).map((digit, i) => <Cell key={i} guess={digit} status={0}/>)
    const hint = Array.from(Array(4)).map((value, index) => <Hint key={index} status={HINT.EMPTY}/>)

    return <div className="row">
            {input} {empty}
        <div className="hint-container">
            {hint}
        </div>
    </div>
}