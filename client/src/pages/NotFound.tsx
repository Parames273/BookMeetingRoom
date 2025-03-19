import { Link } from "react-router-dom";

/**
 * @returns A user friendly message for incorrect path visited
 */
const NotFound: React.FC = () => {
    return <div className="flex justify-center items-center h-full flex-col">
        <h1 className="my-auto">Page you are looking for does not exists.</h1>
        <button className="text-primary">
            <Link to='/' replace className="text-primary">
                Back to home
            </Link>
        </button>
    </div>
}

export default NotFound;