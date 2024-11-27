import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";

export const dynamic = "force-dynamic";

const Layout = async ({ children }: { children: React.ReactNode }) => {
//   const currentUser = await getCurrentUser();

//   if (!currentUser) return redirect("/sign-in");

  return (
    <main>
        <Navbar />
        {children}
        <Footer />
    </main>
  );
};
export default Layout;