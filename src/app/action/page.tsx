import { PageHeader } from "@/components/page-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ActionCard } from "@/components/action-card"

export default function ActionPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <PageHeader
        title="Take Action"
        description="Discover how you can contribute to the global movement for nuclear disarmament."
      />

      <Tabs defaultValue="individual" className="mt-12">
        <TabsList className="mx-auto grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="individual">Individual Actions</TabsTrigger>
          <TabsTrigger value="community">Community Engagement</TabsTrigger>
          <TabsTrigger value="advocacy">Political Advocacy</TabsTrigger>
        </TabsList>

        <TabsContent value="individual" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <ActionCard
              title="Stay Informed"
              description="Keep up-to-date with the latest developments in nuclear disarmament."
              steps={[
                "Subscribe to our newsletter for regular updates",
                "Follow reputable news sources on nuclear policy",
                "Read books and articles about nuclear disarmament",
                "Watch documentaries about nuclear weapons and their impacts",
              ]}
              actionText="Subscribe to Newsletter"
              actionLink="/newsletter"
              icon="BookOpen"
            />

            <ActionCard
              title="Educate Others"
              description="Share your knowledge about nuclear disarmament with friends, family, and colleagues."
              steps={[
                "Share articles and resources on social media",
                "Discuss nuclear disarmament issues with your social circle",
                "Organize informal discussions or book clubs",
                "Use our educational materials in conversations",
              ]}
              actionText="Get Educational Materials"
              actionLink="/resources/educational"
              icon="Share2"
            />

            <ActionCard
              title="Support Organizations"
              description="Contribute to organizations working toward nuclear disarmament."
              steps={[
                "Donate to nuclear disarmament organizations",
                "Volunteer your time and skills",
                "Participate in fundraising events",
                "Purchase merchandise that supports the cause",
              ]}
              actionText="View Organizations"
              actionLink="/resources/organizations"
              icon="Heart"
            />

            <ActionCard
              title="Make Ethical Choices"
              description="Align your financial decisions with your values."
              steps={[
                "Research if your bank invests in nuclear weapons production",
                "Consider divesting from companies involved in nuclear weapons",
                "Support ethical investment funds that exclude nuclear weapons",
                "Ask your pension provider about their investment policy",
              ]}
              actionText="Divestment Guide"
              actionLink="/resources/divestment"
              icon="DollarSign"
            />

            <ActionCard
              title="Sign Petitions"
              description="Add your voice to campaigns for nuclear disarmament."
              steps={[
                "Sign petitions calling for nuclear disarmament",
                "Share petitions with your network",
                "Follow up on the outcomes of petitions you've signed",
                "Create your own petition for local issues",
              ]}
              actionText="Current Petitions"
              actionLink="/resources/petitions"
              icon="FileSignature"
            />

            <ActionCard
              title="Use Social Media"
              description="Amplify the message of nuclear disarmament online."
              steps={[
                "Follow and share content from disarmament organizations",
                "Use relevant hashtags to join the conversation",
                "Create and share your own content about nuclear disarmament",
                "Engage with and support others posting about the issue",
              ]}
              actionText="Social Media Toolkit"
              actionLink="/resources/social-media"
              icon="MessageCircle"
            />
          </div>
        </TabsContent>

        <TabsContent value="community" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <ActionCard
              title="Organize Events"
              description="Bring people together to learn about and discuss nuclear disarmament."
              steps={[
                "Host a film screening with discussion",
                "Organize a lecture or panel discussion",
                "Arrange a book club focusing on nuclear issues",
                "Plan a community art project with a disarmament theme",
              ]}
              actionText="Event Planning Guide"
              actionLink="/resources/event-planning"
              icon="Calendar"
            />

            <ActionCard
              title="Engage Local Schools"
              description="Help educate the next generation about nuclear disarmament."
              steps={[
                "Offer to give a presentation at local schools",
                "Provide teachers with educational resources",
                "Suggest nuclear disarmament as a topic for school projects",
                "Support student-led initiatives on peace and disarmament",
              ]}
              actionText="Educational Resources"
              actionLink="/resources/educational"
              icon="GraduationCap"
            />

            <ActionCard
              title="Connect with Local Groups"
              description="Join or form a local group focused on peace and disarmament."
              steps={[
                "Find existing peace groups in your area",
                "Attend meetings and events",
                "Volunteer your skills and time",
                "Start your own group if none exists",
              ]}
              actionText="Find Local Groups"
              actionLink="/resources/local-groups"
              icon="Users"
            />

            <ActionCard
              title="Commemorate Key Dates"
              description="Organize or participate in events on significant nuclear-related dates."
              steps={[
                "August 6 & 9: Hiroshima and Nagasaki memorial days",
                "September 26: International Day for the Total Elimination of Nuclear Weapons",
                "January 22: Entry into force of the Treaty on the Prohibition of Nuclear Weapons",
                "July 7: Adoption of the Treaty on the Prohibition of Nuclear Weapons",
              ]}
              actionText="Event Calendar"
              actionLink="/resources/calendar"
              icon="Clock"
            />

            <ActionCard
              title="Create Public Art"
              description="Use art to raise awareness about nuclear disarmament."
              steps={[
                "Organize a mural project in your community",
                "Create posters or flyers to display in public spaces",
                "Host an art exhibition with a nuclear disarmament theme",
                "Use performance art to convey the message of peace",
              ]}
              actionText="Art Resources"
              actionLink="/resources/art"
              icon="Palette"
            />

            <ActionCard
              title="Interfaith Initiatives"
              description="Engage with faith communities on nuclear disarmament."
              steps={[
                "Organize interfaith dialogues on peace and disarmament",
                "Invite religious leaders to speak about nuclear weapons",
                "Collaborate with faith-based peace organizations",
                "Incorporate nuclear disarmament into religious services",
              ]}
              actionText="Faith Resources"
              actionLink="/resources/faith"
              icon="Heart"
            />
          </div>
        </TabsContent>

        <TabsContent value="advocacy" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <ActionCard
              title="Contact Elected Officials"
              description="Make your voice heard by those who represent you."
              steps={[
                "Write letters or emails to your representatives",
                "Call your elected officials' offices",
                "Request in-person meetings to discuss nuclear policy",
                "Attend town halls and public forums",
              ]}
              actionText="Find Your Representatives"
              actionLink="/resources/representatives"
              icon="Mail"
            />

            <ActionCard
              title="Support the TPNW"
              description="Advocate for your country to join the Treaty on the Prohibition of Nuclear Weapons."
              steps={[
                "Learn about your country's position on the TPNW",
                "Write to government officials urging support",
                "Organize campaigns for TPNW ratification",
                "Collaborate with organizations promoting the treaty",
              ]}
              actionText="TPNW Resources"
              actionLink="/resources/tpnw"
              icon="FileText"
            />

            <ActionCard
              title="Engage with Local Government"
              description="Work with your city or town to support nuclear disarmament."
              steps={[
                "Encourage your city to join Mayors for Peace",
                "Propose a city resolution supporting nuclear disarmament",
                "Organize local government forums on nuclear issues",
                "Work with city officials on public education campaigns",
              ]}
              actionText="Local Government Guide"
              actionLink="/resources/local-government"
              icon="Home"
            />

            <ActionCard
              title="Participate in Demonstrations"
              description="Join peaceful protests and demonstrations for nuclear disarmament."
              steps={[
                "Attend rallies and marches for nuclear disarmament",
                "Help organize peaceful demonstrations",
                "Create effective signs and banners",
                "Share information about upcoming demonstrations",
              ]}
              actionText="Upcoming Demonstrations"
              actionLink="/resources/demonstrations"
              icon="Flag"
            />

            <ActionCard
              title="Run for Office"
              description="Consider becoming a political candidate to advocate for nuclear disarmament."
              steps={[
                "Research the requirements for running for local office",
                "Develop a platform that includes nuclear disarmament",
                "Build a campaign team and gather support",
                "Connect with organizations that can provide resources",
              ]}
              actionText="Political Candidate Resources"
              actionLink="/resources/candidates"
              icon="Award"
            />

            <ActionCard
              title="International Advocacy"
              description="Engage with international organizations and processes."
              steps={[
                "Participate in UN events and conferences",
                "Join international campaigns and networks",
                "Attend NPT Review Conferences as a civil society representative",
                "Engage with diplomatic missions in your country",
              ]}
              actionText="International Engagement Guide"
              actionLink="/resources/international"
              icon="Globe"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
