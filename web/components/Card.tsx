/* This example requires Tailwind CSS v2.0+ */
import {
	AnnotationIcon,
	GlobeAltIcon,
	LightningBoltIcon,
	ScaleIcon,
} from "@heroicons/react/outline";

const features = [
	{
		name: "Vetted Engineers",
		description:
			"Spend less time interviewing and more time building by connecting with engineers we’ve already assessed.",
		icon: GlobeAltIcon,
	},
	{
		name: "Global Talent",
		description:
			"Tap into a talent pool that spans multiple regions and multiple countries. The best engineers aren’t always in your backyard.",
		icon: ScaleIcon,
	},
	{
		name: "Data-Driven Match",
		description:
			"Identify the best fit engineers from our network through our proprietary data-driven, matching process.",
		icon: LightningBoltIcon,
	},
	{
		name: "Hands On Support",
		description:
			"From helping with onboarding to sharing best practices, our success team is there every step of the way.",
		icon: AnnotationIcon,
	},
];

export default function Card() {
	return (
		<div className='py-12 bg-white'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='lg:text-center'>
					<h2 className='text-base text-indigo-600 font-semibold tracking-wide uppercase'>
						Transactions
					</h2>
					<p className='mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
						Vetted Engineers
					</p>
					<p className='mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto'>
						Spend less time interviewing and more time building by connecting
						with engineers we’ve already assessed.
					</p>
				</div>

				<div className='mt-10'>
					<dl className='space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10'>
						{features.map((feature) => (
							<div key={feature.name} className='relative'>
								<dt>
									<div className='absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white'>
										<feature.icon className='h-6 w-6' aria-hidden='true' />
									</div>
									<p className='ml-16 text-lg leading-6 font-medium text-gray-900'>
										{feature.name}
									</p>
								</dt>
								<dd className='mt-2 ml-16 text-base text-gray-500'>
									{feature.description}
								</dd>
							</div>
						))}
					</dl>
				</div>
			</div>
		</div>
	);
}
