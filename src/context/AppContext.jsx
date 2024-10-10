import React, { createContext, useState, useContext } from "react";

const AppContext = createContext();
const useAppContext = () => useContext(AppContext);
export const AppProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    password1: "",
    password2: "",
    file1: null,
    file2: null,
    excludeList: [],
    showResult: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ hasError: false, message: "" });

  const updateIsLoading = (value) => {
    setIsLoading(value);
  };

  const updateFormData = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const toggleResult = () => {
    setFormData((prevData) => ({
      ...prevData,
      showResult: !prevData.showResult,
    }));
  };

  const setErrorState = (hasError, message) => {
    setError({ hasError, message });
  };

  return (
    <AppContext.Provider
      value={{
        formData,
        isLoading,
        error,
        updateIsLoading,
        updateFormData,
        toggleResult,
        setErrorState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export {useAppContext};
