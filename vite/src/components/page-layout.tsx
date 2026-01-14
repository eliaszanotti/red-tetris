export function PageLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="p-8 h-screen">
			<div className="mx-auto container h-full">{children}</div>
		</div>
	);
}
