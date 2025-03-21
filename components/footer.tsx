import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t py-8 md:py-12">
      <div className="container flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">LocalEvents</h3>
          <p className="text-sm text-muted-foreground">Discover and attend the best local events near you</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          <div className="flex flex-col gap-2">
            <h4 className="font-medium">Explore</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/events" className="text-sm text-muted-foreground hover:text-primary">
                All Events
              </Link>
              <Link href="/categories" className="text-sm text-muted-foreground hover:text-primary">
                Categories
              </Link>
              <Link href="/map" className="text-sm text-muted-foreground hover:text-primary">
                Map View
              </Link>
            </nav>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="font-medium">Company</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/about" className="text-sm text-muted-foreground hover:text-primary">
                About Us
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">
                Contact
              </Link>
              <Link href="/careers" className="text-sm text-muted-foreground hover:text-primary">
                Careers
              </Link>
            </nav>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="font-medium">Legal</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">
                Terms
              </Link>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">
                Privacy
              </Link>
              <Link href="/cookies" className="text-sm text-muted-foreground hover:text-primary">
                Cookies
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="container mt-8 pt-8 border-t">
        <p className="text-xs text-muted-foreground text-center">
          © {new Date().getFullYear()} LocalEvents. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

