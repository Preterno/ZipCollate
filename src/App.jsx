import React, { useEffect, useState } from "react";
import "./App.css";
import Message from "./components/message";
import Navbar from "./components/Navbar";
import Content from "./components/Content";
import Result from "./ResultComponents/Result";
import { useAppContext } from "./context/AppContext";

function App() {
  const { formData, updateFormData, updateIsLoading, setErrorState } =
    useAppContext();
  const [show, setShow] = useState(false);
  const [result, setResult] = useState(null);

  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const apiKey = import.meta.env.API_KEY

  useEffect(() => {
    async function fetchResult() {
      if (formData.showResult) {
        updateIsLoading(true);
        setResult(null);
        setShow(false);

        try {
          const content = new FormData();
          content.append("zip1", formData.file1);
          content.append("zip2", formData.file2);
          if (formData.password1)
            content.append("password1", formData.password1);
          if (formData.password2)
            content.append("password2", formData.password2);
          if (formData.excludeList)
            content.append("excludeList", formData.excludeList);

          const response = await fetch(`${apiUrl}/compare_zips`, {
            method: "POST",
            mode: "cors",
            headers: {
              Accept: "application/json",
              'X-API-KEY': apiKey,
            },
            body: content,
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error);
          }

          const data = await response.json();

          updateIsLoading(false);
          setResult(data);
          setShow(true);
          updateFormData("showResult", false);
        } catch (e) {
          setErrorState(true, e.message);
          updateIsLoading(false);
        }
      }
    }

    fetchResult();
  }, [formData.showResult, formData.file1, formData.file2]);

  return (
    <div className="bg-primary text-white">
      <Message />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex flex-col">
          <Content />
        </div>
      </div>
      {show && result && <Result result={result} />}
    </div>
  );
}

export default App;
