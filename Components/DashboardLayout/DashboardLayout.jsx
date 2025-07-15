"use client";

import { NavBar } from "@/Components";

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen">
      {/* Contenedor general - Solo visible en tablet y desktop */}
      <div className="
        hidden sm:block           
        sm:m-8 md:mx-auto md:my-12 lg:mx-auto lg:my-16
        sm:max-w-none md:max-w-5xl lg:max-w-6xl
        bg-[#22272d]
        rounded-[2rem]              
        sm:min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-6rem)] lg:min-h-[calc(100vh-8rem)]
        overflow-hidden
      ">
        {/* Contenedor flex para navbar y main en fila */}
        <div className="flex flex-row sm:h-[calc(100vh-4rem)] md:h-[calc(100vh-6rem)] lg:h-[calc(100vh-8rem)] relative">
          {/* Navbar dentro del contenedor */}
          <NavBar />

          {/* Contenido principal */}
          <main className="flex-1 p-4 flex flex-col justify-center relative">
            {children}
          </main>
        </div>
      </div>

      {/* Contenido mobile - Sin contenedor */}
      <div className="sm:hidden relative">
        <NavBar />
        <main className="container mx-auto p-4 overflow-y-auto relative">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
