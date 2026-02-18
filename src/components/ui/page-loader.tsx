export function PageLoader({ label = "Loading..." }: { label?: string }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-seekho-bg text-seekho-secondary">
      <p className="text-[14px]">{label}</p>
    </div>
  );
}
