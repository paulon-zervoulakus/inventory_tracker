import React, { useEffect, useState } from "react";
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

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    },
    navbar: {
      backgroundColor: 'white',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      borderBottom: '1px solid #e2e8f0',
      position: 'sticky' as const,
      top: 0,
      zIndex: 50
    },
    navContainer: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '0 1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '64px'
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    logoIcon: {
      padding: '8px',
      backgroundColor: '#2563eb',
      borderRadius: '8px',
      color: 'white'
    },
    logoText: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#1f2937',
      margin: 0
    },
    logoSubtext: {
      fontSize: '12px',
      color: '#6b7280',
      margin: 0
    },
    navRight: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    },
    searchContainer: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#f1f5f9',
      borderRadius: '25px',
      padding: '8px 16px',
      width: '250px'
    },
    searchInput: {
      backgroundColor: 'transparent',
      border: 'none',
      outline: 'none',
      fontSize: '14px',
      color: '#374151',
      width: '100%',
      marginLeft: '8px'
    },
    notificationBtn: {
      position: 'relative' as const,
      padding: '8px',
      backgroundColor: 'transparent',
      border: 'none',
      borderRadius: '50%',
      cursor: 'pointer',
      color: '#6b7280',
      transition: 'all 0.2s'
    },
    notificationDot: {
      position: 'absolute' as const,
      top: '2px',
      right: '2px',
      width: '12px',
      height: '12px',
      backgroundColor: '#ef4444',
      borderRadius: '50%'
    },
    userMenu: {
      position: 'relative' as const
    },
    userBtn: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '8px',
      backgroundColor: 'transparent',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    userInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    userAvatar: {
      position: 'relative' as const
    },
    avatarImg: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      border: '2px solid white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    statusDot: {
      position: 'absolute' as const,
      bottom: '0',
      right: '0',
      width: '12px',
      height: '12px',
      backgroundColor: '#10b981',
      border: '2px solid white',
      borderRadius: '50%'
    },
    userDetails: {
      textAlign: 'left' as const
    },
    userName: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#1f2937',
      margin: 0
    },
    userRole: {
      fontSize: '12px',
      color: '#6b7280',
      margin: 0
    },
    dropdown: {
      position: 'absolute' as const,
      right: 0,
      top: '100%',
      marginTop: '8px',
      width: '190px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      border: '1px solid #e5e7eb',
      padding: '4px 0',
      zIndex: 10
    },
    dropdownItem: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      padding: '8px 16px',
      fontSize: '14px',
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    main: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '32px 16px'
    },
    welcome: {
      marginBottom: '32px'
    },
    welcomeTitle: {
      fontSize: '30px',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '8px'
    },
    welcomeText: {
      color: '#6b7280',
      margin: 0
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '24px',
      marginBottom: '32px'
    },
    statCard: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '24px',
      border: '1px solid #e5e7eb',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease'
    },
    statCardInner: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    statInfo: {
      flex: 1
    },
    statLabel: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#6b7280',
      margin: 0
    },
    statValue: {
      fontSize: '30px',
      fontWeight: 'bold',
      color: '#1f2937',
      margin: '4px 0'
    },
    statChange: {
      fontSize: '14px',
      color: '#10b981',
      margin: 0
    },
    statIcon: {
      padding: '12px',
      borderRadius: '8px'
    },
    inventorySection: {
      backgroundColor: 'white',
      borderRadius: '12px',
      border: '1px solid #e5e7eb',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
    },
    sectionHeader: {
      padding: '24px',
      borderBottom: '1px solid #e5e7eb'
    },
    headerContent: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap' as const,
      gap: '16px'
    },
    headerInfo: {
      flex: 1
    },
    sectionTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#1f2937',
      margin: 0
    },
    itemCount: {
      color: '#6b7280',
      marginTop: '4px',
      margin: 0
    },
    headerActions: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    btn: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 16px',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '500',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    btnSecondary: {
      backgroundColor: '#f1f5f9',
      color: '#475569'
    },
    btnPrimary: {
      backgroundColor: '#2563eb',
      color: 'white',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
    },
    content: {
      padding: '24px'
    },
    loading: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '48px 0'
    },
    spinner: {
      width: '48px',
      height: '48px',
      border: '4px solid #e5e7eb',
      borderTop: '4px solid #2563eb',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    },
    emptyState: {
      textAlign: 'center' as const,
      padding: '48px 0'
    },
    emptyIcon: {
      margin: '0 auto 16px',
      color: '#9ca3af'
    },
    emptyTitle: {
      fontSize: '18px',
      color: '#6b7280',
      marginBottom: '8px'
    },
    emptyText: {
      color: '#9ca3af',
      margin: 0
    },
    itemsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
      gap: '16px'
    },
    itemCard: {
      backgroundColor: '#f8fafc',
      borderRadius: '8px',
      padding: '20px',
      border: '1px solid #e2e8f0',
      transition: 'all 0.3s ease',
      position: 'relative' as const
    },
    itemHeader: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginBottom: '12px'
    },
    itemInfo: {
      flex: 1
    },
    itemName: {
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '8px',
      transition: 'color 0.2s'
    },
    itemDetails: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    },
    itemQuantity: {
      fontSize: '14px',
      color: '#6b7280'
    },
    itemPrice: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#059669'
    },
    itemActions: {
      display: 'flex',
      gap: '4px',
      opacity: 0,
      transition: 'opacity 0.2s'
    },
    actionBtn: {
      padding: '6px',
      backgroundColor: 'transparent',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      color: '#9ca3af',
      transition: 'all 0.2s'
    },
    itemFooter: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    statusIndicator: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    statusDot2: {
      width: '8px',
      height: '8px',
      borderRadius: '50%'
    },
    statusText: {
      fontSize: '12px',
      color: '#6b7280'
    },
    totalValue: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#374151'
    }
  };

  return (
    <div style={styles.container}>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .stat-card:hover { 
          transform: translateY(-2px); 
          box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.15); 
        }
        .item-card:hover { 
          box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.15); 
        }
        .item-card:hover .item-actions { 
          opacity: 1; 
        }
        .item-card:hover .item-name { 
          color: #2563eb; 
        }
        .user-btn:hover { 
          background-color: #f1f5f9; 
        }
        .notification-btn:hover { 
          background-color: #f1f5f9; 
          color: #374151; 
        }
        .dropdown-item:hover { 
          background-color: #f9fafb; 
        }
        .btn-secondary:hover { 
          background-color: #e2e8f0; 
        }
        .btn-primary:hover { 
          background-color: #1d4ed8; 
        }
        .action-btn:hover { 
          background-color: #f3f4f6; 
        }
        @media (max-width: 768px) {
          .search-container { display: none; }
          .user-details { display: none; }
          .header-content { flex-direction: column; align-items: stretch; }
          .stats-grid { grid-template-columns: 1fr; }
          .items-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.navContainer}>
          {/* Logo */}
          <div style={styles.logo}>
            <div style={styles.logoIcon}>
              <Package size={24} />
            </div>
            <div>
              <h1 style={styles.logoText}>StockFlow</h1>
              <p style={styles.logoSubtext}>Inventory Manager</p>
            </div>
          </div>

          {/* Right Side */}
          <div style={styles.navRight}>
            {/* Search */}
            <div style={styles.searchContainer} className="search-container">
              <Search size={16} color="#9ca3af" />
              <input
                type="text"
                placeholder="Search inventory..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.searchInput}
              />
            </div>

            {/* Notification */}
            <button style={styles.notificationBtn} className="notification-btn">
              <Bell size={20} />
              <div style={styles.notificationDot}></div>
            </button>

            {/* User Menu */}
            <div style={styles.userMenu}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                style={styles.userBtn}
                className="user-btn"
              >
                <div style={styles.userInfo}>
                  <div style={styles.userAvatar}>
                    <img
                      style={styles.avatarImg}
                      src={user?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
                      alt={user?.name || "User"}
                    />
                    <div style={styles.statusDot}></div>
                  </div>
                  <div style={styles.userDetails} className="user-details">
                    <p style={styles.userName}>
                      {user?.name || "John Doe"}
                    </p>
                    <p style={styles.userRole}>Administrator</p>
                  </div>
                </div>
                <ChevronDown size={16} color="#9ca3af" />
              </button>

              {/* Dropdown */}
              {showUserMenu && (
                <div style={styles.dropdown}>
                  <button style={styles.dropdownItem} className="dropdown-item">
                    <Settings size={16} style={{marginRight: '8px'}} />
                    Settings
                  </button>
                  <div style={{borderTop: '1px solid #e5e7eb', margin: '4px 0'}}></div>
                  <button
                    onClick={logout}
                    style={{...styles.dropdownItem, color: '#dc2626'}}
                    className="dropdown-item"
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
      <main style={styles.main}>
        {/* Welcome */}
        <div style={styles.welcome}>
          <h2 style={styles.welcomeTitle}>
            Welcome back, {user?.name?.split(' ')[0] || 'there'}! 👋
          </h2>
          <p style={styles.welcomeText}>Here's what's happening with your inventory today.</p>
        </div>

        {/* Stats */}
        <div style={styles.statsGrid} className="stats-grid">
          <div style={styles.statCard} className="stat-card">
            <div style={styles.statCardInner}>
              <div style={styles.statInfo}>
                <p style={styles.statLabel}>Total Items</p>
                <p style={styles.statValue}>{totalItems.toLocaleString()}</p>
                <p style={styles.statChange}>↗ +12% from last month</p>
              </div>
              <div style={{...styles.statIcon, backgroundColor: '#dbeafe'}}>
                <Package size={32} color="#2563eb" />
              </div>
            </div>
          </div>

          <div style={styles.statCard} className="stat-card">
            <div style={styles.statCardInner}>
              <div style={styles.statInfo}>
                <p style={styles.statLabel}>Total Value</p>
                <p style={styles.statValue}>${totalValue.toLocaleString()}</p>
                <p style={styles.statChange}>↗ +8% from last month</p>
              </div>
              <div style={{...styles.statIcon, backgroundColor: '#dcfce7'}}>
                <DollarSign size={32} color="#16a34a" />
              </div>
            </div>
          </div>

          <div style={styles.statCard} className="stat-card">
            <div style={styles.statCardInner}>
              <div style={styles.statInfo}>
                <p style={styles.statLabel}>Low Stock Alert</p>
                <p style={styles.statValue}>{lowStockItems}</p>
                <p style={{...styles.statChange, color: '#ea580c'}}>Items need restocking</p>
              </div>
              <div style={{...styles.statIcon, backgroundColor: '#fed7aa'}}>
                <TrendingUp size={32} color="#ea580c" />
              </div>
            </div>
          </div>
        </div>

        {/* Inventory Section */}
        <div style={styles.inventorySection}>
          {/* Header */}
          <div style={styles.sectionHeader}>
            <div style={styles.headerContent} className="header-content">
              <div style={styles.headerInfo}>
                <h3 style={styles.sectionTitle}>Inventory Items</h3>
                <p style={styles.itemCount}>{filteredItems.length} items found</p>
              </div>
              <div style={styles.headerActions}>
                <button style={{...styles.btn, ...styles.btnSecondary}} className="btn-secondary">
                  <Filter size={16} />
                  Filter
                </button>
                <button style={{...styles.btn, ...styles.btnPrimary}} className="btn-primary">
                  <Plus size={16} />
                  Add Item
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div style={styles.content}>
            {loading ? (
              <div style={styles.loading}>
                <div style={styles.spinner}></div>
              </div>
            ) : filteredItems.length === 0 ? (
              <div style={styles.emptyState}>
                <Package size={48} style={styles.emptyIcon} />
                <p style={styles.emptyTitle}>No items found</p>
                <p style={styles.emptyText}>Try adjusting your search or add new items</p>
              </div>
            ) : (
              <div style={styles.itemsGrid} className="items-grid">
                {filteredItems.map((item) => (
                  <div key={item.id} style={styles.itemCard} className="item-card">
                    <div style={styles.itemHeader}>
                      <div style={styles.itemInfo}>
                        <h4 style={styles.itemName} className="item-name">
                          {item.name}
                        </h4>
                        <div style={styles.itemDetails}>
                          <span style={styles.itemQuantity}>Qty: {item.quantity}</span>
                          <span style={styles.itemPrice}>${item.price.toFixed(2)}</span>
                        </div>
                      </div>
                      <div style={styles.itemActions} className="item-actions">
                        <button style={styles.actionBtn} className="action-btn">
                          <Eye size={16} />
                        </button>
                        <button style={styles.actionBtn} className="action-btn">
                          <Edit size={16} />
                        </button>
                        <button style={styles.actionBtn} className="action-btn">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    
                    <div style={styles.itemFooter}>
                      <div style={styles.statusIndicator}>
                        <div 
                          style={{
                            ...styles.statusDot2,
                            backgroundColor: item.quantity > 50 ? '#10b981' : 
                                           item.quantity > 10 ? '#f59e0b' : '#ef4444'
                          }}
                        ></div>
                        <span style={styles.statusText}>
                          {item.quantity > 50 ? 'In Stock' : 
                           item.quantity > 10 ? 'Low Stock' : 'Critical'}
                        </span>
                      </div>
                      <span style={styles.totalValue}>
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