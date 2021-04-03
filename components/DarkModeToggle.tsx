import { useState } from "react"
import { Form } from "react-bootstrap"
import { FaSun, FaMoon } from "react-icons/fa"

const DarkModeToggle = () => {

    const [light, setLight] = useState(true)

    const handleChange = (value) => {

        let nowLight = !value.target.checked
        setLight(nowLight)
        
        if (nowLight) {
            document.querySelector("html").classList.remove("dark")
        } else {
            document.querySelector("html").classList.add("dark")
        }
    }

    return (
        <Form.Check
            type="switch"
            label={light ? <FaSun className="mb-1 mr-3"/> : <FaMoon className="mb-1 mr-3"/>}
            id="dark-mode-switch"
            checked={!light} onChange={handleChange}/>
    )
}

export default DarkModeToggle