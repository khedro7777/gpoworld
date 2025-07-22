import React from 'react';
import { useParams } from 'react-router-dom';
import GroupRoom from '@/components/group/GroupRoom';
import EnhancedHeader from '@/components/layout/EnhancedHeader';
import { useState } from 'react';

const GroupRoomPage: React.FC = () => {
  const { groupId } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <EnhancedHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="pt-16">
        <GroupRoom />
      </div>
    </div>
  );
};

export default GroupRoomPage;

