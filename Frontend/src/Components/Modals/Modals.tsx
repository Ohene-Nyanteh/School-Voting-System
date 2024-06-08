import GhanassLogo from "../../assets/ghanass_logo.jfif"
import { useEffect, useState } from "react";


export default function Modals() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={`${show ? "translate-y-0" : "translate-y-[-100%]"} bg-white fixed inset-0 z-50 flex items-center justify-center  transition-transform duration-1000 ease-in-out border-b-4 border-b-black`}>
      <div><img src={GhanassLogo} width={200} height={200}/></div>
    </div>
  )
}

