function OneUser ({prop}) {
   // console.log("ver esto ",prop)
    return (
        <div>
            { prop.map ((e) => {
                return(
                    <div>
                        <h3>{e.name}</h3>
                        <h3>{e.surname}</h3>
                        <h3>{e.email}</h3>
                    </div>
                )
            })

            }
        </div>
)}

export default OneUser;