import {
  Table, TableBody, TableCell, TableHead, TableRow,
  IconButton, TablePagination, TableContainer, Paper
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

export default function UserTable({
  users = [], onEdit, onDelete,
  page, total, rowsPerPage, onPageChange
}) {

  const safeUsers = Array.isArray(users) ? users : [];

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {safeUsers.length > 0 ? (
              safeUsers.map((u) => (
                <TableRow key={u.id}>
                  <TableCell>{u.id}</TableCell>
                  <TableCell>{u.name}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => onEdit(u)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => onDelete(u.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={parseInt(total || 0)}
        page={page - 1}
        rowsPerPage={rowsPerPage}
        onPageChange={(e, newPage) => onPageChange(newPage + 1)}
        rowsPerPageOptions={[5]}
      />
    </>
  );
}