import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  useTheme,
  useMediaQuery
} from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PublicIcon from '@mui/icons-material/Public';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import SendToMobileIcon from '@mui/icons-material/SendToMobile';

const ThirdPanel = () => {
  const primaryColor = "#003e29";
  const hoverColor = "#f5f5f5";
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const services = [
    {
      title: "MAGIC POST TÀI LIỆU",
      description: "MAGIC POST Tài liệu là dịch vụ nhận gửi, vận chuyển và phát các loại thư, tài liệu trong nước theo chỉ tiêu thời gian tiêu chuẩn được Tổng công ty MAGIC POST công bố.",
      Icon: LocalShippingIcon,
    },
    {
      title: "CHUYỂN PHÁT NHANH MAGIC POST QUỐC TẾ",
      description: "Chuyển phát nhanh MAGIC POST Quốc tế là dịch vụ nhận gửi, vận chuyển và phát các loại thư, tài liệu, vật phẩm, hàng hóa quốc tế theo chỉ tiêu thời gian tiêu chuẩn được Tổng công ty MAGIC POST công bố.",
      Icon: PublicIcon,
    },
    {
      title: "MAGIC POST HOẢ TỐC",
      description: "MAGIC POST Hoả tốc là dịch vụ chất lượng cao có chỉ tiêu thời gian toàn trình rút ngắn so với dịch vụ MAGIC POST Tài liệu/Hàng hoá nhanh, trong đó bưu gửi được ưu tiên chuyển phát đến người nhận trong khung thời gian...",
      Icon: DesktopWindowsIcon,
    }, {
      title: "MAGIC POST THƯƠNG MẠI ĐIỆN TỬ",
      description: "Dịch vụ MAGIC POST Thương mại điện tử là dịch vụ chuyển phát cho khách hàng Thương mại điện tử (TMĐT) và thực hiện thu hộ/không thu hộ một khoản tiền theo yêu cầu để hoàn thành hoạt động giao dịch mua bán",
      Icon: SendToMobileIcon,
    },

  ];

  return (
    <Box sx={{ flexGrow: 1, padding: 3, bgcolor: 'common.white', color: primaryColor }}>
      <Typography variant={isMobile ? "h5" : "h4"} align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
        Dịch vụ nổi bật
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {services.map((service, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <Card sx={{
              bgcolor: 'transparent',
              boxShadow: 'none',
              '&:hover': {
                bgcolor: hoverColor,
              },
              '&:hover .MuiTypography-h6': {
                color: primaryColor,
              },
              '&:hover .MuiTypography-body2': {
                color: primaryColor,
              },
            }}>
              <CardActionArea>
                <CardContent sx={{ textAlign: 'center', py: 4 }}>
                  <service.Icon sx={{ fontSize: isMobile ? 40 : 60, color: primaryColor }} />
                  <Typography variant="h6" gutterBottom component="div" sx={{ fontWeight: 'medium' }}>
                    {service.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {service.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ThirdPanel;


