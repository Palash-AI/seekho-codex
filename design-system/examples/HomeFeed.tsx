import { Card, Chip, Progress } from "../components";

const chips = ["All", "English", "Career", "Finance", "Tech"];

const cards = [
  { id: "1", title: "Speak Confidently", subtitle: "5 min lesson", progress: 72 },
  { id: "2", title: "Crack HR Round", subtitle: "Interview essentials", progress: 38 },
  { id: "3", title: "Stock Market Basics", subtitle: "Beginner friendly", progress: 15 }
];

export function HomeFeed() {
  return (
    <main className="min-h-screen bg-app px-4 py-6 font-seekho text-primary">
      <div className="mx-auto w-full max-w-seekhoShell">
        <header>
          <h1 className="text-display">Home Feed</h1>
          <p className="mt-1 text-body text-secondary">Continue learning in Mission Mode.</p>
        </header>

        <section className="mt-6 flex gap-2 overflow-x-auto pb-1">
          {chips.map((chip, index) => (
            <Chip key={chip} selected={index === 0} withAccentBorder>
              {chip}
            </Chip>
          ))}
        </section>

        <section className="mt-6 space-y-3">
          {cards.map((card) => (
            <Card
              body={
                <>
                  <h2 className="text-cardTitle">{card.title}</h2>
                  <p className="mt-1 text-body text-secondary">{card.subtitle}</p>
                  <Progress className="mt-3" value={card.progress} />
                </>
              }
              key={card.id}
              variant="default"
            />
          ))}
        </section>
      </div>
    </main>
  );
}
