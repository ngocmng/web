import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import System from "./pages/System-Management/CEO";
import Account from "./pages/Account-Management/CEO";
import HeadGDAccount from "./pages/Account-Management/HeadGD";
import HeadTKAccount from "./pages/Account-Management/HeadTK";
import HomeCEO from "./pages/Home/CEO/Home";
import HomeGD from "./pages/Home/LeadGD/Home";
import HomeTK from "./pages/Home/LeadTK/Home";
import StatisticCEO from "./pages/Statistic/CEO";
import StatisticGD from "./pages/Statistic/GD";
import StatisticTK from "./pages/Statistic/TK";
import SignIn from "./components/Test/SignIn";
import { useEffect } from "react";
import { dexieDB } from "./database/cache";
import { collection, onSnapshot } from "firebase/firestore";
import { fireDB } from "./database/firebase";

const App = () => {
  const logPackageDataFromDexieDB = async () => {
    try {
      const packageData = await dexieDB.table("LeadGDacc").toArray();
      console.log("Dữ liệu từ bảng package trong DexieDB:", packageData);
    } catch (error) {
      console.error("Lỗi khi truy vấn dữ liệu từ DexieDB:", error);
    }
  };
  // useEffect(() => {
  //   logusersDataFromDexieDB();
  // })

  useEffect(() => {
    const listener = onSnapshot(collection(fireDB, "GDsystem"), (snapshot) => {
      snapshot.docChanges().forEach(async (system) => {
        const systemDoc = system.doc;
        const systemData = systemDoc.data();
        await dexieDB.table("GDsystem").put({
              id: systemData.id,
              name: systemData.name,
              manage : systemData.manage,
              hotline: systemData.hotline,
              email : systemData.email,
              address: systemData.address,
              setDay:systemData.setDay,
              coverArea: systemData.coverArea,
              TKpoint:systemData.TKpoint,
            });
        return;
      });
      //logPackageDataFromDexieDB();
    });
    return () => listener();
  }, []);
  useEffect(() => {
    const listener = onSnapshot(collection(fireDB, "TKsystem"), (snapshot) => {
      snapshot.docChanges().forEach(async (system) => {
        const systemDoc = system.doc;
        const systemData = systemDoc.data();
        await dexieDB.table("TKsystem").put({
              id: systemData.id,
              name: systemData.name,
              manage : systemData.manage,
              hotline: systemData.hotline,
              email : systemData.email,
              address: systemData.address,
              setDay:systemData.setDay,
            });
        return;
      });
      //logPackageDataFromDexieDB();
    });
    return () => listener();
  }, []);

  useEffect(() => {
    const listener = onSnapshot(collection(fireDB, "LeadGDacc"), (snapshot) => {
      snapshot.docChanges().forEach(async (system) => {
        const systemDoc = system.doc;
        const systemData = systemDoc.data();
        await dexieDB.table("LeadGDacc").put({
              id: systemData.id,
              username: systemData.username,
              name: systemData.name,
              gd : systemData.gd,
              dob: systemData.dob,
              sex: systemData.sex,
              email : systemData.email,
              phone: systemData.phone,
              password: systemData.password
            });
        return;
      });
      logPackageDataFromDexieDB();
    });
    return () => listener();
  }, []);

  useEffect(() => {
    const listener = onSnapshot(collection(fireDB, "LeadTKacc"), (snapshot) => {
      snapshot.docChanges().forEach(async (system) => {
        const systemDoc = system.doc;
        const systemData = systemDoc.data();
        await dexieDB.table("LeadTKacc").put({
              id: systemData.id,
              username: systemData.username,
              name: systemData.name,
              tk : systemData.tk,
              dob: systemData.dob,
              sex: systemData.sex,
              email : systemData.email,
              phone: systemData.phone,
              password: systemData.password
            });
        return;
      });
      //logPackageDataFromDexieDB();
    });
    return () => listener();
  }, []);


  const navigate = useNavigate();
  const onSignIn = () => navigate("/home");
  const id = localStorage.getItem("id");
  return (
    <>
      <div className="App">
        <CssBaseline />

        <Routes>
          <Route path="/" element={<SignIn transfer={onSignIn} />} />
          {/* <Route path="/" element={id === "ceo" ? <HomeCEO /> : id==="gd"? <HomeGD/>: <HomeTK/>} /> */}
          <Route
            path="/home"
            element={
              id === "ceo" ? <HomeCEO /> : id === "gd" ? <HomeGD /> : <HomeTK />
            }
          />
          <Route
            path="/statistic"
            element={
              id === "ceo" ? (
                <StatisticCEO />
              ) : id === "gd" ? (
                <StatisticGD />
              ) : (
                <StatisticTK />
              )
            }
          />
          <Route
            path="/system"
            element={
              id === "ceo" ? <System /> : id === "gd" ? <HomeGD /> : <HomeTK />
            }
          />
          <Route
            path="/account"
            element={
              id === "ceo" ? (
                <Account />
              ) : id === "gd" ? (
                <HeadGDAccount />
              ) : (
                <HeadTKAccount />
              )
            }
          />
        </Routes>
      </div>
    </>
  );
};

export default App;
