import Cell from "./cell";
import Hint from "./hint";
import "../styles/board.css"
import {HINT} from "../contexts/context";

interface RowProps {
    guess: string[]
    answer: string[]
}

export default function UsedRow({ guess, answer }: RowProps) {

    const data = Array.from(Array(4)).map((value, index) => <Cell status={1} key={index} guess={guess[index]}/>)
    const result = calculateHints()
    const hint = result.map((value, index) => <Hint key={index} status={result[index]}/>)

    function calculateHints() {
        const hintCount = getHintCount(answer)
        const result: HINT[] = []

        guess.forEach((digit, index) => {
            if (answer[index] === digit) {
                hintCount[guess[index]]--
                result.push(HINT.OK)
            }
        })

        for (let i = 0; i < guess.length; i++) {
            if (hintCount[guess[i]] === 0 && answer[i] === guess[i])
                continue

            if (hintCount[guess[i]] > 0) {
                hintCount[guess[i]]--
                result.push(HINT.PRESENT)
            } else {
                result.push(HINT.WRONG)
            }
        }
        return result.sort()
    }


    function getHintCount(count: string[]) {
        return count.reduce((hints, digit) => {
            digit in hints ? hints[digit]++ : hints[digit] = 1
            return hints
        }, {} as {[digit: string]: number})
    }

    return <div className="row">
            {data}
        <div className="hint-container">
            {hint}
        </div>
    </div>
}