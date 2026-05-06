import { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import UserForm from "../components/UserForm";
import UserTable from "../components/UserTable";
import Loader from "../components/Loader";
import ConfirmDialog from "../components/ConfirmDialog";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser
} from "../api/userService";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const rowsPerPage = 5;

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      try {
        const res = await getUsers(page, rowsPerPage);
        setUsers(res?.data || []);
        setTotal(res?.total || 0);
      } catch (e) {
        console.error("LOAD ERROR:", e.message);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, [page]);

  // Load Users
  const loadUsers = async () => {
    setLoading(true);
    try {
      const res = await getUsers(page, rowsPerPage);
      setUsers(res?.data || []);
      setTotal(res?.total || 0);
    } catch (e) {
      console.error("LOAD ERROR:", e.message);
    } finally {
      setLoading(false);
    }
  };

  // Save (Create / Update)
  const handleSave = async (user) => {
    try {
      if (selectedUser) {
        await updateUser(selectedUser.id, user);
      } else {
        await createUser(user);
      }
      setSelectedUser(null);
      loadUsers();
    } catch (e) {
      console.error("SAVE ERROR:", e.message);
    }
  };

  // Delete directly (no deleteId state)
  const handleDeleteClick = (id) => {
  console.log("Deleting Id:", id);
  setDeleteId(id);
  setConfirmOpen(true);
};

 const handleConfirmDelete = async () => {
  try {
    await deleteUser(deleteId);
    loadUsers();
  } catch (e) {
    console.error("DELETE ERROR:", e.message);
  } finally {
    setConfirmOpen(false);
    setDeleteId(null); // cleanup
  }
};

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        CRUD OPERATIONS
      </Typography>

      <UserForm selectedUser={selectedUser} onSave={handleSave} />

      {loading ? (
        <Loader />
      ) : (
        <UserTable
          users={users}
          onEdit={setSelectedUser}
          onDelete={handleDeleteClick}
          page={page}
          total={total}
          rowsPerPage={rowsPerPage}
          onPageChange={setPage}
        />
      )}

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </Container>
  );
}