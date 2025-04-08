import Image from "next/image"
import Link from "next/link"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function EffortsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <PageHeader
        title="Nuclear Disarmament Efforts"
        description="Exploring the treaties, organizations, and global initiatives working toward a world free of nuclear weapons."
      />

      <Tabs defaultValue="treaties" className="mt-12">
        <TabsList className="mx-auto grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="treaties">Treaties</TabsTrigger>
          <TabsTrigger value="organizations">Organizations</TabsTrigger>
          <TabsTrigger value="initiatives">Initiatives</TabsTrigger>
        </TabsList>

        <TabsContent value="treaties" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Nuclear Non-Proliferation Treaty (NPT)</CardTitle>
                <CardDescription>Entered into force: 1970</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative mb-4 h-48 w-full overflow-hidden rounded-lg">
                  <Image src="/images/efforts/npt.jpg" alt="NPT signing" fill className="object-cover" />
                </div>
                <p>
                  The cornerstone of the global nuclear non-proliferation regime. It aims to prevent the spread of
                  nuclear weapons, promote disarmament, and facilitate peaceful uses of nuclear energy.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/resources/treaties/npt" className="w-full">
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Comprehensive Nuclear-Test-Ban Treaty (CTBT)</CardTitle>
                <CardDescription>Adopted: 1996 (not yet in force)</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Bans all nuclear explosions for both civilian and military purposes. Although signed by 186 states, it
                  has not yet entered into force as eight specific countries have not ratified it.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/resources/treaties/ctbt" className="w-full">
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Treaty on the Prohibition of Nuclear Weapons (TPNW)</CardTitle>
                <CardDescription>Entered into force: 2021</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative mb-4 h-48 w-full overflow-hidden rounded-lg">
                  <Image src="/images/efforts/tpnw.jpg" alt="TPNW signing" fill className="object-cover" />
                </div>
                <p>
                  The first legally binding international agreement to comprehensively prohibit nuclear weapons. It bans
                  development, testing, production, stockpiling, transfer, use, and threat of use of nuclear weapons.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/resources/treaties/tpnw" className="w-full">
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Strategic Arms Reduction Treaties (START)</CardTitle>
                <CardDescription>Various treaties from 1991 to present</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  A series of bilateral agreements between the United States and Russia (formerly Soviet Union) to
                  reduce their strategic nuclear weapons arsenals. New START, the current treaty, is extended until
                  2026.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/resources/treaties/start" className="w-full">
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Nuclear-Weapon-Free Zones (NWFZ)</CardTitle>
                <CardDescription>Regional treaties worldwide</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative mb-4 h-48 w-full overflow-hidden rounded-lg">
                  <Image src="/images/efforts/nwfz.jpg" alt="Nuclear-Weapon-Free Zones" fill className="object-cover" />
                </div>
                <p>
                  Regional treaties that prohibit the development, manufacturing, control, possession, testing, and
                  stationing of nuclear weapons. Currently cover Latin America, South Pacific, Southeast Asia, Africa,
                  and Central Asia.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/resources/treaties/nwfz" className="w-full">
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="organizations" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>International Atomic Energy Agency (IAEA)</CardTitle>
                <CardDescription>Founded: 1957</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative mb-4 h-48 w-full overflow-hidden rounded-lg">
                  <Image src="/images/efforts/iaea.jpg" alt="IAEA headquarters" fill className="object-cover" />
                </div>
                <p>
                  The world's central intergovernmental forum for scientific and technical cooperation in the nuclear
                  field. It works for the safe, secure, and peaceful uses of nuclear science and technology.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="https://www.iaea.org" target="_blank" rel="noopener noreferrer" className="w-full">
                  <Button variant="outline" className="w-full">
                    Visit Website
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>United Nations Office for Disarmament Affairs (UNODA)</CardTitle>
                <CardDescription>Established: 1982</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Promotes nuclear disarmament and non-proliferation and the strengthening of disarmament regimes for
                  other weapons of mass destruction, chemical and biological weapons.
                </p>
              </CardContent>
              <CardFooter>
                <Link
                  href="https://www.un.org/disarmament"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button variant="outline" className="w-full">
                    Visit Website
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>International Campaign to Abolish Nuclear Weapons (ICAN)</CardTitle>
                <CardDescription>Founded: 2007, Nobel Peace Prize: 2017</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative mb-4 h-48 w-full overflow-hidden rounded-lg">
                  <Image src="/images/efforts/ican.jpg" alt="ICAN logo and activists" fill className="object-cover" />
                </div>
                <p>
                  A coalition of non-governmental organizations promoting adherence to and implementation of the Treaty
                  on the Prohibition of Nuclear Weapons. Awarded the Nobel Peace Prize in 2017.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="https://www.icanw.org" target="_blank" rel="noopener noreferrer" className="w-full">
                  <Button variant="outline" className="w-full">
                    Visit Website
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pugwash Conferences on Science and World Affairs</CardTitle>
                <CardDescription>Founded: 1957, Nobel Peace Prize: 1995</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  An international organization that brings together scholars and public figures to work toward reducing
                  the danger of armed conflict and seeking solutions to global security threats.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="https://pugwash.org" target="_blank" rel="noopener noreferrer" className="w-full">
                  <Button variant="outline" className="w-full">
                    Visit Website
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="initiatives" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Global Zero</CardTitle>
                <CardDescription>International movement for elimination of nuclear weapons</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative mb-4 h-48 w-full overflow-hidden rounded-lg">
                  <Image
                    src="/images/efforts/global-zero.jpg"
                    alt="Global Zero campaign"
                    fill
                    className="object-cover"
                  />
                </div>
                <p>
                  An international movement for the elimination of all nuclear weapons. Global Zero works with political
                  leaders, military officials, and civil society to develop and implement a phased approach to nuclear
                  disarmament.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="https://www.globalzero.org" target="_blank" rel="noopener noreferrer" className="w-full">
                  <Button variant="outline" className="w-full">
                    Visit Website
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Nuclear Security Summit</CardTitle>
                <CardDescription>High-level diplomatic conferences (2010-2016)</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  A series of world summits aimed at preventing nuclear terrorism around the globe. The summits brought
                  together leaders from more than 50 countries to enhance international cooperation in securing nuclear
                  materials and preventing their smuggling.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/resources/initiatives/nss" className="w-full">
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Humanitarian Initiative on Nuclear Weapons</CardTitle>
                <CardDescription>International diplomatic effort</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative mb-4 h-48 w-full overflow-hidden rounded-lg">
                  <Image
                    src="/images/efforts/humanitarian-initiative.jpg"
                    alt="Humanitarian Initiative conference"
                    fill
                    className="object-cover"
                  />
                </div>
                <p>
                  A diplomatic process focusing on the humanitarian impact of nuclear weapons. It has organized
                  international conferences in Norway, Mexico, and Austria to examine the humanitarian consequences of
                  nuclear weapons use.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/resources/initiatives/humanitarian" className="w-full">
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mayors for Peace</CardTitle>
                <CardDescription>International organization of cities</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  An international organization of cities dedicated to the promotion of peace. It was established in
                  1982 by the Mayor of Hiroshima and now includes over 8,000 member cities in 165 countries working
                  toward the abolition of nuclear weapons.
                </p>
              </CardContent>
              <CardFooter>
                <Link
                  href="https://www.mayorsforpeace.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button variant="outline" className="w-full">
                    Visit Website
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
