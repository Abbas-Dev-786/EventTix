"use client";
import Collection from "@/components/shared/Collection";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { getEventsByUser } from "@/lib/actions/event.actions";
import { getOrdersByUser } from "@/lib/actions/order.actions";
import { IOrder } from "@/lib/database/models/order.model";
import { SearchParamProps } from "@/types";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";

const ProfilePage = ({ searchParams }: SearchParamProps) => {
  const account = useAccount();
  const userId = account?.address || "";
  const [orders, setOrders] = useState<any>(null);
  const [organizedEvents, setOrganizedEvents] = useState<any>(null);

  const ordersPage = Number(searchParams?.ordersPage) || 1;
  const eventsPage = Number(searchParams?.eventsPage) || 1;

  useEffect(() => {
    if (!userId) return;

    // Fetch orders
    const fetchOrders = async () => {
      const ordersData = await getOrdersByUser({ userId, page: ordersPage });
      setOrders(ordersData);
    };

    // Fetch organized events
    const fetchOrganizedEvents = async () => {
      const eventsData = await getEventsByUser({ userId, page: eventsPage });
      setOrganizedEvents(eventsData);
    };

    fetchOrders();
    fetchOrganizedEvents();
  }, [userId, ordersPage, eventsPage]);

  const orderedEvents = orders?.data.map((order: IOrder) => order.event) || [];

  return (
    <ProtectedRoute>
      {/* My Tickets */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">My Tickets</h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/#events">Explore More Events</Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <Collection
          data={orderedEvents}
          emptyTitle="No event tickets purchased yet"
          emptyStateSubtext="No worries - plenty of exciting events to explore!"
          collectionType="My_Tickets"
          limit={3}
          page={ordersPage}
          urlParamName="ordersPage"
          totalPages={orders?.totalPages}
        />
      </section>

      {/* Events Organized */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">Events Organized</h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/events/create">Create New Event</Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <Collection
          data={organizedEvents?.data}
          emptyTitle="No events have been created yet"
          emptyStateSubtext="Go create some now"
          collectionType="Events_Organized"
          limit={3}
          page={eventsPage}
          urlParamName="eventsPage"
          totalPages={organizedEvents?.totalPages}
        />
      </section>
    </ProtectedRoute>
  );
};

export default ProfilePage;
