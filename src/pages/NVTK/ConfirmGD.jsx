
import Page from "../../components/Page";

import { itemsNVTK } from "../../components/Navbar/ItemInfor";

import GDConfirm from "../../components/Confirmation/GDConfirm";


const ConfirmGD = () => {

  return (
    <Page items={itemsNVTK}>
      <GDConfirm/>
    </Page>
  );
};

export default ConfirmGD;
