import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnnouncements } from "../../../store/actions/announcementActions";
import Loader from "../../../components/Loader";
import LostItems from "../components/LostItems";
import { ChevronLeft, ChevronRight } from "lucide-react";

const News = () => {
  const dispatch = useDispatch();
  const { announcements, isLoading, error, total } = useSelector(
    (state) => state.announcements
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(fetchAnnouncements(currentPage, itemsPerPage));
  }, [dispatch, currentPage]);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) =>
      Math.min(prev + 1, Math.ceil(total / itemsPerPage))
    );
  };

  return (
    <div className="min-h-screen px-4 py-8 bg-gray-50 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="mb-8 text-4xl font-bold text-primary">News</h1>

        {isLoading ? (
          <div className="flex justify-center">
            <Loader />
          </div>
        ) : error ? (
          <div className="p-4 text-red-500 rounded-md bg-red-50">{error}</div>
        ) : announcements.length === 0 ? (
          <div className="p-4 text-gray-500 rounded-md bg-gray-50">
            No announcements found
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {announcements.map((item) => (
                <LostItems key={item.ID} item={item} />
              ))}
            </div>

            <div className="flex items-center justify-between mt-8">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </button>

              <div className="text-sm text-gray-700">Page {currentPage}</div>

              <button
                onClick={handleNextPage}
                disabled={currentPage === Math.ceil(total / itemsPerPage)}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default News;
