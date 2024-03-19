export default function SaveItem(data) {

    let complexity = data.complexity
    let date = data.date
    let rating = data.rating
    let code = data.code
console.log(code)

    return (
        <div style={{ display: "flex", justifyContent: "space-between", color: "black", marginTop:"5px"}}>
            <label>{date}</label>
            <label>{complexity}</label>
            <label>{rating}</label>
            <button style={{borderRadius:"10px"}} onClick={() => {
                document.getElementById("textArea1").value = code;
            }}>Load Code</button>
        </div>

    )
}