import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "@/stores/authSlice";
import { Button } from "@/components/ui/button";
import ProfileForm from "@/components/dashboard/ProfileForm";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="max-w-xl mx-auto p-4 space-y-6">
      <ProfileForm isEditable={false} />

      <Button
        onClick={() => navigate("/dashboard/profile/update")}
        className="w-full rounded-none"
        variant="outline"
      >
        Edit Profile
      </Button>

      <Button
        onClick={handleLogout}
        className="w-full rounded-none bg-red-600 hover:bg-red-700 text-white"
      >
        Logout
      </Button>
    </div>
  );
}
