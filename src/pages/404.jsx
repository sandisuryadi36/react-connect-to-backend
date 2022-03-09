import { Link } from "react-router-dom";

export default function NoPage() {
    return (
        <div className="content">
            <h1>404</h1>
            <p>Page not found!</p>
            <Link to="/">Back to Home</Link>
        </div>
    );
}