import NurseDashboard from "./NurseDashboard";

export default function Page({ params }: { params: { id: string } }) {
  return <NurseDashboard nurseId={params.id} />;
}
