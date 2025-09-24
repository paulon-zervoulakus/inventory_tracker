import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { apiClient } from '../services/apiClient';
import { 
  Package, 
  TrendingUp, 
  DollarSign, 
  Plus,
  Search,
  Filter,
  Bell,
  Settings,
  ChevronDown,
  Eye,
  Edit,
  Trash2
} from "lucide-react";

interface Item {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

export function Dashboard() {
  const { user, logout } = useAuth();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await apiClient.get("/api/items");
        setItems(response.data);
      } catch (err) {
        console.error("Failed to fetch items:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  // Calculate statistics with null checks
  const totalItems = items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  const totalValue = items?.reduce((sum, item) => sum + (item.quantity * item.price), 0) || 0;
  const lowStockItems = items?.filter(item => item.quantity < 10).length || 0;

  const filteredItems = items?.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="min-h-screen h-screen w-screen bg-slate-50 font-sans overflow-x-hidden">
      {/* Navbar */}
      <nav className="bg-white shadow-lg border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg text-white">
              <Package size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 m-0">StockFlow</h2>
              <p className="text-xs text-gray-500 m-0">Inventory Manager</p>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="hidden md:flex items-center bg-slate-100 rounded-full px-4 py-2 w-64">
              <Search size={16} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search inventory..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent border-none outline-none text-sm text-gray-700 w-full ml-2"
              />
            </div>

            {/* Notification */}
            <button className="relative p-2 bg-transparent border-none rounded-full cursor-pointer text-gray-500 transition-all duration-200 hover:bg-slate-100 hover:text-gray-700">
              <Bell size={20} />
              <div className="absolute top-0.5 right-0.5 w-3 h-3 bg-red-500 rounded-full"></div>
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-3 p-2 bg-transparent border-none rounded-lg cursor-pointer transition-colors duration-200 hover:bg-slate-100"
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                      src={user?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
                      alt={user?.name || "User"}
                    />
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-semibold text-gray-900 m-0">
                      {user?.name || "John Doe"}
                    </p>
                    <p className="text-xs text-gray-500 m-0">Administrator</p>
                  </div>
                </div>
                <ChevronDown size={16} className="text-gray-400" />
              </button>

              {/* Dropdown */}
              {showUserMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-10">
                  <button className="flex items-center w-full px-4 py-2 text-sm bg-transparent border-none cursor-pointer transition-colors duration-200 hover:bg-gray-50">
                    <Settings size={16} className="mr-2" />
                    Settings
                  </button>
                  <div className="border-t border-gray-200 my-1"></div>
                  <button
                    onClick={logout}
                    className="flex items-center w-full px-4 py-2 text-sm bg-transparent border-none cursor-pointer transition-colors duration-200 hover:bg-gray-50 text-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-8">
        {/* Welcome */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name?.split(' ')[0] || 'there'}! 👋
          </h2>
          <p className="text-gray-500 m-0">Here's what's happening with your inventory today.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500 m-0">Total Items</p>
                <p className="text-3xl font-bold text-gray-900 my-1">{totalItems.toLocaleString()}</p>
                <p className="text-sm text-green-600 m-0">↗ +12% from last month</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <Package size={32} className="text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500 m-0">Total Value</p>
                <p className="text-3xl font-bold text-gray-900 my-1">${totalValue.toLocaleString()}</p>
                <p className="text-sm text-green-600 m-0">↗ +8% from last month</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <DollarSign size={32} className="text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500 m-0">Low Stock Alert</p>
                <p className="text-3xl font-bold text-gray-900 my-1">{lowStockItems}</p>
                <p className="text-sm text-orange-600 m-0">Items need restocking</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <TrendingUp size={32} className="text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Inventory Section */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 m-0">Inventory Items</h3>
                <p className="text-gray-500 mt-1 m-0">{filteredItems.length} items found</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border-none cursor-pointer transition-all duration-200 bg-slate-100 text-slate-700 hover:bg-slate-200">
                  <Filter size={16} />
                  Filter
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border-none cursor-pointer transition-all duration-200 bg-blue-600 text-white shadow-sm hover:bg-blue-700">
                  <Plus size={16} />
                  Add Item
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="text-center py-12">
                <Package size={48} className="mx-auto mb-4 text-gray-400" />
                <p className="text-lg text-gray-500 mb-2">No items found</p>
                <p className="text-gray-400 m-0">Try adjusting your search or add new items</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredItems.map((item) => (
                  <div key={item.id} className="bg-slate-50 rounded-lg p-5 border border-slate-200 transition-all duration-300 relative group hover:shadow-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-2 transition-colors duration-200 group-hover:text-blue-600">
                          {item.name}
                        </h4>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-500">Qty: {item.quantity}</span>
                          <span className="text-sm font-medium text-green-700">${item.price.toFixed(2)}</span>
                        </div>
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button className="p-1.5 bg-transparent border-none rounded cursor-pointer text-gray-400 transition-all duration-200 hover:bg-gray-100">
                          <Eye size={16} />
                        </button>
                        <button className="p-1.5 bg-transparent border-none rounded cursor-pointer text-gray-400 transition-all duration-200 hover:bg-gray-100">
                          <Edit size={16} />
                        </button>
                        <button className="p-1.5 bg-transparent border-none rounded cursor-pointer text-gray-400 transition-all duration-200 hover:bg-gray-100">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className={`w-2 h-2 rounded-full ${
                            item.quantity > 50 ? 'bg-green-500' : 
                            item.quantity > 10 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                        ></div>
                        <span className="text-xs text-gray-500">
                          {item.quantity > 50 ? 'In Stock' : 
                           item.quantity > 10 ? 'Low Stock' : 'Critical'}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        ${(item.quantity * item.price).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}