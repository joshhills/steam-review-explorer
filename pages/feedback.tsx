import Link from "next/link";
import React from "react";
import { Breadcrumb } from "react-bootstrap";

export default function Feedback() {
    return (<>
        <div className="bg-light rounded-3 p-3 mb-4">
            <Breadcrumb className="mb-0">
                <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                <Breadcrumb.Item active>Feedback</Breadcrumb.Item>
            </Breadcrumb>
        </div>
        <iframe width="10000px" height="10000px" src="https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAMAADny5iJUNVhGQ1lJVkVQQkk2MTNBT0lUUE5CQ0dPVC4u&embed=true" style={{border: 'none', maxWidth: '100%', maxHeight: '100vh'}} allowFullScreen></iframe>
    </>)
}