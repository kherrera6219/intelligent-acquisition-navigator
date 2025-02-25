
import { Card } from "@/components/ui/card";
import { GradientText } from "@/components/ui/universal/GradientText";
import { Shield, Lock, UserCheck, Mail, Bell } from "lucide-react";
import { Container } from "@/components/ui/universal/Container";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Container className="py-16">
        {/* Title Section */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4" id="privacy-policy">
            <GradientText>Privacy Policy</GradientText>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We are committed to protecting your privacy and ensuring the security of your personal information.
            This policy outlines how we collect, use, and safeguard your data.
          </p>
        </header>

        <div className="space-y-8">
          {/* Data Collection Section */}
          <section aria-labelledby="data-collection">
            <Card className="bg-black/40 border-gray-800 p-6 sm:p-8 space-y-4">
              <div className="flex items-start gap-4">
                <Shield className="w-6 h-6 text-violet-400 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-4" id="data-collection">
                    Data Collection and Usage
                  </h2>
                  <p className="text-gray-300 mb-4">
                    We collect and process your data to provide and improve our services:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                    <li>Basic account information for user identification</li>
                    <li>Usage data to improve our services and user experience</li>
                    <li>Communication preferences to better serve you</li>
                    <li>Technical information about your device and connection</li>
                  </ul>
                </div>
              </div>
            </Card>
          </section>

          {/* Cookie Policy Section */}
          <section aria-labelledby="cookie-policy">
            <Card className="bg-black/40 border-gray-800 p-6 sm:p-8 space-y-4">
              <div className="flex items-start gap-4">
                <Lock className="w-6 h-6 text-violet-400 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-4" id="cookie-policy">
                    Cookie Policy
                  </h2>
                  <p className="text-gray-300">
                    We use cookies and similar tracking technologies to enhance your experience:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-300 mt-4 ml-4">
                    <li>Essential cookies for basic website functionality</li>
                    <li>Analytics cookies to understand user behavior</li>
                    <li>Preference cookies to remember your settings</li>
                    <li>Marketing cookies to provide relevant content</li>
                  </ul>
                </div>
              </div>
            </Card>
          </section>

          {/* User Rights Section */}
          <section aria-labelledby="user-rights">
            <Card className="bg-black/40 border-gray-800 p-6 sm:p-8 space-y-4">
              <div className="flex items-start gap-4">
                <UserCheck className="w-6 h-6 text-violet-400 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-4" id="user-rights">
                    Your Rights
                  </h2>
                  <p className="text-gray-300 mb-4">
                    Under data protection laws, you have several rights regarding your data:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                    <li>Right to access your personal data</li>
                    <li>Right to correct inaccurate information</li>
                    <li>Right to request data deletion</li>
                    <li>Right to restrict data processing</li>
                    <li>Right to data portability</li>
                    <li>Right to object to data processing</li>
                  </ul>
                </div>
              </div>
            </Card>
          </section>

          {/* Communication Preferences Section */}
          <section aria-labelledby="communication-preferences">
            <Card className="bg-black/40 border-gray-800 p-6 sm:p-8 space-y-4">
              <div className="flex items-start gap-4">
                <Bell className="w-6 h-6 text-violet-400 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-4" id="communication-preferences">
                    Communication Preferences
                  </h2>
                  <p className="text-gray-300 mb-4">
                    You can control how we communicate with you and manage your notifications.
                  </p>
                  <div className="space-y-2 text-gray-300">
                    <p>Update your preferences through:</p>
                    <ul className="list-disc list-inside ml-4">
                      <li>Your account settings</li>
                      <li>Email notification preferences</li>
                      <li>Application notifications</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* Contact Section */}
          <section aria-labelledby="contact-info">
            <Card className="bg-black/40 border-gray-800 p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-violet-400 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-4" id="contact-info">
                    Contact Us
                  </h2>
                  <p className="text-gray-300">
                    If you have any questions about this Privacy Policy, please contact us at:
                    <br />
                    <a 
                      href="mailto:privacy@example.com" 
                      className="text-violet-400 hover:text-violet-300 transition-colors mt-2 inline-block"
                      aria-label="Email us at privacy@example.com"
                    >
                      privacy@example.com
                    </a>
                  </p>
                </div>
              </div>
            </Card>
          </section>
        </div>

        {/* Last Updated Notice */}
        <p className="text-gray-500 text-sm text-center mt-8">
          Last updated: January 2024
        </p>
      </Container>
    </div>
  );
};

export default Privacy;
