import Home from "../pages/Home";
import Customer from "../pages/Customer";
import Upload from "../pages/Upload";
import Defaultlayout from "../components/layout/defaultLayout";
import HeaderOnly from "../components/layout/headerOnly";
import Supplier from "../pages/Supplier";
import Automaker from "../pages/Automaker";
import Accessory from "../pages/Accessory";
import ReceiveCar from "../pages/RecieveCar";
import RepairCar from "../pages/repairCar";
import statistical from "../pages/statistical";
import Inventory from "../pages/inventory";
// import Vehicle from "../pages/Vehicle";
//layout
// import { headerOnly } from "../component/layout";

const publicRouter = [
    {path : '/', component:Home, layout: HeaderOnly},
    {path : '/Home', component:Home, layout: Defaultlayout},
    {path : '/customer', component:Customer, layout: Defaultlayout},
    {path : '/upload', component:Upload, layout: Defaultlayout},
    {path : '/supplier', component:Supplier, layout: Defaultlayout},
    {path : '/automaker', component:Automaker, layout: Defaultlayout},
    {path : '/Accessory', component:Accessory, layout: Defaultlayout},
    {path : '/ReceiveCar', component:ReceiveCar, layout: Defaultlayout},
    {path : '/RepairCar', component:RepairCar, layout: Defaultlayout},
    {path : '/Chart', component:statistical, layout: Defaultlayout},
    {path : '/Inventory', component:Inventory, layout: Defaultlayout},
]

const privateRouter: never[] = [// khi nào dùng thì làm giống publicRouter
    
]

export {publicRouter,privateRouter}