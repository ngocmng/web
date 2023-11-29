import "./App.css";
import { Routes, Route, useNavigate} from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import System from "./pages/System-Management/CEO";
import Account from "./pages/Account-Management/CEO";
import Statistic from "./pages/Statistic/CEO";
import HeadGDAccount from "./pages/Account-Management/HeadGD";
import HeadTKAccount from "./pages/Account-Management/HeadTK";
import HomeCEO from "./pages/Home/CEO/Home";
import HomeGD from "./pages/Home/LeadGD/Home";
import HomeTK from "./pages/Home/LeadTK/Home";

const App = () => {
  var id = "ceo";
  return (
    <>
  
    <div className="App">
      <CssBaseline />
 
      <Routes>
        <Route path="/" element={id === "ceo" ? <HomeCEO /> : id==="gd"? <HomeGD/>: <HomeTK/>} />
        <Route path="/home" element={id === "ceo" ? <HomeCEO /> : id==="gd"? <HomeGD/>: <HomeTK/>} />
        <Route path="/statistic" element={<Statistic/>}/>
        <Route path="/system" element={id === "ceo"? <System/>: ""}/>
        <Route path="/account" element={id === "ceo" ? <Account /> : id==="gd"? <HeadGDAccount/>: <HeadTKAccount/>} />
      </Routes>
    </div>
    </>
  );
};

export default App;
