import "../css/covercomponent.css";

function CoverComponent() {
    return (
        <div className="cover-container">
            <img src="../images/cover-pic.jpg" alt="cover-pic"/>
            <h4 className="cover-title">Ready For Your Next Vacation ?</h4>
            <div className="search-container">
                <form className="d-flex search-bar">
                    <input className="form-control col-8 me-2 search-input" type="text" placeholder="Search"/>
                    <button className="btn btn-primary search-button" type="button">
                        <span className="material-symbols-outlined">search</span>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CoverComponent;