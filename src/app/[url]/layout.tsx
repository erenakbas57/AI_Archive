import Link from "next/link";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function Home({ children }: RootLayoutProps) {
  return (
    <>
      <nav className="w-full bg-black p-4 text-white flex justify-between">
        <h1 className="text-xl font-semibold">Ürün Sayfası</h1>
        <Link href="/" className="text-white hover:text-blue-500">
          Anasayfa
        </Link>
      </nav>
      <main>{children}</main>
    </>
  );
}
