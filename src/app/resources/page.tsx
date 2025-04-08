import Link from "next/link"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResourceCard } from "@/components/resource-card"
import { LinkIcon } from "lucide-react"

export default function ResourcesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <PageHeader
        title="Resources"
        description="Educational materials, research papers, and tools to help you learn about and advocate for nuclear disarmament."
      />

      <Tabs defaultValue="educational" className="mt-12">
        <TabsList className="mx-auto grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="educational">Educational</TabsTrigger>
          <TabsTrigger value="research">Research</TabsTrigger>
          <TabsTrigger value="advocacy">Advocacy</TabsTrigger>
        </TabsList>

        <TabsContent value="educational" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <ResourceCard
              title="Understanding Nuclear Weapons"
              description="An introductory guide to nuclear weapons, how they work, and their effects."
              type="PDF Guide"
              icon="FileText"
              downloadLink="/resources/files/understanding-nuclear-weapons.pdf"
            />

            <ResourceCard
              title="History of the Nuclear Age"
              description="A comprehensive timeline of nuclear weapons development and key historical events."
              type="Interactive Timeline"
              icon="Globe"
              link="/history"
            />

            <ResourceCard
              title="The Humanitarian Impact of Nuclear Weapons"
              description="A detailed examination of the immediate and long-term effects of nuclear weapons on human health and the environment."
              type="Report"
              icon="FileText"
              downloadLink="/resources/files/humanitarian-impact.pdf"
            />

            <ResourceCard
              title="Nuclear Disarmament: Key Concepts"
              description="An overview of the fundamental concepts and terminology in nuclear disarmament discussions."
              type="E-Book"
              icon="Book"
              downloadLink="/resources/files/key-concepts.epub"
            />

            <ResourceCard
              title="Voices of Hibakusha"
              description="Testimonies from survivors of the atomic bombings of Hiroshima and Nagasaki."
              type="Video Collection"
              icon="Video"
              link="/resources/hibakusha"
            />

            <ResourceCard
              title="Nuclear Weapons Treaties Explained"
              description="A guide to understanding the major international treaties and agreements on nuclear weapons."
              type="PDF Guide"
              icon="FileText"
              downloadLink="/resources/files/treaties-explained.pdf"
            />
          </div>
        </TabsContent>

        <TabsContent value="research" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <ResourceCard
              title="Global Nuclear Weapons Inventory"
              description="Current data on nuclear weapons stockpiles by country, including historical trends."
              type="Research Report"
              icon="FileText"
              downloadLink="/resources/files/global-inventory.pdf"
            />

            <ResourceCard
              title="Climate Effects of Nuclear War"
              description="Scientific research on the potential global climate impacts of nuclear conflict."
              type="Scientific Paper"
              icon="FileText"
              downloadLink="/resources/files/climate-effects.pdf"
            />

            <ResourceCard
              title="Economic Costs of Nuclear Weapons"
              description="Analysis of the financial costs of developing, maintaining, and securing nuclear arsenals."
              type="Economic Analysis"
              icon="FileText"
              downloadLink="/resources/files/economic-costs.pdf"
            />

            <ResourceCard
              title="Public Opinion on Nuclear Disarmament"
              description="Survey data and analysis of global public attitudes toward nuclear weapons and disarmament."
              type="Research Report"
              icon="FileText"
              downloadLink="/resources/files/public-opinion.pdf"
            />

            <ResourceCard
              title="Nuclear Security Index"
              description="Assessment of nuclear security conditions in countries with weapons-usable nuclear materials."
              type="Interactive Database"
              icon="Globe"
              link="/resources/security-index"
            />

            <ResourceCard
              title="Verification Technologies for Disarmament"
              description="Overview of technologies and methods for verifying compliance with nuclear disarmament agreements."
              type="Technical Report"
              icon="FileText"
              downloadLink="/resources/files/verification-tech.pdf"
            />
          </div>
        </TabsContent>

        <TabsContent value="advocacy" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <ResourceCard
              title="Advocacy Toolkit"
              description="Comprehensive guide for nuclear disarmament advocacy, including talking points, campaign strategies, and resources."
              type="Toolkit"
              icon="Download"
              downloadLink="/resources/files/advocacy-toolkit.zip"
            />

            <ResourceCard
              title="Social Media Graphics Pack"
              description="Ready-to-use graphics and images for social media advocacy on nuclear disarmament."
              type="Graphics Pack"
              icon="Download"
              downloadLink="/resources/files/social-media-pack.zip"
            />

            <ResourceCard
              title="Model City Resolution"
              description="Template for a city council resolution supporting the Treaty on the Prohibition of Nuclear Weapons."
              type="Template"
              icon="FileText"
              downloadLink="/resources/files/city-resolution.docx"
            />

            <ResourceCard
              title="Legislator Meeting Guide"
              description="Tips and talking points for meeting with elected officials about nuclear disarmament."
              type="Guide"
              icon="FileText"
              downloadLink="/resources/files/legislator-guide.pdf"
            />

            <ResourceCard
              title="Event Planning Handbook"
              description="Step-by-step guide for organizing events and activities related to nuclear disarmament."
              type="Handbook"
              icon="Book"
              downloadLink="/resources/files/event-handbook.pdf"
            />

            <ResourceCard
              title="Nuclear Weapons Divestment Guide"
              description="Information on how individuals and institutions can divest from companies involved in nuclear weapons production."
              type="Guide"
              icon="FileText"
              downloadLink="/resources/files/divestment-guide.pdf"
            />
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-12">
        <Card>
          <CardHeader>
            <CardTitle>Partner Organizations</CardTitle>
            <CardDescription>
              Connect with these organizations for additional resources and opportunities to get involved.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Link
                href="https://www.icanw.org"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 rounded-md border border-slate-200 p-3 transition-colors hover:bg-slate-50"
              >
                <LinkIcon className="h-5 w-5 text-slate-500" />
                <span>International Campaign to Abolish Nuclear Weapons</span>
              </Link>
              <Link
                href="https://www.un.org/disarmament"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 rounded-md border border-slate-200 p-3 transition-colors hover:bg-slate-50"
              >
                <LinkIcon className="h-5 w-5 text-slate-500" />
                <span>UN Office for Disarmament Affairs</span>
              </Link>
              <Link
                href="https://www.armscontrol.org"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 rounded-md border border-slate-200 p-3 transition-colors hover:bg-slate-50"
              >
                <LinkIcon className="h-5 w-5 text-slate-500" />
                <span>Arms Control Association</span>
              </Link>
              <Link
                href="https://www.pugwash.org"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 rounded-md border border-slate-200 p-3 transition-colors hover:bg-slate-50"
              >
                <LinkIcon className="h-5 w-5 text-slate-500" />
                <span>Pugwash Conferences on Science and World Affairs</span>
              </Link>
              <Link
                href="https://www.globalzero.org"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 rounded-md border border-slate-200 p-3 transition-colors hover:bg-slate-50"
              >
                <LinkIcon className="h-5 w-5 text-slate-500" />
                <span>Global Zero</span>
              </Link>
              <Link
                href="https://www.nti.org"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 rounded-md border border-slate-200 p-3 transition-colors hover:bg-slate-50"
              >
                <LinkIcon className="h-5 w-5 text-slate-500" />
                <span>Nuclear Threat Initiative</span>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
