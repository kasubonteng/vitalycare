import { Skeleton } from "@/components/ui/skeleton";

const LoadingPage = () => {
	return (
		<>
			<div className="grid grid-cols-1 gap-6 px-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3/">
				<div className="border rounded-lg h-[29.5rem] w-[27rem] p-6 flex flex-col space-y-8">
					<div className="">
						<Skeleton className="w-96 h-44" />
					</div>
					<div className="">
						<Skeleton className="w-56 h-8 rounded-lg " />
					</div>
					<div className="flex flex-col space-y-4 ">
						<Skeleton className="w-32 h-6" />
						<Skeleton className="w-32 h-6" />
						<Skeleton className="w-32 h-6" />
					</div>
				</div>

				<div className="border rounded-lg h-[29.5rem] w-[27rem] p-6 flex flex-col space-y-8">
					<div className="">
						<Skeleton className="w-96 h-44" />
					</div>
					<div className="">
						<Skeleton className="w-56 h-8 rounded-lg " />
					</div>
					<div className="flex flex-col space-y-4 ">
						<Skeleton className="w-32 h-6" />
						<Skeleton className="w-32 h-6" />
						<Skeleton className="w-32 h-6" />
					</div>
				</div>

				<div className="border rounded-lg h-[29.5rem] w-[27rem] p-6 flex flex-col space-y-8">
					<div className="">
						<Skeleton className="w-96 h-44" />
					</div>
					<div className="">
						<Skeleton className="w-56 h-8 rounded-lg " />
					</div>
					<div className="flex flex-col space-y-4 ">
						<Skeleton className="w-32 h-6" />
						<Skeleton className="w-32 h-6" />
						<Skeleton className="w-32 h-6" />
					</div>
				</div>
			</div>
		</>
	);
};

export default LoadingPage;
