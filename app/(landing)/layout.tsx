export const LandingLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className="h-full overflow-auto bg-cover bg-[url('/gradient2.png')]">
			<div className="w-full h-full max-w-screen-xl mx-auto ">{children}</div>
		</main>
	);
};

export default LandingLayout;
