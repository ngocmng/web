import React from "react";
import { Autocomplete, TextField, Box, Typography, Grid } from "@mui/material";

const GDFilterComponent = ({ filters, onFilterChange, data }) => {
  const handleAutocompleteChange = (field, value) => {
    onFilterChange(field, value);
  };

  const uniqueIds = [...new Set(data.map((entry) => entry.id))];
  const uniqueUsernames = [...new Set(data.map((entry) => entry.username))];
  const uniqueNames = [...new Set(data.map((entry) => entry.name))];
  const uniqueSex = [...new Set(data.map((entry) => entry.sex))];
  const uniqueGD = [...new Set(data.map((entry) => entry.gd))];

  return (
    <Box sx={{
        // width: "100%",
        // height: "85%",
        bgcolor: "var(--filter-color)",
        borderRadius: 2,
        paddingTop: "1px",
        paddingLeft: "10px",
        paddingRight: "10px",
        paddingBottom: {
          xs: "10px",
          sm: "1px",
          md: "1px",
          lg: "1px",
        },
      }}>
      {/* <Typography variant="h5" gutterBottom color="textPrimary">
        Filter
      </Typography> */}
      <Grid container spacing={1} >
        <Grid item xs={2.4} sm={2.4}>
          <Autocomplete
            options={uniqueIds} 
            renderInput={(params) => (
              <TextField
                {...params}
                label="ID"
                margin="normal"
                variant="outlined"
              />
            )}
            onChange={(e, value) => handleAutocompleteChange("id", value)}
            freeSolo
            value={filters.id}
            onInputChange={(e, value) => handleAutocompleteChange("id", value)}
          />
        </Grid>
        <Grid item xs={3} sm={2.4}>
          <Autocomplete
            options={uniqueUsernames} 
            renderInput={(params) => (
              <TextField
                {...params}
                label="Username"
                margin="normal"
                variant="outlined"
              />
            )}
            onChange={(e, value) => handleAutocompleteChange("username", value)}
            freeSolo
            value={filters.username}
            onInputChange={(e, value) =>
              handleAutocompleteChange("username", value)
            }
          />
        </Grid>
        <Grid item xs={3} sm={2.4}>
          <Autocomplete
            options={uniqueNames} 
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tên"
                margin="normal"
                variant="outlined"
              />
            )}
            onChange={(e, value) => handleAutocompleteChange("name", value)}
            freeSolo
            value={filters.name}
            onInputChange={(e, value) =>
              handleAutocompleteChange("name", value)
            }
          />
        </Grid>
        <Grid item xs={2.4} sm={2.4}>
          <Autocomplete
            options={uniqueSex} 
            renderInput={(params) => (
              <TextField
                {...params}
                label="Giới tính"
                margin="normal"
                variant="outlined"
              />
            )}
            onChange={(e, value) => handleAutocompleteChange("sex", value)}
            freeSolo
            value={filters.sex}
            onInputChange={(e, value) =>
              handleAutocompleteChange("sex", value)
            }
          />
        </Grid>
        <Grid item xs={4} sm={2.4}>
          <Autocomplete
            options={uniqueGD} 
            renderInput={(params) => (
              <TextField
                {...params}
                label="Điểm giao dịch"
                margin="normal"
                variant="outlined"
              />
            )}
            onChange={(e, value) => handleAutocompleteChange("gd", value)}
            freeSolo
            value={filters.gd}
            onInputChange={(e, value) =>
              handleAutocompleteChange("gd", value)
            }
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default GDFilterComponent;
