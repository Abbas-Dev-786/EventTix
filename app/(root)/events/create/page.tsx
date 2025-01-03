"use client";
import EventForm from "@/components/shared/EventForm";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import { useAccount } from "wagmi";

const CreateEvent = () => {
  const account = useAccount();
  const userId = account?.address || "";

  return (
    <ProtectedRoute>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">
          Create Event
        </h3>
      </section>

      <div className="wrapper my-8">
        <EventForm userId={userId} type="Create" />
      </div>
    </ProtectedRoute>
  );
};

export default CreateEvent;
