import NurseDashboard from "./NurseDashboard";

<<<<<<< HEAD
export default function Page({ params }: { params: { id: string } }) {
  return <NurseDashboard nurseId={params.id} />;
=======
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <NurseDashboard nurseId={id} />;
>>>>>>> main
}
