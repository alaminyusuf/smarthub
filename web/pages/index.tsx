import Head from "next/head";
import { Layout } from "../components/Layout";
import Card from "../components/Card";

const Index = () => {
	return (
		<>
			<Head>
				<title>SmartHub</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Layout>
				<div className='relative h-96 w-full flex items-center text-left'>
					<div className='absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-gray-500'></div>
					<main className='p-7 z-10'>
						<div className='leading-2 text-gray-900 mb-5 text-2xl'>
							Build a solid team from a vast network of the world's talents
						</div>
						<a
							href='#'
							className='md:text-xl capitalize text-white py-3 px-5 bg-indigo-700 rounded mt-5'
						>
							hire talent
						</a>
					</main>
				</div>
				<main className='mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28 mb-10'>
					<div className='sm:text-center lg:text-left'>
						<h1 className='text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl mb-16'>
							<span className='block xl:inline'>Data to enrich your</span>{" "}
							<span className='block text-indigo-600 xl:inline'>
								online business
							</span>
						</h1>
						<div className='mt-5 sm:mt-8 flex'>
							<div className='rounded-md'>
								<a
									href='#'
									className='text-white bg-indigo-600 hover:bg-indigo-700 py-3 px-3 rounded-md'
								>
									Get started
								</a>
							</div>
							<div className='ml-5 sm:mt-5 sm:mt-0 sm:ml-8'>
								<a
									href='#'
									className='text-white bg-indigo-600 hover:bg-indigo-700 py-3 px-3 rounded-md'
								>
									Live demo
								</a>
							</div>
						</div>
					</div>
				</main>
				<Card />
			</Layout>
		</>
	);
};

export default Index;
