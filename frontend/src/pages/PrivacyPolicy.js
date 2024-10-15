import React from "react";
import { Shield, Users, Lock } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-blue-100 min-h-screen p-8">
      <div className="max-w-3xl mx-auto bg-white py-6 px-10 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-400">
          Privacy <span className="text-blue-900">Policy</span>
        </h1>

        <p className="mb-4">
          At Artify, we value your privacy and are committed to protecting your
          personal information. This Privacy Policy outlines how we collect,
          use, and safeguard your information when you visit our website.
        </p>

        <h2 className="text-xl font-semibold mb-4 mt-6">
          Information We Collect
        </h2>
        <ul className="list-disc list-inside mb-4">
          <li className="flex items-center mb-2">
            <Shield className="w-4 h-4 text-blue-500 mr-2" />
            Personal Information: Name, email address, and contact details.
          </li>
          <li className="flex items-center mb-2">
            <Users className="w-4 h-4 text-blue-500 mr-2" />
            Usage Data: Information on how you use our website and services.
          </li>
          <li className="flex items-center mb-2">
            <Lock className="w-4 h-4 text-blue-500 mr-2" />
            Cookies: Small data files that are placed on your device.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mb-4 mt-6">
          How We Use Your Information
        </h2>
        <p className="mb-4">
          We may use your information for the following purposes:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>To provide and maintain our services.</li>
          <li>To notify you about changes to our services.</li>
          <li>
            To allow you to participate in interactive features when you choose
            to do so.
          </li>
          <li>To provide customer support.</li>
          <li>
            To gather analysis or valuable information so that we can improve
            our services.
          </li>
          <li>To monitor the usage of our services.</li>
          <li>To detect, prevent, and address technical issues.</li>
        </ul>

        <h2 className="text-xl font-semibold mb-4 mt-6">Data Security</h2>
        <p className="mb-4">
          The security of your data is important to us. We strive to use
          commercially acceptable means to protect your personal information.
          However, please remember that no method of transmission over the
          internet or method of electronic storage is 100% secure.
        </p>

        <h2 className="text-xl font-semibold mb-4 mt-6">Your Rights</h2>
        <p className="mb-4">
          You have the right to access, correct, or delete your personal data.
          You may also have the right to object to the processing of your
          personal data or request the restriction of processing under certain
          conditions.
        </p>

        <h2 className="text-xl font-semibold mb-4 mt-6">
          Changes to This Privacy Policy
        </h2>
        <p className="mb-4">
          We may update our Privacy Policy from time to time. We will notify you
          of any changes by posting the new Privacy Policy on this page.
        </p>

        <h2 className="text-xl font-semibold mb-4 mt-6">Contact Us</h2>
        <p className="mb-4">
          If you have any questions about this Privacy Policy, please contact
          us:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Email: support@artify.com</li>
          <li>Phone: +123 456 7890</li>
        </ul>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
