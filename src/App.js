import React, { useEffect, useState } from "react";
import NightlightRoundIcon from "@mui/icons-material/NightlightRound";
import LightModeIcon from "@mui/icons-material/LightMode";
import {DATA} from "./Data"

const App = () => {
  const [theme , setTheme] = useState("light");
  const [digits , setdigits] = useState("");
  const [result , setResult] = useState("");
console.log(typeof digits);
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    }else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme])
  const handleDarkTheme = () => {
    setTheme("dark")
  }
  const handleLightTheme = () => {
    setTheme("light")
  }
  const HandleBtn = (e) => {
    if(e.digit === "function" && e.value === "AC") {
      setdigits("")
      setResult("")
    }else if (e.digit === "function" && e.value === "sup") {
      setdigits(digits.slice(0 , digits.length - 1));
    }else if (e.value === "+/-") {
      setdigits((-digits).toString())
    }else {
      setdigits( e.value === "%"  || e.value === "+/-" ? "" : digits.concat(e.value))
      try {
        
          if(e.value === "=" ){
            setResult(eval(digits).toString().length > 4 ?eval(digits).toString().slice(0 , 5) : eval(digits).toString())
            setdigits(eval(digits).toString().length > 4 ?eval(digits).toString().slice(0 , 5) : eval(digits).toString())
          }else if (e.value === "%") {
            setdigits((digits / "100").toString())
          }else {
            setResult("")
          }
      } catch (err) {
        setResult("Error")
      }
    }
    
  }
  return (
    <div className="   flex justify-center items-center  h-screen bg-slate-200 ">
      <div className=" sm:w-full sm:h-[95% ]  flex flex-col items-center justify-between overflow-hidden  w-1/4 bg-white dark:bg-slate-900 h-[95%] rounded-3xl ">
        <div className=" my-3 flex justify-around items-center bg-slate-200 dark:bg-slate-800  w-1/3 h-12 rounded-3xl cursor-pointer">
          <NightlightRoundIcon onClick={handleDarkTheme} className="text-slate-50 ani" />
          <LightModeIcon onClick={handleLightTheme} className="text-slate-700" />
        </div>
        <div className=" flex flex-col text-4xl p-4 h-1/4 w-full ">
          <span className="dark:text-slate-50"> {digits} </span>
          <span className="dark:text-slate-50"> {result} </span>
        </div>
        <div className="bg-slate-100 dark:bg-slate-800 p-4 h-[75%] flex flex-wrap justify-around items-start  w-full  rounded-tr-[40px] rounded-tl-[40px]">
          {DATA.map((val, index) => (
            <button value={val.type.value} onClick={() => HandleBtn(val.type)} key={index} className="m-2 cursor-pointer flex justify-center items-center bg-white dark:bg-slate-700 h-14 w-14 rounded-xl">
              <span className={` dark:${val.color} ${val.colorS} font-semibold text-xl`}>{val.text}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
