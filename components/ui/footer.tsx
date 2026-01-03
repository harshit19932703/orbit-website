import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[#27272a] bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">O</span>
              </div>
              <span className="text-lg font-semibold text-white">Orbit</span>
            </Link>
            <p className="text-sm text-[#71717a] max-w-xs">
              Feature-level AI observability using real runtime data.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-medium text-white mb-4">Product</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/features"
                  className="text-sm text-[#71717a] hover:text-white transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-sm text-[#71717a] hover:text-white transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/docs"
                  className="text-sm text-[#71717a] hover:text-white transition-colors"
                >
                  Documentation
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-medium text-white mb-4">Resources</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://www.npmjs.com/package/@orbithq/sdk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#71717a] hover:text-white transition-colors"
                >
                  Node.js SDK
                </a>
              </li>
              <li>
                <a
                  href="https://pypi.org/project/orbithq-sdk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#71717a] hover:text-white transition-colors"
                >
                  Python SDK
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-[#27272a]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-[#52525b]">
              © {new Date().getFullYear()} Orbit. All rights reserved.
            </p>
            <p className="text-xs text-[#52525b]">
              Costs shown are estimated based on standard model pricing.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
