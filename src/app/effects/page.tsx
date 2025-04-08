import Image from "next/image"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function EffectsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <PageHeader
        title="Effects of Nuclear Weapons"
        description="Understanding the immediate and long-term consequences of nuclear weapons on human life, society, and the environment."
      />

      <Tabs defaultValue="immediate" className="mt-12">
        <TabsList className="mx-auto grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="immediate">Immediate Effects</TabsTrigger>
          <TabsTrigger value="longterm">Long-term Effects</TabsTrigger>
          <TabsTrigger value="global">Global Impact</TabsTrigger>
        </TabsList>

        <TabsContent value="immediate" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Blast Wave</CardTitle>
                <CardDescription>The initial destructive force</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative mb-4 h-48 w-full overflow-hidden rounded-lg">
                  <Image src="/images/effects/blast-wave.jpg" alt="Nuclear blast wave" fill className="object-cover" />
                </div>
                <p>
                  The blast wave from a nuclear explosion can flatten buildings, create hurricane-force winds, and cause
                  immediate casualties within several kilometers of ground zero. The pressure wave can collapse
                  structures and cause widespread destruction.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Thermal Radiation</CardTitle>
                <CardDescription>Intense heat and fire</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Thermal radiation from a nuclear explosion can cause severe burns to exposed skin up to 10km away and
                  ignite fires across a wide area. The heat flash can reach temperatures of millions of degrees at the
                  center, causing flash blindness even at great distances.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Initial Nuclear Radiation</CardTitle>
                <CardDescription>Immediate radiation exposure</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  High levels of radiation are released in the first minute after detonation. This radiation can cause
                  acute radiation syndrome, with symptoms including nausea, vomiting, and potentially death within hours
                  or days depending on the dose received.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Electromagnetic Pulse (EMP)</CardTitle>
                <CardDescription>Disruption of electronic systems</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative mb-4 h-48 w-full overflow-hidden rounded-lg">
                  <Image src="/images/effects/emp.jpg" alt="EMP effects" fill className="object-cover" />
                </div>
                <p>
                  A high-altitude nuclear detonation can create an electromagnetic pulse that damages electronic
                  equipment over a wide area, potentially disabling power grids, communications, and transportation
                  systems across entire regions or countries.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="longterm" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Radioactive Fallout</CardTitle>
                <CardDescription>Persistent radiation hazards</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative mb-4 h-48 w-full overflow-hidden rounded-lg">
                  <Image src="/images/effects/fallout.jpg" alt="Radioactive fallout" fill className="object-cover" />
                </div>
                <p>
                  Radioactive particles can be carried by wind for hundreds of kilometers, contaminating land, water,
                  and food sources. Exposure to fallout can cause radiation sickness, increased cancer rates, and
                  genetic damage that can affect future generations.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Environmental Damage</CardTitle>
                <CardDescription>Ecological consequences</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Nuclear explosions can cause widespread environmental damage, including destruction of plant and
                  animal life, contamination of soil and water, and disruption of ecosystems. These effects can persist
                  for decades or even centuries.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Health Effects</CardTitle>
                <CardDescription>Long-term medical consequences</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Survivors of nuclear explosions face increased risks of cancer, birth defects, and other health
                  problems. Studies of survivors from Hiroshima and Nagasaki show elevated rates of leukemia, thyroid
                  cancer, and other radiation-related illnesses decades after exposure.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Societal Impact</CardTitle>
                <CardDescription>Social and economic disruption</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative mb-4 h-48 w-full overflow-hidden rounded-lg">
                  <Image
                    src="/images/effects/societal-impact.jpg"
                    alt="Societal impact"
                    fill
                    className="object-cover"
                  />
                </div>
                <p>
                  The long-term social and economic impacts of nuclear weapons use include displacement of populations,
                  destruction of infrastructure, loss of agricultural land, and psychological trauma that can affect
                  multiple generations.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="global" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Nuclear Winter</CardTitle>
                <CardDescription>Global climatic consequences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative mb-4 h-64 w-full overflow-hidden rounded-lg">
                  <Image
                    src="/images/effects/nuclear-winter.jpg"
                    alt="Nuclear winter concept"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-lg">
                  A large-scale nuclear war could inject millions of tons of soot and smoke into the atmosphere,
                  blocking sunlight and causing global temperatures to drop dramatically. This "nuclear winter" could
                  lead to agricultural collapse, mass starvation, and potentially threaten human civilization itself.
                </p>
                <p className="mt-4">
                  Even a limited regional nuclear exchange could produce enough atmospheric soot to disrupt global
                  climate patterns for years, causing crop failures and food shortages worldwide, even in countries not
                  directly involved in the conflict.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Global Famine</CardTitle>
                <CardDescription>Worldwide food shortages</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Climate disruption following a nuclear war would severely impact global food production. Studies
                  suggest that even a limited nuclear exchange could reduce global food production by 20-40% for several
                  years, potentially leading to billions of deaths from starvation.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ozone Depletion</CardTitle>
                <CardDescription>Increased UV radiation</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Nuclear explosions can damage the ozone layer, allowing harmful ultraviolet radiation to reach the
                  Earth's surface. This could lead to increased rates of skin cancer, cataracts, and damage to marine
                  and terrestrial ecosystems worldwide.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
