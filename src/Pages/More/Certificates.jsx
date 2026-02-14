import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOpenInNew, MdArrowBack } from "react-icons/md";
import { FaCertificate } from "react-icons/fa";
import Card from "../../Elements/Card";
import Button from "../../Elements/Button";

export default function MoreCertificates() {
  const [certificates, setCertificates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0,0)
    setIsLoading(true);
    fetch("/assets/certificate.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load certificate.json");
        return res.json();
      })
      .then((data) => {
        setCertificates(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  const handleBack = () => {
    navigate("/");
  };

  const handleCertificateDetails = (id) => {
    navigate(`/certificates/${id}`);
  };

  const handleImageError = (certificateId) => {
    setImageErrors(prev => ({ ...prev, [certificateId]: true }));
  };

  const getImagePath = (imagePath) => {
    if (imagePath.startsWith('http') || imagePath.startsWith('data:')) {
      return imagePath;
    }

    const cleanPath = imagePath.replace(/^\.\.?\/+/, '/');
    
    return cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
  };

  return (
    <section className="relative py-16 px-4 sm:py-20 sm:px-8 lg:px-12 min-h-screen">
      <div className="mt-5 max-w-7xl mx-auto mb-8">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-400 hover:text-[var(--color-accent)] transition-colors duration-300"
        >
          <MdArrowBack className="text-lg" />
          <span>Back</span>
        </button>
      </div>

      <div className="flex flex-col gap-3 items-center justify-center mb-12 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white mr-4">Certificates</h2>
        <p className="text-md text-center text-[var(--color-subtext)]">A collection of certifications that reflect my learning journey and technical growth.</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-4 border-[var(--color-accent)]/20 border-t-[var(--color-accent)] rounded-full animate-spin" />
        </div>
      ) : (
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((certificate) => {
              const certId = certificate.id.toString();
              const hasImageError = imageErrors[certId];
              
              return (
                <Card
                  key={certId}
                  id={certificate.id}
                  title={certificate.title}
                  description={`Issued by ${certificate.issuer}`}
                  tech={certificate.category || []}
                  date={certificate.date}
                  onDetails={handleCertificateDetails}
                  className="h-full flex flex-col"
                >
                  {certificate.image && !hasImageError ? (
                    <img
                      src={getImagePath(certificate.image)}
                      alt={certificate.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                      onError={(e) => {
                        console.error(`Failed to load image: ${certificate.image}`);
                        handleImageError(certId);
                      }}
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] flex items-center justify-center rounded-t-lg">
                      <div className="text-center">
                        <FaCertificate className="text-5xl text-gray-600 block mx-auto mb-2" />
                        <span className="text-sm text-gray-500">Image not available</span>
                      </div>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>

          {certificates.length === 0 && (
            <div className="text-center text-gray-400 py-20">
              <FaCertificate className="text-6xl mx-auto mb-4 text-gray-600" />
              <p>No certificates found</p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}