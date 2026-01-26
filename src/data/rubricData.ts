export interface RubricLevel {
  name: 'Poor' | 'Mixed' | 'Good' | 'Excellent';
  colorClass: 'poor' | 'mixed' | 'good' | 'excellent';
  descriptions: string[];
}

export interface RubricCategory {
  name: string;
  levels: RubricLevel[];
}

export interface RubricData {
  categories: RubricCategory[];
}

export const rubricData: RubricData = {
  categories: [
    {
      name: 'Problem Solving',
      levels: [
        {
          name: 'Poor',
          colorClass: 'poor',
          descriptions: [
            'Struggles to break the problem into steps or pick a workable approach.',
            'Gets stuck without testing assumptions or trying smaller examples.'
          ]
        },
        {
          name: 'Mixed',
          colorClass: 'mixed',
          descriptions: [
            'Finds a reasonable approach but misses edge cases or tradeoffs.',
            'Makes progress with hints, but the plan changes mid-way.'
          ]
        },
        {
          name: 'Good',
          colorClass: 'good',
          descriptions: [
            'Chooses a sound approach and validates it with examples and edge cases.',
            'Explains tradeoffs and adjusts cleanly when requirements change.'
          ]
        },
        {
          name: 'Excellent',
          colorClass: 'excellent',
          descriptions: [
            'Quickly identifies the core constraints and proposes multiple viable strategies.',
            'Anticipates pitfalls early and drives toward a robust, well-justified solution.'
          ]
        }
      ]
    },
    {
      name: 'Coding',
      levels: [
        {
          name: 'Poor',
          colorClass: 'poor',
          descriptions: [
            'Code is hard to run or reason about due to frequent bugs and weak structure.',
            'Avoids basic tests, and fixes are mostly trial-and-error.'
          ]
        },
        {
          name: 'Mixed',
          colorClass: 'mixed',
          descriptions: [
            'Produces mostly working code but with messy naming, duplication, or shaky correctness.',
            'Adds some checks/tests, but misses important cases.'
          ]
        },
        {
          name: 'Good',
          colorClass: 'good',
          descriptions: [
            'Writes clean, correct code with sensible structure and readable naming.',
            'Tests key cases and debugs systematically.'
          ]
        },
        {
          name: 'Excellent',
          colorClass: 'excellent',
          descriptions: [
            'Writes high-quality code that is clean, correct, and easy to extend.',
            'Uses strong testing and debugging habits, catching issues before they spread.'
          ]
        }
      ]
    },
    {
      name: 'Communication',
      levels: [
        {
          name: 'Poor',
          colorClass: 'poor',
          descriptions: [
            'Jumps into coding without clarifying the problem or narrating decisions.',
            'Explanations are hard to follow, especially when stuck.'
          ]
        },
        {
          name: 'Mixed',
          colorClass: 'mixed',
          descriptions: [
            'Communicates the main idea but skips details like assumptions or edge cases.',
            'Provides updates occasionally, but reasoning is sometimes opaque.'
          ]
        },
        {
          name: 'Good',
          colorClass: 'good',
          descriptions: [
            'Clarifies requirements and explains the plan before and during implementation.',
            'Thinks out loud clearly, making tradeoffs and uncertainty explicit.'
          ]
        },
        {
          name: 'Excellent',
          colorClass: 'excellent',
          descriptions: [
            'Communicates crisply and proactively, keeping the interviewer aligned throughout.',
            'Frames decisions with context, tradeoffs, and checks, and responds calmly to feedback.'
          ]
        }
      ]
    }
  ]
};
