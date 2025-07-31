import { useNavigate } from "react-router-dom";
import ProfileForm from "@/components/dashboard/ProfileForm";

export default function ProfileEditPage() {
  const navigate = useNavigate();

  const handleSave = (data: { first_name: string; last_name: string }) => {
    console.log("Saving updated profile:", data);

    // Optionally dispatch an updateUser API call here

    navigate("/profile/update");
  };

  return (
    <div className="max-w-xl mx-auto p-4 space-y-6">
      <h2 className="text-xl font-semibold text-center">Edit Profil</h2>
      <ProfileForm isEditable onSubmit={handleSave} submitLabel="Simpan" />
    </div>
  );
}
