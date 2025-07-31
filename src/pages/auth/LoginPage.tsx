import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import clsx from "clsx";
import AuthLayout from "@/layouts/AuthLayout";

const loginSchema = z.object({
  email: z.string().email({ message: "Masukkan email yang valid" }),
  password: z.string().min(6, { message: "Password minimal 6 karakter" }),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    const success = await login(data.email, data.password);
    if (!success) {
      setLoginError("Password yang anda masukan salah");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <p className="text-3xl mb-12 font-semibold text-center">
          Masuk atau buat akun untuk memulai
        </p>
        <div>
          <Input
            type="email"
            placeholder="wallet@nutech.com"
            {...register("email")}
            className={clsx({
              "border-red-500": errors.email,
            })}
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="masukkan password anda"
            {...register("password")}
            className={clsx({
              "border-red-500": errors.password || loginError,
            })}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          {(errors.password || loginError) && (
            <p className="text-sm text-red-500 mt-1">
              {errors.password?.message || loginError}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-red-500 hover:bg-red-600 text-white"
        >
          Masuk
        </Button>
      </form>

      <p className="text-sm text-center text-gray-600">
        Belum punya akun?{" "}
        <Link to="/register" className="text-red-500 font-semibold">
          registrasi di sini
        </Link>
      </p>
    </AuthLayout>
  );
}
