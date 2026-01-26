import React, { useState } from 'react';
import { rubricData } from '../../data/rubricData';
import type { RubricData } from '../../data/rubricDataWithEvidence';
import RubricCategory from './RubricCategory';

interface RubricTreeProps {
  data?: RubricData;
  defaultExpandedCategories?: string[];
  defaultExpandedLevels?: Record<string, string[]>;
  expandEvidenceByDefault?: boolean;
}

export default function RubricTree({
  data = rubricData,
  defaultExpandedCategories = [],
  defaultExpandedLevels = {},
  expandEvidenceByDefault = false
}: RubricTreeProps = {}) {
  const [expandAll, setExpandAll] = useState(false);

  const toggleExpandAll = () => {
    setExpandAll(!expandAll);
  };

  return (
    <div>
      <div className="flex justify-end mb-2">
        <button
          onClick={toggleExpandAll}
          className="text-xs text-black/60 hover:text-black/80 underline cursor-pointer"
        >
          {expandAll ? 'Collapse all' : 'Expand all'}
        </button>
      </div>
      <div
        className="font-mono text-sm leading-relaxed p-4 border border-black/10 rounded-lg overflow-x-auto bg-black/5"
        style={{
          whiteSpace: 'pre-wrap',
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        }}
      >
        {data.categories.map((category) => (
          <RubricCategory
            key={category.name}
            category={category}
            forceExpanded={expandAll}
            initiallyExpanded={defaultExpandedCategories.includes(category.name)}
            defaultExpandedLevels={defaultExpandedLevels[category.name] || []}
            expandEvidenceByDefault={expandEvidenceByDefault}
          />
        ))}
      </div>
    </div>
  );
}
