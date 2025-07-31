import { useNavigate } from "react-router-dom";
import { updateProfile } from "@/lib/api/profile";
import ProfileForm from "@/components/dashboard/ProfileForm";
import { useAuth } from "@/hooks/useAuth";

export default function ProfileEditPage() {
  const navigate = useNavigate();
  const { fetchProfile } = useAuth();

  const handleSave = async (data: {
    first_name: string;
    last_name: string;
  }) => {
    try {
      await updateProfile(data);
      await fetchProfile();

      navigate("/dashboard/profile");
    } catch (err) {
      console.error("Failed to update profile", err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 space-y-6">
      <h2 className="text-xl font-semibold text-center">Edit Profil</h2>
      <ProfileForm isEditable onSubmit={handleSave} submitLabel="Simpan" />
    </div>
  );
}
