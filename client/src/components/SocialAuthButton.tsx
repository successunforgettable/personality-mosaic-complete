import React from "react";
import { Loader2 } from "lucide-react";

interface SocialAuthButtonProps {
  provider: "google" | "facebook";
  onClick: () => void;
  isLoading?: boolean;
}

const SocialAuthButton: React.FC<SocialAuthButtonProps> = ({
  provider,
  onClick,
  isLoading = false,
}) => {
  // Brand colors
  const colors = {
    google: {
      bg: "bg-white",
      border: "border-gray-300",
      text: "text-gray-700",
      hoverBg: "hover:bg-gray-50",
    },
    facebook: {
      bg: "bg-[#1877F2]",
      border: "border-[#1877F2]",
      text: "text-white",
      hoverBg: "hover:bg-[#166FE5]",
    },
  };

  // Provider specific styles
  const style = colors[provider];

  // Provider icons
  const icon = {
    google: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="18"
        height="18"
        className="mr-2 flex-shrink-0"
      >
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="#FBBC05"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        />
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
      </svg>
    ),
    facebook: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="18"
        height="18"
        className="mr-2 flex-shrink-0"
        fill="white"
      >
        <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z" />
      </svg>
    ),
  };

  const text = {
    google: "Continue with Google",
    facebook: "Continue with Facebook",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isLoading}
      className={`relative flex w-full items-center justify-center rounded-md border ${style.border} ${style.bg} px-3 py-2.5 ${style.text} text-sm font-medium ${style.hoverBg} focus:outline-none focus:ring-2 focus:ring-[#7c3aed] focus:ring-offset-2 transition-colors`}
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        icon[provider]
      )}
      {text[provider]}
    </button>
  );
};

export default SocialAuthButton;