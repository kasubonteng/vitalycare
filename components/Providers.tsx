"use client";
import { MessagesProvider } from "@/context/messages";
import { UserDataProvider } from "@/context/userData";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
interface ProvidersProps {
	children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<UserDataProvider>
				<MessagesProvider>{children}</MessagesProvider>
			</UserDataProvider>
		</QueryClientProvider>
	);
};

export default Providers;
