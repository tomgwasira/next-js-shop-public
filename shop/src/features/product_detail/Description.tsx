import * as React from 'react';

interface DescriptionProps {
  description: string;
}

export default function Description({ description }: DescriptionProps) {
  return (
    <div>
      <div>
        <h3 className="sr-only">Description</h3>
        <div className="space-y-6">
          <p className="text-base text-gray-900">{description}</p>
        </div>
      </div>
    </div>
  );
}
