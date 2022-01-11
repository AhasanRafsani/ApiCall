import React from "react";
import { useLocation } from "react-router-dom";
import {InitPost} from "./ApiCall"
const RowDetails:React.FC = ()=>{

 const {state} = useLocation<InitPost>();
 ; 
  return(
      <div data-testid="details">
         <pre>
             {
              JSON.stringify(state,null,2)
             }
         </pre>
      </div>
  )   
}
export default RowDetails;