import { Link } from "react-router-dom";
export default function CardCategory({ id, name, imageUrl }) {
  return (
    <Link to={`/category/${id}`}>
      <div className="w-full h-32 md:w-64 md:h-48 shadow-none rounded-lg overflow-hidden hover:shadow-none transition-shadow duration-300 relative">
        <div className="relative h-full w-full">
          <img
            src={imageUrl}
            alt={name}
            className="object-cover h-full w-full"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 md:bg-opacity-50 hover:opacity-100 transition-opacity duration-300 md:opacity-0">
            <h5 className="text-white text-base md:text-2xl font-bold text-center">{name}</h5>
          </div>
        </div>
      </div>
    </Link>
  );
}
