"use client";
import { useSession } from "next-auth/react";
import { Chat } from "../../../../../../components/Chat/Chat";

export default function Page({ params }: { params: { id: string } }) {
  const { data: session } = useSession();
  // @ts-ignore
  const id = session?.user?.id;
  return <Chat employeeId={params.id} employerId={id} />;
}
