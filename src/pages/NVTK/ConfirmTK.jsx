
import Page from "../../components/Page";

import { itemsNVTK } from "../../components/Navbar/ItemInfor";

import TKConfirm from "../../components/Confirmation/TKConfirm";


const ConfirmTK = () => {

  return (
    <Page items={itemsNVTK}>
      <TKConfirm/>
    </Page>
  );
};

export default ConfirmTK;
