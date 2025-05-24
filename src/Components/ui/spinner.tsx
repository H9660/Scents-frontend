import { Loader2 } from "lucide-react"
export function Spinner() {
    return (
      <div className="flex justify-center items-center h-screen">
  <Loader2 className="animate-spin text-white-400 w-16 h-16 animate-[spin_0.4s_linear_infinite]" />
</div>
    )
  }
  
