import Dexie from "dexie";
import { fireDB } from "./firebase";
import { doc, setDoc, collection, deleteDoc, updateDoc } from "firebase/firestore";

const dexieDB = new Dexie("cachedUser12");
dexieDB.version(1).stores({
  users: "id, name",
  package: "id",
  GDsystem: "id",
  TKsystem: "id",
  LeadGDacc: "id",
  LeadTKacc: "id",
});

async function deleteDataFromFireStoreAndDexie(collectionName, id) {
  try {
    const docRef = doc(fireDB, collectionName, id);
    await deleteDoc(docRef);
    await deleteDataFromDexieTable(collectionName, id);
    alert("Xóa tài khoản thành công!");
  } catch (error) {
    console.error("Loi khi xoa trong firestore: ", error);
  }
}

async function deleteDataFromDexieTable(tableName, id) {
  dexieDB
      .table(tableName)
      .where("id")
      .equals(id)
      .delete()
      .then(() => {
        console.log("xoa trong dexieDB");
      })
      .catch((error) => {
        console.error("Loi khi xoa data dexieDB", error);
      });
}

async function updateDataFromFireStoreAndDexie(collectionName, id, newData) {
  try {
    const docRef = doc(fireDB, collectionName, id);
    await updateDoc(docRef, newData);
    await updateDataFromDexieTable(collectionName, id, newData);
    alert("Cập nhật thông tin tài khoản thành công!");
  } catch (error) {
    console.error("Loi khi update trong firestore: ", error);
  }
}

async function updateDataFromDexieTable(tableName, id, newData) {
      try {
        await dexieDB.table(tableName).update(id, newData);
        console.log("update dexieDB");
      } catch (error) {
        console.error("Loi khi update data dexieDB", error);
      }
}

async function addDataToFireStoreAndDexie(collectionName,newData) {
  try {
    const docRef = doc(fireDB, collectionName, newData.id);
    await setDoc(docRef, newData);
    await addDataToDexieTable(collectionName, newData);
    if (collectionName === "GDsystem") {
      alert("Điểm giao dịch đã được thêm thành công");
    }
    if (collectionName === "TKsystem") {
      alert("Điểm tập kết đã được thêm thành công");
    }
    if (collectionName === "LeadGDacc") {
      alert("Tài khoản trưởng điểm giao dịch đã được thêm thành công");
    }
    if (collectionName === "LeadTKacc") {
      alert("Tài khoản trưởng điểm tập kết đã được thêm thành công");
    }
  } catch (error) {
    console.error("Loi khi add trong firestore: ", error);
  }
}

async function addDataToDexieTable(tableName, newData) {
      try {
        await dexieDB.table(tableName).add(newData);
        console.log("add dexieDB");
      } catch (error) {
        console.error("Loi khi add data dexieDB", error);
      }
}

// function syncDexieToFirestore(tableName, collectionName, fieldsToSync) {
//   dexieDB[tableName].toArray().then((data) => {
//     data.forEach(async (record) => {
//       if (record.id) {
//         const { id, ...dataFields } = record;
//         const updateObject = {};
//         fieldsToSync.forEach((field) => {
//           updateObject[field] = dataFields[field];
//         });

//         const docRef = doc(fireDB, collectionName, id.toString());
//         await setDoc(docRef, updateObject);
//       }
//     });
//   });
// }

// const fetchData = async (collectionName, setter) => {
//   try {
//     const collectionRef = fireDB.collection(collectionName);
//     console.log("fetch")
//     const querySnapshot = await collectionRef.get();
//     console.log(querySnapshot);
//     const newData = querySnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));
//     setter(newData);
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// };

const loadUserState = (email) => {
  localStorage.setItem("email", email);
  const firstTwoCharacters = email.substring(0, 2).toLowerCase();
  let id;

  if (firstTwoCharacters === "tk" || firstTwoCharacters === "gd") {
    id = firstTwoCharacters;
  } else {
    id = "ceo";
  }

  localStorage.setItem("id", id);
  console.log(id);
  // const loadProfile = async () => {
  //   const userDoc = await getDoc(doc(fireDB, "users", localStorage.getItem("id")));
  //   const data = userDoc.data();
  // };
  // loadProfile();
};

const clearUserState = () => {
  ["id", "email"].forEach((key) => localStorage.setItem(key, ""));
};

export { dexieDB, loadUserState, clearUserState, deleteDataFromFireStoreAndDexie,updateDataFromFireStoreAndDexie, addDataToFireStoreAndDexie };
