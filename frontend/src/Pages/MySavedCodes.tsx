import { MagicCard } from "../components/ui/magic-card";

import { useGetMyCodesQuery } from "../redux/slices/api";
function MySavedCodes() {
  const { data: myCodes } = useGetMyCodesQuery();

  console.log(myCodes);

  // Ensure myCodes is an array before mapping
 return <div className="border-2 p-4">
   {myCodes?.map((item)=>{
    return item.title
   })}
 </div>
  
}

export default MySavedCodes;
