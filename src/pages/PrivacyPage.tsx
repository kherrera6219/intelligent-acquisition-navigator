
import { Card } from "@/components/ui/card";
import { GradientText } from "@/components/ui/universal/GradientText";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">
          <GradientText>Privacy Policy</GradientText>
        </h1>

        <Card className="bg-black/40 border-gray-800 p-6 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Data Collection and Usage</h2>
            <p className="text-gray-300">
              We collect and process your data to provide and improve our services. This includes:
            </p>
            <ul className="list-disc list-inside mt-2 text-gray-300 space-y-2">
              <li>Basic account information</li>
              <li>Usage data and analytics</li>
              <li>Communication preferences</li>
              <li>Technical information about your device and connection</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Cookie Policy</h2>
            <p className="text-gray-300">
              We use cookies and similar tracking technologies to track activity on our service and 
              hold certain information. Cookies are files with small amount of data which may include 
              an anonymous unique identifier.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Your Rights</h2>
            <p className="text-gray-300">
              Under data protection laws, you have rights including:
            </p>
            <ul className="list-disc list-inside mt-2 text-gray-300 space-y-2">
              <li>Your right to access your data</li>
              <li>Your right to correct your data</li>
              <li>Your right to delete your data</li>
              <li>Your right to restrict processing</li>
              <li>Your right to data portability</li>
              <li>Your right to object to processing</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Contact Us</h2>
            <p className="text-gray-300">
              If you have any questions about this Privacy Policy, please contact us at:
              <br />
              <a href="mailto:privacy@example.com" className="text-violet-400 hover:text-violet-300">
                privacy@example.com
              </a>
            </p>
          </section>
        </Card>
      </div>
    </div>
  );
};

export default Privacy;
