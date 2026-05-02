import { useEffect, useState, useRef, useCallback } from "react";
import { Container, Typography } from "@mui/material";
import UserForm from "../components/UserForm";
import UserTable from "../components/UserTable";
import Loader from "../components/Loader";
import ConfirmDialog from "../components/ConfirmDialog";
import {getUsers, createUser, updateUser, deleteUser} from "../api/userService";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const controllerRef = useRef(null);
  const rowsPerPage = 5;
  const loadUsers = useCallback(async () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    const controller = new AbortController();
    controllerRef.current = controller;
    setLoading(true);
    try {
      const res = await getUsers(page, rowsPerPage, controller.signal);
      console.log("API RESPONSE:", res);
      setUsers(res?.data || []);   
      setTotal(res?.total || 0);
    } catch (e) {
      if (e.message !== "Request Cancelled") {
        console.error("LOAD ERROR:", e.message);
      }
    } finally {
      setLoading(false);
    }
  }, [page, rowsPerPage]);

  useEffect(() => {
    loadUsers();
    return () => controllerRef.current?.abort();
  }, [loadUsers]);

  const handleSave = async (user) => {
    console.log("Inside save:", user);

    const controller = new AbortController();
    try {
      if (selectedUser) {
        console.log("Updating user...");
        await updateUser(selectedUser.id, user, controller.signal);
      } else {
        console.log("Creating user...");
        await createUser(user, controller.signal);
      }

      setSelectedUser(null);
      loadUsers();
    } catch (e) {
      console.error("SAVE ERROR:", e.message);
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    const controller = new AbortController();
    try {
      await deleteUser(deleteId, controller.signal);
      loadUsers();
    } catch (e) {
      console.error("DELETE ERROR:", e.message);
    } finally {
      setConfirmOpen(false);
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