export default function IndustryChallengesSection() {
  return (
    <section className="bg-white py-24">

      <div className="mx-auto max-w-7xl px-8">

        <h2 className="mb-4 text-5xl font-bold">
          Fleet Management Is Becoming More Complex
        </h2>

        <p className="mb-12 max-w-3xl text-lg text-zinc-600">
          Rising fuel costs, sustainability requirements,
          compliance pressures and disconnected tools are
          making fleet management increasingly difficult.
        </p>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          <div className="rounded-3xl border border-zinc-200 p-8">
            <h3 className="text-xl font-bold">
              Fuel Costs
            </h3>

            <p className="mt-4 text-zinc-600">
              Rising operating costs reduce fleet profitability.
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-200 p-8">
            <h3 className="text-xl font-bold">
              Sustainability
            </h3>

            <p className="mt-4 text-zinc-600">
              Organizations must reduce environmental impact.
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-200 p-8">
            <h3 className="text-xl font-bold">
              Compliance
            </h3>

            <p className="mt-4 text-zinc-600">
              Regulatory requirements continue to evolve.
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-200 p-8">
            <h3 className="text-xl font-bold">
              Decision Making
            </h3>

            <p className="mt-4 text-zinc-600">
              Teams struggle to turn data into action.
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}