import React from "react";
import PreloaderImage from "../../assets/images/preloader.gif";

let Preloader: React.FC = () => {
    return <div>
        <img src={PreloaderImage} />
    </div>
}

export default Preloader;