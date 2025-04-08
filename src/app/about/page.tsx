import Image from "next/image"
import { PageHeader } from "@/components/page-header"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <PageHeader
        title="About Our Initiative"
        description="Learn about our mission to promote nuclear disarmament and build a safer world."
      />

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-2xl font-bold text-slate-800">Our Mission</h2>
          <p className="mb-4 text-slate-600">
            The Nuclear Disarmament Initiative is dedicated to informing and raising awareness about nuclear
            disarmament, the impact of nuclear weapons, and the global efforts to eliminate them. We believe that a
            world free of nuclear weapons is not only possible but necessary for the long-term survival of humanity.
          </p>
          <p className="mb-4 text-slate-600">
            Our work focuses on education, advocacy, and mobilizing public support for concrete steps toward nuclear
            disarmament. We provide resources, organize events, and collaborate with partners worldwide to build a
            stronger movement for a nuclear-weapon-free world.
          </p>
          <p className="text-slate-600">
            We are committed to offering facts, figures, historical context, and action plans for individuals to get
            involved in nuclear disarmament initiatives, empowering people from all walks of life to contribute to this
            vital cause.
          </p>
        </div>
        <div className="relative h-[400px] overflow-hidden rounded-lg">
          <Image src="/images/about/team.jpg" alt="Our team" fill className="object-cover" />
        </div>
      </div>

      <div className="mt-12">
        <h2 className="mb-6 text-2xl font-bold text-slate-800">Our Approach</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border border-slate-200 p-6">
            <h3 className="mb-3 text-xl font-semibold text-slate-800">Education</h3>
            <p className="text-slate-600">
              We provide accurate, accessible information about nuclear weapons, their history, and their effects to
              help people understand the urgency of disarmament.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 p-6">
            <h3 className="mb-3 text-xl font-semibold text-slate-800">Advocacy</h3>
            <p className="text-slate-600">
              We advocate for policies and treaties that reduce and eliminate nuclear weapons, working with governments,
              international organizations, and civil society.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 p-6">
            <h3 className="mb-3 text-xl font-semibold text-slate-800">Mobilization</h3>
            <p className="text-slate-600">
              We empower individuals and communities to take action for nuclear disarmament through campaigns, events,
              and grassroots organizing.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="mb-6 text-2xl font-bold text-slate-800">Our History</h2>
        <div className="rounded-lg border border-slate-200 p-6">
          <p className="mb-4 text-slate-600">
            The Nuclear Disarmament Initiative was founded in 2010 by a group of concerned scientists, policy experts,
            and activists who recognized the need for a coordinated, global effort to address the continued threat of
            nuclear weapons.
          </p>
          <p className="mb-4 text-slate-600">
            Since our founding, we have grown into an international network with partners in over 50 countries. We have
            organized conferences, published research, developed educational materials, and contributed to advocacy
            efforts that have helped advance the cause of nuclear disarmament.
          </p>
          <p className="text-slate-600">
            Our work has been recognized by international organizations, and we continue to expand our reach and impact
            as we work toward our vision of a world free from the threat of nuclear weapons.
          </p>
        </div>
      </div>
    </div>
  )
}
