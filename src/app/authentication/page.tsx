"use client";

import { useRef, useState, FormEvent } from "react";
import CustomInput from "@/components/shared/CustomInput";
import { Eye, EyeOff } from "lucide-react";
import Button from "@/components/shared/Button";
import { motion as m } from "framer-motion";
import { fromZodError } from "zod-validation-error";
import { ZodAuthSchema } from "@/lib/zodSchemas";
import { ValidateFormDataProps } from "@/lib/types";
import LoadingButton from "@/components/shared/LaodingButton";

const SignUp = () => {
    const emailRef = useRef<string>("");
    const passwordRef = useRef<string>("");
    const [isPassword, setIsPassword] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [signInLoading, setSignInIsLoading] = useState(false);
    const [signUpLoading, setSignUpIsLoading] = useState(false);

    function validateFormData({ email, password }: ValidateFormDataProps) {
        const result = ZodAuthSchema.safeParse({
            email,
            password,
        });
        if (!result.success) {
            return {
                isValid: false,
                data: null,
                error: fromZodError(result.error).details[0].message,
            };
        }
        return { isValid: true, data: result.data, error: null };
    }

    const handleSignIn = async () => {
        setError(null);
        const { isValid, data, error } = validateFormData({
            email: emailRef.current,
            password: passwordRef.current,
        });
        if (!isValid) {
            return setError(error);
        }
        setSignInIsLoading(true);
        // await fetch("/api/auth/signup", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(data),
        // });
    };
    const handleSignUp = () => {
        setError(null);
        const { isValid, data, error } = validateFormData({
            email: emailRef.current,
            password: passwordRef.current,
        });
        if (!isValid) {
            return setError(error);
        }
        setSignInIsLoading(true);
    };

    return (
        <div className="min-h-screen w-full flex justify-center items-start md:py-20">
            <div className="w-full h-screen flex flex-col px-5 py-10 gap-7 md:w-fit md:h-max md:rounded-3xl md:shadow-2xl md:bg-white md:p-14">
                <h1 className="text-3xl font-light">Sign in/Create account</h1>
                <div className="flex flex-col gap-5">
                    <div>
                        <CustomInput
                            type="email"
                            containerStyle="md:bg-[#f5f5f5]"
                            onChange={(e) =>
                                (emailRef.current = e.target.value)
                            }
                            placeholder="Email"
                        />
                        <CustomInput
                            type={isPassword ? "password" : "text"}
                            containerStyle="md:bg-[#f5f5f5]"
                            onChange={(e) =>
                                (passwordRef.current = e.target.value)
                            }
                            placeholder="Password"
                            icon={
                                isPassword ? (
                                    <Eye onClick={() => setIsPassword(false)} />
                                ) : (
                                    <EyeOff
                                        onClick={() => setIsPassword(true)}
                                    />
                                )
                            }
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                        {error ? (
                            <m.span
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.3,
                                }}
                                className="error text-xs h-5 text-red-500 text-center"
                            >
                                {/* Incorrect email or password. Please try again */}
                                {error}
                            </m.span>
                        ) : (
                            <span className="error h-5" />
                        )}
                        <LoadingButton
                            type="button"
                            onClick={handleSignIn}
                            loader={signInLoading}
                            className="border text-white hover:bg-gray-700"
                        >
                            Sign in
                        </LoadingButton>
                        <LoadingButton
                            type="button"
                            onClick={handleSignUp}
                            loader={signUpLoading}
                            className="bg-white text-black border border-black hover:bg-gray-100"
                        >
                            Create account
                        </LoadingButton>
                    </div>
                    <div className="divider divider-horizontal">OR</div>
                    <Button className="bg-white text-black border border-black hover:bg-gray-100 flex gap-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24"
                            viewBox="0 0 24 24"
                            width="24"
                        >
                            <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                fill="#4285F4"
                            />
                            <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                fill="#34A853"
                            />
                            <path
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                fill="#EA4335"
                            />
                            <path d="M1 1h22v22H1z" fill="none" />
                        </svg>
                        Sign In with Google
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
