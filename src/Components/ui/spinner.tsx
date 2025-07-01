import { Loader2 } from "lucide-react"
export function Spinner() {
    return (
      <div className="flex justify-center items-center h-screen">
  <Loader2 className="animate-spin text-black w-16 h-16 animate-[spin_0.3s_linear_infinite]" />
</div>

    )
  }
  
