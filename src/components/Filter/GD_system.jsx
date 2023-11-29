import React from "react";
import { Autocomplete, TextField, Box, Typography, Grid } from "@mui/material";

const GDFilterComponent = ({ filters, onFilterChange, data }) => {
  const handleAutocompleteChange = (field, value) => {
    onFilterChange(field, value);
  };

  const uniqueIds = [...new Set(data.map((entry) => entry.id))];
  const uniqueNames = [...new Set(data.map((entry) => entry.name))];
  const uniqueManages = [...new Set(data.map((entry) => entry.manage))];
  const uniqueCoverAreas = [...new Set(data.map((entry) => entry.coverArea))];
  const uniqueTKpoints = [...new Set(data.map((entry) => entry.TKpoint))];

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
      <Grid item xs={2} sm={2.4}>
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
        <Grid item xs={2.4} sm={2.4}>
          <Autocomplete
            options={uniqueNames} // Sử dụng mảng chứa các giá trị duy nhất
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
        <Grid item xs={3} sm={2.4}>
          <Autocomplete
            options={uniqueManages} 
            renderInput={(params) => (
              <TextField
                {...params}
                label="Trưởng điểm GD"
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
        <Grid item xs={3} sm={2.4}>
          <Autocomplete
            options={uniqueCoverAreas} 
            renderInput={(params) => (
              <TextField
                {...params}
                label="Vùng phụ trách"
                margin="normal"
                variant="outlined"
              />
            )}
            onChange={(e, value) =>
              handleAutocompleteChange("coverArea", value)
            }
            freeSolo
            value={filters.coverArea}
            onInputChange={(e, value) =>
              handleAutocompleteChange("coverArea", value)
            }
          />
        </Grid>
        <Grid item xs={2.4} sm={2.4}>
          <Autocomplete
            options={uniqueTKpoints} 
            renderInput={(params) => (
              <TextField
                {...params}
                label="Điểm tập kết"
                margin="normal"
                variant="outlined"
              />
            )}
            onChange={(e, value) => handleAutocompleteChange("TKpoint", value)}
            freeSolo
            value={filters.TKpoint}
            onInputChange={(e, value) =>
              handleAutocompleteChange("TKpoint", value)
            }
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default GDFilterComponent;
