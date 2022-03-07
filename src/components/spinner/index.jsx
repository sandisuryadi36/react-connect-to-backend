import { Oval } from "react-loader-spinner";
import './index.scss';

const Spinner = () => { 
    return (
        <div className="loading-bg">
            <Oval 
                height={100}
                width={100}
                color="#00BFFF"
                loading={true}
            />
        </div>
    )
}

export default Spinner;