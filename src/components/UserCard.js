import "../css/user-card.css"
function UserCard() {
    return (
        <>
            <div className="user-card">
                    <img width={200} height={200} className="rounded-circle" src="../images/profilePics/izuna-test1.jpg"/>
                    <div className="user-card-info">
                        <h4>izuna-test1</h4>
                        <p>Casablanca</p>
                    </div>
            </div>
        </>
    )
}

export default UserCard