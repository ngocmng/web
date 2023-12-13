import React from "react";
import { Autocomplete, TextField, Box, Typography, Grid } from "@mui/material";

const TKFilterComponent = ({ filters, onFilterChange, data }) => {
  const handleAutocompleteChange = (field, value) => {
    onFilterChange(field, value);
  };

  const uniqueIds = [...new Set(data.map((entry) => entry.id))];
  const uniqueNames = [...new Set(data.map((entry) => entry.name))];
  const uniqueManages = [...new Set(data.map((entry) => entry.manage))];

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
        }
      }}>
      {/* <Typography variant="h5" gutterBottom color="textPrimary">
        Filter
      </Typography> */}
      <Grid container spacing={1} >
        {" "}
        {/* Thêm Grid container và spacing */}
        <Grid item xs={3} sm={3}>
          {" "}
          {/* Grid item cho mỗi filter */}
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
        <Grid item xs={3} sm={3}>
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
        <Grid item xs={4} sm={3}>
          <Autocomplete
            options={uniqueManages}    
            renderInput={(params) => (
              <TextField
                {...params}
                label="Trưởng điểm TK"
                margin="normal"
                variant="outlined"
              />
            )}
            onChange={(e, value) => handleAutocompleteChange("manage", value)}
            freeSolo
            value={filters.manage}
            onInputChange={(e, value) =>
              handleAutocompleteChange("manage", value)
            }
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default TKFilterComponent;
