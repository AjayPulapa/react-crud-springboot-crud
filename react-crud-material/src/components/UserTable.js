import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

export default function UserTable({
  users = [],
  page,
  total,
  rowsPerPage,
  onPageChange,
  onEdit,
  onDelete
}) {

  const safeUsers = Array.isArray(users) ? users : [];

  const rows = safeUsers.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email
  }));

 const columns = [
  { 
    field: "id", 
    headerName: "ID", 
    width: 100,
    headerAlign: "center",
    align: "center"
  },

  { 
    field: "name", 
    headerName: "Name", 
    flex: 1,              // takes available space
    minWidth: 200,        // 👈 ensures proper spacing
    headerAlign: "center",
    align: "center"
  },

  { 
    field: "email", 
    headerName: "Email", 
    flex: 1.5,            // 👈 give more space than name
    minWidth: 200
  },

  {
    field: "actions",
    headerName: "Actions",
    width: 150,
    sortable: false,
    filterable: false,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => (
      <>
        <IconButton onClick={() => onEdit(params.row)}>
          <Edit />
        </IconButton>
        <IconButton onClick={() => onDelete(params.row.id)}>
          <Delete />
        </IconButton>
      </>
    )
  }
];

  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}

        paginationMode="server"
        rowCount={total}

        paginationModel={{
          page: page - 1,
          pageSize: rowsPerPage
        }}

        onPaginationModelChange={(model) => {
          onPageChange(model.page + 1);
        }}

        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        sortingMode="client"
        sx={{ border: 0 }}
      />
    </Paper>
  );
}