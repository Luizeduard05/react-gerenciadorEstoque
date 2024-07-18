import { Link } from 'react-router-dom'

import logoPessoa from "../assets/images/pessoa.png"

import "./Navbar.css"

const Navbar = () => {
    return (
        <nav className='navbar'>
            <ul className='navbar-links'>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/add-produto">Adicionar Produto</Link>
                </li>
            </ul>
            <div className="navbar-title">
                <Link to="/">
                    <h2>Stock</h2>
                </Link>
            </div>
            <div className="navbar-logo">
                <img src={logoPessoa} />
            </div>
        </nav>
    )
}

export default Navbar