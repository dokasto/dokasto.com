import React from 'react';
import type { ModelEvidence } from '../../data/rubricDataWithEvidence';

interface RubricEvidenceProps {
  evidence: {
    models: ModelEvidence[];
    consensus?: string;
  };
  initiallyExpanded?: boolean;
}

const modelColors = {
  'GPT-5': {
    color: 'var(--color-model-gpt)',
    bg: 'var(--color-model-gpt-bg)',
  },
  'Claude Sonnet': {
    color: 'var(--color-model-claude)',
    bg: 'var(--color-model-claude-bg)',
  },
  'Gemini 2.5 Pro': {
    color: 'var(--color-model-gemini)',
    bg: 'var(--color-model-gemini-bg)',
  },
};

export default function RubricEvidence({ evidence, initiallyExpanded = false }: RubricEvidenceProps) {
  // Group evidence by model
  const groupedEvidence: Record<string, ModelEvidence[]> = {};
  evidence.models.forEach((model) => {
    if (!groupedEvidence[model.model]) {
      groupedEvidence[model.model] = [];
    }
    groupedEvidence[model.model].push(model);
  });

  // State for each model's expansion, plus consensus
  const [expandedModels, setExpandedModels] = React.useState<Record<string, boolean>>(
    Object.keys(groupedEvidence).reduce((acc, model) => {
      acc[model] = initiallyExpanded;
      return acc;
    }, {} as Record<string, boolean>)
  );

  const [expandedConsensus, setExpandedConsensus] = React.useState(initiallyExpanded);

  const toggleModel = (modelName: string) => {
    setExpandedModels(prev => ({
      ...prev,
      [modelName]: !prev[modelName]
    }));
  };

  return (
    <div className="pl-16 mt-2">
      {/* Individual Model Evidence */}
      <div className="space-y-1 mb-2" aria-label="Model evidence">
        {Object.entries(groupedEvidence).map(([modelName, evidences]) => (
          <div key={modelName}>
            <button
              onClick={() => toggleModel(modelName)}
              className="flex items-start gap-2 text-xs cursor-pointer hover:opacity-80"
            >
              <span className="text-xs">{expandedModels[modelName] ? '▼' : '▶'}</span>
              <span
                className="font-bold px-1.5 py-0.5 rounded text-xs shrink-0"
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.05)',
                  border: '1px solid rgba(0, 0, 0, 0.15)',
                }}
              >
                {modelName} found {evidences.length} evidence{evidences.length !== 1 ? 's' : ''}
              </span>
            </button>
            {expandedModels[modelName] && (
              <div className="pl-6 mt-1 space-y-1">
                {evidences.map((modelEvidence, index) => (
                  <div key={index} className="text-xs italic opacity-70">
                    "{modelEvidence.transcript}"
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Consensus Section - same styling as models */}
      {evidence.consensus && (
        <div>
          <button
            onClick={() => setExpandedConsensus(!expandedConsensus)}
            className="flex items-start gap-2 text-xs cursor-pointer hover:opacity-80"
          >
            <span className="text-xs">{expandedConsensus ? '▼' : '▶'}</span>
            <span
              className="font-bold px-1.5 py-0.5 rounded text-xs shrink-0"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                border: '1px solid rgba(0, 0, 0, 0.15)',
              }}
            >
              Consensus ({Object.keys(groupedEvidence).length}/{Object.keys(groupedEvidence).length} models)
            </span>
          </button>
          {expandedConsensus && (
            <div className="pl-6 mt-1 text-xs">
              <div className="italic opacity-70">
                {evidence.consensus}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
