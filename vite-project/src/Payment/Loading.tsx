import "./Loading.css"
const Loading = () => {
    return(
        <div className={"loading d-flex align-content-center justify-content-center h-100"}>
            <div className={"spinner"}></div>
            <p>Đang xử lý...</p>
        </div>
    )
}
export default Loading;
