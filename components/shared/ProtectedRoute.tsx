"use client";

// components/ProtectedRoute.js
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const ProtectedRoute = ({
  children,
  organizer,
}: {
  children: React.ReactNode;
  organizer?: string | undefined;
}) => {
  const { toast } = useToast();
  const { address, isConnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please: Connect your wallet to access the page",
        variant: "destructive",
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
      });
      router.push("/"); // Redirect to the wallet connection page
    }
  }, [isConnected, router]);

  if (!isConnected) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <h6>Loading...</h6>
      </div>
    ); // Or a spinner/loading component
  }

  if (organizer && organizer !== address) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <h6>You are not having the right to access this page.</h6>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
