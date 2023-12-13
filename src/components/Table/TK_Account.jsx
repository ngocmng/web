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
  Grid,
  IconButton
} from "@mui/material";


import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from "@mui/utils";
import TKFilterComponent from "../Filter/TK_account";
import SignUpBox from "../Box/SignUpAccBox";
import Buttonme from "../Buttonme/Buttonme";
import SignUpAccBox from "../Box/SignUpAccBox";
import { deleteDataFromFireStoreAndDexie, updateDataFromFireStoreAndDexie } from "../../database/cache";

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
    id: "tk",
    numeric: false,
    disablePadding: true,
    label: "Điểm tập kết",
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

const changeDateForm = (date) => {
  if (typeof date === "string") {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  } else {
    return ""; 
  }
};

const changeDateForm2 = (date) => {
  if (typeof date === "string") {
    const [day, month, year] = date.split("/");
    return `${year}-${month}-${day}`;
  } else {
    return ""; 
  }
};


function createData(id, username, name, tk, dob, sex, email, phone, password) {
  return {
    id,
    username,
    name,
    tk,
    dob: changeDateForm(dob),
    sex,
    email,
    phone,
    password,
  };
}

const data = [
  createData(
    "1",
    "utk1",
    "Trần Dang",
    "UET",
    "26/08/2003",
    "Nữ",
    "bhnj@gmail.com",
    "012345678",
    "dang1234"
  ),
  createData(
    "2",
    "utk2",
    "aTrần Dang",
    "ULIS",
    "26/08/2003",
    "Nữ",
    "bhnj@gmail.com",
    "012345678",
    "dang1234"
  ),
  createData(
    "3",
    "utk3",
    "bTrần Dang",
    "UEB",
    "26/08/2003",
    "Nam",
    "bhnj@gmail.com",
    "012345678",
    "dang1234"
  ),
  createData(
    "4",
    "utk4",
    "cTrần Dang",
    "UED",
    "26/08/2003",
    "Nữ",
    "bhnj@gmail.com",
    "012345678",
    "dang1234"
  ),
  createData(
    "5",
    "utk5",
    "Trần Dang",
    "UMP",
    "26/08/2003",
    "Nam",
    "bhnj@gmail.com",
    "012345678",
    "dang1234"
  ),
  createData(
    "6",
    "utk6",
    "dTrần Dang",
    "TMU",
    "26/08/2003",
    "Nữ",
    "bhnj@gmail.com",
    "012345678",
    "dang1234"
  ),
  createData(
    "7",
    "utk7",
    "eTrần Dang",
    "HUS",
    "26/08/2003",
    "Nữ",
    "bhnj@gmail.com",
    "012345678",
    "dang1234"
  ),
  createData(
    "8",
    "utk8",
    "dTrần Dang",
    "HUST",
    "26/08/2003",
    "Nữ",
    "bhnj@gmail.com",
    "012345678",
    "dang1234"
  ),
  createData(
    "9",
    "utk9",
    "kTrần Dang",
    "NEU",
    "26/08/2003",
    "Nam",
    "bhnj@gmail.com",
    "012345678",
    "dang1234"
  ),
  createData(
    "9",
    "utk9",
    "Tutkrần Dang",
    "HUST",
    "26/08/2003",
    "Nữ",
    "bhnj@gmail.com",
    "012345678",
    "dang1234"
  ),
  createData(
    "10",
    "utk10",
    "oTutkrần Dang",
    "FTU",
    "26/08/2003",
    "Nam",
    "bhnj@gmail.com",
    "012345678",
    "dang1234"
  ),
  createData(
    "11",
    "utk11",
    "Tutkrần kDang",
    "HUHUHU",
    "26/08/2003",
    "Nam",
    "bhnj@gmail.com",
    "012345678",
    "dang1234"
  ),
  createData(
    "12",
    "utk12",
    "Tutkrầng Dang",
    "HSHSHHS",
    "26/08/2003",
    "Nữ",
    "bhnj@gmail.com",
    "012345678",
    "dang1234"
  ),
  createData(
    "13",
    "utk13",
    "Tutkrầng Dang",
    "HSBLA",
    "26/08/2003",
    "Nữ",
    "bhnj@gmail.com",
    "012345678",
    "dang1234"
  ),
  createData(
    "14",
    "utk14",
    "Tutkrầng Dang",
    "BLALABAL",
    "26/08/2003",
    "Nữ",
    "bhnj@gmail.com",
    "012345678",
    "dang1234"
  ),
  createData(
    "15",
    "utk15",
    "Tutkrầng Dang",
    "KSJSJS",
    "26/08/2003",
    "Nữ",
    "bhnj@gmail.com",
    "012345678",
    "dang1234"
  ),
  createData(
    "16",
    "utk16",
    "Tutkrầng gbDang",
    "SGKWB",
    "26/08/2003",
    "Nữ",
    "bhnj@gmail.com",
    "012345678",
    "dang1234"
  ),
  createData(
    "17",
    "utk17",
    "Tutkrầng Danhg",
    "HWBKF",
    "26/08/2003",
    "Nữ",
    "bhnj@gmail.com",
    "012345678",
    "dang1234"
  ),
  createData(
    "18",
    "utk18",
    "Tutkrầng Dang",
    "JWNGB",
    "26/08/2003",
    "Nam",
    "bhnj@gmail.com",
    "012345678",
    "dang1234"
  ),
  createData(
    "19",
    "utk19",
    "Tutkrầng Dang",
    "UBGW",
    "26/08/2003",
    "Nam",
    "bhnj@gmail.com",
    "012345678",
    "dang1234"
  ),
  createData(
    "20",
    "utk20",
    "Tutkrầng Dang",
    "HWBKB",
    "26/08/2003",
    "Nam",
    "bhnj@gmail.com",
    "012345678",
    "dang1234"
  ),
];

export function getDataTKacc() {
  return data;
}

export default function TK_Account({data, system}) {
  const DEFAULT_ORDER = "asc";
  const DEFAULT_ORDER_BY = "id";
  const DEFAULT_ROWS_PER_PAGE = 6;
  const [rows, setRows] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (data) {
      const newRows = data.map((item) =>
        createData(
          item.id,
          item.username,
          item.name,
          item.tk,
          item.dob,
          item.sex,
          item.email,
          item.phone,
          item.password,
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

  function TK_TableHead(props) {
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

  TK_TableHead.propTypes = {
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
    tk: "",
  });

  const [selectedRow, setSelectedRow] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [IsSignUpBoxVisible, setIsSignUpBoxVisible] = useState(false);


  const handleTogglePasswordVisibility = (id) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

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
    deleteDataFromFireStoreAndDexie("LeadTKacc", selectedRow.id);
    setDeleteDialogOpen(false);
    setSelectedRow(null);
  };

  const handleUpdateConfirm = (updatedRowData) => {
    updateDataFromFireStoreAndDexie("LeadTKacc", selectedRow.id, updatedRowData)
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
          ? row.sex
              .toLowerCase()
              .includes(filters.sex.toLowerCase())
          : true) &&
          (filters.tk
            ? row.tk
                .toLowerCase()
                .includes(filters.tk.toLowerCase())
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
      const updatedRowsPerPage = parseInt(event.target.value, DEFAULT_ROWS_PER_PAGE);
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
            content="Thêm tài khoản trưởng điểm tập kết"
            onClick={() => setIsSignUpBoxVisible(true)}
          />
        </Grid>
      </div>
      {IsSignUpBoxVisible ? <SignUpAccBox data = {data} system={system} centerroot = {"tk"} onClose={handleCloseSignUpBox} /> : null}

      <TKFilterComponent
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
              <TK_TableHead
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
                            
                          <TableCell>{row.id}</TableCell>
                          <TableCell>{row.username}</TableCell>
                          <TableCell>{row.name}</TableCell>
                          <TableCell>{row.tk}</TableCell>
                          <TableCell>{row.dob}</TableCell>
                          <TableCell>{row.sex}</TableCell>
                          <TableCell>{row.email}</TableCell>
                          <TableCell>{row.phone}</TableCell>
                          <TableCell>
                            {showPassword[row.id] ? row.password : ""}
                            <IconButton
                              onClick={() =>
                                handleTogglePasswordVisibility(row.id)
                              }
                            >
                              {showPassword[row.id] ? (
                                <VisibilityOffIcon />
                              ) : (
                                <VisibilityIcon />
                              )}
                            </IconButton>
                          </TableCell>
                          <TableCell>
                          <IconButton
                              onClick={() => handleUpdateClick(row)}
                              style={{ color: 'green' }}
                            >
                              <EditIcon />
                            </IconButton>
                          </TableCell>
                          <TableCell>
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
            Bạn có chắc chắn muốn xóa dòng này không?
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
            disabled
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
            defaultValue={selectedRow ? changeDateForm2(selectedRow.dob) : ""}
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
            disabled
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
            disabled
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
                name: document.getElementById("name").value,
                dob: document.getElementById("dob").value,
                sex: document.getElementById("sex").value,
                phone: document.getElementById("phone").value,
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
