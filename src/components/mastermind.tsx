import "../styles/styles.css"
import "../styles/playerinfo.css"
import React, {useState} from "react";
import {GameStatus} from "../contexts/context";
import {useWindow} from "../hooks/useWindow";
import Header from "./header";
import ThemeSwitch from "./themeswitch";
import Modal from "./modal";
import EmptyRow from "./emptyRow";
import UsedRow from "./usedRow";
import ActiveRow from "./activeRow";
import Login from "./login";
import {generate} from "../services/randomNumberGeneratorService";

const VALID_KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
const MAX_TURNS = 7
const NUMBER_LENGTH = 4

export default function Mastermind() {

    const [answer, setAnswer] = useState<string[]>(generate)
    const [currentGuess, setCurrentGuess] = useState<string[]>([])
    const [guesses, setGuesses] = useState<string[][]>([])
    const [turn, setTurn] = useState<number>(0)
    const [state, setState] = useState<GameStatus>(GameStatus.LOGIN)
    const [user, setUser] = useState("")
    const [wins, setWins] = useState<number>(0)
    const [losses, setLosses] = useState<number>(0)

    useWindow('keydown', handleKeyDown)

    function handleKeyDown(event: KeyboardEvent) {
        const key = event.key
        onKeyPressed(key)
    }

    function onKeyPressed(key: string) {
        if (state !== GameStatus.PLAYING) return

        if (key === 'Backspace' && currentGuess.length > 0){
            onDelete()
            return
        }
        if (key === 'Enter' && currentGuess.length === NUMBER_LENGTH && turn <= MAX_TURNS) {
            onEnter()
            return
        }
        if (currentGuess.length >= NUMBER_LENGTH)
            return

        if (VALID_KEYS.includes(key)) {
            onInput(key)
            return
        }
    }

    function onInput(digit: string) {
        const newGuess = currentGuess.concat(digit)
        setCurrentGuess(newGuess)
    }

    function onDelete() {
        const newGuess: string[] = currentGuess.splice(0,currentGuess.length-1)
        setCurrentGuess(newGuess)
    }

    function arrayEquals(a: string[], b: string[]) {
        return Array.isArray(a) &&
            Array.isArray(b) &&
            a.length === b.length &&
            a.every((val, index) => val === b[index]);
    }

    function onEnter() {
        if (arrayEquals(currentGuess, answer)) {
            setGuesses([...guesses, currentGuess])
            setState(GameStatus.WON)
            setWins(wins+1)
            console.log("WON")
            return
        }
        if (turn === MAX_TURNS) {
            setGuesses([...guesses, currentGuess])
            setState(GameStatus.LOST)
            setLosses(losses+1)
            console.log("LOST")
            return
        }

        setGuesses([...guesses, currentGuess])
        setTurn(turn + 1)
        setCurrentGuess([])
    }

    const handleRestart = () => {
        setState(GameStatus.PLAYING)
        setTurn(0)
        setCurrentGuess([])
        setGuesses([])
        setAnswer(generate)
    }

    const playerinfo = <div className={"playerinfo"}>
        <h2>Player: {user}</h2>
        <h4>Wins: {wins}</h4>
        <h4>Losses: {losses}</h4>
    </div>

    return (
        <div className="main">
            <Header/>
            {state === GameStatus.LOGIN ? <Login user={user} setState={setState} setUser={setUser} /> : playerinfo}

            <ThemeSwitch/>
            {state === (GameStatus.WON) ? <Modal type={state} completedWords={guesses} solution={answer} handle={handleRestart}/> : null}
            {state === (GameStatus.LOST) ? <Modal type={state} completedWords={guesses} solution={answer} handle={handleRestart}/> : null}
            <div className="board">
                {Array.from(Array(MAX_TURNS - turn)).map((_, index) => <EmptyRow key={index}/>)}
                {guesses.map((value, index) => <UsedRow key={index} guess={value} answer={answer}/>)}
                {state === GameStatus.PLAYING ? <ActiveRow guess={currentGuess}/> : null}
            </div>
        </div>

    )
}