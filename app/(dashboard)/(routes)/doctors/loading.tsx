import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
	return (
		<div className="grid grid-cols-1 gap-6 px-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
			<div className=" border h-[40rem] rounded-lg w-96 p-6 flex flex-col space-y-4">
				<>
					<Skeleton className="w-auto h-56" />
				</>

				<>
					<Skeleton className="h-9 w-44" />
				</>

				<div className="flex justify-between ">
					<>
						<Skeleton className="h-10 w-36" />
					</>
					<>
						<Skeleton className="w-10 h-10 " />
					</>
				</div>

				<div className="flex flex-col space-y-2 ">
					<>
						<Skeleton className="w-32 h-8 " />
					</>
					<>
						<Skeleton className="w-32 h-8 " />
					</>
					<>
						<Skeleton className="w-32 h-8 " />
					</>
				</div>

				<div>
					<Skeleton className="mt-6 h-11 w-44" />
				</div>
			</div>
			<div className=" border h-[40rem] rounded-lg w-96 p-6 flex flex-col space-y-4">
				<>
					<Skeleton className="w-auto h-56" />
				</>

				<>
					<Skeleton className="h-9 w-44" />
				</>

				<div className="flex justify-between ">
					<>
						<Skeleton className="h-10 w-36" />
					</>
					<>
						<Skeleton className="w-10 h-10 " />
					</>
				</div>

				<div className="flex flex-col space-y-2 ">
					<>
						<Skeleton className="w-32 h-8 " />
					</>
					<>
						<Skeleton className="w-32 h-8 " />
					</>
					<>
						<Skeleton className="w-32 h-8 " />
					</>
				</div>

				<div>
					<Skeleton className="mt-6 h-11 w-44" />
				</div>
			</div>
		</div>
	);
};

export default Loading;
