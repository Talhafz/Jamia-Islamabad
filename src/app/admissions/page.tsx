import { redirect } from 'next/navigation';

// The admissions requirements have been merged into the admission-form page.
// Permanently redirect any visitor who lands on /admissions.
export default function AdmissionsPage() {
  redirect('/admission-form');
}
