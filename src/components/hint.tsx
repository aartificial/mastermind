import "../styles/styles.css"
import {HINT} from "../contexts/context";

interface HintProps {
    status: HINT
}

export default function Hint({status}: HintProps) {
    return <div className={"hint" + status}>

    </div>
}