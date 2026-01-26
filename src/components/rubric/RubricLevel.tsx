import React, { useState, useEffect } from 'react';
import type { RubricLevel } from '../../data/rubricDataWithEvidence';
import RubricDescription from './RubricDescription';

interface RubricLevelProps {
  level: RubricLevel;
  forceExpanded?: boolean;
  initiallyExpanded?: boolean;
  expandEvidenceByDefault?: boolean;
}

const colorStyles = {
  poor: {
    color: 'var(--color-rubric-poor)',
    backgroundColor: 'var(--color-rubric-poor-bg)',
  },
  mixed: {
    color: 'var(--color-rubric-mixed)',
    backgroundColor: 'var(--color-rubric-mixed-bg)',
  },
  good: {
    color: 'var(--color-rubric-good)',
    backgroundColor: 'var(--color-rubric-good-bg)',
  },
  excellent: {
    color: 'var(--color-rubric-excellent)',
    backgroundColor: 'var(--color-rubric-excellent-bg)',
  },
};

export default function RubricLevel({
  level,
  forceExpanded,
  initiallyExpanded = false,
  expandEvidenceByDefault = false
}: RubricLevelProps) {
  const [isExpanded, setIsExpanded] = useState(initiallyExpanded);

  useEffect(() => {
    if (forceExpanded !== undefined) {
      setIsExpanded(forceExpanded);
    }
  }, [forceExpanded]);

  useEffect(() => {
    if (initiallyExpanded) {
      setIsExpanded(true);
    }
  }, [initiallyExpanded]);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const chevron = isExpanded ? '▼' : '▶';

  return (
    <div>
      <div className="pl-8">
        <button
          onClick={toggleExpand}
          className="inline-flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
          aria-expanded={isExpanded}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              toggleExpand();
            }
          }}
        >
          <span className="text-xs">{chevron}</span>
          <span
            className="font-bold px-2 py-0.5 rounded-md text-sm"
            style={colorStyles[level.colorClass]}
          >
            {level.name}
          </span>
        </button>

        {isExpanded && (
          <div>
            {level.descriptions.map((description, index) => (
              <RubricDescription
                key={index}
                description={description}
                expandEvidenceByDefault={expandEvidenceByDefault}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
