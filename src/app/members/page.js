import RequireAdmin from '../../components/RequireAdmin';
import MemberList from '../../components/MemberList';

// Members page placeholder
export default function MembersPage() {
  return (
    <RequireAdmin>
      <div>
        <h2>Members Management</h2>
        <MemberList />
      </div>
    </RequireAdmin>
  );
}
