import React from "react";

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
  className?: string;
  fullPage?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "medium",
  className = "",
  fullPage = false,
}) => {
  // Size mapping
  const sizeMap = {
    small: "w-5 h-5",
    medium: "w-8 h-8",
    large: "w-12 h-12",
  };

  const spinnerSize = sizeMap[size];

  // If fullPage is true, center in the available space
  const wrapperClass = fullPage
    ? "flex items-center justify-center w-full h-full min-h-[200px]"
    : "flex items-center justify-center";

  return (
    <div className={wrapperClass}>
      <div
        className={`border-t-transparent border-solid animate-spin rounded-full border-blue-600 border-4 ${spinnerSize} ${className}`}
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Cargando...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
