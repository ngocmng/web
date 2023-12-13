import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { useLiveQuery } from "dexie-react-hooks";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Grid,
  IconButton,
  Autocomplete,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { visuallyHidden } from "@mui/utils";
import GDFilterComponent from "../Filter/GD_system";
import SignUpSysBox from "../Box/SignUpSysBox";
import Buttonme from "../Buttonme/Buttonme";
import {
  deleteDataFromDexieTable,
  deleteDataFromFireStore,
  deleteDataFromFireStoreAndDexie,
  dexieDB,
  syncDexieToFirestore,
  updateDataFromFireStoreAndDexie,
} from "../../database/cache";

const columns = [
  {
    id: "id",
    disablePadding: true,
    numeric: false,
    label: "ID",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Tên",
  },
  {
    id: "manage",
    numeric: false,
    disablePadding: true,
    label: "Trưởng điểm GD",
  },
  {
    id: "hotline",
    numeric: false,
    disablePadding: true,
    label: "Hotline",
  },

  {
    id: "email",
    numeric: false,
    disablePadding: true,
    label: "Email",
  },

  {
    id: "address",
    numeric: false,
    disablePadding: true,
    label: "Địa chỉ",
  },

  {
    id: "setDay",
    numeric: false,
    disablePadding: true,
    label: "Ngày thành lập",
  },

  {
    id: "coverArea",
    numeric: false,
    disablePadding: true,
    label: "Vùng phụ trách",
  },

  {
    id: "TKpoint",
    numeric: false,
    disablePadding: true,
    label: "Điểm tập kết",
  },
];
const changeDateForm = (date) => {
  if (typeof date === "string") {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  } else {
    return ""; 
  }
};



function createData(
  id,
  name,
  manage,
  hotline,
  email,
  address,
  setDay,
  coverArea,
  TKpoint
) {
  return {
    id,
    name,
    manage,
    hotline,
    email,
    address,
    setDay: changeDateForm(setDay),
    coverArea,
    TKpoint,
  };
}

export default function GD_Table({ data, tkData }) {
  const DEFAULT_ORDER = "asc";
  const DEFAULT_ORDER_BY = "id";
  const DEFAULT_ROWS_PER_PAGE = 5;
  const [rows, setRows] = useState([]);
  useEffect(() => {
    if (data) {
      const newRows = data.map((item) =>
        createData(
          item.id,
          item.name,
          item.manage,
          item.hotline,
          item.email,
          item.address,
          item.setDay,
          item.coverArea,
          item.TKpoint
        )
      );
      setRows(newRows);
    }
  }, [data]);

  // Sort
  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function GD_TableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (newOrderBy) => (event) => {
      onRequestSort(event, newOrderBy);
    };
    return (
      <TableHead sx={{ bgcolor: "var(--secondary-color)" }}>
        <TableRow sx={{ bgcolor: "var(--secondary-color)" }}>
          {columns.map((column) => (
            <TableCell
              key={column.id}
              align="center"
              padding={column.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === column.id ? order : false}
              sx={{
                bgcolor: "var(--secondary-color)",
                fontSize: 17,
                fontWeight: "bold",
              }}
            >
              <TableSortLabel
                active={orderBy === column.id}
                direction={orderBy === column.id ? order : "asc"}
                onClick={createSortHandler(column.id)}
              >
                {column.label}
                {orderBy === column.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
          <TableCell
            align="center"
            padding="normal"
            sx={{
              bgcolor: "var(--secondary-color)",
              fontSize: 17,
              fontWeight: "bold",
            }}
          >
            Sửa
          </TableCell>
          <TableCell
            align="center"
            padding="normal"
            sx={{
              bgcolor: "var(--secondary-color)",
              fontSize: 17,
              fontWeight: "bold",
            }}
          >
            Xóa
          </TableCell>
        </TableRow>
      </TableHead>
    );
  }

  GD_TableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

  const [order, setOrder] = useState(DEFAULT_ORDER);
  const [orderBy, setOrderBy] = useState(DEFAULT_ORDER_BY);
  const [page, setPage] = useState(0);
  const [visibleRows, setVisibleRows] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);
  const [paddingHeight, setPaddingHeight] = useState(0);
  const [filteredRowCount, setFilteredRowCount] = useState(0);

  const [filters, setFilters] = useState({
    id: "",
    name: "",
    manage: "",
    coverArea: "",
    TKpoint: "",
  });
  const [selectedRow, setSelectedRow] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [IsSignUpBoxVisible, setIsSignUpBoxVisible] = useState(false);

  const handleCloseSignUpBox = () => {
    setIsSignUpBoxVisible(false);
  };

  const handleDeleteClick = (row) => {
    setSelectedRow(row);
    setDeleteDialogOpen(true);
  };

  const handleUpdateClick = (row) => {
    setSelectedRow(row);
    setUpdateDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    deleteDataFromFireStoreAndDexie("GDsystem", selectedRow.id);
    //alert("Xóa tài khoản thành công!");
    setDeleteDialogOpen(false);
    setSelectedRow(null);
  };


  const handleUpdateConfirm = (updatedRowData) => {
    updateDataFromFireStoreAndDexie("GDsystem", selectedRow.id, updatedRowData)
    setUpdateDialogOpen(false);
    setSelectedRow(null);
  };

  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const getFilteredRows = (data, filters) => {
    const filteredData = data.filter((row) => {
      return (
        (filters.id
          ? row.id.toLowerCase().includes(filters.id.toLowerCase())
          : true) &&
        (filters.name
          ? row.name.toLowerCase().includes(filters.name.toLowerCase())
          : true) &&
        (filters.manage
          ? row.manage.toLowerCase().includes(filters.manage.toLowerCase())
          : true) &&
        (filters.coverArea
          ? row.coverArea
              .toLowerCase()
              .includes(filters.coverArea.toLowerCase())
          : true) &&
        (filters.TKpoint
          ? row.TKpoint.toLowerCase().includes(filters.TKpoint.toLowerCase())
          : true)
      );
    });

    if (filteredData !== 0) {
      setFilteredRowCount(filteredData.length);
    }
    return filteredData;
  };

  useEffect(() => {
    const filteredData = getFilteredRows(rows, filters);
    const sortedFilteredData = stableSort(
      filteredData,
      getComparator(order, orderBy)
    );
    const rowsOnPage = sortedFilteredData.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
    setVisibleRows(rowsOnPage);
    // Reset page when filters change
    //setPage(0);
  }, [filters, order, orderBy, page, rowsPerPage]);

  useEffect(() => {
    setOrderBy(DEFAULT_ORDER_BY);
    setOrder(DEFAULT_ORDER);
  }, [rows]);

  useEffect(() => {
    let rowsOnMount = stableSort(
      rows,
      getComparator(DEFAULT_ORDER, DEFAULT_ORDER_BY)
    );

    rowsOnMount = rowsOnMount.slice(
      0 * DEFAULT_ROWS_PER_PAGE,
      0 * DEFAULT_ROWS_PER_PAGE + DEFAULT_ROWS_PER_PAGE
    );

    setVisibleRows(rowsOnMount);
  }, [rows]);

  const handleRequestSort = useCallback(
    (_, newOrderBy) => {
      const isAsc = orderBy === newOrderBy && order === "asc";
      const toggledOrder = isAsc ? "desc" : "asc";
      setOrder(toggledOrder);
      setOrderBy(newOrderBy);

      const sortedRows = stableSort(
        rows,
        getComparator(toggledOrder, newOrderBy)
      );
      const updatedRows = sortedRows.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      );

      setVisibleRows(updatedRows);
    },
    [order, orderBy, page, rowsPerPage, rows]
  );

  const handleChangePage = useCallback(
    (event, newPage) => {
      setPage(newPage);

      const sortedRows = stableSort(rows, getComparator(order, orderBy));
      const updatedRows = sortedRows.slice(
        newPage * rowsPerPage,
        newPage * rowsPerPage + rowsPerPage
      );

      setVisibleRows(updatedRows);

      // Avoid a layout jump when reaching the last page with empty rows.
      const numEmptyRows =
        newPage > 0
          ? Math.max(0, (1 + newPage) * rowsPerPage - rows.length)
          : 0;

      const newPaddingHeight = 6 * numEmptyRows;
      setPaddingHeight(newPaddingHeight);
    },
    [order, orderBy, rowsPerPage, rows]
  );

  const handleChangeRowsPerPage = useCallback(
    (event) => {
      const updatedRowsPerPage = parseInt(
        event.target.value,
        DEFAULT_ROWS_PER_PAGE
      );
      setRowsPerPage(updatedRowsPerPage);

      setPage(0);

      const sortedRows = stableSort(rows, getComparator(order, orderBy));
      const updatedRows = sortedRows.slice(
        0 * updatedRowsPerPage,
        0 * updatedRowsPerPage + updatedRowsPerPage
      );

      setVisibleRows(updatedRows);

      // There is no layout jump to handle on the first page.
      setPaddingHeight(0);
    },
    [order, orderBy, rows]
  );

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid>
          <Buttonme
            content="Thêm điểm giao dịch"
            onClick={() => setIsSignUpBoxVisible(true)}
          />
        </Grid>
      </div>
      {IsSignUpBoxVisible ? (
        <SignUpSysBox
          data={data}
          centerroot={"gd"}
          onClose={handleCloseSignUpBox}
        />
      ) : null}

      <GDFilterComponent
        filters={filters}
        onFilterChange={handleFilterChange}
        data={rows}
      />
      <hr />

      <Box
        sx={{
          width: "100%",
          height: "85%",
          bgcolor: "var(--secondary-color)",
          borderRadius: 2,
        }}
      >
        <Paper
          sx={{
            width: "100%",
            height: "100%",
            boxShadow: 0,
            pt: "var(--padding-item)",
            px: "var(--padding-item)",
            borderRadius: 2,
          }}
        >
          <TableContainer sx={{ maxHeight: "90%" }}>
            <Table
              stickyHeader
              sx={{ minWidth: 600, height: "80%" }}
              aria-labelledby="tableTitle"
              size={"small"}
            >
              <GD_TableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {visibleRows
                  ? visibleRows.map((row) => {
                      return (
                        <TableRow hover sx={{ overflow: "auto" }}>
                          <TableCell
                            style={{ paddingTop: "2px", paddingBottom: "2px" }}
                          >
                            {row.id}
                          </TableCell>
                          <TableCell
                            style={{ paddingTop: "2px", paddingBottom: "2px" }}
                          >
                            {row.name}
                          </TableCell>
                          <TableCell
                            style={{ paddingTop: "2px", paddingBottom: "2px" }}
                          >
                            {row.manage}
                          </TableCell>
                          <TableCell
                            style={{ paddingTop: "2px", paddingBottom: "2px" }}
                          >
                            {row.hotline}
                          </TableCell>
                          <TableCell
                            style={{ paddingTop: "2px", paddingBottom: "2px" }}
                          >
                            {row.email}
                          </TableCell>
                          <TableCell
                            style={{ paddingTop: "2px", paddingBottom: "2px" }}
                          >
                            {row.address}
                          </TableCell>
                          <TableCell
                            style={{ paddingTop: "2px", paddingBottom: "2px" }}
                          >
                            {row.setDay}
                          </TableCell>
                          <TableCell
                            style={{ paddingTop: "2px", paddingBottom: "2px" }}
                          >
                            {row.coverArea}
                          </TableCell>
                          <TableCell
                            style={{ paddingTop: "2px", paddingBottom: "2px" }}
                          >
                            {row.TKpoint}
                          </TableCell>
                          <TableCell
                            style={{ paddingTop: "2px", paddingBottom: "2px" }}
                          >
                            <IconButton
                              onClick={() => handleUpdateClick(row)}
                              style={{ color: "green" }}
                            >
                              <EditIcon />
                            </IconButton>
                          </TableCell>
                          <TableCell
                            style={{ paddingTop: "2px", paddingBottom: "2px" }}
                          >
                            <IconButton
                              color="error"
                              onClick={() => handleDeleteClick(row)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  : null}
                {paddingHeight > 0 && (
                  <TableRow
                    style={{
                      height: paddingHeight,
                    }}
                  ></TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[15]}
            component="div"
            count={filteredRowCount ? filteredRowCount : rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Xác nhận xóa?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc chắn muốn xóa điểm giao dịch này không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Hủy
          </Button>
          <Button onClick={handleDeleteConfirm} color="primary" autoFocus>
            Xóa
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={updateDialogOpen}
        onClose={() => setUpdateDialogOpen(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id ="form-dialog-title">Cập nhật thông tin</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="ID"
            id="id"
            fullWidth
            defaultValue={selectedRow ? selectedRow.id : ""}
            disabled
          />
          <TextField
            margin="dense"
            label="Name"
            id="name"
            fullWidth
            defaultValue={selectedRow ? selectedRow.name : ""}
            disabled
          />
          <TextField
            margin="dense"
            label="Trưởng điểm GD"
            id="manage"
            fullWidth
            defaultValue={selectedRow ? selectedRow.manage : ""}
          />
          <TextField
            margin="dense"
            label="Hotline"
            id="hotline"
            fullWidth
            defaultValue={selectedRow ? selectedRow.hotline : ""}
          />
          <TextField
            margin="dense"
            label="Email"
            id="email"
            fullWidth
            defaultValue={selectedRow ? selectedRow.email : ""}
            disabled
          />
          <TextField
            margin="dense"
            label="Địa chỉ"
            id="address"
            fullWidth
            defaultValue={selectedRow ? selectedRow.address : ""}
          />
          <TextField
            margin="dense"
            label="Ngày thành lập"
            id="setDay"
            fullWidth
            defaultValue={selectedRow ? selectedRow.setDay : ""}
            disabled
          />
          <TextField
            margin="dense"
            label="Vùng phụ trách"
            id="coverArea"
            fullWidth
            defaultValue={selectedRow ? selectedRow.coverArea : ""}
          />
          <Autocomplete
            options={tkData ? tkData.map((option) => option.name) : []} 
            fullWidth
            value={selectedRow ? selectedRow.TKpoint : ""}
            id = "TKpoint"
            onChange={(event, newValue) => {
              setSelectedRow((prevRow) => ({
                ...prevRow,
                TKpoint: newValue,
              }));
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                margin="dense"
                label="Điểm tập kết"
                //id="TKpoint"
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUpdateDialogOpen(false)} color="primary">
            Hủy
          </Button>
          <Button
            onClick={() => {
              // Lấy dữ liệu mới từ các trường TextField
              const updatedRowData = {
                manage: document.getElementById("manage").value,
                hotline: document.getElementById("hotline").value,
                address: document.getElementById("address").value,
                coverArea: document.getElementById("coverArea").value,
                TKpoint: document.getElementById("TKpoint").value,
               
              };
              handleUpdateConfirm(updatedRowData);
            }}
            color="primary"
          >
            Cập nhật
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
