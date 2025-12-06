import React from "react";
import PackagesList from "./PackagesList";

export default function AdminPackages() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Packages Manager</h1>
      <PackagesList />
    </div>
  );
}
