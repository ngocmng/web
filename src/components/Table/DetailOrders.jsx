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
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import OrderDetailsDialog from "../OrderDetailsDialog";
import { FaEye } from "react-icons/fa";

export default function DetailOrdersTable({ data }) {
  //console.log(data);
  const changeDateForm = (date) => {
    if (!date) return "";
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };

  function createData({
    id,
    date,
    orderStatus,
    senderName,
    senderPhone,
    senderAddress,
    receiverName,
    receiverPhone,
    receiverAddress,
  }) {
    return {
      id,
      date: changeDateForm(date),
      orderStatus,
      senderName,
      senderPhone,
      senderAddress,
      receiverName,
      receiverPhone,
      receiverAddress,
    };
  }

  const [rows, setRows] = useState([]);
  //   useEffect(() => {
  //     if (data) {
  //       const newRows = data.map((item) =>
  //         createData(
  //           item.id,
  //           item.date,
  //           item.startGDpoint,
  //           item.startTKpoint,
  //           item.endGDpoint,
  //           item.endTKpoint
  //         )
  //       );
  //       setRows(newRows);
  //     }
  //   }, [data]);

  useEffect(() => {
    if (data) {
      setRows(data.map(createData));
    }
  }, [data]);

  //console.log(rows);

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

  const headCells = [
    {
      id: "id",
      numeric: false,
      disablePadding: true,
      label: "Mã đơn hàng",
    },
    {
      id: "date",
      numeric: false,
      disablePadding: true,
      label: "Ngày giao",
    },
    {
      id: "orderStatus",
      numeric: false,
      disablePadding: true,
      label: "Trạng thái đơn hàng",
    },

    // {
    //   id: "weight",
    //   numeric: false,
    //   disablePadding: true,
    //   label: "Cân nặng",
    // },
  ];

  const DEFAULT_ORDER = "asc";
  const DEFAULT_ORDER_BY = "date";
  const DEFAULT_ROWS_PER_PAGE = 8;

  function OrdersTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (newOrderBy) => (event) => {
      onRequestSort(event, newOrderBy);
    };

    return (
      <TableHead sx={{ bgcolor: "var(--secondary-color)" }}>
        <TableRow sx={{ bgcolor: "var(--secondary-color)" }}>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? "right" : "left"}
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : false}
              sx={{ bgcolor: "var(--secondary-color)", fontSize: 17 }}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
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
            Chi tiết
          </TableCell>
        </TableRow>
      </TableHead>
    );
  }

  OrdersTableHead.propTypes = {
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
  const [selectedOrderDetails, setSelectedOrderDetails] = useState([]);
  const [openDetailsOrder, setOpenDetailsOrder] = useState(false);

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

  const clickDetailOrder = (order) => {
    setSelectedOrderDetails(order);
    setOpenDetailsOrder(true);
  };
  const closeDetailsOrder = () => {
    setOpenDetailsOrder(false);
  };

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

      const newPaddingHeight = 33 * numEmptyRows;
      setPaddingHeight(newPaddingHeight);
    },
    [order, orderBy, rowsPerPage, rows]
  );

  const handleChangeRowsPerPage = useCallback(
    (event) => {
      const updatedRowsPerPage = parseInt(event.target.value, 10);
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
      <Box
        sx={{
          width: "100%",
          height: "100%",
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
          <TableContainer
            sx={{ maxHeight: 0.93, bgcolor: "var(--secondary-color)" }}
          >
            <Table
              stickyHeader
              sx={{ minWidth: 500, height: "90%" }}
              aria-labelledby="tableTitle"
              size={"small"}
            >
              <OrdersTableHead
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
                          // style={{ paddingTop: "2px", paddingBottom: "2px" }}
                          >
                            {row.id}
                          </TableCell>
                          <TableCell
                          // style={{ paddingTop: "2px", paddingBottom: "2px" }}
                          >
                            {row.date}
                          </TableCell>
                          <TableCell align="center"
                          // style={{ paddingTop: "2px", paddingBottom: "2px" }}
                          >
                            {row.orderStatus}
                          </TableCell>
                          <TableCell align="center">
                            <Button
                              onClick={() => clickDetailOrder(row)}
                              style={{
                                color: "#4CAF50",
                                paddingLeft: "9px",
                              }}
                            >
                              <FaEye size={20} />
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
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[15]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <OrderDetailsDialog
          open={openDetailsOrder}
          onClose={closeDetailsOrder}
          selectedOrderDetails={selectedOrderDetails}
        />
      </Box>
    </>
  );
}
