import { TextField, Button, Box } from "@mui/material";
import { useState, useEffect } from "react";

export default function UserForm({ selectedUser, onSave }) {
  const [form, setForm] = useState({ name: "", email: "" });

  // ✅ Handle edit + reset
  useEffect(() => {
    if (selectedUser) {
      setForm({
        name: selectedUser.name || "",
        email: selectedUser.email || ""
      });
    } else {
      setForm({ name: "", email: "" });
    }
  }, [selectedUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (!form.name.trim() || !form.email.trim()) {
      alert("Please enter name and email");
      return;
    }
    console.log("Submitting:", form);
    onSave(form);
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        flexWrap: "wrap",
        mb: 2
      }}
    >
      <TextField
        label="Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        size="small"
      />

      <TextField
        label="Email"
        name="email"
        value={form.email}
        onChange={handleChange}
        size="small"
      />

      <Button variant="contained" onClick={handleSubmit}>
        {selectedUser ? "Update" : "Create"}
      </Button>
    </Box>
  );
}