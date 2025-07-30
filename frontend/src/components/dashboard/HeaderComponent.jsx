import UseAuthStore from "@/lib/store/authStore";
import { ClipboardCheck } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export const HeaderComponent = () => {
  const { user, clearAuth } = UseAuthStore();
const querClient=useQueryClient()
const navigate=useNavigate()

  const handleLogout=()=>{
    if(confirm("Are sure to logout?")){
        clearAuth()
        querClient.clear()
        navigate('/login')
    }
  }
  return (
    <header className="bg-card border-border shadow-sm">
      <div className="flex items-center justify-between px-4 py-4">
        {/* logo */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center justify-center bg-primary rounded-lg w-8 h-8">
            <ClipboardCheck className="h-4 w-4 text-primary-foreground " />
          </div>

          <h1 className="text-md sm:text-xl text-foreground font-semibold">
            Task Dashboard
          </h1>
        </div>

        {/* right side section */}
        <div>
          {user ? (
            <div className="flex flex-col sm:flex-row items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                Welcome,{" "}
                <span className="text-foreground font-medium">
                  {user?.name || "User"}
                </span>
              </span>
              <Button
                onClick={handleLogout}
                size={"sm"}
                variant={"outline"}
                className={"cursor-pointer"}
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button
              size={"sm"}
            //   variant={"outline"}
              className={"cursor-pointer"}
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
