import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
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
  Drawer,
} from "@mui/material";

import { visuallyHidden } from "@mui/utils";
import SignUpAccBox from "../Box/SignUpAccBox";
import GDVFilterComponent from "../Filter/GDV_account";

const columns = [
  {
    id: "id",
    disablePadding: true,
    numeric: false,
    label: "ID",
  },
  {
    id: "username",
    numeric: false,
    disablePadding: true,
    label: "Username",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Tên",
  },
  {
    id: "gd",
    numeric: false,
    disablePadding: true,
    label: "Điểm giao dịch",
  },
  {
    id: "dob",
    numeric: false,
    disablePadding: true,
    label: "Ngày sinh",
  },
  {
    id: "sex",
    numeric: false,
    disablePadding: true,
    label: "Giới tính",
  },

  {
    id: "email",
    numeric: false,
    disablePadding: true,
    label: "Email",
  },

  {
    id: "phone",
    numeric: false,
    disablePadding: true,
    label: "SĐT",
  },

  {
    id: "password",
    numeric: false,
    disablePadding: true,
    label: "Password",
  },
];

const gdpoint = "CN8";

function createData(id, username, name, gd, dob, sex, email, phone, password) {
  return {
    id: String(id),
    username: String(username),
    name: String(name),
    gd: gdpoint,
    dob: String(dob),
    sex: String(sex),
    email: String(email),
    phone: String(phone),
    password: String(password),
  };
}

const data = [
  createData(
    "1",
    "ugd1",
    "Trần Danggggg",
    "26/08/2003",
    "Nữ",
    "bhnj@gmail.com",
    "012345678",
    "dang1234"
  ),
  createData(
    "2",
    "ugd2",
    "aTrần Dang",
    "26/08/2003",
    "Nữ",
    "bhnj@gmail.com",
    "012345678",
    "dang1234"
  ),
  createData(
    "3",
    "ugd3",
    "bTrần Dang",
    "26/08/2003",
    "Nam",
    "bhnj@gmail.com",
    "012345678",
    "dang1234"
  ),
  createData(
    "4",
    "ugd4",
    "cTrần Dang",
    "26/08/2003",
    "Nữ",
    "bhnj@gmail.com",
    "012345678",
    "dang1234"
  ),
  createData(
    "5",
    "ugd5",
    "Trần Dang",
    "26/08/2003",
    "Nam",
    "bhnj@gmail.com",
    "012345678",
    "dang1234"
  ),
  createData(
    "6",
    "ugd6",
    "dTrần Dang",
    "26/08/2003",
    "Nữ",
    "bhnj@gmail.com",
    "012345678",
    "dang1234"
  ),
  createData(
    "7",
    "ugd7",
    "eTrần Dang",
    "26/08/2003",
    "Nữ",
    "bhnj@gmail.com",
    "012345678",
    "dang1234"
  ),
  createData(
    "8",
    "ugd8",
    "dTrần Dang",
    "26/08/2003",
    "Nữ",
    "bhnj@gmail.com",
    "012345678",
    "dang1234"
  ),
  createData(
    "9",
    "ugd9",
    "kTrần Dang",
    "26/08/2003",
    "Nam",
    "bhnj@gmail.com",
    "012345678",
    "dang1234"
  ),
  createData(
    "9",
    "ugd9",
    "Tugdrần Dang",
    "26/08/2003",
    "Nữ",
    "bhnj@gmail.com",
    "012345678",
    "dang1234"
  ),
  createData(
    "10",
    "ugd10",
    "oTugdrần Dang",
    "26/08/2003",
    "Nam",
    "bhnj@gmail.com",
    "012345678",
    "dang1234"
  ),
  createData(
    "11",
    "ugd11",
    "Tugdrần kDang",
    "26/08/2003",
    "Nam",
    "bhnj@gmail.com",
    "012345678",
    "dang1234"
  ),
  createData(
    "12",
    "ugd12",
    "Tugdrầng Dang",
    "26/08/2003",
    "Nữ",
    "bhnj@gmail.com",
    "012345678",
    "dang1234"
  ),
  createData(
    "13",
    "ugd13",
    "Tugdrầng Dang",
    "26/08/2003",
    "Nữ",
    "bhnj@gmail.com",
    "012345678",
    "dang1234"
  ),
];

export function getDataGDVacc() {
  return data;
}

export function getGDpoint() {
  return gdpoint;
}

export default function GDV_Account() {
  const DEFAULT_ORDER = "asc";
  const DEFAULT_ORDER_BY = "id";
  const DEFAULT_ROWS_PER_PAGE = 5;
  const [rows, setRows] = useState(data);

  //Sort
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
            Chỉnh sửa
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
    username: "",
    name: "",
    sex: "",
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
    setRows((prevRows) => prevRows.filter((row) => row.id !== selectedRow.id));
    setDeleteDialogOpen(false);
    setSelectedRow(null);
  };

  const handleUpdateConfirm = (updatedRowData) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === selectedRow.id ? { ...row, ...updatedRowData } : row
      )
    );
    alert("Cập nhật thông tin thành công!");
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
        (filters.username
          ? row.username.toLowerCase().includes(filters.username.toLowerCase())
          : true) &&
        (filters.sex
          ? row.sex.toLowerCase().includes(filters.sex.toLowerCase())
          : true)
      );
    });
    const filteredRowCount = filteredData.length; // Số hàng phù hợp với bộ lọc
    setFilteredRowCount(filteredRowCount); // Cập nhật filteredRowCount
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
      const updatedRowsPerPage = parseInt(event.target.value, 5);
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
      <Button
        variant="contained"
        color="primary"
        onClick={() => setIsSignUpBoxVisible(true)} // Hàm để mở Drawer
      >
        Thêm tài khoản giao dịch viên
      </Button>
      {IsSignUpBoxVisible ? <SignUpAccBox centerroot = {"gd"} onClose={handleCloseSignUpBox} /> : null}

      <GDVFilterComponent
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
                rowCount={filteredRowCount}
              />
              <TableBody>
                {visibleRows
                  ? visibleRows.map((row) => {
                      return (
                        <TableRow hover sx={{ overflow: "auto" }}>
                          <TableCell>{row.id}</TableCell>
                          <TableCell>{row.username}</TableCell>
                          <TableCell>{row.name}</TableCell>
                          <TableCell>{row.gd}</TableCell>
                          <TableCell>{row.dob}</TableCell>
                          <TableCell>{row.sex}</TableCell>
                          <TableCell>{row.email}</TableCell>
                          <TableCell>{row.phone}</TableCell>
                          <TableCell>{row.password}</TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => handleUpdateClick(row)}
                            >
                              Update
                            </Button>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              color="error"
                              onClick={() => handleDeleteClick(row)}
                            >
                              Delete
                            </Button>
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
            count={
              filteredRowCount <= rows.length ? filteredRowCount : rows.length
            }
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
            Bạn có chắc chắn muốn xóa tài khoản này không?
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
        <DialogTitle id="form-dialog-title">Cập nhật thông tin</DialogTitle>
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
            label="Username"
            id="username"
            fullWidth
            defaultValue={selectedRow ? selectedRow.username : ""}
          />
          <TextField
            margin="dense"
            label="Name"
            id="name"
            fullWidth
            defaultValue={selectedRow ? selectedRow.name : ""}
          />
          <TextField
            margin="dense"
            label="Ngày sinh"
            id="dob"
            fullWidth
            defaultValue={selectedRow ? selectedRow.dob : ""}
          />
          <TextField
            margin="dense"
            label="Giới tính"
            id="sex"
            fullWidth
            defaultValue={selectedRow ? selectedRow.sex : ""}
          />
          <TextField
            margin="dense"
            label="Email"
            id="email"
            fullWidth
            defaultValue={selectedRow ? selectedRow.email : ""}
          />
          <TextField
            margin="dense"
            label="SĐT"
            id="phone"
            fullWidth
            defaultValue={selectedRow ? selectedRow.phone : ""}
          />
          <TextField
            margin="dense"
            label="Password"
            id="password"
            fullWidth
            defaultValue={selectedRow ? selectedRow.password : ""}
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
                username: document.getElementById("username").value,
                name: document.getElementById("name").value,
                dob: document.getElementById("dob").value,
                sex: document.getElementById("sex").value,
                email: document.getElementById("email").value,
                phone: document.getElementById("phone").value,
                password: document.getElementById("password").value,
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
