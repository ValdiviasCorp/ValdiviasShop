import { useState } from 'react';
import { Product as ProductType } from '../../types/Product';
import { updateProductPrice } from '../../services/productService';
import './Product.css';
import defaultImage from '../../assets/defaultP.jpg';

interface Props {
  product: ProductType;
  onUpdate: (updatedProduct: ProductType) => void;
  onDelete: (id: string) => void;
}

const ProductComponent = ({ product, onUpdate, onDelete }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newPrice, setNewPrice] = useState(product.price.toString());
  const [loading, setLoading] = useState(false);

  const handlePriceClick = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    setLoading(true);
    const response = await updateProductPrice(product._id!, Number(newPrice));
    if (response.status && response.data) {
      onUpdate(response.data);
      setIsEditing(false);
    }
    setLoading(false);
  };

  const handleCancel = () => {
    setNewPrice(product.price.toString());
    setIsEditing(false);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = defaultImage;
  };

  const renderPrice = () => {
    if (isEditing) {
      return (
        <div className="price-edit-container">
          <input
            type="number"
            className="form-control form-control-sm price-input"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
            min="0"
            step="0.01"
            autoFocus
          />
          <div className="btn-group btn-group-sm mt-1">
            <button 
              className="btn btn-success btn-sm"
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? '...' : '✓'}
            </button>
            <button 
              className="btn btn-danger btn-sm"
              onClick={handleCancel}
              disabled={loading}
            >
              ✕
            </button>
          </div>
        </div>
      );
    }

    return (
      <span 
        className="price-display" 
        onClick={handlePriceClick}
        role="button"
      >
        Bs. {product.price.toFixed(2)}
      </span>
    );
  };

  return (
    <>
      {/* Desktop View */}
      <div className="card h-100 d-none d-md-block">
        <img 
          src={product.image || defaultImage} 
          className="card-img-top" 
          alt={product.name}
          onError={handleImageError}
          style={{ height: '200px', objectFit: 'cover' }} 
        />
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">{renderPrice()}</p>
          <button 
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(product._id!)}
          >
            <i className="bi bi-trash"></i> Delete
          </button>
        </div>
      </div>

      {/* Mobile View */}
      <div className="d-md-none mobile-product-card">
        <div className="d-flex align-items-center justify-content-between p-2 border rounded mb-2">
          <img 
            src={product.image || defaultImage}
            alt={product.name}
            onError={handleImageError}
            className="mobile-product-image"
          />
          <h6 className="mb-0 flex-grow-1 mx-3">{product.name}</h6>
          <div className="d-flex align-items-center">
            <div className="text-end me-3">{renderPrice()}</div>
            <button 
              className="btn btn-link text-danger p-0"
              onClick={() => onDelete(product._id!)}
            >
              <i className="bi bi-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductComponent;