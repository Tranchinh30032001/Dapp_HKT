import { routes } from "../routes";
import Card from "./Card";
import useGetApi from "../utils/hooks/useGetApi";
import { useEffect, useState } from "react";
import Pagination from "./common/Panigation";

const NUMBER_ITEM_PAGE = 8;

function BodyQuest() {
  const res = useGetApi(routes.quest.getCollection);
  const data = res?.data;
  // const data = "";
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [currentData, setCurrentData] = useState([]);

  useEffect(() => {
    handlePages();
  }, [data, currentPage]);

  const handlePages = () => {
    const total = Math.ceil(data?.length / NUMBER_ITEM_PAGE);
    const indexOfLastItem = currentPage * NUMBER_ITEM_PAGE;
    const indexOfFirstItem = indexOfLastItem - NUMBER_ITEM_PAGE;
    const currentData = data?.slice(indexOfFirstItem, indexOfLastItem);
    setCurrentData(currentData);
    setTotalPage(total);
  };

  return (
    <div className="container">
      <h1 className="px-2 text-[20px] md:text-[30px] text-white border-b-2 border-[#0E21A0] mb-12 pb-2">Campaign</h1>
      <div className="px-2 grid grid-cols-1 md:grid-cols-4 gap-4">
        {currentData?.map((item, index) => {
          return <Card {...item} key={index} />;
        })}
      </div>

      <div className="mt-12 mb-4">
        {currentData?.length > 0 && (
          <Pagination pages={totalPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
        )}
      </div>
    </div>
  );
}

export default BodyQuest;
