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
import { fireAuth, fireDB } from "./database/firebase";

const App = () => {
  const logPackageDataFromDexieDB = async () => {
    try {
      const packageData = await dexieDB.table("orderHistory").toArray();
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
      //logPackageDataFromDexieDB();
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

  useEffect(() => {
    const listener = onSnapshot(collection(fireDB, "NVTKacc"), (snapshot) => {
      snapshot.docChanges().forEach(async (system) => {
        const systemDoc = system.doc;
        const systemData = systemDoc.data();
        await dexieDB.table("NVTKacc").put({
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

  useEffect(() => {
    const listener = onSnapshot(collection(fireDB, "GDVacc"), (snapshot) => {
      snapshot.docChanges().forEach(async (system) => {
        const systemDoc = system.doc;
        const systemData = systemDoc.data();
        await dexieDB.table("GDVacc").put({
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
      //logPackageDataFromDexieDB();
    });
    return () => listener();
  }, []);

  useEffect(() => {
    const listener = onSnapshot(collection(fireDB, "orderHistory"), (snapshot) => {
      snapshot.docChanges().forEach(async (system) => {
        const systemDoc = system.doc;
        const systemData = systemDoc.data();
        await dexieDB.table("orderHistory").put({
              historyID: systemData.historyID,
              orderID: systemData.orderID,
              date: systemData.date,
              currentLocation : systemData.currentLocation,
              Description: systemData.Description,
              orderStatus: systemData.orderStatus,
            });
        return;
      });
      //logPackageDataFromDexieDB();
    });
    return () => listener();
  }, []);

  useEffect(() => {
    const listener = onSnapshot(collection(fireDB, "orders"), (snapshot) => {
      snapshot.docChanges().forEach(async (system) => {
        const systemDoc = system.doc;
        const systemData = systemDoc.data();
        await dexieDB.table("orders").put({
              id: systemData.id,
              senderName: systemData.senderName,
              senderPhone: systemData.senderPhone,
              senderAddress: systemData.senderAddress,
              receiveName: systemData.receiveName,
              receivePhone: systemData.receivePhone,
              receiveAddress: systemData.receiveAddress,
              type: systemData.type,
              weight: systemData.weight,
              cost: systemData.cost,
              startGDpoint: systemData.startGDpoint,
              startTKpoint: systemData.startTKpoint,
              endTKpoint: systemData.endTKpoint,
              endGDpoint: systemData.endGDpoint,
            });
        return;
      });
      //logPackageDataFromDexieDB();
    });
    return () => listener();
  }, []);


  const navigate = useNavigate();
  const onSignIn = () => navigate("/home");
  const id = localStorage.getItem("id").slice(0,3);
  return (
    <>
      <div className="App">
        <CssBaseline />

        <Routes>
          <Route path="/" element={<SignIn transfer={onSignIn} />} />
          <Route
            path="/home"
            element={
              id === "CEO" ? <HomeCEO /> : id === "LGD" ? <HomeGD /> : <HomeTK />
            }
          />
          <Route
            path="/statistic"
            element={
              id === "CEO" ? (
                <StatisticCEO />
              ) : id === "LGD" ? (
                <StatisticGD />
              ) : (
                <StatisticTK />
              )
            }
          />
          <Route
            path="/system"
            element={
              id === "CEO" ? <System /> : id === "LGD" ? <HomeGD /> : <HomeTK />
            }
          />
          <Route
            path="/account"
            element={
              id === "CEO" ? (
                <Account />
              ) : id === "LGD" ? (
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
