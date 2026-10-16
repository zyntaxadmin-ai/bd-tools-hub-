"use client";
import { useState } from "react";
import { MapPinned, Copy, RotateCcw } from "lucide-react";

const SQFT_PER_SHATANGSHO = 435.6;
const SQFT_PER_ACRE = 43560;
const SQFT_PER_BIGHA_STD = 14400;
const SQFT_PER_SQM = 10.7639;

export default function LandCalculator() {
  const [kathaSqft, setKathaSqft] = useState("720");
  const [inputVal, setInputVal] = useState("");
  const [inputUnit, setInputUnit] = useState("shatak");
  const [len, setLen] = useState("");
  const [wid, setWid] = useState("");
  const [copied, setCopied] = useState("");

  const kathaVal = parseFloat(kathaSqft) || 720;
  const bighaVal = kathaVal * 20;

  const toSqft = (val: number, unit: string) => {
    switch(unit){
      case "shatak": return val * SQFT_PER_SHATANGSHO;
      case "katha": return val * kathaVal;
      case "bigha": return val * bighaVal;
      case "acre": return val * SQFT_PER_ACRE;
      case "sqft": return val;
      case "sqm": return val * SQFT_PER_SQM;
      case "gonda": return val * (kathaVal/4); // 1 katha = 4 gonda (approx, local vary)
      case "chatak": return val * (kathaVal/16); // 1 gonda = 4 chatak
      default: return val;
    }
  };

  const valNum = parseFloat(inputVal);
  const sqft = !isNaN(valNum) ? toSqft(valNum, inputUnit) : 0;

  const results = sqft > 0 ? {
    shatak: sqft / SQFT_PER_SHATANGSHO,
    katha: sqft / kathaVal,
    bigha: sqft / bighaVal,
    acre: sqft / SQFT_PER_ACRE,
    sqft: sqft,
    sqm: sqft / SQFT_PER_SQM,
    gonda: sqft / (kathaVal/4),
    chatak: sqft / (kathaVal/16),
  } : null;

  const areaFromDim = (parseFloat(len) || 0) * (parseFloat(wid) || 0);

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(()=>setCopied(""), 1500);
 
