import { useEffect, useState, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import apiService from "../../http";
import { toast } from "react-toastify";

const Found = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const itemsPerPage = 5;
  const isFetching = useRef(false);

  const fetchItems = useCallback(async () => {
    if (isFetching.current) return;
    isFetching.current = true;
    setIsLoading(true);
    
    const toastId = toast.loading("Fetching found items...");
    
    try {
      const response = await apiService.get("/api/items/notapproved/found", {
        params: {
          page: currentPage,
          limit: itemsPerPage,
        },
      });
      
      toast.update(toastId, {
        render: "Found items fetched successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000
      });
      
      setItems(response.data.items);
      setTotal(response.data.total);
    } catch (err) {
      console.error("Error fetching found items:", err);
      toast.update(toastId, {
        render: "Error fetching found items!",
        type: "error",
        isLoading: false,
        autoClose: 3000
      });
    } finally {
      setIsLoading(false);
      isFetching.current = false;
    }
  }, [currentPage, itemsPerPage]);

useEffect(() => {
  fetchItems();
}, [fetchItems]);



  const handleApprove = async (id) => {
    try {
      const response = await apiService.patch(`/api/items/${id}`, { status: "Approved" });
      fetchItems();
      
      if (response) {
        setItems((prevItems) =>
          prevItems.map((item) =>
            item.ItemID === id ? { ...item, approved: true } : item
          )
        );
        toast.success("Item approved successfully!");
      }
    } catch (error) {
      console.error("Error approving item:", error);
      toast.error("Failed to approve the item.");
    }
  };

  const handleRemove = async (id) => {
    try {
      await apiService.delete(`/api/items/${id}`);
      setItems((prevItems) => prevItems.filter((item) => item.ItemID !== id));
      toast.success("Item removed successfully!");
      fetchItems();
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Failed to remove the item.");
    }
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(total / itemsPerPage)));
  };

  return (
    <div className="min-h-screen px-4 py-8 bg-gray-50 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="mb-8 text-4xl font-bold text-primary">Found Items</h1>

        {isLoading ? (
          <div className="flex justify-center">Loading...</div>
        ) : items.length === 0 ? (
          <div className="p-4 text-gray-500 rounded-md bg-gray-50">No found items</div>
        ) : (
          <>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.ItemID} className="p-4 border rounded-md shadow-sm">
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p className="text-sm text-gray-700">{item.Description}</p>
                  <p className="text-sm text-gray-700">Contact: {item.ContactNo}</p>
                  <p className="text-xs text-gray-500">{item.createdAt}</p>
                  <div className="mt-2 flex justify-between">
                    <button
                      onClick={() => handleApprove(item.ItemID)}
                      disabled={item.approved}
                      className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 disabled:bg-gray-400"
                    >
                      {item.approved ? "Approved" : "Approve"}
                    </button>
                    <button
                      onClick={() => handleRemove(item.ItemID)}
                      className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
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

export default Found;