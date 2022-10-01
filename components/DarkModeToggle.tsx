import { useEffect, useState } from "react"
import { Form } from "react-bootstrap"
import { FaSun, FaMoon } from "react-icons/fa"
import { useCookies } from "react-cookie"

const DarkModeToggle = () => {

    const [cookies, setCookie] = useCookies(['darkMode'])
    const [darkMode, setDarkMode] = useState(false)

    const updateDarkMode = (nowDark) => {
        setDarkMode(nowDark)

        if (nowDark) {
            document.querySelector("html").classList.add("dark")
        } else {
            document.querySelector("html").classList.remove("dark")
        }
    }

    useEffect(() => {
        updateDarkMode(cookies.darkMode === 'true' ? true : false)
    })

    const handleChange = (value) => {
        const nowDark = value.target.checked

        updateDarkMode(nowDark)
        setCookie('darkMode', nowDark, { path: '/' })
    }

    return (
        <Form.Check
            type="switch"
            label={!darkMode ? <FaSun className="mb-1 mr-3"/> : <FaMoon className="mb-1 mr-3"/>}
            id="dark-mode-switch"
            checked={darkMode} onChange={handleChange}/>
    )
}

export default DarkModeToggle