import Lottie from "lottie-react";
import animation from "@assets/Animation.json";


function Loading() {
    return (
        <div className="d-flex justify-content-center align-item-center">
            <span style={{width: 256}}>
                <Lottie animationData={animation} />
            </span>
        </div>
    );
}
export default Loading;