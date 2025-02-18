import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import apiService from "../../http";
import { toast } from "react-toastify";;

const Lost = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const itemsPerPage = 5;
  
  const fetchItems = async () => {
    setIsLoading(true);
    try {
      // Simulate fetching data from API
      // const mockItems = [
      //   { id: 1, Title: "Lost Wallet", Description: "Black leather wallet", contactNumber: "123456789", createdAt: "2023-01-10", approved: false },
      //   { id: 3, Title: "Lost Watch", Description: "Silver wristwatch", contactNumber: "987654321", createdAt: "2023-02-01", approved: false },
      //   { id: 5, Title: "Lost Keychain", Description: "Leather keychain with keys", contactNumber: "555666777", createdAt: "2023-03-05", approved: false },
      // ];

      //Get lost form the backend
 
          const response = await apiService.get("/api/items/notapproved/lost", {
            params: {
              page: currentPage,
              limit: itemsPerPage,
            },});
         console.log(response.data.items);

         toast.success("Lost Item fetched successfully!");

      setItems(response.data.items);
      setTotal(response.data.items.length); // Assuming total length of mock data
    } catch (err) {
      console.error("Error fetching items:", err);
      toast.error("Error fetching Lost items!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [currentPage]);

  const handleApprove = async (id) => {
    try {
      // Send PATCH request to update the item status
      const response = await apiService.patch(`/api/items/${id}`, { status: "Approved" });
      console.log("id",id);
      fetchItems();
    
  
      if (response) {
        // Update the item in the local state
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
      // Send DELETE request to the server
      await apiService.delete(`/api/items/${id}`);
   
      // Remove the item from the local state after successful deletion
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
        <h1 className="mb-8 text-4xl font-bold text-primary">Lost Items</h1>

        {isLoading ? (
          <div className="flex justify-center">
            <div>Loading...</div>
          </div>
        ) : items.length === 0 ? (
          <div className="p-4 text-gray-500 rounded-md bg-gray-50">
            No items found
          </div>
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

export default Lost;
