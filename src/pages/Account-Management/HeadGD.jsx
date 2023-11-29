import { Box, Grid, Stack, Typography } from "@mui/material";
import Page from "../../components/Page";
import GDV_Account from "../../components/Table/GDV_Account";

const HeadGDAccount = () => {
  return (
    <Page>
      <Grid container justifyContent="center" spacing={0} height={1}>
        <Grid
          item
          justifyContent="center"
          height={{
            xs: "80%",
            sm: "80%",
            md: "90%",
            lg: "100%",
          }}
          lg={12}
          md={12}
          xs={12}
        >
          <Stack
            spacing={{ xs: 0, sm: 0 }}
            sx={{ p: "var(--padding-item)", height: "100%" }}
          >
            <Box
              sx={{
                //bgcolor: "var(--secondary-color)",
                borderRadius: 2,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                p: "var(--padding-item)",
                pt: 1,
                mb: 0,
                width: 1,
                height: "10%",
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  bgcolor: "var(--background-color)",
                  padding: "10px"
                }}
                
              >
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontFamily: "Inter",
                    fontSize: {
                      xs: "15px",
                      sm: "20px",
                      md: "22px",
                      lg: "22px",
                    },
                    color: "var(--title-color)",
                    zIndex: 1,
                  }}
                >
                    Quản lý tài khoản giao dịch viên
                </Typography>
              </Stack>
            </Box>
            <GDV_Account/>
          </Stack>
        </Grid>
      </Grid>
    </Page>
  );
};

export default HeadGDAccount;
