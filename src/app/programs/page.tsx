import React from 'react';
import { ProgramsClient } from './ProgramsClient';

export const metadata = {
  title: 'Academic Programs | Jamia Islamabad',
  description: 'Detailed curriculum and program guides for Dars-e-Nizami, Hifz, Tajweed, and Secondary School certifications.',
};

export default function ProgramsPage() {
  return <ProgramsClient />;
}
