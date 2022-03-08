import { TailSpin } from "react-loader-spinner";
import './index.scss';

const Spinner = () => { 
    return (
        <div className="loading-bg">
            <TailSpin 
                height={100}
                width={100}
                color="#00BFFF"
                ariaLabel='loading'
            />
        </div>
    )
}

export default Spinner;