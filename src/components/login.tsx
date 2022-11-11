import "../styles/login.css"
import {GameStatus} from "../contexts/context";
import React, {Dispatch} from "react";

interface LoginProps {
    user: string
    setUser: Dispatch<React.SetStateAction<string>>
    setState: Dispatch<React.SetStateAction<GameStatus>>
}

export default function Login({user, setUser, setState}:LoginProps) {
    return <div className="modal-container">
        <div className={"login"}>
            <h1>Mastermind</h1>
            <h3>Player name:</h3>
            <div className="form">
                <form onSubmit={() => user !== "" ? setState(GameStatus.PLAYING) : null}>
                    <div className="input-container">
                        <input className="input" onChange={(value)=>setUser(value.currentTarget.value)}/>
                    </div>
                    <div className="button-container">
                        <input type="submit" className="button" value="PLAY"/>
                    </div>
                </form>
            </div>
            <h4>Designed by Gerard & Jordi</h4>
        </div>
    </div>
}