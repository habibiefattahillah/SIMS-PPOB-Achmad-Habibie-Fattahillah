import type { Service } from "@/types/api";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/stores/store";

export default function ServiceGrid() {
  const { services } = useSelector((state: RootState) => state.information);
  const navigate = useNavigate();

  const handleClick = (service: Service) => {
    navigate(`/dashboard/${service.service_code}`, { state: { service } });
  };

  return (
    <div className="grid grid-cols-4 sm:grid-cols-8 md:grid-cols-12 gap-2">
      {services.map((svc) => (
        <div
          key={svc.service_code}
          className="flex flex-col items-center text-center cursor-pointer"
          onClick={() => handleClick(svc)}
        >
          <img
            src={svc.service_icon}
            alt={svc.service_name}
            className="h-15 w-15"
          />
          <p className="text-xs mt-1">{svc.service_name}</p>
        </div>
      ))}
    </div>
  );
}
