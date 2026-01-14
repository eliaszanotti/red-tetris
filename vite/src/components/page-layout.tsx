export function PageLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="p-8">
			<div className="mx-auto container">{children}</div>
		</div>
	);
}
