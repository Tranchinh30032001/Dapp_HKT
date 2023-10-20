import { Link } from "react-router-dom";

function Card({ featured_image, name, content, id }) {
  return (
    <Link to={`detail/${id}`} className="">
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div>
          <img className="rounded-t-lg" src={featured_image} alt="" />
        </div>
        <div className="p-5">
          <div>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white truncate">{name}</h5>
          </div>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 h-[120px] overflow-hidden truncate-text">
            {content}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default Card;
