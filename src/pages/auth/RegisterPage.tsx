import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import AuthLayout from "@/layouts/AuthLayout";
import { useAuth } from "@/hooks/useAuth";
import clsx from "clsx";

const registerSchema = z
  .object({
    email: z.string().email("Masukkan email yang valid"),
    first_name: z.string().min(1, "Nama depan wajib diisi"),
    last_name: z.string().min(1, "Nama belakang wajib diisi"),
    password: z.string().min(6, "Password minimal 6 karakter"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak sama",
    path: ["confirmPassword"],
  });

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const { register: doRegister } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    const success = await doRegister({
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      password: data.password,
    });

    if (success) {
      navigate("/login");
    } else {
      alert("Registrasi gagal. Coba lagi.");
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <p className="mb-12 text-3xl font-semibold text-center">
          Lengkapi data untuk membuat akun
        </p>
        <div>
          <Input
            type="email"
            placeholder="wallet@nutech.com"
            {...register("email")}
            className={clsx({ "border-red-500": errors.email })}
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Input
            type="text"
            placeholder="Nama depan"
            {...register("first_name")}
            className={clsx({ "border-red-500": errors.first_name })}
          />
          {errors.first_name && (
            <p className="text-sm text-red-500 mt-1">
              {errors.first_name.message}
            </p>
          )}
        </div>

        <div>
          <Input
            type="text"
            placeholder="Nama belakang"
            {...register("last_name")}
            className={clsx({ "border-red-500": errors.last_name })}
          />
          {errors.last_name && (
            <p className="text-sm text-red-500 mt-1">
              {errors.last_name.message}
            </p>
          )}
        </div>

        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register("password")}
            className={clsx({ "border-red-500": errors.password })}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          {errors.password && (
            <p className="text-sm text-red-500 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="relative">
          <Input
            type={showConfirm ? "text" : "password"}
            placeholder="Konfirmasi password"
            {...register("confirmPassword")}
            className={clsx({ "border-red-500": errors.confirmPassword })}
          />
          <button
            type="button"
            onClick={() => setShowConfirm((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          {errors.confirmPassword && (
            <p className="text-sm text-red-500 mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-red-500 hover:bg-red-600 text-white"
        >
          Registrasi
        </Button>
      </form>

      <p className="text-sm text-center text-gray-600">
        Sudah punya akun?{" "}
        <Link to="/login" className="text-red-500 font-semibold">
          login di sini
        </Link>
      </p>
    </AuthLayout>
  );
}
