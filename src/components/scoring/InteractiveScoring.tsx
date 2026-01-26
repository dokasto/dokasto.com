import React, { useState } from 'react';

type LevelName = 'poor' | 'mixed' | 'good' | 'excellent';

interface EvidenceCounts {
  poor: number;
  mixed: number;
  good: number;
  excellent: number;
}

const colorStyles = {
  poor: {
    color: '#b42318',
    backgroundColor: 'rgba(180, 35, 24, 0.25)',
  },
  mixed: {
    color: '#b54708',
    backgroundColor: 'rgba(181, 71, 8, 0.25)',
  },
  good: {
    color: '#175cd3',
    backgroundColor: 'rgba(23, 92, 211, 0.25)',
  },
  excellent: {
    color: '#027a48',
    backgroundColor: 'rgba(2, 122, 72, 0.25)',
  },
};

export default function InteractiveScoring() {
  const [evidenceCounts, setEvidenceCounts] = useState<EvidenceCounts>({
    poor: 2,
    mixed: 1,
    good: 3,
    excellent: 0,
  });

  const incrementEvidence = (level: LevelName) => {
    setEvidenceCounts(prev => ({
      ...prev,
      [level]: prev[level] + 1
    }));
  };

  const decrementEvidence = (level: LevelName) => {
    setEvidenceCounts(prev => ({
      ...prev,
      [level]: Math.max(0, prev[level] - 1)
    }));
  };

  // Calculate scores
  const poorScore = evidenceCounts.poor * -1;
  const mixedScore = evidenceCounts.mixed * 0;
  const goodScore = evidenceCounts.good * 1;
  const excellentScore = evidenceCounts.excellent * 2;

  const totalEvidences = Object.values(evidenceCounts).reduce((a, b) => a + b, 0);
  const averageScore = totalEvidences > 0 ? (poorScore + mixedScore + goodScore + excellentScore) / totalEvidences : 0;

  // Determine rating based on bands
  const getRating = (score: number): LevelName => {
    if (score <= -0.5) return 'poor';
    if (score <= 0.5) return 'mixed';
    if (score < 1.0) return 'good';
    return 'excellent';
  };

  const rating = getRating(averageScore);

  return (
    <>
      <style>{`
        .scoring-button {
          transition: background-color 0.15s ease;
        }
        .scoring-button:not(:disabled):hover {
          background: rgba(0, 0, 0, 0.15) !important;
        }
        .scoring-button:not(:disabled):active {
          background: rgba(0, 0, 0, 0.25) !important;
          transform: scale(0.95);
        }
      `}</style>
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          padding: '1rem',
          border: '1px solid rgba(0, 0, 0, 0.1)',
          borderRadius: '0.5rem',
          backgroundColor: 'rgba(0, 0, 0, 0.05)',
          margin: '1rem auto',
          maxWidth: '480px',
        }}
      >
      <strong>Problem Solving</strong>

      <div style={{ marginTop: '0.5rem' }}>
        {/* Poor evidences */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.875rem',
            margin: '0.5rem 0',
          }}
        >
          <span style={{ fontFamily: 'var(--font-mono)' }}>├─ Poor evidences</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              className="scoring-button"
              onClick={() => decrementEvidence('poor')}
              disabled={evidenceCounts.poor === 0}
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '4px',
                border: '1px solid rgba(0, 0, 0, 0.2)',
                background: evidenceCounts.poor === 0 ? 'rgba(0, 0, 0, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                cursor: evidenceCounts.poor === 0 ? 'not-allowed' : 'pointer',
                fontWeight: 'bold',
                fontSize: '1rem',
                opacity: evidenceCounts.poor === 0 ? 0.3 : 1,
              }}
            >
              -
            </button>
            <span style={{ minWidth: '2rem', textAlign: 'center', fontWeight: 'bold' }}>
              [{evidenceCounts.poor}]
            </span>
            <button
              className="scoring-button"
              onClick={() => incrementEvidence('poor')}
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '4px',
                border: '1px solid rgba(0, 0, 0, 0.2)',
                background: 'rgba(0, 0, 0, 0.05)',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '1rem',
              }}
            >
              +
            </button>
          </span>
        </div>

        {/* Mixed evidences */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.875rem',
            margin: '0.5rem 0',
          }}
        >
          <span style={{ fontFamily: 'var(--font-mono)' }}>├─ Mixed evidences</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              className="scoring-button"
              onClick={() => decrementEvidence('mixed')}
              disabled={evidenceCounts.mixed === 0}
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '4px',
                border: '1px solid rgba(0, 0, 0, 0.2)',
                background: 'rgba(0, 0, 0, 0.05)',
                cursor: evidenceCounts.mixed === 0 ? 'not-allowed' : 'pointer',
                fontWeight: 'bold',
                fontSize: '1rem',
                opacity: evidenceCounts.mixed === 0 ? 0.3 : 1,
              }}
            >
              -
            </button>
            <span style={{ minWidth: '2rem', textAlign: 'center', fontWeight: 'bold' }}>
              [{evidenceCounts.mixed}]
            </span>
            <button
              className="scoring-button"
              onClick={() => incrementEvidence('mixed')}
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '4px',
                border: '1px solid rgba(0, 0, 0, 0.2)',
                background: 'rgba(0, 0, 0, 0.05)',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '1rem',
              }}
            >
              +
            </button>
          </span>
        </div>

        {/* Good evidences */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.875rem',
            margin: '0.5rem 0',
          }}
        >
          <span style={{ fontFamily: 'var(--font-mono)' }}>├─ Good evidences</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              className="scoring-button"
              onClick={() => decrementEvidence('good')}
              disabled={evidenceCounts.good === 0}
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '4px',
                border: '1px solid rgba(0, 0, 0, 0.2)',
                background: 'rgba(0, 0, 0, 0.05)',
                cursor: evidenceCounts.good === 0 ? 'not-allowed' : 'pointer',
                fontWeight: 'bold',
                fontSize: '1rem',
                opacity: evidenceCounts.good === 0 ? 0.3 : 1,
              }}
            >
              -
            </button>
            <span style={{ minWidth: '2rem', textAlign: 'center', fontWeight: 'bold' }}>
              [{evidenceCounts.good}]
            </span>
            <button
              className="scoring-button"
              onClick={() => incrementEvidence('good')}
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '4px',
                border: '1px solid rgba(0, 0, 0, 0.2)',
                background: 'rgba(0, 0, 0, 0.05)',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '1rem',
              }}
            >
              +
            </button>
          </span>
        </div>

        {/* Excellent evidences */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.875rem',
            margin: '0.5rem 0',
          }}
        >
          <span style={{ fontFamily: 'var(--font-mono)' }}>└─ Excellent evidences</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              className="scoring-button"
              onClick={() => decrementEvidence('excellent')}
              disabled={evidenceCounts.excellent === 0}
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '4px',
                border: '1px solid rgba(0, 0, 0, 0.2)',
                background: 'rgba(0, 0, 0, 0.05)',
                cursor: evidenceCounts.excellent === 0 ? 'not-allowed' : 'pointer',
                fontWeight: 'bold',
                fontSize: '1rem',
                opacity: evidenceCounts.excellent === 0 ? 0.3 : 1,
              }}
            >
              -
            </button>
            <span style={{ minWidth: '2rem', textAlign: 'center', fontWeight: 'bold' }}>
              [{evidenceCounts.excellent}]
            </span>
            <button
              className="scoring-button"
              onClick={() => incrementEvidence('excellent')}
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '4px',
                border: '1px solid rgba(0, 0, 0, 0.2)',
                background: 'rgba(0, 0, 0, 0.05)',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '1rem',
              }}
            >
              +
            </button>
          </span>
        </div>
      </div>

      {/* Score calculation */}
      <div style={{ margin: '0.5rem 0', textAlign: 'center' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>
          Score: ({poorScore > 0 ? '+' : ''}{poorScore} + {mixedScore > 0 ? '+' : ''}{mixedScore} + {goodScore > 0 ? '+' : ''}{goodScore} + {excellentScore > 0 ? '+' : ''}{excellentScore}) / {totalEvidences} = {averageScore.toFixed(2)}
        </span>
      </div>

      {/* Rating display */}
      <div style={{ marginTop: '1rem' }}>
        <strong>Final Rating:</strong>
        <div
          style={{
            display: 'flex',
            gap: '0.75rem',
            marginTop: '0.5rem',
            justifyContent: 'center',
          }}
        >
          <div style={{ flex: 1, maxWidth: '120px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: '0.65rem', marginBottom: '0.25rem', opacity: 0.6, fontFamily: 'var(--font-mono)' }}>
              ≤ -0.5
            </div>
            <div
              style={{
                width: '100%',
                padding: '0.25rem 0.5rem',
                borderRadius: '0.25rem',
                textAlign: 'center',
                fontWeight: rating === 'poor' ? 'bold' : 'normal',
                fontSize: '0.75rem',
                ...(rating === 'poor' ? colorStyles.poor : {
                  backgroundColor: 'rgba(0, 0, 0, 0.08)',
                  color: 'rgba(0, 0, 0, 0.5)',
                }),
              }}
            >
              <span>Poor</span>
            </div>
          </div>

          <div style={{ flex: 1, maxWidth: '120px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: '0.65rem', marginBottom: '0.25rem', opacity: 0.6, fontFamily: 'var(--font-mono)' }}>
              -0.5 to 0.5
            </div>
            <div
              style={{
                width: '100%',
                padding: '0.25rem 0.5rem',
                borderRadius: '0.25rem',
                textAlign: 'center',
                fontWeight: rating === 'mixed' ? 'bold' : 'normal',
                fontSize: '0.75rem',
                ...(rating === 'mixed' ? colorStyles.mixed : {
                  backgroundColor: 'rgba(0, 0, 0, 0.08)',
                  color: 'rgba(0, 0, 0, 0.5)',
                }),
              }}
            >
              <span>Mixed</span>
            </div>
          </div>

          <div style={{ flex: 1, maxWidth: '120px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: '0.65rem', marginBottom: '0.25rem', opacity: 0.6, fontFamily: 'var(--font-mono)' }}>
              0.5 to 0.9
            </div>
            <div
              style={{
                width: '100%',
                padding: '0.25rem 0.5rem',
                borderRadius: '0.25rem',
                textAlign: 'center',
                fontWeight: rating === 'good' ? 'bold' : 'normal',
                fontSize: '0.75rem',
                ...(rating === 'good' ? colorStyles.good : {
                  backgroundColor: 'rgba(0, 0, 0, 0.08)',
                  color: 'rgba(0, 0, 0, 0.5)',
                }),
              }}
            >
              <span>Good</span>
            </div>
          </div>

          <div style={{ flex: 1, maxWidth: '120px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: '0.65rem', marginBottom: '0.25rem', opacity: 0.6, fontFamily: 'var(--font-mono)' }}>
              ≥ 1.0
            </div>
            <div
              style={{
                width: '100%',
                padding: '0.25rem 0.5rem',
                borderRadius: '0.25rem',
                textAlign: 'center',
                fontWeight: rating === 'excellent' ? 'bold' : 'normal',
                fontSize: '0.75rem',
                ...(rating === 'excellent' ? colorStyles.excellent : {
                  backgroundColor: 'rgba(0, 0, 0, 0.08)',
                  color: 'rgba(0, 0, 0, 0.5)',
                }),
              }}
            >
              <span>Excellent</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
