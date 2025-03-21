import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12 text-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-bold text-xl mb-4">
              <span className="text-primary">Local</span>Events
            </h3>
            <p className="text-muted-foreground">Discover and attend the best local events happening near you.</p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-center md:text-right">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-muted-foreground hover:text-primary">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/saved" className="text-muted-foreground hover:text-primary">
                  Saved Events
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} LocalEvents. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

