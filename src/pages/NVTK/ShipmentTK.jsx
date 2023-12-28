
import Page from "../../components/Page";

import { itemsNVTK } from "../../components/Navbar/ItemInfor";

import TKShipment from "../../components/Shipments/TKShipment";


const ShipmentTK = () => {

  return (
    <Page items={itemsNVTK}>
      <TKShipment/>
    </Page>
  );
};

export default ShipmentTK;
