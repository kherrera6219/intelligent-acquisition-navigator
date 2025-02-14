
import { useNavigate } from "react-router-dom";

interface PrivacyNoticeProps {
  onClose: () => void;
}

export const PrivacyNotice = ({ onClose }: PrivacyNoticeProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between flex-wrap">
          <div className="flex-1 flex items-center">
            <p className="text-sm text-gray-300">
              <span className="font-medium text-white">Privacy Update:</span>
              {" "}We've updated our privacy policy to better protect your data.
              {" "}
              <button
                onClick={() => navigate("/privacy")}
                className="text-white underline hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                Learn more
              </button>
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 ml-4 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 p-1 rounded"
            aria-label="Close privacy notice"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
};
