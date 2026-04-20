import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddProduct.css';

const AddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', price: '', desc: '', img: null });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const imageURL = URL.createObjectURL(e.target.files[0]);
      setFormData({ ...formData, img: imageURL });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // تصغير الأخطاء السابقة عند كل محاولة إرسال
    setSuccess(false);

    // 1. التحقق أن الاسم مطلوب وموجود
    if (!formData.name.trim()) {
      setError('Product name is required! ⚠️');
      return;
    }

    // 2. التحقق أن السعر رقم فقط وليس فارغاً
    if (!formData.price) {
      setError('Price is required! 💰');
      return;
    }
    
    // استخدام isNaN للتحقق أن القيمة ليست "ليس رقماً"
    if (isNaN(formData.price) || Number(formData.price) <= 0) {
      setError('Price must be a valid positive number! 🔢');
      return;
    }

    // 3. التحقق من وجود صورة
    if (!formData.img) {
      setError('Please select a product image! 🖼️');
      return;
    }

    // إذا مر بكل الشروط السابقة، نبدأ عملية الحفظ
    const savedData = sessionStorage.getItem('sessionProducts');
    const currentProducts = savedData ? JSON.parse(savedData) : [];

    const newProduct = {
      id: Date.now(),
      name: formData.name,
      price: formData.price,
      desc: formData.desc,
      img: formData.img
    };

    const updatedProducts = [...currentProducts, newProduct];
    sessionStorage.setItem('sessionProducts', JSON.stringify(updatedProducts));

    // إظهار رسالة النجاح وتصفير الحقول
    setSuccess(true);
    setFormData({ name: '', price: '', desc: '', img: null });

    // الانتقال بعد نجاح العملية
    setTimeout(() => {
      navigate('/products');
    }, 2000);
  };

  return (
    <div className="add-product-container">
      <h1>Add New Jewelry Piece</h1>
      <form className="add-form" onSubmit={handleSubmit}>
        
        {/* عرض رسالة الخطأ إن وجدت */}
        {error && <div className="alert error-message">{error}</div>}
        
        {/* عرض رسالة النجاح إن وجدت */}
        {success && <div className="alert success-message">Product added to inventory successfully! ✅</div>}

        <div className="form-group">
          <label>Jewelry Name *</label>
          <input 
            type="text" 
            placeholder="Enter piece name"
            value={formData.name} 
            onChange={(e) => setFormData({...formData, name: e.target.value})} 
          />
        </div>

        <div className="form-group">
          <label>Price ($) *</label>
          <input 
            type="text" 
            placeholder="e.g. 1500"
            value={formData.price} 
            onChange={(e) => setFormData({...formData, price: e.target.value})} 
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea 
            placeholder="Write details..."
            value={formData.desc} 
            onChange={(e) => setFormData({...formData, desc: e.target.value})}
          />
        </div>

        <div className="form-group">
          <label>Product Image *</label>
          <input type="file" accept="image/*" onChange={handleImageChange} className="file-input" />
          {formData.img && <img src={formData.img} alt="preview" className="img-preview" />}
        </div>

        <button type="submit" className="save-btn">Save to Inventory</button>
      </form>
    </div>
  );
};

export default AddProduct;