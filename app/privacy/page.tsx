import React from 'react';
import { ShieldCheck } from 'lucide-react';
import Link from 'next/link';

const Privacy: React.FC = () => {
    return(
        <div className="flex flex-col min-h-screen">
      <main className="flex-1 container mx-auto px-4 md:px-6 py-8">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-3">1. Introduction</h2>
            <p>
              At PRIVATEIA, we are committed to protecting your privacy. This Privacy Policy explains how we handle your information when you use our AI-powered tools.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-3">2. Local Processing</h2>
            <p>
              Our AI tools operate entirely within your web browser. This means:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>All data processing occurs locally on your device.</li>
              <li>No data is sent to our servers or stored by us at any point.</li>
              <li>Your information remains private and under your control at all times.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-3">3. Data Collection</h2>
            <p>
              We do not collect, store, or process any personal data or user inputs. Our tools are designed to function without the need for data transmission to external servers.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-3">4. Cookies and Tracking</h2>
            <p>
              We do not use cookies or any other tracking technologies on our website or within our AI tools.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-3">5. Third-Party Services</h2>
            <p>
              Our AI tools do not integrate with or utilize any third-party services that would have access to your data.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-3">6. Data Security</h2>
            <p>
              Since all processing occurs locally in your browser, the security of your data depends on your device's security. We recommend keeping your browser and operating system up to date for optimal security.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-3">7. Children's Privacy</h2>
            <p>
              Our services are not directed to children under the age of 13. We do not knowingly collect or store any personal information from children under 13.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-3">8. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-3">9. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at{" "}
              <a href="mailto:privacy@privateia.com" className="text-primary hover:underline">
                privacy@privateia.com
              </a>
              .
            </p>
          </section>
          <p className="text-sm text-gray-500">Last updated: October 1, 2024</p>
        </div>
      </main>
    </div>
    )
}

export default Privacy;