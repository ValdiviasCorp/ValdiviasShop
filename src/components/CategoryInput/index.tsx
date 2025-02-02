import { useState } from 'react';
import { Category } from '../../services/categoryService';
import './CategoryInput.css';

interface Props {
  value: string;
  onChange: (value: string) => void;
  categories: Category[];
  onAddCategory: (category: string) => void;
}

const CategoryInput = ({ value, onChange, categories, onAddCategory }: Props) => {
  const [isCustom, setIsCustom] = useState(false);

  return (
    <div className="category-input-container">
      {!isCustom ? (
        <select
          className="form-select"
          value={value}
          onChange={(e) => {
            if (e.target.value === '_custom_') {
              setIsCustom(true);
            } else {
              onChange(e.target.value);
            }
          }}
        >
          <option value="">Select category...</option>
          {categories.map(category => (
            <option key={category._id} value={category.name}>
              {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
            </option>
          ))}
          <option value="_custom_">+ Add new category</option>
        </select>
      ) : (
        <input
          type="text"
          className="form-control"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Type new category and press Enter"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && value.trim()) {
              onAddCategory(value.trim());
              setIsCustom(false);
            }
          }}
          autoFocus
        />
      )}
    </div>
  );
};

export default CategoryInput;