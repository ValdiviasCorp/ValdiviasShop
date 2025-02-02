import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../../services/productService';
import { useCategories } from '../../hooks/useCategories';
import CategoryInput from '../../components/CategoryInput';
import { Product } from '../../types/Product';
import './AddProduct.css';

type ProductFormData = Omit<Product, '_id'>;

const AddProduct = () => {
  const navigate = useNavigate();
  const { categories, addCategory } = useCategories();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    price: 0,
    category: '',  // Initialize with empty string
    image: ''      // Initialize with empty string
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const normalizedCategory = formData.category.trim().toLowerCase();
    if (!categories.find(cat => cat.name === normalizedCategory)) {
      const success = await addCategory(normalizedCategory);
      if (!success) {
        setError('Failed to create new category');
        setLoading(false);
        return;
      }
    }

    try {
      const response = await createProduct({
        ...formData,
        category: normalizedCategory
      });

      if (response.status) {
        navigate('/');
      } else {
        setError(response.message);
      }
    } catch {
      setError('Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">Nuevo Producto</h2>
              
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Nombre del Producto</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ingrese nombre del producto"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="price" className="form-label">Precio</label>
                  <div className="input-group">
                    <span className="input-group-text">Bs.</span>
                    <input
                      type="number"
                      className="form-control"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="category" className="form-label">Categoría</label>
                  <CategoryInput
                    value={formData.category}
                    onChange={(value) => setFormData({ ...formData, category: value })}
                    categories={categories}
                    onAddCategory={addCategory}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="image" className="form-label">URL de Imagen (opcional)</label>
                  <input
                    type="url"
                    className="form-control"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://ejemplo.com/imagen.jpg"
                  />
                </div>

                <div className="d-grid gap-2">
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Creando...
                      </>
                    ) : 'Crear Producto'}
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary"
                    onClick={() => navigate('/')}
                    disabled={loading}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;