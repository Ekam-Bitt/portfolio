import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
            <h2 className="text-4xl font-bold mb-4">404 - Not Found</h2>
            <p className="mb-8 text-neutral-500">Could not find requested resource</p>
            <Link
                href="/"
                className="px-6 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
            >
                Return Home
            </Link>
        </div>
    );
}
