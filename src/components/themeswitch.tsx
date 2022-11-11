import '../styles/themeswitch.css'
import React, {useEffect, useState} from "react";

export default function ThemeSwitch() {
    const [isEnabled, setIsEnabled] = useState(true);
    const [theme, setTheme] = useState<string>('light');
    const [icon, setIcon] = useState<string>("")

    useEffect(() => {
        updateTheme(isEnabled);
    }, [isEnabled]);

    const switchState = () => {
        setIsEnabled((prevState) => !prevState)
    }

    const updateTheme = (isEnabled: boolean) => {
        setTheme(isEnabled ? 'dark' : 'light');
        setIcon(isEnabled ? "https://www.uplooder.net/img/image/2/addf703a24a12d030968858e0879b11e/moon.svg"
                               : "https://www.uplooder.net/img/image/55/7aa9993fc291bc170abea048589896cf/sun.svg")
        document.body.setAttribute('data-theme', theme);
    }

    return <>
        <div className="theme-container" onClick={switchState}>
            <img className="theme-icon" src={icon} alt="error"/>
        </div>
    </>

}