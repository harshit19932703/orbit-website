export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-white mb-8">Privacy Policy</h1>
        <p className="text-sm text-[#71717a] mb-8">Last updated: January 2025</p>

        <div className="prose prose-invert prose-sm max-w-none space-y-6 text-[#a1a1aa]">
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">1. Introduction</h2>
            <p>
              Orbit (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates the withorbit.io website and the Orbit
              analytics platform. This Privacy Policy explains how we collect, use, disclose, and
              safeguard your information when you use our service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">2. Information We Collect</h2>
            <h3 className="text-lg font-medium text-white mb-2">Account Information</h3>
            <p>
              When you create an account, we collect your email address and name (if provided via
              Google OAuth). We use this information to identify you and provide our services.
            </p>

            <h3 className="text-lg font-medium text-white mb-2 mt-4">Usage Data</h3>
            <p>
              Our SDK collects anonymized usage metrics about your AI/LLM API calls, including:
              model names, token counts, latency, and error rates. This data is associated with
              your organization and used to provide analytics insights.
            </p>

            <h3 className="text-lg font-medium text-white mb-2 mt-4">Technical Data</h3>
            <p>
              We automatically collect certain technical information when you visit our website,
              including IP address, browser type, and pages visited. We use Vercel Analytics for
              this purpose.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">3. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>To provide and maintain our analytics service</li>
              <li>To authenticate you and secure your account</li>
              <li>To display your usage metrics and insights in the dashboard</li>
              <li>To send important service updates (you can opt out)</li>
              <li>To improve our service and develop new features</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">4. Data Sharing</h2>
            <p>
              We do not sell your personal information. We may share data with:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>Service providers who help us operate our platform (e.g., Supabase for authentication and database, Vercel for hosting)</li>
              <li>Law enforcement when required by law</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">5. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your data, including
              encryption in transit (HTTPS) and at rest. API keys are encrypted before storage.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">6. Data Retention</h2>
            <p>
              We retain your account information for as long as your account is active. Usage
              analytics data is retained for up to 12 months. You can request deletion of your
              data at any time by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">7. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Export your data in a portable format</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">8. Cookies</h2>
            <p>
              We use essential cookies for authentication and session management. We also use
              Vercel Analytics which may set cookies for anonymous usage tracking.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any
              material changes by posting the new policy on this page and updating the
              &quot;Last updated&quot; date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">10. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at
              hello@withorbit.io.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
