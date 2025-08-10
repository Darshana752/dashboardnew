import React, { useState } from "react";

export default function UserForm() {
  const [form, setForm] = useState({ name: "", email: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Sending...");

    try {
      const res = await fetch("http://localhost:8090/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        const data = await res.json();
        setMessage("Saved! id: " + data.id);
        setForm({ name: "", email: "" });
      } else {
        const errText = await res.text();
        setMessage("Error: " + errText);
      }
    } catch (err) {
      setMessage("Network error: " + err.message);
    }
  };

  return (
    <div style={{ maxWidth: 480, margin: "auto" }}>
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <br />
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <br />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            required
          />
        </div>
        <button type="submit" style={{ marginTop: 8 }}>
          Submit
        </button>
      </form>
      <p>{message}</p>
    </div>
  );
}
