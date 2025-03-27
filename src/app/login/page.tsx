//main ui of login page
"use client";
import { useState } from "react";
import { login } from "../../actions/login";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ReCAPTCHA from "react-google-recaptcha";


interface LoginFormProps {
  onSuccess: () => void;
}


const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";


export default function LoginForm({ onSuccess }: LoginFormProps) {
  const [formData, setFormData] = useState({ username: "", password: "", captcha: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [accountLocked, setAccountLocked] = useState(false);
  const router = useRouter();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleCaptchaChange = (token: string | null) => {
    setFormData({ ...formData, captcha: token ?? "" });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);


    if (!formData.captcha) {
      setError("Please complete the CAPTCHA");
      setLoading(false);
      return;
    }


    try {
      const response = await login(formData.username, formData.password);
      setLoading(false);
      if (response && "error" in response) {
        if (response.error === "Account locked") {
          setAccountLocked(true);
        }
        setError(response.error as string);
      } else {
        setError(null);
        onSuccess();
      }
    } catch (err) {
      setLoading(false);
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    }
  };


  return (
    <Card className="max-w-md mx-auto mt-10 p-6">
      {accountLocked && (
        <div className="account-locked-popup">
          <Image src="/sad-dog.gif" alt="Sad Dog" width={100} height={100} className="dog-gif" />
          <p>Your account has been locked. Try again later.</p>
        </div>
      )}
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" className="w-full p-2 border rounded" />
          <div className="relative">
            <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="w-full p-2 border rounded" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-2 text-sm">
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <ReCAPTCHA sitekey={SITE_KEY} onChange={handleCaptchaChange} />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <p className="text-sm text-blue-500 cursor-pointer">
            <a href="/forgot-password">Forgot password?</a>
          </p>
          <CardFooter>
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
