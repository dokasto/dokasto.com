import React from 'react';
import type { RubricDescriptionWithEvidence } from '../../data/rubricDataWithEvidence';
import RubricEvidence from './RubricEvidence';

interface RubricDescriptionProps {
  description: string | RubricDescriptionWithEvidence;
  expandEvidenceByDefault?: boolean;
}

export default function RubricDescription({ description, expandEvidenceByDefault = false }: RubricDescriptionProps) {
  // Check if description is an object with evidence
  const isObject = typeof description === 'object';
  const text = isObject ? description.text : description;
  const evidence = isObject ? description.evidence : undefined;

  return (
    <div>
      <div className="pl-8 text-xs">
        ├─ {text}
      </div>
      {evidence && <RubricEvidence evidence={evidence} initiallyExpanded={expandEvidenceByDefault} />}
    </div>
  );
}
