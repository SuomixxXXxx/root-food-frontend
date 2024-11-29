import { Link } from "react-router-dom";
export default function DashboardCategoryCard ({ id, name, imageUrl }) {
    console.log("url:", imageUrl);
    return (
        <Link to={`/dashboard/category/${id}`}>
            <div className="w-full h-32 md:w-64 md:h-48 shadow-none rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300 relative">
                <div className="relative h-full w-full">
                    <img
                        src={imageUrl}
                        alt={name}
                        className="object-cover h-full w-full"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 hover:bg-opacity-75 transition-opacity duration-300">
                        <h5 className="text-white text-base md:text-2xl font-bold text-center">{name}</h5>
                    </div>
                </div>
            </div>
        </Link>
    );
}