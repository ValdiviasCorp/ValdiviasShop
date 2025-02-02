import { useState, useEffect } from 'react';
import { useCategories } from '../../hooks/useCategories';
import ProductComponent from '../../components/Product';
import { getProducts, deleteProduct } from '../../services/productService';
import { Product } from '../../types/Product';
import { Link } from 'react-router-dom';
import './Home.css';
import { confirmDelete, showSuccess, showError } from '../../utils/alerts';

const Home = () => {
  const { categories } = useCategories();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const response = await getProducts();
    if (response.status && response.data) {
      setProducts(response.data);
      setError(null);
    } else {
      setError(response.message || 'Error fetching products');
    }
    setLoading(false);
  };

  const handleProductUpdate = async (updatedProduct: Product) => {
    setProducts(products.map(p => 
        p._id === updatedProduct._id ? updatedProduct : p
    ));
    await showSuccess('Price updated successfully!');
  };

  const handleDeleteProduct = async (id: string) => {
    const result = await confirmDelete();
    
    if (result.isConfirmed) {
      const response = await deleteProduct(id);
      if (response.status) {
        setProducts(products.filter(p => p._id !== id));
        await showSuccess('Product deleted successfully!');
      } else {
        await showError(response.message || 'Error deleting product');
      }
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) return <div className="text-center p-5">Loading...</div>;
  if (error) return <div className="text-center p-5 text-danger">{error}</div>;

  return (
    <div className="container py-3 position-relative">
      {/* Desktop Add Button */}
      <Link 
        to="/add-product"
        className="btn btn-success position-absolute top-0 end-0 mt-3 me-3 d-none d-md-block"
      >
        <i className="bi bi-plus-lg"></i> Agregar Producto
      </Link>

      {/* Search and filters */}
      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <select
            className="form-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Todas las Categorías</option>
            {categories.map(category => (
              <option key={category._id} value={category.name}>
                {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Desktop View */}
      <div className="row row-cols-1 row-cols-md-3 g-4 d-none d-md-flex">
        {filteredProducts.map(product => (
          <div key={product._id} className="col">
            <ProductComponent product={product} onUpdate={handleProductUpdate} onDelete={handleDeleteProduct} />
          </div>
        ))}
      </div>

      {/* Mobile View */}
      <div className="d-md-none">
        {filteredProducts.map(product => (
          <ProductComponent key={product._id} product={product} onUpdate={handleProductUpdate} onDelete={handleDeleteProduct} />
        ))}
      </div>

      {/* Mobile Add Button - Fixed at bottom */}
      <Link 
        to="/add-product"
        className="btn btn-success rounded-circle position-fixed bottom-0 end-0 m-4 d-md-none mobile-add-btn"
      >
        <i className="bi bi-plus-lg"></i>
      </Link>
    </div>
  )
}

export default Home