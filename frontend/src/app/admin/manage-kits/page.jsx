"use client";
import { useState, useEffect } from "react";
import { PlusCircle, Pencil, Trash2, X } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const ManageKits = () => {
  const [kits, setKits] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentKit, setCurrentKit] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stockQuantity: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchKits();
  }, []);

  const fetchKits = async () => {
    try {
      const response = await axios.get("http://localhost:5000/kit/getall");
      console.log(response.data);
      setKits(response.data);
    } catch (error) {
      console.error("Error fetching kits:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentKit((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const url = isEditing ? `/api/kits/${currentKit._id}` : "/api/kits";
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentKit),
      });

      if (response.ok) {
        fetchKits();
        handleCloseDialog();
      }
    } catch (error) {
      console.error("Error saving kit:", error);
    }
  };

  const handleDelete = async (kitId) => {
    try{
      await axios.delete(`http://localhost:5000/kit/delete/${kitId}`)
      toast.success("Kit deleted successfully");
      fetchKits();
    }catch(error){
      console.error("Error deleting kit:", error);
      toast.error("Failed to delete kit");
    }
    
  };

  const handleEdit = (kit) => {
    setCurrentKit(kit);
    setIsEditing(true);
    setOpenDialog(true);
  };

  const handleOpenDialog = () => {
    setCurrentKit({
      name: "",
      description: "",
      price: "",
      category: "",
      stockQuantity: "",
    });
    setIsEditing(false);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentKit({
      name: "",
      description: "",
      price: "",
      category: "",
      stockQuantity: "",
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-white text-black p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-pink-600">Manage DIY Kits</h1>
        <button
          onClick={handleOpenDialog}
          className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg transition-all shadow-md"
        >
          <PlusCircle size={20} />
          <span>Add New Kit</span>
        </button>
      </div>

      {/* Kit Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kits.map((kit) => (
          <div key={kit._id} className="bg-white border border-pink-100 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-5">
              <img src={kit.image} alt={kit.title} className="w-full h-48"/>
              <h2 className="text-xl font-semibold mb-2 text-pink-700">{kit.title}</h2>
              <p className="text-gray-600 mb-4 line-clamp-3">{kit.description}</p>
              
              <div className="flex flex-col gap-1 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">Price:</span>
                  <span className="font-medium">${kit.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Category:</span>
                  <span className="font-medium">{kit.category}</span>
                </div>

              </div>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => handleEdit(kit)}
                  className="flex items-center gap-1 px-3 py-2 bg-white text-pink-600 border border-pink-300 rounded-md hover:bg-pink-50 transition-colors flex-1"
                >
                  <Pencil size={16} />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(kit._id)}
                  className="flex items-center gap-1 px-3 py-2 bg-white text-black border border-gray-200 rounded-md hover:bg-gray-50 transition-colors flex-1"
                >
                  <Trash2 size={16} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dialog/Modal */}
      {openDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center border-b border-gray-100 p-5">
              <h2 className="text-xl font-bold text-pink-600">
                {isEditing ? "Edit Kit" : "Add New Kit"}
              </h2>
              <button
                onClick={handleCloseDialog}
                className="text-gray-400 hover:text-black"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-5">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={currentKit.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={currentKit.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={currentKit.price}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={currentKit.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    name="stockQuantity"
                    value={currentKit.stockQuantity}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                  />
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-100 p-5 flex justify-end gap-3">
              <button
                onClick={handleCloseDialog}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition-colors"
              >
                {isEditing ? "Update" : "Add Kit"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Empty state - shown when there are no kits */}
      {kits.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-pink-50 p-6 rounded-full mb-4">
            <PlusCircle size={40} className="text-pink-400" />
          </div>
          <h3 className="text-xl font-medium text-gray-800 mb-2">No DIY kits yet</h3>
          <p className="text-gray-500 mb-6 max-w-md">
            Start by adding your first DIY kit using the "Add New Kit" button above.
          </p>
          <button
            onClick={handleOpenDialog}
            className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-2 rounded-lg transition-all shadow-md"
          >
            Add Your First Kit
          </button>
        </div>
      )}
    </div>
  );
};

export default ManageKits;