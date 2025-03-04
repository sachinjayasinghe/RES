import React, { useState, useEffect } from "react";
import "../App.css"; // Add styling here

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await fetch("http://localhost:5000/categories");
    const data = await res.json();
    setCategories(data);
  };

  const addCategory = async () => {
    if (!newCategory) return;
    const res = await fetch("http://localhost:5000/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newCategory }),
    });
    const data = await res.json();
    setCategories([...categories, data]);
    setNewCategory("");
    setShowPopup(false);
  };

  const deleteCategory = async (id) => {
    await fetch(`http://localhost:5000/categories/${id}`, { method: "DELETE" });
    setCategories(categories.filter((category) => category._id !== id));
  };

  const updateCategory = async () => {
    if (!newCategory) return;
    const res = await fetch(`http://localhost:5000/categories/${editingCategory._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newCategory }),
    });
    const data = await res.json();
    setCategories(categories.map((cat) => (cat._id === data._id ? data : cat)));
    setEditingCategory(null);
    setNewCategory("");
    setShowPopup(false);
  };

  return (
    <div className="category-container">
      <h2>Category Management</h2>
      <button onClick={() => { setEditingCategory(null); setShowPopup(true); }}>Add a Category</button>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>{editingCategory ? "Edit Category" : "Add a Category"}</h3>
            <input
              type="text"
              placeholder="Enter Category Name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <div className="popup-buttons">
              <button onClick={() => { setShowPopup(false); setEditingCategory(null); }}>Cancel</button>
              <button onClick={editingCategory ? updateCategory : addCategory}>
                {editingCategory ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Category Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={category._id}>
              <td>{String(index + 1).padStart(2, "0")}</td>
              <td>{category.name}</td>
              <td>
                <button onClick={() => { setEditingCategory(category); setNewCategory(category.name); setShowPopup(true); }}>✏️</button>
                <button onClick={() => deleteCategory(category._id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

