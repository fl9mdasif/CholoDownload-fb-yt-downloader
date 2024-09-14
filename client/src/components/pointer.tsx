/* eslint-disable @typescript-eslint/no-explicit-any */
 
import { FollowerPointerCard } from "../components/ui/following-pointer";

export function FollowingPointerDemo({children}:{children:any}) {
  return (
    <div className="relative w-full h-full pointer-wrapper">
      <FollowerPointerCard
         
      >
        <div className="relative overflow-hidden h-full rounded-2xl transition duration-200 group bg-white hover:shadow-xl border border-zinc-100">
            <div className="flex flex-row justify-between items-center mt-10"> 
              
              {children}
             
            </div>
        
        </div>
      </FollowerPointerCard>
    </div>
  );
}

 
 

// // Custom styles for pointer to be applied globally
// <style jsx>{`
//   .pointer-wrapper {
//     cursor: none;
//     position: relative;
//   }
//   .pointer {
//     position: absolute;
//     width: 20px;
//     height: 20px;
//     border-radius: 50%;
//     background-color: rgba(0, 0, 0, 0.5);
//     pointer-events: none;
//     transform: translate(-50%, -50%);
//   }
// `}</style>
