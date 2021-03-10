import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

class LogoutComponent extends Component {
    render() {
        return (
            <>
                <h1>You are logged out</h1>
                <div className="container">
                    Thank You for Using Our Application.<Link className="nav-link" to="/login">Login</Link> again.
                </div>
            </>
        )
    }
}

export default withRouter(LogoutComponent)