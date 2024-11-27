
import { Toaster } from "@/components/ui/toaster";
import React from "react";

export const dynamic = "force-dynamic";

const Layout = async ({ children }: { children: React.ReactNode }) => {

  return (
    <main>
        
        {children}
        <Toaster />
    </main>
  );
};
export default Layout;