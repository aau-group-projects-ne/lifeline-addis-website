import NurseDashboard from "./NurseDashboard";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <NurseDashboard nurseId={id} />;
}
