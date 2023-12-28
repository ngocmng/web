
import Page from "../../components/Page";

import { itemsNVTK } from "../../components/Navbar/ItemInfor";

import GDShipment from "../../components/Shipments/GDShipment";


const ShipmentGD = () => {

  return (
    <Page items={itemsNVTK}>
      <GDShipment/>
    </Page>
  );
};

export default ShipmentGD;
