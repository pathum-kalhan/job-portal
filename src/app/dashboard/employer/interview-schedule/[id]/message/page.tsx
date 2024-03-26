"use client";
import { useSession } from "next-auth/react";
import { Chat } from "../../../../../../components/Chat/Chat";

export default function Page({ params }: { params: { id: string } }) {
  const { data: session } = useSession();
  return <Chat employeeId={params.id} employerId={session?.user?.id!} />;
}
