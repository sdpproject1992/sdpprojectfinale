export default function SaveItem(data) {

    let complexity = data.complexity
    let date = data.date
    let rating = data.rating
    let code = data.code
    let user = data.name

    return (
        <div style={{ display: "flex", justifyContent: "space-between", color: "black", marginTop: "5px", width: "100%" }}>
        <div style={{ width: "20%" }}>
            <label>{date}</label>
        </div>
        <div style={{ width: "20%" }}>
            <label>{complexity}</label>
        </div>
        <div style={{ width: "20%" }}>
            <label>{rating}</label>
        </div>
        <div style={{ width: "20%" }}>
            <label>{user}</label>
        </div>
        <div style={{ width: "20%", textAlign: "right" }}>
            <button style={{ borderRadius: "10px" }} onClick={() => {
                document.getElementById("textArea1").value = code;
            }}>Load Code</button>
        </div>
    </div>

    )
}