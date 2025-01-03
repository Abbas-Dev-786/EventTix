"use client";

import EventForm from "@/components/shared/EventForm";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import { getEventById } from "@/lib/actions/event.actions";
import { useAccount } from "wagmi";

type UpdateEventProps = {
  params: {
    id: string;
  };
};

const UpdateEvent = async ({ params: { id } }: UpdateEventProps) => {
  const account = useAccount();
  const userId = account?.address || "";
  const event = await getEventById(id);

  return (
    <ProtectedRoute organizer={event?.organizer}>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">
          Update Event
        </h3>
      </section>

      <div className="wrapper my-8">
        <EventForm
          type="Update"
          event={event}
          eventId={event._id}
          userId={userId}
        />
      </div>
    </ProtectedRoute>
  );
};

export default UpdateEvent;
