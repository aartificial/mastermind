import "../styles/board.css"

interface CellProps {
    guess: string
    status: number
}

export default function Cell({ guess, status }: CellProps) {
    return <div className={"cell" + status}>
            {guess}
        </div>
}