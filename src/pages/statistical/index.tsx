import React from "react";
import { Chart } from "./statistical";
import RepairHooks from "../repairCar/hook";

function Statistical() {

    return (
        <div style={{height:'990px', width:"650px",display:"flex"}}>
            <Chart/>
        </div>
    )
}
export default Statistical;