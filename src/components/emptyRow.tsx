import Cell from "./cell";
import Hint from "./hint";
import {HINT} from "../contexts/context";

export default function EmptyRow() {

    const empty = Array.from(Array(4)).map((digit, i) => <Cell status={0} key={i} guess={digit}/>)
    const hint = Array.from(Array(4)).map((value, index) => <Hint key={index} status={HINT.EMPTY}/>)
    return <div className="row">
            {empty}
        <div className="hint-container">
            {hint}
        </div>
    </div>
}