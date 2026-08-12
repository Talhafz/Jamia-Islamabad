import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../../lib/auth';
import { StudentsDirectoryClient } from './StudentsDirectoryClient';

const STAFF_ROLES = ['ADMIN', 'DIRECTOR', 'DEAN'];

export default async function StudentsDirectoryPage() {
  const session = await getServerSession(authOptions);

  // Server-side gate: no session → login
  if (!session) {
    redirect('/login?callbackUrl=/students');
  }

  // Server-side gate: STUDENT role → their portal (explicit block, server-enforced)
  if (!STAFF_ROLES.includes(session.user.role)) {
    redirect('/student-portal');
  }

  return <StudentsDirectoryClient />;
}
