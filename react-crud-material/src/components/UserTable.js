import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

export default function UserTable({
  users = [],
  page,
  rowsPerPage,
  onPageChange,
  onEdit,
  onDelete
}) {
  const rows = users.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email
  }));

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
      align: "center",
      headerAlign: "center"
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 200,
      align: "center",
      headerAlign: "center"
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1.5,
      minWidth: 200
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
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
        pagination
        pageSizeOptions={[5, 10, 20]}
        paginationModel={{ page, pageSize: rowsPerPage }}
        onPaginationModelChange={(model) => {
          onPageChange(model.page);
        }}
        disableRowSelectionOnClick
        sx={{ border: 0 }}
      />
    </Paper>
  );
}