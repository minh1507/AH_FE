import * as React from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { lazy } from "react";
import { useCookies } from "react-cookie";

const portalNamespace = {
  Home: lazy(() => import("./home/home")),
};

function PortalModule() {
  return (
    <Routes>
       <Route path="/" element={<portalNamespace.Home />} />
    </Routes>
  );
}

export default PortalModule;
