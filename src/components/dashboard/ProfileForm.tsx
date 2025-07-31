import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/stores/store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { updateProfileImage } from "@/lib/api/profile";
import { useAuth } from "@/hooks/useAuth";
import clsx from "clsx";

interface ProfileFormProps {
  isEditable?: boolean;
  onSubmit?: (data: { first_name: string; last_name: string }) => void;
  submitLabel?: string;
}

export default function ProfileForm({
  isEditable = false,
  onSubmit,
  submitLabel = "Simpan",
}: ProfileFormProps) {
  const user = useSelector((state: RootState) => state.auth.user);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const { fetchProfile } = useAuth();

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name);
      setLastName(user.last_name);
    }
  }, [user]);

  if (!user) return null;

  const handleSubmit = async () => {
    if (selectedImage) {
      try {
        await updateProfileImage(selectedImage);
        await fetchProfile();
        setSelectedImage(null);
      } catch (err) {
        console.error("Failed to upload profile image", err);
      }
    }

    onSubmit?.({ first_name: firstName, last_name: lastName });
  };

  const handleImageClick = () => {
    imageInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center space-y-2">
        <div className="relative group">
          <img
            src={
              selectedImage
                ? URL.createObjectURL(selectedImage)
                : user.profile_image
            }
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border"
          />

          {isEditable && (
            <>
              <div
                onClick={handleImageClick}
                className="absolute bottom-0 left-0 bg-white border rounded-full p-1 cursor-pointer shadow-sm hover:bg-gray-100"
              >
                <Pencil className="w-4 h-4 text-gray-700" />
              </div>
              <input
                type="file"
                accept="image/*"
                ref={imageInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
            </>
          )}
        </div>
        <h2 className="text-xl font-semibold">
          {firstName} {lastName}
        </h2>
      </div>

      <div>
        <label>Email</label>
        <Input className="rounded-none" value={user.email} disabled />
      </div>

      <div>
        <label>Nama Depan</label>
        <Input
          className="rounded-none"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          disabled={!isEditable}
        />
      </div>

      <div>
        <label>Nama Belakang</label>
        <Input
          className="rounded-none"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          disabled={!isEditable}
        />
      </div>

      {isEditable && (
        <Button
          onClick={handleSubmit}
          className={clsx("w-full rounded-none", {
            "bg-blue-600 text-white hover:bg-blue-700": selectedImage,
          })}
          variant="outline"
        >
          {submitLabel}
        </Button>
      )}
    </div>
  );
}
