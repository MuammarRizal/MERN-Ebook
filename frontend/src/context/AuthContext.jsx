import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";

// meynimpan context untuk menyimpan status otentikasi
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // menggunakan useState untuk menyimpan status otentikasi berdasarkan keberadaan token di cookies
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!Cookies.get("token")
  );

  //   Menggunakan useEffect untuk memantau perubahan pada token di cookies
  useEffect(() => {
    // membuat fungsi handleTokenChange untuk memperbarui status otentikasi ketika token di cookies berubah
    const handleTokenChange = () => {
      setIsAuthenticated(!!Cookies.get("token"));
    };

    // menambahkan event listener pada storage untuk memantau perubahan pada token
    window.addEventListener("storage", handleTokenChange);

    // mengembalikan sebuah fungsi yang akan dipanggil saat komponen di unmount untuk membersihkan event listener
    return () => {
      window.removeEventListener("storage", handleTokenChange);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
