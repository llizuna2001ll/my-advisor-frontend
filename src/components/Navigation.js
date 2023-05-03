import '../css/navbar.css';

function Navigation() {

    return (
        <nav className="navbar navbar-expand-sm navigation-container text-center">
            <div className="nav-logo">
                <h3>MyAdvisor.com</h3>
            </div>
            <form className="d-flex search-bar">
                <input className="form-control col-8 me-2 search-input" type="text" placeholder="Search"/>
                <button className="btn btn-primary search-button" type="button">
                        <span className="material-symbols-outlined">search</span>
                </button>
            </form>
            <div className="container-fluid d-flex flex-row-reverse">
                <a className="navbar-brand">
                    <img src="../images/img_avatar1.png" alt="Avatar Logo" width="40px" className="rounded-pill"/>
                </a>
            </div>
        </nav>
    );
}

export default Navigation;