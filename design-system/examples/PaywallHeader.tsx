import { Button, Card } from "../components";

export function PaywallHeader() {
  return (
    <main className="min-h-screen bg-app px-4 py-6 font-seekho text-primary">
      <div className="mx-auto w-full max-w-seekhoShell">
        <Card
          body={
            <>
              <p className="text-caption uppercase tracking-wide text-white/90">Premium</p>
              <h1 className="mt-1 text-display">Unlock Full Seekho Access</h1>
              <p className="mt-2 text-body text-white/90">
                Complete your missions faster with unlimited lessons, streak tracking, and daily plans.
              </p>
            </>
          }
          footer={
            <Button className="w-full" variant="primary">
              Start 7-Day Free Trial
            </Button>
          }
          variant="hero"
        />
      </div>
    </main>
  );
}
