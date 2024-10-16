import React from "react";
import "./Providers.scss";

interface Provider {
  id: number;
  name: string;
}

interface ProvidersProps {
  providers: Provider[];
  selectedProviders: number[];
  onProviderChange: (providers: number[]) => void;
}

const Providers: React.FC<ProvidersProps> = ({
  providers,
  selectedProviders,
  onProviderChange,
}) => {
  return (
    <div className="providers">
      <h3>Providers</h3>
      <div className="provider-list">
        {providers.map(provider => (
          <button
            key={provider.id}
            className={`provider-button ${
              selectedProviders.includes(provider.id) ? "selected" : ""
            }`}
            onClick={() => {
              const updatedProviders = selectedProviders.includes(provider.id)
                ? selectedProviders.filter(p => p !== provider.id)
                : [...selectedProviders, provider.id];
              onProviderChange(updatedProviders);
            }}
          >
            {provider.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Providers;
