import React, { useState, useEffect } from 'react';
import type { RubricCategory } from '../../data/rubricDataWithEvidence';
import RubricLevel from './RubricLevel';

interface RubricCategoryProps {
  category: RubricCategory;
  forceExpanded?: boolean;
  initiallyExpanded?: boolean;
  defaultExpandedLevels?: string[];
  expandEvidenceByDefault?: boolean;
}

export default function RubricCategory({
  category,
  forceExpanded,
  initiallyExpanded = false,
  defaultExpandedLevels = [],
  expandEvidenceByDefault = false
}: RubricCategoryProps) {
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
    <div className="mb-2">
      <button
        onClick={toggleExpand}
        className="inline-flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity font-mono"
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
        <span>├─{chevron}</span>
        <span className="font-semibold">{category.name}</span>
      </button>

      {isExpanded && (
        <div>
          {category.levels.map((level) => (
            <RubricLevel
              key={level.name}
              level={level}
              forceExpanded={forceExpanded}
              initiallyExpanded={defaultExpandedLevels.includes(level.name)}
              expandEvidenceByDefault={expandEvidenceByDefault}
            />
          ))}
        </div>
      )}
    </div>
  );
}
