import Link from "next/link"
import React from "react"
import { Alert } from "react-bootstrap"

const BetaNotice = () => {
    return (
        <Alert variant="info" className="mb-4">
            This website is in beta, please consider <Link href="/feedback">leaving feedback</Link> to help improve it
        </Alert>
    )
}

export default BetaNotice