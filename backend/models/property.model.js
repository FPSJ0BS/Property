const db = require("../config/db");

const Property = {
  async findAll() {
    const [rows] = await db.query("SELECT * FROM properties ORDER BY created_at DESC");
    return rows;
  },

  async findById(id) {
    const [rows] = await db.query("SELECT * FROM properties WHERE id = ?", [id]);
    return rows[0];
  },

  async create(data) {
    const { title, description, price, address, city, state, zip_code, property_type, bedrooms, bathrooms, area_sqft } = data;
    const [result] = await db.query(
      `INSERT INTO properties (title, description, price, address, city, state, zip_code, property_type, bedrooms, bathrooms, area_sqft)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, description, price, address, city, state, zip_code, property_type, bedrooms, bathrooms, area_sqft]
    );
    return this.findById(result.insertId);
  },

  async update(id, data) {
    const existing = await this.findById(id);
    if (!existing) return null;

    const { title, description, price, address, city, state, zip_code, property_type, bedrooms, bathrooms, area_sqft } = data;
    await db.query(
      `UPDATE properties SET title=?, description=?, price=?, address=?, city=?, state=?, zip_code=?, property_type=?, bedrooms=?, bathrooms=?, area_sqft=?
       WHERE id=?`,
      [title, description, price, address, city, state, zip_code, property_type, bedrooms, bathrooms, area_sqft, id]
    );
    return this.findById(id);
  },

  async remove(id) {
    const existing = await this.findById(id);
    if (!existing) return null;
    await db.query("DELETE FROM properties WHERE id = ?", [id]);
    return true;
  },
};

module.exports = Property;
