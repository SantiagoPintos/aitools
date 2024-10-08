export default function Footer() {
  return (
    <footer className="py-6">
        <div className="container mx-auto px-4">
          <div className="mt-6 pt-4 text-center text-sm text-gray-400">
            <p>
              © {new Date().getFullYear()} PrivateIA rights reserved.
            </p>
            <p>
              Protecting your privacy with on-device AI.
            </p>
          </div>
        </div>
    </footer>
    )
}
