import React from 'react';
import { useSelector } from 'react-redux';

export default function Spinner() {
  let isLoading = useSelector((state) => state.spinner?.isLoading);
  return isLoading ? (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: 'rgba(0, 0, 0, 0.5)',
      position: 'fixed',
      top: '0',
      left: '0',
      zIndex: '1',
      display: 'flex',
      justifyContent: "center",
      alignItems: 'center',
    }}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="150">
        <circle fill="#158E42" stroke="#158E42" strokeWidth="4" r="15" cx="35" cy="100">
          <animate attributeName="cx" calcMode="spline" dur="1.5" values="35;165;165;35;35" keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1" repeatCount="indefinite" begin="0"></animate>
        </circle>
        <circle fill="#158E42" stroke="#158E42" strokeWidth="4" opacity=".8" r="15" cx="35" cy="100">
          <animate attributeName="cx" calcMode="spline" dur="1.5" values="35;165;165;35;35" keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1" repeatCount="indefinite" begin="0.05"></animate>
        </circle>
        <circle fill="#158E42" stroke="#158E42" strokeWidth="4" opacity=".6" r="15" cx="35" cy="100">
          <animate attributeName="cx" calcMode="spline" dur="1.5" values="35;165;165;35;35" keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1" repeatCount="indefinite" begin=".1"></animate>
        </circle>
        <circle fill="#158E42" stroke="#158E42" strokeWidth="4" opacity=".4" r="15" cx="35" cy="100">
          <animate attributeName="cx" calcMode="spline" dur="1.5" values="35;165;165;35;35" keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1" repeatCount="indefinite" begin=".15"></animate>
        </circle>
        <circle fill="#158E42" stroke="#158E42" strokeWidth="4" opacity=".2" r="15" cx="35" cy="100">
          <animate attributeName="cx" calcMode="spline" dur="1.5" values="35;165;165;35;35" keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1" repeatCount="indefinite" begin=".2"></animate>
        </circle>
      </svg>
    </div>
) : (
  <></>
);
}