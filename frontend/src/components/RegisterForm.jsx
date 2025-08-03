import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const RegisterForm = () => {
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()

  const handleNext = () => setStep((s) => Math.min(s + 1, 3));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));
  const toggleShow = () => setShowPassword((v) => !v);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const requestData = {
      username: email.split('@')[0],
      email: email,
      full_name: fullName,
      password: password,
      password_confirm: passwordConfirm
     }
    try{
      const response = await axios.post('http://localhost:8000/api/users/register', requestData)
      if(response.data.status === 'success') navigate('/login')
    }
    catch(error){
      alert('Registration failed. Please check your inputs')
    }
    finally{
      setIsLoading(false);
    }
  };

  return (
    <div className="pb-8 pt-4 px-4 max-w-md mx-auto bg-white">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">Step {step} of 3</span>
          <span className="text-sm text-gray-600">
            {Math.round((step / 3) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className="h-2 bg-blue-600 transition-all duration-500"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      {/* Card */}
      <div className="bg-white border border-gray-200 rounded-lg shadow p-6">
        <div className="text-center mb-6">
          <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold mb-2 text-gray-900">
            Create account
          </h2>
          <p className="text-sm text-gray-600">
            {step === 1 && "Let’s start with your basic information."}
            {step === 2 && "Now, set up your credentials."}
            {step === 3 && "Almost done! Review your details."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <label htmlFor="fullName" className="text-sm font-medium">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    id="fullName"
                    type="text"
                    className="w-full px-3 py-2 border rounded text-sm"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                  {fullName && (
                    <div className="absolute inset-y-0 right-3 flex items-center text-green-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={handleNext}
                disabled={!fullName}
                className="w-full bg-blue-600 text-white py-2 rounded text-sm font-medium hover:bg-blue-700 transition disabled:opacity-50"
              >
                Next Step →
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full px-3 py-2 border rounded text-sm"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="w-full px-3 py-2 border rounded text-sm"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={toggleShow}
                    className="absolute inset-y-0 right-2 text-sm text-blue-500"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>

                  
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="confirm-password" className="text-sm font-medium">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirm-password"
                    type={showPassword ? "text" : "password"}
                    className="w-full px-3 py-2 border rounded text-sm"
                    placeholder="Enter the password again"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={toggleShow}
                    className="absolute inset-y-0 right-2 text-sm text-blue-500"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>

                  
                </div>
              </div>

              <button
                type="button"
                onClick={handleNext}
                disabled={!email || !password}
                className="w-full bg-blue-600 text-white py-2 rounded text-sm font-medium hover:bg-blue-700 transition disabled:opacity-50"
              >
                Next Step →
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="bg-gray-50 border p-4 rounded">
                <h3 className="text-sm font-medium mb-2">Review Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium">{fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">{email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Password:</span>
                    <span className="font-medium">••••••••</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-2 rounded text-sm font-medium hover:bg-blue-700 transition disabled:opacity-50"
              >
                {isLoading ? "Creating account..." : "Create account"}
              </button>
            </div>
          )}
        </form>

        {step > 1 && (
          <button
            type="button"
            onClick={handleBack}
            className="mt-4 w-full text-center text-sm text-gray-500 hover:text-gray-700"
          >
            ← Back to previous step
          </button>
        )}

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="#" className="font-medium text-blue-600 hover:underline">
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
