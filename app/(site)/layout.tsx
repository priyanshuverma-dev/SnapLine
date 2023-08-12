export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="bg-gray-50 dark:bg-black">{children}</div>;
}
